<template>
  <div style="display: flex;flex-direction: column;position: absolute;right: 0;left: 0;height: 100%;">
    <div class="shop-info">
      <div class="avatar">
        <img width="85" height="64" :src="state.shopInfo.shopPic">
      </div>
      <div class="content">
        <div class="delivery">
          <span class="time">{{state.shopInfo.deliveryTimeDecoded || 30}}分钟</span>
          <span>{{state.shopInfo.distance}}</span>
          <i v-if="state.shopInfo.deliveryType" class="zhuansong"></i>
        </div>
        <div class="bulletin">
          公告：{{state.shopInfo.bulletin}}
        </div>
        <div class="activity" @click="showShopDetail()">
          <div class="swiper-container">
            <ul class="swiper-wrapper">
              <li class="swiper-slide" v-for="(item,index) in state.shopInfo.activityList" :key="index">
                <img width="15" height="15" :src="$$conversion(item.actType)">
                {{item.actDesc}}
              </li>
            </ul>
          </div>
          <svg class="arrow-right">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
      </div>
    </div>
    <nav class="tab">
      <div class="tab-item" @click="distanceX=0;changeShowType = 'food'">点菜
        <span class="active" :style="{'transform': `translateX(${distanceX}%)`}"></span>
      </div>
      <div class="tab-item" @click="distanceX=100;changeShowType = 'rating'">评价</div>
      <div class="tab-item" @click="distanceX=200;changeShowType = 'seller'">商家</div>
    </nav>
    <div class="shop-container">
      <div class="shop-tab" :style="{'transform': `translateX(${-distanceX}%)`}">
        <Menu :shopId='state.shopId' :selectFood='selectFood' :categoryList='state.categoryList' />
        <Comment :seletPic='seletPic' :shopId='state.shopId' :commentScores='state.commentScores' :commentList='state.commentList' />
        <ShopDetail :shopInfo='state.shopInfo' :showShopDetail='showShopDetail' />
      </div>
    </div>
    <transition name="fade">
      <div class="screen-cover" @click="hideList" v-show="listShow"></div>
    </transition>
    <Bulletin :shopInfo='state.shopInfo' ref="shopDetail"></Bulletin>
    <FoodDetail ref="food" :shopId='state.shopId' :food="foodDetail"></FoodDetail>
    <Cart v-show="changeShowType === 'food'" :shopId="state.shopId" :minFee='state.shopInfo.minFee' :deliveryFee='state.shopInfo.deliveryFee'></Cart>
    <Pics :images="pictures" :index="picIndex" ref="pics"></Pics>
    <router-view :shopId="state.shopId"></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Swiper from 'swiper';
import Pics from '@/components/pics';
import { Bulletin, FoodDetail, Cart } from './children';
import ShopDetail from './detail';
import Menu from './menu';
import Comment from './comment';
import { $$conversion } from '@/common/utils';
import { _activity } from '@/common/config';
import store from './store';

import 'swiper/css/swiper.min.css';
import './index.styl';
export default {
  data() {
    return {
      shopId: '', // 商家id
      foodDetail: {}, // 食物详情
      changeShowType: 'food', // 选项卡
      distanceX: 0, // tab切换下标
      listShow: false, // 遮罩层
      pictures: [], // 照片view
      picIndex: 0, // pic index
      state: store.state,
    };
  },
  created() {
    const shopId = this.$route.query.shopId;
    store.saveState({ shopId })
    this.$loading.show();
    Promise.all([store.getShopInfo(shopId), store.getFood(shopId), store.commentsSummary(shopId)]).then(result => {
      this.initPlug();
      this.$loading.hide();
    })
    this.INIT_BUYCART();
  },
  mounted() {
  },
  methods: {
    ...mapMutations('cart', ['INIT_BUYCART']),
    $$conversion(promotionType) {
      const item = $$conversion(_activity, promotionType, true)
      return item?.icon
    },
    initPlug() {
      new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: true
      });
    },
    showShopDetail() {
      this.$refs.shopDetail.show();
      this.listShow = true;
    },
    hideList() {
      this.$refs.shopDetail.hide();
      this.listShow = false;
    },
    selectFood(food, chooseType) {
      this.foodDetail = food;
      this.$refs.food.chooseType = chooseType;
      this.$refs.food.show();
    },
    seletPic(pictures, index) {
      this.picIndex = index;
      let pictureList = [];
      pictures.forEach(pic => {
        pictureList.push(pic.originalPicUrl);
      });
      this.pictures = pictureList;
      this.$refs.pics.show();
    },
  },
  components: {
    Bulletin,
    FoodDetail,
    ShopDetail,
    Menu,
    Comment,
    Cart,
    Pics
  }
};
</script>
