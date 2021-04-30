<template>
  <div class="header">
    <div class="wrapper">
      <div class="left">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-cehua"></use>
        </svg>
      </div>
      <div class="middle"><span>云音乐</span></div>
      <div class="right">
        <svg aria-hidden="true" class="icon">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-nav",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/config.scss";
.header {
  .wrapper {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: $fontG;
    padding: 0 20px;
  }
  .icon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    justify-content: space-between;
  }
  .left {
    flex: 1;
  }
  .middle {
    flex: 4;
    text-align: center;
  }
  .right {
    flex: 1;
    svg {
      float: right;
    }
  }
}
</style>