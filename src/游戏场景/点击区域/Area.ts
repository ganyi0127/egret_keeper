/**
 * Area
 */
class Area extends egret.Sprite {
    /**
     * 下标
     */
    index: number

    /**
     * 宽度
     */
    width = 0

    /**
     * 高度
     */
    height = 0

    /**
     * init 
     * @param index 标记
     */
    constructor(index: number, width?: number, height?: number) {
        super()

        this.index = index
        this.width = width
        this.height = height

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event) {
        this.config()
        this.createContents()
    }

    private config() {
        this.alpha = 0.1
    }

    private createContents() {
        if (this.width == undefined || this.height == undefined) {
            return
        }

        //边缘
        const edge = 2 

        //绘制
        this.graphics.beginFill(0xb14a5a, 0.3)
        this.graphics.drawRect(edge, edge, this.width - edge * 2, this.height - edge * 2)
        this.graphics.endFill()
    }

    /**
     * 播放闪烁动画
     */
    flash() {
        const tw = egret.Tween.get(this)
        tw.to({ "alpha": 1 }, 500, egret.Ease.sineInOut)
        tw.wait(500)
        tw.to({ "alpha": 0 }, 500, egret.Ease.sineInOut)        
    }
}