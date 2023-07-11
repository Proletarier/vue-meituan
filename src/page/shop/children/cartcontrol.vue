<template>
  <div class="cartcontrol">
    <div class="cart-bottom" @click.capture="showSpecification($event)">
      <transition name='move'>
        <div class="cart-decrease" v-show="foodNum>0" @click.stop="decreaseCart(food.foodId)">
          <svg width="25" height="25">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-decrease"></use>
          </svg>
        </div>
      </transition>
      <div class="cart-count" v-show="foodNum>0">{{foodNum}}</div>
      <div class="cart-add" @click.stop="addToCart(food)">
        <svg width="25" height="25">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { compareArray } from '@/common/utils';

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
    ...mapState('cart', ['cartList']),
    foodNum() {
      let cartList = this.cartList[this.shopId];
      let num = 0;
      if (cartList && cartList.length > 0) {
        cartList.forEach((item) => {
          if (item.foodId === this.food.foodId && (!this.attrs.length || compareArray(this.attrs, item.attrs, true))) {
            num += item.count;
          }
        });
      }
      return num;
    }
  },
  methods: {
    ...mapMutations('cart', ['ADD_CART', 'REDUCE_CART']),
    showSpecification(event) {
      if (this.food.spuAttrList && this.food.spuAttrList.length && this.chooseType !== 'specification') {
        this.$emit('showSpecification');
        event.stopPropagation();
      }
    },
    addToCart({ foodId, imageUrl, spuName, boxFee,currentPrice,originPrice,unit, activityPolicy }) {
      this.ADD_CART({
        shopId: this.shopId, foodId, imageUrl, spuName, attrs: this.attrs.slice(), attrValues: this.attrValues.slice(),
        boxFee,currentPrice,originPrice,unit,activityPolicy
      });
    },
    decreaseCart(foodId) {
      this.REDUCE_CART({
        shopId: this.shopId, foodId, attrs: this.attrs
      });
    }
  }
};
</script>

<style lang="stylus">
.cartcontrol {
  .cart-bottom {
    background: #fff;
    font-size: 0;

    .cart-decrease {
      display: inline-block;
      margin-left: 4px;

      &.move-enter-active, &.move-leave-active {
        transition: all 0.4s linear;
      }

      &.move-enter, &.move-leave-active {
        transform: translateX(100%) rotate(180deg);
      }
    }

    .cart-count {
      display: inline-block;
      padding: 0 10px;
      vertical-align: top;
      font-size: 14px;
      line-height: 26px;
      color: #333;
    }

    .cart-add {
      display: inline-block;
    }
  }
}
</style>
