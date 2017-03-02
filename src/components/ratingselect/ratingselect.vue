<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
    <span class="block positive" @click="select(2,$event)"
    :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{nagatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on': onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
export default {
  name: 'ratingselect',
  data () {
    return {

    }
  },
  props:{
    ratings:{
      type: Array,
      default(){
        return []
      }
    },
    selectType:{
      type: Number,
      default: ALL
    },
    onlyContent:{
      type:Boolean,
      default:false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部11111',
          positive: '满意2222222',
          negative: '吐槽333333333'
        };
      }
    } 
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    nagatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods:{
    select (type,event){
      if(!event._constructed){
          return
      }
      //不能直接修改父组件的值
      //向父组件发广播，通知type更改了
      this.$emit('increment', 'selectType', type); 
      // 子组件通过 $emit触发父组件的方法 increment   还可以传参
    },
    toggleContent(){
      if(!event._constructed){
          return
      }
      //不能直接修改父组件的值
      this.$emit('increment', 'onlyContent', !this.onlyContent); 
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../assets/scss/mixin';
.ratingselect{
  .rating-type{
    padding: 18px 0;
    margin: 0 18px;
    position :relative;
    font-size: 0;
    @include border-1px;
    .block{
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      font-size: 12px;
      color: #4d555d;
      .count{
        font-size: 8px;
        margin-left: 2px;
        line-height: 16px;
      }
      &.positive{
        background: rgba(0,160,220,.2);
        &.active{
          color: #fff;
          background: #00a0dc;
        }
      }
      &.negative{
        background: rgba(77,85,93,.2);
        &.active{
          color: #fff;
          background: #4d555d;
        }
      }
    }
  }
  .switch{
    padding: 12px 18px;
    line-height: 24px;
    color: #93999f;
    border-bottom: 1px solid rgba(1,17,27,.1);
    font-size: 0;
    &.on{
      .icon-check_circle{
        color: #00c850;
      }
    }
    .icon-check_circle{
      display: inline-block;
      vertical-align: top;
      font-size: 24px;
      margin-right: 4px;
    }
    .text{
      font-size:12px;
      vertical-align: top;
      display: inline-block;
    }
  }
}
</style>
