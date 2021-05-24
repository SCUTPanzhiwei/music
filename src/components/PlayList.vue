<template>
  <div class="play-list" v-show="showFlag" @click="hide">
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
        <h1 class="title">
          <svg class="icon" aria-hidden="true" @click.stop="changePlayMode">
            <use :xlink:href="`#${IconMode}`"></use>
          </svg>
          <span class="text">{{ModeDes}}</span>
          <span class="clear" @click.stop="showModal">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qingkong"></use>
            </svg>
          </span>
        </h1>
      </div>
      <Scroll class="list-content" :data="sequenceList" ref="listContent">
        <ul>
          <li
            ref="listItem"
            class="item"
            v-for="(item, index) in sequenceList"
            :key="item.id"
            @click="playSong(item, index)"
          >
            <i class="current">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="currentPlaySong(item)"></use>
              </svg>
            </i>
            <span class="text">{{ `${item.songName}-${item.singer}` }}</span>
            <span class="like">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shoucang"></use>
              </svg>
            </span>
            <span class="delete" @click.stop="deleteOne(item)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shanchu-search"></use>
              </svg>
            </span>
          </li>
        </ul>
      </Scroll>
      <Modal
        title="是否清空播放列表"
        :showModal="modal"
        @cancel="cancelClear"
        @submit="clear"
      ></Modal>
      <div class="list-operate">
        <div class="add">
          <span @click="gotoSearch">搜索音乐</span>
        </div>
      </div>
      <div class="list-close" @click="hide">
        <span>关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { playMode } from "../common/js/config";
import Modal from "./Modal.vue";
import Scroll from "./scroll/Scroll.vue";
export default {
  components: { Scroll, Modal },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return;
      }
      this.scrollToCurrent(newSong);
    },
  },
  computed: {
    ...mapGetters(["sequenceList", "currentSong", "playList", "playMode"]),
    IconMode() {
      if (this.playMode === playMode.sequence) {
        return "icon-xunhuan";
      } else if (this.playMode === playMode.loop) {
        return "icon-danquxunhuan";
      } else {
        return "icon-ziyuan";
      }
    },
    // 播放模式
    ModeDes() {
      if (this.playMode === playMode.sequence) {
        return "顺序播放";
      } else if (this.playMode === playMode.loop) {
        return "单曲循环";
      } else {
        return "随机播放";
      }
    },
  },
  data() {
    return {
      showFlag: false,
      modal: false,
    };
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setPlayingMode: "SET_PLAY_MODE",
    }),
    ...mapActions(["deleteSong", "deletePlayList"]),
    changePlayMode() {
      if (this.playMode === playMode.sequence) {
        this.setPlayingMode(playMode.loop)
      } else if (this.playMode === playMode.loop) {
        this.setPlayingMode(playMode.random)
      } else {
        this.setPlayingMode(playMode.sequence)
      }
    },
    showModal() {
      this.modal = true;
    },
    cancelClear() {
      this.modal = false;
    },
    clear() {
      this.deletePlayList();
      this.hide();
    },
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20);
    },
    hide() {
      this.showFlag = false;
    },
    currentPlaySong(item) {
      if (this.currentSong.id == item.id) {
        return "#icon-zhengzaibofang";
      }
      return "";
    },
    // 播放当前所点击的歌曲
    playSong(item, index) {
      if (this.playMode == playMode.random) {
        index = this.playList.findIndex((song) => {
          return song.id === item.id;
        });
      }
      this.setCurrentIndex(index), this.setPlayingState(true);
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id;
      });
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
    },
    // 从播放列表中删除歌曲
    deleteOne(song) {
      this.deleteSong(song);
      if (!this.playList.length) {
        this.hide();
      }
    },
    //
    gotoSearch() {
      if(this.$route.path!=='/search'){
        this.$router.push('/search')
      }      
      this.hide()
    }
  },
};
</script>

<style lang="scss" scoped>
.play-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: 0.3;
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: white;
    opacity: 1;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          font-size: 18px;
        }
        .text {
          flex: 1;
          font-size: 16px;
        }
        .clear {
          .icon {
            font-size: 16px;
          }
        }
      }
    }
    .list-content {
      max-height: 300px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: 12px;
        }
        .text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: black;
        }
        .like {
          margin-right: 15px;
          font-size: 16px;
        }
        .delete {
          font-size: 16px;
        }
      }
    }
    .list-operate {
      text-align: center;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      .add {
        span {
          border: 2px solid pink;
          border-radius: 10px;
        }
      }
    }
    .list-close {
      text-align: center;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
      background-color: brown;
    }
  }
}
</style>