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
 * 射手
 */
var Player;
(function (Player) {
    /**
     * 射手
     */
    var Shooter = (function (_super) {
        __extends(Shooter, _super);
        function Shooter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Shooter.prototype.config = function () {
            _super.prototype.config.call(this);
        };
        Shooter.prototype.createContents = function () {
            _super.prototype.config.call(this);
        };
        Shooter.prototype.changeTeam = function (team) {
            _super.prototype.changeTeam.call(this, team);
        };
        return Shooter;
    }(Player.Player));
    Player.Shooter = Shooter;
    __reflect(Shooter.prototype, "Player.Shooter");
})(Player || (Player = {}));
//# sourceMappingURL=Shooter.js.map