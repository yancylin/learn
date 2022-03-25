# js

## get 请求传参长度的误区

误区:我们经常说 get 请求参数的大小存在限制，而 post 请求的参数大小是无限制的。

实际上 HTTP 协议从未规定 GET/POST 的请求长度限制是多少。对 get 请求参数的限制是来源与浏览器或 web 服务器，浏览器或 web 服务器限制了 url 的长度。为了明确这个概念，我们必须再次强调下面几点:

- HTTP 协议未规定 GET 和 POST 的长度限制
- GET 的最大长度显示是因为浏览器和 web 服务器限制了 URI 的长度
- 不同的浏览器和 WEB 服务器，限制的最大长度不一样
- 要支持 IE，则最大长度为 2083byte，若只支持 Chrome，则最大长度 8182byte

## 闭包

闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用， 子函数所在的父函数的作用域不会被释放。

## 前端中的事件流

HTML 中与 javascript 交互是通过事件驱动来实现的，例如鼠标点击事件 onclick、页面的滚动事件 onscroll 等等，可以向文档或者文档中的元素添加事件侦听器来预订事件。想要知道这些事件是在什么时候进行调用的，就需要了解一下“事件流”的概念。 什么是事件流:事件流描述的是从页面中接收事件的顺序,DOM2 级事件流包括下面几个阶段。

- 事件捕获阶段
- 处于目标阶段
- 事件冒泡阶段

addEventListener:addEventListener 是 DOM2 级事件新增的指定事件处理程序的操作， 这个方法接收 3 个参数:要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是 true，表示在捕获阶段调用事件处理程序;如果是 false，表示在冒泡阶段调用事件处理程序。 IE 只支持事件冒泡。

## 事件委托

事件委托指的是，不在事件的发生地(直接 dom)上设置监听函数，而是在其父元素上设置监听函数，通过事件冒泡，父元素可以监听到子元素上事件的触发，通过判断事件发生元素 DOM 的类型，来做出不同的响应。

举例:最经典的就是 ul 和 li 标签的事件监听，比如我们在添加事件时候，采用事件委托机制，不会在 li 标签上直接添加，而是在 ul 父元素上添加。

好处:比较合适动态元素的绑定，新添加的子元素也会有监听函数，也可以有事件触发机制。

## 图片的懒加载和预加载

- 预加载:提前加载图片，当用户需要查看时可直接从本地缓存中渲染。
- 懒加载:懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。

两种技术的本质:两者的行为是相反的，一个提前加载，一个迟缓甚至不加载。 懒加载对服务器前端有一定地缓解压力作用，预加载则会增加服务器前端压力。

## mouseover 和 mouseenter 的区别

- mouseover:当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡的过程。对应的移除事件是 mouseout
- mouseenter:当鼠标移除元素本身(不包含元素的子元素)会触发事件，也就是不会冒泡，对应的移除事件是 mouseleave

## 改变函数内部 this 指针的指向函数(bind，apply，call 的区别)

- 通过 apply 和 call 改变函数的 this 指向，他们两个函数的第一个参数都是一样的表示要改变指向的那个对象，第二个参数，apply 是数组，而 call 则是 arg1,arg2...这种形式。
- 通过 bind 改变 this 作用域会返回一个新的函数，这个函数不会马上执行。

## 异步加载 JS 的方法

- defer:只支持 IE 如果您的脚本不会改变文档的内容，可将 defer 属性加入到`<script>` 标签中，以便加快处理文档的速度。因为浏览器知道它将能够安全地读取文档的剩余部分而不用执行脚本，它将推迟对脚本的解释，直到文档已经显示给用户为止。
- async:HTML5 属性仅适用于外部脚本，并且如果在 IE 中，同时存在 defer 和 async，那么 defer 的优先级比较高，脚本将在页面完成时执行。
- 创建 script 标签，插入到 DOM 中

## Ajax 解决浏览器缓存问题

- 在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0")。
- 在 ajax 发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。
- 在 URL 后面加上一个随机数: "fresh=" + Math.random()。
- 在 URL 后面加上时间搓:"time=" + new Date().getTime()。

## JS 中的垃圾回收机制

必要性:由于字符串、对象和数组没有固定大小，所有当他们的大小已知时，才能对他们进行动态的存储分配。JavaScript 程序每次创建字符串、数组或对象时，解释器都必须分配内存来存储那个实体。只要像这样动态地分配了内存，最终都要释放这些内存以便他们能够被再用，否则，JavaScript 的解释器将会消耗完系统中所有可用的内存，造成系统崩溃。

