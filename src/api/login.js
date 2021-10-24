/* eslint-disable import/no-cycle */
import request from '@/utils/request';

export function login(username, password) {
  return request({
    url: '/business/login',
    method: 'post',
    data: {
      username,
      password
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
