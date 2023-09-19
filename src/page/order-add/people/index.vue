<template>
  <div id="remaker_root">
    <div class="people" @click="toggleList">
      <span>餐具数量</span>
      <span class="peopleSelect">{{selectedText}}</span>
    </div>
    <div class="remark">
      <p class="invoiceTitleLine">
        <span class="invoiceTitle">备注</span><span class="invoiceTip">推荐使用无接触配送</span>
      </p>
    </div>
    <div class="invoice">
      <span class="needInvoice">发票</span>
      <div class="invoiceInput_KbN_Ja"><span class="invoiceTip2_LEJbfN">未选择</span></div>
    </div>
    <transition name="fold">
      <article class="container" v-show="fold" @click.self="toggleList">
        <header class="tip">按政府条例要求：商家不得主动向您提供一次性餐具，请按需选择餐具数量。</header>
        <section class="header">
          <span @click="cancel">取消</span>
          <p style="flex: 1 1 0%;text-align: center;font-weight: bold;">选择本单餐具</p>
          <span @click="confirm">确定</span>
        </section>
        <section class="body">
          <div class="scroll-wrapper">
            <transition name="picker-move">
              <div class="rmc-picker">
                <div class="rmc-picker-indicator selectOption" style="top: 60px;"></div>
                <div class="rmc-picker-content" style="background-size: 100% 60px;" ref="wheelWrapper">
                  <div class="whell">
                    <ul class="wheel-scroll">
                      <li v-for="(people,index) in pickerData" :key="index" class="rmc-picker-item" :class="{'flexColumn': people.tip != undefined}">
                        <div class="flex">
                          <img v-if="people.icon" :src="people.icon" alt="">{{people.label}}
                        </div>
                        <p class="dinerAddition" v-if="people.tip">{{people.tip}}</p>
                      </li>
                    </ul>
                    <div class="rmc-picker-mask" style="background-size: 100% 60px;"></div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </section>
      </article>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="fold" @click="toggleList"></div>
    </transition>

  </div>
</template>

<script>

import BScroll from 'better-scroll';
import Wheel from '@better-scroll/wheel'
import { PeopleSelect } from './config';
BScroll.use(Wheel)
import './index.styl';

const COMPONENT_NAME = 'picker'
const EVENT_SELECT = 'select'
const EVENT_CANCEL = 'cancel'
const EVENT_CHANGE = 'change'

export default {
  props: {
  },
  created() {
  },
  data() {
    return {
      pickerData: PeopleSelect,
      fold: false,
      selectedIndex: 0,
      selectedText: '依据餐量提供',
    };
  },
  methods: {
    confirm() {
      this.wheel.stop()
      this.hide()
      const currentSelectedIndex = this.selectedIndex = this.wheel.getSelectedIndex()
      this.selectedText = this.pickerData[currentSelectedIndex].label 
      this.$emit(EVENT_SELECT, currentSelectedIndex)
    },
    cancel() {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },
    toggleList() {
      this.fold = !this.fold 
      if (!this.wheel) {
        this.$nextTick(() => {
          const wrapper = this.$refs.wheelWrapper.children[0]
          this.createWheel(wrapper)
        })
      }
    },
    hide() {
      this.fold = false
    },
    createWheel(wheelWrapper) {
      if (!this.wheel) {
        this.wheel = new BScroll(wheelWrapper, {
          wheel: {
            selectedIndex: this.selectedIndex,
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item',
            wheelDisabledItemClass: 'wheel-disabled-item'
          },
          useTransition: false,
          probeType: 3
        })
        this.wheel.on('scrollEnd', () => {
          this.$emit(EVENT_CHANGE, this.wheel.getSelectedIndex())
        })
      } else {
        this.wheel.refresh()
      }
      return this.wheel
    }
  },
  computed: {
  }
}
</script>
