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
}