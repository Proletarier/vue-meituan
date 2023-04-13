const foodTypes = require('./mock/food-type.json');
const conditions = require('./mock/category.json');
const shopList = require('./mock/shopList.json');
const orderList = require('./mock/orderList.json');
const user = require('./mock/user.json');
const food = require('./mock/food.json');
const comments = require('./mock/comments.json');
const shopInfo = require('./mock/shopinfo.json');
const qualification = require('./mock/qualification.json');
const cityList = require('./mock/cityList.json');
const orderDetail = require('./mock/order-detail.json');

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  // eslint-disable-next-line global-require
  parallel: require('os').cpus().length > 1,
  pwa: {},
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '美团外卖'
        return args
      })
  },
  devServer: {
    before(app) {
      app.get('/api/kingkongList', (req, res) => {
        res.json({
          error: 0,
          data: foodTypes.kingkongList
        });
      });
      app.get('/api/filterConditions', (req, res) => {
        res.json({
          error: 0,
          data: conditions
        });
      });
      app.get('/api/getShopList', (req, res) => {
        res.json({
          error: 0,
          data: shopList
        });
      });
      app.get('/order/list', (req, res) => {
        res.json({
          error: 0,
          data: orderList
        });
      });
      app.get('/account', (req, res) => {
        res.json({
          error: 0,
          data: user
        });
      });
      app.get('/poi/food', (req, res) => {
        res.json({
          error: 0,
          data: food
        });
      });
      app.get('/poi/comments', (req, res) => {
        res.json({
          error: 0,
          data: comments
        });
      });
      app.get('/poi/info', (req, res) => {
        res.json({
          error: 0,
          data: shopInfo
        });
      });
      app.get('/poi/qualification', (req, res) => {
        res.json({
          error: 0,
          data: qualification
        });
      });
      app.get('/city/list', (req, res) => {
        res.json({
          error: 0,
          data: cityList
        });
      });
      app.get('/order/detail', (req, res) => {
        res.json({
          error: 0,
          data: orderDetail
        });
      });
    },
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: true, // 是否打开浏览器
    port: '9537', // 代理断就
    https: false,
    hotOnly: false // 热更新
  }
};
