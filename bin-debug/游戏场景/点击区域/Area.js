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
/**
 * Area
 */
var Area = (function (_super) {
    __extends(Area, _super);
    /**
     * init
     * @param index 标记
     */
    function Area(index, width, height) {
        var _this = _super.call(this) || this;
        /**
         * 宽度
         */
        _this.width = 0;
        /**
         * 高度
         */
        _this.height = 0;
        _this.index = index;
        _this.width = width;
        _this.height = height;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Area.prototype.onAddToStage = function (event) {
        this.config();
        this.createContents();
    };
    Area.prototype.config = function () {
        this.alpha = 0.1;
    };
    Area.prototype.createContents = function () {
        if (this.width == undefined || this.height == undefined) {
            return;
        }
        //边缘
        var edge = 2;
        //绘制
        this.graphics.beginFill(0xb14a5a, 0.3);
        this.graphics.drawRect(edge, edge, this.width - edge * 2, this.height - edge * 2);
        this.graphics.endFill();
    };
    /**
     * 播放闪烁动画
     */
    Area.prototype.flash = function () {
        var tw = egret.Tween.get(this);
        tw.to({ "alpha": 1 }, 500, egret.Ease.sineInOut);
        tw.wait(500);
        tw.to({ "alpha": 0 }, 500, egret.Ease.sineInOut);
    };
    return Area;
}(egret.Sprite));
__reflect(Area.prototype, "Area");
//# sourceMappingURL=Area.js.map