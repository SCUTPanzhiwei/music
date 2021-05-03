import * as types from './mutation-types'
const mutations = {
  // 存放改变state的函数  es6的写法，存放一个变量作为属性名
  /* 
  等价于
  setSinger:function(){}
  */
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, playingState) {
    state.playingState = playingState
  },
  [types.SET_FULL_SCREEN](state, fullScreen) {
    state.fullScreen = fullScreen
  },
  [types.SET_PLAY_LIST](state,playList) {
    state.playList = playList
  },
  [types.SET_SEQUENCE_LIST](state, sequenceList) {
    state.sequenceList = sequenceList
  },
  [types.SET_PLAY_MODE](state, playMode) {
    state.playMode = playMode
  },
  [types.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },
}
export default mutations