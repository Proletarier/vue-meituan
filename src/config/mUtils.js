/* eslint-disable no-param-reassign */
/**
 *  存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    window.localStorage.setItem(name, JSON.stringify(content));
  } else {
    window.localStorage.setItem(name, content);
  }
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return null;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

/**
 * 判断两个数字的值是否相等
 * @param {*} x 数组1
 * @param {*} y 数组2
 * @param {*} positionFlag 元素位置是否必须相同，默认true
 */
export const compareArray = (x, y, positionFlag = true) => {
  if (x.length !== y.length) {
    return false;
  }
  if (!positionFlag) {
    x = x.sort();
    y = y.sort();
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      return false;
    }
  }
  return true;
};

/**
 * 解决精度问题
 * @param {Number} x 第一个数字
 * @param {Number} y 第二个数字
 * @param {String} type 类型
 * @param {String} fixedLength fixed位数
 * @returns {Number}
 */
export const fixed = (x, y, type, fixedLength) => {
  switch (type) {
    case '+':
      return parseFloat((x + y).toFixed(fixedLength || 10));
    case '-':
      return parseFloat((x - y).toFixed(fixedLength || 10));
    case '*':
      return parseFloat((x * y).toFixed(fixedLength || 10));
    case '/':
      return parseFloat((x / y).toFixed(fixedLength || 10));
    default:
      return '类型错误';
  }
};
