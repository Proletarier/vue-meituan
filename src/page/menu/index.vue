<template>
  <div style="display: flex;flex-direction: column;position: absolute;right: 0;left: 0;height: 100%;">
    <div class="shop-info">
      <div class="avatar">
        <img width="85" height="64" :src="shopInfo.shopPic">
      </div>
      <div class="content">
        <div class="delivery">
            <span class="time">{{shopInfo.deliveryTimeDecoded}}分钟</span>
            <span>{{shopInfo.distance}}</span>
            <i v-if="shopInfo.deliveryType" class="zhuansong"></i>
        </div>
        <div class="bulletin">
          公告：{{shopInfo.bulletin}}
        </div>
        <div class="activity" @click="showShopDetail()">
          <div class="swiper-container">
            <ul class="swiper-wrapper">
              <li class="swiper-slide" v-for="(item,index) in shopInfo.activityList" :key="index">
                 <img width="15" height="15" :src="item.iconUrl">
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
        <!-- 点菜 -->
        <section class="food-container">
            <div class="menu-wrapper" ref="menuWrapper">
              <ul>
                <li v-for="(shop,index) in categoryList" :key="index" class="menu-item"
                :class="{'active': menuIdex === index}" @click="selectMenu(index)" ref="menuList">
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
                            <cart-control v-else  :food='food' :shopId='shopId'></cart-control>
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
        <!--评价 -->
        <section class="comment-container" ref="comments">
          <div>
            <header class="comment-hdaer">
              <div class="score">
                <p class="shop-score">{{commentScores.shopScore}}</p>
                <p>商家评分</p>
              </div>
              <div class="score" style="flex:2">
                <p class="quality">
                  <span>口味</span> <star :score="commentScores.qualityScore"></star><span>{{commentScores.qualityScore}}</span>
                </p>
                <p class="pack">
                  <span>包装</span> <star :score="commentScores.packScore"></star><span>{{commentScores.packScore}}</span>
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
                  <img v-else  src='../../images/userpic_defalut.png' width="40px">
                </div>
                <section class="comment-list-details">
                  <p class="name">{{comment.userName}} <span class="time">{{comment.commentTime}}</span></p>
                  <p class="delivery">{{comment.deliveryTime}}</p>
                  <p class="content">{{comment.content}}</p>
                  <div class="pics">
                    <img class="pic" v-for="(pic,index) in comment.pictures" :key="index" :src="pic.smallPicUrl"  @click="seletPic(comment.pictures,index)">
                  </div>
                  <p v-if="comment.praiseDish" class="dish">
                  <svg width='20' height='20'>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#praise"></use>
                  </svg>{{comment.praiseDish}}
                  </p>
                  <p v-if="comment.label" class="label">
                    <svg width='20' height='20'>
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#label"></use>
                    </svg>{{comment.label}}</p>
                  <p v-if="comment.shopReply" class="reply">{{comment.shopReply}}</p>
                </section>
              </li>
            </ul>
          </div>
        </section>
        <!--商家 -->
        <section class="seller-container">
          <div class="info">
             <p class="detail">
               <img src="../../images/site.png" height="16">
               <span>{{seller.shopAddress}}</span>
               <a v-if="seller.shopPhone" :href="`tel:${seller.shopPhone.toString()}`" class="phone"></a>
             </p>
              <p class="detail link" v-if="seller.poiQualificationInfo">
                <img src="../../images/dangan.png" height="16">
              <router-link to="/menu/qualification">
                <span>{{seller.poiQualificationInfo.content}}</span>
              </router-link>
             </p>
          </div>
          <div class="info">
             <p class="detail">
               <img src="../../images/wj.png" height="16">
               <span>配送服务：<i class="peisong"></i>提供高品质配送服务</span>
             </p>
             <p class="detail" v-if="seller.poiQualificationInfo">
               <img src="../../images/time.png" height="16">
               <span v-if="seller.serTime">配送时间：{{seller.serTime.toString()}}</span>
             </p>
          </div>
          <div class="info">
             <p class="detail link" @click="showShopDetail()">
               <img src="../../images/sy.png" height="16">
               <span>{{seller.tip}}</span>
             </p>
             <p class="detail" v-if="seller.poiQualificationInfo">
               <img src="../../images/fw.png" height="16">
               <span>商家服务：该商户支持在线支付</span>
             </p>
             <ul style="margin-bottom:15px">
                <li class="activity" v-for="(activity,index) in seller.activityList" :key="index">
                  <img :src="activity.iconUrl" width="15" height="15"> <span>{{activity.actDesc}}</span>
                </li>
             </ul>
          </div>
        </section>
      </div>
    </div>
    <transition name="fade">
      <div class="screen-cover" @click="hideList" v-show="listShow"></div>
    </transition>
    <shop-detail :shopInfo='shopInfo' ref="shopDetail"></shop-detail>
    <food-detail ref="food" :shopId='shopId' :food="foodDetail"></food-detail>
    <shop-cart v-show="changeShowType === 'food'" :shopId="shopId" :minFee='shopInfo.minFee' :deliveryFee='shopInfo.deliveryFee'></shop-cart>
    <pics :images="pictures" :index="picIndex" ref="pics"></pics>
    <router-view :shopId='this.shopId'></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Swiper from 'swiper';
