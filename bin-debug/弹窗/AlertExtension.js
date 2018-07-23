/**
 * 弹窗
 * @param message 消息内容
 */
function getAlert(message, acceptTitle, cancelTitle) {
    if (acceptTitle === void 0) { acceptTitle = null; }
    if (cancelTitle === void 0) { cancelTitle = null; }
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    //iphone系列比较特殊，尺寸需要翻倍
    var bet = 1;
    switch (clientWidth) {
        case 320://iphone4\5
            bet = 2;
            break;
        case 375://iphone 6
            bet = 2;
            break;
        case 414://iphone 6+
            bet = 3;
            break;
        default:
            bet = 1;
            break;
    }
    var width = clientWidth * bet;
    var height = clientHeight * bet;
    //创建背景
    var bg = new egret.Sprite();
    bg.width = width;
    bg.height = height;
    bg.graphics.beginFill(0xffffff, 0.5);
    bg.graphics.drawRect(0, 0, width, height);
    bg.graphics.endFill();
    //添加弹窗
    var alertWidth = width * 0.6;
    var alertHeight = height * 0.6;
    var alertX = (width - alertWidth) / 2;
    var alertY = (height - alertHeight) / 2;
    var alertRadius = 64;
    bg.graphics.lineStyle(16, 0xffffff, 0.5, false, egret.StageScaleMode.EXACT_FIT, egret.CapsStyle.NONE, egret.JointStyle.BEVEL);
    bg.graphics.beginFill(0x0f0f0f, 1);
    bg.graphics.drawRoundRect(alertX, alertY, alertWidth, alertHeight, alertRadius, alertRadius);
    bg.graphics.endFill();
    //添加文字
    var titleLabel = new egret.BitmapText();
    titleLabel.font = RES.getRes("font_fnt");
    titleLabel.textAlign = egret.HorizontalAlign.CENTER;
    titleLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
    titleLabel.text = message;
    var titleLabelScale = 0.8;
    titleLabel.width = alertWidth;
    titleLabel.height = alertHeight;
    titleLabel.x = (1 - titleLabelScale) * alertWidth;
    titleLabel.y = (1 - titleLabelScale) * alertHeight;
    titleLabel.scaleX = titleLabel.scaleY = titleLabelScale;
    bg.addChild(titleLabel);
    bg.touchEnabled = true;
    //添加actions 
    var hasAccept = acceptTitle == undefined;
    var hasCancel = cancelTitle == undefined;
    if (hasAccept) {
        //添加accept按钮
        var btnWidth = 240;
        var btnHeight = 140;
        var btnY = alertY + alertHeight - btnHeight - Config.Constant.EDGE;
        var btnRadius = Config.Constant.RADIUS_BUTTON;
        var btnTexture = RES.getRes("");
        var acceptBtn = new egret.Sprite();
        acceptBtn.graphics.beginFill(Config.Constant.COLOR_BUTTON_NORMAL);
        acceptBtn.graphics.drawRoundRect(0, 0, btnWidth, btnHeight, btnRadius, btnRadius);
        acceptBtn.width = btnWidth;
        acceptBtn.height = btnHeight;
        bg.addChild(acceptBtn);
        acceptBtn.touchEnabled = true;
        acceptBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //发送点击事件
            var acceptEvent = new MyEvent.ButtonEvent(MyEvent.ButtonEvent.ACCEPT);
            bg.dispatchEvent(acceptEvent);
        }, this);
        if (hasCancel) {
            //添加cancel按钮                            
            var cancelBtn = new egret.Sprite();
            cancelBtn.graphics.beginFill(Config.Constant.COLOR_BUTTON_NORMAL);
            cancelBtn.graphics.drawRoundRect(0, 0, btnWidth, btnHeight, btnRadius, btnRadius);
            cancelBtn.width = btnWidth;
            cancelBtn.height = btnHeight;
            bg.addChild(cancelBtn);
            cancelBtn.touchEnabled = true;
            cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                //发送点击事件
                var cancelEvent = new MyEvent.ButtonEvent(MyEvent.ButtonEvent.CANCEL);
                bg.dispatchEvent(cancelEvent);
            }, this);
            cancelBtn.x = clientWidth / 2 - Config.Constant.EDGE - btnWidth;
            cancelBtn.y = btnY;
            acceptBtn.x = clientWidth / 2 + Config.Constant.EDGE;
            acceptBtn.y = btnY;
        }
        else {
            acceptBtn.x = clientWidth / 2 - btnWidth / 2;
            acceptBtn.y = btnY;
        }
    }
    return bg;
}
//# sourceMappingURL=AlertExtension.js.map