import {playMode} from '../common/js/config'
import {loadSearch} from '../common/js/localCache'
/* 
1、歌手信息
2、播放器是否正在播放
3、切换mini与大播放器
4、播放列表
5、顺序播放列表
6、播放模式
7、当前播放index
8、搜索历史
*/
const state = {
  singer:{}, 
  playingState: false, 
  fullScreen: false,
  playList:[],
  sequenceList:[], 
  playMode: playMode.sequence,
  currentIndex: -1,
  searchHistory: loadSearch() // 初始化为本地存储
}
export default state