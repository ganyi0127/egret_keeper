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
         * 目标进球数
         */
        private targetCount: number

        /**
         * 总进球数
         */
        private maxCount: number

        /**
         * 当前进球数
         */
        private curCount: number = 0

        /**
         * 圆角
         */
        private radius = 16

        /**
         * 遮罩
         */
        private maskNode: egret.Shape

        /**
         * init 
         * @param targetCount 目标数
         * @param maxCount 最大数
         */
        constructor(targetCount: number = 0, maxCount: number = 0) {
            super();

            this.targetCount = targetCount
            this.maxCount = maxCount

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

            //创建遮罩
            this.maskNode = new egret.Shape()
            this.maskNode.graphics.drawRect(0, 0, this.width, this.height)
            this.maskNode.cacheAsBitmap = true
            this.addChild(this.maskNode)

            this.mask = this.maskNode

            this.updateMask()
        }

        /**
         * 刷新遮罩
         */
        private updateMask() {
            const tw = egret.Tween.get(this.mask)
            let targetWidth:number
            if (this.maxCount == 0) {
                targetWidth = 0 
            } else {
                targetWidth = this.width * this.curCount / this.maxCount
            }
            
            tw.to({ "width": targetWidth }, 500, egret.Ease.elasticIn)
        }

        /**
         * 初始化数据
         * @param targetCount 目标数
         * @param maxCount 最大数
         */
        initData(targetCount: number, maxCount: number) {
            this.targetCount = targetCount
            this.maxCount = maxCount
        }


        /**
         * 更新进球
         * @param subCount 添加数 默认+1
         */
        addCount(subCount: number = 1) {
            this.curCount += subCount
            if (this.curCount > this.maxCount) {
                this.curCount = this.maxCount
            }

            this.updateMask()
        }

        /**
         * 重置
         */
        reset() {
            this.curCount = 0
            this.updateMask()
        }
    }
}
