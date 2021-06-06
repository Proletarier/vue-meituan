<template>
  <div class="shop_container">
    <div class="sort_container">
       <div class="sort_search">
         <div class="">
          <svg class="search_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
          </svg>
          <input disabled  readonly placeholder="请输入商家或商家名称">
         </div>
       </div>
       <div v-if="detailFlag" class="sort_detail" :style="{position: (isFixed? 'relative':'fixed')}">
         <div class="sub_category" ref="sub_category">
           <ul class="sub_category_ul">
             <li v-for="(item,index) in category.subCate" :key="index"
               class="sub_category_ul_li" :class="{'active': categoryId===item.cateId}"
                @click="selectMenu(index,item.cateId)" ref="categoryList">
               {{item.all? category.name : item.name}}
             </li>
           </ul>
           <div class="arrow_bottom" @click="showCategory()">
             <svg>
               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-bottom"></use>
             </svg>
           </div>
         </div>
         <div v-show="isCategoryShow" class="category_wrapper">
           <div class="category-left">
              <ul>
                <li v-for="(category,index) in categories.filter(obj => obj.cateId)" :key="index" class="category-item"
                 :class="{'active': currentIndex === category.cateId}" @click="selectCategoryName(category.cateId)">
                  <span>{{category.name}}</span>
                  <span :class="currentIndex === category.cateId? 'active':'count'">{{category.count}}</span>
                </li>
              </ul>
           </div>
           <div class="category-right">
             <ul>
               <li v-for="(item,index) in categoryDetail" :key="index" class="category-item"
                :class="{'active': categoryId===item.cateId}" @click="selectCategoryDetail(item.cateId, item.parentId,index)">
                 <span>{{item.name}}</span>
                 <span :class="categoryId===item.cateId? 'active':'count'">{{item.count}}</span>
               </li>
             </ul>
           </div>
         </div>
       </div>
       <div class="sort_filter" :style="{position: (isFixed? 'relative':'fixed'),top: (!isFixed & detailFlag? '40px':'0')}">
         <section class="filter_container">
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
         <!--综合排序list-->
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
       <div class="bd_layer" v-show="isCategoryShow || sortBy != ''" @click="chooseType(''); isCategoryShow=false">
       </div>
    </div>
    <shoplist></shoplist>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { getCategories } from '../../service/api';
import shoplist from '../../components/shoplist.vue';

