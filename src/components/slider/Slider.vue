<template>
  <div>
    <div class="slider" ref="slider">
      <!-- 显示层 -->
      <div class="slider-group" ref="sliderGroup">
        <!-- 所有图片包裹层 -->
        <slot></slot>
        <!-- 插槽显示图片内容 -->
      </div>
      <div class="dots">
        <!-- 提示圆点 -->
        <span
          class="dot"
          v-for="(item, index) in dots"
          :key="index"
          :class="{ active: currentPageIndex === index }"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { addClass } from "../../common/js/dom.js";
export default {
  // 设计一个轮播图组件 要知道该组件外部能对其进行定制化改变的东西
  props: {
    loop: {
      type: Boolean, //是否循环
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    // 间隔时间
    interval: {
      type: Number,
      default: 4000,
    },
  },
  mounted() {
    // 成功渲染需要延时
    this.$nextTick(() => {
      // 计算并设置宽度  最外层容器与内部group
      this._setSliderWidth();
      // 初始化小圆点
      this._initDots();
      // 初始化slider
      this._initSlider();
      // 如果设置了自动播放
      if (this.autoPlay) {
        // 设置自动播放
        this._play();
      }
    }),
      window.addEventListener("resize", () => {
        if (!this.slider) {
          return;
        }
        this._setSliderWidth(true);
        this.slider.refresh();
      });
  },
  data() {
    return {
      // dots
      dots: [],
      // 表示目前在第几个轮播图
      currentPageIndex: 0,
    };
  },
  methods: {
    // 设置横向滚动的宽度为多少，即滑动一次滚动一张图片的宽度（视口）
    _setSliderWidth(isResize) {
      // 所有需要轮播的元素
      this.children = this.$refs.sliderGroup.children;
      // width为所有图片wrapper的宽度，即图片包裹层的宽度
      let width = 0;
      // 视口的宽度
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        //
        let child = this.children[i];
        addClass(child, "slider-item");
        // 给child即图片wrapper设置宽度
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    //初始化Slider
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 横轴
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400,
        },
      });
      // 监听一次滑动是否完成
      this.slider.on("scrollEnd", () => {
        // 第几个子元素
        let pageIndex = this.slider.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;
        // 如果设置了自动播放
        if (this.autoPlay) {
          //先清空定时器
          clearTimeout(this.timer);
          // 再自动播放
          this._play();
        }
      });
    },
    //初始化小圆点
    _initDots() {
      // 长度与实际需要轮播的元素个数相同
      this.dots = new Array(this.children.length);
    },
    // 初始化播放
    _play() {
      this.timer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  position: relative;
  overflow: hidden;     // 超出元素隐藏
  .slider-group {
    white-space: nowrap; //横向滚动保证wrapper不换行
    .slider-item {
      float: left; // 全部浮动
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: red;
      &.active {
        background-color: white;
        width: 20px;
        border-radius: 5px;
      }
    }
  }
}
</style>