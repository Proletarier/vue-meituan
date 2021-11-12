<template>
  <div id="addaddress">
    <section class="address_detail">
      <div>
        <span>联系人：</span>
        <input type="text"  v-model="address.name">
      </div>
      <div class="gender">
        <label class="gender_select">
          <input class="radio" id="man" type="radio" name="sex" value="1" v-model="address.gender"  autocomplete="off" />
          <i></i>
          先生
        </label>
        <label class="gender_select">
          <input class="radio" id="woman" type="radio" name="sex" value="0" v-model="address.gender"  autocomplete="off"/>
          <i></i>
          女士
        </label>
      </div>
      <div>
        <span>手机号：</span>
        <input type="text"  v-model="address.phone">
      </div>
      <div class="shipping_address">
        <span>收货地址：</span>
        <p class="poi">{{address.poi}}</p>
      </div>
      <div>
        <span>门牌号：</span>
        <input type="text"  v-model="address.houseNumber">
      </div>
    </section>
    <div class="address_save">保存</div>
    <div v-if="'edit' === editType" class="address_del">删除</div>
    <div class="address_return" @click="$router.go(-1)">返回</div>
  </div>
</template>

<script>
import index from '../../login/index.vue';

const defaultAddress = {
  addressId: null,
  customerId: null,
  phone: null,
  name: null,
  gender: 1,
  houseNumber: null,
  poi: null
}

export default {
  components: { index },
  data(){
    return{
      address: Object.assign({}, defaultAddress),
      editType: null
    }
  },
  created(){
     this.editType = this.$route.query.editType;
    if('edit' ===   this.editType){
      this.address = this.$route.query;
    }else{

    }
  },
  mounted(){
    
  }
}
</script>

<style lang="stylus">
#addaddress
  .address_detail
    div
      margin-left: 15px
      height: 52.5px
      font-size: 16px
      border-bottom: 0.5px solid #e4e4e4
      line-height: 52.5px
      input[type=text]
        border: none
        color: #333
        width 70%
        padding-left: 10px
    .gender
      display: flex
      padding-left: 75px
      .gender_select
        margin-right: 20px
        display: flex
        align-items: center
        .radio
          display: none
        .radio[type=radio]:checked+i
          background-color: #FFD700;
          &::after
            position: absolute
            content: ""
            width 3px
            height: 7px
            top 25%
            left: 50%
            transform: rotate(45deg) translateX(-50%)
            border: 2px solid #fff
            border-top: none
            border-left: none
        .radio[type=radio]+i
          display: inline-block
          border: 1px solid #ccc
          width 15px
          height: 15px
          border-radius: 50%
          background-color: #fff
          position relative
          margin 2px 10px
    .shipping_address
      position relative
      display: flex
      &:after
        border: #dcdcdc solid 2px
        position: absolute
        top: 42%
        right : 22px
        display: block
        content: ''
        width 8px
        height: 8px
        border-right: none
        border-top: none
        transform: rotate(225deg)
      .poi
        background: url('../../../images/site_hs.png') no-repeat 0 50% 
        background-size: 14px 16px
        padding-left: 16px
        width: 70%
        height: 100%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
  .address_save,.address_del,.address_return
    text-align: center
    height: 40px
    line-height: 40px
    border: 1px solid #FFB000
    border-radius: 4px
    margin: 15px 15px
  .address_save
    margin: 25px 15px 15px 15px
    background-image: linear-gradient(135deg, #FFD266 0%, #FFBD27 100%)
</style>