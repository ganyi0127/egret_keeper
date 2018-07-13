/// <reference path="Config.ts" />
/**
 * 存储
 */
var Config;
(function (Config) {
    /**
     * 存储赛事数据
     */
    function setFinal(chapter, final, index, team) {
        var key = getItemKey(chapter, final, index);
        if (team) {
            var json = JSON.stringify(team.toJSON);
            localStorage.setItem(key, json);
        }
        else {
            localStorage.removeItem(key);
        }
    }
    Config.setFinal = setFinal;
    /**
     * 读取赛事数据
     */
    function getFinal(chapter, final, index) {
        var key = getItemKey(chapter, final, index);
        var json = localStorage.getItem(key);
        if (json) {
            var jsonObj = JSON.parse(json);
            var team = new Team();
            team.fromJSON(jsonObj);
            return team;
        }
        else {
            return null;
        }
    }
    Config.getFinal = getFinal;
    /**
     * 获取赛事item_key
     */
    function getItemKey(chapter, final, index) {
        var _chapter = chapter;
        if (_chapter < 0) {
            _chapter = 0;
        }
        else if (_chapter > DataInstance.getInstance().matchs.length - 1) {
            _chapter = DataInstance.getInstance().matchs.length - 1;
        }
        var _index = index;
        if (_index < 0) {
            _index = 0;
        }
        switch (final) {
            case Config.Final.RegularFinal://小组赛
                if (_index > 32 - 1) {
                    _index = 32 - 1;
                }
                break;
            case Config.Final.HalfQuarterfinal://八分之一决赛
                if (_index > 8 - 1) {
                    _index = 8 - 1;
                }
                break;
            case Config.Final.Quarterfinal://四分之一决赛
                if (_index > 4 - 1) {
                    _index = 4 - 1;
                }
                break;
            case Config.Final.Semifinals://半决赛
                if (_index > 2 - 1) {
                    _index = 2 - 1;
                }
                break;
            case Config.Final.Finals://决赛
                if (_index > 1 - 1) {
                    _index = 1 - 1;
                }
                break;
            default:
                _index = 0;
                break;
        }
        return _chapter + "_" + final + "_" + _index;
    }
})(Config || (Config = {}));
//# sourceMappingURL=ConfigFinal.js.map