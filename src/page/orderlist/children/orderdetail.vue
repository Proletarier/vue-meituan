<template>
  <div>
     <div class="order-status">
       <div class="status">
         <span>已完成</span>
       </div>
       <p class="desc">感谢您对美团外卖的信任，期待再次光临。</p>
       <div class="bottom">再来一单</div>
     </div>
     <section class="order-detail">
        <header class="title">订单明细</header>
        <div class="content">
          <div class="shopInfo">
            <div class="name">
              {{orderDetail.shopInfo.name}}
            </div>
            <div class="phone">
              <a :href="`tel:${orderDetail.shopInfo.phone}`"/>
            </div>
          </div>
          <div v-for="(food,index) in orderDetail.dishes" :key="index" class="dishes">
              <img :src="food.activityIcon" class="icon">
              <span class="name">{{food.name}}</span>
              <span class="count">{{food.count}}份</span>
              <span class="origin-price">￥{{food.originPrice}}</span>
              <span class="price">￥{{food.price}}</span>
          </div>
          <div class="dishes">
            <span class="name">餐盒费</span>
            <span class="price">￥{{orderDetail.boxFee}}</span>
          </div>
          <div class="dishes dishes-item">
            <span class="name">配送费</span>
            <span class="price">￥{{orderDetail.delFee}}</span>
          </div>
          <div v-for="(item,index) in orderDetail.activities" :key="index" class="activityitem">
            <img :src="item.iconUrl" class="icon">
            <span class="name">{{item.name}}</span>
            <span class="price">{{item.desc}}</span>
          </div>
          <div class="pay-price">
            <span class="total">总计：￥{{orderDetail.totalPrice}}</span>
            <span class="discount">优惠：<span class="label">-￥{{orderDetail.discountPrice}}</span></span>
            <span class="actual">实付: <span class="label">￥{{orderDetail.payPrice}}</span></span>
          </div>
        </div>
     </section>
     <section class="order-delivery">
       <header class="title">配送信息</header>
       <div class="content">
         <div class="delivery">
           <span class="label">配送信息</span>
           <span>{{orderDetail.deliveryTimeDesc}}</span>
         </div>
         <div class="receiver">
           <span class="label">配送地址</span>
           <div class="address">
             <p>
               <span>{{orderDetail.receiver.name}}</span>
               <span>{{orderDetail.receiver.phone}}</span>
             </p>
             <p>
              <span>{{orderDetail.receiver.address}}</span>
             </p>
           </div>
         </div>
         <div class="delivery">
           <span class="label">订单编号</span>
           <span>{{orderDetail.mtOrderViewId}}</span>
         </div>
         <div class="delivery">
           <span class="label">下单时间</span>
           <span>{{orderDetail.createTime}}</span>
         </div>
         <div class="delivery">
           <span class="label">支付方式</span>
           <span>{{orderDetail.payType}}</span>
         </div>
       </div>
     </section>
     <div class="issue"></div>
  </div>
</template>

<script>
import { orderDetail } from '../../../service/api';

export default {
  data() {
    return {
      orderId: '',
      orderDetail: Object
    };
  },
  created() {
    this.orderId = this.$route.query.orderid;
    orderDetail().then(res => {
      this.orderDetail = res.data;
    });
  }
};
</script>

<style lang="stylus">
@import "../../../style/mixin.styl";

  .order-status
    padding-top 15px
    .status
      margin 0 auto
      width 70px
      position relative
      font-size 18px
      line-height 18px
      margin-bottom 10px
      &:after
        display block
        content ''
        position absolute
        height 9px
        width  9px
        right 0px
        top 50%
        transform translateY(-50%) rotate(225deg)
        border 1px solid #333
        border-top none
        border-right none
    .desc
      font-size 15px
      text-align center
      margin-bottom 20px
    .bottom
      margin 0 auto
      margin-bottom 20px
      width 90px
      height 35px
      line-height 35px
      text-align center
      background #ffd161
      border-radius 4px
  .order-detail
    .title
      text-indent 15px
      font-size 15px
      line-height 30px
      background #f0f0f0
    .content
      .shopInfo
        display flex
        align-items center
        padding 5px 15px
        border-1px(rgba(240,240,240,1))
        .name
          flex 1
          position relative
          font-size 16px
          height 35px
          line-height 35px
          border-right 1px solid #f1f0f0
          &:after
            display block
            content ''
            position absolute
            width 10px
            height 10px
            right 20px
            top 50%
            border 3px solid #bdbdbd
            border-top none
            border-right none
            transform translateY(-50%) rotate(225deg)
        .phone
            position relative
            background url(../../../images/phone.png) no-repeat
            background-size contain
            width 20px
            height 20px
            margin-left 15px
            a
             position absolute
             top 0
             left 0
             right 0
             bottom 0
      .dishes
        display flex
        align-items center
        padding 0 15px
        font-size 14px
        line-height 32px
        .icon
          margin-right 10px
          width 16px
          height 16px
        .name
          width 50%
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
        .count
          width 10%
          text-align left
        .origin-price
          flex 1
          text-align right
          color #999
          text-decoration line-through
        .price
          flex 1
          text-align right
      .dishes-item
        height 41px
        border-top 1px solid #f0f0f0
        border-bottom 1px solid #f0f0f0
        margin-bottom 10px
      .activityitem
        display flex
        align-items center
        padding 0 15px
        font-size 12px
        margin-bottom 5px
        .icon
          margin-right 10px
          width 18px
          height 18px
        .name
          color #777777
        .price
          flex 1
          text-align right
      .pay-price
        display flex
        align-items center
        padding 10px 15px
        border-top 1px solid #f0f0f0
        font-size 14px
        .total
          margin-right 10px
        .discount
          flex 1
          .label
            color #ffcd52
        .actual
          flex 1
          text-align right
          .label
            color #ffcd52
  .order-delivery
    .title
      text-indent 15px
      font-size 15px
      line-height 30px
      background #f0f0f0
    .content
        padding-left 15px
        .delivery
          height 40px
          line-height 40px
          font-size 15px
          border-1px(rgba(240,240,240,1))
          .label
            margin-right 10px
        .receiver
          display flex
          padding 5px 0
          border-1px(rgba(240,240,240,1))
          .label
            line-height 30px
            margin-right 10px
          .address
            font-size 15px
            p
             line-height 30px
</style>
