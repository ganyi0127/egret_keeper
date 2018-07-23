/**
 * 角色
 */
module Player {
    /**
     * 角色接口
     */
    export interface IPlayer {
        /**
         * 队伍
         */
        team:Team                

        /**
         * 添加到舞台
         */
        onAddToStage(event: egret.Event)

        /**
         * 配置属性
         */
        config()

        /**
         * 创建内容
         */
        createContents()

        /**
         * 更换球队
         */
        changeTeam(team: Team)
    }

    /**
     * 角色类
     */
    export class Player extends egret.Sprite implements IPlayer {
        team:Team

        /**
          * init 
          */
        constructor() {
            super()

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        }

        onAddToStage(event: egret.Event) {
            this.config()
            this.createContents()
        }

        config() {

        }

        createContents() {

        }

        changeTeam(team: Team) {
            this.team = team
        }
    }
}