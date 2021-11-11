<template>
  <div class="addresslist">
    <header>
      <div class="box_line">
        <div class="go_back">
        </div>
        <div class="title">
           地址列表
        </div>
      </div>
    </header>
    <section class="address">
      <ul class="address_items">
        <li class="address_item" v-for="(item,index) in addresslist" :key="index"
        :class="{'active': activeIndex == index }">
          <div class="content" style="width: 90%"  @touchstart ="itemMoveStart" @touchend ="itemMoveEnd($event, index)">
            <div class="detail">
              <span class="poi">{{item.poi}}</span>
              <span>{{item.houseNumber}}</span>
            </div>
            <div class="contact">
              <span class="name">{{item.name}}</span>
              <span>{{item.phone}}</span>
            </div>
          </div>
          <a class="edit"></a>
          <div class="delete"  @click="deleteAddress(item.addressId)">删除</div>
        </li>
      </ul>
    </section>
    <div class="add_address">
      <button class="add_btn">
        <i class="add_icon"></i>
        新增收货地址
      </button>
    </div>
  </div>
</template>

<script>
import { address_list,delete_address } from '@/api/address';

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
    this.addressList();
  },
  methods: {
    addressList(){
      address_list().then((result) => {
        this.addresslist=result.data
      })
    },
    deleteAddress(addressId){
      console.log('111');
      delete_address(addressId).then((result) => {
        this.addressList()
      }).catch((err) => {
        this.$message.error(err.message)
      });
    },
    itemMoveStart(e){
      this.moveStartX = e.changedTouches[0].pageX;
    },
    itemMoveEnd(e,index){
      let moveEndX = e.changedTouches[0].pageX;
      let tag = moveEndX - this.moveStartX;
      e.preventDefault()
      console.log(tag)
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
    }
  },
}
</script>

<style lang="stylus">
  .addresslist
    header
       width: 100%
       height: 50px
       position relative
       &:after
         border: 1px solid rgb(204, 204, 204)
         display: block
         content: ''
         border-top: none
      .go_back
          &:after
            border: #999 solid 2px;
            position: absolute;
            left: 22px;
            top: 50%;
            margin-top: -5px;
            display: block;
            content: '';
            width: 8px;
            height: 8px;
            border-left: none
            border-bottom: none
            transform: rotate(225deg);
        .title
          height: 50px
          line-height: 50px
          text-align: center
    .address
      .address_items
        overflow-x: hidden
        .address_item
          height: 65px
          margin: 0 0 0 15px
          border-bottom: 1px solid #e4e4e4
          display: flex
          align-items: center
          position relative
          transition: transform 0.2s
          &.active
            transform: translate(-65px)
            transition: transform 0.2s
          .content
            color: #333
            .detail
              font-size: 16px
              line-height: 23px
              overflow hidden
              text-overflow: ellipsis
              max-width: 90%
              .poi
                margin-right: 10px
            .contact
              font-size: 14px
              color: #666
              margin-top: 3px
              line-height: 20px
              overflow: hidden
              text-overflow: ellipsis
              max-width: 90%
              white-space: nowrap
              .name
                margin-right: 10px
          .edit
            width: 55px
            height: 100%
            background: url(../../../images/edit.png) no-repeat 0 50%
            background-size: 15px 15px
            background-position-x: 20px
            position: absolute
            right 0
          .delete
            position: absolute
            left: 100%
            width 65px
            height: 100%
            background-color: red
            color #fff
            text-align: center
            line-height: 65px
     .add_address
        position: fixed
        bottom: 0
        left: 0
        right: 0
        display: flex
        height: 44px
        border-top: 1px solid #d7d7d7
        justify-content: center
        align-items: center
        background-color: #fff
        .add_btn
          height: 44px
          font-size: 16px
          color: #000
          display: flex
          align-items: center
          border: none
          background-color: #fff
          cursor: pointer
          .add_icon
            background: url(../../../images/add.png) no-repeat 0 50%
            height: 15px
            width: 15px
            background-size: 100%
            margin-right: 5px
</style>