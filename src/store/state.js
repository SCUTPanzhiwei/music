import {playMode} from '../common/js/config'
/* 
1、歌手信息
2、播放器是否正在播放
3、切换mini与大播放器
4、播放列表
5、顺序播放列表
6、播放模式
7、当前播放index
*/
const state = {
  singer:{}, 
  playingState: false, 
  fullScreen: false,
  playList:[],
  sequenceList:[], 
  playMode: playMode,
  currentIndex: -1,
}
export default state