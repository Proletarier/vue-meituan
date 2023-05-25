import request from './request';
import apis from './apis'


const getCaptcha = async params => await request(apis['getCaptcha'], { ...params })
const logout = async params => await request(apis['logout'], { ...params })
const login = async params => await request(apis['login'], { ...params })
//首页
const listGoodsCate = async params => await request(apis['listGoodsCate'], { ...params })
const filterConditions = async params => await request(apis['filterConditions'], { ...params })
const nearShop = async params => await request(apis['nearShop'], { ...params })
const categoriesByChildren = async params => await request(apis['categoriesByChildren'], { ...params })
//地址
const saveAddress = async params => await request(apis['saveAddress'], { ...params })
const getAddress = async params => await request(apis['getAddress'], { ...params })
const deleteAddress = async params => await request(apis['deleteAddress'], { ...params })
const editAddress = async params => await request(apis['editAddress'], { ...params })
const getCityList = async params => await request(apis['getCityList'], { ...params })
//map
const aroundSearch = async params => await request(apis['aroundSearch'], { ...params })
const keywordSearch = async params => await request(apis['keywordSearch'], { ...params })

const getShopInfo = async params => await request(apis['getShopInfo'], { ...params })
const getShopQualification = async params => await request(apis['getShopQualification'], { ...params })
const getFood = async params => await request(apis['getFood'], { ...params })
const commentsSummary = async params => await request(apis['commentsSummary'], { ...params })
const getCommentList = async params => await request(apis['getCommentList'], { ...params })


export default {
  logout,
  login,
  aroundSearch,
  saveAddress,
  getAddress,
  deleteAddress,
  editAddress,
  keywordSearch,
  getCityList,
  listGoodsCate,
  filterConditions,
  nearShop,
  categoriesByChildren,
  getCaptcha,
  getShopInfo,
  getShopQualification,
  getFood,
  commentsSummary,
  getCommentList
}