这段话解释了为什么需要系统需要垃圾回收，JS 不像 C/C++，他有自己的一套垃圾回收机制(Garbage Collection)。

JavaScript 的解释器可以检测到何时程序不再使用一个对象了，当他确定了一个对象是无用的时候，他就知道不再需要这个对象，可以把它所占用的内存释放掉了。

例如:

```js
let a = 'hello world';
let b = 'world';
let a = b;
//这时，会释放掉"hello world"
```

释放内存以便再引用垃圾回收的方法: 标记清除、计数引用。

#### 标记清除

这是最常见的垃圾回收方式，当变量进入环境时，就标记这个变量为”进入环境“,从逻辑上讲，永远不能释放进入环境变量所占用的内存，只要执行流程进入相应的环境，就可能用到他们。当离开环境时，就标记为离开环境。垃圾回收器在运行的时候会给存储在内存中的变量都加上标记( 所有都加)，然后去掉环境变量中的变量，以及被环境变量中的变量所引用的变量(条件性去除标记)，删除所有被标记的变量，删除的变量无法在环境变量中被访问,所以会被删除，最后垃圾回收器，完成了内存的清除工作，并回收他们所占用的内存。

#### 引用计数法

另一种不太常见的方法就是引用计数法，引用计数法的意思就是每个值没引用的次数， 当声明了一个变量，并用一个引用类型的值赋值给改变量，则这个值的引用次数为 1; 相反的，如果包含了对这个值引用的变量又取得了另外一个值，则原先地引用值引用次数就减 1，当这个值的引用次数为 0 的时候，说明没有办法再访问这个值了，因此就把所占的内存给回收进来，这样垃圾收集器再次运行的时候，就会释放引用次数为 0 的这些值。 用引用计数法会存在内存泄露，下面来看原因:

```js
function problem() {
  let objA = new Object();
  let objB = new Object();
  objA.someOtherObject = objB;
  objB.anotherObject = objA;
}
```

在这个例子里面，objA 和 objB 通过各自的属性相互引用，这样的话，两个对象的引用次数都为 2，在采用引用计数的策略中，由于函数执行之后，这两个对象都离开了作用域，函数执行完成之后，因为计数不为 0，这样的相互引用如果大量存在就会导致内存泄露。 特别是在 DOM 对象中，也容易存在这种问题:

```js
let element = document.getElementById('id');
let myObj = new Object();
myObj.element = element;
element.someObject = myObj;
```

这样就不会有垃圾回收的过程。

## eval 是做什么的

它的功能是将对应的字符串解析成 JS 并执行，应该避免使用 eval，因为非常消耗性能(2 次，一次解析成 JS，一次执行)

## 前端模块化

前端模块化就是复杂的文件编程一个一个独立的模块，比如 JS 文件等等，分成独立的模块有利于重用(复用性)和维护(版本迭代)，这样会引来模块之间相互依赖的问题， 所以有了 commonJS 规范，AMD，CMD 规范等等，以及用于 JS 打包(编译等处理)的工具 webpack, gulp

## CommonJS、AMD 和 CMD

一个模块是能实现特定功能的文件，有了模块就可以方便地使用别人的代码，想要什么功能就能加载什么模块。

- CommonJS:开始于服务器端的模块化，同步定义的模块化，每个模块都是一个单独的作用域，模块输出，modules.exports，模块加载 require() 引入模块。
- AMD:中文名异步模块定义的意思。 requireJS 实现了 AMD 规范，主要用于解决下述两个问题。
  - 1.多个文件有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器
  - 2.加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应的时间越长。
  - 语法:requireJS 定义了一个函数 define，它是全局变量，用来定义模块。

requireJS 的例子:

```js
//定义模块
define(['dependency'], function () {
  let name = 'Byron';

  function printName() {
    console.log(name);
  }

  return {
    printName: printName,
  };
});
//加载模块
require(['myModule'], function (my) {
  my.printName();
});
```

RequireJS 定义了一个函数 define,它是全局变量，用来定义模块:` define(id?dependencies?,factory)` 在页面上使用模块加载函数: `require([dependencies],factory)`

总结

- AMD 规范: `require()` 函数在加载依赖函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块加载成功，才会去执行。因为网页在加载 JS 的时候会停止渲染，因此我们可以通过异步的方式去加载 JS,而如果需要依赖某些，也是异步去依赖，依赖后再执行某些方法。

