// name为String 路由名字 params obj表示参数 
export const goToPage = function (name='',params={},obj){
  // 路由跳转
  obj.push({name:name,params:params})
}