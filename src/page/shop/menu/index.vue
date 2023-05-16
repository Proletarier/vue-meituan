<template>
  <div class="food-container">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(shop,index) in categoryList" :key="index" class="menu-item" :class="{'active': menuIdex === index}" @click="selectMenu(index)" ref="menuList">
          <img v-if="shop.iconUrl" width="15px" height="15px" :src="shop.iconUrl">
          <span>{{shop.categoryName}}</span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(shop,index) in categoryList" :key="index" class="food-list" ref="foodList">
          <h1>{{shop.categoryName}}</h1>
          <ul>
            <li v-for="food in shop.spuList" :key="food.spuId" class="food-item" @click="selectFood(food,'food')">
              <img class="icon" height="75px" width="75px" :src="food.imageUrl">
              <section class="content">
                <h2 class="name">{{food.spuName}}</h2>
                <p class="desc">{{food.spuDesc}}</p>
                <p class="sale-num"><span>月售{{food.saleVolume}}</span><span class="praise">赞{{food.praiseNum}}</span></p>
                <div class="price-unit">
                  <p><span class="price">￥{{food.currentPrice}}</span>/{{food.unit}}&nbsp;起&nbsp;<span class="origin">{{food.originPrice}}</span></p>
                  <div class="cartcontrol-wrapper">
                    <div v-if="food.spuAttrList.length>0" class="specification" @click.stop="selectFood(food,'specification')">选规格</div>
                    <CartControl v-else :food='food' :shopId='shopId'></CartControl>
                  </div>
                </div>
                <div v-if="food.spuPromotionInfo" class="promotion">
                  <span>{{food.spuPromotionInfo}}</span>
                  <!-- <img v-for="(picture,index) in food.productLabelPictureList" :key="index" :src="picture" width="30" height="15"> -->
                </div>
              </section>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { CartControl } from '../children';

import './index.styl';

export default {
  props: {
    shopId: {
      default: undefined
    },
    selectFood: {
      type: Function,
      default: () => { }
    },
    categoryList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      foodsHeight: [], // food元素的高度
      menuIdex: 0, // menu选中Index
      menuIndexChange: true,
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.initPlug();
  //     this.calculateHeight();
  //   });
  // },
  computed: {
    selectFoods() {
      let foods = [];
      this.categoryList.forEach(good => {
        good.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    initPlug() {
      // 滚动
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
        click: true,
        bounce: false
      });
      // 食物滚动
      this.foodWrapper = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodWrapper.on('scroll', pos => {
        if (pos.y <= 0) {
          let scrollY = Math.abs(Math.round(pos.y));
          for (let i = 0; i < this.foodsHeight.length; i++) {
            let height1 = this.foodsHeight[i];
            let height2 = this.foodsHeight[i + 1];
            if (this.menuIndexChange && (scrollY >= height1 && scrollY < height2)) {
              this.menuIdex = i;
              this.followScroll(i);
            }
          }
        }
      });
    },
    selectMenu(index) {
      this.menuIdex = index;
      // 控制menu重复设置
      this.menuIndexChange = false;
      this.followScroll(index);
      // 食物滚动
      this.foodWrapper.scrollToElement(this.$refs.foodList[index], 300);
      this.foodWrapper.on('scrollEnd', () => {
        this.menuIndexChange = true;
      });
    },
    calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.foodsHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.foodsHeight.push(height);
      }
    },
    followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.menuWrapper.scrollToElement(el, 300, 0, -100);
    },
  },
  watch: {
    categoryList: {
      handler: function (data) {
        if (data && data.length > 0) {
          this.$nextTick(() => {
            this.initPlug();
            this.calculateHeight();
          });
        }
      },
      deep: true
    }
  },
  components: {
    CartControl
  }
}
</script>