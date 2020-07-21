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
 * @public        属性不定义类型 默认是public
 *
 * @private       当成员被标记成 private 时，它就不能在声明它的类的外部访问
 *
 * @protected     当成员被标记成 protected 时，它就不能在声明它的类的外部访问，但是该类的子类可以访问   构造函数也能够被 设置成 protected 属性
 *
 * @readonly      当成员被标记成 readonly 时，它就是只读属性 不能使用.运算符赋值
 *
 * @static        这里所谓的静态方法，其实就是将方法直接定义在了 构造函数对象上，只有构造函数本身才能去使用它，任何其他都无法使用（包括它的 派生类）
 * */

class Animal {
  private className: string   //  猫 科
  protected readonly type: string   //     猫 豹子老虎
  public name: string   //    名字
  public age: number   //    年龄

  constructor(className: string, type: string, name: string, age: number) {
    this.className = className
    this.type = type
    this.name = name
    this.age = age
  }
  public getClassName(): string{
    let className: string = this.className
    return className
  }
  public getName(): string {
    return this.name
  }
  public getAge(): number {
    return this.age
  }
  public getType(): string {
    return this.type
  }
  protected getOwenVoice(voice: string):string {
    return this.name + '的声音是：' + voice
  }
}
class Cat extends Animal{
  public isHasHome: boolean
  public home: undefined | string
  private voice: string
  constructor(
    type: string,
    name: string,
    age: number,
    isHasHome:boolean,
    home: string,
    voice: string
  ) {
    super('猫科动物', type, name, age);
    this.isHasHome = isHasHome
    this.voice = voice
    if (this.isHasHome) {
      this.home = home
    }
  }
  public getHome(): string {
    if (this.isHasHome){
      return this.home
    }
    return  '这是一个流浪猫 没有家'
  }
  public say():void {
    console.log(this.getOwenVoice(this.voice))
  }

}
const xiaohua = new Cat('猫','小花', 2, false, '','喵')
console.log(xiaohua.name)
console.log(xiaohua.say())

