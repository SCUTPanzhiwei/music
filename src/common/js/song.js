export default class Song {
  constructor({id,singer,songName,album,duration,img,url,mv}){
    this.id = id //歌曲id
    this.singer =singer // 歌曲作者
    this.songName = songName // 歌曲名称
    this.album = album //专辑
    this.duration = duration //时长 毫秒
    this.img = img // 歌曲封面
    this.url = url // 
    this.mv = mv
  }
}

export function createSong(hotSong) {
  return new Song({
    singer:filterSinger(hotSong.ar),
    songName:hotSong.name,
    id: hotSong.id,
    album:hotSong.al.name,
    duration:hotSong.dt, // 毫秒
    img:hotSong.al.picUrl,
    url:`http://music.163.com/song/media/outer/url?id=${hotSong.id}.mp3` // 从这个地址去抓数据
  })
}
// 处理作者信息
function filterSinger(singer) {
  let ret = []
  if(!singer) {
    return []
  }
  singer.forEach((item)=>{
    ret.push(item.name)
  })
  return ret.join('/')
}
