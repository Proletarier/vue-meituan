<template>
      <transition name="message-fade">
        <div :class="['message','message-' + type,center ? 'is-center' : '']" :style="{top: offset + 'px'}"
            v-if="!closed">
            <p class="message-content">{{message}}</p>
            <i class="icon icon-close"></i>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      message: '',
      type: 'success',
      center: true,
      offset: 160,
      closed: false,
      duration: 1000,
      timer: 2000,
      onClose: null // 扩充一个功能 弹框消失后触发
    };
  },
  mounted() {
    this.timer = setTimeout(() => {
      if (!this.closed) {
        this.close();
      }
    }, this.duration);
  },
  methods: {
    close() {
      this.closed = true;
      // 当弹框消失时会调用this.onClose()该函数方法
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  }
}
</script>

<style lang="stylus">
.message {
    min-width: 300px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    position: fixed;
    left: 50%;
    top: 20px;
    z-index: 999999999;
    transform: translateX(-50%);
    background-color: #edf2fc;
    transition: opacity .3s, transform .4s, top .4s;
    overflow: hidden;
    padding: 10px 15px 10px 20px;
    display: flex;
    align-items: center
    opacity .7
}

.message.is-center {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center
}

.message p {
    margin: 0
}

.message-info .message-content {
    color: #909399
}

.message-success {
    background-color: #000000;
    border-color: #e1f3d8
}

.message-success .message-content {
    color: #fff
}

.message-warning {
    background-color: #000000;
    border-color: #faecd8
}

.message-warning .message-content {
    color: #E6A23C
}

.message-error {
    background-color: #000000;
    border-color: #fde2e2
}

.message-error .message-content {
    color: #fff
}

.message-content {
    padding: 0;
    font-size: 16px;
    line-height: 1
}

.message-content:focus {
    outline-width: 0
}

.message .icon-close {
    position: absolute;
    top: 50%;
    right: 15px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: pointer;
    color: #C0C4CC;
    font-size: 16px
}

.message .icon-close:focus {
    outline-width: 0
}

.message .icon-close:hover {
    color: #909399
}

.message-fade-enter, .message-fade-leave-active {
    opacity: 0;
    transform: translate(-50%, -100%)
}
</style>
