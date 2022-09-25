/*
 * @LastEditors: 1016144182@qq.com caokai19961224@gmail.com
 * @Date: 2022-09-22 22:14:02
 * @LastEditTime: 2022-09-25 21:25:58
 * @FilePath: \vue3源码学习\packages\reactivity\src\effect.ts
 * @Description: watchEffect
 */

export let activeEffect = undefined;
class ReactiveEffect {
    //这里表示在实例上新增了active属性
    public active = true; //这个effect默认是激活状态
    constructor(public fn) {
        //用户传递的参数也会在this上  this.fn =fn
    }
    run() {
        //run就是执行effect
        if (!this.active) {
            //这里表示如果是非激活的情况，只需要执行函数，不需要进行依赖收紧
            this.fn();
        }

        try {
            //这里就要依赖收集  核心就是将当前的effect 和 稍后渲染的属性关联在一起
            activeEffect = this;
            this.fn(); //当稍后调用取值操作的时候。就可以获取到全局的activeEffect
        } finally {
            activeEffect = undefined;
        }
    }
}

export function effect(fn) {
    //这里fn可以根据变化重新执行，effect可以嵌套着写

    const _effect = new ReactiveEffect(fn);
    _effect.run();
}
