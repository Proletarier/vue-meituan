import { get } from '../config/http';
import request from '@/utils/request';


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

//登录
export const login = (phone, captcha) => request({ url: '/login', method: 'post',data:{phone,captcha}}); 
export const logout = () => request({ url: '/logout', method: 'post'}); 
export const getInfo = () => request({ url: '/info', method: 'get'}); 
export const getCaptcha = (data) => request({ url: '/captcha', method: 'get',params:data});
//地址
export const address_list = () => request({ url: '/address', method: 'get'}); 
export const delete_address = (addressId) => request({ url: '/address/'+addressId, method: 'delete'});
