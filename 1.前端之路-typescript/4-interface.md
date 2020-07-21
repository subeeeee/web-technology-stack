##《前端之路》- TypeScript (三) ES5 中实现继承、类以及原理

[TOC]

> 这篇文章中的内容会比较的多，而且在基础中是数据相对比较复杂的基础，主要是讲到了 JS 这门语言中如何实现继承、多态，以及什么情况如何定义 私有属性、方法，共有属性、方法，被保护的属性和方法。明确的定义了 JS 中的访问边界问题，以及最终实现的原理是什么。接下来，让我们仔细瞅瞅这部分吧～

### 一、先讲讲 ES5 中构造函数（类）静态方法和多态

> 首先在 ES5 中是没有类的概念的，我们一般是通过构造函数中来实现类。下面就举个例子。
> 另外我们再复习下我们在 JS 中的经常会提到的问题，原型以及原型链

#### 1-1 JS 中原型以及原型链

> JS 中通过 `__prpto__` 的桥梁实现原型链， 也叫做实现继承。
> JS 中通过 `prototype` 的属性复制自己的模版对象（也可以叫做被复制的对象）

##### 例子一

> 上例子之前，我们来看一张图 ( 来自 juejin，侵删)

![](https://img2020.cnblogs.com/blog/675289/202003/675289-20200321232508577-671349333.jpg)

> 造物主无中生有，从 null 制造了一个 No.1 对象( 神 )，这个 No.1 对象觉得自己太孤独，就 copy 了一份自己，我们叫她 Object ，同时 No1 对象 希望 Object 可以为自己干活，然后 Object 就学会了 new 这个技能，new 一下，同时加入各种属性，就可以 瞬间让这个世界丰富多彩了起来，后来，丰富多彩的世界也物以群分了，然后就出现了 String、Number、Boolean、Array、Date... 等等类型(demo1)，然后造物主又发现，

```javascript
String.constructor;
// ƒ String() { [native code] }
Number.constructor;
// ƒ Number() { [native code] }
Array.constructor;
// ƒ Array() { [native code] }
Object.constructor;
// ƒ Object() { [native code] }
Function.constructor;
// ƒ Function() { [native code] }
```

---

```javascript
// demo1
String.prototype;
// String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
Number.prototype;
// Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}
Array.prototype;
// [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
Function.prototype;
// ƒ () { [native code] }
Object.prototype;
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
```

> 其实到这里的时候，其实很多同学，已经开始彻底蒙圈了，这是啥啊？ 怎么一会 constructor 一会 prototype 还有一个 **proto** 啊啊啊，简直要疯掉了，到底这些都是一些啥啊。。。不要着急，下面我们重新来认识一下这三个货，出现的原因以及分别代表着什么
> 测试

#### 1-2 JS 中原型以及原型链中，我们常见的 constructor、prototype、**proto** 这三者之间的关系

> 一、首先，我们总最容易理解的 `constructor`（构造器）来理解

```javascript
var F = function() {
  this.name = "F-构造函数";
};

var f1 = new F();
var f2 = new F();

console.log(F.constructor); // ƒ Function() { [native code] } 是浏览器自带的原生方法 Function
console.log(f1.constructor); // ƒ () {this.name = 'F-构造函数';} 是构造函数 F 本身
console.log(f2.constructor); // ƒ () {this.name = 'F-构造函数';} 是构造函数 F 本身

// 这个时候大家其实对于 constructor 属性有一定的了解了，对象、函数都有 constructor 属性
```

> 这里我们有一张图

![](https://img2020.cnblogs.com/blog/675289/202003/675289-20200322165305011-815457904.jpg)

> 同时，JS 原生自带的一些方法和 上文中 我们定义的 Person 类也非常类似，唯一的区别就是，Person 是用户自己定义的， 生自带的方法是官方指定的。

![](https://img2020.cnblogs.com/blog/675289/202003/675289-20200322164732897-81070658.jpg)

> JS 语言中自带的原生方法 String、Number、Array、Boolean、Function、Object、Date 等，都是 Function 的实例化对象
> String、Number、Array、Boolean、Function、Object、Date 等 的 constructor 都指向 Function
> （Function 的构造函数也指向 Function，不要疑惑，虽然毫无道理，但是就是这么发生了）

---

> 二、接下来我们再来看看 `prototype` 是怎么样产生的, JS 的语言设计，为什么需要 `prototype` 对象。

- 还是上面的例子：只不过我们分别给 f1 和 f2 添加一个 say 方法，然后我们去对比这 2 个方法的差异

```javascript
var F = function() {
  this.name = "F-构造函数";
};

var f1 = new F();
var f2 = new F();

f1.say = function() {
  console.log("say hello");
};
f2.say = function() {
  console.log("say hello");
};
console.log(f1.say === f2.say); // false
```

- 我们发现并不相等，因为通过构造函数实例化生成的对象的指针都分别指向不同的栈（也可以理解为内存）（这里不太明白的化，建议看下《你不知道的 JavaScript》）
- 我们去对比这 2 个不同对象上的相同名称的方法，肯定是不一样的
- 那如果我实例化几千几万个对象，都包含这个方法的化，那内存岂不是要爆了
- 所以基于节约内存的出发点，我们是否可以创建一个 实例话对象都可以访问的公共对象，这个时候 `prototype` 就应运而生了

> 基于上面的例子我们再修改下：

```javascript
var F = function() {
  this.name = "F-构造函数";
};

F.prototype.say = function() {
  console.log("say hello");
};

var f1 = new F();
var f2 = new F();

f1.say(); // say hello
f2.say(); // say hello
console.log(f1.say === f2.say); // true
```

> 所以 `prototype` 对象的出现，达到了 共享、公用的效果。节约了内存。同时 `prototype` 对象用于放某同一类型实例的共享属性和方法，实质上是为了内存着想。
> 这里我们再放一张图

![](https://img2020.cnblogs.com/blog/675289/202003/675289-20200322174627707-509986941.jpg)

---

> 三、`constructor` 属性具体在哪里？

- 以这里为例子，我们打印出来 f1 的时候，并没有在对象的一级目录中找到 `constructor` 属性，那会是在哪里呢？
- 按照上面的这张图，我们会发现，每个实例化对象的 `constructor` 属性都是指向 构造函数（Person）
- 那如果我们实例化几千几万个对象呢？ 每个实例化对象的 `constructor` 想必也会占用大量的内存，而且根本没有必要
- 所以这个时候神奇的事情发生了，我们把 每个实例化对象的 `constructor` 作为一个共享数据，放在 `prototype` 对象中，节约内存。
- 这个时候就会又有下面的图了

![](https://img2020.cnblogs.com/blog/675289/202003/675289-20200322175110447-1121418350.jpg)

- 这个时候我们肯定会思考一个问题就是： 我们直接通过 f1.constructor 访问到的 构造属性 是通过什么方式来访问到的呢？
- 另外一个问题： 如果我们修改了 f1.constructor 这个值，我们是不是就根本没有办法访问到 实例化对象的构造函数了？

```javascript
var F = function() {
  this.name = "F-构造函数";
};

F.prototype.say = function() {
  console.log("say hello");
};

var f1 = new F();
var f2 = new F();

f1.constructor = function() {
  this.name = "匿名构造函数";
};

console.log(f1.constructor == f2.constructor); // fasle 这个时候 f1 对象就没办法找到自己的构造函数了，

// 因为我们给 f1 实例化对象新增了一个 constructor 属性，这个时候，JS 就会优先返回这个值，而不是真正的 构造函数对象，聪明的 JS 肯定不会让这种事情发生的，对么。下面就该我们的 __proto__  出场啦
```

> 四、`__proto__` 的出现 目的： 让实例找到自己的实例

- 对，下面就是我们要来说到了 `__proto__`
- 核心能力： 任何实例化对象的 `__proto__` 属性都指向其 构造函数的 `prototype` （我们可以把 `prototype` 理解成一个 可以抽离成成千上万实例化对象都具备的 公共属性的集合 其中包括了：`constructor` 属性、以及使用者定义在 `prototype` 上的属性或者方法 ）
- 废话不多说了，我们先上图

![](https://raw.githubusercontent.com/erbing/blog/master/assets/imgs/10991584872025_.pic.jpg)

- 然后我们就得出来一个结论

```javascript
f1.__proto__ === F.prototype; // true
```

> 五、总结

- 这里我们针对 JS 中原型已经原型链又进一步的复习巩固了一下，其实还有很多类容是可以深挖的，因为这里是 ts 篇，我们就暂时先写到这里，后续我们可以在留言区进行进一步的讨论

#### 1-2 JS 中通过构造函数来实现 类

> 实现一个类的话上面的案例基本上简单的呈现了下:

```javascript
function Person(name) {
  this.name = name;
  this.run = function() {
    console.log(this.name + "跑步");
  };
}

Person.prototype.age = 12;
Person.prototype.work = function() {
  console.log(this.name + "写代码");
};

Person.weight = "70kg";
Person.eat = function() {
  console.log("在吃饭");
};

var p = new Person("zhangsan");

p.run(); // zhangsan跑步
p.work(); // zhangsan写代码
p.eat(); // Uncaught TypeError: p.eat is not a function
```

- 这里我们就针对，上面出现的错误和正确的情况分析一下：
- 1、为什么执行 p.run() 成功了，这里简单过一下 new 的操作

```javascript
// new 操作背后的真相
function New(name) {
  this.name = name;
}

// 一、创建一个新的对象
var o = {};

// 二、需要认祖归宗，需要知道自己是被哪个构造函数实例化生成的
o.__proto__ = New.prototype;

// 三、需要拿到 祖上传给你的传家宝
New.apply(o, arguments); // arguments 为传入的参数， 通过执行构造函数，巧妙的将构造函数中 this 的上下文转换成了 新生成的 o 对象的上下文，让其也拥有了构建函数内部的属性和方法

// 四、最后返回 o
return o;
```

- 2、为什么执行 p.run() 成功了咧，因为 new 的过程中 实例化对象 p 中已经继承了构造函数 Person 内的属性和方法所以成功了
- 3、为什么执行 p.work() 成功了？ 因为 p 的 `__proto__` 指向的是 Person.prototype 刚好，我们在 Person.prototype 新增了一个 work 方法，所以 p 可以通过 `__proto__` 原型链找到 work 方法执行成功
- 4、为什么 p.eat() 报错了？ 我们看看 eat 方法我们是如何定义的：

```javascript
 ...
 Person.eat = function() { console.log('在吃饭') }
 p2 =  new Person('lisi')
// 因为 eat 这个静态方法是挂载在构造函数这个对象上的，而我们的 new 操作是继承了 构造函数内部的方法和属性，
// 所以在继承父类私有属性的时候没有找到，那还有 原型链上的呢？同样，new 操作是将 `__proto__` 指向了 Person.prototype 而这个对象中也没有这个方法，所以就报错了
 // 那如果 p2 想访问，有办法么？ 有的
 p2.constructor.eat()  // 在吃饭
 // 同时 p2.constructor.eat() === Person.eat() === Person.prototype.constructor.eat()
 // 但是这种访问的方式，没办法和对象的上下文结合起来，也没有多大的作用，所以我们往往在我们日常的开发中用到的比较少。
```

### 总结

> 对，没错。这一章 都是基础知识，那么基于这个基础上，我们下一章节会正式来进入 typescript 中 class 的学习中来
> 包括了 TypeScript 中的类，类的定义、方法属性的定义和类的修饰符等，敬请期待～


##《前端之路》- TypeScript (四) class 中各类属性、方法，抽象类、多态

[TOC]

> 在这一章中介绍的 class 类，希望同学们可以在上一章节中 复习下构造函数、原型、原型链等基础知识

### 一、TypeScript 中的类

> 1、先来举个例子：

```typescript
class Persons {
  name: any;
  age: number | undefined;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getName(): void {
    console.log(`${this.name}今年已经${this.age}岁了`);
  }
}

let p11 = new Persons("za", 123);
console.log(p11.getName()); // za今年已经123岁了
```

- 转换成 ES5 的代码后：

```javascript
var Persons = /** @class */ (function() {
  function Persons(name, age) {
    this.name = name;
    this.age = age;
  }
  Persons.prototype.getName = function() {
    console.log(
      this.name + "\u4ECA\u5E74\u5DF2\u7ECF" + this.age + "\u5C81\u4E86"
    );
  };
  return Persons;
})();
var p11 = new Persons("za", 123);
console.log(p11.getName()); //  za今年已经123岁了
```

> 2、这里和我们使用 Es6 中的 class 有一些差别

```javascript
// javascript 中 class 的定义
class An {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}
var a = new An("zz");
a.getName(); // zz
```

> 3、差异在于，我们需要去定义 constructor 构造函数中传入的数据参数的类型

###二、TypeScript 中类的继承

```typescript
class Animal {
  name: string | undefined;
  food: string;
  constructor(name: string, food: string) {
    this.name = name;
    this.food = food;
  }
  eat() {
    console.log(`${this.name}吃${this.food}`);
  }
}

class Cat extends Animal {
  constructor(name: string, food: string) {
    super(name, food);
  }
  jump() {
    console.log(`${this.name}正在跳`);
  }
}

let xiaohhua = new Cat("xiaohua", "猫粮");
console.log(xiaohhua.eat()); // xiaohua吃猫粮
console.log(xiaohhua.jump()); // xiaohua正在跳
```

> 这里和 ES6 中的 class 继承内容基本上没什么出入

###三、TypeScript 中公共，私有与受保护的修饰符

> 这里的修饰符是对类中对 属性和方法的类型的定义

#### 3-1、属性的 public

> 不定义的类心的话，默认就是 public 类型

```typescript
class Animals {
  public name: string | undefined;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name}哇`);
  }
}
```

> 转换成 es5 代码

```javascript
"use strict";
var Animals = /** @class */ (function() {
  function Animals(name) {
    this.name = name;
  }
  Animals.prototype.eat = function() {
    console.log(this.name + "\u54C7");
  };
  return Animals;
})();
// 和没定义之前一样
```

#### 3-2、属性的 private

> 当成员被标记成 private 时，它就不能在声明它的类的外部访问

```typescript
class Animal2 {
  private name: string | undefined;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name}哇`);
  }
}

var a = new Animal2("private");
a.name = "123"; // 报错，name 属性只能在 Animal2 内部使用
new Animal2("private").name = "432"; // 报错： 属性“name”为私有属性，只能在类“Animal2”中访问。
```

#### 3-3、属性的 protected

> 当成员被标记成 protected 时，它就不能在声明它的类的外部访问，但是该类的子类可以访问

```typescript
class Person2 {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class exPerson extends Person2 {
  public age: number;
  constructor(age: number, name: string) {
    super(name);
    this.age = age;
    this.name = name;
  }
  public getInfo() {
    console.log(`${this.name}哈哈哈哈${this.age}`);
  }
}

let ps = new exPerson(123, "za"); // 派生类可以继承 protected 属性，但是

ps.name = "zz"; // 报错 外部无法直接访问
console.log(ps); // { name: 'za', age: 123 }
```

> 构造函数也能够被 设置成 protected 属性

```typescript
class Person22 {
  protected name: string;
  protected constructor(name: string) {
    this.name = name;
  }
}

class exPerson2 extends Person2 {
  public age: number;
  constructor(age: number, name: string) {
    super(name);
    this.age = age;
    this.name = name;
  }
  public getInfo() {
    console.log(`${this.name}哈哈哈哈${this.age}`);
  }
}

let exp = new exPerson2(21, "exp-name");
let per22 = new Person22("zs"); // 报错 类“Person22”的构造函数是受保护的，仅可在类声明中访问
```

#### 3-4、readonly 修饰符

> 使用 readonly 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化

```typescript
class octPers {
  readonly name: string;
  readonly age: number = 8;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

let ns = new octPers("zz", 123);
console.log("---1", ns);
ns.age = 456; // 报错 Cannot assign to 'age' because it is a read-only property.
console.log("---2", ns); // 这里会执行什么内容呢？
```

###四、TypeScript 中 静态方法

> 这里所谓的静态方法，其实就是将方法直接定义在了 构造函数对象上，只有构造函数本身才能去使用它，任何其他都无法使用（包括它的 派生类）

```typescript
class staticPerson {
  public name: string;
  public age: number = 8;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  static getName1() {
    console.log("---static-getName---", this);
  }
  protected getName(): void {
    console.log("---protected-getName---", this);
  }
}

let ress = new staticPerson("zzs", 123);
console.log("---instancing getName", staticPerson.getName1()); // 属性“getName”受保护，只能在类“staticPerson”及其子类中访问。
```

###五、TypeScript 中 继承与多态

> 这里面其实更多的是 JS 的继承与多态，我们以 ES5 和 ES6 分别对继承和多态进行对比

#### 5-1 ES5 中是如何实现 继承的？

> 这里我们想想继承，到底是继承什么？如何继承？为什么要继承？

##### 5-1-1 通过类式继承

> 类的方式，其核心在于将 子类的 prototype 指向了 父类的实例，这样的话，子类的实例的 `__proto__` 指向子类的 `prototype`, 然而 子类的 `prototype` 被赋予了 父类的实例。我们制作一个简单的图，来说明一下这里如何实现的继承。

![](https://img2020.cnblogs.com/blog/675289/202003/675289-20200326231020779-112372204.jpg)

```javascript
var SuperClass = function(name) {
  var id = 1;
  this.name = name;
  this.work = function() {
    console.log(this.name + "in SuperClass");
  };
};
SuperClass.prototype.getSuperName = function() {
  return this.name;
};

var SubClass = function() {
  this.getSubName = function() {
    console.log("this is subname");
  };
};

SubClass.prototype = new SuperClass("superClass");
var sub = new SubClass();

// 这样有缺点么？ 当然有，下面我们来通过例子来说明一下
```

> 这种继承的方式的缺点、

```javascript
var SuperClass = function(name) {
  var id = 1;
  this.name = name;
  this.todo = [1, 2, 3, 4];
  this.work = function() {
    console.log(this.name + "in SuperClass");
  };
};
SuperClass.prototype.getSuperName = function() {
  return this.name;
};

var SubClass = function() {
  this.getSubName = function() {
    console.log("this is subname");
  };
};

SubClass.prototype = new SuperClass("superClass");
var sub = new SubClass();
sub.todo.push("subClass name");
var sub2 = new SubClass();
console.log(sub2.todo); // [ 1, 2, 3, 4, 'subClass name']
// 这里是缺陷一，父类属性会被实例子类修改、污染

console.log(sub.name); //superClass
console.log(sub2.name); //superClass

// 子类的实例只能有一个name，这很显然也是不够灵活的，这里就是缺陷二
```

> 这里因为子类实例对象 1，对于父类共有属性进行了修改，导致子类实例对象 2 的对应属性受到了污染。那有没有什么办法可以避免这种污染呢？当然是有的，后面我们会介绍到的。

##### 5-1-2 通过构造函数继承

```javascript
// 声明父类
function Animal(color) {
  this.name = "animal";
  this.type = ["pig", "cat"];
  this.color = color;
}

// 添加原型方法
Animal.prototype.eat = function(food) {
  console.log(food);
};

// 声明子类
function Dog() {
  Animal.apply(this, arguments);
  // 这一步的操作就是改变 Animal 方法的上下文，然后让 Dog 也具备了 父类构造函数内的属性和方法
}

var dog1 = new Dog("blue"); // dog1.color -> blue
var dog2 = new Dog("red"); // dog2.color -> red

dog1.type.push("haha");
console.log(dog2.type); // [ 'pig', 'cat' ]
```

> 我没看到 dog1 修改了继承自父类的属性 type ，但是 dog2 的 type 属性并为被影响到。原因就是我们实例化的时候，创建的实例对象的指针指向的位置是不同的，所以对应的 `__proto__` 指向的是 不同的子类构造函数的 `prototype`。可能会比较绕口，但是本质就是 new 操作生成了 2 个不同的对象，各自有各自的原型属性，互不干扰。

`但是上面也有一个缺陷就是，子类没办法继承到父类原型上的方法和属性`

> 那聪明的前端开发者们，就想到了 集合前 2 者的优势，进行了 组合式继承。

##### 5-1-3 组合式继承

```javascript
// 声明父类
function Animal(color) {
	this.name = 'animal';
	this.type = ['pig', 'cat'];
	this.color = color;
}

// 添加原型方法
Animal.prototype.eat = function(food) {
	console.log(food);
};

// 声明子类
function Dog() {
	Animal.apply(this, arguments);
	// 这一步的操作就是改变 Animal 方法的上下文，然后让 Dog 也具备了
	// 父类构造函数内的属性和方法
}
Dog.prototype = new Animal('Animal Color');

var dog1 = new Dog();
console.log((dog1.color = 'dog1.name'));
var dog2 = new Dog();

console.log(dog2.color); // undefined

这里为什么 dog2.color 是 undefined 而不是 'dog1.name' 呢？
因为，我们子类的构造函数，已经继承了 父类的构造函数内部的属性和方法，然后，在实例我们 子类的时候，子类的实例对象就会有先从本身的对象中去寻找 color 属性。
当找到对应属性的时候，无论是否有值，都会优先返回 实例化对象本身的属性，而不再需要从原型链中查找对应属性。
```

#### 5-2 ES6 中是如何实现 继承的？

> 这里我们想想继承，到底是继承什么？如何继承？为什么要继承？

##### 5-2-1 ES6 的继承方式

```javascript
class Animal {
	constructor(name) {
		this.name = name;
	}
	eat(food) {
		console.log(`${this.name}吃${food}`);
	}
}

class Dog extends Animal {
	constructor(name) {
		super(name);
		this.name = name;
	}
	run() {
		console.log('小狗泡泡跑');
	}
}

let dog1 = new Dog('小狗');
let dog2 = new Dog('小花');
console.log(dog1.name); // 小狗
console.log(dog2.name); // 小花

dog1.__proto__ === Dog.prototype	// true
Dog.__proto__ === Animal			// true

这里 Dog 的 __proto__ 指向的是 Animal 这个类

因为 Animal 这个类中的 constructor 就是原来的构造函数， 其中剩下的方法、属性都是 prototype 上的公共方法与属性。是可以被子类继承
```

### 六、总结

> 这里全篇文章又总结了下 JS 中继承的原理以及一些我们平时可能忽略的问题，这里就相当于在 学习 ts 之前，带着大家再一起复习一下。好了，本篇文章就先到这里了。
