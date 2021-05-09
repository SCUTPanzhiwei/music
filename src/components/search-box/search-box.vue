<template>
  <div class="search-header">
    <svg class="icon" aria-hidden="true" @click="$router.back()">
      <use xlink:href="#icon-return"></use>
    </svg>
    <input type="text" :placeholder="placeholder" v-model="query"/>
    <svg class="icon" aria-hidden="true" @click="clear">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
</template>

<script>
export default {
  watch:{
    query(newQuery){
      this.query = newQuery
      this.$emit('query',newQuery)
    }
  },
  props: {
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手",
    },
  },
  data() {
    return {
      query: "",
    };
  },
  methods: {
    clear() {
      this.query = "";
    },
    setQuery(query) {
      this.query = query;
    },
  },
  created() {
    /* this.$watch('query',(newQuery)=>{
      this.$emit('query',newQuery)
    }) */
  },
};
</script>

<style lang="scss" scoped>
.search-header {
  background: #ff6600;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  .icon {
    font-size: 18px;
    flex: 1;
  }
  input {
    flex: 6;
    box-sizing: border-box;
    height: 30px;
    padding: 5px;
    font-size: 18px;
  }
}
</style>