<template>
  <div class="search">
    <header class="search-header">
      <search-box ref="searchBox" @query="handleQuery"></search-box>
    </header>
    <Suggest :searchWords="searchWords" v-show="searchWords"></Suggest>
    <div class="hot-search">
      <h2 class="hot-search-title">热门搜索</h2>
      <ul class="hot-search-content">
        <li 
          class="item" 
          v-for="(item, index) in hotSearchList" 
          :key="index"
          @click="addQuery(item.first)"
        >
          {{ item.first }}
        </li>
      </ul>
    </div>
    <div class="search-history">
      <h2 class="search-history-title">
        搜索历史
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qingkong"></use>
        </svg>
      </h2>
      <ul class="search-history-content">
        <li class="item">
          <div>周杰伦</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shanchu-search"></use>
          </svg>
        </li>
        <li class="item">
          <div>周杰伦</div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shanchu-search"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import searchBox from '../components/search-box/search-box.vue';
import Suggest from '../components/Suggest';
const HOTSEARCHLIST = "/search/hot";

export default {
  components: { searchBox, Suggest },
  data() {
    return {
      hotSearchList: [],
      searchWords:''
    };
  },
  created() {
    this._getHotSearchList();
  },
  methods: {
    _getHotSearchList() {
      this.axios.get(HOTSEARCHLIST).then((res) => {
        this.hotSearchList = res.result.hots;
      });
    },
    // 关键词添加至search-box组件中
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    // 处理 emit得到搜索框内的value进行保存
    handleQuery(query){
      this.searchWords = query
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  top: 0;
  height: 0;
  left: 0;
  right: 0;

  .hot-search {
    margin-top: 20px;
    .hot-search-title {
      font-size: 18px;
      padding: 10px;
    }
    .hot-search-content {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        padding: 0 2px;
        border: 1px solid orangered;
        border-radius: 5px;
        margin: 5px 5px;
      }
    }
  }
  .search-history {
    .search-history-title {
      font-size: 18px;
      padding: 10px;
      overflow: hidden;
      .icon {
        float: right;
        margin-right: 5px;
      }
    }
    .search-history-content {
      font-size: 16px;
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        div {
          flex: 6;
          padding-left: 10px;
        }
        .icon {
          flex: 1;
        }
      }
    }
  }
}
</style>