<template>
  <div id="poipicker">
    <header>
      <i class="site"></i>
      <div class="city">
        {{city}}
      </div>
      <div class="search">
        <i class="search_avg"></i>
        <input class="search_input" type="search" placeholder="小区/街道/大厦/学校名称"  
        autocomplete="off" autocorrect="off" v-model="keyword"/>
        <i class="cancel"/>
      </div>
      <div class="cancel_txt">取消</div>
    </header>
    <section class="poi">
      当前位置：
      <span class="loc">{{location}}</span>
      <span class="reloc">重新定位</span>
    </section>
    <section class="shopping_address"></section>
    <section class="nearby_address"></section>
  </div>
</template>

<script>
export default {
  data(){
    return{
      location: '新天府国际中心',
      city: '成都市',
      keyword: ''
    }
  },
  mounted(){
  
  },
  created(){
    this.getLocation();
  },
  methods:{
    getLocation(){
      var options = {
        enableHighAccuracy : true,
        maximumAge : 1000
      }
      if (navigator.geolocation) {
        //浏览器支持geolocation
        navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError,options);
      }
    },
    onSuccess(position) {
      //经度
      var longitude = position.coords.longitude;
      //纬度
      var latitude = position.coords.latitude;
      console.log(position)
      alert('当前地址的经纬度：经度' + longitude + '，纬度' + latitude);
    },
    onError(error) {

    }
  }
}
</script>

<style lang='stylus'>
#poipicker
  header
   position relative
   display: flex
   align-items: center
   padding: 8px 15px 8px 10px
   &:after
    content: ''
    width: 100%
    height: 1px
    background: #e4e4e4
    position: absolute
    left: 0
    bottom: 0
  .site
    display: inline-block
    width: 15px
    height: 15px
    background: url(../../images/city_site.png) no-repeat
    background-size: 100% 100%
  .city
    position relative
    padding 4px 5px
    &:after
      position: absolute
      display: block
      content: ''
      width 8px
      height: 8px
      top 50%
      right: -7%
      margin-top: -4px
      background:  url(../../images/arrow-top.png) no-repeat
      background-size: 100% 100%
      transform: rotateZ(180deg)
  .search
    margin-left: 14px
    flex: 1
    display: flex
    align-items: center
    .search_avg
      display: inline-block
      height: 14px
      width: 14px
      background:  url(../../images/search.png) no-repeat
      background-size: 100% 100%
    .search_input
       width 80%
       margin-left: 4px
       font-size: 14px
       &::-webkit-search-cancel-button
         -webkit-appearance: none
    .cancel
      display: inline-block
      height: 15px
      width: 15px
      background:  url(../../images/cancel.png) no-repeat
      background-size: 100% 100%
  .cancel_txt
    position relative
    padding-left: 10px
    line-height: 14px
    font-size: 14px
    color: #999999
    text-align: center   
    &::before
      position: absolute
      content: ''
      width: 1px
      height: 100%
      background: #e4e4e4
      left: 0
      top 0
  .poi
    position relative
    margin: 20px 0 10px
    padding-left: 15px
    font-size: 16px
    color: #333
    .loc
      font-weight: 600
    .reloc
      position: absolute
      top: 0
      right: 15px
      font-size: 14px
      color #ffb000
</style>