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
var process;
(function (process) {
    /**
     * 进度节点
     */
    var ProcessNode = (function (_super) {
        __extends(ProcessNode, _super);
        /**
         * init
         */
        function ProcessNode() {
            var _this = _super.call(this) || this;
            /**
             * 高度
             */
            _this.height = 64;
            /**
             * 圆角
             */
            _this.radius = 16;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        ProcessNode.prototype.onAddToStage = function (event) {
            this.config();
            this.createContents();
        };
        ProcessNode.prototype.config = function () {
            this.width = this.stage.stageWidth * 0.4;
        };
        ProcessNode.prototype.createContents = function () {
            //绘制背景            
            this.graphics.beginFill(0xeeeeee, 1);
            this.graphics.drawRoundRect(0, 0, this.width, this.height, this.radius, this.radius);
            this.graphics.endFill();
        };
        return ProcessNode;
    }(egret.Sprite));
    process.ProcessNode = ProcessNode;
    __reflect(ProcessNode.prototype, "process.ProcessNode");
})(process || (process = {}));
//# sourceMappingURL=ProcessNode.js.map