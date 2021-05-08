<template>
  <div>
    <Scroll class="rank">
      <div class="rank-wrapper">
        <h1 class="title">官方榜</h1>
        <ul class="rank-official">
          <li
            class="rank-list"
            v-for="item in officialRank"
            :key="item.id"
            @click="selectRankList(item.id)"
          >
            <div class="img-wrapper">
              <img :src="item.coverImgUrl" alt="" />
              <p class="rank-des">{{ item.updateFrequency }}</p>
            </div>
            <ul class="data-wrapper">
              <li v-for="(content, index) in item.tracks" :key="index">
                {{ `${index + 1}. ${content.first} - ${content.second}` }}
              </li>
            </ul>
          </li>
        </ul>
        <h1 class="title">精选榜</h1>
        <ul class="rank-choice">
          <li v-for="item in choiceRank" :key="item.id" @click="selectRankList(item.id)">
            <div class="wrapper">
              <img :src="item.coverImgUrl" alt="" />
              <p class="rank-des">{{ item.updateFrequency }}</p>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
import MusicList from "./music-list/MusicList.vue";
import Scroll from "./scroll/Scroll";
export default {
  data() {
    return {
      officialRank: [],
      choiceRank: [],
    };
  },
  components: {
    Scroll,
  },
  mounted() {
    this._getRankList();
  },
  methods: {
    _getRankList() {
      this.axios.get("/toplist/detail").then((res) => {
        this.officialRank = res.list.slice(0, 4);
        this.choiceRank = res.list.slice(4);
        console.log(res);
      });
    },
    selectRankList(id) {
      this.$router.push({
        name: "rankList",
        params: { id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.rank {
  position: fixed;
  top: 80px;
  bottom: 70px;
  left: 0;
  right: 0;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin: 5px;
    padding-left: 5px;
  }
  .rank-official {
    display: flex;
    flex-direction: column;
    height: 404px;
    .rank-list {
      border-bottom: 1px solid pink;
      display: flex;
      height: 100px;
      width: 100%;
      .img-wrapper {
        position: relative;
        width: 100px;
        padding: 5px;
        img {
          height: 100%;
          width: 100%;
          border-radius: 20px;
        }
        .rank-des {
          position: absolute;
          bottom: 15px;
          left: 15px;
          color: #f1f1f1;
        }
      }
      .data-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        li {
          flex: 1;
          height: 50%;
          overflow: hidden;
          &::before {
            display: inline-block;
            content: "";
            height: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .rank-choice {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: rgb(242, 243, 244);
    padding: 0 5px;
    &::after {
      content: "";
      display: block;
      width: 31%;
    }
    li {
      width: 31%;
      height: 120px;
      padding: 3px 0;
      .wrapper {
        box-sizing: border-box;
        position: relative;
        border-radius: 3px;
        border-bottom: 1px solid pink;
        img {
          width: 100%;
          height: 100%;
          border-radius: 3px;
        }
        .rank-des {
          position: absolute;
          bottom: 5px;
          left: 5px;
          color: #f1f1f1;
        }
      }
    }
  }
}
</style>