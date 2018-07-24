class ChapterNode extends egret.DisplayObjectContainer {
    /**
     * 存储赛事数据
     */
    private match: Match

    /**
     * 背景
     */
    private bg: egret.Shape

    /**
     * 背景高度
     */
    private bgHeight: number

    /**
     * 背景宽度
     */
    private bgWidth: number

    /**
     * 背景x 
     */
    private bgX: number

    /**
     * 背景y
     */
    private bgY: number

    /**
     * final间隔
     */
    private finalInterval: number

    /**
     * final总宽度
     */
    private finalTotalWidth: number

    /**
     * final总高度
     */
    private finalTotalHeight: number

    /**
     * final.center_x 
     */
    private finalCenterX: number

    /**
     * final.center_y
     */
    private finalCenterY: number

    /**
     * init
     */
    public constructor(match: Match) {
        super()

        this.match = match

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = this.onUpdate
        })

        this.config()
        this.createContents()
    }

    private config() {
        this.bgWidth = this.stage.stageWidth * 0.8
        this.bgHeight = this.stage.stageHeight * 0.8
        this.bgX = (this.stage.stageWidth - this.bgWidth) - 32
        this.bgY = (this.stage.stageHeight - this.bgHeight) / 2

        this.finalTotalWidth = this.bgWidth * 0.9
        this.finalTotalHeight = this.bgHeight - 200
        this.finalCenterX = this.bgX + this.bgWidth / 2
        this.finalCenterY = this.bgY + this.bgHeight - this.finalTotalHeight / 2 - 50

        this.finalInterval = (this.finalTotalWidth - 180) / 8
    }

    private createContents() {

        //添加背景
        var bg = new egret.Shape()
        bg.graphics.lineStyle(16, 0xffffff, 0.5, false, egret.StageScaleMode.EXACT_FIT, egret.CapsStyle.NONE, egret.JointStyle.BEVEL, 0, [32, 32])
        bg.graphics.beginFill(Config.Constant.COLOR_BACKGROUND)
        bg.graphics.drawRoundRect(this.bgX, this.bgY, this.bgWidth, this.bgHeight, 128, 256)
        bg.graphics.endFill()
        this.addChild(bg)

        this.bg = bg

        //显示赛事title
        var titleLabel = new egret.BitmapText()
        titleLabel.font = RES.getRes("font_fnt")
        titleLabel.textAlign = egret.HorizontalAlign.LEFT
        titleLabel.text = this.match.year
        var titleLabelScale = 0.8
        titleLabel.x = this.bgX + 32
        titleLabel.y = this.bgY + 32
        titleLabel.scaleX = titleLabel.scaleY = titleLabelScale
        this.addChild(titleLabel)

        //显示赛事subTitle
        var subTitleLabel = new egret.BitmapText()
        subTitleLabel.font = RES.getRes("font_fnt")
        subTitleLabel.textAlign = egret.HorizontalAlign.LEFT
        subTitleLabel.verticalAlign = egret.VerticalAlign.BOTTOM
        subTitleLabel.text = this.match.name
        var subTitleLabelScale = 0.5
        subTitleLabel.x = titleLabel.x + titleLabel.width + 32
        subTitleLabel.y = this.bgY + 32
        subTitleLabel.scaleX = subTitleLabel.scaleY = subTitleLabelScale
        this.addChild(subTitleLabel)

        //添加赛事
        this.addMatchs()
    }

    /**
     * 绘制线条公共方法
     * @param from 起始点
     * @param to 结束点
     * @param vertical 是否垂直
     */
    private addLine(from: egret.Point, to: egret.Point, vertical: boolean = false) {

        //线条配置
        const lineWidth = 8
        const lineColor = 0x1e1e1e
        const lineAlpha = 1


        const line = new egret.Shape()
        line.graphics.lineStyle(lineWidth, lineColor, lineAlpha)
        line.graphics.moveTo(from.x, from.y)
        if (vertical) {
            line.graphics.lineTo(to.x, from.y)
        } else {
            const middleX = (from.x + to.x) / 2
            line.graphics.lineTo(middleX, from.y)
            line.graphics.lineTo(middleX, to.y)
        }
        line.graphics.lineTo(to.x, to.y)
        line.graphics.endFill()
        this.addChild(line)
    }

    /**
     * 添加赛事
     */
    private addMatchs() {
        //获取章节进度
        const process = Config.getProcessOfChapter(this.match.id)

        //获取中国队(弃用)
        const chinaTeam = DataInstance.getInstance().chinaTeam

        //创建小组赛比赛位
        for (const key in this.match.groups) {
            if (this.match.groups.hasOwnProperty(key)) {
                const teams = this.match.groups[key]

                //获取每组中心点
                const regularFinalPosition = this.getRegularFinalPosition(key)

                //判断左右
                const isLeftDirection = this.getDirection(key)

                //添加组名 A~H 
                const groupLabel = new egret.BitmapText()
                groupLabel.font = RES.getRes("font_fnt")
                groupLabel.textAlign = egret.HorizontalAlign.CENTER
                groupLabel.verticalAlign = egret.VerticalAlign.MIDDLE
                groupLabel.text = key
                const groupLabelScale = 0.5
                const groupLabelWidth = 200
                const groupLabelHeight = 100
                groupLabel.x = regularFinalPosition.x + (isLeftDirection ? - 120 : 120) - groupLabelWidth / 2 * groupLabelScale
                groupLabel.y = regularFinalPosition.y - groupLabelHeight / 2 * groupLabelScale
                groupLabel.width = groupLabelWidth
                groupLabel.height = groupLabelHeight
                groupLabel.scaleX = groupLabel.scaleY = groupLabelScale
                this.addChild(groupLabel)

                //遍历每组球队
                let teamCubeWidth: number
                const teamCubeInterval = 8
                teams.every((teamCode, index, array) => {
                    const teamCube = new TeamCube(Config.Final.RegularFinal)
                    const team = DataInstance.getInstance().teamMap[teamCode]
                    teamCube.setTeam(team)
                    teamCube.targetTeam = team

                    //设置状态
                    teamCube.hasWon = false
                    if (process) {
                        if (process.final == Config.Final.RegularFinal) {
                            //在小组赛内                            
                            const totalIndex = index + (key.charCodeAt(0) - "A".charCodeAt(0)) * 4
                            const lowerIndex = process.index - (process.index % 4)
                            const upperIndex = lowerIndex + 4
                            if ((totalIndex >= lowerIndex) && (totalIndex < upperIndex)) {
                                //小组赛(同组)
                                if (process.index % 4 == index) {
                                    //可进入比赛
                                    teamCube.canOppose = true
                                } else {
                                    //不可进入比赛
                                    teamCube.canOppose = false
                                    //判断是否已比赛
                                    if (process.index % 4 > index) {
                                    } else {
                                        teamCube.hasWon = true
                                    }
                                }
                            } else {
                                //小组赛(不同组)
                                teamCube.canOppose = false
                            }
                        } else {
                            //小组赛已过
                            teamCube.canOppose = false
                        }
                    } else {
                        //从小组赛第一位开始比赛
                        if (index == 0) {
                            teamCube.canOppose = true
                        } else {
                            teamCube.canOppose = false
                        }
                    }

                    //记录teamCube高度
                    if (!teamCubeWidth) {
                        teamCubeWidth = teamCube.widthLength
                    }

                    const deltaPoint = this.getRegularFinalOffset(index)

                    deltaPoint.x += regularFinalPosition.x
                    deltaPoint.y += regularFinalPosition.y
                    teamCube.x = deltaPoint.x
                    teamCube.y = deltaPoint.y
                    this.addChild(teamCube)

                    return true
                })
            }
        }


        //创建八分之一赛       
        const halfQuarterfinalMap = [0, 1, 2, 3, 4, 5, 6, 7]
        for (const index of halfQuarterfinalMap) {
            const position = this.getHalfQuarterfinalPosition(index)

            //绘制进度线
            const toPosition = this.getQuarterfinalPosition(Math.floor(index / 2))
            this.addLine(position, toPosition)

            //绘制队伍
            const teamCube = new TeamCube(Config.Final.HalfQuarterfinal)
            const team = Config.getFinalTeam(this.match.id, Config.Final.HalfQuarterfinal, index)
            teamCube.setTeam(team)

            //设置状态(八分之一决赛不需要进行比赛)
            teamCube.canOppose = false
            teamCube.hasWon = true
            if (process) {
                if (process.final == Config.Final.HalfQuarterfinal) {
                    //在八分之一决赛内                                                                                        
                    teamCube.hasWon = false
                }
            }

            teamCube.x = position.x
            teamCube.y = position.y
            this.addChild(teamCube)
        }

        //创建四分之一赛
        const quarterfinalMap = [0, 1, 2, 3]
        for (const index of quarterfinalMap) {
            const position = this.getQuarterfinalPosition(index)

            //绘制进度线
            const toPosition = this.getSemifinalsPosition(Math.floor(index / 2))
            this.addLine(position, toPosition)

            const teamCube = new TeamCube(Config.Final.Quarterfinal)
            const team = Config.getFinalTeam(this.match.id, Config.Final.Quarterfinal, index)
            teamCube.setTeam(team)

            //设置状态
            teamCube.hasWon = true
            teamCube.canOppose = false
            if (process) {
                if (process.final == Config.Final.Quarterfinal) {
                    //在四分之一决赛内                            
                    teamCube.hasWon = false
                    teamCube.canOppose = true

                    //读取目标队伍
                    if (process.index == index) {
                        const targetTeam0 = Config.getFinalTeam(this.match.id, Config.Final.HalfQuarterfinal, index * 2)
                        const targetTeam1 = Config.getFinalTeam(this.match.id, Config.Final.HalfQuarterfinal, index * 2 + 1)
                        if (targetTeam0.name == chinaTeam.name) {
                            teamCube.targetTeam = targetTeam0
                        } else {
                            teamCube.targetTeam = targetTeam1
                        }
                    }
                }
            }

            teamCube.x = position.x
            teamCube.y = position.y
            this.addChild(teamCube)
        }

        //创建半决赛
        const semifinalsMap = [0, 1]
        for (const index of semifinalsMap) {
            const position = this.getSemifinalsPosition(index)

            //绘制线条 
            const toPosition = this.getFinalsPosition()
            this.addLine(position, toPosition, true)

            const teamCube = new TeamCube(Config.Final.Semifinals)
            const team = Config.getFinalTeam(this.match.id, Config.Final.Semifinals, index)
            teamCube.setTeam(team)

            //设置状态
            teamCube.hasWon = true
            teamCube.canOppose = false
            if (process) {
                if (process.final == Config.Final.Semifinals) {
                    //在半决赛内                            
                    teamCube.hasWon = false
                    teamCube.canOppose = true

                    //读取目标队伍
                    if (process.index == index) {
                        const targetTeam0 = Config.getFinalTeam(this.match.id, Config.Final.Quarterfinal, index * 2)
                        const targetTeam1 = Config.getFinalTeam(this.match.id, Config.Final.Quarterfinal, index * 2 + 1)
                        if (targetTeam0.name == chinaTeam.name) {
                            teamCube.targetTeam = targetTeam0
                        } else {
                            teamCube.targetTeam = targetTeam1
                        }
                    }
                }
            }

            teamCube.x = position.x
            teamCube.y = position.y
            this.addChild(teamCube)
        }

        //创建决赛
        const position = this.getFinalsPosition()
        const teamCube = new TeamCube(Config.Final.Finals)
        const team = Config.getFinalTeam(this.match.id, Config.Final.Finals, 0)
        teamCube.setTeam(team)

        //设置状态
        teamCube.hasWon = true
        teamCube.canOppose = false
        if (process) {
            if (process.final == Config.Final.Finals) {
                //在决赛内                            
                teamCube.hasWon = false
                teamCube.canOppose = true

                //读取目标队伍                
                const targetTeam0 = Config.getFinalTeam(this.match.id, Config.Final.Semifinals, 0)
                const targetTeam1 = Config.getFinalTeam(this.match.id, Config.Final.Semifinals, 1)
                if (targetTeam0.name == chinaTeam.name) {
                    teamCube.targetTeam = targetTeam0
                } else {
                    teamCube.targetTeam = targetTeam1
                }
            } else if (process.final == Config.Final.Champion) {
                //已赢得世界杯
                teamCube.isChampion = true
            }
        }

        teamCube.x = position.x
        teamCube.y = position.y
        this.addChild(teamCube)
    }

    /**
     * 获取决赛位置
     */
    private getFinalsPosition(): egret.Point {
        const point = new egret.Point()
        point.x = this.finalCenterX
        point.y = this.finalCenterY - 300
        return point
    }

    /**
     * 获取半决赛位置     
     * @param index 序列
     */
    private getSemifinalsPosition(index: number): egret.Point {
        const point = new egret.Point()
        point.x = this.finalCenterX + (index == 0 ? -this.finalInterval : this.finalInterval)
        point.y = this.finalCenterY
        return point
    }

    /**
     * 获取四分之一决赛     
     * @param index 序列
     */
    private getQuarterfinalPosition(index: number): egret.Point {
        const point = new egret.Point()
        point.x = this.finalCenterX + (index < 2 ? -this.finalInterval : this.finalInterval) * 2
        point.y = this.finalCenterY + (index % 2 == 0 ? -this.finalTotalHeight : this.finalTotalHeight) / 4
        return point
    }

    /**
     * 获取八分之一决赛     
     * @param index 序列
     */
    private getHalfQuarterfinalPosition(index: number): egret.Point {
        const point = new egret.Point()
        point.x = this.finalCenterX + (index < 4 ? -this.finalInterval : this.finalInterval) * 3
        point.y = this.finalCenterY - this.finalTotalHeight / 2 + this.finalTotalHeight / 8 + (this.finalTotalHeight / 4) * (index % 4)
        return point
    }

    /**
     * 获取小组赛比赛位中心位置
     * @param key 组别 
     */
    private getRegularFinalPosition(key: string): egret.Point {
        const isLeftDirection = this.getDirection(key)

        const ascii = key.charCodeAt(0)
        const asciiA = "A".charCodeAt(0)
        const asciiE = "E".charCodeAt(0)
        const firstAscii = isLeftDirection ? asciiA : asciiE
        const delta = ascii - firstAscii

        const centerPosition = new egret.Point()
        centerPosition.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 4
        centerPosition.y = this.finalCenterY - this.finalTotalHeight / 2 + (this.finalTotalHeight / 4) / 2 + (this.finalTotalHeight / 4) * delta
        return centerPosition
    }

    /**
     * 获取小组赛偏移
     * @param index 偏移 
     */
    private getRegularFinalOffset(index: number): egret.Point {
        const delta = (this.finalTotalHeight / 8) / 2
        const point = new egret.Point()
        point.x = index == 0 || index == 2 ? -delta : delta
        point.y = index == 0 || index == 1 ? -delta : delta
        return point
    }

    /**
     * 判断比赛位左右
     * @param key 组别
     */
    private getDirection(key: string): boolean {
        const ascii = key.charCodeAt(0)
        const asciiA = "A".charCodeAt(0)
        return ascii - asciiA < 4
    }

    /**
     * 更新
     */
    private onUpdate() {

    }
}