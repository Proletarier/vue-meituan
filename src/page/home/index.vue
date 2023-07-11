<template>
  <div class="home">
    <header class="top">
      <router-link to="/mine/poipicker?source=home" class="site" :style="{'max-width': (isFixed? '0' : '')}">
        <svg class="site_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#site"></use>
        </svg>
        <span class="site_text">{{this.poiStatus ? "定位中..." : this.location.place }}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <router-link to="/search" class="search">
        <svg class="search_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
        </svg>
        <input readonly placeholder="请输入商家或商品名称" disabled />
      </router-link>
    </header>
    <nav class="nav ">
      <div class="food-type-wrapper">
        <div class=" slide-item">
          <router-link v-for="item in kingkongList.slice(0,10)" :key="item.cateId" :to="{path: '/shop',query:{categoryId:item.cateId}}" class="link-to-food ">
            <figure>
              <img :src="item.icon" />
              <figcaption>{{ item.name }}</figcaption>
            </figure>
          </router-link>
        </div>
        <div class=" slide-item">
          <router-link v-for="item in kingkongList.slice(10,20)" :key="item.cateId" :to="{path: '/shop',query:{categoryId:item.cateId}}" class="link-to-food ">
            <figure>
              <img :src="item.icon" />
              <figcaption>{{ item.name }}</figcaption>
            </figure>
          </router-link>
        </div>
      </div>
    </nav>
    <div class="nearby_shop">
      附近商家
    </div>
    <SortFilter :handleClick="setScroll" :listShop='getNearShop'></SortFilter>
    <shoplist :shopList='state.datalist'></shoplist>
    <footguide></footguide>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SortFilter from '../_components/sort-filter';
import shoplist from '../_components/shoplist';
import footguide from '../_components/footguide';
import store from './store';

import './index.styl';
export default {
  data() {
    return {
      poiStatus: false,
      isFixed: false,
      sortVOList: [], // 排序
      multifilterVOList: [], // 筛选
      sortById: null,
      sortBy: '', // sortByType
      sortTitleName: null, // 排序标题
      multiFilterIds: [], // 商家特色 专送
      activityId: null, // 优惠活动
      minPrice: null, // 人均价最低
      maxPrice: null, // 人均价最高
      state: store.state,
    };
  },
  created() {
    if (this.kingkongList) {
      this.getCategory()
    }
    this.$nextTick(() => {
      const { place, lat, lng } = this.location
      if (place && lat && lng) {
        this.getNearShop()
      } else {
        this.getLocation();
      }
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    getNearShop(params = {}) {
      const { lat, lng } = this.location;
      store.saveState({ ...params, point: { lat, lng } })
      store.getNearShop()
    },
    setScroll() {
      document.documentElement.scrollTop = 200;
    },
    activeSelect() {
      if (this.sortById == null) {
        return false;
      }
      let isShow = false;
      this.sortVOList.forEach(obj => {
        if (obj.position && obj.sortId === this.sortById) {
          isShow = true;
        }
      });
      return isShow;
    },
    getShopList(id, name) {
      if (name) this.sortTitleName = name;
      this.sortById = id;
      this.sortBy = '';
    },
    // 监听scorll事件
    handleScroll() {
      this.$nextTick(() => {
        if (this.$refs.sort) {
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset;
          let top = this.$refs.sort.$el.offsetTop;
          this.isFixed = !((top - scrollTop) >= 50 || scrollTop < 200);
        }
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
        const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        this.isFixed = !scrollTop;
        if (scrollTop + clientHeight >= scrollHeight && !this.$loading.isrun() && this.state.hasNext) {
          store.getNearShop(true)
        }
      })
    },
    getLocation() {
      let _this = this;
      _this.poiStatus = true;
      let mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          GeoLocationFirst: true,
          timeout: 3000,
          extensions: "all",
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          _this.setLocation({
            place: data.aois[0].name
          })
          _this.poiStatus = false;
          _this.getNearShop();
        }
        function onError(data) {
          _this.poiStatus = false;
          _this.$router.push({path: '/mine/poipicker', query: { source:'home' } });
        }
      });
    },
    ...mapActions('point', [
      "setLocation"
    ]),
    ...mapActions('category', [
      "getCategory"
    ])
    ,
  },
  computed: {
    ...mapState('point', ['location']),
    ...mapState('category', ['kingkongList']),
  },
  components: {
    footguide,
    shoplist,
    SortFilter
  }
};
</script>
