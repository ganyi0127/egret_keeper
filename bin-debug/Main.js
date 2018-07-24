//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    /**
     * init
     */
    function Main() {
        var _this = _super.call(this) || this;
        /**
         * 菜单
         */
        _this.menuScene = new MenuScene();
        /**
         * 游戏模型
         */
        _this.gameScene = new GameScene();
        /**
         * 判断是否显示弹窗
         */
        _this.isAlertShow = false;
        /**
         * 判断是否显示菜单
         */
        _this.isMenuShow = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        var _this = this;
        egret.lifecycle.addLifecycleListener(function (context) {
            context.onUpdate = _this.onUpdate;
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    /**
     * 更新
     */
    Main.prototype.onUpdate = function () {
    };
    /**
     * 运行项目
     */
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.config();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加载资源
     */
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 初始化配置
     */
    Main.prototype.config = function () {
        var dataInstance = DataInstance.getInstance();
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        this.addChild(this.gameScene);
        this.addChild(this.menuScene);
        //添加菜单按钮
        var mbWidth = 240;
        var mbHeight = 180;
        var mbRadius = Config.Constant.RADIUS_BUTTON;
        var menuButtonTexture = RES.getRes("");
        var menuButton = new egret.Sprite();
        menuButton.graphics.beginFill(Config.Constant.COLOR_BUTTON_NORMAL);
        menuButton.graphics.drawRoundRect(0, 0, mbWidth, mbHeight, mbRadius, mbRadius);
        menuButton.x = menuButton.y = Config.Constant.EDGE;
        menuButton.width = mbWidth;
        menuButton.height = mbHeight;
        this.addChild(menuButton);
        menuButton.touchEnabled = true;
        menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (!_this.gameScene.isShowAlert) {
                _this.showMenu(true);
            }
        }, this);
        Session.getList(0, function (event) {
            var loader = event.target;
            console.log("response: %s", loader.data);
        }, this);
    };
    /**
     * 显示/关闭菜单
     * @param isMenuShow 是否显示菜单
     */
    Main.prototype.showMenu = function (isMenuShow) {
        if (this.isMenuShow == isMenuShow) {
            return;
        }
        this.isMenuShow = isMenuShow;
        var x = isMenuShow ? 0 : this.stage.stageWidth;
        var tw = egret.Tween.get(this.menuScene);
        tw.to({ x: x }, 500, egret.Ease.sineOut);
    };
    /**
     * 接受进入比赛事件
     */
    Main.prototype.onEnterToFinal = function (event) {
        var _this = this;
        if (event.code == 0) {
            //成功
            this.showMenu(false);
            //进入比赛
            this.gameScene.reload(event.team);
        }
        else {
            //失败
            //添加弹窗
            var alert_1 = getAlert(event.message);
            this.addChild(alert_1);
            this.isAlertShow = true;
            //创建一个计时器对象
            var timer = new egret.Timer(500, 5);
            //注册事件侦听器
            timer.addEventListener(egret.TimerEvent.TIMER, function () {
                //开始计时
            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                //结束计时                
                _this.removeChild(alert_1);
                _this.isAlertShow = false;
            }, this);
            //开始计时
            timer.start();
            //添加点击取消事件
            alert_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                timer.stop();
                //结束计时                
                _this.removeChild(alert_1);
                _this.isAlertShow = false;
            }, this);
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map