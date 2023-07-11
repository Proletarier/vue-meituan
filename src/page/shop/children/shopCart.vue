<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="icon" :class="shopCart.length ? 'cart' : 'clear-cart'">
          <i v-if="totalCount" class="count">{{ totalCount }}</i>
        </div>
        <div class="price">
          <p v-if="shopCart.length" class="total">
            <span class="label">￥</span>{{ totalPrice }}
          </p>
          <p class="fee" :class="{ size: shopCart.length }">
            ￥另需配送费{{ deliveryFee }}
          </p>
        </div>
      </div>
      <div class="content-right" :class="payClass"  @click="submitOrder">
        {{ payDesc }}
      </div>
    </div>
    <transition name="fold">
      <section class="shopcart-list" v-show="fold">
        <div class="shopcartHead">
          <span class="shopcartTitle">购物车</span>
          <span class="clear-cart" @click="clearCart">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#clear-cart"></use>
            </svg>清空购物车
          </span>
        </div>
        <ul class="cart-ul">
          <li v-for="(food, index) in shopCart" :key="index" class="cart-ul-li">
            <img class="icon" height="75px" width="75px" :src="food.imageUrl" />
            <div class="detail">
              <p class="name">{{ food.spuName }}</p>
              <p class="desc">{{ food.unit && `(${food.unit})` }} {{ food.attrValues | foodAttr}}</p>
              <p class="price">￥{{ food.currentPrice | filterPrice(food.originPrice,food.count,food.activityPolicy) }} <span v-if="food.originPrice && food.activityPolicy.discount" class="originPrice">￥{{ fixed(food.originPrice,food.count,'*')}}</span></p>
            </div>
            <div class="cartcontrol-warrper">
              <CartControl :shopId="shopId" :food="food" :attrs="food.attrs" :attrValues="food.attrValues" />
            </div>
          </li>
          <li class="cart-ul-li">
            <p class="icon" style="height:25px; line-height:25px">打包费</p>
            <p style="color:#fb584f;line-height:25px">￥{{ boxFee }}</p>
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
import { mapMutations, mapState } from "vuex";
import CartControl from "./cartcontrol";
import { fixed } from "@/common/utils";

export default {
  props: {
    shopId: String,
    deliveryFee: Number, // 配送费
    minFee: Number, // 最低起送
  },
  data() {
    return {
      fold: false,
    };
  },
  computed: {
    ...mapState("cart", ["cartList"]),
    shopCart() {
      // eslint-disable-next-line prefer-spread
      return [].concat.apply([], this.cartList[this.shopId]);
    },
    // 计算总金额
    totalPrice() {
      let cartList = this.shopCart;
      let total = this.boxFee || 0;
      for (let i = 0; i < cartList.length; i++) {
        const food = cartList[i]
        total += this.$options.filters.filterPrice(food.currentPrice,food.originPrice,food.count,food.activityPolicy) 
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
        let diff = fixed(this.minFee, this.totalPrice, "-");
        return `差￥${diff} 起送`;
      }
      return "去结算";
    },
    payClass() {
      if (this.totalPrice < this.minFee) {
        return "not-enough";
      }
      return "enough";
    },
    boxFee() {
      let cartList = this.shopCart;
      let total = 0;
      for (let i = 0; i < cartList.length; i++) {
        total += cartList[i].boxFee;
      }
      return parseFloat(total.toFixed(10));
    }
  },
  methods: {
    fixed,
    ...mapMutations("cart", ["CLEAR_CART"]),
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
    },
    submitOrder(){
      if(this.payDesc === '去结算'){
         this.$router.push({path: '/orderAdd',query: { shopId: this.shopId }});
      }
    }
  },
  watch: {
    totalCount(count) {
      if (!count) {
        this.fold = false;
      }
    },
  },
  filters: {
    filterPrice(currentprice, originPrice, count, activityPolicy) {
      if (activityPolicy && activityPolicy.discount) {
        const discount = activityPolicy?.discount.count || 1
        if (count <= discount) {
          return fixed(currentprice, count, "*");
        } else {
          const discountPrice = fixed(currentprice, discount, "*");
          const noDiscountPrice = fixed(originPrice, count - discount, "*");
          return fixed(discountPrice, noDiscountPrice, '+')
        }
      } else {
        return fixed(currentprice, count, "*");
      }
    },
    foodAttr(attrValues) {
      if (!attrValues) return ''
      return attrValues.join(' ')
    },
  },
  components: {
    CartControl,
  },
};
</script>

<style lang="stylus">
@import '../../../style/mixin.styl';

.shopcart {
  position: fixed;
  width: 100%;
  bottom: 0;
  .content {
    position: relative;
    display: flex;
    height: 50px;
    z-index: 50;
    .content-left {
      flex: 1;
      display: flex;
      padding-left: 10px;
      background: #3b3b3c;
      .icon {
        margin-right: 10px;
        position: relative;
        top: -10px;
        width: 50px;
        height: 50px;
        .count {
          position: absolute;
          right: 0;
          top: 0;
          display: inline-block;
          width: 30px;
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          font-style: normal;
          text-align: center;
          color: #fff;
          background: #fb4e44;
          border-radius: 50%;
          transform: scale(0.6) translate(40%, -40%);
        }
        &.clear-cart {
          background: url('../../../images/clear-cart.png');
          background-size: contain;
          background-repeat: no-repeat;
        }
        &.cart {
          background: url('../../../images/cart.png');
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
      .price {
        align-self: center;
        .total {
          font-size: 24px;
          color: #fff;
          .label {
            font-size: 16px;
            margin-right: 10px;
          }
        }
        .fee {
          display: inline-block;
          color: #999;
          font-size: 16px;
          &.size {
            font-size: 12px;
          }
        }
      }
    }

    .content-right {
      padding: 0 30px;
      line-height: 50px;
      font-size: 16px;

      &.not-enough {
        background: #3b3b3c;
        color: #909090;
        font-weight: 700;
      }

      &.enough {
        background: #ffc133;
        color: #333;
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    z-index: 40;
    background: #fff;
    &.fold-enter-active,&.fold-leave-active {
       transition: all 0.3s linear;
    }
    &.fold-enter, &.fold-leave-active {
      transform: translateY(100%);
    }
    .shopcartHead {
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      background: #f4f4f4;
      .shopcartTitle {
        display: inline-block;
      }
      .clear-cart {
        display: inline-block;
        float: right;
        svg {
          background: #f4f4f4;
          position: relative;
          top: 2px;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
    .cart-ul {
      padding: 0 15px;
      max-height: 250px;
      overflow-y: auto;
      .cart-ul-li {
        padding: 14px 0;
        display: flex;
        align-items: flex-start;
        border-1px(rgba(102, 102, 102, 0.2));
        .icon {
          width: 75px;
          height: 75px;
          border-radius: 8px;
          margin-right: 10px;
        }
        .detail {
          flex: 1;
          .name {
            line-height: 25px;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .desc {
            height: 25px
            line-height: 25px;
            font-size: 12px;
            color: #999;
          }
          .price {
            padding-top: 5px;
            color: #fb584f;
            text-indent: -2px;
            .originPrice {
              color: #999;
              font-size: 12px;
              text-decoration: line-through;
            }
          }
        }
        .cartcontrol-warrper {
          align-self: center;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);
  &.fade-enter-active,&.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,&.fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
