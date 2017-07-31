<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <!--公告-->
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <!-- 背景 -->
        <div class="bg">
            <img :src="seller.avatar">
        </div>
        <!--详情-->
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail()">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import star from '@/components/star/star';
export default {
    name: 'header',
    props: ['seller'],
    data() {
        return {
            detailShow: false
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
        showDetail() {
            this.detailShow = true
        },
        hideDetail() {
            this.detailShow = false
        }
    },
    components: {
        star
    }
}
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin";
.header {
    color: #fff;
    overflow: hidden;
    position: relative;
    background: rgba(7, 17, 27, .5);
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px 0;
                .brand {
                    width: 30px;
                    height: 18px;
                    display: inline-block;
                    @include bg-image('brand');
                    background-repeat: no-repeat;
                    background-size: 30px 18px;
                    vertical-align: top;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
                letter-spacing: 1px;
            }
            .support {
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-repeat: no-repeat;
                    background-size: 12px 12px;
                    &.decrease {
                        @include bg-image('decrease_1');
                    }
                    &.discount {
                        @include bg-image('discount_1');
                    }
                    &.guarantee {
                        @include bg-image('guarantee_1');
                    }
                    &.invoice {
                        @include bg-image('invoice_1');
                    }
                    &.special {
                        @include bg-image('special_1');
                    }
                }

                .text {
                    font-size: 10px;
                    line-height: 12px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background: rgba(0, 0, 0, .2);
            text-align: center;
            .count {
                font-size: 10px;
                vertical-align: top;
            }
            .icon-keyboard_arrow_right {
                font-size: 10px;
                line-height: 24px;
                margin-left: 2px;
            }
        }
    }
    .bulletin-wrapper {
        height: 28px;
        line-height: 28px;
        position: relative;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(7, 17, 27, .2);
        .bulletin-title {
            width: 22px;
            height: 12px;
            vertical-align: top;
            margin-top: 8px;
            display: inline-block;
            @include bg-image('bulletin');
            background-repeat: no-repeat;
            background-size: 22px 12px;
        }
        .bulletin-text {
            margin: 0 4px;
            font-size: 10px;
            vertical-align: top;
            letter-spacing: 1px;
        }
        .icon-keyboard_arrow_right {
            position: absolute;
            right: 12px;
            top: 10px;
            font-size: 10px;
        }
    }
    .bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    .detail {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 28, .8);

        .detail-wrapper {
            min-height: 100%;
            width: 100%;
            .detail-main {
                margin-top: 64px;
                padding-bottom: 64px;
                .name {
                    font-size: 16px;
                    font-weight: 700;
                    width: 100%;
                    color: rgb(255, 255, 255);
                    line-height: 16px;
                    text-align: center;
                }
                .star-wrapper {
                    margin-top: 16px;
                    padding: 2px 0;
                    text-align: center;
                }
            }
        }
        .title {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .line {
                flex: 1;
                position: relative;
                top: -6px;
                border-bottom: 1px solid rgba(255, 255, 255, .2);
            }
            .text {
                padding: 0 12px;
                font-weight: 700;
                font-size: 14px;
            }
        }
        .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
                padding: 0 12px;
                margin-bottom: 12px;
                font-siez: 0;
                &:last-child {
                    margin-bottom: 0;
                }
                .icon {
                    width: 16px;
                    height: 16px;
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 6px;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image('decrease_2');
                    }
                    &.discount {
                        @include bg-image('discount_2');
                    }
                    &.guarantee {
                        @include bg-image('guarantee_2');
                    }
                    &.invoice {
                        @include bg-image('invoice_2');
                    }
                    &.special {
                        @include bg-image('special_2');
                    }
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                }
            }
        }
        .bulletin {
            width: 80%;
            margin: 0 auto;
            .content {
                font-size: 12px;
                line-height: 24px;
                padding: 0 12px;
                word-wrap: break-word;
                text-align: justify;
            }
        }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0 auto;
            clear: both;
            font-size: 32px;
            color: rgba(255, 255, 255, 0.5);
        }
    }
    &.fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s ease;
    }
    &.fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
}
</style>
