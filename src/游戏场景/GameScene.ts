class GameScene extends egret.DisplayObjectContainer{

    /**
     * init
     */
    public constructor(){
        super();

        this.config();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }

    private onAddToStage(event: egret.Event){
        this.createContents();
    }

    private config(){

    }

    private createContents(){

    }
}