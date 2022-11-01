
const API_CODES = {
  'failed': '操作失败',
  'Validate.Failed': '参数检验失败',
  'Unauthorized': '暂未登录或token已经过期',
  'Forbidden': '没有相关权限',
  'Validate.Null': '请求的数据格式不符',
  'System.Error': '服务器内部错误',
  'Repeat.Submit': '请勿重复提交'
}

 const STATUS_CONFIG = {
  '400':'请求错误',
  '401':'未授权，请重新登录',
  '400':'拒绝访问',
  '400':'请求出错',
  '400':'请求超时',
  '400':'服务器错误',
}

export {
  STATUS_CONFIG,
  API_CODES,
}
