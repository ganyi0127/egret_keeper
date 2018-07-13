var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ChaptersNode = (function (_super) {
    __extends(ChaptersNode, _super);
    /**
     * init
     */
    function ChaptersNode() {
        var _this = _super.call(this) || this;
        _this.list = []; //存储章节实例
        _this.isSwipping = false; //判断是否开始滑动
        _this.intervalOfChapter = 16; //章节间隔
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchBegin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, _this.onTouchEnd, _this);
        return _this;
    }
    ChaptersNode.prototype.onAddToStage = function (event) {
        var _this = this;
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = _this.onUpdate;
        });
        this.config();
        this.createContents();
    };
    ChaptersNode.prototype.config = function () {
        this.touchEnabled = true;
    };
    ChaptersNode.prototype.createContents = function () {
        var _this = this;
        //添加章节
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var chapterNode = _a[_i];
            this.removeChild(chapterNode);
        }
        this.list = [];
        var matchs = DataInstance.getInstance().matchs;
        matchs.every(function (match, index, array) {
            var chapterNode = new ChapterNode(match);
            var y = (chapterNode.height + _this.intervalOfChapter) * index;
            chapterNode.x = 0;
            chapterNode.y = y;
            _this.addChild(chapterNode);
            _this.list.push(chapterNode);
            return true;
        });
    };
    /**
     * 更新
     */
    ChaptersNode.prototype.onUpdate = function () {
    };
    /**
     * touch begin
     */
    ChaptersNode.prototype.onTouchBegin = function (touchEvent) {
        this.isSwipping = true;
    };
    /**
     * touch move
     */
    ChaptersNode.prototype.onTouchMove = function (touchEvent) {
        if (!this.isSwipping) {
            return;
        }
        if (this.preStageY) {
            //计算偏移
            var deltaY = touchEvent.stageY - this.preStageY;
            this.preStageY = touchEvent.stageY;
            //移动元素
            for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
                var chapterNode = _a[_i];
                chapterNode.y += deltaY;
            }
        }
        else {
            this.preStageY = touchEvent.localY;
        }
    };
    /**
     * touch end
     */
    ChaptersNode.prototype.onTouchEnd = function (touchEvent) {
        var _this = this;
        this.isSwipping = false;
        this.preStageY = null;
        if (this.list.length == 0) {
            return;
        }
        var firstChapterNode = this.list[0];
        var lastChapterNode = this.list[this.list.length - 1];
        //回弹
        if (firstChapterNode.y < 0 || lastChapterNode.y > 0) {
            this.list.every(function (chapterNode, index, array) {
                var y;
                if (firstChapterNode.y < 0) {
                    y = (chapterNode.height + _this.intervalOfChapter) * index;
                }
                else {
                    y = (chapterNode.height + _this.intervalOfChapter) * (array.length - 1 - index);
                }
                var tw = egret.Tween.get(chapterNode);
                tw.to({ y: y }, 0.5, egret.Ease.sineIn);
                return true;
            });
        }
    };
    return ChaptersNode;
}(egret.DisplayObjectContainer));
__reflect(ChaptersNode.prototype, "ChaptersNode");
//# sourceMappingURL=ChaptersNode.js.map