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
                <star :size='1' :score="shop.wmPoiScore / 10" ></star>
                <span class="score">{{shop.wmPoiScore / 10}}</span>
                <span>{{shop.monthSalesTip}}</span>
             </div>
             <div class="rating_num_right">
               <span>{{shop.deliveryTimeTip}}</span>
               <span class="segmentation">{{shop.distance}}</span>
             </div>
           </div>
           <div class="price">
              <span>{{shop.minPriceTip}}</span>
              <span class="segmentation">{{shop.shippingFeeTip}}</span>
              <span class="segmentation">{{shop.averagePriceTip}}</span>
           </div>
            <div class="discount">
              <p v-for="(dis,index) in shop.discounts2" :key="index">
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
import { getShopList } from '../service/api';
import star from './star.vue';

export default {
  data() {
    return {
      shopList: []
    };
  },
  created() {
    getShopList().then((res) => {
      this.shopList = res.data.shopList;
    });
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
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
