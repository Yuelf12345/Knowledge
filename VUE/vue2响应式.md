# 实现原理  [https://github.com/vuejs/vue/blob/main/src/core/observer/index.ts]
Vue2响应式核心是使用Object.defineProperty方法实现的,它将data中的数据定义为属性,当访问到属性时会触发getter方法,当修改数据的值的时候会触发setter方法,我们就可以在setter方法中去执行更新页面的操作

```javascript
<div>{{name}}</div>

new Vue({
    data(){
        return {
            name:'tom',
            age:18
        }
    }
})

function observer(value){
    Object.keys(value).forEach((key)=>defineReactive(value,key,value[key]))
}

function defineReactive(obj,key,val){
    Object.defineProperty(obj,key,val){
        enumerable:true,
        configurable:true,
        get:()=>{
            return val
        },
        set:(newVal)=>{
            val=newVal;
            updata()
        }
    }
}
```

# Observer(响应式数据)
在new Vue()后,Vue会调用_init()函数进行初始化,其中会调用 Observer()方法,Observer()方法会遍历data对象,并调用defineReactive()方法,将data对象的属性和属性值转换为响应式对象,如果属性值是object类型,会递归调用Observer()方法,将属性值转换为响应式对象.
当修改name后会触发updata()方法去更新视图,同时修改age时也会触发updata()方法更新视图,但是我们页面上没有用到age值,这样没有意义的更新视图就会消耗性能,所以引出了Deps概念.

# Deps(依赖收集类)
```javascript
class Dep {
    constructor() {
        this.id = uid++;
        this.subs = [];
    }
    addSub(sub:Watcher) {
        this.subs.push(sub);
    }
    notify() {
        for (let i = 0; i < this.subs.length; i++) {
            subs[i].update();
        }
    }
}
Dep.target = null;  //依赖收集完需要将Dep.target设为null，防止后面重复添加依赖
```
dep用来记录页面上所有用到的响应式对象,什么时候会添加到dep中呢？vue的生命周期中,在created阶段我们可以拿到data中的数据,但此时并不知道页面上使用了那些数据.我们知道,要渲染出真实的DOM,就先要产生render函数,而在调用render函数的时候,会有_s()方法来获取data中的变量,所以在beforeMount阶段我们就可以只获取页面上用到的变量了,同时Vue会通过new Watcher生成一个渲染Watcher，它会在页面渲染的过程中访问每个数据对象的 getter 属性，从而进行依赖的收集(Watcher拿小本本记下页面用到的数据)。
Dep一个发布者，可以订阅多个观察者，依赖收集之后Deps中会存在一个或多个Watcher对象，在数据变更的时候通知所有的Watcher。

# Watcher(观察者)
```javascript
class Watcher {
    constructor(){
        Dep.target = this;//在这里将观察者本身赋值给全局的target，只有被target标记过的才会进行依赖收集
    },
    update(){
        // 更新视图
    }
}
```
依赖收集以后Watcher对象会被保存在Deps中，数据变动的时候会由Dep通知Watcher实例，然后由Watcher实例回调进行视图的更新。

# 总结
Vue初始化时会调用Observer，通过Object.defineProperty()为data数据设置getter和setter属性，获取数据触发get()，更新数据触发set()，在beforeMount阶段，调用render函数准备渲染页面时，我们能够获取到该页面data上的变量,这时触发get()，同时new一个Watcher实例(主要是将模板与数据建立联系)并将Watcher添加到依赖Dep的subs中进行依赖收集。当某个数据修改后会触发set()，调用Dep的notify()方法去通知subs里的所有Watcher执行update()更新视图。
Vue更新视图是异步的，所有可能出现数据更新后视图未更新的情况，这时需要调用Vue的nextTick方法强制视图更新.
