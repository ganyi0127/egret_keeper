var Config;
(function (Config) {
    /**
     * 赛事进程
     */
    var Final;
    (function (Final) {
        Final[Final["RegularFinal"] = 0] = "RegularFinal";
        Final[Final["HalfQuarterfinal"] = 1] = "HalfQuarterfinal";
        Final[Final["Quarterfinal"] = 2] = "Quarterfinal";
        Final[Final["Semifinals"] = 3] = "Semifinals";
        Final[Final["Finals"] = 4] = "Finals";
    })(Final = Config.Final || (Config.Final = {}));
})(Config || (Config = {}));
//# sourceMappingURL=Config.js.map