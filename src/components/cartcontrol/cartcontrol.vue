<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-dec" 
    v-show="food.count>0" 
    @click.stop.prevent="decCart($event)">
    <span class="icon-remove_circle_outline inner"></span>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-inc icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'cartcontrol',
  data () {
    return {
      
    }
  },
  props:{
    food:{
      type:Object
    }
  },
  created(){
    // console.log(this.food);
  },
  methods:{
    addCart(event){
      if(!event._constructed){
        return
      }
      // console.log('click');
      if(!this.food.count){
        Vue.set(this.food,'count',1)
      }else{
        this.food.count++;
      }
      //派发事件
      // 子组件通过$emit触发父组件中cartControl的方法 increment
      //@increment="incrementTotal"
      //在goods组件内接收这个事件
      this.$emit('increment',event.target)
    },
    decCart(event){
      if(!event._constructed){
        return
      }
      // console.log('click');
      if(this.food.count){
        this.food.count--;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cartcontrol{
  font-size: 0;
  .cart-dec{
    display: inline-block;
    padding:6px;
    transition: all .4s linear;
    &.move-enter-active, &.move-leave-active {
      opacity: 1;
      transform:translate3d(0,0,0);
      .inner{
        transform: rotate(0);
         display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color:rgb(0,160,220);
        transition: all .4s linear;
      }
    }
    .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color:rgb(0,160,220);
        transition: all .4s linear;
      }
    &.move-enter,&.move-leave-active {
      opacity: 0;
      transform:translate3d(24px,0,0);
      .inner{
        transform: rotate(180deg);
      }
    }
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
    width: 12px;
    text-align: center;
    line-height: 24px;
    padding:6px 0;
    color:rgb(147,153,159);
  }
  .cart-inc{
    display: inline-block;
    padding:6px;
    line-height: 24px;
    font-size: 24px;
    color:rgb(0,160,220);
  }
}
</style>
