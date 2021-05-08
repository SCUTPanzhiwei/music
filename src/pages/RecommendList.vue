<template>
  <transition class="recommendList">
  <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from '../components/music-list/MusicList'
import { createSong } from "../common/js/song";
export default {
  components: { MusicList },
  data(){
    return {
      songs:[],
      bgImage: '',
      title: '',
    }
  },
  computed: {

  },
  created(){
    this._getSingerSong()
  },
  methods:{
    // 获取歌曲数据
    _getSingerSong() {
      let params = this.$route.params;
      this.axios
        .get("/playlist/detail", {
          params:params
        })
        .then((res) => {
          this.bgImage = res.playlist.coverImgUrl
          this.title = res.playlist.name
          this.songs= this._normalizeSongs(res.playlist.tracks)
          console.log(this.songs)         
        });
      
    },
    // 对歌曲数据进行处理，并返回 类型数组
    _normalizeSongs(recommendSongs) {
      let ret = [];
      recommendSongs.forEach((item) => {
        let musicData = { ...item };
        ret.push(createSong(musicData));
      });
      return ret;
    },
  }
}
</script>

<style lang="scss" scoped>
.recommendList {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
  .slide-enter-active, .slider-leave-active {
    transition: all 0.3s;
  }
  .slide-enter, .slider-leave-to {
    transform: translate3d(100%,0,0)
  }
</style>