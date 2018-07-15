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
/// <reference path="TeamEvent.ts" />
var MyEvent;
(function (MyEvent) {
    var ProcessEvent = (function (_super) {
        __extends(ProcessEvent, _super);
        /**
         * init
         */
        function ProcessEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            /**
             * 判断是否为自己
             */
            _this.isSelf = false;
            return _this;
        }
        /**
         * 添加进球事件
         */
        ProcessEvent.ADD_GOAL = "添加进球";
        return ProcessEvent;
    }(egret.Event));
    MyEvent.ProcessEvent = ProcessEvent;
    __reflect(ProcessEvent.prototype, "MyEvent.ProcessEvent");
})(MyEvent || (MyEvent = {}));
//# sourceMappingURL=ProcessEvent.js.map