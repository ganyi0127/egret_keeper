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

class Main extends egret.DisplayObjectContainer {
    /**
     * 菜单
     */
    menuScene = new MenuScene()

    /**
     * 游戏模型
     */
    gameScene = new GameScene()

    /**
     * 判断是否显示弹窗
     */
    isAlertShow = false

    /**
     * 判断是否显示菜单
     */
    private isMenuShow = true

    /**
     * init
     */
    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = this.onUpdate;
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    /**
     * 更新
     */
    private onUpdate() {

    }

    /**
     * 运行项目
     */
    private async runGame() {
        await this.loadResource()
        this.config();
        this.createGameScene();
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    }

    /**
     * 加载资源
     */
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    /**
     * 初始化配置
     */
    private config() {
        var dataInstance = DataInstance.getInstance();
    }

    /**
     * 创建游戏场景    
     */
    private createGameScene() {
        this.addChild(this.gameScene)
        this.addChild(this.menuScene)

        //添加菜单按钮
        const mbWidth = 240
        const mbHeight = 200
        const mbRadius = 16
        const menuButtonTexture = RES.getRes("")
        const menuButton = new egret.Sprite()
        menuButton.graphics.beginFill(0x05132e, 1)
        menuButton.graphics.drawRoundRect(0, 0, mbWidth, mbHeight, mbRadius, mbRadius)
        menuButton.x = menuButton.y = 32
        menuButton.width = mbWidth
        menuButton.height = mbHeight
        this.addChild(menuButton)
        menuButton.touchEnabled = true
        menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.showMenu(true)
        }, this)
    }

    /**
     * 显示/关闭菜单
     * @param isMenuShow 是否显示菜单
     */
    showMenu(isMenuShow: boolean) {
        if (this.isMenuShow == isMenuShow) {
            return
        }
        this.isMenuShow = isMenuShow

        var x = isMenuShow ? 0 : this.stage.stageWidth

        var tw = egret.Tween.get(this.menuScene)
        tw.to({ x: x }, 500, egret.Ease.sineOut)
    }

    /**
     * 接受进入比赛事件
     */
    onEnterToFinal(event: MyEvent.TeamEvent) {
        if (event.code == 0) {
            //成功
            this.showMenu(false)

            //进入比赛
            this.gameScene.init(event.team)
        } else {
            //失败

            //添加弹窗
            const alert = getAlert(event.message)
            this.addChild(alert)

            this.isAlertShow = true


            //创建一个计时器对象
            var timer: egret.Timer = new egret.Timer(500, 5);
            //注册事件侦听器
            timer.addEventListener(egret.TimerEvent.TIMER, () => {
                //开始计时
            }, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
                //结束计时                
                this.removeChild(alert)
                this.isAlertShow = false
            }, this);
            //开始计时
            timer.start();

            //添加点击取消事件
            alert.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                timer.stop()
                //结束计时                
                this.removeChild(alert)
                this.isAlertShow = false
            }, this)
        }
    }
}