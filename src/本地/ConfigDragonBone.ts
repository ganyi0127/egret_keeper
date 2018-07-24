///<reference path="Config.ts"/>
module Config {
    /**
     * 获取骨骼
     * @param fileName 文件名
     */
    export function getArmature(fileName: string): dragonBones.Armature {

        const dragonbonesData = RES.getRes(`${fileName}_ske_json`)
        const textureData = RES.getRes(`${fileName}_tex_json`)
        const texture = RES.getRes(`${fileName}_tex_png`)

        const dragonbonesFactory = new dragonBones.EgretFactory()
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData))
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretSheetAtlas(texture, textureData))

        const armature = dragonbonesFactory.buildArmature("armatureName")

        //添加大时钟
        dragonBones.WorldClock.clock.add(armature)
        egret.Ticker.getInstance().register((advancedTime) => {
            dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000)
        }, this)

        return armature
    }
}