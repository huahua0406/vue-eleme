<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    name: 'cartControl',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if (!event._constructed) {
                return;
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            }
            // console.log(event.target);//目标元素
            this.$emit('add', event.target);
        },
        decreaseCart(event) {
            if (!event._constructed) {
                return;
            }
            if (this.food.count) {
                this.food.count--;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.cartcontrol {
    font-size: 0;
    .cart-decrease {
        display: inline-block;
        padding: 6px;
        transition: all .4s linear;
        &.move-enter-active,
        &.move-leave-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            .inner {
                transform: rotate(0);
                display: inline-block;
                line-height: 24px;
                font-size: 24px;
                color: rgb(0, 160, 220);
                transition: all .4s linear;
            }
        }
        .inner {
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
            transition: all .4s linear;
        }
        &.move-enter,
        &.move-leave-active {
            opacity: 0;
            transform: translate3d(24px, 0, 0);
            .inner {
                transform: rotate(180deg);
            }
        }
    }
    .cart-count {
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
        width: 12px;
        text-align: center;
        line-height: 24px;
        padding: 6px 0;
        color: rgb(147, 153, 159);
    }
    .cart-add {
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
    }
}
</style>