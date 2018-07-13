interface ITeamSerialized {
    name: string
    strength: number
}

class Team {
    /**
     * 队伍名
     */
    name: string

    /**
     * 队伍强度
     */
    strength: number

    /**
     * 转换为JSON对象
     */
    toJSON(): ITeamSerialized {
        return {
            name: this.name,
            strength: this.strength
        }
    }

    /**
     * 读取JSON对象
     */
    fromJSON(obj: ITeamSerialized) {
        this.name = obj.name
        this.strength = obj.strength
    }
}