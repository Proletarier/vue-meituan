<template>
<div class="login">
   <div class="top">
      <div class="logo">
        <img class="logo-icon" src="../../images/logo.png">
        <div class="logo-name">美团外卖</div>
      </div>
   </div>
   <div class="login-form">
     <div class="login-wrapper">
       <div class="login-phone-num-wrapper">
         <input class="login-phone-num-input" v-model="phone" id="phoneNumInput" type="tel" autocomplete="off" placeholder="请输入手机号" maxlength="11"/>
         <div class="login-send-verify-code-text" :class="{'login-active': phone.length === 11}" v-on:click="sendSms">
           <span id="sendCodeBtnText">发送验证码</span>
           <div class="fadingCircle" id="iloginLoading" :style="{'display': (loading? 'inline-block' : 'none') }">
             <div class="sms-circle"></div>
             <div class="sms-circle2"></div>
             <div class="sms-circle3"></div>
             <div class="sms-circle4"></div>
             <div class="sms-circle5"></div>
             <div class="sms-circle6"></div>
             <div class="sms-circle7"></div>
             <div class="sms-circle8"></div>
             <div class="sms-circle9"></div>
             <div class="sms-circle10"></div>
             <div class="sms-circle11"></div>
             <div class="sms-circle12"></div>
           </div>
         </div>
       </div>
       <div class="login-verifty-code-wrapper">
         <input class="login-code-input" v-model="captcha" id="codeInput" type="number" maxlength="6" autocomplete="off" placeholder="请输入短信验证码"/>
       </div>
       <div class="input-opbtn-wrapper" >
          <button class="input-login-btn-wrapper" id="iloginBtn" v-on:click="login"  :class="{'input-login-active': captcha.length === 6 && phone.length === 11}">
            登录
          </button>
       </div>
      <div class="login-user-confirm">
         <div class="login-user-confirm-wrapper">
           <label id="loginUserConfirm">
             <input type="checkbox" class="checkbox" id="inputChecked" v-model="isSelect" autocomplete="off">
             <i></i>
           </label>
           <div class="login-user-confirm-text login-user-account-common">
            我已阅读并同意
            <a href="https://rules-center.meituan.com/m/detail/4" style="color: #3488FF">《美团用户协议》、</a>
            <a href="https://rules-center.meituan.com/m/detail/2" style="color: #3488FF">《隐私政策》</a>
            ，并授权美团使用该美团账号信息（如昵称、头像、收货地址）进行统一管理
           </div>
         </div>
       </div>
     </div>
   </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import  service from '@/service';

export default {
  data() {
    return {
      phone: '', // 手机号码
      captcha: '', // 验证码
      loading: false,
      redirect: undefined,
      isSelect: undefined
    };
  },
  computed: {
    // isLogin() {
    //   if (this.phone.siz)
    //   return false;
    // }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    sendSms() {
      if (this.phone.length < 11) {
        return false;
      }
      this.loading = true;
      service.getCaptcha({ phone: this.phone }).then(response => {
        if(response){
          this.$message.success('发送成功')
        }
        this.loading = false;
      })
    },
    login() {
      if (this.phone.length !== 11 || this.captcha.length !== 6) {
        return;
      }

      if(!this.isSelect){
        this.$message.warning('请先阅读并勾选协议')
        return;
      }
      
      let loginForm = {
        phone: this.phone,
        captcha: this.captcha
      }
      this.$store.dispatch('user/login', loginForm).then(() => {
        this.$router.push({ path: 'home' })
      }).catch((err) => {
        this.$message.error(err.message)
      });
    }
  }
};
</script>

<style lang="stylus">
@import "../../style/animation.styl";

.top
  display: block
  .logo
    margin: 0
    padding: 0
    padding-top: 4rem
    margin-bottom: 7rem
    text-align: center
    .logo-icon
      width: 5rem
      height: 5rem
      display: block
      padding: 0
      margin: 0 auto
    .logo-name
      font-size: 1.4rem
      display: block
      margin: 0 auto
      text-align: center
      padding-top: 2px
.login-form
  .login-wrapper
    font-size: 16px
    width: 100%
    padding: 1.2rem
    box-sizing: border-box
    .login-phone-num-wrapper
      display: flex
      border-bottom: 1px solid #e5e5e5
      height: 1.4em
      align-items: center
      padding: .6em 0
      justify-content: space-around;
      .login-phone-num-input:focus
        outline: none
        background-color: inherit
      .login-phone-num-input
        height: 100%
        box-sizing: border-box
        padding-top: 0
        flex: 1
        border: 0
        min-width: 0
        -webkit-tap-highlight-color: rgba(0,0,0,0)
        font-size: 1em
      .login-send-verify-code-text
        display: flex
        color: #000
        align-items: center
        padding: .4em .5em
        border-radius: .2em
        cursor pointer
        font-size: 1.1em
        &.login-active
          color #ffd300
          border 1px solid #ffd300
    .login-verifty-code-wrapper
      display: flex
      justify-content: space-around
      align-items: center
      padding: .6em 0
      margin-top: 1em
      border-bottom: 1px solid #e5e5e5
      width 100%
      user-select: none
      .login-code-input,.login-code-input:focus
        outline: none
        background-color: inherit
      .login-code-input
        flex 1
        width 100%
        border 0
        font-size 1em
        min-width 0
    .input-opbtn-wrapper
      margin-top: 1em
      .input-login-btn-wrapper
       text-align: center
       color: #999
       background-color: #e5e5e5
       height: 2.6em
       line-height: 2.6em
       font-size: 1em
       display: block
       width 100%
       border-radius: .3em
       border: none
       cursor pointer
       user-select:none
       &.input-login-active
         background-color: #ffd300
         color: #fff
    .login-user-confirm
      padding-top: 2.3em
      .login-user-confirm-wrapper
        display: flex
        label
          display: inline-block
          min-width: 10%
          .checkbox
            display: none
          .checkbox[type=checkbox]:checked+i
             background-color: #fe8c00;
             &::after
               position: absolute
               content: ""
               width 3px
               height: 7px
               top 25%
               left: 50%
               transform: rotate(45deg) translateX(-50%)
               border: 2px solid #222
               border-top: none
               border-left: none
          .checkbox[type=checkbox]+i
            display: inline-block
            border: 1px solid #ccc
            width 17px
            height: 17px
            border-radius: 50%
            background-color: #fff
            position relative
            margin 2px 10px
        .login-user-confirm-text
          color: rgba(0,0,0,.5)
          font-weight: 400
          font-size: .85em
</style>