## 对象深度克隆的简单实现

ES5 的常用的对象克隆的一种方式。注意数组是对象，但是跟对象又有一定区别，所以我们一开始判断了一些类型，决定 newObj 是对象还是数组。

```js
function deepClone(obj) {
  let newObj = obj instanceof Array ? [] : {};
  for (let item in obj) {
    let temple = typeof obj[item] == 'object' ? deepClone(obj[item]) : obj[item];
    newObj[item] = temple;
  }
  return newObj;
}
```

## 实现一个 once 函数，传入函数参数只执行一次

```js
function ones(func) {
  let tag = true;
  return function () {
    if (tag == true) {
      func.apply(null, arguments);
      tag = false;
    }
    return undefined;
  };
}
```

## 将原生的 ajax 封装成 promise

```js
const myNewAjax = function (url, method, data) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    // 初始化一个请求
    xhr.open(method, url);
    // 发送 HTTP 请求
    xhr.send(data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let json = JSON.parse(xhr.responseText);
          resolve(json);
        } else {
          reject('error');
        }
      }
    };
  });
};
```

## JS 监听对象属性的改变

- (1)在 ES5 中可以通过 Object.defineProperty 来实现已有属性的监听

```js
Object.defineProperty(user, 'name', {
  set: function (key, value) {},
});
```

缺点:如果 id 不在 user 对象中，则不能监听 id 的变化

- (2)在 ES6 中可以通过 Proxy 来实现

```js
let user = new Proxy(
  {},
  {
    set: function (target, key, value, receiver) {},
  },
);
```

这样即使有属性在 user 中不存在，通过 user.id 来定义也同样可以这样监听这个属性的变化哦。

## 代码的执行顺序

```js
setTimeout(function () {
  console.log(1);
}, 0);

new Promise(function (resolve, reject) {
  console.log(2);
  resolve();
})
  .then(function () {
    console.log(3);
  })
  .then(function () {
    console.log(4);
  });

process.nextTick(function () {
  console.log(5);
});

console.log(6);
// 输出 2,6,5,3,4,1
```

