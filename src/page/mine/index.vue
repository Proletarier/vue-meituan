<template>
 <div class="mine">
   <section class="user">
      <img class="face" :src="userInfo.face">
      <p class="user_name">{{userInfo.name}}</p>
   </section>
   <section class="profile">
     <div class="item coupon">
       <img src="data:image/png;base64,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" alt="">
       <span>美团红包</span>
     </div>
     <div class="item address"  @click="gotoAddress({path: 'mine/addresslist'})">
       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAA/dJREFUWAnFl1dLLEEQhWvXHHFNmEAFFwUDvqkY8LerIOKDICoKPiisCgbMCdP1K25dJnS3syrcA7M70111uqa6qrom9/EJKQNXV1dydHQk5+fn8vj4qBfqdXV1erW3t0tvb6+0tLSUwSqSy2pIqVSSra0tub29zbRAU1OTjI2NSV9fXyb5Lw25v7+XtbU1ubi4UML6+nrp6emR7u5uaWxslNraWh1/enqSu7s7OTk5kePjY3l4eNDxtrY2mZqakoaGhqBBQUPOzs5kdXVVnp+f1e2jo6MyMDAguVwuSMpuHxwcyPb2tm5dTU2NzMzMSEdHh1fPawhGLC0tyfv7u3qAt6qsrPQSuSZeX1/Vm3gon8/LwsKC15i8i4DtwBMYUSwWZXZ2tmwj4MVwdOGAC064XXAaQkywHcTC5OSkS6+sMTjgghNuF1KGkB0EJunIdvwW4IITbtZIImUIKQoIzHJjIkkefYYLTmBrxOajDxQr6gQpSnaEQEHb29uTy8tLFSsUCjI8PCwUNB/g3NnZ0TVYK1r0YmlAxQTsZyhFd3d39a2iRZkqSw2hiI2MjDhtgRPu/f19rc5eQ3hLQLHyARlcC+n4+Lj09/er6OHhoY4zh1d8noEbQ2wtWycWI7wVoGL6wHbgCd6craCycnHPGHPI+GDctpbJOQ2xsm1C0X+LCfNEdM7GTCY6Z/fGHTTEhP/Hf8wj5DngAPOB7ADERBI2ZjLJeZ6N29YyGachnKI+EAsEKkFJLEDMxb0FMTI+GHfSkFj6cjqenp5qGnZ1dTm5yAaCkkU3Nzf1MkEMZM6XMciR4iB5Esc8YmnLaRmtEaoZ+aFOLC4uak3gzbioD4z5agjqcMINbC19+PyJeYS9pbOiutJPDA4OmlzqP1QrUsJ/B+CkYWKNZBzFPII8rgWUYvqJ3wJccAJbI8qdMoQek/YOy31HdpQg6z1ccMLt6mNThkA8PT0ttHfsJ+3eTwEHXHDC7YLTEE5fFMgC0vL6+tqlm2kMXTjgghNuF5yGINjZ2SlDQ0Py9vYmy8vL3hbPRWpjtIXowgEXnD54DUFhYmJClTkXaKRp9bICWXTQxQC4QggaQudN89va2qrfLBC/vLyE+HQOGWSpoujCAVcI4dlPTVq8+fl5aW5uFrqqlZUVdbWPlG1ABll00M3Scn5pCAtWV1frNwmBRkPDZ4Gr8jLGHDLI8h2DbhZkMgQiyjjEpCDnxfr6eoqfMeaQQTZ5sKUUIgOZDUGH0oyrq6qqtA3Y2Nj4R8U9bQBzyCBbDryfnCESTmiLFVuQ86miokLm5uaCaerj/ZYhkPGhRNm2T0i+9vmIooR/B982xBa7ubnRWzLkJ/gDEgUXhWVjJt4AAAAASUVORK5CYII=" alt="">
       <span>收货地址</span>
     </div>
     <div class="item issue">
       <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAMAAAANmfvwAAAAqFBMVEX////AwMCsrKzR0dH9/f3z8/P7+/uqqqq3t7fp6emysrLY2Njk5OSurq7q6urr6+vS0tLT09O7u7u0tLTc3NzHx8ewsLCvr6/39/f09PT+/v6+vr7BwcHa2trMzMyrq6v8/Py9vb3b29vy8vLs7Ozt7e2tra3IyMje3t7f39/Z2dno6Ojw8PDi4uL5+fnW1tbu7u62tra4uLi6urrExMTFxcX4+PjCwsIj5podAAABLklEQVR42q1T146DMBCMATOmOCFASHLp13sv//9nJ+ExnHNIfsm+eFhGO1tHp7dJKJTWSoST4f9RlqKzNIv+M/IKUEUi41gmhQKq/JgxBcqk/0xKYOoyZghq11MHmLkxmvFx3HHzN06OwDIen+qHZ3IC5F0tFagiDwAw31ALla0rQ2nAYo5tnrxo3JrvEhkpKVjLDe5bhV3DupCyp1DkXqdn7fuOpXEomD6HKIxjCWHACq8GFAjbV1idSC7a91sHsVUSjCbdYf1gSyiZg0bsML5wsI4YeojyifV+1FHmA0IbiIiQQky3t4+dJGK6fdG0ffBGxKL71nXq2R0RW+cMwDFnABwj7WLFReIY3WVgYriy+BxVNLBSl2ptRsmV8i6mf739R+I/Nf/Bes/+5PYL3ngRMTQVsFAAAAAASUVORK5CYII=" alt="">
       <span>常见问题</span>
     </div>
     <div class="item explain">
       <img src="data:image/png;base64,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" alt="">
       <span>美团协议与说明</span>
     </div>
     <div class="item quit"  @click="logout()">
       <img src="//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/d09cbf82209a58ed499aab465b4d94f0.png" alt="">
       <span>退出登录</span>
     </div>
   </section>
   <section class="service">
     <p class="phone"><a href="tel:10109777">客服电话：10109777</a></p>
     <p class="time">服务时间: 9:00-23:00</p>
   </section>
   <footguide></footguide>
 </div>
