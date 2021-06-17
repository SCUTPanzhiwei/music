const Gesture = require("./gesture")

;
(function () {
  // 计算距离和角度等的求和公式

  function getLen(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
  }

  // 计算两次手势状态之间的夹角
  function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y
  }
  // 构造
  const HandlerAdmin = function (el) {
    this.handlers = [] //监听函数列表
    this.el = el // 监听对象
  }
  // 增加一个监听函数
  HandlerAdmin.prototype.add = function (handler) {
    this.handlers.push(handler)
  }
  // 构造函数删除监听函数的方法
  HandlerAdmin.prototype.del = function (handler) {
    if (!handler) this.handlers = [] // 表示清除监听函数的列表
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i] === handler) {
        this.handlers.splice(i, 1)
      }
    }
  }
  // 触发回调函数
  HandlerAdmin.prototype.on = function (args) {
    this.handlers.forEach((handler) => {
      if (typeof handler === 'function') {
        handler.apply(this.el, args)
      }
    })
  }

  // 实力处理监听函数的对象
  function createNewHandlerAdmin(el, handler) {
    let handlerAdmin = new HandlerAdmin(el)
    handlerAdmin.add(handler)
    return handlerAdmin
  }
  // 
  const Gesture = function (el, option) {
    this.element = (typeof el === 'string') ? document.querySelector(el) : el // 绑定事件的元素

    // 首次将绑定原型上start move end cancel函数的this对象，避免向上查找过程
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);
    this.cancel = this.cancel.bind(this);

    this.element.addEventListener("touchstart", this.start, false);
    this.element.addEventListener("touchmove", this.move, false);
    this.element.addEventListener("touchend", this.end, false);
    this.element.addEventListener("touchcancel", this.cancel, false);

    this.preV = {
      x: null,
      y: null
    } // 两个手指间x与y的差
    this.pinchStartLen = null // 两个手指间的距离
    this.isDoubleTap = false // 是否双击

    var noop = function () {}

    this.rotate = createNewHandlerAdmin(this.element, option.rotate || noop);
    this.touchStart = createNewHandlerAdmin(this.element, option.touchStart || noop);
    this.multipointStart = createNewHandlerAdmin(this.element, option.multipointStart || noop);
    this.multipointEnd = createNewHandlerAdmin(this.element, option.multipointEnd || noop);
    this.pinch = createNewHandlerAdmin(this.element, option.pinch || noop);
    this.swipe = createNewHandlerAdmin(this.element, option.swipe || noop);
    this.tap = createNewHandlerAdmin(this.element, option.tap || noop);
    this.doubleTap = createNewHandlerAdmin(this.element, option.doubleTap || noop);
    this.longTap = createNewHandlerAdmin(this.element, option.longTap || noop);
    this.singleTap = createNewHandlerAdmin(this.element, option.singleTap || noop);
    this.pressMove = createNewHandlerAdmin(this.element, option.pressMove || noop);
    this.touchMove = createNewHandlerAdmin(this.element, option.touchMove || noop);
    this.touchEnd = createNewHandlerAdmin(this.element, option.touchEnd || noop);
    this.touchCancel = createNewHandlerAdmin(this.element, option.touchCancel || noop);


    this.delta = null; // 用于判断是否是双击的时间戳
    this.last = null; // 记录时间戳的变量
    this.now = null; // 记录时间戳的变量
    this.tapTimeout = null; //tap事件执行的定时器
    this.singleTapTimeout = null; // singleTap执行的定时器
    this.longTapTimeout = null; // longTap执行的定时器
    this.swipeTimeout = null; // swipe执行的定时器
    this.x1 = this.x2 = this.y1 = this.y2 = null; // start时手指的坐标x1, y1, move时手指的坐标x2, y2
    this.preTapPosition = {
      x: null,
      y: null
    }; // 记住start时，手指的坐标
  }


  Gesture.prototype = {
    start(e) {
      if (!e.touches) return
      this.now = +new Date()
      this.x1 = e.touches[0].pageX
      this.y1 = e.touches[0].pageY
      this.delta = this.now - (this.last || this.now)
      this.touchStart.on(e) // 触发touchStart事件,事件钩子
      // 非第一次触摸屏幕
      if(this.preTapPosition.x !== null) {
        // 记录是否双击
        this.isDoubleTap = (this.delta > 0 && this.delta <= 300 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30)
      }

      // 缓存本次触摸数据
      this.preTapPosition.x = this.x1
      this.preTapPosition.y = this.y1
      this.last = this.now
      
      //
      let preV = this.preV // 获取记录的两点坐标的差值
      let len = e.touches.length // 记录手指个数
      // 如果手指个数比1大 说明不是长按或单按事件
      if (len > 1) {
        this._cancelLongTap() 
        this._cancelSingTap()
        // 记录两个手指之间的坐标差
        let v = { x: e.touches[1].pageX - this.x1, y: e.touches[1].pageX - this.y1}
        preV.x = v.x
        preV.y = v.y
        // 计算两个手指的间距
        // 触发multipointStart事件
      }
      // 否则开启定时器 监听是否是长按事件 750ms后触发长按
      this.longTapTimeout = setTimeout(function () {
        this.longTap.on(e)
      }.bind(this), 750)
    },
    move(e) {
      if (!e.touches) return
      var preV = this.preV // 记录start方法中保存的两点横纵坐标差值
      if (preV.x !== null) {
        
      } 
    }
  }



























  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = Gesture
  } else {
    window.Gesture = Gesture
  }
})()