[说明解释](https://github.com/forthealllight/blog/issues/5)

## JS 判断类型

判断方法:typeof()，instanceof，Object.prototype.toString.call()等

## 数组常用方法

push()，pop()，shift()，unshift()，splice()，sort()，reverse()，map()等

## JS 的全排列

```js
function permutate(str) {
  let result = [];
  if (str.length > 1) {
    let left = str[0];
    let rest = str.slice(1, str.length);
    let preResult = permutate(rest);
    for (let i = 0; i < preResult.length; i++) {
      for (let j = 0; j < preResult[i].length; j++) {
        let tmp = preResult[i],
          slice;
        (0, j) + left + preResult[i].slice(j, preResult[i].length);
        result.push(tmp);
      }
    }
  } else if (str.length == 1) {
    return [str];
  }
  return result;
}
```

## 什么是 virtual dom

用 JavaScript 对象结构表示 DOM 树的结构;然后用这个树构建一个真正的 DOM 树， 插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新地树和旧地树进行比较，记录两棵树差异；把所记录的差异应用到所构建的真正的 DOM 树上，视图就更新了。Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。

## JS 中继承实现的几种方式

- 1、原型链继承，将父类的实例作为子类的原型，他的特点是实例是子类的实例也是父类的实例，父类新增的原型方法/属性，子类都能够访问，并且原型链继承简单易于实现，缺点是来自原型对象的所有属性被所有实例共享，无法实现多继承，无法向父类构造函数传参。
- 2、构造继承，使用父类的构造函数来增强子类实例，即复制父类的实例属性给子类， 构造继承可以向父类传递参数，可以实现多继承，通过 `call` 多个父类对象。但是构造继承只能继承父类的实例属性和方法，不能继承原型属性和方法，无法实现函数服用，每个子类都有父类实例函数的副本，影响性能
- 3、实例继承，为父类实例添加新特性，作为子类实例返回，实例继承的特点是不限制调用方法，不管是 `new` 子类()还是子类()返回的对象具有相同的效果，缺点是实例是父类的实例，不是子类的实例，不支持多继承
- 4、拷贝继承:特点:支持多继承，缺点:效率较低，内存占用高(因为要拷贝父类的 属性)无法获取父类不可枚举的方法(不可枚举方法，不能使用 `for in` 访问到)
- 5、组合继承:通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
- 6、寄生组合继承:通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点

## Vue 的生命周期

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载 Dom、渲染->更新->渲染、销毁等一系列过程，我们称这是 Vue 的生命周期。

通俗说就是 Vue 实例从创建到销毁的过程，就是生命周期。

每一个组件或者实例都会经历一个完整的生命周期，总共分为三个阶段:初始化、运行中、销毁。

- 实例、组件通过 `new Vue()` 创建出来之后会初始化事件和生命周期，
- 然后就会执行 `beforeCreate` 钩子函数，这个时候，数据还没有挂载呢，只是一个空壳，无法访问到数据和真实的 dom，一般不做操作,挂载数据，绑定事件等等，
- 然后执行 `created` 函数，这个时候已经可以使用到数据，也可以更改数据,在这里更改数据不会触发 `updated` 函数，在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取接下来开始找实例或者组件对应的模板，编译模板为虚拟 dom 放入到 `render` 函数中准备渲染，
- 然后执行 `beforeMount` 钩子函数，在这个函数中虚拟 dom 已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发 `updated`，在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取接下来开始 `render`，渲染出真实 dom，
- 然后执行 `mounted` 钩子函数，此时，组件已经出现在页面中，数据、真实 dom 都已经处理好了,事件都已经挂载好了，可以在这里操作 真实 dom 等事情...
- 当组件或实例的数据更改之后，会立即执行 `beforeUpdate`，然后 Vue 的虚拟 dom 机制会 重新构建虚拟 dom 与上一次的虚拟 dom 树利用 diff 算法进行对比之后重新渲染，一般不做什么事儿
- 当更新完成后，执行 `updated`，数据已经更改完成，dom 也重新 render 完成，可以操作更新后的虚拟 dom
- 当经过某种途径调用 `$destroy` 方法后，立即执行 `beforeDestroy`，一般在这里做一些善后工作，例如清除计时器、清除非指令绑定的事件等等 组件的数据绑定、监听...去掉后只剩下 dom 空壳，这个时候，
- 执行 `destroyed`，在这里做 善后工作也可以

## JS 对象类型，基本对象类型以及引用对象类型的区别

分为基本对象类型和引用对象类型

- 基本数据类型:按值访问，可操作保存在变量中的实际的值。基本类型值指的是简单的数据段。基本数据类型有这六种:undefined、null、string、number、boolean、symbol。
- 引用类型:当复制保存着对象的某个变量时，操作的是对象的引用，但在为对象添加属性时，操作的是实际的对象。引用类型值指那些可能为多个值构成的对象。 引用类型有这几种: Object、Array、RegExp、Date、Function、特殊的基本包装类型(String、 Number、Boolean)以及单体内置对象(Global、Math)。

## PWA

PWA 全称 Progressive Web App，即渐进式 WEB 应用。一个 PWA 应用首先是一个网页, 可以通过 Web 技术编写出一个网页应用. 随后添加上 App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能

## Babel 的原理是什么?

### babel 的转译过程也分为三个阶段，这三步具体是:

- 解析 Parse: 将代码解析生成抽象语法树( 即 AST )，即词法分析与语法分析的过程
- 转换 Transform: 对于 AST 进行变换一系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进行遍历，在此过程中进行添加、更新 及移除等操作
- 生成 Generate: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是 babel-generator

## Vue3.0 里为什么要用 Proxy API 替代 defineProperty API?

- 响应式优化。
  - a. `defineProperty` API 的局限性最大原因是它只能针对单例属性做监听。 Vue2.x 中的响应式实现正是基于 `defineProperty` 中的 descriptor，对 data 中的属性做了遍历 + 递归，为每个属性设置了 `getter`、`setter`。 这也就是为什么 Vue 只能对 data 中预定义过的属性做出响应的原因，在 Vue 中使用下标的方式直接修改属性的值或者添加一个预先不存在的对象属性是无法做到 setter 监听的，这是 defineProperty 的局限性。
  - b. `Proxy` API 的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性，将会带来很大的性能提升和更优的代码。 `Proxy` 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
  - c. 响应式是惰性的 在 Vue.js 2.x 中，对于一个深层属性嵌套的对象，要劫持它内部深层次的变化，就需要递归遍历这个对象，执行 `Object.defineProperty` 把每一层对象数据都变成响应式的，这无疑会有很大的性能消耗。 在 Vue.js 3.0 中，使用 Proxy API 并不能监听到对象内部深层次的属性变化，因此它的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部属性才会变成响应式，简单的可以说是按需实现响应式，减少性能消耗。
