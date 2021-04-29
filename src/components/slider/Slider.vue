<template>
  <div class="slider" ref="slider">
    <!-- 显示层 -->
    <div class="slider-group" ref="sliderGroup">
      <!-- 所有图片包裹层 -->
      <slot></slot>
      <!-- 插槽显示图片内容 -->
    </div>
    <div class="dots">
      <!-- 提示圆点 -->
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import {addClass} from '../../common/js/dom.js'
export default {
  // 设计一个轮播图组件 要知道该组件外部能对其进行定制化改变的东西
  props: {
    loop: {
      type: Boolean, //是否循环
      default: true
    },
    autoPlay: {
      type:Boolean,
      default: true
    },
    // 间隔事件
    interval: {
      type: Number,
      default: 4000   
    }
  },
  mounted(){
    setTimeout(()=>{
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if(this.autoPlay){
        this._play()
      }
    },20),
    window.addEventListener('resize',()=>{
      if(!this.slider){
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  data(){
    return {
      dots:[],
      currentPageIndex: 0
    }
  },
  methods:{
    // 设置横向滚动的宽度为多少，即滑动一次滚动一张图片的宽度（视口）
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      // width为所有图片wrapper的宽度，即图片包裹层的宽度
      let width = 0
      // 视口的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      for(let i=0;i<this.children.length;i++){
        // 
        let child = this.children[i]
        addClass(child,'slider-item')
        // 给child即图片wrapper设置宽度
        child.style.width = sliderWidth+'px'
        width += sliderWidth
      }
      if(this.loop&&!isResize){
        width+=2*sliderWidth
      }
      this.$refs.sliderGroup.style.width = width+'px'
    },
    //初始化Slider
    _initSlider(){
      this.slider = new BScroll(this.$refs.slider,{
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
      })
      this.slider.on('scrollEnd',()=>{
        let pageIndex = this.slider.getCurrentPage().pageX
        if(this.loop){
          pageIndex -=1
        }
        this.currentPageIndex = pageIndex
        if(this.autoPlay){
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    // 
    _initDots(){
      this.dots = new Array(this.children.length)
    },
    _play(){
      let pageIndex = this.currentPageIndex +1
      if(this.loop){
        pageIndex +=1
      }
      this.timer = setTimeout(()=>{
        this.slider.goToPage(pageIndex,0,400)
      },this.interval)
    }
  }
};
</script>

<style lang="scss">
.slider {
  min-height: 1px;
  .slider-group {
    position: relative; // 相对定位
    overflow: hidden; // 超出元素隐藏
    white-space: nowrap; //
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
    left: 0;
    right: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: white;
      &:active{
        background-color: red;
        width: 20px;
        border-radius: 5px;
      }
    }
  }
}
</style>