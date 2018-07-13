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
        this.bgX = (this.stage.stageWidth - this.bgWidth) / 2
        this.bgY = (this.stage.stageHeight - this.bgHeight) / 2

        this.finalTotalWidth = this.bgWidth * 0.9
        this.finalTotalHeight = this.bgHeight - 200
        this.finalCenterX = this.stage.stageWidth / 2
        this.finalCenterY = this.bgY + this.bgHeight - this.finalTotalHeight / 2 - 50

        this.finalInterval = (this.finalTotalWidth - 180) / 8
    }

    private createContents() {

        //添加背景
        var bg = new egret.Shape()
        bg.graphics.lineStyle(16, 0xffffff, 0.5, false, egret.StageScaleMode.EXACT_FIT, egret.CapsStyle.NONE, egret.JointStyle.BEVEL, 0, [32, 32])
        bg.graphics.beginFill(0x6e6e8e, 1)
        bg.graphics.drawRoundRect(this.bgX, this.bgY, this.bgWidth, this.bgHeight, 128, 256)
        bg.graphics.endFill()
        this.addChild(bg)

        this.bg = bg

        //显示赛事title
        var titleLabel = new egret.BitmapText()
        titleLabel.font = RES.getRes("font_fnt")
        titleLabel.textAlign = egret.HorizontalAlign.LEFT
        titleLabel.text = this.match.year
        titleLabel.x = this.bgX + 8
        titleLabel.y = this.bgY + 8
        this.addChild(titleLabel)        

        //添加赛事
        this.addMatchs()
    }

    /**
     * 添加赛事
     */
    private addMatchs() {
        //创建小组赛比赛位
        for (const key in this.match.groups) {
            if (this.match.groups.hasOwnProperty(key)) {
                var teams = this.match.groups[key]
                
                //获取每组中心点
                var regularFinalPosition = this.getRegularFinalPosition(key)

                //

                //遍历每组球队
                var teamCubeWidth: number
                const teamCubeInterval = 8
                teams.every((team, index, array) => {
                    var teamCube = new TeamCube(Config.Final.RegularFinal)

                    if (!teamCubeWidth) {
                        teamCubeWidth = teamCube.widthLength
                    }

                    var deltaPoint = this.getRegularFinalOffset(index)
                                        
                    deltaPoint.x += regularFinalPosition.x
                    deltaPoint.y += regularFinalPosition.y
                    teamCube.x = deltaPoint.x 
                    teamCube.y = deltaPoint.y 
                    this.addChild(teamCube)

                    return true
                })
            }
        }

        //读取比赛位        

    }

    /**
     * 获取决赛位置
     */
    private getFinalsPosition(): egret.Point {
        var point = new egret.Point()
        point.x = this.stage.stageWidth / 2
        point.y = this.bgY - 400
        return point
    }

    /**
     * 获取半决赛位置     
     * @param key 组别     
     */
    private getSemifinalsPosition(key: string): egret.Point {
        var isLeftDirection = this.getDirection(key)
        var point = new egret.Point()
        point.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval)
        point.y = this.finalCenterY
        return point
    }

    /**
     * 获取四分之一决赛
     * @param key 组别 
     * @param index 下标
     */
    private getQuarterfinalPosition(key: string, index: number): egret.Point {
        var isLeftDirection = this.getDirection(key)
        var point = new egret.Point()
        point.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 2
        point.y = this.finalCenterY + (index == 0 ? -this.finalTotalHeight : this.finalTotalHeight) / 2
        return point
    }

    /**
     * 获取八分之一决赛
     * @param key 组别 
     * @param index 下标
     */
    private getHalfQuarterfinalPosition(key: string, index: number): egret.Point {
        var isLeftDirection = this.getDirection(key)
        var point = new egret.Point()
        point.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 3
        point.y = this.finalCenterY - this.finalTotalHeight / 2 + (this.finalTotalHeight / 4) / 2 + (this.finalTotalHeight / 4) * index
        return point
    }

    /**
     * 获取小组赛比赛位中心位置
     * @param key 组别 
     */
    private getRegularFinalPosition(key: string): egret.Point {
        var isLeftDirection = this.getDirection(key)

        var ascii = key.charCodeAt(0)
        var asciiA = "A".charCodeAt(0)
        var asciiE = "E".charCodeAt(0)
        var firstAscii = isLeftDirection ? asciiA : asciiE
        var delta = ascii - firstAscii

        var centerPosition = new egret.Point()
        centerPosition.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 4
        centerPosition.y = this.finalCenterY - this.finalTotalHeight / 2 + (this.finalTotalHeight / 4) / 2 + (this.finalTotalHeight / 4) * delta
        return centerPosition
    }

    /**
     * 获取小组赛偏移
     * @param index 偏移 
     */
    private getRegularFinalOffset(index: number): egret.Point {
        var delta = (this.finalTotalHeight / 8) / 2
        var point = new egret.Point()
        point.x = index == 0 || index == 2 ? -delta : delta
        point.y = index == 0 || index == 1 ? -delta : delta
        return point
    }

    /**
     * 判断比赛位左右
     * @param key 组别
     */
    private getDirection(key: string): boolean {
        var ascii = key.charCodeAt(0)
        var asciiA = "A".charCodeAt(0)
        return ascii - asciiA < 4
    }

    /**
     * 更新
     */
    private onUpdate() {

    }
}