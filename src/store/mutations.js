import * as types from './mutation-types'
const mutations = {
  // 存放改变state的函数  es6的写法，存放一个变量作为属性名
  /* 
  等价于
  setSinger:function(){}
  */
  // 歌手设置
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  // 播放状态设置
  [types.SET_PLAYING_STATE](state, playingState) {
    state.playingState = playingState
  },
  // 是否全屏显示
  [types.SET_FULL_SCREEN](state, fullScreen) {
    state.fullScreen = fullScreen
  },
  // 播放列表设置
  [types.SET_PLAY_LIST](state,playList) {
    state.playList = playList
  },
  [types.ADD_PLAY_LIST](state,song) {
    // 将当前歌曲插入到播放列表中
    state.playList.unshift(song)
    state.sequenceList.unshift(song)
  },
  // 设置顺序播放
  [types.SET_SEQUENCE_LIST](state, sequenceList) {
    state.sequenceList = sequenceList
  },
  // 播放模式设置
  [types.SET_PLAY_MODE](state, playMode) {
    state.playMode = playMode
  },
  // 当前歌曲索引
  [types.SET_CURRENT_INDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },

}
export default mutations