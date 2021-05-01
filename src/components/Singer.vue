<template>
  <div class="singer">
    <div class="label">
      <div class="category">
        <button
          v-for="(item, index) in sex"
          :key="index"
          @click="_changeSex(index)"
          :class="{ checked: index == clickStatus.type }"
        >
          {{ item }}
        </button>
      </div>
      <div class="category">
        <button
          v-for="(item, index) in area"
          :key="index"
          @click="_changeArea(index)"
          :class="{ checked: index == clickStatus.area }"
        >
          {{ item }}
        </button>
      </div>
      <Scroll :scrollX="true" :data="character" class="character">
        <div class="category" ref="allCharacter">
          <button
            :class="{ checked: index == clickStatus.initial }"
            v-for="(item, index) in character"
            :key="index"
            @click="_changeCharacter(index)"
          >
            {{ item }}
          </button>
        </div>
      </Scroll>
    </div>
    <Scroll class="singersList" :data="singers" ref="singersList">
      <ul class="list" ref="list">
        <li
          class="singer-list"
          v-for="singer in singers"
          :key="singer.id"
          @click="_goToPageDetail(singer,'singerDetail', { id: singer.id })"
        >
          <img v-lazy="`${singer.img1v1Url}?param=50y50`" alt="" />
          <span class="singer-name">{{ singer.name }}</span>
        </li>
      </ul>
    </Scroll>
    <div class="loading-container" v-show="!singers.length">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import Scroll from "./scroll/Scroll";
import Loading from "./loading/Loading";
import { goToPage } from "../api/goToPage";
import {mapMutations} from 'vuex'
export default {
  components: { Scroll, Loading },
  data() {
    return {
      character: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
      area: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      sex: ["全部", "男", "女", "乐队"],
      singers: [],
      params: {
        type: "-1", // 性别或乐队
        area: "-1", //
        initial: "-1",
      },
      clickStatus: {
        type: 0,
        area: 0,
        initial: 0,
      },
    };
  },
  // 监听singers变化，一旦singers数量发生变化则重新刷新scroll，从而重新计算高度,利用watch适用于异步操作
  watch: {
    singers: function () {
      this.$refs.list.style.height = this.singers.length * 63.5 + "px";
      this.$refs.singersList.refresh();
    },
    // 深度监听 params参数变化，当变化时重新拉取歌手数据
    params: {
      deep: true,
      handler: function () {
        this.axios
          .get("/artist/list", {
            params: this.params,
          })
          .then((res) => {
            this.singers = res.artists;
          });
      },
    },
  },
  created() {
    this._getSingerList();
  },
  mounted() {
    this._computedWidth();
  },

  methods: {
    // 拉取歌手信息
    _getSingerList() {
      this.axios
        .get("/artist/list", {
          params: this.params,
        })
        .then((res) => {
          this.singers = res.artists;
          console.log(this.$refs.list.style.height);
        });
    },
    // 该方法用于计算得到需要滚动的子容器的宽度
    _computedWidth() {
      this.$refs.allCharacter.style.width = this.character.length * 50 + "px";
    },
    // 改变地区 传的index
    _changeArea(area) {
      let area_cache = [-1, 7, 96, 8, 16, 0];
      this.params.area = area_cache[area];
      this.clickStatus.area = area;
    },
    // 改变性别 传的index
    _changeSex(sex) {
      let sex_cache = [-1, 1, 2, 3];
      this.params.type = sex_cache[sex];
      this.clickStatus.type = sex;
    },
    // 改变排序 A、B、C
    _changeCharacter(cha) {
      let cha_cache = [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      this.params.initial = cha_cache[cha];
      this.clickStatus.initial = cha;
    },
    // 去歌手详情页面
    _goToPageDetail(singer,name, params, obj = this.$router) {
      goToPage(name, params, obj);
      this.setSinger(singer)
    },
    // 存入vuex
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
};
</script>

<style lang="scss">
.singer {
  position: fixed;
  top: 80px;
  bottom: 0;
  width: 100%;
  .character {
    width: 100%;
    overflow: hidden;
  }
  .category {
    overflow: hidden;
    button {
      font-size: 12px;
      border-radius: 35%;
      width: 40px;
      height: 20px;
      line-height: 20 px;
      float: left;
      margin: 5px;
    }
    .checked {
      background: #ff6600;
      opacity: 0.6;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .singersList {
    // 父容器 其高度需要固定
    position: absolute;
    top: 100px;
    bottom: 0;
    height: 490px;
    width: 100%;
    overflow: hidden;
    // list为子容器 其高度计算应包括所有数据
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      .singer-list {
        height: 62.5px;
        border-bottom: 1px solid #f3f3f3;
        display: flex;
        align-items: center;
        img {
          margin: 0 10px 0 5px;
          float: left;
          width: 50px;
          height: 50px;
        }
        span {
          width: calc(100%-50px);
          line-height: 62.5px;
        }
      }
    }
  }
  .loading-container {
    width: 100%;
    position: absolute;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>