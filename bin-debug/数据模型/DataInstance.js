var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataInstance = (function () {
    function DataInstance() {
        //加载资源
        this.loadResource();
    }
    DataInstance.getInstance = function () {
        if (!DataInstance.instance) {
            DataInstance.instance = new DataInstance();
        }
        return this.instance;
    };
    /**
     * 加载数据
     */
    DataInstance.prototype.loadResource = function () {
        this.matchs = RES.getRes("matchsData_json");
        this.teamMap = RES.getRes("teamsData_json");
    };
    return DataInstance;
}());
__reflect(DataInstance.prototype, "DataInstance");
//# sourceMappingURL=DataInstance.js.map