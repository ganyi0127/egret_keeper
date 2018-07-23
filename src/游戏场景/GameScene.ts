class GameScene extends egret.DisplayObjectContainer {

    /**
     * 目标队伍
     */
    private targetTeam?: Team

    /**
     * 是否已显示弹窗
     */
    isShowAlert = false

    /**
     * init
     */
    public constructor() {
        super();

        this.config();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.createContents();
    }

    private config() {

    }

    private createContents() {
        //添加背景
        const bgTexture = RES.getRes("bg_game_png")
        const bg = new egret.Bitmap(bgTexture)
        this.addChild(bg)

        //添加射手
        const shooter = new Player.Shooter()
        this.addChild(shooter)

        //添加守门员
        const keeper = new Player.keeper()
        this.addChild(keeper)

        //添加门框
        const doorTexture = RES.getRes("door_png")
        const door = new egret.Bitmap(doorTexture)
        this.addChild(door)

        //添加进度
        const processNode = new process.ProcessNode()
        processNode.initData(4, 10)
        this.addChild(processNode)
        processNode.x = this.stage.stageWidth - processNode.width - Config.Constant.EDGE
        processNode.y = Config.Constant.EDGE
    }

    /**
     * 初始化游戏
     * @param team 目标队伍
     */
    reload(targetTeam: Team) {
        if (this.targetTeam) {
            if (targetTeam.name == this.targetTeam.name) {
                //判断是否需要重写开始

                //添加弹窗
                const alert = getAlert("是否重新开始")
                this.addChild(alert)

                this.isShowAlert = true

                //添加点击接受事件
                alert.addEventListener(MyEvent.ButtonEvent.ACCEPT, () => {
                    this.isShowAlert = false
                    this.removeChild(alert)
                    this.restart()
                }, this)

                //添加点击取消事件
                alert.addEventListener(MyEvent.ButtonEvent.CANCEL, () => {
                    this.isShowAlert = false
                    this.removeChild(alert)
                }, this)
            } else {
                this.targetTeam = targetTeam
                //重新开始
                this.restart()
            }
        } else {
            this.targetTeam = targetTeam
            //开始
            this.restart()
        }
    }

    /**
     * 重新开始
     */
    private restart() {

    }
}