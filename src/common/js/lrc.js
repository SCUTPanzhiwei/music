/* 对歌词进行处理 
  后台传来的歌词为字符串

*/
// 拿到每一行的单词
export function handleLrc(lyric) {
  // 歌词保存形式为 {time: 12313 ,lyric: '.....' }

  let lyricArr = []
  // 对字符串进行分割
  const regNewLine = /\n/g  //匹配换行
  const lineArr = lyric.split(regNewLine) // 以换行符进行分割为数组
  // 得到每一行的内容形式为 [00:00.000] 作词 : 黄家驹
  // 对时间进行分割
  const regTime = /\[\d{2}:\d{2}\.\d{2,3}\]/
  for (let item of lineArr) {
    if (item === '') {
      continue
    }
    const obj = {}
    const content = item.split(']')[1].trim()
    obj.content = content
    // 保存并处理时间
    const time = handleTime(item.match(regTime)[0])
    obj.time = time
    // 如果有内容
    if (obj.content.length > 0) lyricArr.push(obj)
  }
  return lyricArr
}

// 转化为 audio所需要的形式 秒.毫秒
function handleTime(timeString) {
  const time = timeString.slice(1, timeString.length - 1)
  const minReg = /\d{2}:/
  const secReg = /:\d{2}/
  const msecReg = /\.\d{2,3}/
  const min = time.match(minReg)[0].split(':')[0] // 01
  const sec = time.match(secReg)[0].split(':')[1] // 02
  const msec = time.match(msecReg)[0].split('.')[1] // 003
  const currentTime = parseInt(min * 60) + parseInt(sec)
  return currentTime + '.' + msec
}