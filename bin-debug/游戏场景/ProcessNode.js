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
         * @param targetCount 目标数
         * @param maxCount 最大数
         */
        function ProcessNode(targetCount, maxCount) {
            if (targetCount === void 0) { targetCount = 0; }
            if (maxCount === void 0) { maxCount = 0; }
            var _this = _super.call(this) || this;
            /**
             * 高度
             */
            _this.height = 64;
            /**
             * 当前进球数
             */
            _this.curCount = 0;
            /**
             * 圆角
             */
            _this.radius = 16;
            _this.targetCount = targetCount;
            _this.maxCount = maxCount;
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
            //创建遮罩
            this.maskNode = new egret.Shape();
            this.maskNode.graphics.drawRect(0, 0, this.width, this.height);
            this.maskNode.cacheAsBitmap = true;
            this.addChild(this.maskNode);
            this.mask = this.maskNode;
            this.updateMask();
        };
        /**
         * 刷新遮罩
         */
        ProcessNode.prototype.updateMask = function () {
            var tw = egret.Tween.get(this.mask);
            var targetWidth;
            if (this.maxCount == 0) {
                targetWidth = 0;
            }
            else {
                targetWidth = this.width * this.curCount / this.maxCount;
            }
            tw.to({ "width": targetWidth }, 500, egret.Ease.elasticIn);
        };
        /**
         * 初始化数据
         * @param targetCount 目标数
         * @param maxCount 最大数
         */
        ProcessNode.prototype.initData = function (targetCount, maxCount) {
            this.targetCount = targetCount;
            this.maxCount = maxCount;
        };
        /**
         * 更新进球
         * @param subCount 添加数 默认+1
         */
        ProcessNode.prototype.addCount = function (subCount) {
            if (subCount === void 0) { subCount = 1; }
            this.curCount += subCount;
            if (this.curCount > this.maxCount) {
                this.curCount = this.maxCount;
            }
            this.updateMask();
        };
        /**
         * 重置
         */
        ProcessNode.prototype.reset = function () {
            this.curCount = 0;
            this.updateMask();
        };
        return ProcessNode;
    }(egret.Sprite));
    process.ProcessNode = ProcessNode;
    __reflect(ProcessNode.prototype, "process.ProcessNode");
})(process || (process = {}));
//# sourceMappingURL=ProcessNode.js.map