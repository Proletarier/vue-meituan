<template>
  <div class="qualification">
    <section class="content">
      <p><span>单位名称：</span><span>{{this.license.companyName}}</span></p>
      <p><span>法定代表人：</span><span>{{this.license.companyOwner}}</span></p>
      <p><span>经营地址：</span><span>{{this.license.address}}</span></p>
      <p><span>经营范围：</span><span>{{this.license.businessScope}}</span></p>
      <p><span>有效期至：</span><span>{{moment(this.license.expireTime).format('YYYY-MM-DD')}}</span></p>
    </section>
    <section class="content">
      <header class="title">商家资质信息公示</header>
      <div class="pics">
        <div v-for="(pic,index) in this.license.qualifyPics" :key="index"  class="pic" @click="seletPic(index)">
          <img :src="pic" width="100%" height="100%">
        </div>
      </div>
    </section>
    <pics :images="this.license.qualifyPics" :index="this.picIndex" ref="pics"></pics>
  </div>
</template>

<script>
import service from "@/service";
import pics from '@/components/pics';
import moment from 'moment'

import './index.styl';
export default {
  props: {
    shopId: String
  },
  data() {
    return {
      license: {},
      picIndex: 0
    };
  },
  created() {
    service.getShopQualification({shopId: this.shopId}).then(data => {
      this.license = data;
    });
  },
  methods: {
    moment,
    seletPic(index) {
      this.picIndex = index;
      this.$refs.pics.show();
    }
  },
  components: {
    pics
  }
};
</script>
