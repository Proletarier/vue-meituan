<template>
  <div>
    <transition name="fold">
      <article class="tableware" v-if="fold" @click.self="toggleList">
        <header class="tip">按政府条例要求：商家不得主动向您提供一次性餐具，请按需选择餐具数量。</header>
        <section class="header">
          <span>取消</span>
          <p style="flex: 1 1 0%;">选择本单餐具</p><span>确定</span>
        </section>
        <section class="body">
          <div class="scroll-wrapper">
            <div class="rmc-picker-mask" style="background-size: 100% 60px;">
              
            </div>
          </div>
        </section>
      </article>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="fold"></div>
    </transition>
  </div>
</template>

<script>

import './index.styl';
export default {
  props: {
  },
  created() {
  },
  data() {
    return {
      fold: false,
    };
  },
  methods: {
    toggleList() {
      this.fold = !this.fold;
    },
  },
  computed: {
  }
}
</script>