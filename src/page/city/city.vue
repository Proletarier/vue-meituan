<template>
  <div class="city-container">
    <div class="search">
      <div class="search-input">
        <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
        </svg>
        <input placeholder="城市中文名或拼音" />
      </div>
      <div class="go-back">
        取消
      </div>
    </div>
    <ul class="city-nav">
      <li v-for="(nav,index) in classify_nav" :key="index" class="nav-li" @click="selectnav(index)">
        {{nav.idx}}
      </li>
    </ul>
    <div class="city-wrapper" ref="cityWrapper">
      <section>
        <div class="citypicker">
        </div>
        <dl class="hot-city">
          <dt class="title">热门城市</dt>
          <dd v-for="(city,index) in hot_city" :key="index" class="city-item">
            {{city.city_name}}
          </dd>
        </dl>
        <section v-for="(cityList,index) in city_nav" :key="index" class="city-list">
          <header class="title">{{cityList.idx}}</header>
            <ul class="city-list-ul">
              <li v-for="(city,index)  in cityList.cities" :key="index" class="city-list-li">
                {{city.city_name}}
              </li>
            </ul>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { cityList } from '../../service/api';

export default {
  data() {
    return {
      hot_city: [], // 热门城市
      city_nav: [], // 城市列表
      classify_nav: [], // 首字母导航
      cityListTop: [] // 存储每个城市距离顶部的top
    };
  },
  created() {
    cityList().then((res) => {
      this.hot_city = res.data.hot_city;
      this.city_nav = res.data.city_nav;
      this.classify_nav = res.data.classify_nav;
      this.$nextTick(() => {
        this.initScroll();
        this.getcityListHeight();
      });
    });
  },
  methods: {
    getcityListHeight() {
      let listTop = [];
      let citylist = this.$refs.cityWrapper.querySelectorAll('.city-list');
      citylist.forEach((el) => {
        listTop.push(el.offsetTop);
      });
      this.cityListTop = listTop;
    },
    initScroll() {
      this.scroll = new BScroll(this.$refs.cityWrapper, {
        click: true
      });
    },
    selectnav(index) {
      let citylist = this.$refs.cityWrapper.querySelectorAll('.city-list');
      this.scroll.scrollToElement(citylist[index], 300, true, 0);
    }
  }
};
</script>

<style lang="stylus">
@import "../../style/mixin.styl";

  .city-container
    background #fff
    .search
      position: relative
      top 0
      padding 0 15px
      padding-bottom 5px
      margin-top 10px
      display flex
      flex: 1;
      height: 30px;
      border-radius: 50px;
      background: #fff;
      align-items center
      border-1px(rgba(173,173,173,0.2))
      .search-input
        flex 1
        svg
          position: absolute;
          top: 4px;
          width: 18px;
          height: 18px;
          fill #adadad
        input
          width: 100%;
          padding-left 20px
          line-height: 30px;
          font-size: 14px;
          border-radius: 50px;
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing border-box
          outline none
      .go-back
        color #adadad
        font-size 14px
    .city-wrapper
      position absolute
      top 45px
      bottom 0
      left 0
      right 30px
      overflow hidden
      .hot-city
        padding-left 15px
        .title
          font-size 16px
          line-height 30px
          color #999
        .city-item
          display inline-block
          width 22.73%
          font-size 16px
          text-align center
          line-height 35px
          border 1px solid  #eee
          box-sizing border-box
          margin 10px 1.13% 0 1.13%
      .city-list
        margin-top 15px
        .title
          line-height 25px
          padding-left 15px
          font-size 14px
          background #eee
        .city-list-ul
          padding-left 15px
         .city-list-li
           font-size 16px
           line-height 42px
           border-1px(rgba(173,173,173,0.2))
    .city-nav
      position fixed
      width 30px
      top  50%
      transform translateY(-50%)
      right 0
      .nav-li
        color #999
        font-size 12px
        line-height 16px
        text-align center
</style>
