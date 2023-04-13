<template>
  <div class="home">
    <header class="top">
      <router-link to="/mine/poipicker?source=home"  class="site" :style="{'max-width': (isFixed? '0' : '')}">
        <svg class="site_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#site"></use>
        </svg>
        <span class="site_text">{{this.poiStatus ? "定位中..." : this.location.place}}</span>
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
    <nav class="nav">
      <div class="food-type-wrapper">
        <router-link v-for="item in kingkongList.slice(0, 10)" :key="item.cateId" :to="{path: '/shop',query:{categoryId:item.cateId}}" class="link-to-food">
          <figure>
            <img :src="item.icon"/>
            <figcaption>{{ item.name }}</figcaption>
          </figure>
        </router-link>
      </div>
    </nav>
    <div class="nearby_shop">
     附近商家
    </div>
    <div class="sort_container">
      <div class="sort_filter" ref="sort" :style="{position: (isFixed? 'fixed':'relative'),top: (isFixed? '50px':'0')}">
        <section class="filter_container" @click="setScroll()">
          <!--综合排序 -->
          <div class="filter_item" :class="{active: activeSelect}" @click="chooseType('sort')">
            <span>{{sortTitleName}}</span>
            <svg v-show="sortBy != 'sort'" class="sort_arrow_bottom">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sort_arrow_bottom"></use>
            </svg>
            <svg v-show="sortBy == 'sort'" class="sort_arrow_top">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sort_arrow_top"></use>
            </svg>
          </div>
          <!--销量最高 距离最近 -->
          <div v-for="(sort) in sortVOList.filter(obj => !obj.position)" :key="sort.sortId"
          class="filter_item" :class="{active: sortById === sort.sortId }" @click="getShopList(sort.sortId)">
            <span>{{sort.name}}</span>
          </div>
          <!-- 筛选 -->
          <div class="filter_item" @click="chooseType('activity')">
              <span>筛选</span>
              <svg v-if="0 == 0" class="screen">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#screen"></use>
              </svg>
              <i v-if="multiFilterIds.length > 0" class="sum_condition">{{multiFilterIds.length}}</i>
          </div>
        </section>
        <!--综合排序下拉栏-->
        <ul class="sort_list" v-show="sortBy === 'sort'">
          <li v-for="(sort) in sortVOList.filter(obj => obj.position)" :key="sort.sortId" class="sort_list_li" :class="{'active': sortById === sort.sortId}" @click="getShopList(sort.sortId,sort.name)">
            {{sort.name}}
          </li>
        </ul>
        <!--筛选-->
        <div v-show="sortBy === 'activity'" class="mult-filter" ref="mult_filter">
          <section style="padding-bottom:50px">
            <!-- 多选 -->
            <div v-for="(mList,index) in multifilterVOList.filter(obj => obj.isSupportMultiChoice)" :key="index" class="filter_list">
              <div v-if="mList.groupTitle" class="title">{{mList.groupTitle}}</div>
               <ul class="filter_ul">
                 <li v-for="filterItem in mList.filterItemList" :key="filterItem.filterId" class="filter_item"
                 :class="{active: multiFilterIds.includes(filterItem.filterId)}" @click="addFilterId(filterItem.filterId,'more')">
                   <img v-if="filterItem.icon"  :src="filterItem.icon"/>
                   {{filterItem.name}}
                 </li>
               </ul>
            </div>
            <!--人均价-->
            <div class="filter_list">
              <div class="title">人均价</div>
              <ul class="filter_ul">
                <li class="filter_item" :class="{active: maxPrice === 20}" @click="addFilterId(-1,'',0,20)">20元以下</li>
                <li class="filter_item" :class="{active: minPrice === 20 && maxPrice === 40}" @click="addFilterId(-1,'',20,40)">20-40元</li>
                <li class="filter_item" :class="{active: minPrice === 40}" @click="addFilterId(-1,'',40,0)">40元以上</li>
              </ul>
            </div>
            <!-- 单选 -->
            <div v-for="(mList,index) in multifilterVOList.filter(item => !item.isSupportMultiChoice)" :key="index.type" class="filter_list">
              <div v-if="mList.groupTitle" class="title">{{mList.groupTitle}}</div>
              <ul class="filter_ul">
                <li v-for="(filterItem) in mList.filterItemList" :key="filterItem.filterId" class="filter_item filter_one"
                :class="{radioActive: activityId === filterItem.filterId}" @click="addFilterId(filterItem.filterId,'one')">
                  <img v-if="filterItem.icon"  :src="filterItem.icon"/>
                  {{filterItem.name}}
                </li>
              </ul>
            </div>
          </section>
          <div class="botton">
              <span class="clear">清除筛选</span>
              <span class="complete">完成<i v-if="multiFilterIds.length > 0" class="sum_condition">{{multiFilterIds.length}}</i></span>
          </div>
        </div>
      </div>
      <div class="bd_layer" v-show="sortBy != ''" @click="chooseType('')"></div>
    </div>
    <shoplist></shoplist>
    <footguide></footguide>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import BScroll from 'better-scroll';
