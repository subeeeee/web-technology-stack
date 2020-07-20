/*
* ts中实现函数继承， 类 及原理
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
const wz = new Persons("王震",24)
console.log(wz.getAge())
console.log(wz.getName())

