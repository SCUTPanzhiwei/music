<template>
  <div class="search">
    <header class="search-header">
      <search-box ref="searchBox" @query="handleQuery"></search-box>
    </header>
    <Suggest
      :searchWords="searchWords"
      v-show="searchWords"
      @select="handleSelect"
    ></Suggest>
    <Scroll :data="shortcut" class="wrapper">
    <div>
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
      <div class="search-history" v-show="searchHistory.length">
        <h2 class="search-history-title">
          搜索历史
          <svg class="icon" aria-hidden="true" @click="deleteAllSearchHistory">
            <use xlink:href="#icon-qingkong"></use>
          </svg>
        </h2>
        <ul class="search-history-content">
          <li class="item" v-for="(item, index) in searchHistory" :key="index">
            <div @click.stop="addQuery(item)">{{ item }}</div>
            <svg class="icon" aria-hidden="true" @click.stop="deleteOne(item)">
              <use xlink:href="#icon-shanchu-search"></use>
            </svg>
          </li>
        </ul>
      </div>
    </div>
    </Scroll>
    <modal
      title="是否删除所有搜索记录"
      :showModal="showModal"
      @submit="submit"
      @cancel="cancel"
    ></modal>
  </div>
</template>

<script>
import searchBox from "../components/search-box/search-box.vue";
import Suggest from "../components/Suggest";
import { mapActions, mapGetters } from "vuex";
import Modal from "../components/Modal.vue";
import Scroll from '../components/scroll/Scroll.vue';
const HOTSEARCHLIST = "/search/hot";

export default {
  components: { searchBox, Suggest, Modal, Scroll },
  computed: {
    // computed结合 mapGettters 实现动态渲染
    ...mapGetters({
      searchHistory: "searchHistory",
    }),
    shortcut(){
      return this.hotSearchList.concat(this.searchHistory)
    }
  },
  data() {
    return {
      hotSearchList: [],
      searchWords: "",
      showModal: false,
    };
  },
  created() {
    this._getHotSearchList();
  },
  methods: {
    // action saveSearchHistory
    ...mapActions({
      saveHistory: "saveSearchHistory",
      deleteOneHistory: "deleteSearchHistory",
      deleteAllHistory: "deleteAllSearchHistory",
    }),
    // 用于保存搜索历史记录
    handleSelect() {
      this.saveHistory(this.searchWords);
    },
    // 向后台请求热门搜索
    _getHotSearchList() {
      this.axios.get(HOTSEARCHLIST).then((res) => {
        this.hotSearchList = res.result.hots;
      });
    },
    // 关键词添加至search-box组件中
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    // 处理 emit得到搜索框内的value进行保存
    handleQuery(query) {
      this.searchWords = query;
    },
    // 删除某条搜索记录
    deleteOne(item) {
      this.deleteOneHistory(item);
    },
    // 删除所有搜索记录
    deleteAllSearchHistory() {
      this.showModal = true;
    },
    submit() {
      this.deleteAllHistory();
      this.showModal = false;
    },
    cancel() {
      this.showModal = false;
    },
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
  .search-header{
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
  }
  .wrapper {
    position: absolute;
    top: 48px;
    height: 540px;
    z-index: 3;
  }
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
        border: 1px solid #ff6600;
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