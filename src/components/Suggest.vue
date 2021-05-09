<template>
  <div class="suggest">
    <div v-show="artists.length" class="suggest-list">
      <h2 class="title">相关歌手</h2>
      <div
        class="suggest-item"
        v-for="item in artists"
        :key="item.id"
        @click="goToSingerPage(item.id)"
      >
        <div class="img-wrapper">
          <img :src="item.picUrl" alt="" />
        </div>
        <p class="name">歌手:{{ item.name }}</p>
      </div>
    </div>
    <ul class="suggest-list" v-show="playlists.length">
      <h2 class="title">相关歌单</h2>
      <li
        class="suggest-item"
        v-for="item in playlists"
        :key="item.id"
        @click="goToRecommendPage(item.id)"
      >
        <div class="img-wrapper">
          <img :src="item.coverImgUrl" alt="" />
        </div>
        <p class="name">歌单:{{ item.name }}</p>
      </li>
    </ul>
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in songs" :key="item.id" @click="addToPlayList(item)">
        <div class="name">
          <p class="text-name">{{ item.songName }}</p>
          <p class="text-author">{{ item.singer }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
const SEARCH = "/search/suggest";
const SINGERDETAIL = "/singer/singerDetail/";
const RECOMMENDLIST = "/recommend/recommendList/";
import { createSong } from "../common/js/song";
import {mapActions} from 'vuex'
export default {
  props: {
    // 依赖于检索词
    searchWords: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      playlists: [], //歌单
      songs: [], // 歌曲
      artists: [], //歌手
    };
  },
  watch: {
    searchWords(newQuery) {
      if (newQuery.length > 0) {
        this.search();
      }
    },
  },
  methods: {
    search() {
      this.axios.get(`${SEARCH}?keywords=${this.searchWords}`).then((res) => {
        this.artists = res.result.artists ? res.result.artists : [];
        this.playlists = res.result.playlists ? res.result.playlists : [];
        this.songs = res.result.songs ? res.result.songs : [];
        if (this.songs.length > 0) {
          this.songs = this._normalizeSongs(this.songs);
        }
      });
      
    },
    _normalizeSongs(songs) {
      let ret = [];
      songs.forEach((item) => {
        let musicData = { ...item };
        ret.push(createSong(musicData));
      });
      return ret;
    },

    // 前往歌手页面
    goToSingerPage(id) {
      this.$router.push(`${SINGERDETAIL}${id}`);
    },
    goToRecommendPage(id) {
      this.$router.push(`${RECOMMENDLIST}${id}`)
    },
    addToPlayList(song) {
      this.addPlay({song: song});
    },
    ...mapActions(["addPlay"]),
  },
};
</script>

<style lang="scss" scoped>
.suggest {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background: #fff;
  .title {
    font-size: 18px;
  }
  .suggest-list {
    display: flex;
    flex-direction: column;
    .suggest-item {
      margin-top: 5px;
      display: flex;
      height: 50px;
      width: 100%;
      border-bottom: 1px solid pink;
      .img-wrapper {
        width: 50px;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .name {
        margin-left: 5px;
        flex: 1;
        line-height: 50px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .text-name {
          font-size: 16px;
          line-height: 30px;
          overflow: hidden;
        }
        .text-author {
          font-size: 14px;
          line-height: 20px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>