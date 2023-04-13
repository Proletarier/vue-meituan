// eslint-disable-next-line import/prefer-default-export
const isPhone = (phoneStr) => {
  let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!myreg.test(phoneStr)) {
    return false;
  }
  return true;
};

const $$conversion = (list = [], value,isObj = false) => {
  const record = list.find(
    (item) => item.value === value || item.Value === value
  );
  const { label  } = record || {};
  if(isObj && label){
    return record
  } else if (label) {
    return label;
  } else {
    return "-";
  }
};

/**
 * 判断两个数字的值是否相等
 * @param {*} x 数组1
 * @param {*} y 数组2
 * @param {*} positionFlag 元素位置是否必须相同，默认true
 */
const compareArray = (x, y, positionFlag = true) => {
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


export { isPhone, $$conversion,compareArray };
