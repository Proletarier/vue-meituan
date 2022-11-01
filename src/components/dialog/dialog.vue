<template>
    <div id="DialogConversation">
        <div class="dialog-box">
            <p class="content">{{ content }}</p>
            <div class="btn-box">
                <div class="left-btn" @click="cancel">{{ left_buttton }}</div>
                <div class="right-btn" @click="ok">{{ right_buttton }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dialog',
    data() {
        return {
            content: '',
            left_buttton: '取消',
            right_buttton: '确定'
        }
    },
    methods: {
        cancel() {
            this.onCancel && this.onCancel()   
            this.$destroy(true)  
            this.$el.parentNode.removeChild(this.$el)  
        },
        ok() {
            this.onOk()  
            this.$destroy(true)  
            this.$el.parentNode.removeChild(this.$el)
        }
    }
}
</script>

<style lang='stylus' scoped>
  #DialogConversation
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    .dialog-box
      width: 300px;
      border-radius: 8px;
      background-color: #fff;
      position: absolute;
      top: 150px;
      left: 50%;
      transform: translateX(-50%);
      box-sizing: border-box;
      text-align: center
      .content
        padding: 25px
        border-bottom: 1px solid #e6e6e6
      .btn-box
        display: flex
        max-height: 224px
        overflow hidden
        .left-btn
          flex: 1 0 0
          align-items: center
          justify-content: center
          line-height: 44px
          font-size: 17px
          display: flex
        .right-btn
          color #ffaf00
          flex: 1 0 0
          align-items: center
          justify-content: center
          line-height: 44px
          font-size: 17px
          display: flex
          border-left: 1px solid #e6e6e6
</style>
