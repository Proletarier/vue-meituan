// eslint-disable-next-line import/no-unresolved
import NProgress from 'nprogress'; // 进度条
import router from './router/router';
import { getToken } from './utils/auth'; //  验权

const whiteList = ['/login']; // 不重定向白名单
console.log(router);

router.beforeEach(async (to, from, next) => {
// start progress bar
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); //  重定向到登录页
      NProgress.done();
    }
  }
});
