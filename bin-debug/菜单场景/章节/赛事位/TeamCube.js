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
        /**
         * 是否为冠军比赛位
         */
        _this.isChampion = false;
        /**
         * 是否可比赛
         */
        _this.canOppose = false;
        _this.final = final;
        _this.isRegularFinal = _this.final == Config.Final.RegularFinal;
        switch (_this.final) {
            case Config.Final.RegularFinal:
                _this.widthLength = 80;
                _this.edge = 4;
                break;
            case Config.Final.Semifinals:
                _this.widthLength = 170;
                _this.edge = 8;
                break;
            case Config.Final.Finals:
                _this.widthLength = 220;
                _this.edge = 16;
                break;
            default:
                _this.widthLength = 140;
                _this.edge = 8;
                break;
        }
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        if (_this.final != Config.Final.HalfQuarterfinal) {
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
        this.touchEnabled = true;
    };
    TeamCube.prototype.createContents = function () {
        //背景
        var spriteSheet = RES.getRes("flag_json");
        var bgTexture = spriteSheet.getTexture("中国");
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
        mask.graphics.endFill();
        this.addChild(mask);
        this.logoMask = mask;
        //设置logo
        if (this.team) {
            //移除原有logo
            var oldLogo = this.getChildByName("logo");
            if (oldLogo) {
                this.removeChild(oldLogo);
            }
            //队伍logo
            var spriteSheet_1 = RES.getRes("flag_json");
            var logoTexture = spriteSheet_1.getTexture(this.team.name);
            var logo = new egret.Bitmap(logoTexture);
            logo.x = logo.y = maskX;
            logo.width = logo.height = maskWidth;
            logo.name = "logo";
            this.addChild(logo);
            //设置遮罩
            logo.mask = this.logoMask;
        }
    };
    /**
     * 设置队伍logo
     */
    TeamCube.prototype.setTeam = function (team) {
        this.team = team;
    };
    /**
     * 点击事件
     */
    TeamCube.prototype.onTap = function (event) {
        //发送        
        var enterFinal = new MyEvent.TeamEvent(MyEvent.TeamEvent.ENTER_FINAL);
        enterFinal.team = this.targetTeam;
        enterFinal.final = this.final;
        if (this.canOppose) {
            enterFinal.allow = true;
            enterFinal.message = "开始比赛";
            enterFinal.code = 0;
        }
        else if (this.hasWon) {
            enterFinal.allow = false;
            enterFinal.message = "已结束";
            enterFinal.code = 1;
        }
        else {
            enterFinal.allow = false;
            enterFinal.message = "无法开始";
            enterFinal.code = 2;
        }
        var obj;
        while (!(egret.is(obj, "Main"))) {
            if (obj) {
                obj = obj.parent;
            }
            else {
                obj = this;
            }
        }
        var main = obj;
        if (!main.isAlertShow) {
            this.addEventListener(MyEvent.TeamEvent.ENTER_FINAL, obj.onEnterToFinal, obj);
            this.dispatchEvent(enterFinal);
            this.removeEventListener(MyEvent.TeamEvent.ENTER_FINAL, obj.onEnterToFinal, obj);
        }
    };
    return TeamCube;
}(egret.DisplayObjectContainer));
__reflect(TeamCube.prototype, "TeamCube");
//# sourceMappingURL=TeamCube.js.map