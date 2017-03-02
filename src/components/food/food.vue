<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="el">
      <div class="food-content">
        <div class="food-header">
          <img :src="food.image">
          <div class="back" @click="hide()"> <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">&yen;{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">&yen;{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <transition>
            <div class="buy" 
              @click.stop.prevent="addFirst($event)" v-show="!food.count||food.count===0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select @increment="incrementTotal" :select-type="selectType" 
          :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
          <div class="rating-wrapper">
            <ul v-show="food.ratings&&food.ratings.length">
              <li v-for="rating in food.ratings" class="rating-item border-1px"
              v-show="needShow(rating.rateType,rating.text)"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                </div>
                <div class="time">
                  {{rating.rateTime|formatDate}}
                </div>
                <p class="text"><span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" class="icon"></span>{{rating.text}}</p>
              </li>
            </ul>
             <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartControl from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
import ratingSelect from 'components/ratingselect/ratingselect'
import {formatDate} from 'assets/js/date'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'food',
  components:{
    cartControl,
    split,
    ratingSelect
  },
  data () {
    return {
      showFlag: false,
      selectType:ALL,
      onlyContent:true,
      desc:{
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  props:{
    food:{
      type: Object
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
    show(){
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => { 
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.el, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide(){
      this.showFlag = false;
    },
    addFirst(event){
      if(!event._constructed){
          return
      }
      Vue.set(this.food,'count',1);
    },
    needShow(type,text){
      if(this.onlyContent&&!text){
        return false
      }
      if(this.selectType===ALL){
        return true
      }else{
        return type===this.selectType
      }
    },
    incrementTotal(type, data){
      console.log(type,data);
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import '../../assets/scss/mixin';
.food{
  position: fixed;
  left:0;
  top:0;
  bottom: 48px;
  z-index:30;
  width: 100%;
  background: #fff;
  &.move-enter-active, &.move-leave-active {
    transition: all .2s linear;
    transform:translate3d(0,0,0);
  }
  &.move-enter,&.move-leave-active {
    transform:translate3d(100%,0,0);
  }
  .food-header{
    position: relative;
    height:0;
    padding-top:100%;
    img{
      position: absolute;
      left: 0;
      top:0;
      width:100%;
      height:100%;
    }
    .back{
      position: absolute;
      left:0;
      top:10px;
      .icon-arrow_lift{
        display:block;
        padding:10px;
        font-size:20px;
        color:#fff;
      }
    }
  }
  .content{
    padding:18px;
    position: relative;
    .title{
      font-size: 14px;
      line-height:14px;
      margin-bottom:8px;
      font-weight: 700;
      color:rgb(7,17,27);
    }
    .detail{
      margin-bottom:18px;
      line-height:10px;
      height:10px;
      font-size:0;
      .sell-count,.rating{
        font-size:10px;
        color:rgb(147,153,159);
      }
      .sell-count{
        margin-right: 12px;
      }
    }
    .price{
        font-weight:700;
        line-height:24px;
        .now{
          margin-right:8px;
          font-size:14px;
          color:rgb(240,20,20);
        }
        .old{
          text-decoration:line-through;
          font-size:10px;
          color:rgb(147,153,159);
        }
    }
  }
  .cartcontrol-wrapper{
    position: absolute;
    right:12px;
    bottom:12px;
  }
  .buy{
    position: absolute;
    right:18px;
    bottom:18px;
    z-index: 10;
    padding:0 12px;
    height:24px;
    line-height:24px;
    font-size:10px;
    box-sizing:border-box;
    color:#fff;
    border-radius:12px;
    background: #00a0dc;
    &.fade-enter-active, .fade-leave-active {
      transition: opacity .5s ease;
    }
    &.fade-enter, .fade-leave-active {
      opacity: 0;
    }
  }
  .info{
    padding:18px;
    .title{
      font-size:14px;
      margin-bottom:6px;
      font-size:14px;
      color:rgb(7,17,27);
    }
    .text{
      color:rgb(77,85,73);
      font-size:12px;
      padding:0 8px;
      line-height: 24px;
    }
  }
  .rating{
    padding-top: 18px;
    .title{
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: #07111b
    }
    .rating-wrapper {
      padding: 0 18px;
      .rating-item{
        padding: 16px 0;
        position: relative;
        .user{
          position: absolute;
          right: 0;
          top: 16px;
          font-size: 0;
          line-height: 12px;
          .name{
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            color: #93999f;
            margin-right: 6px;
          }
          .avatar{
            border-radius: 50%;
          }
        }
        .time{
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 10px;
          color: #93999f;
        }
        .text{
          line-height: 16px;
          font-size: 12px;
          color: #07111b;
          .icon{
            margin-right: 4px;
            line-height: 16px;
            font-size: 12px;
          }
          .icon-thumb_up{
            color: #00a0dc;
          }
          .icon-thumb_down{
            color: #93999f;
          }
        }
      }
      .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: #93999f;
      }
    }
  }
}
</style>