<template>
  <div class="addresslist">
    <header>
      <div class="go_back">
        <i></i>
      </div>
      <div class="title">
      </div>
    </header>
  </div>
</template>

<script>
import { address_list } from '@/api/address';

export default {
  data() {
    return {
      addresslist:[]
    }
  },
  created(){
    address_list().then((result) => {
      
    })
  }
}
</script>

<style lang="stylus">
  .addresslist
    header
      .go_back
         i 
          background url(/@/images/arrow-r.png)
          background-size: 20% 30%
          background-position: center
</style>