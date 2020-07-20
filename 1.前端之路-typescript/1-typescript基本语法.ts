// Boolean
let isBool: Boolean = false;
// number
let nums: number = 123;
// string
let str: string = "123";
// 纯数组类型数组表示方式
let arr0: number[] = [123, 123];
// 使用数组泛型
let arr1: Array<number> = [123, 345];
let arr2: Array<string> = ["123", "345"];
let arr3: Array<any> = [123, "345", { title: "123" }];
// Tuple （元组类型）
let tupleArr: [number, string];
tupleArr = [123, "123"];
/**
 *  enum
 */
enum HttpStutas {
  success = 200,
  error = 404,
  noRequestId = 10010,
  noRequestName = 10011
}
let res = HttpStutas.success;

/**
 *  any
 */
let a: any = "123";
a = 123;
a = true;
a = {
  x: "123"
};

let arr: any[] = [1, "123", {}, true, [123]];


/**
 *  void
 */

let fun1 = function(): string {
  return "123";
};

let fun2 = function(): number {
  return 123;
};

let fun3 = function(): Array<number> {
  return [1, 213, 213];
};

let fun4 = function(): Array<string> {
  return ["13", "axa"];
};

let fun5 = function(): Array<any> {
  return ["13", 213, {}];
};

let fun6 = function(): any {
  return { a: 123 };
};

let fun7 = function(): void {
  console.log(fun1);
};

// 注意这里的 fun7 其实就是没有 return 任何数据，这个时候我们就给这个function 定义成一个 viod 类型。