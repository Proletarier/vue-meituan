import { get } from '../config/http';

/**
 * 获取食品分类列表
 */
export const kingkongList = () => get('api/kingkongList');

/**
 * 获取所有分类
 */
export const getCategories = () => get('api/filterConditions');

/**
 * s商家查询
 */
export const getShopList = () => get('api/getShopList');

/**
 * 订单查询
 */
export const getOrderList = () => get('order/list');

/**
 * 获取个人信息
 */
export const getAccount = () => get('account');

/**
 * 获取商品
 */
export const getFood = () => get('poi/food');

/**
 *  获取评论信息
 */
export const getComments = () => get('poi/comments');

/**
 * 商家信息
 */
export const getShopInfo = () => get('poi/info');

/**
 * 获取商家资格信息
 */
export const getQualification = () => get('poi/qualification');

/**
 * 获取城市信息
 */
export const cityList = () => get('city/list');

/**
 * 订单明细
 */
export const orderDetail = () => get('/order/detail');
