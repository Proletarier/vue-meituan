<template>
  <div class="addresslist">
    <header>
      <div class="box_line">
        <div class="go_back" @click="gotoAddress('/mine')">
        </div>
        <div class="title">
           地址列表
        </div>
      </div>
    </header>
    <section class="address">
      <ul class="address_items">
        <li ref="addressItem" class="address_item" v-for="(item,index) in addresslist" :key="index"
        :class="{'active': activeIndex == index }">
          <div class="content" style="width: 90%"  @touchstart ="itemMoveStart" @touchend ="itemMoveEnd($event, index)">
            <div class="detail">
              <span class="poi">{{item.shippingAddress}}</span>
              <span>{{item.houseNumber}}</span>
            </div>
            <div class="contact">
              <span class="name">{{item.name}}</span>
              <span>{{item.phone}}</span>
            </div>
          </div>
          <a class="edit" @click="editAddress(item)"></a>
          <div class="delete"  @click="deleteAddress(item.id,index)">删除</div>
        </li>
      </ul>
    </section>
    <div class="add_address"  @click="gotoAddress({path: 'addaddress'})">
      <button class="add_btn">
        <i class="add_icon"></i>
        新增收货地址
      </button>
    </div>
  </div>
</template>

<script>
import service from '@/service';
import './index.styl';

export default {
  data() {
    return {
      addresslist:[],
      moveStartX: null, //记录坐标的起始位置
      activeIndex: null
    }
  },
  mounted(){
  },
  created(){
    this.getAddress();
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
    getAddress(){
      service.getAddress().then((result) => {
        this.addresslist=result
      })
    },
    deleteAddress(addressId,index){
      this.$dialog({
        content: '确定要删除收获地址吗？',
        onOk: () => {
          service.deleteAddress({addressId:addressId}).then((result) => {
             if(result){
               this.$message.success('删除成功')
               this.$refs.addressItem[index].remove()
             }
          })
        }
      })
    },
    itemMoveStart(e){
      this.moveStartX = e.changedTouches[0].pageX;
    },
    itemMoveEnd(e,index){
      let moveEndX = e.changedTouches[0].pageX;
      let tag = moveEndX - this.moveStartX;
      if(tag >= 50){
        //向右划
        this.addresslist[index].isActive = false;
        if(this.activeIndex === index){
          this.activeIndex = null;
        }
      }else if(tag <= -50){
        //向左划
        this.addresslist[index].isActive = true;
        this.activeIndex = index
      }
      this.moveStartX = 0;
    },
    editAddress(item){
      this.gotoAddress({path: 'addaddress', query: {id: item.id
      ,gender: item.gender
      ,name: item.name
      ,phone: item.phone
      ,shippingAddress: item.shippingAddress
      ,houseNumber: item.houseNumber
      ,editType: 'edit'
      ,lat:item.location.lat
      ,lng:item.location.lng
      }})
    }
  },
}
</script>
