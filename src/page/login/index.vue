/* eslint-disable arrow-parens */
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
         <div class="login-send-verify-code-text" :class="{'login-active': phone.length === 11}">
           <span id="sendCodeBtnText">发送验证码</span>
           <div class="iloginLoading">
             <div class="sms-circle"></div>
           </div>
         </div>
       </div>
       <div class="login-verifty-code-wrapper">
         <input class="login-code-input" v-model="captcha" id="codeInput" type="number" maxlength="6" autocomplete="off" placeholder="请输入短信验证码"/>
       </div>
       <div class="input-opbtn-wrapper">
          <button class="input-login-btn-wrapper" id="iloginBtn">
            登录
          </button>
       </div>
      <div class="login-user-confirm">
         <div class="login-user-confirm-wrapper">
           <label id="loginUserConfirm">
             <input type="checkbox" class="checkbox" id="inputChecked" value="" autocomplete="off">
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
export default {
  data() {
    return {
      phone: '', // 手机号码
      captcha: '' // 验证码
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || '/' });
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('参数验证不合法！');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus">
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
    .login-user-confirm
      padding-top: 2.3em
      .login-user-confirm-wrapper
        display: flex
        label
          display: inline-block
          min-width: 10%
          .checkbox
            display: none
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
