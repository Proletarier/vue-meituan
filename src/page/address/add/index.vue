<template>
  <div id="addaddress">
    <section class="address_detail">
      <div>
        <span>联系人：</span>
        <input type="text" v-model="address.name" placeholder="请填写收货人">
      </div>
      <div class="gender">
        <label class="gender_select">
          <input class="radio" id="man" type="radio" name="sex" value="1" v-model="address.gender" autocomplete="off" />
          <i></i>
          先生
        </label>
        <label class="gender_select">
          <input class="radio" id="woman" type="radio" name="sex" value="0" v-model="address.gender" autocomplete="off" />
          <i></i>
          女士
        </label>
      </div>
      <div>
        <span>手机号：</span>
        <input type="text" v-model="address.phone" placeholder="请填写收货手机号码">
      </div>
      <div class="shipping_address" @click="$router.push({path: 'poipicker',query: {source: 'address', ...address }})">
        <span>收货地址：</span>
        <p class="poi">{{address.shippingAddress}}</p>
      </div>
      <div>
        <span>门牌号：</span>
        <input type="text" v-model="address.houseNumber" placeholder="详细地址，例1层101室">
      </div>
    </section>
    <div class="address_save" @click="saveAddress()">保存</div>
    <div v-if="'edit' === editType" @click="deleteAddress()" class="address_del">删除</div>
    <div class="address_return" @click="gotoAddress('/mine/addresslist')">返回</div>
  </div>
</template>

<script>
import index from '../../login';
import service from "@/service";
import './index.styl';

const defaultAddress = {
  id: null,
  phone: null,
  name: null,
  gender: 1,
  houseNumber: null,
  shippingAddress: undefined,
  location: {}
}

export default {
  components: { index },
  data() {
    return {
      address: Object.assign({}, defaultAddress),
      editType: null
    }
  },
  created() {
    this.editType = this.$route.query.editType;
    if ('edit' === this.editType) {
      this.address = { ...this.$route.query, location: { lat: this.$route.query.lat, lng: this.$route.query.lng } };
    } else {
      const { shippingAddress, location } = this.$route.query
      if (shippingAddress && location) {
        this.address.shippingAddress = shippingAddress
        this.address.location = location
      }
    }
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
    saveAddress() {
      if (this.editType === 'edit') {
        service.editAddress({ ...this.address }).then(result => {
          if (result) {
            this.$message.success("修改成功");
            this.gotoAddress("/mine/addresslist")
          }
        })
      } else {
        service.saveAddress({ ...this.address }).then(result => {
          if (result) {
            this.$message.success("添加成功");
            this.gotoAddress("/mine/addresslist")
          }
        })
      }
    }, deleteAddress() {
      this.$dialog({
        content: '确定要删除收获地址吗？',
        onOk: () => {
          service.deleteAddress({ addressId: this.address.id }).then((result) => {
            if (result) {
              this.$message.success('删除成功')
              this.gotoAddress("/mine/addresslist")
            }
          })
        },
      })
    },
  }
}
</script>

