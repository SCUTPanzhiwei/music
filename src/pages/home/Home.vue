<template>
  <div class="home">
    <!-- 嵌套路由 -->
    <header>
      <my-nav></my-nav>
      <div class="tab">
        <div class="choose"><span><a href="#/">推荐</a></span></div>
        <div class="choose"><span><a href="#/index/singer">歌手</a></span></div>
        <div class="choose"><span><a href="#/index/rank">排行榜</a></span></div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyNav from "../../components/MyNav.vue";

export default {
  name: "Home",
  components: {
    MyNav,
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/styles/config.scss';
  .home {
    header {
      background: $colorA;
      height: 100px;
      color: $colorK;
      .tab {
        display: flex;
        height: 22px;
        align-items: center;
        justify-content: space-around;
        a{
          color: $colorK;
          font-size: $fontJ;
        }
      }
    }
  }
</style>
