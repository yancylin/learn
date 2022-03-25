# 学习 vue 2.x 源码

## 柯里化函数

接受多个参数多函数转成接受单一参数的函数，并且返回接受余下的参数且返回结果的新函数

```js
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 *
 *  // map 对象中的[name1,name2,name3,name4]  变成这样的map{name1:true,name2:true,name3:true,name4:true}
 *  并且传进一个key值取值，这里用到策略者模式
 *  @param String str 需验证的字符串
 *  @param Boolean expectsLowerCase 是否检验大小写
 *  @return Function 参数为val 判断val 是否在str中s
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null); //创建一个新的对象
  var list = str.split(','); //按字符串,分割
  // 将传入的字符串，转成map 且val 为 true
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true; //map 对象中的[name1,name2,name3,name4]  变成这样的map{name1:true,name2:true,name3:true,name4:true}
  }
  return expectsLowerCase
    ? function (val) {
        return map[val.toLowerCase()];
      } //返回一个柯里化函数 toLowerCase转换成小写
    : function (val) {
        return map[val];
      }; //返回一个柯里化函数 并且把map中添加一个 属性建
}

/**
 * Check if a tag is a built-in tag.
 * 检查标记是否为内置标记。
 */
var isBuiltInTag = makeMap('slot,component', true);
/**
 * 新函数
 *  */
console.log(isBuiltInTag);
/**
 * 结果
 * ture
 *  */
isBuiltInTag('slot');
```

## 判断设备和浏览器

```js
// Browser environment sniffing
//判断设备和浏览器
var inBrowser = typeof window !== 'undefined';

//如果不是浏览器
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform; //weex 环境 一个 vue做app包的框架
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase(); //weex 环境 一个 vue做app包的框架

//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，通过这个属性来判断浏览器类型
var UA = inBrowser && window.navigator.userAgent.toLowerCase(); //获取浏览器
var isIE = UA && /msie|trident/.test(UA); //ie
var isIE9 = UA && UA.indexOf('msie 9.0') > 0; //ie9
var isEdge = UA && UA.indexOf('edge/') > 0; //ie10 以上
var isAndroid = (UA && UA.indexOf('android') > 0) || weexPlatform === 'android'; //安卓
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios'; //ios
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge; //谷歌浏览器
```
