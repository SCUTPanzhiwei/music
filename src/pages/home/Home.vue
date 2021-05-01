<template>
  <div class="home">
    <!-- 嵌套路由 -->
    <!-- 头部由导航与tab两部分组成 -->
    <header>
      <my-nav></my-nav>
      <div class="tab">
        <div>
          <span :class="{ choose: this.hash === '/recommend' }"
            ><a href="#/">推荐</a></span
          >
        </div>
        <div>
          <span :class="{ choose: this.hash === '/singer' }"
            ><a href="#/singer">歌手</a></span
          >
        </div>
        <div>
          <span :class="{ choose: this.hash === '/rank' }"
            ><a href="#/rank">排行榜</a></span
          >
        </div>
      </div>
    </header>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import MyNav from '../../components/MyNav'
export default {
  name: 'Home',
  components: {
    MyNav,
  },
  data() {
    return {
      hash: "",
    };
  },
  mounted() {
    this._getHash();
  },
  updated() {
    this._getHash();
  },
  methods: {
    //this.$route
    _getHash() {
      this.hash = this.$route.path;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
.home {
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: $colorA;
    height: 80px;
    color: $colorK;
    .tab {
      display: flex;
      height: 22px;
      align-items: center;
      justify-content: space-around;
      a {
        color: $colorK;
        font-size: $fontJ;
      }
    }
  }
  .choose {
    color: #f1f1f1;
    font-size: $fontF;
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>