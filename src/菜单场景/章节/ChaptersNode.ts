class ChaptersNode extends egret.DisplayObjectContainer {
    public list: ChapterNode[] = []                 //存储章节实例

    private isSwipping = false                      //判断是否开始滑动
    private preStageY: number                       //存储上一次触摸点
    private intervalOfChapter: number = 16          //章节间隔

    /**
     * init
     */
    public constructor() {
        super()

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)        
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchBegin, this)
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this)
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this)
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchEnd, this)
    }

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = this.onUpdate
        })

        this.config()
        this.createContents()
    }

    private config() {
        this.touchEnabled = true
    }

    private createContents() {

        //添加章节
        for (var chapterNode of this.list) {
            this.removeChild(chapterNode)
        }
        this.list = []

        var matchs = DataInstance.getInstance().matchs

        matchs.every((match, index, array) => {
            var chapterNode = new ChapterNode(match)
            var y = (chapterNode.height + this.intervalOfChapter) * index
            chapterNode.x = 0
            chapterNode.y = y
            this.addChild(chapterNode)
            this.list.push(chapterNode)

            return true
        })
    }

    /**
     * 更新
     */
    private onUpdate() {

    }

    /**
     * touch begin 
     */
    private onTouchBegin(touchEvent: egret.TouchEvent) {
        this.isSwipping = true
    }

    /**
     * touch move 
     */
    private onTouchMove(touchEvent: egret.TouchEvent) {
        if (!this.isSwipping) {
            return
        }

        if (this.preStageY) {

            //计算偏移
            var deltaY = touchEvent.stageY - this.preStageY
            this.preStageY = touchEvent.stageY
            //移动元素
            for (var chapterNode of this.list) {
                chapterNode.y += deltaY
            }
        } else {
            this.preStageY = touchEvent.localY
        }
    }

    /**
     * touch end
     */
    private onTouchEnd(touchEvent: egret.TouchEvent) {
        this.isSwipping = false
        this.preStageY = null

        if (this.list.length == 0) {
            return
        }

        const firstChapterNode = this.list[0]
        const lastChapterNode = this.list[this.list.length - 1]

        //回弹
        if (firstChapterNode.y < 0 || lastChapterNode.y > 0) {
            this.list.every((chapterNode, index, array) => {
                var y: number
                if (firstChapterNode.y < 0) {
                    y = (chapterNode.height + this.intervalOfChapter) * index
                } else {
                    y = (chapterNode.height + this.intervalOfChapter) * (array.length - 1 - index)
                }
                var tw = egret.Tween.get(chapterNode)
                tw.to({ y: y }, 0.5, egret.Ease.sineIn)
                return true
            })
        }
    }
}