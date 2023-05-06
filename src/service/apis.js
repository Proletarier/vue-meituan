export default {
  logout: {
    method: 'POST',
    url: '/api/logout'
  },
  login: {
    method: 'POST',
    url: '/api/login'
  },
  getCaptcha: {
    method: 'GET',
    url: '/api/captcha'
  },
  aroundSearch: {
    method: 'GET',
    url: '/api/map/poi/around'
  },
  keywordSearch: {
    method: 'GET',
    url: '/api/map/assistant/input_tips'
  },
  saveAddress: {
    method: 'POST',
    url: '/api/customer/address/save'
  },
  getAddress: {
    method: 'GET',
    url: '/api/customer/address/getAddress'
  },
  deleteAddress: {
    method: 'DELETE',
    url: '/api/customer/address/{{addressId}}'
  },
  editAddress: {
    method: 'PUT',
    url: '/api/customer/address/update'
  },
  getCityList: {
    method: 'GET',
    url: '/api/customer/address/getCityList'
  },
  listGoodsCate: {
    method: 'GET',
    url: '/api/home/goods_cate'
  },
  filterConditions: {
    method: 'GET',
    url: '/api/home/filter_conditions'
  },
  nearShop: {
    method: 'POST',
    url: '/api/home/getShops'
  },
  categoriesByChildren: {
    method: 'GET',
    url: '/api/home/categoriesByChildren'
  },
  getShopInfo: {
    method: 'GET',
    url: '/api/shop/{{shopId}}'
  },
  getShopQualification: {
    method: 'GET',
    url: '/api/shop/qualification/{{shopId}}'
  }
}