class TeamCube extends egret.DisplayObjectContainer {

    /**
     * 球队(当前显示)
     */
    team?: Team

    /**
     * 对抗球队（进入之后对抗）
     */
    targetTeam?: Team

    /**
     * 赛事进程(默认小组赛)
     */
    final = Config.Final.RegularFinal

    /**
     * cube边长
     */
    widthLength: number

    /**
     * 是否为冠军比赛位
     */
    isChampion = false

    /**
     * 是否可比赛
     */
    canOppose = false

    /**
     * 是否失利/胜利(仅小组赛判断)
     */
    hasWon?: boolean

    /**
     * 判断是否为小组赛（无点击项）
     */
    private isRegularFinal: boolean

    /**
     * log边距
     */
    private edge: number

    /**
     * logo遮罩
     */
    private logoMask: egret.Shape

    /**
     * init 
     */
    constructor(final: Config.Final) {
        super()

        this.final = final
        this.isRegularFinal = this.final == Config.Final.RegularFinal
        switch (this.final) {
            case Config.Final.RegularFinal:
                this.widthLength = 80
                this.edge = 4
                break
            case Config.Final.Semifinals:
                this.widthLength = 170
                this.edge = 8
                break
            case Config.Final.Finals:
                this.widthLength = 220
                this.edge = 16
                break
            default:
                this.widthLength = 140
                this.edge = 8
                break
        }

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)

        if (this.final != Config.Final.HalfQuarterfinal) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this)
        }
    }

    /**
     * 添加到场景
     */
    private onAddToStage(event: egret.Event) {
        this.config()
        this.createContents()
    }

    private config() {
        this.touchEnabled = true
    }

    private createContents() {
        //背景
        const spriteSheet: egret.SpriteSheet = RES.getRes("flag_json");
        const bgTexture = spriteSheet.getTexture("中国")
        const bg = new egret.Bitmap(bgTexture)
        bg.x = bg.y = -this.widthLength / 2
        bg.width = bg.height = this.widthLength
        this.addChild(bg)


        //logo遮罩
        const maskX = this.edge - this.widthLength / 2
        const maskY = this.edge - this.widthLength / 2
        const maskWidth = this.widthLength - this.edge * 2
        const maskHeight = this.widthLength - this.edge * 2
        const maskRadius = 12

        const mask = new egret.Shape()
        mask.graphics.beginFill(0x000000, 1)
        mask.graphics.drawRoundRect(maskX, maskY, maskWidth, maskHeight, maskRadius, maskRadius)
        mask.graphics.endFill()
        this.addChild(mask)

        this.logoMask = mask

        //设置logo
        if (this.team) {
            //移除原有logo
            const oldLogo = this.getChildByName("logo")
            if (oldLogo) {
                this.removeChild(oldLogo)
            }

            //队伍logo
            const spriteSheet: egret.SpriteSheet = RES.getRes("flag_json");
            const logoTexture = spriteSheet.getTexture(this.team.name)
            const logo = new egret.Bitmap(logoTexture)
            logo.x = logo.y = maskX
            logo.width = logo.height = maskWidth
            logo.name = "logo"
            this.addChild(logo)

            //设置遮罩
            logo.mask = this.logoMask
        }
    }

    /**
     * 设置队伍logo
     */
    setTeam(team: Team) {
        this.team = team
    }

    /**
     * 点击事件
     */
    private onTap(event: egret.TouchEvent) {
        //发送        
        const enterFinal = new MyEvent.TeamEvent(MyEvent.TeamEvent.ENTER_FINAL)
        enterFinal.team = this.targetTeam
        enterFinal.final = this.final
        if (this.canOppose) {
            enterFinal.allow = true
            enterFinal.message = "开始比赛"
            enterFinal.code = 0
        } else if (this.hasWon) {
            enterFinal.allow = false
            enterFinal.message = "已结束"
            enterFinal.code = 1
        } else {
            enterFinal.allow = false
            enterFinal.message = "无法开始"
            enterFinal.code = 2
        }

        var obj: any

        while (!(egret.is(obj, "Main"))) {
            if (obj) {
                obj = obj.parent
            } else {
                obj = this
            }
        }

        const main = <Main>obj
        if (!main.isAlertShow) {
            this.addEventListener(MyEvent.TeamEvent.ENTER_FINAL, (<Main>obj).onEnterToFinal, obj)
            this.dispatchEvent(enterFinal)
            this.removeEventListener(MyEvent.TeamEvent.ENTER_FINAL, (<Main>obj).onEnterToFinal, obj)
        }
    }
}