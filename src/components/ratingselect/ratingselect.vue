<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
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
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            });
        }
    },
    methods: {
        select(type, event) {
            if (!event._constructed) {
                return;
            }
            // console.log(type);
            this.$emit('select', type);
        },
        toggleContent(event) {
            if (!event._constructed) {
                return;
            }
            this.$emit('toggle');
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin";

.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        position: relative;
        font-size: 0;
       @include border-1px(rgba(7, 17, 27, .1));
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            font-size: 12px;
            color: #4d555d;
            .count {
                font-size: 8px;
                margin-left: 2px;
                line-height: 16px;
            }
            &.positive {
                background: rgba(0, 160, 220, .2);
                &.active {
                    color: #fff;
                    background: #00a0dc;
                }
            }
            &.negative {
                background: rgba(77, 85, 93, .2);
                &.active {
                    color: #fff;
                    background: #4d555d;
                }
            }
        }
    }
    .switch {
        padding: 12px 18px;
        line-height: 24px;
        color: #93999f;
        border-bottom: 1px solid rgba(1, 17, 27, .1);
        font-size: 0;
        &.on {
            .icon-check_circle {
                color: #00c850;
            }
        }
        .icon-check_circle {
            display: inline-block;
            vertical-align: top;
            font-size: 24px;
            margin-right: 4px;
        }
        .text {
            font-size: 12px;
            vertical-align: top;
            display: inline-block;
        }
    }
}
</style>