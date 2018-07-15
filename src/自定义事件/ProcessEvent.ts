/// <reference path="TeamEvent.ts" />
module MyEvent {
    export class ProcessEvent extends egret.Event {

        /**
         * 添加进球事件
         */
        static ADD_GOAL = "添加进球"

        /**
         * 判断是否为自己
         */
        isSelf = false 

        

        /**
         * init 
         */
        constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
            super(type, bubbles, cancelable)
        }
    }
}