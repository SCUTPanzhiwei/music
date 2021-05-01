<template>
  <div class="singer-detail">
    <header class="header">
      <div  @click="_goToSingList('singer', {})">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-return"></use>
        </svg>
      </div>
      <span>{{ artistName }}</span>
    </header>
    <div class="img">
<!--       <div class="filter"></div> -->
      <img :src="artistImg" alt="" />
    </div>
    <div class="save">+ 收藏</div>
    <Scroll class="list" :data="songs">
      <div class="wrapper">
        <div class="title">
          <svg aria-hidden="true" class="icon">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <h3>播放全部</h3>
          <p>(共{{ songsTotalNum }}首)</p>
        </div>
        <ul class="song">
          <li
            class="song-information"
            v-for="(song, index) in songs"
            :key="song.id"
          >
            <div class="left">{{ index + 1 }}</div>
            <div class="right">
              <div class="song-name">{{ song.name }}</div>
              <div class="song-author">
                {{ `${artistName}-${song.al.name}` }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
    <ul></ul>
  </div>
</template>

<script>
import { goToPage } from "../api/goToPage";
import Scroll from "../components/scroll/Scroll";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      songs: [],
      artistName: "",
      artistImg: "",
    };
  },
  computed: {
    songsTotalNum: function () {
      return this.songs.length;
    },
    ...mapGetters([
      'singer' 
    ])
  },
  components: {
    Scroll,
  },
  created() {
    this._getSingerSong();
  },
  mounted() {

  },
  methods: {
    // 跳回歌手页
    _goToSingList(name, params, obj = this.$router) {
      console.log("1");
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
          this.artistName = res.artist.name;
          this.artistImg = res.artist.picUrl;
          this.songs = res.hotSongs;
        });
    },
    /* // 拉取详情描述
    _getSingerInformation() {
      let params = this.$route.params;
      this.axios
        .get("/artist/detail", {
          params: params,
        })
        .then((res) => {
          this.artistName = res.name;
          this.artistImg = res.cover;
        });
    }, */
  },
};
</script>

<style lang="scss" scoped>
// 不占空间
.singer-detail {
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #e4b9b9;
    .icon {
      padding: 10px;
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
  .img {
    width: 100%;
    height: 281px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .save {
    position: fixed;
    top: 230px;
    left: 50%;
    transform: translateX(-50%);
    height: 40px;
    width: 100px;
    background: #d44439;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    font-size: 16px;
    color: #f1f1f1;
  }
  .list {
    position: absolute;
    width: 100%;
    height: 386px;
    overflow: hidden; // 对于超出范围内容隐藏，也是需要进行滚动的部分
    background: #fff;
    .title {
      display: flex;
      align-items: center;
      height: 48px;
      font-size: 18px;
      border-bottom: 1px solid #f3f3f3;
      h3 {
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
    .song {
      .song-information {
        height: 60px;
        display: flex;
        align-items: center;
        .left {
          display: flex;
          width: 60px;
          height: 60px;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        .right {
          width: 315px;
          border-bottom: 1px solid wheat;
          display: flex;
          flex-direction: column;
          .song-name {
            font-size: 16px;
            margin-bottom: 5px;
          }
          .song-author {
            font-size: 12px;
            margin-bottom: 5px;
            color: #bba8a8;
          }
        }
      }
    }
  }
}
</style>