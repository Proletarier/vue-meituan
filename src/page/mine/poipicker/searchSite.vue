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

<style lang="stylus">
#searchSite{
  .select{
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 15px 8px 10px;
    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background: #e4e4e4;
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .site {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url('../../../images/city_site.png') no-repeat;
      background-size: 100% 100%;
    }
    .city {
      position: relative;
      padding: 4px 5px;

      &:after {
        position: absolute;
        display: block;
        content: '';
        width: 8px;
        height: 8px;
        top: 50%;
        right: -7%;
        margin-top: -4px;
        background: url('../../../images/arrow-top.png') no-repeat;
        background-size: 100% 100%;
        transform: rotateZ(180deg);
      }
    }
    .search {
      margin-left: 14px;
      flex: 1;
      display: flex;
      align-items: center;
      .search_avg {
        display: inline-block;
        height: 14px;
        width: 14px;
        background: url('../../../images/search.png') no-repeat;
        background-size: 100% 100%;
      }

      .search_input {
        width: 80%;
        margin-left: 4px;
        font-size: 14px;
        &::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }
      }
      .cancel {
        display: inline-block;
        height: 15px;
        width: 15px;
        background: url('../../../images/cancel.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .cancel_txt {
      position: relative;
      padding-left: 10px;
      line-height: 14px;
      font-size: 14px;
      color: #999999;
      text-align: center;
      &::before {
        position: absolute;
        content: '';
        width: 1px;
        height: 100%;
        background: #e4e4e4;
        left: 0;
        top: 0;
      }
    }
  }
  .address_items{
    padding-left: 15px;
    position: absolute
    background: #fff
    height: 100%
    width: 100%
    z-index: 1
    .address_item{
      display: flex
      padding: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px  solid rgba(173,173,173,0.2)
      .site{
        overflow: hidden;
        font-size: 16px;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .name{
          display: inline-block;
        }
        .detail{
          font-size: 12px;
          color: #999;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>