import storage from 'good-storage'

// storage 为github插件，地址:https://github.com/ustbhuangyi/storage
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

/**
 * 插入数组函数
 * @param {arr} arr // 目标数组
 * @param {int} val  // 值
 * @param {func} compare // 比较函数条件
 * @param {int} maxLen  // 最大长度
 */
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

/**
 * 删除数组函数
 * @param {any} arr
 * @param {any} compare
 */
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index >= 0) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
