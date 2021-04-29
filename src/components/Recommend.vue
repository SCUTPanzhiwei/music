<template>
  <div class="recommend">
    <div class="swiper">
      <div v-if="recommends.length">
        <Slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.url"></a>
            <img :src="item.picUrl" alt="">
          </div>
        </Slider>
      </div>      
    </div>
    <div class="list-wrapper">
      <h1 class="title">推荐歌单</h1>
      <div class="list"></div>
    </div>
  </div>
</template>

<script>
import Slider from '../components/slider/Slider'
export default {
  name:'recommend',
  data(){
    return {
      recommends:[]
    }
  },
  mounted(){
    this._getRecommendBanner()
  },
  methods:{
    // 拉取推荐图
    _getRecommendBanner(){

    }
  },
  components:{
    Slider
  },
}
</script>

<style>

</style>