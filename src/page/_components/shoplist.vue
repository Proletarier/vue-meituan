<template>
  <div class="shop_list">
    <ul>
      <li v-for="shop in shopList" :key="shop.mtWmPoiId" class="shop_li" @click="gotoAddress({path: 'menu',query: {shopId: shop.mtWmPoiId}})">
        <div class="icon">
          <img :src="shop.picUrl">
        </div>
        <div class="content">
           <h2 class="title">{{shop.shopName}}</h2>
           <div class="rating_num_time">
             <div class="rating_num_left">
                <star :size='1' :score="shop.shopScore" ></star>
                <span class="score">{{shop.shopScore}}</span>
                <span>月售{{shop.monthSalesTip}}+</span>
             </div>
             <div class="rating_num_right">
               <span>{{shop.deliveryTimeTip}}47分钟</span>
               <span class="segmentation">{{shop.distance}}1.9km</span>
             </div>
           </div>
           <div class="price">
              <span>起送{{shop.minPriceTip}}</span>
              <span class="segmentation">配送{{shop.shippingFeeTip}}</span>
              <span class="segmentation">人均{{shop.averagePriceTip}}</span>
           </div>
            <div class="discount">
              <p v-for="(dis,index) in shop.discountList" :key="index">
                <img :src="dis.iconUrl" alt="">
                <span>{{dis.info}}</span>
              </p>
           </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getShopList } from '../../service/api';
import service from '@/service';
import star from '../../components/star.vue';

export default {
  data() {
    return {
      shopList: []
    };
  },
  created() {
    //  getShopList({}).then((data) => {
    //      this.shopList = data.data.shopList;
    //   });
    this.getNearShop();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
    getNearShop(){
      service.nearShop({}).then((data) => {
         this.shopList = data;
      });
    }
  },
  components: {
    star
  }
};
</script>

<style lang="stylus">
 .shop_list
   margin-bottom 40px
   ul
     .shop_li
       display flex
       padding 0 10px
       margin-top 10px
       margin-bottom 25px
       .icon
         margin-right 8px
         img
           width 76px
           height 57px
           border-radius 2px
       .content
         flex 1 0
         min-width 0
         .title
           width:80%
           font-size 16px
           color #333
           line-height 1.4
           white-space nowrap
           overflow hidden
           text-overflow ellipsis
           font-weight 600
         .rating_num_time
            display flex
            justify-content space-between
            margin-top 4px
            font-size 11px
            color #333
            line-height 1.4
            .rating_num_left
              display flex
              .score
                margin-left 5px
                margin-right 10px
         .price
           margin-top 4px
           font-size: 11px;
           color: #333;
           line-height: 1.4;
         .discount
           max-height 46px
           overflow hidden
           p
             display flex
             align-items center
             margin-top 8px
             img
               width 15px
               height 15px
               margin-right 5px
             span
               color #666
               font-size 11px
               line-height 1.4
         .segmentation
           &:before
             content: "";
             display: inline-block;
             margin: 0 3px;
             height: 6px;
             width: 1px;
             background: #ccc;
</style>
