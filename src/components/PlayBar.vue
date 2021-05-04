<template>
  <div class="progress-bar" ref="progressBar"  @click.prevent="clickResponse">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">
        <div
          class="progress-btn"
          ref="btn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend.prevent="progressTouchEnd"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 接收参数
    percent: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        let barWidth = this.$refs.progressBar.clientWidth;
        let offsetWidth = newPercent * barWidth;
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.btn.style.transform = `translateX(${offsetWidth}px)`;
      }
    },
  },
  created() {
    this.touch = {};
    this.click = {}
  },
  methods: {
    // 进度条拖动功能
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      // 进度条已经进行的值
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.btn.style.transform = `translateX(${offsetWidth}px)`;
    },
    progressTouchEnd(e) {
      this.touch.initiated = false;
/*       console.log(this.$refs.progress.style.width)
      let progressWidth = this.$refs.progress.style.width.replace('px','') */
      let percent =this.$refs.progress.clientWidth/this.$refs.progressBar.clientWidth
      this.$emit('progressChange',percent)
    },
    // 进度条点击功能
    clickResponse(e) {
      let x = e.offsetX
      let width = this.$refs.progressBar.clientWidth
      this.$refs.progress.style.width = `${x}px`;
      this.$refs.btn.style.transform = `translateX(${x}px)`;
      let percent = x/width
      this.$emit('click',percent)
    }
  },
};
</script>

<style lang="scss">
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 10px;
    height: 10px;
    width: 100%;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: #fff;
      border-radius: 10px;
    }
    .progress-btn {
      box-sizing: border-box;
      position: absolute;
      left: -10px;
      top: -5px;
      bottom: 0;
      height: 20px;
      width: 20px;
      border: 4px solid orange;
      border-radius: 50%;
      background: #fff;
    }
  }
}
</style>