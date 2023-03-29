export default {
  logout: {
    method: 'POST',
    url: '/logout'
  },
  login: {
    method: 'POST',
    url: '/login'
  },
  aroundSearch: {
    method: 'GET',
    url: '/map/poi/around'
  },
  keywordSearch: {
    method: 'GET',
    url: '/map/assistant/input_tips'
  },
  saveAddress: {
    method: 'POST',
    url: '/customer/address/save'
  },
  getAddress: {
    method: 'GET',
    url: '/customer/address/getAddress'
  },
  deleteAddress: {
    method: 'DELETE',
    url: '/customer/address/{{addressId}}'
  },
  editAddress: {
    method: 'PUT',
    url: '/customer/address/update'
  },
  getCityList: {
    method: 'GET',
    url: '/customer/address/getCityList'
  },
  listGoodsCate: {
    method: 'GET',
    url: '/home/goods_cate'
  },
  filterConditions: {
    method: 'GET',
    url: '/home/filter_conditions'
  },
  nearShop: {
    method: 'GET',
    url: '/home/getShops'
  },
}