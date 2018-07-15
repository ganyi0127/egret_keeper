module process {

    /**
     * 进度节点
     */
    export class ProcessNode extends egret.Sprite {

        /**
         * 宽度
         */
        width: number

        /**
         * 高度
         */
        height = 64

        /**
         * 圆角
         */
        private radius = 16

        /**
         * init 
         */
        constructor() {
            super();

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        }

        private onAddToStage(event: egret.Event) {
            this.config()
            this.createContents()
        }

        private config() {
            this.width = this.stage.stageWidth * 0.4
        }

        private createContents() {
            //绘制背景            
            this.graphics.beginFill(0xeeeeee, 1)
            this.graphics.drawRoundRect(0, 0, this.width, this.height, this.radius, this.radius)
            this.graphics.endFill()
        }

        /**
         * 更新进球
         */
        
    }
}
