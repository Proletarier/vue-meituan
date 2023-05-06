const _activity = [
  { label: '优惠商家', value: 'preferential' , icon:"http://p1.meituan.net/xianfu/68d64dd10b1498f5067a1c03e6d24869624.png"  },
  { label: '首单立减', value: 'firstSubtraction', icon:"http://p0.meituan.net/xianfu/019d1bbb1310b1531e6af6172c9a5095581.png" },
  { label: '满减优惠', value: 'fullSubtraction', icon:"http://p0.meituan.net/xianfu/f8bc8dffdbc805878aa3801a33f563cd1001.png" },
  { label: '进店领卷', value: 'coupon' , icon:"http://p0.meituan.net/xianfu/c2c0f31d0ebf0f60af115d058169c492992.png"},
  { label: '第二份半价', value: 'half', icon:"http://p0.meituan.net/xianfu/0c89ff7d86aa47827e62afa6d41a15f5535.png" },
  { label: '满减代金劵', value: 'fullCoupon' , icon:"http://p0.meituan.net/xianfu/652eea4034250563fe11b02e3219ba8d981.png"},
  { label: '折扣商品', value: 'discount', icon:"http://p1.meituan.net/xianfu/9c997ecce6150671b8459738a26f8bd9767.png" },
  { label: '提前下单优惠', value: 'ahead' , icon:"http://p0.meituan.net/xianfu/538a2adfab46a37ec42853aece765704603.png"},
  { label: '满赠活动', value: 'fullGive' , icon:"http://p1.meituan.net/xianfu/5ffe01c550a139db693d152cefd1b247869.png"},
  { label: '门店新客立减', value: 'newSubtraction', icon:"http://p1.meituan.net/xianfu/1cc4324d7d2f59f2cccb6920b57cd0902048.png" },
  { label: '买赠活动', value: 'buyGive', icon:"http://p1.meituan.net/xianfu/04d485a1b8e040bff21c02c19a9731d92048.png"},
  { label: '减配送费', value: 'reduceDeliveryPrice', icon:"http://p0.meituan.net/xianfu/10d0777e47844ea90b89d23c01eabe3c1164.png" },
  { label: '支持开发票', value: 'invoice', icon:"http://p0.meituan.net/xianfu/476ba65ee80b6385bab292c085baed17940.png" },
]

const _sortVOList = [
  { label: '综合排序', value: 'synthesize' , position: 1},
  { label: '销量最高', value: 'sales' , position: 0},
  { label: '速度最快', value: 'speed' , position: 1},
  { label: '距离最近', value: 'distance' , position: 0},
  { label: '评分最高', value: 'score' , position: 1},
  { label: '起送价最低', value: 'min_price' , position: 1},
  { label: '配送费最低', value: 'min_shipping_fee' , position: 1},
  { label: '人均高到低', value: 'max_average_price' , position: 1},
  { label: '人均低到高', value: 'min_average_price' , position: 1},
]

const _shopCharacteristics = [
  { label: '免配送费', value: 'free_average_price' },
  { label: '0元起送', value: 'not_limit_delivery' },
  { label: '新商家', value: 'new_shop' },
  { label: '品牌商家', value: 'brand_shop' },
  { label: '点评高分', value: 'high_mark' },
  { label: '跨天预订', value: 'reserve' },
  { label: '支持开发票', value: 'invoice' },
]

export {
  _activity,
  _sortVOList,
  _shopCharacteristics
}
