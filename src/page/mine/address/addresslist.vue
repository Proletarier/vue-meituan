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
        <li class="address_item" v-for="(item,index) in addresslist" :key="index">
          <div class="content" style="width: 90%">
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
          <div class="delete">
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { address_list } from '@/api/address';

export default {
  data() {
    return {
      addresslist:[]
    }
  },
  created(){
    address_list().then((result) => {
      this.addresslist=result.data
    })
  }
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
</style>