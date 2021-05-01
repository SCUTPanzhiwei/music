<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <p class="desc">{{desc}}</p>
  </div>
</template>

<script>
export default {
  props:{
    desc:{
      type: String,
      default: '正在加载'
    }
  }
}
</script>

<style lang="scss">
  .loading {
    width: 100%;
    text-align: center;
    img {
      height: 30px;
      width: 30px;
    }
    .desc {
      line-height: 20px;
      font-size: 14px;
      color: rgb(133, 110, 110);
    }
  }

</style>