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
var ChapterNode = (function (_super) {
    __extends(ChapterNode, _super);
    /**
     * init
     */
    function ChapterNode(match) {
        var _this = _super.call(this) || this;
        _this.match = match;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ChapterNode.prototype.onAddToStage = function (event) {
        var _this = this;
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = _this.onUpdate;
        });
        this.config();
        this.createContents();
    };
    ChapterNode.prototype.config = function () {
        this.bgWidth = this.stage.stageWidth * 0.8;
        this.bgHeight = this.stage.stageHeight * 0.8;
        this.bgX = (this.stage.stageWidth - this.bgWidth) / 2;
        this.bgY = (this.stage.stageHeight - this.bgHeight) / 2;
        this.finalTotalWidth = this.bgWidth * 0.9;
        this.finalTotalHeight = this.bgHeight - 200;
        this.finalCenterX = this.stage.stageWidth / 2;
        this.finalCenterY = this.bgY + this.bgHeight - this.finalTotalHeight / 2 - 50;
        this.finalInterval = (this.finalTotalWidth - 180) / 8;
    };
    ChapterNode.prototype.createContents = function () {
        //添加背景
        var bg = new egret.Shape();
        bg.graphics.lineStyle(16, 0xffffff, 0.5, false, egret.StageScaleMode.EXACT_FIT, egret.CapsStyle.NONE, egret.JointStyle.BEVEL, 0, [32, 32]);
        bg.graphics.beginFill(0x6e6e8e, 1);
        bg.graphics.drawRoundRect(this.bgX, this.bgY, this.bgWidth, this.bgHeight, 128, 256);
        bg.graphics.endFill();
        this.addChild(bg);
        this.bg = bg;
        //显示title
        var titleLabel = new egret.BitmapText();
        titleLabel.font = RES.getRes("font_fnt");
        titleLabel.textAlign = egret.HorizontalAlign.LEFT;
        titleLabel.text = this.match.year;
        titleLabel.x = this.bgX + 8;
        titleLabel.y = this.bgY + 8;
        this.addChild(titleLabel);
        //添加赛事
        this.addMatchs();
    };
    /**
     * 添加赛事
     */
    ChapterNode.prototype.addMatchs = function () {
        var _this = this;
        //创建小组赛比赛位
        for (var key in this.match.groups) {
            if (this.match.groups.hasOwnProperty(key)) {
                var teams = this.match.groups[key];
                //获取每组中心点
                var regularFinalPosition = this.getRegularFinalPosition(key);
                //遍历每组球队
                var teamCubeWidth;
                var teamCubeInterval = 8;
                teams.every(function (team, index, array) {
                    var teamCube = new TeamCube(Config.Final.RegularFinal);
                    if (!teamCubeWidth) {
                        teamCubeWidth = teamCube.widthLength;
                    }
                    var deltaPoint = _this.getRegularFinalOffset(index);
                    deltaPoint.x += regularFinalPosition.x;
                    deltaPoint.y += regularFinalPosition.y;
                    teamCube.x = deltaPoint.x;
                    teamCube.y = deltaPoint.y;
                    _this.addChild(teamCube);
                    return true;
                });
            }
        }
        //读取比赛位        
    };
    /**
     * 获取决赛位置
     */
    ChapterNode.prototype.getFinalsPosition = function () {
        var point = new egret.Point();
        point.x = this.stage.stageWidth / 2;
        point.y = this.bgY - 400;
        return point;
    };
    /**
     * 获取半决赛位置
     * @param key 组别
     */
    ChapterNode.prototype.getSemifinalsPosition = function (key) {
        var isLeftDirection = this.getDirection(key);
        var point = new egret.Point();
        point.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval);
        point.y = this.finalCenterY;
        return point;
    };
    /**
     * 获取四分之一决赛
     * @param key 组别
     * @param index 下标
     */
    ChapterNode.prototype.getQuarterfinalPosition = function (key, index) {
        var isLeftDirection = this.getDirection(key);
        var point = new egret.Point();
        point.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 2;
        point.y = this.finalCenterY + (index == 0 ? -this.finalTotalHeight : this.finalTotalHeight) / 2;
        return point;
    };
    /**
     * 获取八分之一决赛
     * @param key 组别
     * @param index 下标
     */
    ChapterNode.prototype.getHalfQuarterfinalPosition = function (key, index) {
        var isLeftDirection = this.getDirection(key);
        var point = new egret.Point();
        point.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 3;
        point.y = this.finalCenterY - this.finalTotalHeight / 2 + (this.finalTotalHeight / 4) / 2 + (this.finalTotalHeight / 4) * index;
        return point;
    };
    /**
     * 获取小组赛比赛位中心位置
     * @param key 组别
     */
    ChapterNode.prototype.getRegularFinalPosition = function (key) {
        var isLeftDirection = this.getDirection(key);
        var ascii = key.charCodeAt(0);
        var asciiA = "A".charCodeAt(0);
        var asciiE = "E".charCodeAt(0);
        var firstAscii = isLeftDirection ? asciiA : asciiE;
        var delta = ascii - firstAscii;
        var centerPosition = new egret.Point();
        centerPosition.x = this.finalCenterX + (isLeftDirection ? -this.finalInterval : this.finalInterval) * 4;
        centerPosition.y = this.finalCenterY - this.finalTotalHeight / 2 + (this.finalTotalHeight / 4) / 2 + (this.finalTotalHeight / 4) * delta;
        return centerPosition;
    };
    /**
     * 获取小组赛偏移
     * @param index 偏移
     */
    ChapterNode.prototype.getRegularFinalOffset = function (index) {
        var delta = (this.finalTotalHeight / 8) / 2;
        var point = new egret.Point();
        point.x = index == 0 || index == 2 ? -delta : delta;
        point.y = index == 0 || index == 1 ? -delta : delta;
        return point;
    };
    /**
     * 判断比赛位左右
     * @param key 组别
     */
    ChapterNode.prototype.getDirection = function (key) {
        var ascii = key.charCodeAt(0);
        var asciiA = "A".charCodeAt(0);
        return ascii - asciiA < 4;
    };
    /**
     * 更新
     */
    ChapterNode.prototype.onUpdate = function () {
    };
    return ChapterNode;
}(egret.DisplayObjectContainer));
__reflect(ChapterNode.prototype, "ChapterNode");
//# sourceMappingURL=ChapterNode.js.map