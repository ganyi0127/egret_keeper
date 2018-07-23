/// <reference path="Config.ts"/>
/**
 * 常量
 */
module Config {
    /**
     * 常量
     */
    export class Constant {
        /**
         * 按钮颜色
         */
        static get COLOR_BUTTON_NORMAL(): number { return 0x05132e }

        /**
         * 按钮颜色（取消状态)
         */
        static get COLOR_BUTTON_CANCEL():number{return 0x614a5a}

        /**
         * 面板颜色
         */
        static get COLOR_BACKGROUND(): number {
            return 0x6e6e8e
        }

        /**
         * 圆角
         */
        static get RADIUS_BUTTON(): number {
            return 32
        }

        /**
         * 边距
         */
        static get EDGE():number{
            return 16 
        }
    }
}