/**
 * 弹窗
 * @param message 消息内容 
 */
function getAlert(message: string): egret.Sprite {
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight

    //iphone系列比较特殊，尺寸需要翻倍
    let bet = 1
    switch (clientWidth) {
        case 320://iphone4\5
            bet = 2
            break
        case 375://iphone 6
            bet = 2
            break
        case 414://iphone 6+
            bet = 3
            break
        default:
            bet = 1
            break
    }

    const width = clientWidth * bet
    const height = clientHeight * bet


    //创建背景
    const bg = new egret.Sprite()
    bg.width = width
    bg.height = height

    bg.graphics.beginFill(0xffffff, 0.5)
    bg.graphics.drawRect(0, 0, width, height)
    bg.graphics.endFill()

    //添加弹窗
    const alertWidth = width * 0.6
    const alertHeight = height * 0.6
    const alertX = (width - alertWidth) / 2
    const alertY = (height - alertHeight) / 2
    const alertRadius = 64
    bg.graphics.lineStyle(16, 0xffffff, 0.5, false, egret.StageScaleMode.EXACT_FIT, egret.CapsStyle.NONE, egret.JointStyle.BEVEL)
    bg.graphics.beginFill(0x0f0f0f, 1)
    bg.graphics.drawRoundRect(alertX, alertY, alertWidth, alertHeight, alertRadius, alertRadius)
    bg.graphics.endFill()

    //添加文字
    var titleLabel = new egret.BitmapText()
    titleLabel.font = RES.getRes("font_fnt")
    titleLabel.textAlign = egret.HorizontalAlign.CENTER
    titleLabel.verticalAlign = egret.VerticalAlign.MIDDLE
    titleLabel.text = message
    var titleLabelScale = 0.8
    titleLabel.width = alertWidth
    titleLabel.height = alertHeight
    titleLabel.x = (1 - titleLabelScale) * alertWidth
    titleLabel.y = (1 - titleLabelScale) * alertHeight
    titleLabel.scaleX = titleLabel.scaleY = titleLabelScale
    bg.addChild(titleLabel)

    bg.touchEnabled = true
    return bg
}