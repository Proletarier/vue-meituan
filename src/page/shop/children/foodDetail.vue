<template>
  <div v-if="showFlag" class="food-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div v-if="chooseType === 'food'" class="info">
          <div class="cover">
            <img width="100%" :src="food.imageUrl">
          </div>
          <dl class="content">
            <dt class="title">{{food.spuName}}</dt>
            <dd class="sale-num"><span class="num">月售{{food.saleVolume}}</span>赞{{food.praiseNum}}</dd>
            <dd class="label" v-if="food.labelList">
              <img v-for="(label,index) in food.labelList" :key="index" :src="conversion(label)" width="30" height="15">
            </dd>
            <dd class="desc">{{food.spuDesc}}</dd>
          </dl>
        </div>
        <div v-if="chooseType === 'specification'" class="specification">
          <h1 class="title"><span>{{food.spuName}}</span></h1>
          <div class="content">
            <dl v-for="(spuItem,index) in food.spuAttrList" :key="index">
              <dt class="dt-item">{{spuItem.attributeName}}：</dt>
              <dd class="dd-item" v-for="item in spuItem.spuAttrValueList" :key="item.attrId" :class="{'active': attrs.includes(item.attrId)}" @click="selectSpecification(item.attrId,item.attrValue,index)">
                {{item.attrValue}}
              </dd>
            </dl>
          </div>
        </div>
        <div class="price-unit">
          <div class="price">
            ￥{{food.currentPrice}}<span>/{{food.unit}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <div v-show="!foodNum" class="add-cart" @click="addCart">加入购物车</div>
            <Cartcontrol v-show='foodNum' @showSpecification='showSpecification()' :food='food' :shopId='shopId' :attrs='attrs' :attrValues='attrValues' :chooseType='chooseType' ref="cartcontrol"></Cartcontrol>
          </div>
        </div>
      </div>
      <div class="close" @click="showFlag=false;chooseType=''"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Cartcontrol from './cartcontrol';
import { _food_tag } from '@/common/config';
import { $$conversion } from '@/common/utils';

export default {
  props: {
    shopId: String,
    food: Object
  },
  data() {
    return {
      showFlag: false,
      chooseType: '',
      attrs: [],
      attrValues: []
    };
  },
  watch: {
    chooseType() {
      let attrs = [];
      let attrValues = [];
      // 重新获取每个规格第一个元素
      if (this.chooseType === 'specification') {
        this.food.spuAttrList.forEach(item => {
          attrs.push(item.spuAttrValueList[0].attrId);
          attrValues.push(item.spuAttrValueList[0].attrValue);
        });
      }
      this.attrs = attrs;
      this.attrValues = attrValues;
    }
  },
  computed: {
    ...mapState('cart',['cartList']),

    foodNum() {
      let cartList = { ...this.cartList };
      let cart = cartList[this.shopId];
      let num = 0;
      if (cart && cart.length > 0) {
        cart.forEach(item => {
          if (item.spuId === this.food.spuId) {
            num += item.count;
          }
        });
      }
      return num;
    }
  },
  methods: {
    conversion(value) {
      const item = $$conversion(_food_tag, value, true)
      return item?.icon
    },
    show() {
      this.showFlag = true;
    },
    addCart() {
      if (this.chooseType === 'food' && this.food.spuAttrList.length) {
        this.chooseType = 'specification';
      } else {
        this.$refs.cartcontrol.addToCart(this.food.spuId, this.food.skuList, this.food.spuName, this.food.currentPrice, this.food.unit);
      }
    },
    // 选择规格
    selectSpecification(attrId, attrValues, index) {
      this.attrs.splice(index, 1, attrId);
      this.attrValues.splice(index, 1, attrValues);
    },
    showSpecification() {
      this.chooseType = 'specification';
    }
  },
  components: {
    Cartcontrol
  }
};
</script>

<style lang="stylus">
.food-detail {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(20px) brightness(100%);
  position: fixed;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  .detail-wrapper {
    position: relative;
    max-height: 86vh;
    max-width: 86vw;
    width: 84vw;
    padding-bottom: 60px;

    .detail {
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      height: 100%;

      .info {
        .cover {
          width: 100%;
        }

        .content {
          overflow-y: auto;
          max-height: 120px;
          padding: 10px 17px;
          box-sizing: border-box;

          .title {
            font-size: 16px;
            line-height: 22px;
            font-weight: bold;
            letter-spacing: 2px;
          }

          .sale-num {
            font-size: 12px;
            line-height: 22px;
            color: #9d9d9d;

            .num {
              margin-right: 15px;
            }
          }

          .label {
            margin-bottom: 10px;
          }

          .desc {
            font-size: 14px;
          }
        }
      }

      .specification {
        .title {
          padding: 10px 0;
          font-weight: normal;
          text-align: center;

          span {
            display: inline-block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 70%;
            font-size: 16px;
            color: #2f2f2f;
          }
        }

        .content {
          padding: 0 12px;
          min-height: 20vh;
          max-height: 50vh;
          overflow-y: scroll;

          .dt-item {
            font-size: 13px;
            line-height: 30px;
          }

          .dd-item {
            display: inline-block;
            height: 30px;
            min-width: 75px;
            max-width: 100%;
            box-sizing: border-box;
            padding: 0 10px;
            margin-bottom: 15px;
            margin-right: 10px;
            line-height: 30px;
            font-size: 12px;
            text-align: center;
            border: 1px solid rgba(196, 196, 196, 0.5);

            &.active {
              background: #fffbf1;
              color: #ffb000;
            }
          }
        }
      }

      .price-unit {
        position: relative;
        background: #fafafa;
        padding: 10px;

        .price {
          font-size: 24px;
          color: #fb4f45;

          span {
            font-size: 12px;
            color: #9d9d9d;
          }
        }
      }
    }

    .close {
      display: inline-block;
      position: absolute;
      left: 50%;
      bottom: -14px;
      margin-left: -31px;
      height: 40px;
      width: 40px;
      border: 10px solid transparent;
      background-image: url('../../../images/close.png');
      background-size: 100% 100%;
      box-sizing: content-box;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
    }
  }

  .cartcontrol-wrapper {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    .add-cart {
      padding: 0 10px;
      background: #ffc132;
      background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%);
      border-radius: 25px;
      font-size: 12px;
      line-height: 25px;
      color: #333;
    }
  }
}
</style>
