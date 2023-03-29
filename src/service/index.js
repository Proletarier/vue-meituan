import request from './request';
import apis from './apis'



const logout = async params => await request(apis['logout'], { ...params })
const login = async params => await request(apis['login'], { ...params })
//首页
const listGoodsCate = async params => await request(apis['listGoodsCate'], { ...params })
const filterConditions = async params => await request(apis['filterConditions'], { ...params })
const nearShop = async params => await request(apis['nearShop'], { ...params })

//地址
const saveAddress = async params => await request(apis['saveAddress'], { ...params })
const getAddress = async params => await request(apis['getAddress'], { ...params })
const deleteAddress = async params => await request(apis['deleteAddress'], { ...params })
const editAddress = async params => await request(apis['editAddress'], { ...params })
const getCityList = async params => await request(apis['getCityList'], { ...params })
//map
const aroundSearch = async params => await request(apis['aroundSearch'], { ...params })
const keywordSearch = async params => await request(apis['keywordSearch'], { ...params })

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
}