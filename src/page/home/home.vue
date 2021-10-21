<template>
  <div class="home">
    <header class="top">
      <router-link to="/city" class="site" :style="{'max-width': (isFixed? '0' : '')}">
        <svg class="site_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#site"></use>
        </svg>
        <span class="site_text">竹林桥宾馆</span>
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
import BScroll from 'better-scroll';
import { kingkongList, getCategories } from '../../service/api';
import shoplist from '../../components/shoplist.vue';
import footguide from '../../components/footguide.vue';

export default {
  data() {
    return {
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
    this.getKingkongList();
    getCategories().then(res => {
      this.sortVOList = res.data.sortVOList;
      this.multifilterVOList = res.data.multifilterVOList;
      // 排序标题
      this.sortTitleName = this.sortVOList.filter(obj => obj.position)[0].name;
    });
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
    getKingkongList() {
      kingkongList().then(res => {
        this.kingkongList = res.data;
      });
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
    }
  },
  components: {
    footguide,
    shoplist
  }
};
</script>

<style lang="stylus">
.home
  padding-top: 50px;
  .top
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    align-items: center;
    padding: 0 10px;
    z-index: 25;
    height: 50px;
    background: #1C1B20;
    .site
      display: flex;
      align-items: center;
      line-height: 30px;
      max-width: 200px;
      transition: 500ms
      .site_text
        max-width: 150px;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      .site_icon
        margin-right: 4px;
        width: 15px;
        height: 15px;
      .arrow_right
        width: 15px;
        height: 15px;
        margin-right: 20px;
    .search
      position: relative;
      display: inline-block;
      flex: 1;
      height: 30px;
      border-radius: 50px;
      background: #fff;
      .search_icon
        position: absolute;
        left: 8px;
        top: 7px;
        width: 15px;
        height: 15px;
      input
        width: 100%;
        padding-left 30px
        line-height: 30px;
        font-size: 14px;
        border-radius: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing border-box
  .nav
    .food-type-wrapper
      display: flex;
      flex-wrap: wrap;
      .link-to-food
        display flex
        justify-content center
        width: 20%;
        padding-top 15px
        figure
          img
            width 44px
            height 44px
          figcaption
            line-height 20px
            font-size 11px
            text-align center
            color #666
  .nearby_shop
    display flex
    align-items center
    justify-content center
    padding: 10px 0
    font-size:17px
    font-weight:bold
    &:before
      content: ''
      height 1px
      width 60px
      background #666
      margin-right 3px
      transform-origin: 100% 50%
      transform scale(0.5)
      display inline-block
    &:after
      content: ''
      height 1px
      width 60px
      background #666
      margin-left 3px
      transform-origin: 0 50%
      transform scale(0.5)
      display inline-block
  .sort_container
    position relative
    height 40px
    .bd_layer
      position fixed
      left 0
      top 0
      right 0
      bottom 0
      background rgba(0,0,0,0.5)
      z-index 10
    .sort_filter
      position relative
      width 100%
      z-index 15
      background-color #FAFAFA
      .filter_container
        display flex
        border-bottom 1px solid rgba(228,228,228,0.4)
        border-top 1px solid rgba(228,228,228,0.4)
        .filter_item
          display flex
          flex  1
          align-items center
          justify-content center
          line-height 40px
          font-size 14px
          color #666
          .sort_arrow_bottom, .sort_arrow_top
            width  15px
            height 15px
          .screen
            width 14px
            height 14px
            padding-left 3px
          &.active
            color #333
            font-weight 600
      .sort_list
        width 100%
        .sort_list_li
          padding-left 20px
          height 42px
          line-height 42px
          font-size 14px
          color #333
          border-bottom 1px solid rgba(228,228,228,0.4)
          &.active
            color #ffb000
            font-weight 600
      .mult-filter
        position relative
        width 100%
        height 400px
        overflow hidden
        .filter_list
          padding  15px 0 5px 15px
          border-bottom 1px solid rgba(228,228,228,0.4)
          .title
            margin-bottom 10px
            font-size 12px
            color #999
          .filter_ul
            display flex
            flex-wrap wrap
            font-size 12px
            .filter_item
              display flex
              align-items center
              justify-content center
              width 29.16%
              margin-right 4.16%
              margin-bottom 10px
              border 1px solid  #ccc
              line-height 30px
              box-sizing border-box
              img
                width 20px
                height 20px
            .filter_one
              justify-content flex-start
              margin-right 0
              text-align left
              width 50%
              border none
              color #333
              img
                display inline-block
                margin-right 5px
                height 15px
                width 15px
            .active
              color #ffb000
              border-color #ffb000
              font-weight 600
              background-color #FFFBF1
            .radioActive
              font-weight 600
              color #ffb000
        .botton
          position absolute
          display flex
          bottom 0
          left 0
          right 0
          font-size 16px
          color #333
          span
            flex 1
            line-height 50px
            text-align center
          .clear
            background #fff
          .complete
            background #FFD161
      .sum_condition
        display inline-block
        width 15px
        line-height 15px
        font-style normal
        color #FFD161
        font-size 11px
        text-align: center;
        border-radius 50%
        background-color #000
        vertical-align middle
        margin -2px 0 0 2px
</style>
