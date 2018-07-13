/**
 * TeamEvent
 */
class TeamEvent extends egret.Event {
    static ENTER_FINAL = "进入赛事"
    static EMPTY_FINAL = "无赛事"
    
    team: Team
    final: Config.Final

    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable)        
    }
}