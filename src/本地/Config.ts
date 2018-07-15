module Config {
    /**
     * 赛事进程
     */
    export enum Final {
        /**
         * 小组赛
         */
        RegularFinal = 0,
        /**
         * 八分之一决赛
         */
        HalfQuarterfinal,
        /**
         * 四分之一决赛
         */
        Quarterfinal,
        /**
         * 半决赛
         */
        Semifinals,
        /**
         * 决赛
         */
        Finals,
        /**
         * 冠军
         */
        Champion
    }
}