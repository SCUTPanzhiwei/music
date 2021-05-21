<template>
  <div class="no-result">
    <p class="no-result-text">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.no-result {
  text-align: center;
  .no-result-text {
    margin-top: 30px;
    font-size: 16px;
    color: pink;
  }
}
</style>