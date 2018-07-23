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
 * 角色
 */
var Player;
(function (Player_1) {
    /**
     * 角色类
     */
    var Player = (function (_super) {
        __extends(Player, _super);
        /**
          * init
          */
        function Player() {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        Player.prototype.onAddToStage = function (event) {
            this.config();
            this.createContents();
        };
        Player.prototype.config = function () {
        };
        Player.prototype.createContents = function () {
        };
        Player.prototype.changeTeam = function (team) {
            this.team = team;
        };
        return Player;
    }(egret.Sprite));
    Player_1.Player = Player;
    __reflect(Player.prototype, "Player.Player", ["Player.IPlayer"]);
})(Player || (Player = {}));
//# sourceMappingURL=Player.js.map