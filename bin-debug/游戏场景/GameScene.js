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
        /**
         * 是否已显示弹窗
         */
        _this.isShowAlert = false;
        /**
         * 存储提示区域
         */
        _this.areaList = [];
        /**
         * 存储已选中区域序列 默认4 中间区域
         */
        _this.doorIndex = 4;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    GameScene.prototype.onAddToStage = function (event) {
        this.config();
        this.createContents();
    };
    GameScene.prototype.config = function () {
        this.doorX = this.stage.stageWidth * 0.1;
        this.doorY = this.stage.stageHeight * 0.2;
        this.doorWidth = this.stage.stageWidth - this.doorX * 2;
        this.doorHeight = this.stage.stageHeight - this.doorY * 2;
    };
    GameScene.prototype.createContents = function () {
        var _this = this;
        //添加背景
        var bgTexture = RES.getRes("bg_game_png");
        var bg = new egret.Bitmap(bgTexture);
        this.addChild(bg);
        //添加射手
        var shooter = new Player.Shooter();
        this.addChild(shooter);
        //添加守门员
        var keeper = new Player.keeper();
        keeper.x = this.stage.stageWidth / 2;
        keeper.y = this.stage.stageHeight * 0.8;
        this.addChild(keeper);
        //添加门框
        var doorTexture = RES.getRes("door_png");
        var door = new egret.Bitmap(doorTexture);
        this.addChild(door);
        //添加点击区域
        var areaWidth = this.doorWidth / 3;
        var areaHeight = this.doorHeight / 3;
        for (var i = 0; i < 9; i++) {
            var areaX = this.doorX + this.doorWidth / 3 * (i % 3);
            var areaY = this.doorY + this.doorHeight / 3 * Math.floor(i / 3);
            var area = new Area(i, areaWidth, areaHeight);
            area.x = areaX;
            area.y = areaY;
            area.touchEnabled = true;
            this.areaList.push(area);
            this.addChild(area);
            //添加点击事件
            area.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
                var area = event.target;
                area.flash();
                //存储点击序列
                _this.doorIndex = area.index;
            }, this);
        }
        //添加进度
        var processNode = new process.ProcessNode();
        processNode.initData(4, 10);
        this.addChild(processNode);
        processNode.x = this.stage.stageWidth - processNode.width - Config.Constant.EDGE;
        processNode.y = Config.Constant.EDGE;
    };
    /**
     * 初始化游戏
     * @param team 目标队伍
     */
    GameScene.prototype.reload = function (targetTeam) {
        var _this = this;
        if (this.targetTeam) {
            if (targetTeam.name == this.targetTeam.name) {
                //判断是否需要重写开始
                //添加弹窗
                var alert_1 = getAlert("是否重新开始");
                this.addChild(alert_1);
                this.isShowAlert = true;
                //添加点击接受事件
                alert_1.addEventListener(MyEvent.ButtonEvent.ACCEPT, function () {
                    _this.isShowAlert = false;
                    _this.removeChild(alert_1);
                    _this.restart();
                }, this);
                //添加点击取消事件
                alert_1.addEventListener(MyEvent.ButtonEvent.CANCEL, function () {
                    _this.isShowAlert = false;
                    _this.removeChild(alert_1);
                }, this);
            }
            else {
                this.targetTeam = targetTeam;
                //重新开始
                this.restart();
            }
        }
        else {
            this.targetTeam = targetTeam;
            //开始
            this.restart();
        }
        //提示点击区域
        for (var _i = 0, _a = this.areaList; _i < _a.length; _i++) {
            var area = _a[_i];
            area.flash();
        }
    };
    /**
     * 重新开始
     */
    GameScene.prototype.restart = function () {
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map