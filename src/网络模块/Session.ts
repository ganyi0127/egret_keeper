module Session {
    const host = "http://localhost:8082"

    /**
     * 获取排行榜
     * @param page 分页
     * @param onCompleted 完成回调
     * @param thisObject
     */
    export function getList(page: number, onCompleted: (event: egret.Event) => void, thisObject: any) {

        var url: string = `${host}/list`
        var loader = new egret.URLLoader()
        loader.addEventListener(egret.Event.COMPLETE, onCompleted, thisObject)
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT
        var request = new egret.URLRequest(url)
        request.method = egret.URLRequestMethod.POST         
        request.requestHeaders = [
            new egret.URLRequestHeader("Content-type", "application/json;charset=UTF-8")
        ]
        const dataStr = `{offset:${page}}`
        const data = JSON.stringify(dataStr)
        request.data = new egret.URLVariables(dataStr)
        
        loader.load(request)
    }
}