import BScroll from 'better-scroll';
import { getFood, getComments, getShopInfo } from '../../service/api';
import star from '@/components/star';
import shopDetail from './children/shopDetail.vue';
import foodDetail from './children/foodDetail.vue';
import shopcart from './children/shopCart.vue';
import cartcontrol from '../_components/cartcontrol';
import pics from '@/components/pics';
import 'swiper/css/swiper.min.css';

export default {
  data() {
    return {
      shopId: '', // 商家id
      categoryList: [], // 食物列表
      shopInfo: {}, // 商家详情
      seller: {}, // 商家详情
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
      picIndex: 0 // pic index
    };
  },
  created() {
    this.shopId = this.$route.query.shopId;
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
    getShopInfo().then(res => {
      this.seller = res.data;
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
    'shop-detail': shopDetail,
    'food-detail': foodDetail,
    'cart-control': cartcontrol,
    'shop-cart': shopcart,
    pics
  }
};
</script>

<style lang="stylus">
@import "../../style/mixin.styl";
  .shop-info
    width 100%
    background-color #2E2F3B
    padding 50px 10px 10px 10px
    box-sizing border-box
    display flex
    .avatar
      margin-right 10px
      img
        border-radius 2px
    .content
      padding-top 2px
      flex 1
      overflow hidden
      color #ffffff
      .delivery
        position relative
        font-size 12px
        line-height 12px
        .time
          position relative
          margin-right 10px
          &:after
            content ''
            display inline-block
            height 12px
            width 1px
            position absolute
            right -6px
            top 3px
            background #fff
            transform scale(0.7)
        .zhuansong
          position absolute
          top 0
          right 0
          display inline-block
          width 50px
          height 15px
          background-image url(../../images/zhuansong.png)
          background-repeat no-repeat
          background-size 50px 15px
      .bulletin
        padding-top 10px
        padding-bottom 10px
        font-size 12px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .activity
        position relative
        font-size 12px
        line-height 12px
        .swiper-container
          height 14px
          z-index 0
          img
            display inline-block
            vertical-align top
            margin-right 3px
        .arrow-right
          position absolute
          width 13px
          height 13px
          top 0
          right 0
  .tab
    position relative
    display flex
    min-height 40px
    border-1px(rgba(228,228,228,0.5))
    .tab-item
      flex 1
      position relative
      height 40px
      line-height 40px
      text-align center
    .active
      position absolute
      display inline-block
      bottom 2px
      left 0
      width 100%
      transition 0.2s ease-in
      transform translateX(0%)
      &:after
        content ''
        position absolute
        display inline-block
        margin-left -10px
        left 50%
        height 2px
        width 20px
        background #ffd300
  .shop-container
    flex 1
    overflow hidden
    .shop-tab
      display flex
      width 100%
      height 100%
      transition-duration: 200ms;
      .food-container
        width 100%
        flex 0 0 auto
        display flex
        overflow hidden
        .menu-wrapper
          width 80px
          margin-bottom 50px
          background: #f5f5f5
          .menu-item
              min-height 49px
              padding 10px
              color #666666
              box-sizing: border-box;
              padding-top: 9px;
              padding-bottom: 22px;
              &.active
                background #fff
                font-weight bold
                color #000
              span
                display inline-block
                font-size 13px
                line-height 18px
                padding-left 3px
                vertical-align top
        .food-wrapper
          flex 1
          margin-bottom 50px
          position: relative;
          padding-left 10px
          overflow-y hidden
          .food-list
            h1
             height 36px
             line-height 36px
             width 100%
             font-size 12px
             font-weight normal
            .food-item
              display flex
              margin-bottom 20px
              &:last-child
                margin-bottom 0
              .icon
                margin-top 3px
                margin-right 10px
              .content
                flex 1
                position relative
                padding-right 10px
                min-height 62px
                padding-bottom 40px
                overflow hidden
                .name
                  overflow hidden
                  text-overflow ellipsis
                  color #333333
                  font-size 16px
                  line-height 22px
                  -webkit-line-clamp 2
                  -webkit-box-orient vertical
                  display -webkit-box
                .desc
                  font-size 11px
                  line-height 15px
                  color #333333
                  margin 3px 0
                  overflow hidden
                  text-overflow ellipsis
                  white-space nowrap
                .sale-num
                  font-size 11px
                  line-height 15px
                  color #666
                  margin 3px 0
                  .praise
                    margin-left 10px
                .price-unit
                  position absolute
                  width 100%
                  color #a9a9a9
                  font-size 11px
                  bottom 20px
                  text-align left
                  text-indent -3px
                  .price
                    color #fb4e44
                    font-size 18px
                    line-height 22px
                    font-weight 600
                  .origin
                    text-decoration line-through
                .promotion
                  position absolute
                  bottom 0
                  width 100%
                  span
                    display inline-block
                    padding 0 5px
                    margin-right 3px
                    border 1px solid #fb4e44
                    color #fb4e44
                    font-size 10px
                    line-height 13px
                    vertical-align top
      .comment-container
        width 100%
        flex 0 0 auto
        overflow hidden
        background rgb(244,244,244)
        .comment-hdaer
          display flex
          justify-content space-between
          padding 15px 0
          margin-bottom 10px
          background #fff
          .score
            flex 1
            display flex
            flex-direction column
            justify-content space-between
            min-height 50px
            color #999999
            font-size 12px
            text-align center
            &:first-child
              margin-right 20px
            &:nth-child(2)
              position relative
              &:after
                content ''
                height 50px
                width 1px
                display inline-block
                position absolute
                right 0
                background #e4e4e4
                transform: scale(0.5, 1);
            .shop-score
              font-size 27px
              color #ffb000
            .quality,.pack
              text-align left
              color #333
              span:first-child
                margin-right 10px
              span:last-child
                margin-left 10px
                color #ffb000
            .quality
              line-height 20px
            .delivery
              font-size  27px
        .comment-label
          background #fff
          padding-top 15px
          padding-left 15px
          border-1px(rgba(228,228,228,0.5))
          .label-item
            display inline-block
            padding 5px 10px
            margin-right 10px
            margin-bottom 15px
            border 1px solid #dddddd
            border-radius 20px
            font-size 14px
            color #333
            &.active
              background #fffbf1
              color #FFB000
        .comment-list
          background #fff
          .comment-list-li
            padding-top 15px
            padding-left 15px
            display flex
            border-1px(rgba(228,228,228,0.5))
            .icon img
              width 40px
              height 40px
              border-radius 50%
              margin-right 15px
            .comment-list-details
              padding-right 15px
              padding-bottom 10px
              box-sizing border-box
              .name
                font-size 16px
                line-height 16px
                color #2f2f2f
                .time
                  font-size 12px
                  color #898989
                  float right
              .delivery
                color #666666
                font-size 12px
                line-height 20px
              .content
                margin-top 10px
                margin-bottom 10px
                font-size 14px
                line-height 20px
                color #2f2f2f
              .pic
                display inline-block
                margin-right 5px
                margin-bottom 5px
                width 80px
                height 80px
              .dish,.label
                margin-bottom 3px
                font-size 12px
                line-height 20px
                color #999
                svg
                  vertical-align bottom
                  margin-right 5px
              .reply
                 padding 5px
                 margin-bottom 10px
                 font-size 12px
                 line-height 16px
                 letter-spacing 1px
                 color #666666
                 background #f4f4f4
      .seller-container
        width 100%
        flex 0 0 auto
        .info
          padding-left 15px
          padding-right 15px
          border 1px solid transparent
          border-1px(rgba(228,228,228,0.5))
          .link
            position relative
            padding-right 20px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            &:after
              content ''
              display inline-block
              width 6px
              height 11px
              position absolute
              right 0
              top 5px
              background url(../../images/arrow-r.png)
              background-size 6px 11px
          .detail
            font-size 14px
            line-height 20px
            margin 18px 0
            .peisong
              display inline-block
              width 50px
              height 15px
              margin-top 2px
              margin-right 10px
              background url(../../images/zhuansong.png)
              background-repeat: no-repeat;
              background-size 50px 15px
              vertical-align top
            .phone
              display inline-block
              float right
              width 20px
              height 20px
              background url(../../images/phone.png)
              background-size 100% 100%
              vertical-align middle
            img
              margin-right 10px
              vertical-align middle
          .activity
            font-size 14px
            line-height 25px
            img
              vertical-align middle
  .screen-cover
    position fixed
    z-index 30
    top 0
    bottom 0
    width: 100%
    height: 100%
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
  .cartcontrol-wrapper
    position absolute
    right 10px
    top 0
    z-index 10
    .specification
      padding 0 10px
      background #ffc132
      background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%);
      border-radius 25px
      font-size 12px
      line-height 25px
      color #333
</style>
