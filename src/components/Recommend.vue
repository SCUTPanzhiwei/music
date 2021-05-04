<template>
  <div>
    <Scroll ref="scroll" class="wrapper" :data="recommendList">
      <div class="recommend">
        <div v-if="banners.length" class="banner">
          <Slider>
            <div v-for="item in banners" :key="item.bannerId">
              <img @load="loadImg" :src="item.pic" alt="" />
            </div>
          </Slider>
        </div>
        <div class="list-wrapper">
          <h1 class="title">推荐歌单</h1>
          <div class="recommend-list">
            <div
              class="recommend-item"
              v-for="item in recommendList"
              :key="item.id"
              @click="_jumpPage(item.id)"
            >
              <p class="recommend-flag">
                <svg aria-hidden="true" class="icon erji">
                  <use xlink:href="#icon-erji"></use>
                </svg>
                {{ item.playCount }}万
              </p>
              <img v-lazy="item.picUrl" alt="" />
              <div class="recommend-des">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="loading-container">
          <Loading v-show="!recommendList.length"></Loading>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Slider from "../components/slider/Slider";
import Scroll from "../components/scroll/Scroll";
import Loading from "../components/loading/Loading";
export default {
  name: "recommend",
  data() {
    return {
      // 轮播图数据
      banners: [],
      recommendList: [],
    };
  },
  created() {
    this._getRecommendBanner();
    this._getRecommendList();
  },
  mounted() {},
  methods: {
    // 拉取轮播图数据
    _getRecommendBanner() {
      this.axios.get("/banner?type=2").then((res) => {
        this.banners = res.banners.slice(0, 5);
      });
    },
    // 拉取歌单数据
    _getRecommendList() {
      this.axios.get("/personalized").then((res) => {
        this.recommendList = res.result.map((item) => {
          item.playCount = Math.floor(item.playCount / 10000);
          return item;
        });
      });
    },
    // 跳转至歌单详情页面
    _jumpPage(id) {
      this.$router.push({
        name: "recommendList",
        params: { id },
      });
    },
    loadImg() {
      // 设置标志位确保逻辑只执行一次
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    },
  },
  components: {
    Slider,
    Scroll,
    Loading,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 67px;
  width: 100%;
  overflow: hidden;
  .loading-container {
    position: absolute;
    top: 220px;
    width: 100%;
  }
  .recommend {
    .list-wrapper {
      h1 {
        height: 40px;
        line-height: 40px;
        color: #000;
        padding-left: 6px;
        font-size: 18px;
        font-weight: bold;
      }
      .recommend-list {
        display: flex;
        font-size: 12px;
        justify-content: space-between;
        // 运行折行
        flex-wrap: wrap;
        .recommend-item {
          position: relative;
          flex: 1 0 32%;
          margin: 2px;
          .recommend-flag {
            position: absolute;
            top: 0;
            right: 0;
            color: #f1f1f1;
            z-index: 2;
          }
          .recommend-des {
            height: 30px;
            margin: 5px 0;
          }
          img {
            border-radius: 2px;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>