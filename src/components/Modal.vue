<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="modal-log">
        <div class="modal-header">
          <span>{{ title }}</span>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType == '1'"
            @click="$emit('submit')"
            >{{ sureText }}</a
          >
          <a
            href="javascript:;"
            class="btn"
            v-else-if="btnType == '2'"
            @click="$emit('cancel')"
            >{{ cancelText }}</a
          >
          <div class="btn-group" v-else>
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{
              sureText
            }}</a>
            <a href="javascript:;" class="btn" @click="$emit('cancel')">{{
              cancelText
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    // 弹框类型： 小small、中middle、大large、表单form
    modalType: {
      type: String,
      default: "form",
    },
    // 弹框标题
    title: String,
    // 按钮类型 1、确定 2、取消 3、确定取消
    btnType: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/config.scss";
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  transition: all 0.5s;
  &.slide-enter-active {
    top: 0;
  }
  &.slide-leave-active {
    top: -100%;
  }
  &.slide-enter {
    top: 100%;
  }

  /* 弹框居中的方法 */
  .modal-log {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 100px;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    border-radius: 10px;
    background: #fff;
    .modal-header {
      height: 60px;
      padding: 0 10px;
      line-height: 60px;
      font-size: 16px;
      text-align: center;
    }
    .modal-body {
      height: 0px;
      font-size: 14px;
    }

    .modal-footer {
      height: 40px;
      line-height: 30px;
      text-align: center;
      .btn {
        font-size: 14px;
        color: #000;
        width: 40px;
        border: 1px solid #ff6600;
        border-radius: 10px;
      }
      .btn-group {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>