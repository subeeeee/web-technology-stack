function kuaipai(arr: Array<number>) {
  if(arr.length <=  1) {
    return arr
  }
  const centerIndex: number = Math.floor(arr.length / 2)
  const centerNumber: number = arr.splice(centerIndex, 1)[0]
  const leftList: Array<number> = []
  const rightList: Array<number> = []
  for (let i = 0; i < arr.length; i++) {
    if(arr[i] < centerNumber) {
      leftList.push(arr[i])
    } else {
      rightList.push(arr[i])
    }
  }
  return kuaipai(leftList).concat([centerNumber], kuaipai(rightList));
}
const sortList: Array<number> = kuaipai([1,3,4,2,5,546,2,34,5,567,97,656,3,89,46,2,2,34,234,2])
console.log(sortList)
console.log(sortList.reverse())
