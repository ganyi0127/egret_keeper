class GameScene extends egret.DisplayObjectContainer {

    /**
     * 目标队伍
     */
    private targetTeam?: Team

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
        //添加进度
        const processNode = new process.ProcessNode()
        this.addChild(processNode)
        processNode.x = this.stage.stageWidth - processNode.width - 16
        processNode.y = 16

    }

    /**
     * 初始化游戏
     * @param team 目标队伍
     */
    init(targetTeam: Team) {
        if (targetTeam.name == this.targetTeam.name) {
            //判断是否需要重写开始
        } else {
            //重写开始
        }
    }
}