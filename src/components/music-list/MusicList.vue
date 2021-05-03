<template>
  <div class="music-list">
    <header class="header" ref="header">
      <svg aria-hidden="true" class="icon" @click="back">
        <use xlink:href="#icon-return"></use>
      </svg>
      <h1 class="title">{{ title }}</h1>
    </header>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
      <div class="play-wrapper">
        <div class="play" v-show="songs.length > 0" ref="button">
          <i class="icon-play"></i>
          <span class="text">+ 收藏歌单</span>
        </div>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <Scroll
      @scroll="scroll"
      :probeType="probeType"
      :listenScroll="listenScroll"
      :data="songs"
      class="song-list"
      ref="list"
    >
      <song-list :songs="songs" :songsTotalNum="songsTotalNum" @select="selectItem"></song-list>
      <div class="loading-container" v-show="!songs.length">
        <Loading></Loading>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "../scroll/Scroll.vue";
import SongList from "../song-list/SongList.vue";
import { prefixStyle } from "../../common/js/dom";
import Loading from '../loading/Loading'
import {mapActions} from 'vuex'

const transform = prefixStyle(`transform`);
const backdrop = prefixStyle(`backdrop`);
export default {
  components: { Scroll, SongList, Loading },
  computed: {
    songsTotalNum() {
      return this.songs.length;
    },
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
  },
  data() {
    return {
      scrollY: 0,
    };
  },
  props: {
    // 背景图片
    bgImage: {
      type: String,
      default: "",
    },
    // 歌曲列表
    songs: {
      type: Array,
      default: [],
    },
    // 标题
    title: {
      type: String,
      default: "",
    },
  },
  // 向scroll组件传参数
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.headerHeight = this.$refs.header.clientHeight;
    this.minTranslateY = -this.imageHeight + this.headerHeight;
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  },
  methods: {
    // 处理子组件选中一首歌曲后的事件处理函数，对vuex中相关状态进行改变，并且传入参数
    selectItem(song,index) {
      this.selectPlay({
        list:this.songs,
        index:index 
      })
    },
    ...mapActions([
      'selectPlay'
    ]),
    
    // 监听滚动
    scroll(pos) {
      this.scrollY = pos.y;
    },
    // 路由后退
    back() {
      this.$router.back();
    },
  },
  watch: {
    scrollY(newY) {
      let translateY = Math.max(this.minTranslateY, newY);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      let opacity = 1;
      this.$refs.layer.style["transform"] = `translate3d(0,${translateY}px,0)`;
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`;
      const percent = Math.abs(newY / this.imageHeight);
      if (newY > 0) {
        scale = 1 + percent;
        zIndex = 10;
      } else {
        blur = Math.min(20 * percent, 20);
        opacity = 1 - percent;
      }
      this.$refs.filter.style["backdrop-filter"] = `blur(${blur}px)`;
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;

      if (newY < this.minTranslateY) {
        zIndex = 10;
        opacity = 0;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = this.headerHeight + "px";
      } else {
        zIndex = 0;
        this.$refs.bgImage.style.paddingTop = 70 + "%";
        this.$refs.bgImage.style.height = 0 + "px";
      }
      this.$refs.bgImage.style.zIndex = zIndex;
      this.$refs.bgImage.style["transform"] = `scale(${scale})`;
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
      this.$refs.button.style['opacity'] = `${opacity}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.music-list {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  .song-list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: white;
  }
  .header {
    position: absolute;
    display: flex;
    z-index: 99;
    top: 0;
    width: 100%;
    height: 45px;
    align-items: center;
    font-size: 16px;
    color: #e4b9b9;
    .icon {
      padding: 10px;
    }
    .title {
      font-size: 16px;
    }
  }
  .bg-image {
    //height 0 padding-top 70%控制其宽高比
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    background-size: cover;
    transform-origin: top;
    .play-wrapper {
      position: absolute;
      bottom: 10px;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: 135px;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        margin: 0 auto;
        text-align: center;
        background: #d44439;
        color: #f1f1f1;
        .text {
          font-size: 15px;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.3);
    }
  }
  .loading-container {
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>