</template>

<script>
import footguide from '../_components/footguide';
import { getStore } from '@/common/utils';

export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      const user = getStore('userInfo');
      this.userInfo = { ...JSON.parse(user) }
    },
    gotoAddress(path) {
      this.$router.push(path);
    },
    logout(){
       this.$store.dispatch('user/logout').then(() => {
        this.gotoAddress('/login')
      })
    }
  },
  components: {
    footguide
  }
};
</script>

<style lang="stylus">
  .mine
    background: rgb(240, 240, 240);
    height 100vh
    .user
      width 100%
      padding 10% 0 5%
      background url(http://s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/78890a8f1859bc10152151fc64aff5cc.png)
      background-size 100% 100%;
      .face
        width 20%
        min-height: 79px
        display block
        border-radius 100%
        border 3px solid #ffe699
        margin auto
      .user_name
        margin-top 8px
        font-size 16px
        text-align center
        color #333
    .profile
       background #fff
       .item
          position relative
          margin-left 3%
          padding 10px 0
          border-bottom: 1px solid #e3e3e3;
          img
            width 15px
            margin-right 10px
            vertical-align middle
          span
            font-size 14px
            line-height 20px
            color #333
          &:after
            border: #999 solid 2px;
            position: absolute;
            right: 22px;
            top: 50%;
            margin-top: -5px;
            display: block;
            content: '';
            width: 8px;
            height: 8px;
            border-top: none;
            border-right: none;
            transform: rotate(225deg);
    .service
      margin-top 20px
      .phone
        background #fff
        font-size 14px
        text-align center
        line-height 34px
        a
          color #ffb000
      .time
        font-size 12px
        text-align center
        color #999999
        line-height 34px
</style>
