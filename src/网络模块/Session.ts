module Session {
    const host = "http://localhost:8082"

    /**
     * 获取排行榜
     * @param {number} page 分页
     * @param {block} onCompleted 完成回调
     * @param {any} thisObject
     */
    export function getList(page: number, onCompleted: (event: egret.Event) => void, thisObject: any) {
        
        var url: string = `${host}/list`
        var loader = new egret.URLLoader()
        loader.addEventListener(egret.Event.COMPLETE, onCompleted, thisObject)
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT
        var request = new egret.URLRequest(url)
        request.method = egret.URLRequestMethod.POST

        // const header = new egret.URLRequestHeader("Content-type", "application/x-www-form-urlencoded")
        // request.requestHeaders.push(header)

        const dataStr = `offset=${page}&limit=${20}`        
        request.data = new egret.URLVariables(dataStr)

        loader.load(request)
    }
}