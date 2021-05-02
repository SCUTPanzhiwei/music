import * as types from './mutation-types'

const mutations = {
  // 存放改变state的函数  es6的写法，存放一个变量作为属性名
  /* 
  等价于
  setSinger:function(){
    
  }
  */
  [types.SET_SINGER](state,singer){
    state.singer = singer
  }
}

export default mutations