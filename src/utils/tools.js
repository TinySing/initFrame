  //  工具类方法

  /**
   * @param {Number} timeStamp 传入的时间戳
   * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返YY-MM-DD HH:mm:ss 
   *  传入'year_mm'则返 YY-MM-DD HH:mm  传入 'year_dd' 则返回  YY-MM-DD 
   *  默认返回 YY-MM-DD  
   */
  export const getDate = (timeStamp, startType) => {
    let d = null
    if (isNaN(timeStamp)) {
      d = new Date(timeStamp * 1000)
    } else {
      d = new Date(timeStamp)
    }

    const year = d.getFullYear()
    const month = getHandledValue(d.getMonth() + 1)
    const date = getHandledValue(d.getDate())
    const hours = getHandledValue(d.getHours())
    const minutes = getHandledValue(d.getMinutes())
    const second = getHandledValue(d.getSeconds())
    let resStr = ''
    if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
    else if (startType === 'year_mm')
      resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
    else if (startType === 'year_dd') resStr = year + '-' + month + '-' + date
    else resStr = year + '-' + month + '-' + date

    return resStr
  }

  /**
   * @param {String|Number} timeStamp 时间戳
   * @returns {String} 相对时间字符串
   */
  export const getRelativeTime = timeStamp => {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = isMillisecond(timeStamp)
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp)
    // 获取当前时间时间戳
    const currentTime = Math.floor(Date.parse(new Date()) / 1000)
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = isEarly(timeStamp, currentTime)
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff
    let resStr = ''
    const dirStr = IS_EARLY ? '前' : '后'
    // 少于等于59秒
    if (diff <= 59) resStr = diff + '秒' + dirStr
    // 多于59秒，少于等于59分钟59秒
    else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
    // 多于59分钟59秒，少于等于23小时59分钟59秒
    else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
    // 多于23小时59分钟59秒，少于等于29天59分钟59秒
    else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
    // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
    else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
    else resStr = getDate(timeStamp, 'year')
    return resStr
  }

//防抖函数
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
export function debounce(fn, delay) {
  // 定时器
  let timer = null
  
  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this
    // 保留调用时传入的参数
    let args = arguments
    // 每次事件被触发时，都去清除之前的旧定时器
    if(timer) {
        clearTimeout(timer)
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

//节流函数
// fn是我们需要包装的事件回调, interval是时间间隔的阈值
export function throttle(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0
  
  // 将throttle处理结果当作函数返回
  return function () {
      // 保留调用时的this上下文
      let context = this
      // 保留调用时传入的参数
      let args = arguments
      // 记录本次触发回调的时间
      let now = +new Date()
      
      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
      if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
          last = now;
          fn.apply(context, args);
      }
    }
}