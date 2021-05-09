import * as types from './mutation-types'

export const selectPlay = function({commit,state},{list,index}) {
  // commit(string,传参) string指向的是对应的mutation
  commit(types.SET_PLAY_LIST,list)
  commit(types.SET_SEQUENCE_LIST,list)
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_FULL_SCREEN,false)
  commit(types.SET_PLAYING_STATE,true)
}

// 单首歌曲加入到列表中 参数为song
export const addPlay = function({commit,state},{song}) {
  // commit(string,传参) string指向的是对应的mutation
  commit(types.ADD_PLAY_LIST,song)
  commit(types.SET_CURRENT_INDEX,0)
  commit(types.SET_FULL_SCREEN,false)
  commit(types.SET_PLAYING_STATE,true)
}