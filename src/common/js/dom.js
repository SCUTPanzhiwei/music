export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    O: 'OTransform',
    ma: 'msTransform',
    standard: 'transform',
    Moz: 'MozTransform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key] !== undefined]) {
      return key
    }
  }
  return false
})()

export function  prefixStyle(style) {
  if(vendor === 'standard' ) {
      return style
  }
  if(vendor === false) {
    return false
  }
  return vendor+style.charAt(0).toUpperCase()+style.substr(1)
}

