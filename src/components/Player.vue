<template>
  <div class="player">
    <transition class="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img
            :src="currentSong.img"
            alt=""
            class="img"
            width="100%"
            height="100%"
          />
        </div>
        <div class="top">
          <div class="back" @click="closeNormalPlayer">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxia"></use>
            </svg>
          </div>
          <div class="title">
            <h1 class="songName" v-html="currentSong.songName"></h1>
            <h2 class="songAuthor" v-html="currentSong.singer"></h2>
          </div>
        </div>
        <div class="middle" v-finger:swipe="swipeHandler">
          <!-- 显示cd组件 -->

          <div
            class="show-cd"
            v-if="showCdFlag"
            @click="showCdFlag = !showCdFlag"
            v-finger:long-tap="longTapHandler(currentSong.img)"
          >
            <div class="cd-wrapper">
              <div class="cd" :class="rotate">
                <img :src="currentSong.img" alt="" />
              </div>
            </div>
          </div>

          <!-- 歌词组件 -->

          <div
            class="show-lyric"
            v-show="!showCdFlag"
            @click="showCdFlag = !showCdFlag"
            v-finger:touch-move="touchMoveHandler"
            v-finger:touch-end="touchEndHandler"
          >
            <Scroll
              ref="scroll"
              class="wrapper"
              :data="currentLyric"
              :probeType="1"
            >
              <ul v-if="currentLyric">
                <li
                  ref="lyricLine"
                  v-for="(item, index) in currentLyric"
                  :key="index"
                  :class="{ highlight: currentLineNum == index }"
                >
                  {{ item.content }}
                </li>
              </ul>
            </Scroll>
          </div>
        </div>

        <!-- 下方 进度条及按钮模块 -->
        <div class="bottom">
          <div
            class="current-lyric"
            v-if="currentLyric.length > 0 && showCdFlag"
          >
            {{ currentLyric[currentLineNum].content }}
          </div>
          <!-- 进度条与时间 -->
          <div class="progress-wrapper">
            <span class="time time-l">{{ formatSecond(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <!--进度条组件  -->
              <play-bar
                :percent="progress"
                @progressChange="progressChange"
                @click="progressChange"
              >
              </play-bar>
            </div>
            <span class="time time-r">{{
              formatMSecond(currentSong.duration)
            }}</span>
          </div>
          <div class="operators"></div>

          <!-- 播放、前进、后退、播放列表等 -->
          <div class="icon-wrapper">
            <svg class="icon" aria-hidden="true" @click="changePlayMode">
              <use :xlink:href="`#${IconMode}`"></use>
            </svg>
            <svg class="icon icon-pre" aria-hidden="true" @click="pre">
              <use xlink:href="#icon-shangyiqu"></use>
            </svg>
            <div class="icon-play" @click="togglePlaying">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`#${playIcon}`"></use>
              </svg>
            </div>
            <svg class="icon" aria-hidden="true" @click="next">
              <use xlink:href="#icon-xiayiqu" class="icon-next"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="showPlayList">
              <use xlink:href="#icon-yinleliebiao-"></use>
            </svg>
          </div>
        </div>
      </div>
    </transition>
    <transition class="mini">
      <div class="micro-player" v-show="!fullScreen" @click="showNormalPlayer">
        <div class="album-img-mini">
          <img
            v-if="playList.length == 0"
            src="https://imgsrc.baidu.com/forum/pic/item/bba1cd11728b471035abf958c9cec3fdfd032399.jpg"
          />
          <img :src="currentSong.img" :class="rotate" v-else />
        </div>
        <div class="play-song-mini">
          <span
            class="song-name"
            v-html="playList.length ? currentSong.songName : '欢迎使用音乐云'"
          ></span>
          <span class="song-singer" v-html="currentSong.singer"></span>
        </div>
        <div class="play-icon-mini">
          <div class="icon-play" @click.stop="togglePlaying">
            <svg class="icon" aria-hidden="true" id="play">
              <use :xlink:href="`#${playIcon}`"></use>
            </svg>
          </div>
          <svg class="icon" aria-hidden="true" @click.stop="showPlayList">
            <use xlink:href="#icon-yinleliebiao-"></use>
          </svg>
        </div>
      </div>
    </transition>
    <play-list ref="playList"></play-list>
    <audio
      :src="currentSong.url"
      ref="audio"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PlayBar from "./PlayBar.vue";
import { playMode } from "../common/js/config";
import { shuffle, debounce } from "../common/js/util";
import Scroll from "./scroll/Scroll";
import PlayList from "./PlayList.vue";
export default {
  data() {
    return {
      songReady: false, // audio资源可用性标志位
      currentTime: 0, // 歌曲时间信息
      currentLyric: [], // 歌词信息
      showCdFlag: true, //显示cd动画还是歌词
      currentLineNum: 0, //当前高亮歌词索引
      openPlayList: false, // 显示当前播放列表
      autoScroll: true,
      touchEnd: null,
    };
  },
  components: {
    PlayBar,
    Scroll,
    PlayList,
  },
  watch: {
    // 监听currentSong
    currentSong(newSong, oldSong) {
      if (!newSong.id) {
        return;
      }
      if (newSong.id === oldSong.id) {
        return;
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        // 获取歌词信息
        this.currentSong.getLyric().then((res) => {
          this.currentLyric = res;
        });
      });
    },
    playingState(newPlaying) {
      const audio = this.$refs.audio;
      if (!newPlaying) {
        // 1、暂停播放
        audio.pause();
      } else {
        this.$nextTick(() => {
          audio.play();
        });
      }
    },
  },
  computed: {
    ...mapGetters([
      "playList",
      "fullScreen",
      "currentSong",
      "playingState",
      "currentIndex",
      "playMode",
      "sequenceList",
    ]),

    //
    // 计算得到播放进度，并传值给子组件
    progress() {
      return this.currentTime / (this.currentSong.duration / 1000);
    },
    IconMode() {
      if (this.playMode === playMode.sequence) {
        return "icon-xunhuan";
      } else if (this.playMode === playMode.loop) {
        return "icon-danquxunhuan";
      } else {
        return "icon-ziyuan";
      }
    },
    // 动态添加属性
    playIcon() {
      return this.playingState ? "icon-suspend" : "icon-bofang";
    },
    // 根据是否播放 动态添加旋转动画属性
    rotate() {
      return this.playingState ? "play" : "pause";
    },
  },
  methods: {
    showPlayList() {
      this.$refs.playList.show();
      console.log(1);
    },
    // 播放结束 切换到下一曲
    end() {
      if (this.playMode == playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    //实现单曲循环
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    // 改变播放模式
    changePlayMode() {
      const mode = (this.playMode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        // 随机播放 进行洗牌
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    // 更改列表后寻找当前播放歌曲索引
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    // 响应播放器进度条拖动
    progressChange(percent) {
      // 设置audio的当前播放时间
      this.$refs.audio.currentTime =
        (this.currentSong.duration / 1000) * percent;
      // 如果拖动时未播放，拖动完毕后播放
      if (!this.playingState) {
        this.togglePlaying();
      }
    },
    // 获取当前播放时间，主要思想：利用audio的派发函数实现，以得到时间戳形式的时间数据
    updateTime(e) {
      this.currentTime = e.target.currentTime;
      this.currentLyricLength = this.currentLyric.length;
      if (this.currentLyricLength == 0) {
        return;
      }
      /* 
      二分法查找对应歌词
      当改变currentTime时 去寻找所对应的currentNum 该currentNum所对应的currentLyric.time应满足条件
      this.currentLyric[i].time=<currentTime 且是最大的时间，想到去用二分法去寻找
      */
      let l = 0;
      let r = this.currentLyricLength - 1;
      while (l < r) {
        // middle表示索引
        let middle = 1 + Math.floor((l + r) / 2);
        if (this.currentLyric[middle].time > this.currentTime) {
          r = middle - 1; // middle取不到
        } else {
          l = middle;
        }
      }
      this.currentLineNum = l;
      // 不触发自动滚动
      if (this.autoScroll === false) {
        return;
      }
      /* 自动触发滚动到当前歌词的事件，当并没有自行滚动时 */
      if (this.currentLineNum > 5) {
        let lineEl = this.$refs.lyricLine[this.currentLineNum - 5];
        this.$refs.scroll.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.scroll.scrollTo(0, 0, 1000);
      }
    },
    // 时间戳转化
    formatSecond(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = interval % 60;
      return `${this._pad(minute)}:${this._pad(second)}`;
    },
    formatMSecond(interval) {
      interval = (interval / 1000) | 0;
      const minute = (interval / 60) | 0;
      const second = interval % 60;
      return `${this._pad(minute)}:${this._pad(second)}`;
    },
    // 该函数用于时间补零
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    error() {
      this.songReady = true;
      alert("播放错误");
      this.next();
    },
    ready() {
      this.songReady = true;
    },
    // 显示整个播放页面
    showNormalPlayer() {
      this.setFullScreen(true);
    },
    // 显示mini播放器
    closeNormalPlayer() {
      this.setFullScreen(false);
    },
    // 切换上一曲
    pre() {
      let index = this.currentIndex;
      if (index == 0) {
        index = this.playList.length - 1;
      }
      this.setCurrentIndex(index - 1);
      if (!this.playingState) {
        this.togglePlaying();
      }
    },
    // 切换下一曲
    next() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex;
      if (index == this.playList.length - 1) {
        index = 0;
      }
      this.setCurrentIndex(index + 1);
      if (!this.playingState) {
        this.togglePlaying();
      }
    },
    //歌曲播放与暂停切换
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      // 1、改变vuex中播放状态 2、监听状态的变化再改变播放器
      this.setPlayingState(!this.playingState);
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN", //将 setFullScreen映射为SET_PLAY_MODE
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayMode: "SET_PLAY_MODE",
      setPlayList: "SET_PLAY_LIST",
    }),
    touchMoveHandler() {
      if (this.touchEnd) {
        clearTimeout(this.touchEnd);
      }
      this.autoScroll = false;
      console.log("pressmove");
    },
    touchEndHandler() {
      this.touchEnd = setTimeout(() => {
        this.autoScroll = true;
      }, 2000);
    },
    // 长按图片封面 弹出图片页
    longTapHandler(args) {
      return () => {
        console.log(args);
      };
    },
    // 滑动处理
    swipeHandler(e) {
      let direction = e.direction
      console.log(direction)
      switch (direction) {
        case 'Left':{
          if(!this.showCdFlag) return
          this.pre()
          break
        }
        case 'Right': {
          if(!this.showCdFlag) return
          this.next()
          break
        }
      }
    },
  },
};
</script>

<style lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.player {
  .normal-player {
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: black;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      opacity: 0.7;
      transform: scale(2);
      filter: blur(10px);
    }
    .top {
      display: flex;
      position: absolute;
      top: 0;
      width: 100%;
      height: 52px;
      align-items: center;
      .back {
        flex: 1;
        font-size: 18px;
        padding-left: 20px;
      }
      .title {
        flex: 6;
        display: flex;
        flex-direction: column;
        .songName {
          font-size: 16px;
          height: 25px;
          line-height: 25px;
          color: #f1f1f1;
          white-space: nowrap;
          overflow: hidden;
        }
        .songAuthor {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          color: rgb(224, 98, 13);
        }
      }
    }
    .middle {
      height: 420px;
      width: 100%;
      top: 52px;
      position: absolute;
      .cd-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        height: 280px;
        width: 280px;
        .cd {
          border-radius: 50%;
          border: 20px solid black;
          // 动态添加旋转效果
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
          img {
            width: 240px;
            height: 240px;
            border-radius: 50%;
          }
        }
      }
      .show-lyric {
        position: absolute;
        height: 100%;
        left: 0;
        right: 0;
        color: rgba(255, 255, 255, 0.5);
        font-size: 16px;
        overflow: hidden;
        .wrapper {
          position: absolute;
          height: 100%;
          left: 0;
          right: 0;
        }
        ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          li {
            text-align: center;
            height: 36px;
            line-height: 18px;
            &.highlight {
              color: #f1f1f1;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      width: 100%;
      bottom: 0;
      top: 472px;
      .current-lyric {
        position: absolute;
        top: 10px;
        width: 100%;
        height: 30px;
        font-size: 18px;
        left: 50%;
        transform: translateX(-50%);
        color: #f1f1f1;
        text-align: center;
      }
      .progress-wrapper {
        position: absolute;
        top: 100px;
        right: 0;
        left: 0;
        font-size: 16px;
        color: #f1f1f1;
        display: flex;
        align-items: center;
        .time-l {
          flex: 1;
          text-align: center;
        }
        .time-r {
          flex: 1;
          text-align: center;
        }
        .progress-bar-wrapper {
          flex: 4;
        }
      }
      .icon-wrapper {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        height: 30px;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 10px;
        .icon {
          flex: 1;
        }
      }
    }
    /* &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    } */
  }
  .micro-player {
    position: fixed;
    bottom: 0;
    height: 70px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: white;
    .album-img-mini {
      flex: 1.2;
      padding-left: 2px;
      img {
        &.play {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }
    }
    .play-song-mini {
      padding: 10px;
      flex: 4;
      display: flex;
      flex-direction: column;
      .song-name {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        padding: 4px;
      }
      .song-singer {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        padding: 4px;
        color: #4e4b4b;
      }
    }
    .play-icon-mini {
      flex: 1.5;
      display: flex;
      justify-content: space-between;
    }
    .icon {
      font-size: 28px;
    }
  }
}
</style>
