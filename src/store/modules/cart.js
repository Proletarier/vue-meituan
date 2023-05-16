import {
  setStore,
  getStore,
  compareArray
} from "@/common/utils";

const getDefaultState = () => ({
  cartList: {},
});

const state = getDefaultState();

const mutations = {
  // 添加购物车
  ADD_CART: (
    state, {
      shopId,
      spuId,
      skuList,
      spuName,
      payableAmount,
      spec,
      attrs,
      attrValues
    }
  ) => {
    let cartList = state.cartList;
    let cart = cartList[shopId] = (cartList[shopId] || []);;
    let isAdd = false;

    if (cart.length) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].spuId === spuId && (!attrs.length || compareArray(attrs, shop[i].attrs, false))) {
          cart[i].count += 1;
          isAdd = true;
          cart[i].wrnm = attrs;
        }
      }
    }
    if (!isAdd) {
      cart.push({
        spuId,
        skuList,
        spuName,
        count: 1,
        payableAmount,
        spec,
        attrs,
        attrValues,
      });
    }
    state.cartList = { ...cartList };
    // 存入localStorage
    setStore("cached_cart_data", state.cartList);
  },
  // 移除购物车
  REDUCE_CART: (state, {
    shopId,
    spuId,
    attrs
  }) => {
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
    setStore("cached_cart_data", state.cartList);
  },
  // 清空购物车
  CLEAR_CART: (state, shopId) => {
    state.cartList[shopId] = null;
    setStore("cached_cart_data", state.cartList);
  },
  // 初始化
  INIT_BUYCART: (state) => {
    let cartList = getStore("cached_cart_data");
    if (cartList) {
      state.cartList = JSON.parse(cartList);
    }
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};