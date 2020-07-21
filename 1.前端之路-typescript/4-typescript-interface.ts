/*
*   interface 接口
*
* */


/**
 * 在类中使用
 * */
interface Name {
  firstName: string;
  lastName: string;
}
class Person {
  public firstName: string
  public lastName: string
  constructor(person: Name) {
    this.firstName = person.firstName
    this.lastName = person.lastName
  }
}
new Person({firstName:'12', lastName:'23'})
/**
 * 在function中使用
 * */

interface Params {
  name: string;
  age: number;
}
function fn1(person): string {
  return person.name + "年龄是" + person.age
}
console.log(fn1({name: '王震', age: 24}))