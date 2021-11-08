<template>
  <div class="addresslist">
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

<style>

</style>