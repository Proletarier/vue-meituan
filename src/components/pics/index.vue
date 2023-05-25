<template>
  <div v-if="showFlag" class="photo-container" @click="hide">
    <div class="photo-wrapper">
      <div class="swiper-container">
        <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(img,index) in images" :key="index">
            <img :src="img" />
          </li>
        </ul>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

export default {
  props: {
    images: {
      type: Array,
      default() {
        return [];
      }
    },
    index: Number
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
       console.log('222')
      this.showFlag = true;
      this.$nextTick(() => {
        this.swiper = new Swiper('.swiper-container', {
          initialSlide: this.index,
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
            bulletClass: 'my-bullet',
            bulletActiveClass: 'my-bullet-active'
          }
        });
      });
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>

<style lang="stylus">
  .photo-container
    position absolute
    top 0
    bottom 0
    right 0
    left 0
    background #000
    z-index 60
    .photo-wrapper
      position relative
      height 80%
      top 50%
      transform translateY(-50%)
      .swiper-container
        width 100%
        height 100%
        .swiper-slide
          display: flex;
          justify-content: center;
          align-items: center;
          img
           width 100%
    .swiper-pagination
      position absolute
      left 50%
      transform translateX(-50%)
      margin 0 auto
      bottom 5px
      white-space: nowrap;
      --swiper-theme-color: #ff6600;
      --swiper-pagination-color: #00ff33;
      .my-bullet
        width: 6px;
        height: 6px;
        display: inline-block;
        border-radius: 100%;
        background: #dddddd;
        opacity: 1;
        margin-right 5px
      .my-bullet-active
        background #ff6600
        width: 8px;
        height: 8px;
        opacity 1
</style>
