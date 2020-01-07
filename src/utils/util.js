export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * @description 将一维的扁平数组转换为多层级对象
 * @param {String} arrayList 一维数组
 */
export function arrayToTree (arrayList = [], field) {
  arrayList = JSON.parse(JSON.stringify(arrayList));
  let id = 'id', parentId = 'pId', children = 'children'
  if (field) {
    id = field.id || id;
    parentId = field.parentId || parentId;
    children = field.children || children;
  }
  let listObj = {} // 用来储存{key: obj}格式的对象
  let treeList = [] // 用来储存最终树形结构数据的数组
  // 将数据变换成{key: obj}格式，方便下面处理数据
  for (let i = 0; i < arrayList.length; i++) {
    listObj[arrayList[i][id]] = arrayList[i]
  }
  // 将数据进行格式化
  for (let i = 0; i < arrayList.length; i++) {
    // 判断父级是否存在
    let hasParent = listObj[arrayList[i][parentId]]
    if (hasParent) {
      // 如果没有父级children字段，就创建一个children字段，在父级里插入子项
      !hasParent[children] && (hasParent[children] = [])
      hasParent[children].push(arrayList[i])
    } else {
      // 如果没有父级直接插入到最外层
      treeList.push(arrayList[i])
    }
  }
  return treeList
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
