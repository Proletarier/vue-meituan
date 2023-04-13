<template>
  <div id="poipicker">
    <SearchSite ref="searchSite" :poi="poi" @toAddress="toAddress"></SearchSite>
    <section class="poi">
      <span>{{ this.poiStatus ? "定位中..." : "当前位置：" }} </span>
      <span class="loc">{{ presentAddress }}</span>
      <span class="reloc" @click="getLocation">重新定位</span>
    </section>
    <section v-if="this.$route.query.source === 'home'" class="shopping_address">
      <p class="title">我的地址</p>
      <ul class="address_items">
        <li
          class="address_item"
          v-for="(item, index) in mineAddresslist"
          :key="index"
          @click="toAddress({
            name:item.shippingAddress,
            location:`${item.location.lat},${item.location.lng}`
          })"
        >
          <div class="detail">
            <span class="shippingAddress">{{ item.shippingAddress }}</span>
            <span>{{ item.houseNumber }}</span>
          </div>
          <div class="contact">
            <span class="name">{{ item.name }}</span>
            <span>{{ item.phone }}</span>
          </div>
        </li>
      </ul>
    </section>
    <section class="nearby_address">
      <p class="title">附近地址</p>
      <ul class="address_items">
        <li
          class="address_item"
          v-for="(item, index) in nearbyAddress"
          :key="index"
          @click="toAddress(item)"
        >
          <p class="name">{{ item.name }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
import service from "@/service";
import search from "./search";
import './index.styl';

export default {
  data() {
    return {
      presentAddress: undefined,
      mineAddresslist: [],
      nearbyAddress: [],
      poiStatus: false,
      ipLoction: false,
      poi: {
        city: "请选择城市",
        citycode: undefined,
        location: [],
      },
    };
  },
  mounted() {
  },
  created() {
    const { source } = this.$route.query
    if(source === 'home'){
      this.getMineAddressList();
    }
    this.getLocation();
  },
  watch: {
    $route: {
      handler(val, oldval) {
        const { city_name, city_id } = this.$route.query;
        if (city_name && city_id) {
          this.poi = {
            city: city_name,
            citycode: city_id,
          };
          this.$refs.searchSite.setDisplay()
        }
      },
    },
  },
  methods: {
    ...mapActions('point',[
      "setLocation"
    ]),
    toAddress(address = {}) {
      const { name, location } = address;
      const { source } = this.$route.query
     if(source === 'home'){
       this.setLocation({
          place: name,
          lat:location.split(',')[0],
          lng:location.split(',')[1]
       })
      this.$router.push({ path: "/home"});
     }else {
      this.$router.push({
        path: "/mine/addaddress",
        query: { ...this.$route.query, shippingAddress: name, location: {lat:location.split(',')[0],lng:location.split(',')[1]}, },
      });
     }
    },
    getMineAddressList() {
      service.getAddress().then((data) => {
        this.mineAddresslist = data;
      });
    },
    aroundSearch(location = []) {
      const params = {
        offset: 5,
        location: location.toString(),
      };
      service.aroundSearch(params).then((result) => {
        if (result) {
          this.nearbyAddress = result;
        }
      });
    },
    getLocation() {
      let _this = this;
      _this.poiStatus = true;
      _this.presentAddress = "";
      let mapObj = new AMap.Map("iCenter");
      mapObj.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          GeoLocationFirst: true,
          timeout: 3000,
          extensions: "all",
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          //  _this.location = data.aois[0].name;
          _this.poiStatus = false;
        }

        function onError(data) {
          geolocation.getCityInfo((status, result) => {
            if (status === "complete" && result.info === "SUCCESS") {
              const { center, city, citycode } = result;
              _this.presentAddress = city;
              _this.poi = {
                city: city,
                citycode: citycode,
                location: center,
              };
              _this.poiStatus = false;
              _this.aroundSearch(center);
            } else {
              AMap.plugin("AMap.CitySearch", function () {
                var citySearch = new AMap.CitySearch();
                citySearch.getLocalCity(function (status, result) {
                  if (status === "complete" && result.info === "OK") {
                    console.log("CitySearch", result);
                    const { city, adcode } = result;
                    _this.presentAddress = city;
                    _this.poi = {
                      city: city,
                      citycode: adcode,
                    };
                    _this.poiStatus = false;
                    _this.ipLoction = true;
                    _this.getMineAddressList();
                  }
                });
              });
            }
          });
        }
      });
    },
  },
  components: {
    SearchSite: search,
  },
};
</script>
