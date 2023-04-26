<template>
  <div class="sortFilter">
    <div class="sort_filter" :style="{position: (isFixed? 'fixed':'relative'),top: (isFixed? '50px':'0')}">
      <section class="filter_container" @click="handleClick">
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
        <div v-for="(sort) in sortVOList.filter(obj => !obj.position)" :key="sort.value" class="filter_item" :class="{active: sortById === sort.value }" @click="filterCilckHandle(sort.value)">
          <span>{{sort.label}}</span>
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
        <li v-for="(sort) in sortVOList.filter(obj => obj.position)" :key="sort.value" class="sort_list_li" :class="{'active': sortById === sort.value}" @click="filterCilckHandle(sort.value,sort.label)">
          {{sort.label}}
        </li>
      </ul>
      <!--筛选-->
      <div v-show="sortBy === 'activity'" class="mult-filter" ref="mult_filter">
        <section style="padding-bottom:50px">
          <!-- 多选 -->
          <div v-for="(mList,index) in multiChoice" :key="index" class="filter_list">
            <div v-if="mList.groupTitle" class="title">{{mList.groupTitle}}</div>
            <ul class="filter_ul">
              <li v-for="filterItem in mList.filterItemList" :key="filterItem.filterId" class="filter_item" :class="{active: multiFilterIds.includes(filterItem.filterId)}" @click="addFilterId(filterItem.filterId,'more')">
                <img v-if="filterItem.icon" :src="filterItem.icon" />
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
          <div v-for="(mList,index) in singleChoice" :key="index.type" class="filter_list">
            <div v-if="mList.groupTitle" class="title">{{mList.groupTitle}}</div>
            <ul class="filter_ul">
              <li v-for="(filterItem) in mList.filterItemList" :key="filterItem.filterId" class="filter_item filter_one" :class="{radioActive: activityId === filterItem.filterId}" @click="addFilterId(filterItem.filterId,'one')">
                <img v-if="filterItem.icon" :src="filterItem.icon" />
                {{filterItem.name}}
              </li>
            </ul>
          </div>
        </section>
        <div class="botton">
          <span class="clear" @click="clearMultiFilterIds()">清除筛选</span>
          <span class="complete" @click="chooseType('')">完成<i v-if="multiFilterIds.length > 0" class="sum_condition">{{multiFilterIds.length}}</i></span>
        </div>
      </div>
    </div>
    <div class="bd_layer" v-show="sortBy != ''" @click="chooseType('')"></div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll';
import service from '@/service';
import { _sortVOList as sortVOList } from '@/common/config';

import './index.styl';
export default {
  props: {
    listShop: {
      type: Function,
      default: () => { }
    },
    handleClick: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      sortVOList,
      isFixed: false,
      sortBy: '',
      sortTitleName: null, // 排序标题
      sortById: null, //排序
      multifilterVOList: [], // 筛选
      multiFilterIds: [], // 商家特色
      activityId: null, // 优惠活动
      minPrice: null, // 人均价最低
      maxPrice: null // 人均价最高
    };
  },
  created() {
    Promise.all([service.filterConditions()]).then(([filterConditions]) => {
      if (filterConditions) {
        this.multifilterVOList = filterConditions.multifilterVOList;
      }
    })
    this.$nextTick(() => {
      this.sortTitleName = this.sortVOList.filter(obj => obj.position)[0].label;
    })
  },
  mounted() {
    this.multScroll = new BScroll(this.$refs.mult_filter, {
      scrollX: true,
      click: true
    });
    this.multScroll.once('beforeScrollStart', () => {
      this.multScroll.refresh();
    });
  },
  methods: {
    clearMultiFilterIds() {
      this.multiFilterIds = []
      this.activityId = undefined
      this.minPrice = undefined
      this.maxPrice = undefined
    },
    filterCilckHandle(id, name) {
      if (name) this.sortTitleName = name;
      this.sortById = id;
      this.sortBy = '';
      this.listShop({ ruleSort: id })
    },
    chooseType(type = undefined) {
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
  },
  computed: {
    ...mapState('point', ['location']),
    multiChoice() {
      return this.multifilterVOList?.filter(obj => obj.isSupportMultiChoice) || []
    },
    singleChoice() {
      return this.multifilterVOList?.filter(obj => !obj.isSupportMultiChoice) || []
    }
  },
};
</script>
