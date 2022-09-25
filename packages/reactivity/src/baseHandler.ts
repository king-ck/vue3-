/*
 * @Author: 1016144182@qq.com caokai19961224@gmail.com
 * @Date: 2022-09-25 20:57:34
 * @LastEditors: 1016144182@qq.com caokai19961224@gmail.com
 * @LastEditTime: 2022-09-25 21:29:08
 * @FilePath: \vue3源码学习\packages\reactivity\src\baseHandler.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { activeEffect } from "./effect";
export const enum ReactiveFlags {
    IS_REACTIVE = "__V_isReactive"
}
export const mutableHanlders = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true;
        }
        //取代理对象上取值就走get
        // return target[key];
        //可以监控到用户取值了
        return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
        //去代理上设置值执行set
        // target[key] = value;
        //这里可以监控到用户设置值了
        return Reflect.set(target, key, value, receiver);
    }
};
