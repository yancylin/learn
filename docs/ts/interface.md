---
title: 接口
nav:
  path: /ts
  title: TypeScript
  order: 1
group:
  path: /ts/interface
  title: 接口
  order: 2
---

用于检验参数的合法性

## 普通声明

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function demo({ Person }) {}

demo({ firstName: 'firstName', lastName: 'lastName' });
```

## 继承

PersonStu 继承 Person 检验除 Person 中的【firstName，lastName】，还包括 PersonStu 中 新增的【age，sex】

```ts
interface PersonStu extends Person {
  age: number;
  sex: string;
}

function demo({ PersonStu }) {}

demo({ firstName: 'firstName', lastName: 'lastName', age: 18, sex: '男' });
```

## 接口的其他声明

```ts
interface PersonStu {
  age?: number; // 可选
  readonly sex: string; // 只读
  [propName: string]: any; // 不确定参数名
}

// 类型断言
demo({ age: 18, sex: '男', name: 'name' } as PersonStu);
```
