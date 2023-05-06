<template>
  <div class="seller-container">
    <div class="info">
      <p class="detail">
        <img src="@/images/site.png" height="16">
        <span>{{shopInfo.shopAddress}}</span>
        <a v-if="shopInfo.shopPhone" :href="`tel:${shopInfo.shopPhone.toString()}`" class="phone"></a>
      </p>
      <router-link to="/menu/qualification">
        <p class="detail link">
          <img src="@/images/dangan.png" height="16">
          <span>查看食品安全档案</span>
        </p>
      </router-link>
    </div>
    <div class="info">
      <p class="detail">
        <img src="@/images/wj.png" height="16">
        <span>配送服务：<i class="peisong"></i>提供高品质配送服务</span>
      </p>
      <p class="detail">
        <img src="@/images/time.png" height="16">
        <span>配送时间：{{shopInfo.shippingTime}}</span>
      </p>
    </div>
    <div class="info">
      <p class="detail link" @click="showShopDetail()">
        <img src="@/images/sy.png" height="16">
        <span>{{shopInfo.bulletin}}</span>
      </p>
      <p class="detail">
        <img src="@/images/fw.png" height="16">
        <span>商家服务：该商户支持在线支付</span>
      </p>
      <ul style="margin-bottom:15px">
        <li class="activity" v-for="(activity,index) in shopInfo.activityList" :key="index">
          <img :src="$$conversion(activity.actType)" width="15" height="15"> <span>{{activity.actDesc}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { $$conversion } from '@/common/utils';
import { _activity } from '@/common/config';
import './index.styl';
export default {
  props: {
    showShopDetail: {
      type: Function,
      default: () => { }
    },
    shopInfo: {
      type: Object
    }
  },
  methods: {
    $$conversion(promotionType) {
      const item = $$conversion(_activity, promotionType, true)
      return item?.icon
    },
  }
};
</script>