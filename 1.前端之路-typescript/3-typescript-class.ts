/*
* ts中实现函数继承， 类 及原理
* */
/**
 * 类的声明
 * */
class Persons {
  name: string;
  age: number | undefined;
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  getName(): string {
    return  this.name
  }
  getAge(): number | undefined {
    return this.age
  }
}
const wz1 = new Persons("王震",24)
// console.log(wz1.getAge())                          // 24
// console.log(wz1.getName())                         // 王震

/**
 * 类的继承
 * */
class Men extends Persons{
  sex: string;
  constructor(name: string, age: number, sex: string) {
    super(name,age);
    this.sex = sex;
  }
  getSex(): string {
    return  this.sex
  }
}
const wz2 = new Men('王震', 24, '男')


// console.log(wz2.getAge())                              // 24
// console.log(wz2.getName())                             // 王震
// console.log(wz2.getSex())                              // 男


/**
 * typeScript 中公共，私有与受保护的修饰符
 *
 *
 * @public       属性不定义类型 默认是public
 *
 * @private     当成员被标记成 private 时，它就不能在声明它的类的外部访问
 * */

class Animal1 {
  private type: string
  private name: string
  private age: number
  protected con: string
  readonly  d: string

  constructor(type: string, name: string, age: number) {
    this.type = type
    this.name = name
    this.age = age
  }
  getName(): string {
    return  this.name
  }
}