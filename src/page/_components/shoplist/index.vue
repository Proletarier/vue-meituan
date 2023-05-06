<template>
  <div class="shop_list">
    <ul>
      <li v-for="shop in shopList" :key="shop.mtWmPoiId" class="shop_li" @click="gotoAddress({path: 'menu',query: {shopId: shop.id}})">
        <div class="icon">
          <img :src="shop.picUrl">
        </div>
        <div class="content">
           <h2 class="title">{{shop.shopName}}</h2>
           <div class="rating_num_time">
             <div class="rating_num_left">
                <star :size='1' :score="shop.shopScore" ></star>
                <span class="score">{{shop.shopScore}}</span>
                <span>月售{{shop.monthSalesTip}}</span>
             </div>
             <div class="rating_num_right">
               <span>{{shop.deliveryTimeTip}}47分钟</span>
               <span class="segmentation">{{shop.distance}}</span>
             </div>
           </div>
           <div class="price">
              <span>起送{{shop.minPriceTip}}</span>
              <span class="segmentation">配送{{shop.shippingFeeTip}}</span>
              <span class="segmentation">人均{{shop.averagePriceTip}}</span>
           </div>
            <div class="discount swiper-container">
                <ul class="swiper-wrapper">
                    <li v-for="(dis,index) in shop.discountList" :key="index" class="swiper-slide">
                      <img :src="$$conversion(dis.promotionType)" alt="">
                      <span>{{dis.info}}</span>
                    </li>
                </ul>   
           </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import service from '@/service';
import star from '@/components/star/index.vue';
import { _activity } from '@/common/config';
import { $$conversion } from '@/common/utils';
import './index.styl';

export default {
  props: {
    shopList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return { 
      filter:{
        location : undefined,
        distanceSort: undefined,
        salesSort:undefined,
        exclusiveDelivery:undefined,
        feature:undefined,
        averagePrice:undefined,
        activity:undefined
      }
    };
  },
  created() {
    this.$nextTick(() => {
         this.initPlug();
    });
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
     $$conversion(promotionType){
       const item = $$conversion(_activity,promotionType,true)
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
    },
    gotoAddress(path) {
      this.$router.push(path);
    },
  },
  computed:{

  },
  components: {
    star
  }
};
</script>