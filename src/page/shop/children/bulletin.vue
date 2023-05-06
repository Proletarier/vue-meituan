<template>
  <transition name='move'>
    <div v-show="showFlag" class="shop-detail">
      <ul class="activity-list">
        <li v-for="(item,index) in shopInfo.activityList" :key="index" class="activity-li">
          <img :src="$$conversion(item.actType)" width="15" height="15">
          <span>{{item.actDesc}}</span>
        </li>
      </ul>
      <div class="info">
        <h1 class="title">配送</h1>
        <p>起送￥{{shopInfo.minFee}}</p>
        <p>配送时间：{{shopInfo.shippingTime}}</p>
      </div>
      <div class="info">
        <h1 class="title">公告</h1>
        <p>{{shopInfo.bulletin && shopInfo.bulletin.replace(/\\n/g,'')}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { $$conversion } from '@/common/utils';
import { _activity } from '@/common/config';

export default {
  props: {
    shopInfo: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    $$conversion(promotionType) {
      const item = $$conversion(_activity, promotionType, true)
      return item?.icon
    },
  }
};
</script>

<style lang="stylus">
.shop-detail {
  &.move-enter-active, &.move-leave-active {
    transition: all 0.2s linear;
  }

  &.move-enter, &.move-leave-active {
    transform: translateY(100%);
  }

  position: relative;
  padding-left: 15px;
  padding-bottom: 15px;
  background: #fff;
  z-index: 50;

  .activity-list {
    padding-top: 20px;
    margin-bottom: 15px;

    .activity-li {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 10px;

      img {
        margin-right: 10px;
        vertical-align: top;
      }
    }
  }

  .info {
    margin-bottom: 20px;
    padding-right: 10px;

    .title {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 5px;
    }

    p {
      font-size: 12px;
      line-height: 16px;
    }
  }
}
</style>
