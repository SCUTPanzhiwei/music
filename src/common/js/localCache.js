// 操作和storage相关的逻辑 //对localStorage操作进行封装
import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 把query插入到当前列表中
export function saveSearch(query) {
  // 默认值为对象
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  // 返回一个新搜索列表
  return searches
}

// 提取本地缓存搜索信息
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// 删除一个本地缓存 // 输入为当前内容
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches,(item)=>{
    return item === query
  })
  // 本地存储
  storage.set(SEARCH_KEY,searches)
  return searches
}
// 删除所有本地缓存
export function deleteAllSearch() {
  storage.remove(SEARCH_KEY)
  return []
}