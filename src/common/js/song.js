import axios from 'axios'
import { handleLrc } from './lrc.js'
export default class Song {
  constructor({ id, singer, songName, album, duration, img, url, mv }) {
    this.id = id //歌曲id
    this.singer = singer // 歌曲作者
    this.songName = songName // 歌曲名称
    this.album = album //专辑名称
    this.duration = duration //时长 毫秒
    this.img = img // 歌曲封面
    this.url = url // 
    this.mv = mv //
  }
  getLyric() {
    return axios.get('/lyric', {
      params: {
        id: this.id // 参数为歌词id
      }
    }).then((res) => {
      // 如果没有歌词 返回一个空数组
      if (res.nolyric === true) {
        return Promise.resolve([])
      }
      // 有歌词数据 需要进一步对字符串表示形式的歌词数据进行处理
      const lyric = res.lrc.lyric
      // 拿到歌词信息后将其保存      
      const handleResult = handleLrc(lyric)
      return Promise.resolve(handleResult)
    })
  }
}

export function createSong(hotSong) {
  return new Song({
    singer: hotSong.ar ? filterSinger(hotSong.ar) :filterSinger(hotSong.artists),
    songName: hotSong.name,
    id: hotSong.id,
    album: hotSong.al ? hotSong.al.name : hotSong.album ? hotSong.album.name : '',
    duration: hotSong.dt ? hotSong.dt : hotSong.duration, // 毫秒
    img: hotSong.al ? hotSong.al.picUrl:'',
    url: `http://music.163.com/song/media/outer/url?id=${hotSong.id}.mp3` // 从这个地址去抓数据
  })
}
// 处理信息
function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return []
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}

