;(function () {
  function Gesture(target) {
    // 构造函数所需要做的事情 获取目标元素 初始化配置和
    // 初始化代码,获取目标元素
    this.target = target instanceof HTMLElement ? target : typeof target === 'string' ? document.querySelector(target) : null
    if (!this.target) return
    this.target.addEventListener('touchstart', this._touch.bind(this), false)
    this.target.addEventListener('touchmove', this._move.bind(this), false)
    this.target.addEventListener('touchend', this._end.bind(this), false)
    this.target.addEventListener('touchcancel', this._cancel.bind(this), false)
    this.touch = {} // 记录刚触摸的手指
    this.movetouch = {} // 记录移动过程中变化的手指参数
    this.pretouch = {} // 双击 记录上一次触摸的对象
    this.longTapTimeout = null // 触发长按的定时器
    this.tapTimeout = null // 记录是否执行点击的定时器
    this.doubleTap = false // 记录是否执行双击的定时器
    this.handles = {}
  }
  Gesture.prototype = {
    // 实现各种手势的代码
    _touch(e) {
      this.params.event = e // 记录触摸时的事件对象，params为回调时的传参
      this.elem = e.target //触摸的具体对象
      let point = e.touches ? e.touches[0] : e; // 获得触摸参数
      let now = +new Date()
      this.touch.startX = point.pageX
      this.touch.startY = point.pageY
      this.touch.startTime = now
      this.longTimeout && clearTimeout(this.longTapTimeout)
      this.tapTimeout && clearTimeout(this.tapTimeout)
      this.doubleTap = false
      this._emit('touch') // 触发 触摸的回调
      if (e.touches.length > 1) {
        // 处理多个手指触摸的情况
      } else {
        let self = this
        this.longTapTimeout = setTimeout(function () {
          self._emit('longtap') // 800毫秒后执行长按回调
          self.doubleTap = false
          e.preventDefault();
        }, 800)
        this.doubleTap = this.pretouch.time &&
          now - this.pretouch.time < 300 &&
          Math.abs(this.touch.startX - this.pretouch.startX) < 30 &&
          Math.abs(this.touch.startY - this.pretouch.startY) < 30 &&
          Math.abs(this.touch.startTime - this.pretouch.time) < 300
        this.pretouch = { // 更新本次触摸信息为上一次触摸
          startX: this.touch.startX,
          startY: this.touch.startY,
          time: this.touch.startTime
        }
      }
    },
    _move(e) {
      let point = e.touches ? e.touches[0] : e
      this._emit('move')
      if (e.touches.length > 1) {
        // 多个手指触摸
      } else {
        let diffX = point.pageX - this.touch.startX
        let diffY = point.pageY - this.touch.startY
        this.params.diffY = diffY
        this.params.diffX = diffX
        // 记录移动过程中与上一次移动的相对坐标
        if (this.movetouch.x) {
          this.params.deltaX = point.pageX - this.movetouch.x
          this.params.deltaY = point.pageY - this.movetouch.y
        } else {
          this.params.deltaX = this.params.deltaY = 0
        }
        // 手指的滑动距离超过30 单手指的非滑动事件取消
        if (Math.abs(diffX) > 30 || Math.abs(diffY) > 30) {
          if (this.longTimeout) clearTimeout(this.longTimeout)
          if (this.tapTimeout) clearTimeout(this.tapTimeout)
          this.doubleTap = false
        }
        this._emit('slide') //执行自定义的move回调
        // 更新移动中的手指参数
        this.movetouch.x = point.pageX
        this.movetouch.y = point.pageY
      }
    },
    _end(e) {
      if (this.longTapTimeout) clearTimeout(this.longTapTimeout)
      let timestamp = +new Date()
      let deltaX = ~~((this.movetouch.x || 0) - this.touch.startX)
      let deltaY = ~~((this.movetouch.y || 0) - this.touch.startY)
      let direction = ''
      if (this.movetouch.x && (Math.abs(deltaX) > 30 || this.movetouch.y !== null && Math.abs(deltaY) > 30)) {
        if (Math.abs(deltaX) < Math.abs(deltaY)) {
          if (deltaY < 0) {
            this._emit('swipeUp')
            this.params.direction = 'up'
          } else {
            this._emit('swiperDown')
            this.params.direction = 'down'
          }
        } else {
          if (deltaX < 0) {
            this._emit('swiperLeft')
            this.params.direction = 'left'
          } else {
            this._emit('swiperRight')
            this.params.direction = 'right'
          }
        }
        this._emit('swipe') // 滑动
      } else { // 触发点击事件

        if (!this.doubleTap && timestamp - this.touch.startTime < 300) {
          // 触发单次点击
          let self = this
          this.tapTimeout = setTimeout(function () {
            self._emit('tap')
            self._emit('finish')
          }, 300)
        } else if (this.doubleTap) {
          this._emit('dbtap')
          if (this.tapTimeout) clearTimeout(this.tapTimeout)
          this._emit('finish')
        } else {
          this._emit('finish')
        }
      }
      this._emit('end') // 原生的touchend事件
    }


  }
  Gesture.prototype.constructor = Gesture
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Gesture
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return Gesture
    })
  } else {
    window.GT = Gesture
  }
})()