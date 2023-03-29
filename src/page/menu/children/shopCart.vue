<template>
 <div class="shopcart">
   <div class="content" @click="toggleList">
     <div class="content-left">
       <div class="icon" :class="shopCart.length? 'cart' : 'clear-cart'">
         <i v-if="totalCount" class="count">{{totalCount}}</i>
       </div>
       <div class="price">
         <p v-if="shopCart.length" class="total"><span class="label">￥</span>{{totalPrice}}</p>
         <p class="fee" :class="{'size': shopCart.length}">￥另需配送费{{deliveryFee}}</p>
       </div>
     </div>
     <div class="content-right" :class="payClass">
       {{payDesc}}
     </div>
   </div>
   <transition name="fold">
     <section class="shopcart-list" v-show="fold">
       <header class="head">
         <span class="title">购物车</span>
         <span class="clear-cart" @click="clearCart">
           <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#clear-cart"></use>
           </svg>清空购物车
         </span>
       </header>
       <ul class="cart-ul">
         <li v-for="(food,index) in shopCart" :key="index" class="cart-ul-li">
           <div class="name">
             <p>{{food.spuName}}</p>
             <p v-if="food.spec" class="desc">({{food.spec}})</p>
           </div>
           <div class="price">
            ￥{{ food.payableAmount | filterPrice(food.count,'*')}}
           </div>
           <div class="cartcontrol-warrper">
             <cartControl :shopId='shopId' :food='food' :attrs='food.attrs' :attrValues='food.attrValues'></cartControl>
           </div>
         </li>
       </ul>
     </section>
   </transition>
   <transition name="fade">
    <div class="list-mask" @click="hideList" v-show="fold"></div>
   </transition>
 </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import cartControl from '../../_components/cartcontrol';
import { fixed } from '../../../config/mUtils';

export default {
  props: {
    shopId: String,
    deliveryFee: Number, // 配送费
    minFee: Number // 最低起送
  },
  data() {
    return {
      fold: false
    };
  },
  computed: {
    ...mapState(['cartList']),
    shopCart() {
      // eslint-disable-next-line prefer-spread
      return [].concat.apply([], (this.cartList[this.shopId]));
    },
    // 计算总金额
    totalPrice() {
      let cartList = this.shopCart;
      let total = 0;
      for (let i = 0; i < cartList.length; i++) {
        total += cartList[i].count * cartList[i].payableAmount;
      }
      return parseFloat(total.toFixed(10));
    },
    // 计算总数量
    totalCount() {
      let cartList = this.shopCart;
      let count = 0;
      for (let i = 0; i < cartList.length; i++) {
        count += cartList[i].count;
      }
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minFee}起送`;
      }
      if (this.totalPrice > 0 && this.totalPrice < this.minFee) {
        let diff = fixed(this.minFee, this.totalPrice, '-');
        return `差￥${diff} 起送`;
      }
      return '去结算';
    },
    payClass() {
      if (this.totalPrice < this.minFee) {
        return 'not-enough';
      }
      return 'enough';
    }
  },
  methods: {
    ...mapMutations(['CLEAR_CART']),
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    clearCart() {
      this.CLEAR_CART(this.shopId);
    },
    hideList() {
      this.fold = false;
    }
  },
  watch: {
    totalCount(count) {
      if (!count) {
        this.fold = false;
      }
    }
  },
  filters: {
    filterPrice(price1, price2, type) {
      return fixed(price1, price2, type);
    }
  },
  components: {
    cartControl
  }
};
</script>

<style lang="stylus">
@import "../../../style/mixin.styl";
  .shopcart
    position fixed
    width 100%
    bottom 0
    .content
      position relative
      display flex
      height 50px
      z-index 50
      .content-left
        flex 1
        display flex
        padding-left 10px
        background #3b3b3c
        .icon
          margin-right 10px
          position relative
          top -10px
          width 50px
          height 50px
          .count
            position absolute
            right 0
            top 0
            display inline-block
            width 30px
            height 30px
            line-height 30px
            font-size 20px
            font-style normal
            text-align center
            color #fff
            background #fb4e44
            border-radius 50%
            transform scale(0.6) translate(40%,-40%)
          &.clear-cart
             background url(../../../images/clear-cart.png)
             background-size contain
             background-repeat no-repeat
          &.cart
             background url(../../../images/cart.png)
             background-size contain
             background-repeat no-repeat
        .price
          align-self center
          .total
           font-size 24px
           color #fff
           .label
             font-size 16px
             margin-right 10px
          .fee
            display inline-block
            color #999
            font-size 16px
            &.size
              font-size 12px
      .content-right
        padding 0 30px
        line-height 50px
        font-size 16px
        &.not-enough
          background #3b3b3c
          color #909090
          font-weight 700
        &.enough
          background #ffc133
          color #333
    .shopcart-list
      position absolute
      left 0
      right 0
      bottom 50px
      z-index 40
      background #fff
      &.fold-enter-active, &.fold-leave-active
        transition all 0.3s linear
      &.fold-enter, &.fold-leave-active
        transform translateY(100%)
      .head
       padding 0 15px
       height 30px
       line-height 30px
       font-size 14px
       background #f4f4f4
       .title
         display inline-block
        .clear-cart
          display inline-block
          float right
          svg
            background #f4f4f4
            position relative
            top 2px
            width 15px
            height 15px
            margin-right 5px
      .cart-ul
        padding 0 15px
        max-height 250px
        overflow-y auto
        .cart-ul-li
          padding 14px 0
          display flex
          align-items center
          border-1px(rgba(102,102,102,0.2))
          .name
            flex 1
            .desc
              margin-top 5px
              font-size 12px
              color #999
          .price
            color #fb584f
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 10
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
