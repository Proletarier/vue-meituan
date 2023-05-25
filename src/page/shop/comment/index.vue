<template>
  <div class="comment-container" ref="comments">
    <div class="commentWrapper">
      <header class="comment-hdaer">
        <div class="score">
          <p class="shop-score">{{commentScores.shopScore}}</p>
          <p>商家评分</p>
        </div>
        <div class="score" style="flex:2">
          <p class="quality">
            <span>口味</span>
            <Star :score="commentScores.qualityScore"></Star><span>{{commentScores.qualityScore}}</span>
          </p>
          <p class="pack">
            <span>包装</span>
            <Star :score="commentScores.packScore"></Star><span>{{commentScores.packScore}}</span>
          </p>
        </div>
        <div class="score">
          <p class="delivery">{{commentScores.deliveryScore}}</p>
          <p>配送评分</p>
        </div>
      </header>
      <ul class="comment-label">
        <li v-for="(label,index) in commentScores.commentLabels" :key="index" class="label-item" :class="{active: labelId === label.id}" @click="getComments(label.id)">
          {{label.content}}
        </li>
      </ul>
      <ul class="comment-list">
        <li v-for="(comment,index) in commentList" :key="index" class="comment-list-li">
          <div class="icon">
            <img v-if="comment.userPicUrl" :src="comment.userPicUrl" width="40px">
            <img v-else src='../../../images/userpic_defalut.png' width="40px">
          </div>
          <section class="comment-list-details">
            <p class="name">{{comment.userName}} <span class="time">{{comment.commentTime}}</span></p>
            <p class="delivery">{{comment.deliveryTime}}</p>
            <p class="content">{{comment.content}}</p>
            <div class="pics">
              <img class="pic" v-for="(pic,index) in comment.pictures" :key="index" :src="pic.smallPicUrl" @click="seletPic(comment.pictures,index)">
            </div>
            <p v-if="comment.praiseDish" class="dish">
              <svg width='20' height='20'>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#praise"></use>
              </svg>{{comment.praiseDish}}
            </p>
            <p v-if="comment.label" class="label">
              <svg width='20' height='20'>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#label"></use>
              </svg>{{comment.label}}
            </p>
            <p v-if="comment.shopReply" class="reply">{{comment.shopReply}}</p>
          </section>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import './index.styl';
import Star from '@/components/star';
import BScroll from 'better-scroll';
import Pullup from '@better-scroll/pull-up'
import store from '../store';

BScroll.use(Pullup)
export default {
  props: {
    shopId: {
      default: undefined
    },
    commentScores: {
      default: {}
    },
    commentList: {
      default: []
    },
    seletPic:{
      type: Function
    }
  },
  data() {
    return {
      labelId: 0, // 评论Tag
      pageSize: 10,
      nextStartIndex: 1,
      hasNext: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initCommentBScroll();
    })
  },
  methods: {
    initCommentBScroll() {
      this.comments = new BScroll(this.$refs.comments, {
        probeType: 3,
        bounce: true,
        click: true,
        pullUpLoad: true
      });
      this.comments.on('pullingUp', this.pullingUpHandler)
      this.comments.once('beforeScrollStart', () => {
        this.comments.refresh();
      });
    },
    getComments(labelId) {
      if (labelId == this.labelId) {
        return
      }
      this.labelId = labelId;
      this.hasNext = true
      this.nextStartIndex = 1;
      const { pageSize, nextStartIndex, shopId } = this;
      store.getCommentList({ commentLabelId: labelId, pageSize, pageNum: nextStartIndex, shopId }).then(res => {
        this.comments.refresh();
      })
    },
    pullingUpHandler() {
      if (!this.$loading.isrun() && this.hasNext) {
        const { labelId, pageSize, nextStartIndex, shopId } = this;
        store.getCommentList({ commentLabelId: labelId, pageSize, pageNum: nextStartIndex + 1, shopId }, true).then(res => {
          if (res) {
            this.nextStartIndex = this.nextStartIndex + 1
          } else {
            this.hasNext = false
          }
          this.comments.finishPullUp();
          this.comments.refresh();
        })
      }
    },
  },
  components: {
    Star,
  }
}
</script>