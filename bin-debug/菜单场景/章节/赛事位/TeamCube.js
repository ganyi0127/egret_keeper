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
var TeamCube = (function (_super) {
    __extends(TeamCube, _super);
    /**
     * init
     */
    function TeamCube(final) {
        var _this = _super.call(this) || this;
        /**
         * 赛事进程(默认小组赛)
         */
        _this.final = Config.Final.RegularFinal;
        _this.final = final;
        _this.isRegularFinal = _this.final == Config.Final.RegularFinal;
        _this.widthLength = _this.isRegularFinal ? 88 : 140;
        _this.edge = _this.isRegularFinal ? 4 : 8;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        if (!_this.isRegularFinal) {
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        }
        return _this;
    }
    /**
     * 添加到场景
     */
    TeamCube.prototype.onAddToStage = function (event) {
        this.config();
        this.createContents();
    };
    TeamCube.prototype.config = function () {
        if (!this.isRegularFinal) {
            this.touchEnabled = true;
        }
    };
    TeamCube.prototype.createContents = function () {
        //背景
        var bgTexture = RES.getRes("");
        var bg = new egret.Bitmap(bgTexture);
        bg.x = bg.y = -this.widthLength / 2;
        bg.width = bg.height = this.widthLength;
        this.addChild(bg);
        //logo遮罩
        var maskX = this.edge - this.widthLength / 2;
        var maskY = this.edge - this.widthLength / 2;
        var maskWidth = this.widthLength - this.edge * 2;
        var maskHeight = this.widthLength - this.edge * 2;
        var maskRadius = 12;
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x000000, 1);
        mask.graphics.drawRoundRect(maskX, maskY, maskWidth, maskHeight, maskRadius, maskRadius);
        this.addChild(mask);
        this.logoMask = mask;
    };
    /**
     * 设置队伍logo
     */
    TeamCube.prototype.setTeam = function (team) {
        this.team = team;
        //队伍logo
        var logoTexture = RES.getRes("");
        var logo = new egret.Bitmap(logoTexture);
        logo.x = logo.y = this.logoMask.x;
        logo.width = logo.height = this.logoMask.width;
        this.addChild(logo);
        //设置遮罩
        logo.mask = this.logoMask;
    };
    /**
     * 点击事件
     */
    TeamCube.prototype.onTap = function (event) {
        //发送
        if (this.team) {
            var enterFinal = new TeamEvent(TeamEvent.ENTER_FINAL);
            enterFinal.team = this.team;
            enterFinal.final = this.final;
            this.dispatchEvent(enterFinal);
        }
        else {
            var emptyFinal = new TeamEvent(TeamEvent.EMPTY_FINAL);
            this.dispatchEvent(emptyFinal);
        }
    };
    return TeamCube;
}(egret.DisplayObjectContainer));
__reflect(TeamCube.prototype, "TeamCube");
//# sourceMappingURL=TeamCube.js.map