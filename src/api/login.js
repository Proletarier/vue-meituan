import request from '@/utils/request';

export function login(phone, captcha) {
  return request({
    url: '/business/login',
    method: 'post',
    data: {
      phone,
      captcha
    }
  });
}

export function logout() {
  return request({
    url: '/business/logout',
    method: 'post'
  });
}

export function getInfo() {
  return request({
    url: '/business/info',
    method: 'get'
  });
}

export function getCaptcha(data) {
  return request({
    url: '/business/getCaptcha',
    method: 'get',
    params: data
  });
}
