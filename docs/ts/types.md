---
title: 类型
nav:
  path: /ts
  title: TypeScript
  order: 1
group:
  path: /ts/types
  title: 类型
  order: 1
---

# 数据类型

ts 中的数据类型

## 常用的数据类型

- 字符串：string；'demo'
- 数字：number; 1,2,3.1
- 布尔：boolean；true,false
- bigint
- symbol

---

- 数组：
  - number[]、Array<number>：[1, 2, 3]；由 number 组成的数组
  - string[]：由字符串组成的数组

---

- any：特殊类型，不校验该值类型

# Function 方法

## 参数类型注解

声明函数时，可以在每个参数后面加上类型注解，声明函数接受哪些类型的参数。参数类型注释在参数名称之后：

```ts
// Parameter type annotation
function greet(name: string) {
  console.log('Hello, ' + name.toUpperCase() + '!!');
}

greet(42);
// 当参数具有类型注释时，将检查该函数的参数：
// error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

## 返回类型注解

添加返回类型注释。返回类型注释出现在参数列表之后：

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

## 匿名函数

匿名函数与函数声明有点不同。当一个函数出现在 TypeScript 可以确定如何调用它的地方时，该函数的参数会自动被赋予类型。

```ts
// No type annotations here, but TypeScript can spot the bug
const names = ['Alice', 'Bob', 'Eve'];

// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
  // error: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
  // error: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```

即使参数 s 没有类型注释，TypeScript 还是使用 forEach 函数的类型以及推断的数组类型来确定类型 s。

这个过程称为上下文类型，因为函数发生的上下文告知它应该具有什么类型。

## 对象类型

这指的是任何带有属性的 JavaScript 值，几乎是所有属性！要定义对象类型，我们只需列出其属性及其类型。

例如，这是一个接受点状对象的函数：

```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });
```

在这里，我们使用具有两个属性的类型来注释参数 -x 和 y- 这两个属性都是 number。您可以使用,或;分隔属性，最后一个分隔符是可选的。

每个属性的类型部分也是可选的。如果不指定类型，则假定为 any.

## 可选属性

对象类型还可以指定它们的部分或全部属性是可选的。为此，请?在属性名称后添加一个：

```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}

// Both OK
printName({ first: 'Bob' });
printName({ first: 'Alice', last: 'Alisson' });
```

在 JavaScript 中，如果您访问一个不存在的属性，您将获得该值 undefined 而不是运行时错误。因此，当您从可选属性中读取数据时，您必须 undefined 在使用它之前进行检查。

```ts
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
  //error: Object is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

# 联合类型 Union type

## 定义联合类型

您可能会看到的第一种组合类型的方法是联合类型。联合类型是由两种或多种其他类型组成的类型，表示可能是这些类型中的任何一种的值。我们将这些类型中的每一种都称为工会的成员。

```ts
function printId(id: number | string) {
  console.log('Your ID is: ' + id);
}

// OK
printId(101);
// OK
printId('202');
// Error
printId({ myID: 22342 });
//error Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

## 使用联合类型

TypeScript 只有在对联合体的每个成员都有效的情况下才允许操作。例如，如果您有 union string | number，则不能使用仅在以下位置可用的方法 string：

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // error Property 'toUpperCase' does not exist on type 'string | number'.
  // error Property 'toUpperCase' does not exist on type 'number'.
}
```

解决方案是用代码缩小联合，就像在没有类型注释的 JavaScript 中一样。 当 TypeScript 可以根据代码的结构为某个值推断出更具体的类型时，就会发生缩小。

例如，TypeScript 知道只有一个 string 值才会有一个 typeof 值"string"：

```ts
function printId(id: number | string) {
  if (typeof id === 'string') {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

另一个例子是使用如下函数 Array.isArray：

```ts
function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log('Hello, ' + x.join(' and '));
  } else {
    // Here: 'x' is 'string'
    console.log('Welcome lone traveler ' + x);
  }
}
```

请注意，在 else 分支中，我们不需要做任何特别的事情——如果 x 不是 a string[]，那么它一定是 a string。

有时你会有一个工会，所有成员都有共同点。例如，数组和字符串都有一个 slice 方法。如果联合中的每个成员都有一个共同的属性，则可以使用该属性而不会缩小范围：

```ts
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}
```

## 类型别名

我们一直通过直接在类型注释中编写对象类型和联合类型来使用它们。这很方便，但通常希望多次使用同一个类型并用一个名称引用它。

类型别名就是这样 -任何类型的名称。类型别名的语法是：

```ts
type Point = {
  x: number;
  y: number;
};

// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

实际上，您可以使用类型别名来为任何类型命名，而不仅仅是对象类型。例如，类型别名可以命名联合类型：

```ts
type ID = number | string;
```

请注意，别名只是别名 - 您不能使用类型别名来创建相同类型的不同/不同“版本”。当您使用别名时，就好像您已经编写了别名类型。换句话说，这段代码可能看起来非法，但根据 TypeScript 是可以的，因为这两种类型都是同一类型的别名：

```ts
type UserInputSanitizedString = string;

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

// Create a sanitized input
let userInput = sanitizeInput(getInput());

// Can still be re-assigned with a string though
userInput = 'new input';
```

## 接口

接口声明是命名对象类型的另一种方式：

```ts
interface Point {
  x: number;
  y: number;
}

function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 100, y: 100 });
```

就像我们在上面使用类型别名时一样，该示例就像我们使用匿名对象类型一样工作。TypeScript 只关心我们传递给的值的结构 printCoord——它只关心它是否具有预期的属性。只关心类型的结构和功能是我们称 TypeScript 为结构类型类型系统的原因。

### 类型别名和接口的区别

类型别名和接口非常相似，在很多情况下您可以在它们之间自由选择。几乎所有的特性 interface 都可以在 中使用 type，主要区别在于不能重新打开类型来添加新属性，而接口总是可扩展的。

```ts
// Interface 接口 扩展接口
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

const bear = getBear();
bear.name;
bear.honey;
```

```ts
// Type 类型别名 通过交叉点扩展类型
type Animal = {
  name: string;
};

type Bear = Animal & {
  honey: boolean;
};

const bear = getBear();
bear.name;
bear.honey;
```

```ts
// Interface 接口 向现有界面添加新字段
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
```

```ts
// Type 类型创建后无法更改

type Window = {
  title: string;
};

type Window = {
  ts: TypeScriptAPI;
};

// Error: Duplicate identifier 'Window'.
```

## 类型断言

有时你会得到关于 TypeScript 无法知道的值类型的信息。

例如，如果您正在使用 document.getElementById，TypeScript 只知道这将返回某种，HTMLElement 但您可能知道您的页面将始终具有 HTMLCanvasElement 具有给定 ID 的 。

在这种情况下，您可以使用类型断言来指定更具体的类型：

```ts
const myCanvas = document.getElementById('main_canvas') as HTMLCanvasElement;
```

与类型注释一样，类型断言被编译器删除，不会影响代码的运行时行为。

您还可以使用尖括号语法（除非代码在.tsx 文件中），它是等效的：

```ts
const myCanvas = <HTMLCanvasElement>document.getElementById('main_canvas');
```

## 非空断言运算符（后缀!）

TypeScript 还具有一种特殊的语法，用于在不进行任何显式检查的情况下从类型中删除 null 和删除。undefined 在任何表达式之后写!实际上是一个类型断言，该值不是 nullor undefined：

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```
