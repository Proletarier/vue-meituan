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
      <span class="loc">{{ location }}</span>
      <span class="reloc" @click="getLocation()">重新定位</span>
    </section>
    <section class="shopping_address">
      <p class="title">我的收货地址</p>
      <ul class="address_items">
        <li class="address_item" v-for="(item,index) in addresslist" :key="index">
          <div class="detail">
            <span class="poi">{{item.poi}}</span>
            <span>{{item.houseNumber}}</span>
          </div>
          <div class="contact">
            <span class="name">{{item.name}}</span>
            <span>{{item.phone}}</span>
          </div>
        </li>
      </ul>
    </section>
    <section class="nearby_address"></section>
  </div>
</template>

<script>
import { address_list } from '@/service/api';

export default {
  data(){
    return{
      location: '',
      city: '成都市',
      keyword: '',
      addresslist:[]
    }
  },
  mounted(){
  
  },
  created(){
    this.getLocation();
    this.addressList();
  },
  methods:{
    addressList(){
      address_list().then((result) => {
        this.addresslist=result.data
      })
    },
    getLocation() {
      let _this = this;
      let mapObj = new AMap.Map('iCenter');
      mapObj.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          GeoLocationFirst: true,
          extensions:'all'
        })
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);

        function onComplete(data) {
          console.log('具体的定位信息',data)
          _this.location = data.aois[0].name
        }
        
        function onError(data) {
          // 失败 启用 ip定位
          AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                  console.log('通过ip获取当前城市：', result)
                  _this.location =result.city
              }
            })
          })
        }
      })
    },
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
      &:before
        display: inline-block
        content: ''
        margin-right: 3px
        width: 15px
        height: 15px
        background:  url(../../images/loc.png) no-repeat
        background-size: cover
        vertical-align: top 
  .shopping_address
    .title
     padding: 15px 0 10px 15px
     font-size: 14px
     color: #999
     &:before
        display: inline-block
        content: ''
        margin-right: 3px
        width: 15px
        height: 15px
        background:  url(../../images/house.png) no-repeat
        background-size: cover
        vertical-align: text-bottom
    .address_items
      padding-left: 15px
      .address_item
        padding: 20px 0
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
</style>