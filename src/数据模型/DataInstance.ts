class DataInstance {
    /**
     * 实例
     */
    private static instance: DataInstance

    /**
     * 赛事模型
     */
    public matchs: Match[]                             
    /**
     * 球队模型
     */
    public teamMap: { [key: string]: Team }              
    /**
     * 中国队
     */
    public chinaTeam: Team          


    private constructor() {
        //加载资源
        this.loadResource()
    }
    static getInstance(): DataInstance {
        if (!DataInstance.instance) {
            DataInstance.instance = new DataInstance() 
        }
        return this.instance 
    }

    /**
     * 加载数据
     */
    private loadResource() {
        this.matchs = RES.getRes("matchsData_json")                             
        this.teamMap = RES.getRes("teamsData_json")  

        this.chinaTeam = this.teamMap["CN"]         
    }
}