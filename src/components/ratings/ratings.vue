<template>
  <div class="ratings">
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
		<rating-select @increment="incrementTotal" :select-type="selectType" 
          :only-content="onlyContent" :desc="desc" :ratings="ratings"></rating-select>
          <div class="rating-wrapper">
		      <ul>
		        <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)">
		          <div class="avatar">
		            <img :src="rating.avatar" alt="" width="28" height="28">
		          </div>
		          <div class="content">
		            <h1 class="name">{{rating.username}}</h1>
		            <div class="star-wrapper">
		              <star :size="24" :score="rating.score"></star>
		              <span class="delivery" v-show="rating.deliveryTime">
		                {{rating.deliveryTime}}
		              </span>
		            </div>
		            <p class="text">{{rating.text}}</p>
		            <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
		              <i class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
		              <span  class="item" v-for="item in rating.recommend" >{{item}}</span>
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
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingSelect from 'components/ratingselect/ratingselect'
import {formatDate} from 'assets/js/date'
import data from 'assets/json/data.json'

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  name: 'ratings',
  components: {
  	star,
  	split,
  	ratingSelect
  },
  data(){
    return {
      ratings:[],
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
  	seller:{
  		type:Object
  	}
  },
  mounted(){
  	this.$nextTick(() => { 
  		/* 初始化数据 nextTick=>DOM跟新以后执行一下操作*/ 
  		// this.getData();
  		this.ratings = data.ratings;
		    this.$nextTick(() => {
	        console.log(this.$el);
	        this.scroll = new BScroll(this.$el, {click: true});
	    });
  	})
  },
  methods:{
  	getData(){
		this.$http.get('/api/ratings').then(response=>{
  		    // console.log(response);
  		    this.ratings = response.data.data;
  		    this.$nextTick(() => {
		        console.log(this.$el);
		        this.scroll = new BScroll(this.$el, {click: true});
		    });
  		}).catch(err=>{
  		    console.log(err);
		});
  	},
  	incrementTotal(type, data){
      console.log(type,data);
      this[type] = data;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
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
    }
  },
  filters: {
	  formatDate(time) {
	    let date = new Date(time);
	    return formatDate(date, 'yyyy-MM-dd hh:mm');
	  }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 @import '../../assets/scss/mixin';
.ratings{
	position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
	.overview{
		display: flex;
    	padding: 18px 0 18px 18px;
    	.overview-left{
    		flex: 0 0 137px;
		    width: 137px;
		    padding: 6px 0;
		    border-right: 1px solid rgba(7,17,27,.1);
		    text-align: center;
		    @media only screen and (max-width: 320px)
			{
			    flex: 0 0 110px;
			    width: 110px;
			}
		    .score {
			    margin-bottom: 12px;
			    line-height: 28px;
			    font-size: 24px;
			    color: #f90;
			}
			.title{
				margin-bottom: 8px;
			    line-height: 12px;
			    font-size: 12px;
			    color: #07111b;
			}
			.rank{
				line-height: 10px;
			    font-size: 12px;
			    color: #93999f;
			}
    	}
    	.overview-right{
    		flex:1;
			padding: 6px 0 6px 24px;
			@media only screen and (max-width: 320px)
			{
				padding: 6px 0 6px 6px;
			}
			.score-wrapper{
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
				.score{
					display: inline-block;
				    vertical-align: top;
				    line-height: 18px;
				    font-size: 12px;
				    color: #f90;
				}
			}
			.delivery-wrapper{
				font-size:0;
				.title{
					display: inline-block;
				    vertical-align: top;
				    line-height: 18px;
				    font-size: 12px;
				    color: #07111b;
				}
				.delivery{
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
	.rating-wrapper{
		padding: 0 18px;
		.rating-item{
			display: flex;
		    padding: 18px 0;
		    position: relative;
            @include border-1px
		    .avatar{
		    	flex: 0 0 28px;
    			width: 28px;
    			margin-right: 12px;
    			img{
    				border-radius: 50%;
    			}
		    }
		    .content{
		    	position: relative;
		    	flex:1;
		    	.name{
		    		margin-bottom: 4px;
				    line-height: 12px;
				    font-weight: 700;
				    font-size: 10px;
				    color: #07111b;
		    	}
		    	.star-wrapper{
					margin-bottom: 6px;
    				font-size: 0;
    				.star{
    					display: inline-block;
    					margin-right: 16px;
    					vertical-align: top;
    				}
    				.delivery{
						display: inline-block;
					    vertical-align: top;
					    font-size: 10px;
					    line-height: 12px;
					    color: #93999f;
    				}
		    	}
		    	.text{
					line-height: 18px;
				    color: #07111b;
				    font-size: 12px;
				    margin-bottom: 8px;
		    	}
		    	.recommend{
					line-height: 16px;
    				font-size: 0;
    				.icon, .item{
			            display: inline-block;
			            margin: 0 8px 4px 0;
            			font-size: 9px;
            		}
            		.icon-thumb_up{
            			color: #00a0dc;
            		}
            		.icon-thumb_down{
            			color: #93999f;
            		}
    				.item{
    					padding: 0 6px;
					    border: 1px solid rgba(7,17,27,.1);
					    border-radius: 1px;
					    color: #93999f;
					    background: #fff;
    				}
		    	}
	    		.time{
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
