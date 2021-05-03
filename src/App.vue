<template>
  <div id="app">
    <router-view></router-view>
    <Player></Player>
  </div>
</template>
<script>
import Player from "./components/Player";
export default {
  components: {
    Player,
  },
};
</script>

<style lang="scss">
.icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  justify-content: space-between;
}
</style>
