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
      message: '', // 弹框的提示内容
      type: 'success', // 弹框的样式 success、warning、error
      center: true, // 弹框是否居中显示
      offset: 20, // 弹框默认的偏移量
      closed: true, // 弹框默认隐藏 通过v-if="!closed"控制
      duration: 1000, // 弹框消失的时间
      timer: null // 准备一个定时器
    };
  },
  mounted() {
    this.timer = setTimeout(() => {
    // 在规定的this.duration后该消息弹框消失
      if (!this.closed) {
        this.close();
      }
    }, this.duration);
  },
  methods: {
    close() {
      this.closed = true;
    }
  }
}
</script>

<style lang="stylus">
.message {
    min-width: 380px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: #EBEEF5;
    position: fixed;
    left: 50%;
    top: 20px;
    z-index: 999999999;
    transform: translateX(-50%);
    background-color: #edf2fc;
    transition: opacity .3s, transform .4s, top .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center
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
    background-color: #f0f9eb;
    border-color: #e1f3d8
}

.message-success .message-content {
    color: #67C23A
}

.message-warning {
    background-color: #fdf6ec;
    border-color: #faecd8
}

.message-warning .message-content {
    color: #E6A23C
}

.message-error {
    background-color: #fef0f0;
    border-color: #fde2e2
}

.message-error .message-content {
    color: #F56C6C
}

.message-content {
    padding: 0;
    font-size: 14px;
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
