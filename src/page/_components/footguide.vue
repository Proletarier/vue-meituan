<template>
  <section class="foot-tab">
    <section class="item" @click="gotoAddress({path: 'home'})">
      <svg>
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('home') !== -1? '#selecting_home' : '#home'"></use>
      </svg>
      <span>首页</span>
    </section>
    <section class="item" @click="gotoAddress({path: 'order'})">
      <svg>
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('order') !== -1? '#selecting_order' : '#order'">></use>
      </svg>
      <span>订单</span>
    </section>
    <section class="item" @click="gotoAddress({path: 'mine'})">
      <svg>
        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('mine') !== -1? '#selecting_mine' : '#mine'">></use>
      </svg>
      <span>我的</span>
    </section>
  </section>
</template>

<script>
export default {
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="stylus">
  .foot-tab
    position fixed
    display flex
    left 0
    right 0
    bottom 0
    width 100%
    height 49px
    background #fafafa
    box-shadow 0 -0.02667rem 0.05333rem rgba(0,0,0,.1)
    .item
      flex 1
      display flex
      flex-direction column
      flex-wrap wrap
      justify-content center
      align-items center
      svg
        width 26px
        height 26px
      span
        margin-top 3px
        font-size 12px
        color #999
</style>
