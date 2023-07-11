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
      foodId,
      imageUrl,
      spuName,
      attrs,
      attrValues,
      boxFee,
      currentPrice,
      originPrice,
      unit,
      activityPolicy
    }
  ) => {
    let cartList = state.cartList;
    let cart = cartList[shopId] = (cartList[shopId] || []);;
    let isAdd = false;

    if (cart.length) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].foodId === foodId && (!attrs.length || compareArray(attrs, cart[i].attrs, false))) {
          cart[i].count += 1;
          isAdd = true;
          cart[i].wrnm = attrs;
        }
      }
    }
    if (!isAdd) {
      const { minPurchaseNum } = activityPolicy?.discount || {}
      cart.push({
        foodId,
        imageUrl,
        spuName,
        count: minPurchaseNum || 1,
        attrs,
        attrValues,
        boxFee,
        currentPrice: currentPrice,
        originPrice: originPrice,
        unit,
        activityPolicy
      });
    }
    state.cartList = { ...cartList };
    // 存入localStorage
    setStore("cached_cart_data", state.cartList);
  },
  // 移除购物车
  REDUCE_CART: (state, {
    shopId,
    foodId,
    attrs
  }) => {
    let cartList = state.cartList;
    let cart = cartList[shopId];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].foodId === foodId && (!attrs.length || compareArray(attrs, cart[i].attrs, false))) {
         const { minPurchaseNum = 1 }  = cart[i]?.activityPolicy?.discount
         if (cart[i].count === minPurchaseNum) {
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