export default {
  data() {
    return {
      categoryId: -1, // 种类Id
      sortById: -1, // 排序方式
      sortBy: '', // sorttype
      sortTitleName: null, // 排序标题
      multiFilterIds: [], // 商家特色 专送
      activityId: -1, // 优惠活动
      minPrice: null, // 人均价最低
      maxPrice: null, // 人均价最高
      category: '', // categories顶部
      categories: [], // categories左侧列表
      categoryDetail: [], // categories分类右侧数据
      sortVOList: [], // 排序
      multifilterVOList: [], // 筛选
      isCategoryShow: false, // 隐藏/显示 category-list
      currentIndex: 0, // categories选中index
      isFixed: false, // 顶部吸附
      detailFlag: false // 顶部标题是否显示
    };
  },
  created() {
    // 初始化数据
    this.initData();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    // 排序方式选中状态设置
    activeSelect() {
      let isShow;
      if (!this.sortById == null) {
        isShow = false;
      } else {
        this.sortVOList.forEach((obj) => {
          if (obj.position && obj.sortId === this.sortById) {
            isShow = true;
          }
        });
      }
      return isShow;
    }
  },
  methods: {
    initData() {
      this.categoryId = Number(this.$route.query.categoryId);
      getCategories().then((res) => {
        this.categories = res.data.categories;
        this.sortVOList = res.data.sortVOList;
        this.multifilterVOList = res.data.multifilterVOList;
        // 初始化顶部和右侧标题
        this.category = this.getCategory(this.categoryId);
        if (this.category != null) {
          this.categoryDetail = this.category.subCate;
          this.detailFlag = true;
          this.currentIndex = this.categoryId;
        }
        // 初始化滚动栏
        this.$nextTick(() => {
          this.initScroll();
        });
        // 排序标题
        this.sortTitleName = this.sortVOList.filter((obj) => obj.position)[0].name;
      });
    },
    // 初始化滚动
    initScroll() {
      if (this.$refs.sub_category) {
        this.categoryScroll = new BScroll(this.$refs.sub_category, {
          scrollX: true,
          click: true,
          bounce: false
        });
      }
      this.multScroll = new BScroll(this.$refs.mult_filter, {
        scrollX: true,
        click: true,
        bounce: false
      });
      this.multScroll.once('beforeScrollStart', () => {
        this.multScroll.refresh();
      });
    },
    // 获取subCate
    getCategory(categoryId) {
      for (let i = 0; i < this.categories.length; i++) {
        if (categoryId === this.categories[i].cateId) {
          return this.categories[i];
        }
      }
      return null;
    },
    // 选中categoryMenu
    selectMenu(index, id) {
      this.categoryId = id;
      this.followScroll(index);
    },
    // 选中左侧category-list
    selectCategoryName(cateId) {
      this.currentIndex = cateId;
      // 刷新右侧category-list
      this.categoryDetail = this.getCategory(cateId).subCate;
    },
    // 选中右侧category-list
    selectCategoryDetail(cateId, parentId, index) {
      this.categoryId = cateId;
      // 关闭遮罩层
      this.isCategoryShow = false;
      // 刷新顶部menu
      this.category = this.getCategory(parentId);
      //  重新计算顶部Scroll，设置偏移量
      this.$nextTick(() => {
        this.categoryScroll.refresh();
        this.followScroll(index);
      });
    },
    // 隐藏/显示 categoryList
    showCategory() {
      this.isCategoryShow = !this.isCategoryShow;
      this.isFixed = false;
    },
    // 筛选列表选择
    chooseType(type) {
      if (this.sortBy === type) {
        this.sortBy = '';
      } else {
        this.sortBy = type;
        this.isFixed = false;
      }
    },
    // 顶部menu偏移量设置
    followScroll(index) {
      let subList = this.$refs.categoryList;
      let el = subList[index];
      this.categoryScroll.scrollToElement(el, 300, true, 0);
    },
    // 设置排序Id
    getShopList(id, name) {
      if (name) this.sortTitleName = name;
      this.sortById = id;
      this.sortBy = '';
    },
    // 添加筛选条件
    addFilterId(filterId, type, minPrice, maxPrice) {
      // 多选排序设置
      if (type === 'more') {
        let index = this.multiFilterIds.indexOf(filterId);
        if (index >= 0) {
          this.multiFilterIds.splice(index, 1);
        } else {
          this.multiFilterIds.push(filterId);
        }
        // 单选排序设置
      } else if (type === 'one') {
        if (this.activityId === filterId) {
          this.activityId = null;
        } else {
          this.activityId = filterId;
        }
        // 平均价设置
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
      this.isFixed = !scrollTop;
    }
  },
  components: {
    shoplist
  }
};
</script>

<style lang="stylus">
  .sort_container
    position relative
    width 100%
    .bd_layer
      position fixed
      left 0
      top 0
      right 0
      bottom 0
      background rgba(0,0,0,0.5)
      z-index 10
    .sort_search
      height 40px
      background #fafafa
      padding 10px
      padding-bottom 0
      box-sizing border-box
      div
       position relative
       input
         width 100%
         padding-left 30px
         font-size 14px
         height 30px
         background #e4e4e4
         border-radius 100px
         box-sizing border-box
        svg
          width 15px
          height 15px
          position absolute
          top 50%
          margin: 0 5px 0 10px
          transform: translateY(-50%)
    .sort_detail
      position relative
      top 0
      width 100%
      z-index 20
      .sub_category
        width 100%
        white-space nowrap
        overflow hidden
        .sub_category_ul
          display inline-block
          padding-right 9%
          background-color #FAFAFA
          .sub_category_ul_li
            position relative
            display inline-block
            padding 0 10px
            line-height 40px
            text-align center
            color #666
            &.active
              color #ffb000
              &:after
                content ''
                position absolute
                left 50%
                bottom 0
                margin-left -10px
                width 20px
                height 2px
                background #FFB000
        .arrow_bottom
          position absolute
          top 0
          right 0
          z-index 10
          width 12%
          line-height 40px
          background #FAFAFA
          text-align center
          background linear-gradient(-270deg, rgba(255, 255, 255, 0) 0%, rgba(250, 250, 250, 0.8) 10%, #FAFAFA 38%)
          svg
            width 10px
            height 10px
      .category_wrapper
        position absolute
        top 40px
        display flex
        width 100%
        .category-left, .category-right
          min-height 150px
          max-height 450px
          background #F4F4F4
          overflow-y auto
          .category-item
            display flex
            padding 0 15px
            justify-content space-between
            line-height 42px
            color #333
            font-size 14px
            &.active
              background-color #fff
              color #FFB000
              font-weight bolder
            .count
              font-size 12px
              color #999
              &.active
                color #FFB000
                font-weight bolder
        .category-left
          width 40%
        .category-right
          flex 1
          background-color #FFF
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
