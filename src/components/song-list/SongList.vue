<template>
  <div class="list">
    <ul>
      <li class="title" @click="selectAllItem(songs)">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <h3>播放全部</h3>
        <p>(共{{ songsTotalNum }}首)</p>
      </li>
      <li
        class="item"
        v-for="(song, index) in songs"
        :key="song.id"
        @click="selectItem(song, index)"
      >
        <div class="content-left">{{ index + 1 }}</div>
        <div class="content-right">
          <h2 class="song-name">{{ song.songName }}</h2>
          <div class="song-desc">
            <span>{{ song.singer + "-" + song.album }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songsTotalNum: {
      type: Number,
      default: 0,
    },
    songs: {
      type: Array,
      default: [],
    },
  },
  methods: {
    // 点击歌曲时向外触发事件，由父组件进行处理
    selectItem(song, index) {
      this.$emit("select", song, index);
    },
    selectAllItem(songs) {
      this.$emit("selectAll", songs);
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  position: absolute;
  .title {
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #f3f3f3;
    h3 {
      font-size: 19px;
      margin: 0 10px;
    }
    .icon {
      font-size: 18px;
      margin-left: 10px;
    }
    p {
      font-size: 14px;
      color: #bba8a8;
    }
  }
  .item {
    height: 60px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .content-left {
      display: flex;
      width: 60px;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .content-right {
      width: 315px;
      border-bottom: 2px solid wheat;
      display: flex;
      flex-direction: column;
      .song-name {
        font-size: 16px;
        margin-bottom: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
      }
      .song-desc {
        /* 长度太长时省略 可以用函数 */
        span {
          font-size: 12px;
          margin: 5px 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #bba8a8;
          display: block;
        }
      }
    }
  }
}
</style>