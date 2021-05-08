<template>
  <div class="singer-detail">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </div>
</template>

<script>
import { goToPage } from "../api/goToPage";
import Scroll from "../components/scroll/Scroll";
import { mapGetters, mapState } from "vuex";
import { createSong } from "../common/js/song";
import { Singer } from "../common/js/singer";
import MusicList from "../components/music-list/MusicList.vue";
export default {
  data() {
    return {
      songs: [], // 歌曲信息
      artist: {}, // 歌手信息
    };
  },
  computed: {
    title() {
      return this.artist.name;
    },
    bgImage() {
      return this.artist.pic;
    },
    //    // 存入vuex
    /*     ...mapMutations({
      setSinger: 'SET_SINGER' // 将this.setSinger映射为'this.$store.commit('SET_SINGER')'
    }) */
    // 读取vuex中状态值
    /*     singer: function (){
      return this.$store.state.singer
    } */
    // 相当于上面一种写法
    /* ...mapGetters(['singer']) */
  },
  components: {
    Scroll,
    MusicList,
  },
  created() {
    this._getSingerSong();
  },
  methods: {
    // 跳回歌手页
    _goToSingList(name, params, obj = this.$router) {
      goToPage(name, params, obj);
    },
    // 获取歌曲信息
    _getSingerSong() {
      let params = this.$route.params;
      this.axios
        .get("/artists", {
          params: params,
        })
        .then((res) => {
          this.artist = this._normalizeSinger(res.artist);
          this.songs = this._normalizeSongs(res.hotSongs);
        });
    },
    // 对歌曲数据进行处理，并返回 类型数组
    _normalizeSongs(hotSongs) {
      let ret = [];
      hotSongs.forEach((item) => {
        let musicData = { ...item };
        ret.push(createSong(musicData));
      });
      return ret;
    },
    // 对歌手数据进行处理,并返回一个对象
    _normalizeSinger(artist) {
      return new Singer({
        id: artist.id,
        name: artist.name,
        des: artist.briefDesc,
        pic: artist.picUrl,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .singer-detail {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>