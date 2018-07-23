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
///<reference path="Player.ts"/>
/**
 * 守门员
 */
var Player;
(function (Player) {
    /**
     * 守门员
     */
    var keeper = (function (_super) {
        __extends(keeper, _super);
        function keeper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        keeper.prototype.config = function () {
            _super.prototype.config.call(this);
        };
        keeper.prototype.createContents = function () {
            _super.prototype.config.call(this);
        };
        keeper.prototype.changeTeam = function (team) {
            _super.prototype.changeTeam.call(this, team);
        };
        return keeper;
    }(Player.Player));
    Player.keeper = keeper;
    __reflect(keeper.prototype, "Player.keeper");
})(Player || (Player = {}));
//# sourceMappingURL=Keeper.js.map