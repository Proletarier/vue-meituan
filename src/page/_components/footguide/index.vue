<template>
  <section class="foot-tab">
    <section :class="['item',$route.path.indexOf('home') !== -1? 'active':'']" @click="gotoAddress({path: 'home'})">
      <div class="menuHome footerImg"></div>
      <span>首页</span>
    </section>
    <section :class="['item',$route.path.indexOf('order') !== -1? 'active':'']" @click="gotoAddress({path: 'order'})">
      <div class="orderlist footerImg"></div>
      <span>订单</span>
    </section>
    <section :class="['item',$route.path.indexOf('mine') !== -1? 'active':'']"  @click="gotoAddress({path: 'mine'})">
      <div  class="footerImg wode"></div>
      <span>我的</span>
    </section>
  </section>
</template>

<script>
import './index.styl';
export default {
  computed:{
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    }
  }
};
</script>