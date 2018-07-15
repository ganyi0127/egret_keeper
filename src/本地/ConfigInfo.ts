/// <reference path="Config.ts"/>
/**
 * 用户信息
 */
module Config {
    /**
     * 章节进度
     */
    export interface IProcessOfChapter {
        chapter: number
        final: Final
        index: number
    }

    const KEY_NAME = "name"

    /**
     * 存储用户名
     * @param username 新用户名
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

    /**
     * 根据章节id获取章节进度
     * @param chapter 章节ID      
     */
    export function getProcessOfChapter(chapter: number): IProcessOfChapter {
        var result = localStorage.getItem(`chapter_${chapter}`)
        
        if (result) {
            var arr = result.split("_")
            if (arr.length == 2) {
                var final: Final = Number(arr[0])
                var index = Number(arr[2])
                return {
                    chapter: chapter,
                    final: final,
                    index: index
                }
            }            
        }
        return null
    }

    /**
     * 存储当前进度
     * @param process 章节进度
     */
    export function setFinal(process:IProcessOfChapter) {
        localStorage.setItem(`chapter_${process.chapter}`, `${process.final}_${process.index}`)
    }
}