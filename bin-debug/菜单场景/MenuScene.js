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
var MenuScene = (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        var _this = _super.call(this) || this;
        _this.config();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    MenuScene.prototype.onAddToStage = function (event) {
        this.createContents();
    };
    MenuScene.prototype.config = function () {
    };
    MenuScene.prototype.createContents = function () {
        var chaptersNode = new ChaptersNode();
        this.addChild(chaptersNode);
    };
    return MenuScene;
}(egret.DisplayObjectContainer));
__reflect(MenuScene.prototype, "MenuScene");
//# sourceMappingURL=MenuScene.js.map