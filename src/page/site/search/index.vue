<template>
  <div id="searchSite">
    <div class="select">
      <i class="site"></i>
      <div class="city" >
        <router-link  :to="{path:'/mine/poipicker/city', query: { source: 'poipicker' }}">
          {{ poi.city }}
        </router-link>
      </div>
      <div class="search">
        <i class="search_avg"></i>
        <input
          @click="siteDisplay = true "
          class="search_input"
          type="search"
          placeholder="小区/街道/大厦/学校名称"
          autocomplete="off"
          autocorrect="off"
          v-model="keyword.keywords"
        />
        <i v-show="siteDisplay && keyword.keywords"  @click="cancel" class="cancel" />
      </div>
      <div v-show="siteDisplay" @click="cancel"  class="cancel_txt">取消</div>
    </div>
    <ul v-show="siteDisplay" class="address_items">
      <li
        @click="$emit('toAddress', { name:item.name , location:item.location })"
        class="address_item"
        v-for="(item, index) in addresslist"
        :key="index"
      >
        <div class="site">
          <p class="name">{{ item.name }}</p>
          <p class="detail">{{ item.district }}{{ item.address }}</p>
        </div>
        <div class="distance">
        </div>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import service from "@/service";
import './index.styl';

export default {
  props: {
    poi: Object
  },
  data() {
    return {
      addresslist: [],
      siteDisplay: false,
      keyword: {
        keywords: undefined,
        location: undefined,
        city: undefined,
        datatype: "poi",
        citylimit: true,
      },
    };
  },
  watch: {
    keyword: {
      handler: function(onChange) {
        if(onChange && onChange.keywords){
          if(!this.$loading.isrun()){
            this.keywordsSearch();
          }
        }
      },
      deep: true
    }
  },
  created() {},
  methods: {
    keywordsSearch() {
      this.$loading.show()
      const { location, citycode } = this.poi
      const  params = {
        ...this.keyword,
        location: location?.join(","),
        city: citycode
      }
      service.keywordSearch({...params}).then(result=>{
         this.addresslist = result
         this.$loading.hide()
      })
    },
    gotoRouter(){
      this.$router.push({ path: 'poipicker/city', query: { source: 'editAddress' } });
    },
    cancel(){
       this.keyword.keywords = ""
       this.siteDisplay =  false
       this.addresslist = []
    },
    setDisplay(){
      this.siteDisplay = true
    }
  }
};
</script>