/*
 * @Author: 1016144182@qq.com caokai19961224@gmail.com
 * @Date: 2022-09-22 22:13:20
 * @LastEditors: 1016144182@qq.com caokai19961224@gmail.com
 * @LastEditTime: 2022-09-25 21:00:23
 * @FilePath: \vue3源码学习\packages\reactivity\src\reactive.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { isObject } from "shared";
import { mutableHanlders,ReactiveFlags } from "./baseHandler";

//1.将数据转化为响应式的数据，只能做对象的代理
const reactiveMap = new WeakMap(); //weakmap的key只能是对象，为了解决对同一个对象进行reactive的转化引用地址不相等，进行缓存

//1.实现同一个对象，代理多次，返回同一个代理
//2.代理对象被再次代理，可以直接返回
export function reactive(target) {
    if (!isObject(target)) {
        return;
    }
    if (target[ReactiveFlags.IS_REACTIVE]) {
        // 如果目标是一个代理对象，那么一定被代理过，执行这一步会触发get
        return target;
    }
    //并没有重新定义属性，只是代理，在取值的时候会调用get，当赋值的时候会调用set

    let exisitingProxy = reactiveMap.get(target);
    if (exisitingProxy) {
        return exisitingProxy;
    }

    //第一次普通对象代理，我们会通过new proxy代理一次
    //下一次你传递的是proxy，我们可以看一下他有没有代理过，如果访问过proxy，有get方法的时候就说明访问过了

    const proxy = new Proxy(target, mutableHanlders);
    reactiveMap.set(target, proxy);
    return proxy;
}

// let target = {
//     name: "zf",
//     get alias() {
//         // console.log(this);
//         return this.name;
//     }
// };
// const proxy = new Proxy(target, {
//     get(target, key, receiver) {
//         //取代理对象上取值就走get
//         // console.log(key);
//         // return target[key];
//         console.log(this);
//         return  Reflect.get(target, key, receiver)
//     },
//     set(target, key, value, receiver) {
//         //去代理上设置值执行set
//         target[key] = value;
//         return Reflect.set(target, key, value, receiver);
//     }
// });
// proxy.alias; //去alais上取了值时，也取了name。当时没有监控到name

//在页面中使用了alias对应的值，稍后name变化了，要重新渲染
