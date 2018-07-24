class GameScene extends egret.DisplayObjectContainer {

    /**
     * 是否已显示弹窗
     */
    isShowAlert = false

    /**
     * 目标队伍
     */
    private targetTeam?: Team

    /**
     * 存储提示区域
     */
    private areaList: Area[] = []

    /**
     * 球门x坐标
     */
    private doorX: number

    /**
     * 球门y坐标
     */
    private doorY: number

    /**
     * 球门宽
     */
    private doorWidth: number

    /**
     * 球门高
     */
    private doorHeight: number

    /**
     * 存储已选中区域序列 默认4 中间区域
     */
    private doorIndex = 4

    /**
     * init
     */
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.config();
        this.createContents();
    }

    private config() {
        this.doorX = this.stage.stageWidth * 0.1
        this.doorY = this.stage.stageHeight * 0.2
        this.doorWidth = this.stage.stageWidth - this.doorX * 2
        this.doorHeight = this.stage.stageHeight - this.doorY * 2
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
        keeper.x = this.stage.stageWidth / 2
        keeper.y = this.stage.stageHeight * 0.8
        this.addChild(keeper)

        //添加门框
        const doorTexture = RES.getRes("door_png")
        const door = new egret.Bitmap(doorTexture)
        this.addChild(door)

        //添加点击区域
        const areaWidth = this.doorWidth / 3
        const areaHeight = this.doorHeight / 3
        for (let i = 0; i < 9; i++) {
            const areaX = this.doorX + this.doorWidth / 3 * (i % 3)
            const areaY = this.doorY + this.doorHeight / 3 * Math.floor(i / 3)

            const area = new Area(i, areaWidth, areaHeight)
            area.x = areaX
            area.y = areaY
            area.touchEnabled = true
            this.areaList.push(area)
            this.addChild(area)

            //添加点击事件
            area.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
                const area: Area = event.target
                area.flash()

                //存储点击序列
                this.doorIndex = area.index
            }, this)
        }


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

        //提示点击区域
        for (const area of this.areaList) {
            area.flash()
        }
    }

    /**
     * 重新开始
     */
    private restart() {

    }
}