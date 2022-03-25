# vue3.x 与 vue2.x 对比

下面所有语法均基于 js，本文只对比与 vue2.x 的区别，同时 vue3.x 兼容 vue2.x 的语法。

## data 数据的声明

### vue2.X

```js
export default {
  data() {
    return {};
  },
};
```

### vue3.X

```js
// 初始化
import { toRefs, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'App',
  setup(props, context) {
    const { msg } = toRefs(props);
    const heroData = reactive({
      selectHero: '',
    });
    const data = toRefs(heroData);

    return { ...data };
  },
});
```

## 生命周期的调整

生命周期需在`setup`中声明

| 说明 | vue3.x | vue2.x |
| :-- | --: | :-: |
| 在实例初始化之后、进行数据侦听和事件/侦听器的配置之前同步调用。 | setup | beforeCreate |
| 在实例创建完成后被立即同步调用。在这一步中，实例已完成对选项的处理，意味着以下内容已被配置完毕：数据侦听、计算属性、方法、事件/侦听器的回调函数。然而，挂载阶段还没开始，且 `$el property` 目前尚不可用。 | setup | created |
| 在挂载开始之前被调用：相关的 `render` 函数首次被调用。 | onBeforeMount | beforeMount |
| 在实例挂载完成后被调用，这时候传递给 app.mount 的元素已经被新创建的 `vm.$el` 替换了。如果根实例被挂载到了一个文档内的元素上，当 `mounted` 被调用时， `vm.$el `也会在文档内。 | onMounted | mounted |
| 在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。 | onBeforeUpdate | beforeUpdate |
| 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。 | onUpdated | updated |
| 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。 | onBeforeUnmount | beforeDestroy |
| 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。 | onUnmounted | destroyed |
| 被 keep-alive 缓存的组件激活时调用。 | onActivated | activated |
| 被 keep-alive 缓存的组件失活时调用。 | onDeactivated | deactivated |
| 捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。 | onErrorCaptured | errorCaptured |
| 跟踪虚拟 DOM 重新渲染时调用。钩子接收 `debugger event` 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键。 | `新` onRenderTriggered | `新` renderTriggered |
| 当虚拟 DOM 重新渲染被触发时调用。和 `renderTracked` 类似，接收 `debugger event` 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。 | `新` onRenderTracked | `新` renderTracked |

```js
// 初始化
import { toRefs, defineComponent, reactive } from 'vue';
// 状态跟踪
import { onRenderTriggered, onRenderTracked } from 'vue';
// 生命周期
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from 'vue';

export default defineComponent({
  name: 'App',
  setup(props, context) {
    const data = toRefs(reactive({}));

    console.log('1-开始创建组件-------setup', `beforeCreate,created`);

    onBeforeMount(() => {
      console.log('2-组件挂载到页面之前执行-------onBeforeMount', `beforeMount`);
    });

    onMounted(() => {
      console.log('3-组件挂载到页面之后执行-------onMounted', `mounted`);
    });

    onBeforeUpdate(() => {
      console.log('4-组件更新之前-------onBeforeUpdate', `beforeUpdate`);
    });

    onUpdated(() => {
      console.log('5-组件更新之后-------onUpdated', `updated`);
    });

    onBeforeUnmount(() => {
      console.log('6-组件卸载之前-------onBeforeUnmount', `beforeDestroy`);
    });

    onUnmounted(() => {
      console.log('7-组件卸载之后-------onUnmounted', `destroyed`);
    });

    onActivated(() => {
      console.log('组件激活-------onActivated', `activated`);
    });

    onDeactivated(() => {
      console.log('组件消失-------onDeactivated', `deactivated`);
    });

    onErrorCaptured(() => {
      console.log('组件异常-------onErrorCaptured', `errorCaptured`);
    });

    onRenderTracked((event) => {
      console.log('状态跟踪组件----------->');
      console.log(event);
    });

    onRenderTriggered((event) => {
      console.log('状态触发组件--------------->');
      console.log(event);
    });

    return { ...data };
  },
});
```

## watch 监听

### 单一属性监听

```js
watch(msg, (newValue, oldValue) => {
  console.log(`new -> ${newValue}`);
  console.log(`old -> ${oldValue}`);
});
```

### 多属性监听

```js
/*观察多个对象*/
watch([msg, data.selectHero], (newValue, oldValue) => {
  console.log(`new -> ${newValue}`);
  console.log(`old -> ${oldValue}`);
});
```

### 案列 demo

```js
// 初始化
import { toRefs, defineComponent, reactive, watch } from 'vue';

export default defineComponent({
  props: {
    msg: { default: '' },
  },
  name: 'App',
  setup(props, context) {
    const { msg } = toRefs(props);
    const heroData = reactive({
      selectHero: '',
    });
    const data = toRefs(heroData);
    /* 监听 props上的属性 */
    watch(msg, (newValue, oldValue) => {
      console.log(`new -> ${newValue}`);
      console.log(`old -> ${oldValue}`);
    });

    /* 监听 this data上的属性 */
    watch(data.selectHero, (newValue, oldValue) => {
      console.log(`new -> ${newValue}`);
      console.log(`old -> ${oldValue}`);
    });

    /* 观察多个对象 */
    watch([msg, data.selectHero], (newValue, oldValue) => {
      console.log(`new -> ${newValue}`);
      console.log(`old -> ${oldValue}`);
    });

    return { ...data };
  },
});
```
