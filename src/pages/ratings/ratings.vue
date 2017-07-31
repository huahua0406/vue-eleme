<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating,index) in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { formatDate } from '@/util/util.js';
import { requestRatings } from '@/api/api';
import star from '@/components/star/star';
import ratingSelect from '@/components/ratingselect/ratingselect';
import split from '@/components/split/split';

const ALL = 2;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  created() {
    this.getRatings();
  },
  methods: {
    getRatings() {
      requestRatings({}).then(res => {
        console.log(res);
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      })
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    selectRating(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    star,
    split,
    ratingSelect
  }
};
</script>

<style lang="scss" scoped>
@import '../../common/scss/mixin';
.ratings {
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0 18px 18px;
    .overview-left {
      flex: 0 0 137px;
      width: 137px;
      padding: 6px 0;
      border-right: 1px solid rgba(7, 17, 27, .1);
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex: 0 0 110px;
        width: 110px;
      }
      .score {
        margin-bottom: 12px;
        line-height: 28px;
        font-size: 24px;
        color: #f90;
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: #07111b;
      }
      .rank {
        line-height: 10px;
        font-size: 12px;
        color: #93999f;
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding: 6px 0 6px 6px;
      }
      .score-wrapper {
        line-height: 18px;
        margin-bottom: 8px;
        font-size: 0;
        .title {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: #07111b;
        }
        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
          .star-item {
            display: inline-block;
            background-repeat: no-repeat;
          }
        }
        .score {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: #f90;
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: #07111b;
        }
        .delivery {
          display: inline-block;
          margin-left: 12px;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: #93999f;
        }
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      position: relative;
      @include border-1px(rgba(7, 17, 27, 0.1));
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-weight: 700;
          font-size: 10px;
          color: #07111b;
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 16px;
            vertical-align: top;
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            line-height: 12px;
            color: #93999f;
          }
        }
        .text {
          line-height: 18px;
          color: #07111b;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .recommend {
          line-height: 16px;
          font-size: 0;
          .icon,
          .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }
          .icon-thumb_up {
            color: #00a0dc;
          }
          .icon-thumb_down {
            color: #93999f;
          }
          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, .1);
            border-radius: 1px;
            color: #93999f;
            background: #fff;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: #93999f;
        }
      }
    }
  }
}
</style>
