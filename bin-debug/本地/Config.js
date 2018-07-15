var Config;
(function (Config) {
    /**
     * 赛事进程
     */
    var Final;
    (function (Final) {
        /**
         * 小组赛
         */
        Final[Final["RegularFinal"] = 0] = "RegularFinal";
        /**
         * 八分之一决赛
         */
        Final[Final["HalfQuarterfinal"] = 1] = "HalfQuarterfinal";
        /**
         * 四分之一决赛
         */
        Final[Final["Quarterfinal"] = 2] = "Quarterfinal";
        /**
         * 半决赛
         */
        Final[Final["Semifinals"] = 3] = "Semifinals";
        /**
         * 决赛
         */
        Final[Final["Finals"] = 4] = "Finals";
        /**
         * 冠军
         */
        Final[Final["Champion"] = 5] = "Champion";
    })(Final = Config.Final || (Config.Final = {}));
})(Config || (Config = {}));
//# sourceMappingURL=Config.js.map