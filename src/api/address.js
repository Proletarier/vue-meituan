import request from '@/utils/request';

export function address_list() {
  return request({
    url: '/business/customer_address/list',
    method: 'get'
  });
}

export function delete_address(addressId){
  return request({
    url: '/business/customer_address/'+addressId,
    method: 'delete'
  });
}