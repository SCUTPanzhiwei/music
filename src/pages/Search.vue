<template>
  <div class="search">
    <header class="search-header">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-return"></use>
      </svg>
      <input type="text" placeholder="搜索歌曲、歌手、专辑" />
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </header>
    <div class="hot-search">
      <h2>热门搜索</h2>
      
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  top: 0;
  height:0;
  left:0;
  right: 0;
  .search-header {
    background: #ff6600;
    height: 50px;
    display: flex;
    align-items: center;
    .icon {
      font-size: 16px;
      flex: 1;
    }
    input {
      flex: 6;
      box-sizing: border-box;
      height: 30px;
      padding: 5px;
    }
  }
}
</style>