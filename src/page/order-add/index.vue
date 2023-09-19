<template>
  <div class="order-add">
    <Nav title="提交订单" :path='{ path:"menu", query: { shopId: this.shopId }}' />
    <article class="">
      <section class="deliver">
        <div class="addressDetail">请选择收货地址</div>
        <div class="tip">为降低风险，推荐使用无接触配送</div>
        <div class="timeDeliver">
          <span class="keyword">立即送出</span>
          <span class="timeDesc">{{`大约(${deliverTime}送达)`}}</span>
        </div>
      </section>
      <section class="detail">
        <div class="shop">
          <img class="shopIcon" :src="this.orderView.imageUrl">
          <span class="shopName">{{this.orderView.shopName}}</span>
          <span :class="this.orderView.exclusiveDelivery? 'zhuansong':'mtzsWord'"></span>
        </div>
        <ul class="spuList">
          <li v-for="(food, index) in this.orderView.foodList" :key="index" class="cart-ul-li">
            <img class="icon" height="55px" width="55px" :src="food.foodImage" />
            <div class="spuInfoList">
              <div class="spuInfo">
                <span class="name">{{ food.foodName }}</span>
                <span class="price">￥{{food.currentAmount}}</span>
              </div>
              <div class="attrs">
                <span class="unit">{{ food.unit ? `${food.unit}`:'份' }} {{ food.attrValues | foodAttr}}</span>
                <span class="amount">￥{{food.originAmount}}</span>
              </div>
              <div class="count">
                x{{food.count}}
              </div>
            </div>
          </li>
        </ul>
        <div class="fee">
          <div class="feeInner">
            <div class="feeInfo">
              <span class="feeInfoTips">打包费</span>
              <span class="feeInfoSpan">¥{{this.orderView.boxFee}}</span>
            </div>
            <div class="feeInfo">
              <span class="feeInfoTips">配送费</span>
              <span class="feeInfoSpan">¥{{this.orderView.deliverFee}}</span>
            </div>
          </div>
        </div>
        <div class="root">
          <div class="promotion" @click="showCoupon">
            <span>美团红包</span>
            <span class="promotionSelect">{{ orderView.couponPrice? `- ¥${orderView.couponPrice }` : this.validCoupon }}</span>
          </div>
        </div>
        <div class="promote">
          <div class="promoInfo">
            <div v-if="false" class="remindInfos">
              <span class="remindInfosIcon"></span>满减与折扣无法同享，已选择折扣比满减节省￥24.5
            </div>
            <span id="ruleinfo" class="rule">
              <span class="ruleInner">
                <span class="ruleText">优惠规则</span>
                <span class="ruleIcon"></span>
              </span>
            </span>
            <span class="discountSpan">
              <span class="discountWord">已优惠</span>
              <span class="redYuan">¥</span>
              <span class="discountFee">{{orderView.totalDiscountPrice}}</span>
            </span>
            <span class="promoInfoActual">
              <span class="actualWord">小计</span>
              <span class="blackYuan">¥</span>
              <span class="actuallyPaidFee">{{orderView.totalPrice}}</span>
            </span>
          </div>
        </div>
      </section>
      <section class="orderOther">
        <People/>
      </section>
    </article>
    <div class="root">
      <div class="submitWrapper">
        <div class="submitSubWrapper">
          <div class="submitDetail">
            <span class="coupon">已优惠¥{{orderView.totalDiscountPrice}}</span><span class="actual">合计<i>¥{{orderView.totalPrice}}</i></span>
          </div>
          <button class="submit" id="sqt-openh5-preview-submit-btn" observe-tag="1">
            <span>
              <span class="toPay">提交订单</span>
            </span>
          </button>
        </div>
      </div>
    </div>
    <Coupon :couponDetailVos="this.orderView.couponDetailVos || []" @orderPreView="orderPreView" ref="Coupon" />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import service from '@/service';
import Nav from '@/page/_components/nav';
import Coupon from './coupon';
import People from './people';


import './index.styl';

export default {
  data() {
    return {
      shopId: undefined,
      selectTab: '1',
      deliverTime: '19:35',
      orderView: {},
      addOrder: {}
    };
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
    init() {
      const shopId = this.shopId = this.$route.query.shopId;
      if (!this.cartList[shopId] || this.cartList[shopId].length == 0) {
        this.gotoAddress({ path: "menu", query: { shopId: this.shopId } })
      }
      this.orderPreView()
    },
    orderPreView(params = {}) {
      const foodList = this.cartList[this.shopId].map(cart => {
        return { foodId: cart.foodId, count: cart.count, attrIds: cart.attrs }
      })
      const shopId = this.shopId;
      this.$loading.show();
      service.orderPreView({ shopId, foodList, ...params }).then((result) => {
        this.orderView = result
        this.$loading.hide()
      })
    },
    showCoupon() {
      this.$refs.Coupon.toggleList();
    }
  },
  computed: {
    ...mapState("cart", ["cartList"]),
    validCoupon() {
      if (this.orderView.couponDetailVos && this.orderView.couponDetailVos.length) {
        const couponInfo = this.orderView.couponDetailVos.find(item => item.couponValid === 1)
        const count = couponInfo.couponInfoList.length
        return count ? `${count}张可用` : '暂无可用'
      } else {
        return '暂无可用'
      }
    }
  },
  filters: {
    foodAttr(attrValues) {
      if (!attrValues) return ''
      return attrValues.join(' ')
    },
  },
  components: {
    Nav,
    Coupon,
    People
  }
};
</script>
