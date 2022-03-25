# 基础对象

## Performance

Performance API 用于精确度量、控制、增强浏览器的性能表现。这个 API 为测量网站性能，提供以前没有办法做到的精度。

### performance.timing 对象

performance.timing 对象包含以下属性（全部为只读）：

- `navigationStart`：当前浏览器窗口的前一个网页关闭，发生 unload 事件时的 Unix 毫秒时间戳。如果没有前一个网页，则等于 fetchStart 属性。
- `unloadEventStart`：如果前一个网页与当前网页属于同一个域名，则返回前一个网页的 unload 事件发生时的 Unix 毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为 0。
- `unloadEventEnd`：如果前一个网页与当前网页属于同一个域名，则返回前一个网页 unload 事件的回调函数结束时的 Unix 毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为 0。
- `redirectStart`：返回第一个 HTTP 跳转开始时的 Unix 毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为 0。
- `redirectEnd`：返回最后一个 HTTP 跳转结束时（即跳转回应的最后一个字节接受完成时）的 Unix 毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为 0。
- `fetchStart`：返回浏览器准备使用 HTTP 请求读取文档时的 Unix 毫秒时间戳。该事件在网页查询本地缓存之前发生。
- `domainLookupStart`：返回域名查询开始时的 Unix 毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于 fetchStart 属性的值。
- `domainLookupEnd`：返回域名查询结束时的 Unix 毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于 fetchStart 属性的值。
- `connectStart`：返回 HTTP 请求开始向服务器发送时的 Unix 毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于 fetchStart 属性的值。
- `connectEnd`：返回浏览器与服务器之间的连接建立时的 Unix 毫秒时间戳。如果建立的是持久连接，则返回值等同于 fetchStart 属性的值。连接建立指的是所有握手和认证过程全部结束。
- `secureConnectionStart`：返回浏览器与服务器开始安全链接的握手时的 Unix 毫秒时间戳。如果当前网页不要求安全连接，则返回 0。
- `requestStart`：返回浏览器向服务器发出 HTTP 请求时（或开始读取本地缓存时）的 Unix 毫秒时间戳。
- `responseStart`：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的 Unix 毫秒时间戳。
- `responseEnd`：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前 HTTP 连接已经关闭，则返回关闭时）的 Unix 毫秒时间戳。
- `domLoading`：返回当前网页 DOM 结构开始解析时（即 Document.readyState 属性变为“loading”、相应的 readystatechange 事件触发时）的 Unix 毫秒时间戳。
- `domInteractive` ：返回当前网页 DOM 结构结束解析、开始加载内嵌资源时（即 Document.readyState 属性变为“interactive”、相应的 readystatechange 事件触发时）的 Unix 毫秒时间戳。
- `domContentLoadedEventStart`：返回当前网页 DOMContentLoaded 事件发生时（即 DOM 结构解析完毕、所有脚本开始运行时）的 Unix 毫秒时间戳。
- `domContentLoadedEventEnd`：返回当前网页所有需要执行的脚本执行完成时的 Unix 毫秒时间戳。
- `domComplete`：返回当前网页 DOM 结构生成时（即 Document.readyState 属性变为“complete”，以及相应的 readystatechange 事件发生时）的 Unix 毫秒时间戳。
- `loadEventStart`：返回当前网页 load 事件的回调函数开始时的 Unix 毫秒时间戳。如果该事件还没有发生，返回 0。
- `loadEventEnd`：返回当前网页 load 事件的回调函数运行结束时的 Unix 毫秒时间戳。如果该事件还没有发生，返回 0。

计算的值

- DNS 查询耗时：`domainLookupEnd` - `domainLookupStart`
- TCP 链接耗时：`connectEnd` - `connectStart`
- request 请求耗时：`responseEnd` - `responseStart`
- 解析 dom 树耗时： `domComplete` - `domInteractive`
- 白屏时间：`responseStart` - `navigationStart`
- domReady 时间：`domContentLoadedEventEnd` - `navigationStart`
- onload 时间：`loadEventEnd` - `navigationStart`

### performance.now()

performance.now()方法返回当前网页自从`performance.timing.navigationStart`到当前时间之间的毫秒数。

### performance.mark()

mark 方法用于为相应的视点做标记。

### performance.getEntries()

浏览器获取网页时，会对网页中每一个对象（脚本文件、样式表、图片文件等等）发出一个 HTTP 请求。`performance.getEntries`方法以数组形式，返回这些请求的时间统计信息，有多少个请求，返回数组就会有多少个成员。

### performance.navigation 对象

除了时间信息，performance 还可以提供一些用户行为信息，主要都存放在`performance.navigation`对象上面。

它有两个属性：

- `performance.navigation.type` 该属性返回一个整数值，表示网页的加载来源，可能有以下 4 种情况：
  - 0：网页通过点击链接、地址栏输入、表单提交、脚本操作等方式加载，相当于常数`performance.navigation.TYPE_NAVIGATENEXT`。
  - 1：网页通过“重新加载”按钮或者`location.reload()`方法加载，相当于常数`performance.navigation.TYPE_RELOAD`。
  - 2：网页通过“前进”或“后退”按钮加载，相当于常数`performance.navigation.TYPE_BACK_FORWARD`。
  - 255：任何其他来源的加载，相当于常数`performance.navigation.TYPE_UNDEFINED`。
- `performance.navigation.redirectCount` 该属性表示当前网页经过了多少次重定向跳转。
