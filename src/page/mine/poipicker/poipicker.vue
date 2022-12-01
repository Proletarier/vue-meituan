<template>
  <div id="poipicker">
    <SearchSite ref="searchSite" :poi="poi" @toAddress="toAddress"></SearchSite>
    <section class="poi">
      <span>{{ this.poiStatus ? "定位中..." : "当前位置：" }} </span>
      <span class="loc">{{ presentAddress }}</span>
      <span class="reloc" @click="getLocation">重新定位</span>
    </section>
    <section v-if="ipLoction" class="shopping_address">
      <p class="title">我的地址</p>
      <ul class="address_items">
        <li
          class="address_item"
          v-for="(item, index) in mineAddresslist"
          :key="index"
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
    <section v-else class="nearby_address">
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
import service from "@/service";
import searchSite from "./searchSite";

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
    toAddress(address = {}) {
      const { name, location } = address;
      this.$router.push({
        path: "/mine/addaddress",
        query: { name: name, location: location },
      });
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
    SearchSite: searchSite,
  },
};
</script>

<style lang="stylus">
#poipicker {
  .poi {
    position: relative;
    margin: 20px 0 10px;
    padding-left: 15px;
    font-size: 16px;
    color: #333;

    .loc {
      font-weight: 600;
    }

    .reloc {
      position: absolute;
      top: 0;
      right: 15px;
      font-size: 14px;
      color: #ffb000;

      &:before {
        display: inline-block;
        content: '';
        margin-right: 3px;
        width: 15px;
        height: 15px;
        background: url('../../../images/loc.png') no-repeat;
        background-size: cover;
        vertical-align: top;
      }
    }
  }

  .shopping_address {
    .title {
      display: flex;
      padding: 15px 0 10px 15px;
      font-size: 14px;
      color: #999;

      &:before {
        display: inline-block;
        content: '';
        margin-right: 3px;
        width: 15px;
        height: 15px;
        background: url('../../../images/house.png') no-repeat;
        background-size: cover;
        vertical-align: text-bottom;
      }
    }

    .address_items {
      padding-left: 5vw;

      .address_item {
        padding: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px solid;
        border-color: rgba(228, 228, 228, 0.7);

        .detail {
          font-size: 16px;
          margin-bottom: 10px;

          .shippingAddress {
            padding-right: 10px;
          }
        }

        .contact {
          font-size: 14px;
          color: #666;

          .name {
            padding-right: 10px;
          }
        }
      }
    }
  }

  .nearby_address {
    .title {
      display: flex;
      padding: 15px 0 10px 5vw;
      font-size: 14px;
      color: #999;

      &:before {
        display: inline-block;
        content: '';
        margin-right: 3px;
        width: 15px;
        height: 15px;
        background: url('../../../images/city_site.png') no-repeat;
        background-size: cover;
        vertical-align: text-bottom;
      }
    }

    .address_items {
      padding-left: 5vw;

      .address_item {
        padding: 17px 0;
        border-bottom: 1px solid;
        border-color: rgba(228, 228, 228, 0.7);
        font-size: 16px;
      }
    }
  }
}
</style>
