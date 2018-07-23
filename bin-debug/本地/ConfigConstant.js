var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/// <reference path="Config.ts"/>
/**
 * 常量
 */
var Config;
(function (Config) {
    /**
     * 常量
     */
    var Constant = (function () {
        function Constant() {
        }
        Object.defineProperty(Constant, "COLOR_BUTTON_NORMAL", {
            /**
             * 按钮颜色
             */
            get: function () { return 0x05132e; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constant, "COLOR_BUTTON_CANCEL", {
            /**
             * 按钮颜色（取消状态)
             */
            get: function () { return 0x614a5a; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constant, "COLOR_BACKGROUND", {
            /**
             * 面板颜色
             */
            get: function () {
                return 0x6e6e8e;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constant, "RADIUS_BUTTON", {
            /**
             * 圆角
             */
            get: function () {
                return 32;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constant, "EDGE", {
            /**
             * 边距
             */
            get: function () {
                return 16;
            },
            enumerable: true,
            configurable: true
        });
        return Constant;
    }());
    Config.Constant = Constant;
    __reflect(Constant.prototype, "Config.Constant");
})(Config || (Config = {}));
//# sourceMappingURL=ConfigConstant.js.map