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
         <input class="login-phone-num-input" id="phoneNumInput" type="tel" autocomplete="off" placeholder="请输入手机号" maxlength="11"/>
         <div class="login-send-verify-code-text">
           <span id="sendCodeBtnText">发送验证码</span>
         </div>
       </div>
       <div class="login-verifty-code-wrapper"></div>
     </div>
   </div>
</div>
</template>

<script>
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
</style>
