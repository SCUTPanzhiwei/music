import * as types from './mutation-types'
import {saveSearch,deleteSearch} from '../common/js/localCache'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({ commit, state }, { list, index }) {
  // commit(string,传参) string指向的是对应的mutation
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}

// 单首歌曲加入到列表中 参数为song


/* 
  单首歌曲插入逻辑 如果当前列表内有这首歌 将其原索引删除 
  将其加入到下载的播放列表中

*/
export const addPlay = function ({ commit, state }, { song }) {
  // commit(string,传参) string指向的是对应的mutation
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playList[currentIndex]
  // 查找当前列表中是否有待插入的歌曲
  let fIndex = findIndex(playList, song)
  // 插入歌曲，当前索引加1
  currentIndex++
  // 插入歌曲到当前索引位置
  playList.splice(currentIndex, 0, song)
  // 存在该歌曲
  if (fIndex > -1) {
    // 当前插入的序号大于列表中序号
    if (currentIndex > fIndex) {
      playList.splice(fIndex, 1)
      currentIndex--
    } else {
      playList.splice(fIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong)
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    // 当前插入的序号大于列表中序号
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
      currentIndex--
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, false)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function ({commit},query) {
  commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const deleteAllSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY,[])
}

export const deleteSong = function ({commit,state},song) {
  // 需要修改 playList sequenceList currentIndex
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playList,song)
  playList.splice(pIndex,1)
  let sIndex = findIndex(sequenceList,song)
  sequenceList.splice(sIndex,1)
  // 如果删除的是最后一首歌，或者是在之前删除了歌曲
  if(currentIndex>pIndex || currentIndex === playList.length){
    currentIndex--
  }
  commit(types.SET_PLAY_LIST,playList)
  commit(types.SET_SEQUENCE_LIST,sequenceList)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  if(playList.length>0){
    commit(types.SET_PLAYING_STATE,true)
  } else {
    commit(types.SET_PLAYING_STATE,false)
  }
}

export const deletePlayList = function ({commit}) {
  commit(types.SET_PLAY_LIST,[])
  commit(types.SET_SEQUENCE_LIST,[])
  commit(types.SET_CURRENT_INDEX,-1)
  commit(types.SET_PLAYING_STATE,false)
}