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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    /**
     * init
     */
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.config();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameScene.prototype.onAddToStage = function (event) {
        this.createContents();
    };
    GameScene.prototype.config = function () {
    };
    GameScene.prototype.createContents = function () {
        //添加进度
        var processNode = new process.ProcessNode();
        this.addChild(processNode);
        processNode.x = this.stage.stageWidth - processNode.width - 16;
        processNode.y = 16;
    };
    /**
     * 初始化游戏
     * @param team 目标队伍
     */
    GameScene.prototype.init = function (team) {
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map