import service from '@/service';
import shoplist from '../_components/shoplist';
import footguide from '../_components/footguide';

import './index.styl';
export default {
  data() {
    return {
      poiStatus: false,
      kingkongList: [],
      isFixed: false,
      sortVOList: [], // 排序
      multifilterVOList: [], // 筛选
      sortById: null,
      sortBy: '', // sortByType
      sortTitleName: null, // 排序标题
      multiFilterIds: [], // 商家特色 专送
      activityId: null, // 优惠活动
      minPrice: null, // 人均价最低
      maxPrice: null // 人均价最高
    };
  },
  created() {
    Promise.all([service.listGoodsCate(),service.filterConditions()]).then(([res,filterConditions]) =>{
       if(res){
          this.kingkongList = res.goodsCate;
       }
       if(filterConditions){
          this.sortVOList = filterConditions.sortVOList;
          this.multifilterVOList= filterConditions.multifilterVOList;
          // 排序标题
          this.sortTitleName = this.sortVOList.filter(obj => obj.position)[0].name;
       }
    })
    this.getLocation();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
    this.multScroll = new BScroll(this.$refs.mult_filter, {
      scrollX: true,
      click: true
    });
    this.multScroll.once('beforeScrollStart', () => {
      this.multScroll.refresh();
    });
  },
  methods: {
    setScroll() {
      document.documentElement.scrollTop = 200;
    },
    chooseType(type) {
      if (this.sortBy === type) {
        this.sortBy = '';
      } else {
        this.sortBy = type;
      }
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
    // 添加筛选条件
    addFilterId(filterId, type, minPrice, maxPrice) {
      if (type === 'more') {
        let index = this.multiFilterIds.indexOf(filterId);
        if (index >= 0) {
          this.multiFilterIds.splice(index, 1);
        } else {
          this.multiFilterIds.push(filterId);
        }
      } else if (type === 'one') {
        if (this.activityId === filterId) {
          this.activityId = null;
        } else {
          this.activityId = filterId;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.maxPrice === maxPrice && this.minPrice === minPrice) {
          this.maxPrice = 0;
          this.minPrice = 0;
        } else {
          this.maxPrice = maxPrice;
          this.minPrice = minPrice;
        }
      }
    },
    // 监听scorll事件
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset;
      let top = this.$refs.sort.offsetTop;
      this.isFixed = !((top - scrollTop) >= 50 || scrollTop < 200);
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
        }
        function onError(data) {
         _this.poiStatus = false;
         _this.setLocation()
        }
      });
    },
     ...mapActions('point',[
      "setLocation"
    ]),
  },
  computed:{
   ...mapState('point',['location']),
  },
  components: {
    footguide,
    shoplist
  }
};
</script>
