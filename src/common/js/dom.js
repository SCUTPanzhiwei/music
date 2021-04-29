export function addClass(el,className){
  if(hasClass(el,className)) {
    return 
  } else {
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  }
}
export function hasClass(el,className){
  //判断是否已经有 ^表示开头匹配
  let reg = new RegExp('(^|\\s)'+className+'(\\s|$)')
  return reg.test(el.className)
}