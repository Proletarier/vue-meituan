<template>
  <div class="qualification">
    <section class="content">
      <p><span>单位名称：</span><span>{{this.certify_info.company_name}}</span></p>
      <p><span>法定代表人：</span><span>{{this.certify_info.company_owner}}</span></p>
      <p><span>经营地址：</span><span>{{this.certify_info.address}}</span></p>
      <p><span>经营范围：</span><span>{{this.certify_info.business_scope}}</span></p>
      <p><span>有效期至：</span><span>{{this.certify_info.expire_time}}</span></p>
    </section>
    <section class="content">
      <header class="title">商家资质信息公示</header>
      <div class="pics">
        <div v-for="(pic,index) in this.qualification.qualify_pics" :key="index"  class="pic" @click="seletPic(index)">
          <img :src="pic" width="100%" height="100%">
        </div>
      </div>
    </section>
    <pics :images="this.qualification.qualify_pics" :index="this.picIndex" ref="pics"></pics>
  </div>
</template>

<script>
import { getQualification } from '../../../service/api';
import pics from '@/components/pics';

export default {
  props: {
    shopId: String
  },
  data() {
    return {
      qualification: Object,
      certify_info: Object, // 商家信息
      picIndex: 0
    };
  },
  created() {
    getQualification().then(res => {
      this.qualification = res.data;
      this.certify_info = this.qualification.certify_info;
    });
  },
  methods: {
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

<style lang="stylus">
  .qualification
    position fixed
    padding 10px
    top 0
    left 0
    right 0
    bottom 0
    top 0
    background #f6f6f6
    z-index 50
    .content
      padding 10px
      margin-bottom 10px
      border-radius 10px
      background #fff
      p
       display flex
       margin-top 20px
       span:first-child
         flex-shrink 0
         margin-right 6px
         width 75px
         color #c4a6a6
         font-size 12px
         line-height 20px
       span:last-child
         line-height 20px
         font-size 14px
    .title
      font-size 14px
      line-height 30px
    .pics
      display flex
      height 120px
      margin-top 5px
      .pic
        flex 1
        border-radius 6px
        overflow hidden
        &:first-child
          margin-right 3px
        &:last-child
          margin-left 3px
        img
         object-fit cover
</style>
