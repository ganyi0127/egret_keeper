var Session;
(function (Session) {
    var host = "http://localhost:8082";
    /**
     * 获取排行榜
     * @param {number} page 分页
     * @param onCompleted 完成回调
     * @param {any} thisObject
     */
    function getList(page, onCompleted, thisObject) {
        var url = host + "/list";
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, onCompleted, thisObject);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        // const header = new egret.URLRequestHeader("Content-type", "application/x-www-form-urlencoded")
        // request.requestHeaders.push(header)
        var dataStr = "offset=" + page + "&limit=" + 20;
        request.data = new egret.URLVariables(dataStr);
        loader.load(request);
    }
    Session.getList = getList;
})(Session || (Session = {}));
//# sourceMappingURL=Session.js.map