<template>
  <div class="cartcontrol">
     <div class="cart-bottom" @click.capture="showSpecification($event)">
      <transition name='move'>
        <div class="cart-decrease" v-show="foodNum>0" @click.stop="decreaseCart(food.spuId)">
          <svg width="25" height="25">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-decrease"></use>
          </svg>
        </div>
      </transition>
        <div class="cart-count" v-show="foodNum>0">{{foodNum}}</div>
        <div class="cart-add" @click.stop="addToCart(food.spuId,food.skuList, food.spuName,food.currentPrice, food.unit)">
          <svg width="25" height="25">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
          </svg>
        </div>
     </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { compareArray } from '../config/mUtils';

export default {
  props: {
    shopId: String,
    food: Object,
    chooseType: {
      type: String,
      default: ''
    },
    attrs: {
      type: Array,
      default() {
        return [];
      }
    },
    attrValues: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['cartList']),
    foodNum() {
      let cartList = this.cartList[this.shopId];
      let num = 0;
      if (cartList && cartList.length > 0) {
        cartList.forEach((item) => {
          if (item.spuId === this.food.spuId && (!this.attrs.length || compareArray(this.attrs, item.attrs, true))) {
            num += item.count;
          }
        });
      }
      return num;
    }
  },
  methods: {
    ...mapMutations(['ADD_CART', 'REDUCE_CART']),
    // 判断attr的值是否进入规格页面
    showSpecification(event) {
      if (this.food.spuAttrList && this.food.spuAttrList.length && this.chooseType !== 'specification') {
        this.$emit('showSpecification');
        // 阻止事件继续传播
        event.stopPropagation();
      }
    },
    addToCart(spuId, skuList, spuName, payableAmount, spec) {
      this.ADD_CART({
        shopId: this.shopId, spuId, skuList, spuName, payableAmount, spec, attrs: this.attrs.slice(), attrValues: this.attrValues.slice()
      });
    },
    decreaseCart(spuId) {
      this.REDUCE_CART({
        shopId: this.shopId, spuId, attrs: this.attrs
      });
    }
  }
};
</script>

<style lang="stylus">
.cartcontrol
  .cart-bottom
    background #fff
    font-size 0
    .cart-decrease
      display inline-block
      margin-left 4px
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        transform: translateX(100%) rotate(180deg)
    .cart-count
      display inline-block
      padding 0 10px
      vertical-align top
      font-size 14px
      line-height 26px
      color #333
    .cart-add
      display inline-block
</style>
