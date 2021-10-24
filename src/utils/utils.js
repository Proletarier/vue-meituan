// eslint-disable-next-line import/prefer-default-export
export function isPhone(phoneStr) {
  let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!myreg.test(phoneStr)) {
    return false;
  }
  return true;
}
