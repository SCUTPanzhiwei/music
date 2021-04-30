<template>
  <div class="home">
    <!-- 嵌套路由 -->
    <header>
      <my-nav class="nav"></my-nav>
      <div class="tab">
        <div>
          <span :class="{choose:this.hash==='/recommend'}"><a href="#/">推荐</a></span>
        </div>
        <div>
          <span :class="{choose:this.hash==='/singer'}"><a href="#/singer">歌手</a></span>
        </div>
        <div>
          <span :class="{choose:this.hash==='/rank'}"><a href="#/rank">排行榜</a></span>
        </div>
      </div>
    </header>
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MyNav from "../../components/MyNav.vue";

export default {
  name: "Home",
  components: {
    MyNav,
  },
  data(){
    return {
      hash:''
    }
  },
  mounted(){
    this._getHash()
  },
  updated(){
    this._getHash()
  },
  methods:{
    //this.$route
    _getHash(){
      this.hash = this.$route.path
      console.log(this.hash)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
.home {
  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
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
  .content {
    margin-top: 80px;
  }
  .choose {
    color: #f1f1f1;
    font-size: $fontF;
    text-decoration: underline;
    font-weight: bold;
  }
}
</style>
