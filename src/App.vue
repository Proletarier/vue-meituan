<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from '@/components/svg';

export default {
  components: {
    svgIcon
  }
};
</script>

<style lang="stylus">
</style>
