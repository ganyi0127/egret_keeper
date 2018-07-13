/// <reference path="Config.ts"/>
/**
 * 用户信息
 */
module Config {
    const KEY_NAME = "name"

    /**
     * 存储用户名
     */
    export function setUsername(username: string) {
        localStorage.setItem(KEY_NAME, username)
    }

    /**
     * 读取用户名
     */
    export function getUsername(): string {
        var username = localStorage.getItem(KEY_NAME)
        if (username) {
            return username
        }
        return null
    }
}