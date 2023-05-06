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
        <section class="food-container">
          <div class="menu-wrapper" ref="menuWrapper">
            <ul>
              <li v-for="(shop,index) in categoryList" :key="index" class="menu-item" :class="{'active': menuIdex === index}" @click="selectMenu(index)" ref="menuList">
                <img v-if="shop.iconUrl" width="15px" height="15px" :src="shop.iconUrl">
                <span>{{shop.categoryName}}</span>
              </li>
            </ul>
          </div>
          <div class="food-wrapper" ref="foodWrapper">
            <ul>
              <li v-for="(shop,index) in categoryList" :key="index" class="food-list" ref="foodList">
                <h1>{{shop.categoryName}}</h1>
                <ul>
                  <li v-for="food in shop.spuList" :key="food.spuId" class="food-item" @click="selectFood(food,'food')">
                    <img class="icon" height="75px" width="75px" :src="food.littleImageUrl">
                    <section class="content">
                      <h2 class="name">{{food.spuName}}</h2>
                      <p class="desc">{{food.spuDesc}}</p>
                      <p class="sale-num"><span>月售{{food.saleVolumeDecoded}}</span><span class="praise">赞{{food.praiseNumDecoded}}</span></p>
                      <div class="price-unit">
                        <p><span class="price">￥{{food.currentPrice}}</span>/{{food.unit}}&nbsp;起&nbsp;<span class="origin">{{food.originPrice}}</span></p>
                        <div class="cartcontrol-wrapper">
                          <div v-if="food.spuAttrList.length>0" class="specification" @click.stop="selectFood(food,'specification')">选规格</div>
                          <cart-control v-else :food='food' :shopId='shopId'></cart-control>
                        </div>
                      </div>
                      <div v-if="food.spuPromotionInfo" class="promotion">
                        <span>{{food.spuPromotionInfo}}</span>
                        <img v-for="(picture,index) in food.productLabelPictureList" :key="index" :src="picture.pictureUrl" width="30" height="15">
                      </div>
                    </section>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
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
    <food-detail ref="food" :shopId='shopId' :food="foodDetail"></food-detail>
    <shop-cart v-show="changeShowType === 'food'" :shopId="shopId" :minFee='shopInfo.minFee' :deliveryFee='shopInfo.deliveryFee'></shop-cart>
    <pics :images="pictures" :index="picIndex" ref="pics"></pics>
    <router-view :shopId="state.shopId"></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Swiper from 'swiper';
import BScroll from 'better-scroll';
import { getFood, getComments, getShopInfo } from '../../service/api';
import star from '@/components/star';
import { Bulletin } from './children';
import ShopDetail from './detail';
import foodDetail from './children/foodDetail.vue';
import shopcart from './children/shopCart.vue';
import cartcontrol from '../_components/cartcontrol';
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
      categoryList: [], // 食物列表
      shopInfo: {}, // 商家详情
      foodDetail: {}, // 食物详情
      commentList: [], // 评论列表
      commentLabels: [], // 评论Tag列表
      commentScores: '', // 商铺评论详情
      foodsHeight: [], // food元素的高度
      labelId: 0, // 评论Tag Id
      changeShowType: 'food', // 选项卡
      distanceX: 0, // tab切换下标
      menuIdex: 0, // menu选中Index
      menuIndexChange: true,
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
    Promise.all([store.getShopInfo(shopId)]).then(result => {
      this.initPlug();
      this.$loading.hide();
    })

    getFood().then(res => {
      this.categoryList = res.data.categoryList;
      this.shopInfo = res.data.shopInfo;
      this.$nextTick(() => {
        this.initPlug();
        this.calculateHeight();
      });
    });
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
  computed: {
    selectFoods() {
      let foods = [];
      this.categoryList.forEach(good => {
        good.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    ...mapMutations(['INIT_BUYCART']),
    $$conversion(promotionType) {
      const item = $$conversion(_activity, promotionType, true)
      return item?.icon
    },
    initPlug() {
      // 轮播
      // eslint-disable-next-line no-new
      new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: true
      });
      // 滚动
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
        click: true,
        bounce: false
      });
      // 食物滚动
      this.foodWrapper = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodWrapper.on('scroll', pos => {
        if (pos.y <= 0) {
          let scrollY = Math.abs(Math.round(pos.y));
          for (let i = 0; i < this.foodsHeight.length; i++) {
            let height1 = this.foodsHeight[i];
            let height2 = this.foodsHeight[i + 1];
            if (this.menuIndexChange && (scrollY >= height1 && scrollY < height2)) {
              this.menuIdex = i;
              this.followScroll(i);
            }
          }
        }
      });
    },

    selectMenu(index) {
      this.menuIdex = index;
      // 控制menu重复设置
      this.menuIndexChange = false;
      this.followScroll(index);
      // 食物滚动
      this.foodWrapper.scrollToElement(this.$refs.foodList[index], 300);
      this.foodWrapper.on('scrollEnd', () => {
        this.menuIndexChange = true;
      });
    },
    selectFood(food, chooseType) {
      this.foodDetail = food;
      this.$refs.food.chooseType = chooseType;
      this.$refs.food.show();
    },
    // 获取food高度集合
    calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.foodsHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.foodsHeight.push(height);
      }
    },
    followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.menuWrapper.scrollToElement(el, 300, 0, -100);
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
    }
  },
  components: {
    star,
    Bulletin,
    ShopDetail,
    'food-detail': foodDetail,
    'cart-control': cartcontrol,
    'shop-cart': shopcart,
    pics
  }
};
</script>
