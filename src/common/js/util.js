/* 洗牌函数 */
export function shuffle(arr) {
  let _arr = arr.slice()
  var length = arr.length //最末尾索引
  var random
  while (length) {
    random = Math.floor(Math.random() * (length)) // 从未确定的牌中等概率随机选择一张牌的索引
    length--
    // 交换
    [_arr[length], _arr[random]] = [_arr[random], _arr[length]]
  }
  return _arr
}

/* 节流函数 */
export function debounce(func,delay) {
  let timer = null
  return function(...args) {
    let self = this
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      func.call(self,...args)
    },delay)
  }
}