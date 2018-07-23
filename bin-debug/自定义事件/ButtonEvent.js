var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/// <reference path="MyEvent.ts"/>
var MyEvent;
(function (MyEvent) {
    /**
     * 按钮事件
     */
    var ButtonEvent = (function (_super) {
        __extends(ButtonEvent, _super);
        /**
         * init
         */
        function ButtonEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            return _super.call(this, type, bubbles, cancelable) || this;
        }
        /**
         * 点击取消事件
         */
        ButtonEvent.CANCEL = "取消";
        /**
         * 点击接受事件
         */
        ButtonEvent.ACCEPT = "接受";
        return ButtonEvent;
    }(egret.Event));
    MyEvent.ButtonEvent = ButtonEvent;
    __reflect(ButtonEvent.prototype, "MyEvent.ButtonEvent");
})(MyEvent || (MyEvent = {}));
//# sourceMappingURL=ButtonEvent.js.map