///<reference path="Player.ts"/>
/**
 * 守门员
 */
module Player {
    /**
     * 守门员
     */
    export class keeper extends Player {
        
        config(){
            super.config()
            
        }

        createContents(){
            super.config()
        }

        changeTeam(team: Team) {
            super.changeTeam(team)
            
        }
    }
}