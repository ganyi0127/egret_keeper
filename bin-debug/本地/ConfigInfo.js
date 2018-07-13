/// <reference path="Config.ts"/>
/**
 * 用户信息
 */
var Config;
(function (Config) {
    var KEY_NAME = "name";
    /**
     * 存储用户名
     */
    function setUsername(username) {
        localStorage.setItem(KEY_NAME, username);
    }
    Config.setUsername = setUsername;
    /**
     * 读取用户名
     */
    function getUsername() {
        var username = localStorage.getItem(KEY_NAME);
        if (username) {
            return username;
        }
        return null;
    }
    Config.getUsername = getUsername;
})(Config || (Config = {}));
//# sourceMappingURL=ConfigInfo.js.map