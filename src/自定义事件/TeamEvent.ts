///<reference path="MyEvent.ts"/>
module MyEvent {
    /**
     * TeamEvent队伍事件
     */
    export class TeamEvent extends egret.Event {
        /**
         * 进入赛事事件
         */
        static ENTER_FINAL = "进入赛事"

        /**
         * 队伍
         */
        team?: Team

        /**
         * 比赛位
         */
        final: Config.Final

        /**
         * 错误码(0:成功)
         */
        code: number

        /**
         * 是否运行比赛
         */
        allow: boolean

        /**
         * 消息
         */
        message: string

        /**
         * init 
         */
        constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
            super(type, bubbles, cancelable)
        }
    }
}