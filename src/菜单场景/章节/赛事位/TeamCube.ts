class TeamCube extends egret.DisplayObjectContainer {

    /**
     * 球队
     */
    team: Team

    /**
     * 赛事进程(默认小组赛)
     */
    final = Config.Final.RegularFinal

    /**
     * cube边长
     */
    widthLength: number

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
        this.widthLength = this.isRegularFinal ? 88 : 140
        this.edge = this.isRegularFinal ? 4 : 8

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)

        if (!this.isRegularFinal) {
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
        if (!this.isRegularFinal) {
            this.touchEnabled = true
        }
    }

    private createContents() {
        //背景
        var bgTexture = RES.getRes("")
        var bg = new egret.Bitmap(bgTexture)
        bg.x = bg.y = -this.widthLength / 2
        bg.width = bg.height = this.widthLength
        this.addChild(bg)


        //logo遮罩
        var maskX = this.edge - this.widthLength / 2 
        var maskY = this.edge - this.widthLength / 2
        var maskWidth = this.widthLength - this.edge * 2
        var maskHeight = this.widthLength - this.edge * 2
        var maskRadius = 12

        var mask = new egret.Shape()
        mask.graphics.beginFill(0x000000, 1)
        mask.graphics.drawRoundRect(maskX, maskY, maskWidth, maskHeight, maskRadius, maskRadius)
        this.addChild(mask)

        this.logoMask = mask

    }

    /**
     * 设置队伍logo
     */
    setTeam(team: Team) {
        this.team = team

        //队伍logo
        var logoTexture = RES.getRes("")
        var logo = new egret.Bitmap(logoTexture)
        logo.x = logo.y = this.logoMask.x
        logo.width = logo.height = this.logoMask.width
        this.addChild(logo)

        //设置遮罩
        logo.mask = this.logoMask
    }

    /**
     * 点击事件
     */
    private onTap(event: egret.TouchEvent) {
        //发送
        if (this.team) {
            var enterFinal = new TeamEvent(TeamEvent.ENTER_FINAL)
            enterFinal.team = this.team
            enterFinal.final = this.final
            this.dispatchEvent(enterFinal)
        } else {
            var emptyFinal = new TeamEvent(TeamEvent.EMPTY_FINAL)
            this.dispatchEvent(emptyFinal)
        }
    }
}