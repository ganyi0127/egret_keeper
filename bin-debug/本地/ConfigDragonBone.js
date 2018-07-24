///<reference path="Config.ts"/>
var Config;
(function (Config) {
    /**
     * 获取骨骼
     * @param fileName 文件名
     */
    function getArmature(fileName) {
        var dragonbonesData = RES.getRes(fileName + "_ske_json");
        var textureData = RES.getRes(fileName + "_tex_json");
        var texture = RES.getRes(fileName + "_tex_png");
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretSheetAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmature("armatureName");
        //添加大时钟
        dragonBones.WorldClock.clock.add(armature);
        egret.Ticker.getInstance().register(function (advancedTime) {
            dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
        }, this);
        return armature;
    }
    Config.getArmature = getArmature;
})(Config || (Config = {}));
//# sourceMappingURL=ConfigDragonBone.js.map