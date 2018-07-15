/// <reference path="Config.ts"/>
/**
 * 用户信息
 */
var Config;
(function (Config) {
    var KEY_NAME = "name";
    /**
     * 存储用户名
     * @param username 新用户名
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
    /**
     * 根据章节id获取章节进度
     * @param chapter 章节ID
     */
    function getProcessOfChapter(chapter) {
        var result = localStorage.getItem("chapter_" + chapter);
        if (result) {
            var arr = result.split("_");
            if (arr.length == 2) {
                var final = Number(arr[0]);
                var index = Number(arr[2]);
                return {
                    chapter: chapter,
                    final: final,
                    index: index
                };
            }
        }
        return null;
    }
    Config.getProcessOfChapter = getProcessOfChapter;
    /**
     * 存储当前进度
     * @param process 章节进度
     */
    function setFinal(process) {
        localStorage.setItem("chapter_" + process.chapter, process.final + "_" + process.index);
    }
    Config.setFinal = setFinal;
})(Config || (Config = {}));
//# sourceMappingURL=ConfigInfo.js.map