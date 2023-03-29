<template>
  <div class="star_container">
    <svg v-for="(star,index) in stars" :key="index"  class="star">
      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="star"></use>
    </svg>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = '#star_on';
const CLS_HALF = '#star_half';
const CLS_OFF = '#star_off';

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    stars() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="stylus">
.star_container
  display inline-block
  .star{
    width 10px
    height 10px
    margin-right 2px
    display inline-block
  }
</style>
