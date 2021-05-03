import * as types from './mutation-types'

export const selectPlay = function({commit,state},{list,index}) {
  // commit(string,传参) string指向的是对应的mutation
  commit(types.SET_PLAY_LIST,list)
  commit(types.SET_SEQUENCE_LIST,list)
  commit(types.SET_CURRENT_INDEX,index)
  commit(types.SET_FULL_SCREEN,false)
  commit(types.SET_PLAYING_STATE,true)
}