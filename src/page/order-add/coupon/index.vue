<template>
  <div>
    <transition name="fold">
      <div class="coupons" v-if="fold" @click.self="toggleList">
        <div class="outerList">
          <dl class="couponList" v-if="usableCoupon.length > 0">
            <dt class="titleBox">
              <span class="couponTitle">可使用红包</span>
              <span class="couponLength">{{usableCoupon.length}}张</span>
            </dt>
            <div class="couponContent">
              <div class="container" v-for="(coupon,index) in usableCoupon" :key="index" style="position: relative;">
                <div  v-if="coupon.title.indexOf('神卷') !== -1 || coupon.title.indexOf('红包') !== -1" class="logoPart">{{coupon.title.indexOf('神卷')? '神卷' :'会员红包'}}</div>
                <div class="topPart">
                  <div class="content">
                    <div class="topLine">
                      <div class="name">{{coupon.title}}</div>
                      <div class="disContainer">
                        <div class="yuan">¥</div>
                        <div class="discount">{{coupon.amount}}</div>
                      </div>
                    </div>
                    <div class="bottomLine">
                      <div class="limitTime">{{coupon.timeLimit}}</div>
                      <div class="discountDesc">{{coupon.priceLimit}}</div>
                    </div>
                  </div>
                  <div @click="setCouponId(coupon.id)" class="select" :class="selectCouponId === coupon.id? 'selected' : 'canceled'" ></div>
                </div>
                <div class="bottomPart">
                  <div class="ulContainer" @click.stop="foldLimits(index)">
                    <div class="useLimits" :class="{closed: foldLimitsIndexs.indexOf(index) == -1 }">
                      {{coupon.useLimits}}
                    </div>
                    <img class="arrow" :class="{rotate: foldLimitsIndexs.indexOf(index) >= 0 }" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAANBJREFUOBFjYBgFoyEADoFt27axgzAxwcFISNGcOXNU/v79e4WRkZGBiYlJJyUl5Q4+PUz4JKGGHQCqYf///z870OADIDF8enC6EMkwaaDrDoMMARpqC6SeMjMzO+ByKVYXohl2kIODwxOEgQYfBBoojc+lGC5ctGgR948fP24AXSMDMgBokHdcXNxXkAuhcluBcvZAuSdAOQ2YHEgeBDBc+P37dz6guCBQw25kw0CKQZpBYiA5kBqgS3lB4gTBqlWrOAkpIkYNITNG5YdqCAAADbteKk49CTcAAAAASUVORK5CYII=">
                  </div>
                </div>
              </div>
            </div>
          </dl>
          <dl class="couponList" v-if="invalidCoupon.length > 0">
            <dt class="titleBox">
              <span class="couponTitle">不可使用红包</span>
              <span class="couponLength">{{invalidCoupon.length}}张</span>
            </dt>
            <div class="couponContent">
              <div class="container" v-for="(coupon,index) in invalidCoupon" :key="index" style="position: relative;">
                <div  v-if="coupon.title.indexOf('神卷') >= 0 || coupon.title.indexOf('红包') >= 0" class="logoPart">{{coupon.title.indexOf('神卷') !== -1 ? '神卷' :'会员红包'}}</div>
                <div class="topPart topPartAfter">
                  <div class="content">
                    <div class="topLine">
                      <div class="name">{{coupon.title}}</div>
                      <div class="disContainer">
                        <div class="yuan">¥</div>
                        <div class="discount">{{coupon.amount}}</div>
                      </div>
                    </div>
                    <div class="bottomLine">
                      <div class="limitTime">{{coupon.timeLimit}}</div>
                      <div class="discountDesc">{{coupon.priceLimit}}</div>
                    </div>
                  </div>
                  <div class="select invalid"></div>
                </div>
                <div class="bottomPart">
                  <div class="ulContainer" @click.stop="foldLimits(index)">
                    <div class="useLimits" :class="{closed: foldLimitsIndexs.indexOf(index) == -1 }">
                      <span style="color: rgb(255, 74, 38);">本单不可使用原因：</span>
                      <br/>
                      <span style="color: rgb(34, 36, 38);">{{coupon.useLimits}}</span>
                    </div>
                    <img class="arrow" :class="{rotate: foldLimitsIndexs.indexOf(index) >= 0 }" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAANBJREFUOBFjYBgFoyEADoFt27axgzAxwcFISNGcOXNU/v79e4WRkZGBiYlJJyUl5Q4+PUz4JKGGHQCqYf///z870OADIDF8enC6EMkwaaDrDoMMARpqC6SeMjMzO+ByKVYXohl2kIODwxOEgQYfBBoojc+lGC5ctGgR948fP24AXSMDMgBokHdcXNxXkAuhcluBcvZAuSdAOQ2YHEgeBDBc+P37dz6guCBQw25kw0CKQZpBYiA5kBqgS3lB4gTBqlWrOAkpIkYNITNG5YdqCAAADbteKk49CTcAAAAASUVORK5CYII=">
                  </div>
                </div>
              </div>
            </div>
          </dl>
          <p class="noMorePromotion">没有更多优惠券了 <span>查看无效券 &gt;&gt;</span></p>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="coupons-mask" v-if="fold" ></div>
    </transition>
  </div>
</template>

<script>


import './index.styl';
export default {
  props: {
    couponDetailVos: {
      type: Array,
      default: []
    }
  },
  created() {
  },
  data() {
    return {
      fold: false,
      foldLimitsIndexs: [],
      selectCouponId: undefined
    };
  },
  methods: {
    toggleList() {
      this.fold = !this.fold;
    },
    foldLimits(val) {
      let index = this.foldLimitsIndexs.indexOf(val);
      if (index > -1) {
        this.foldLimitsIndexs.splice(index, 1);
      } else {
        this.foldLimitsIndexs.push(val)
      }
    },
    setCouponId(couponId){
      this.selectCouponId = couponId;
      this.$emit('orderPreView', { customerCouponId: couponId });
      this.toggleList()
    }
  },
  computed: {
    usableCoupon() {
      if (this.couponDetailVos && this.couponDetailVos.length) {
        return this.couponDetailVos.find(item => item.couponValid === 1).couponInfoList
      } else {
        return []
      }
    },
    invalidCoupon() {
      if (this.couponDetailVos && this.couponDetailVos.length) {
        return this.couponDetailVos.find(item => item.couponValid === 0).couponInfoList
      } else {
        return []
      }
    },
  },
}
</script>