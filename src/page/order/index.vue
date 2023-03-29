<template>
  <div class="order_container">
      <ul class="order_list_ul">
        <li v-for="order in orderList" :key="order.orderId" class="order_list_li" @click="showDetail(order.orderId)">
          <section class="item">
            <header>
              <img :src="order.img">
              <div class="title">
                <p class="shop_name">{{order.shopName}}</p>
              </div>
            </header>
            <article>
              <p v-for="(product,index) in order.productList" :key="index">
                <span>{{product.productName}}</span>
                <span>x{{product.productCount}}</span>
              </p>
              <p>
                <span class="order_time">{{order.orderTime}}</span>
                <span>实付￥{{order.totalPrice}}</span>
              </p>
            </article>
            <footer>
              <div class="foot_left">
                {{order.orderStatusStr}}
              </div>
              <div class="foot_right">
                <div class="delete">删除</div>
                <div class="button">再来一单</div>
              </div>
            </footer>
          </section>
        </li>
      </ul>
    <footguide></footguide>
  </div>
</template>

<script>
import { getOrderList } from '../../service/api';
import footguide from '../_components/footguide';

export default {
  data() {
    return {
      orderList: [] // 订单列表
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getOrderList().then(res => {
        this.orderList = res.data.orderList;
      });
    },
    showDetail(orderId) {
      this.$router.push({ path: 'orderdetail', query: { orderid: orderId } });
    }
  },
  components: {
    footguide
  }
};
</script>

<style lang="stylus">
@import "../../style/mixin.styl";
  .order_container
     background #f0f0f0
    .order_list_ul
      .order_list_li
        background #fff
        margin-bottom 10px
        border-top 1px solid #d7d7d7
        border-bottom 1px solid  #d7d7d7
        .item
          padding 0 15px
          header
            display flex
            padding 10px 0
            border-1px(rgba(215,215,215,0.5))
            img
              width 35px
              height 35px
              margin-right 10px
              border-radius 50%
            .title
              flex 1
              padding 5px 0 5px 0
              .shop_name
                max-width 200px
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                font-size 16px
                color #323232
              &:after
                border: #999 solid 2px;
                position: absolute;
                right: 0;
                top: 50%;
                margin-top: -5px;
                display: block;
                content: '';
                width: 8px;
                height: 8px;
                border-top: none;
                border-right: none;
                transform: rotate(225deg);
          article
            padding 10px 0
            border-1px(rgba(215,215,215,0.5))
            p
              display flex
              justify-content space-between
              font-size 14px
              line-height 25px
              .order_time
                font-size 12px
                color #999
          footer
            display flex
            padding 10px 0
            justify-content space-between
            .foot_left
              color #999
              font-size 14px
              padding 5px
            .foot_right
              .delete
                display inline-block
                background #fff
                border 1px solid #ddd
                border-radius 3px
                padding 5px
                margin-right 15px
              .button
                display inline-block
                padding 5px
                border 1px solid #FFD161
                border-radius 3px
                background #FFD161
                color #333

</style>
