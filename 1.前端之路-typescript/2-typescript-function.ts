/**
 * function
 * @return string
 * */
function func1(): string   {
  return  'string'
}
/**
 * function
 * @return number
 * */
function func2(): number {
  return 123
}
/**
 * function
 * @return boolean
 * */
function func2_1(): boolean {
  return false
}
/**
 * function
 * @return Array<number>
 * */
function func3(): Array<number> {
  return [1,2,3]
}
/**
 * function
 * @return Array<string>
 * */
function func4(): Array<string> {
  return ['1','2']
}
/**
 * function
 * @return Array<any>
 * */
function func5(): Array<any> {
  return ['1', {}, 1]
}
/**
 * function
 * @return Array<any>
 * */
function func5_1(): Array<string> {
  return ['1','2', '3']
}
/**
 * function
 * @return Void
 * */
function func6(): void {
  console.log(1)
}
/**
 * function
 * @return any
 * */
function func7(): any {
  return 1 || '1' || [1] || {a: 1}
}




/**
 * 函数表达式
 * */

/**
 * function
 * @return string
 * */
const func8 = (): string => {
  return '1'
}
/**
 * function
 * @return number
 * */
const func9 = (): number => {
  return 1
}

/**
 *以上均无区别
 */



/**
 * 定义带参数的函数
 * @param arg1
 * @param arg2
 * @return String
 * */

function func10(arg1: string = '1',arg2: number = 1): string {
  return arg1 + arg2
}
console.log(func10)




/**
 * 定义带可选参数的函数
 * @param arg1
 * @param arg2
 * @return String
 * */

function func11(arg1: string = '1',arg2?: number ): string {
  return arg2? arg1 + arg2 : arg1
}
console.log(func11)



/**
 * 传递剩余参数
 * @return String
 * @param num
 * */

function getSum(...num: Array<number> ): number {
  let result = 0
  for(let i = 0; i < num.length; i++) {
    result += num[i]
  }
  return result
}


/**
 * 函数重载
 * @param arg1
 * @param arg2
 * @return String
 * */

/**
 * 函数重载是类似java中的同一个函数   函数名相同，  参数不同  那么就是不同的函数  所以在实际的编程过程中 尽量避免相同的函数名出现
 * */

