/// <reference path="MyEvent.ts"/>
module MyEvent {
    /**
     * 按钮事件
     */
    export class ButtonEvent extends egret.Event {
        /**
         * 点击取消事件
         */
        static CANCEL = "取消"

        /**
         * 点击接受事件
         */
        static ACCEPT = "接受"
        

        /**
         * init 
         */
        constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
            super(type, bubbles, cancelable)
        }
    }
}