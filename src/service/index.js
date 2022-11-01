import request from './request';
import apis from './apis'



const logout = async params => await request(apis['logout'], { ...params })
const login = async params => await request(apis['login'], { ...params })

//地址
const saveAddress = async params => await request(apis['saveAddress'], { ...params })
const getAddress = async params => await request(apis['getAddress'], { ...params })
const deleteAddress = async params => await request(apis['deleteAddress'], { ...params })
const editAddress = async params => await request(apis['editAddress'], { ...params })

//map
const aroundSearch = async params => await request(apis['aroundSearch'], { ...params })


export default {
  logout,
  login,
  aroundSearch,
  saveAddress,
  getAddress,
  deleteAddress,
  editAddress,
}