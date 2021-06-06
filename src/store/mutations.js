import {
  ADD_CART,
  REDUCE_CART,
  CLEAR_CART,
  INIT_BUYCART
} from './mutation-types';
import { setStore, getStore, compareArray } from '../config/mUtils';

export default {
  // 添加购物车
  [ADD_CART](state, {
    shopId,
    spuId,
    skuList,
    spuName,
    payableAmount,
    spec,
    attrs,
    attrValues
  }) {
    let cart = state.cartList;
    let shop = cart[shopId] = (cart[shopId] || []);
    let isAdd = false;

    if (shop.length) {
      for (let i = 0; i < shop.length; i++) {
        if (shop[i].spuId === spuId && (!attrs.length || compareArray(attrs, shop[i].attrs, false))) {
          shop[i].count += 1;
          isAdd = true;
          shop[i].wrnm = attrs;
        }
      }
    }
    if (!isAdd) {
      shop.push({
        spuId,
        skuList,
        spuName,
        count: 1,
        payableAmount,
        spec,
        attrs,
        attrValues
      });
    }
    state.cartList = { ...cart };
    // 存入localStorage
    setStore('cached_cart_data', state.cartList);
  },
  // 移除购物车
  [REDUCE_CART](state, {
    shopId,
    spuId,
    attrs
  }) {
    let cartList = state.cartList;
    let cart = cartList[shopId];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].spuId === spuId && (!attrs.length || compareArray(attrs, cart[i].attrs, false))) {
        if (cart[i].count === 1) {
          cart.splice(i, 1);
        } else {
          cart[i].count -= 1;
        }
      }
    }
    setStore('cached_cart_data', state.cartList);
  },
  // 清空购物车
  [CLEAR_CART](state, shopId) {
    state.cartList[shopId] = null;
    setStore('cached_cart_data', state.cartList);
  },
  // 初始化
  [INIT_BUYCART](state) {
    let cartList = getStore('cached_cart_data');
    if (cartList) {
      state.cartList = JSON.parse(cartList);
    }
  }
};
