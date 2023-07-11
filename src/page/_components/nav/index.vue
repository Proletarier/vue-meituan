<template>
  <header class="topNav">
    <div class="box_line">
      <div class="go_back" @click="gotoAddress(path)">
      </div>
      <div class="title">
        {{title}}
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    path: {
      type: Object
    }
  },
  data() {
    return {
    }
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
  }
}
</script>

<style lang="stylus">
.topNav {
  width: 100%;
  height: 50px;
  position: relative;
  touch-action: none;
  z-index: 1;
  .box_line{
    position: fixed
    background-color: rgb(255, 255, 255);
    position: fixed;
    width: 100%;
    z-index: 1000;
  }
  &:after {
    border: 1px solid rgb(204, 204, 204);
    display: block;
    content: '';
    border-top: none;
  }
  .go_back {
    &:after {
      border: #999 solid 2px;
      position: absolute;
      left: 22px;
      top: 50%;
      margin-top: -5px;
      display: block;
      content: '';
      width: 8px;
      height: 8px;
      border-left: none;
      border-bottom: none;
      transform: rotate(225deg);
    }
  }
  .title {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>