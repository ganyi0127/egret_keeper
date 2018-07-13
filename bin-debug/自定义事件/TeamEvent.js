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
/**
 * TeamEvent
 */
var TeamEvent = (function (_super) {
    __extends(TeamEvent, _super);
    function TeamEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    TeamEvent.ENTER_FINAL = "进入赛事";
    TeamEvent.EMPTY_FINAL = "无赛事";
    return TeamEvent;
}(egret.Event));
__reflect(TeamEvent.prototype, "TeamEvent");
//# sourceMappingURL=TeamEvent.js.map