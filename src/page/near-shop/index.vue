<template>
  <div class="shop_container">
    <div class="sort_container">
      <div v-if="false" class="sort_search">
        <div class="">
          <svg class="search_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
          </svg>
          <input disabled readonly placeholder="请输入商家或商家名称">
        </div>
      </div>
      <div v-if="detailFlag" class="sort_detail" :style="{position: (isFixed? 'relative':'fixed')}">
        <div class="sub_category" ref="sub_category">
          <ul class="sub_category_ul">
            <li v-for="(item,index) in category.subCate" :key="index" class="sub_category_ul_li" :class="{'active': categoryId===item.cateId}" @click="selectMenu(index,item.cateId)" ref="categoryList">
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
              <li v-for="(category,index) in categories.filter(obj => obj.cateId)" :key="index" class="category-item" :class="{'active': currentIndex === category.cateId}" @click="selectCategoryName(category.cateId)">
                <span>{{category.name}}</span>
                <span :class="currentIndex === category.cateId? 'active':'count'">{{category.count}}</span>
              </li>
            </ul>
          </div>
          <div class="category-right">
            <ul>
              <li v-for="(item,index) in categoryDetail" :key="index" class="category-item" :class="{'active': categoryId===item.cateId}" @click="selectCategoryDetail(item.cateId, item.parentId,index)">
                <span>{{item.name}}</span>
                <span :class="categoryId===item.cateId? 'active':'count'">{{item.count}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <SortFilter ref="sort" :listShop='getNearShop' />
    </div>
    <shoplist :shopList='nearShopList'></shoplist>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BScroll from 'better-scroll';
import service from '@/service';
import shoplist from '../_components/shoplist';
import SortFilter from '../_components/sort-filter';

import './index.styl';
export default {
  data() {
    return {
      categoryId: -1, // 种类Id
      category: '', // categories顶部
      categories: [], // categories左侧列表
      categoryDetail: [], // categories分类右侧数据
      isCategoryShow: false, // 隐藏/显示 category-list
      currentIndex: 0, // categories选中index
      isFixed: true, // 顶部吸附
      detailFlag: false, // 顶部标题是否显示
      nearShopList: [],
      hasNext: true,
      sortFilter: {
        nextStartIndex: 1,
        ruleSort: undefined,
        exclusiveDelivery: undefined,
        feature: undefined,
        averagePrice: undefined,
        activity: undefined
      },
    };
  },
  created() {
    this.categoryId = Number(this.$route.query.categoryId);
    service.categoriesByChildren().then(data => {
      this.categories = data;
      this.category = this.getCategory(data, this.categoryId);
      if (this.category && this.category.subCate.length > 1) {
        this.categoryDetail = this.category.subCate;
        this.detailFlag = true;
        this.currentIndex = this.categoryId;
      }
      this.$nextTick(() => {
        this.initScroll();
        // const { lat, lng } = this.location
        // this.sortFilter.location = { lat, lng }
        this.getNearShop()
      });
    });
    this.sortTitleName = this.sortVOList?.filter(obj => obj.position)[0].name;
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    ...mapState('point', ['location']),
  },
  methods: {
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
    getCategory(categories = [], categoryId = undefined) {
      for (let i = 0; i < categories.length; i++) {
        if (categoryId === categories[i].cateId) {
          return categories[i].subCate.length > 1 ? categories[i] : undefined;
        }
      }
      return null;
    },
    // 选中categoryMenu
    selectMenu(index, id) {
      this.categoryId = id;
      this.followScroll(index);
      this.getNearShop({ categoryId: id })
    },
    // 选中左侧category-list
    selectCategoryName(cateId) {
      this.currentIndex = cateId;
      // 刷新右侧category-list
      this.categoryDetail = this.getCategory(this.categories, cateId).subCate;
    },
    // 选中右侧category-list
    selectCategoryDetail(cateId, parentId, index) {
      this.categoryId = cateId;
      // 关闭遮罩层
      this.isCategoryShow = false;
      // 刷新顶部menu
      this.category = this.getCategory(this.categories, parentId);
      //  重新计算顶部Scroll，设置偏移量
      this.$nextTick(() => {
        this.categoryScroll.refresh();
        this.followScroll(index);
      });
      this.getNearShop({ categoryId: cateId })
    },
    // 隐藏/显示 categoryList
    showCategory() {
      this.isCategoryShow = !this.isCategoryShow;
      this.isFixed = false;
    },
    // 顶部menu偏移量设置
    followScroll(index) {
      let subList = this.$refs.categoryList;
      let el = subList[index];
      this.categoryScroll.scrollToElement(el, 300, true, 0);
    },
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
      const clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      this.isFixed = !scrollTop;
      if (scrollTop + clientHeight >= scrollHeight && !this.$loading.isrun() && this.hasNext) {
        this.getNearShop({} , true)
      }
    },
    async getNearShop(params = {}, ismore = false) {
      if (params) {
        this.saveSortFilter(params)
      }
      this.$loading.show()
      const { nextStartIndex, ruleSort } = this.sortFilter
      const { lat, lng } = this.location
      const data = await service.nearShop({
        categoryId: this.categoryId,
        location: { lat, lng },
        ruleSort,
        nextStartIndex: ismore ? nextStartIndex + 1 : 1,
        ...params,
      });
      if (data) {
        const { count, shopVoList } = data
        if (ismore) {
          const { nextStartIndex } = params
          this.nearShopList = [...this.nearShopList, ...shopVoList];
          this.sortFilter.nextStartIndex = nextStartIndex
        } else {
          this.nearShopList = shopVoList;
          this.sortFilter.nextStartIndex = 1
        }
        this.hasNext = count > this.nearShopList.length
      }
      this.$loading.hide()
    },
    saveSortFilter(data = {}) {
      for (const key in data) {
        this.sortFilter[key] = data[key];
      }
    }
  },
  components: {
    shoplist,
    SortFilter
  }
};
</script>