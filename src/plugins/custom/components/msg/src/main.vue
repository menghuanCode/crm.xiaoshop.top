<template>
  <div class="msg">
    <transition type="transition" mode="out-in" @after-enter="afterEnter" @after-leave="afterLeave">
      <div class="msg-content" v-show="show">{{ title }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      show: false,
      resolve: "",
      reject: "",
      promise: "" // 保存promise对象
    };
  },
  methods: {
    // 弹出messageBox,并创建promise对象
    showMsgBox: function(title) {
      this.title = title;
      this.show = true;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });

      // 返回promise对象
      return this.promise;
    },
    destroy: function() {
      this.resolve();
      this.$destroy();
      document.body.removeChild(this.$el);
    },
    afterEnter: function() {
      setTimeout(() => {
        this.show = false;
      }, 2000);
      // ...
    },
    afterLeave: function() {
      this.destroy();
      // ...
    }
  }
};
</script>

<style lang="scss" scoped>
.msg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
  &-content {
    position: relative;
    padding: 12px 25px;
    text-align: center;
    line-height: 24px;
    word-break: break-all;
    overflow: hidden;
    font-size: 14px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
  }
}

.v-enter, .v-leave-to /* .v-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 0.5s;
  animation: bounce-in 0.5s;
}
.v-leave-active {
  transition: opacity 0.3s;
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.4);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
}
</style>