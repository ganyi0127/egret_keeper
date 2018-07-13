var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Team = (function () {
    function Team() {
    }
    /**
     * 转换为JSON对象
     */
    Team.prototype.toJSON = function () {
        return {
            name: this.name,
            strength: this.strength
        };
    };
    /**
     * 读取JSON对象
     */
    Team.prototype.fromJSON = function (obj) {
        this.name = obj.name;
        this.strength = obj.strength;
    };
    return Team;
}());
__reflect(Team.prototype, "Team");
//# sourceMappingURL=Team.js.map