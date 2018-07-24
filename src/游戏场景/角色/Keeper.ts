///<reference path="Player.ts"/>
/**
 * 守门员
 */
module Player {
    /**
     * 守门员
     */
    export class keeper extends Player {

        config() {
            super.config()

        }

        createContents() {
            super.createContents()
        
            //获取骨骼
            const armature = Config.getArmature("Rooster_Ani")
            this.addChild(armature.getDisplay())

            armature.animation.gotoAndPlay("rooster_idle_anim")
        }

        changeTeam(team: Team) {
            super.changeTeam(team)

        }
    }
}