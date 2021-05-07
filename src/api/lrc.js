/* 对歌词进行处理 */
// 拿到每一行的单词
export function handleLrc(lyric) {
  // 对字符串进行分割 匹配换行
  const regNewLine = /\n/
  const lineArr = lyric.split(regNewLine) // 以换行符进行分割
  // 分割时间与歌词
  const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
  lineArr.forEach(item => {
    if (item === '') return
    const obj = {}
    const time = item.match(regTime)
    let lyric = item.split(']')[1].trim()
    obj.lyric = lyric === '' ? '' : lyric
    obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
    if (obj.lyric === '') {
      console.log('这一行没有歌词')
    } else {
      lyricsObjArr.push(obj)
    }
  });
}
function formatLyricTime(time) { // 格式化歌词的时间 转换成 sss:ms
  const regMin = /.*:/
  const regSec = /:.*\./
  const regMs = /\./

  const min = parseInt(time.match(regMin)[0].slice(0, 2))
  const sec = parseInt(time.match(regSec)[0].slice(1, 3))
  const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
  if (min !== 0) {
    sec += min * 60
  }
  return Number(sec + '.' + ms)
}