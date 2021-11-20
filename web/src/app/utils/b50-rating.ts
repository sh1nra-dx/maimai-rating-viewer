import { IMusicChart } from "@/app/data/maidx-prober/interface"
import Achievement from "./achievement"

/**
 *  舞萌DX底分对象查看器 - B50数据操作函数定义
 * 
 *  @author X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

/**
 *  把当前版本的Rating转换为Splash Plus的Rating
 * 
 *  @param {number} ds 谱面定数
 *  @param {number} achievement 谱面达成率
 *  @returns {number} 转换后的Rating
 *  @link {https://github.com/Yuri-YuzuChaN/maimaiDX/blob/main/libraries/maimai_best_40.py#L406}
 */

export function b50Rating(ds: number, achievement: number): number {
    let baseRa: number = 22.4
    if (achievement < Achievement.C) {
        baseRa = 0.0
    } else if (achievement < Achievement.B) {
        baseRa = 8.0
    } else if (achievement < Achievement.BB) {
        baseRa = 9.6
    } else if (achievement < Achievement.BBB) {
        baseRa = 11.2
    } else if (achievement < Achievement.A) {
        baseRa = 12.0
    } else if (achievement < Achievement.AA) {
        baseRa = 13.6
    } else if (achievement < Achievement.AAA) {
        baseRa = 15.2
    } else if (achievement < Achievement.S) {
        baseRa = 16.8
    } else if (achievement < Achievement.Sp) {
        baseRa = 20.0
    } else if (achievement < Achievement.SS) {
        baseRa = 20.0
    } else if (achievement < Achievement.SSp) {
        baseRa = 20.8
    } else if (achievement < Achievement.SSS) {
        baseRa = 21.1
    } else if (achievement < Achievement.SSSp) {
        baseRa = 21.6
    }
    return Math.floor(ds * (Math.min(100.5, achievement) / 100) * baseRa)
}

/**
 *  对谱面信息数组进行Rating重写
 * 
 *  @param {Array<IMusicChart>} charts 谱面信息数组
 *  @returns {Array<IMusicChart>} 经过Rating转换后的谱面信息数组
 */

export function overrideRating(charts: Array<IMusicChart>): Array<IMusicChart> {
    let arr: Array<IMusicChart> = []
    charts.forEach((music: IMusicChart) => {
        music.ra = b50Rating(music.ds, music.achievements)
        arr.push(music)
    })
    return arr
}
