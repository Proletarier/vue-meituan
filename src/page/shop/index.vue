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
        <section class="comment-container" ref="comments">
          <div>
            <header class="comment-hdaer">
              <div class="score">
                <p class="shop-score">{{commentScores.shopScore}}</p>
                <p>商家评分</p>
              </div>
              <div class="score" style="flex:2">
                <p class="quality">
                  <span>口味</span>
                  <star :score="commentScores.qualityScore"></star><span>{{commentScores.qualityScore}}</span>
                </p>
                <p class="pack">
                  <span>包装</span>
                  <star :score="commentScores.packScore"></star><span>{{commentScores.packScore}}</span>
                </p>
              </div>
              <div class="score">
                <p class="delivery">{{commentScores.deliveryScore}}</p>
                <p>配送评分</p>
              </div>
            </header>
            <ul class="comment-label">
              <li v-for="(label,index) in commentLabels" :key="index" class="label-item" :class="{active: labelId === label.ID}">
                {{label.content}}
              </li>
            </ul>
            <ul class="comment-list">
              <li v-for="(comment,index) in commentList" :key="index" class="comment-list-li">
                <div class="icon">
                  <img v-if="comment.userPicUrl" :src="comment.userPicUrl" width="40px">
                  <img v-else src='../../images/userpic_defalut.png' width="40px">
                </div>
                <section class="comment-list-details">
                  <p class="name">{{comment.userName}} <span class="time">{{comment.commentTime}}</span></p>
                  <p class="delivery">{{comment.deliveryTime}}</p>
                  <p class="content">{{comment.content}}</p>
                  <div class="pics">
                    <img class="pic" v-for="(pic,index) in comment.pictures" :key="index" :src="pic.smallPicUrl" @click="seletPic(comment.pictures,index)">
                  </div>
                  <p v-if="comment.praiseDish" class="dish">
                    <svg width='20' height='20'>
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#praise"></use>
                    </svg>{{comment.praiseDish}}
                  </p>
                  <p v-if="comment.label" class="label">
                    <svg width='20' height='20'>
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#label"></use>
                    </svg>{{comment.label}}
                  </p>
                  <p v-if="comment.shopReply" class="reply">{{comment.shopReply}}</p>
                </section>
              </li>
            </ul>
          </div>
        </section>
        <ShopDetail :shopInfo='state.shopInfo' :showShopDetail='showShopDetail' />
      </div>
    </div>
    <transition name="fade">
      <div class="screen-cover" @click="hideList" v-show="listShow"></div>
    </transition>
    <Bulletin :shopInfo='state.shopInfo' ref="shopDetail"></Bulletin>
    <FoodDetail ref="food" :shopId='shopId' :food="foodDetail"></FoodDetail>
    <Cart v-show="changeShowType === 'food'" :shopId="state.shopId" :minFee='state.shopInfo.minFee' :deliveryFee='state.shopInfo.deliveryFee'></Cart>
    <pics :images="pictures" :index="picIndex" ref="pics"></pics>
    <router-view :shopId="state.shopId"></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Swiper from 'swiper';
import BScroll from 'better-scroll';
import {  getComments } from '../../service/api';
import star from '@/components/star';
import { Bulletin, FoodDetail, Cart } from './children';
import ShopDetail from './detail';
import Menu from './menu';
import pics from '@/components/pics';
import 'swiper/css/swiper.min.css';

import { $$conversion } from '@/common/utils';
import { _activity } from '@/common/config';
import store from './store';
import './index.styl';
export default {
  data() {
    return {
      shopId: '', // 商家id
      foodDetail: {}, // 食物详情
      commentList: [], // 评论列表
      commentLabels: [], // 评论Tag列表
      commentScores: '', // 商铺评论详情
      labelId: 0, // 评论Tag Id
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
    Promise.all([store.getShopInfo(shopId),store.getFood(shopId)]).then(result => {
      this.initPlug();
      this.$loading.hide();
    })
    getComments().then(res => {
      this.commentScores = res.data;
      this.commentList = res.data.list;
      this.commentLabels = res.data.commentLabels;
      this.$nextTick(() => {
        this.comments = new BScroll(this.$refs.comments, {
          probeType: 3,
          bounce: false,
          click: true
        });
      });
    });
    this.INIT_BUYCART();
  },
  mounted() {
  },
  methods: {
    ...mapMutations('cart',['INIT_BUYCART']),
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
    seletPic(pictures, index) {
      let pictureList = [];
      this.picIndex = index;
      pictures.forEach(pic => {
        pictureList.push(pic.originalPicUrl);
      });
      this.pictures = pictureList;
      this.$refs.pics.show();
    },
    selectFood(food, chooseType) {
      this.foodDetail = food;
      this.$refs.food.chooseType = chooseType;
      this.$refs.food.show();
    },
  },
  components: {
    star,
    Bulletin,
    FoodDetail,
    ShopDetail,
    Menu,
    Cart,
    pics
  }
};
</script>
