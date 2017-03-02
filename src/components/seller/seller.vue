<template>
  <div class="seller">
	<div class="seller-content">
		<div class="overview">
			<h1 class="title">{{seller.name}}</h1>
			<div class="desc border-1px">
				<star :size="36" :score="seller.score"></star>
				<span class="text">({{seller.ratingCount}})</span>
				<span class="text">月售{{seller.sellCount}}单</span>
			</div>
			<ul class="remark">
				<li class="block">
					<h2>起送价</h2>
					<div class="content">
						<span class="stress">{{seller.minPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>商家配送</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>平均配送时间</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryTime}}</span>分钟
					</div>
				</li>
			</ul>
			<div class="favorite" @click="toggleFavorite($event)">
	          <i class="icon-favorite" :class="{'active':favorite}"></i>
	          <span>{{favoriteText}}</span>
	        </div>
		</div>
		<split></split>
		<div class="bulletin">
			<div class="title">公告与活动</div>
			<div class="content-wrapper border-1px">
				<p class="content">{{seller.bulletin}}</p>
			</div>
			<ul v-if="seller.supports" class="supports">
            	<li class="support-item border-1px" v-for="(item,index) in seller.supports">
            		<span class="icon" :class="classMap[seller.supports[index].type]"></span>
            		<span class="text">{{seller.supports[index].description}}</span>
            	</li>
            </ul>
		</div>
		<split></split>
		<div class="pics">
	        <h1 class="title">商家实景</h1>
	        <div class="pic-wrapper" ref="picWrapper">
	          <ul class="pic-list" ref="picList">
	            <li class="pic-item" v-for="pic in seller.pics">
	              <img :src="pic" width="120" height="120">
	            </li>
	          </ul>
	        </div>
	     </div>
	     <split></split>
	    	<div class="info">
	        <div class="title  border-1px">商家信息</div>
	        <ul>
	          <li class="info-item border-1px" v-for="info in seller.infos">{{info}}</li>
	        </ul>
	      </div>
	    </div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import {savaToLocal, loadFromlLocal} from 'assets/js/storage'
export default {
  name: 'seller',
  components: {
  	star,
  	split
  },
  data () {
    return {
      favorite: (() => {
          return loadFromlLocal(this.seller.id, 'favorite', false);
      })()
    }
  },
  computed: {
	  favoriteText() {
	    return this.favorite ? '已收藏' : '收藏';
	  }
  },
  props:{
  	seller:{
  		type: Object
  	}
  },
  created(){
  	  this.classMap = ['decrease','discount','guarantee','invoice','special'];
  	  //初始化滚动
  	  this.initScroll();
  },
  mounted(){

  },
  methods:{
	toggleFavorite(event){
        if(!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        //保存id
        savaToLocal(this.seller.id, 'favorite', this.favorite);
    },
    initScroll(){
    	// console.log('初始化');
      //图片滚动
      if (!this.picScroll) {
        if (this.seller.pics) {
          this.$nextTick(() => {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            this.$refs.picList.style.width = width + 'px';
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          });
        }
      } else {
        this.picScroll.refresh();
      }
      //主体滚动
      if (!this.scroll) {
	        this.$nextTick(() => {
	          this.scroll = new BScroll(this.$el, {click: true});
	        });
	      } else {
	        this.scroll.refresh();
	      };
	    }
    }
}
</script>
<style scoped lang="scss">
 @import '../../assets/scss/mixin';
.seller{
	position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
    	padding:18px;
    	.title{
    		margin-bottom: 8px;
		    line-height: 14px;
		    color: #07111b;
		    font-size: 14px;
    	}
    	.desc{
    		padding-bottom:18px;
    		font-size:0;
    		@include border-1px;
    		.star{
    			display: inline-block;
			    vertical-align: top;
			    margin-right: 8px;
    		}
    		.text{
    			display: inline-block;
			    vertical-align: top;
			    margin-right: 12px;
			    line-height: 18px;
			    font-size: 10px;
			    color: #4d555d;
    		}
    	}
    	.remark{
    		display: flex;
    		padding-top: 18px;
    		
    		.block{
				flex: 1;
			    text-align: center;
			    border-right: 1px solid rgba(7,17,27,.1);
			    &:last-child{
          			border:none;
          		}
			    h2{
			    	margin-bottom: 4px;
				    line-height: 10px;
				    font-size: 10px;
				    color: #939995;
			    }
			    .content{
			    	line-height: 24px;
				    font-size: 10px;
				    color: #07111b;
			    	.stress{
			    		font-size:24px;
			    	}
			    }
    		}
    		
    	}
    	.favorite{
    		position: absolute;
    		right:11px;
    		top:17px;
    		text-align:center;
    		width: 50px;
    		.icon-favorite{
				display: block;
			    margin-bottom: 4px;
			    line-height: 24px;
			    font-size: 24px;
			    width: 50px;
			    color: #d4d6d9;
			    &.active{
			    	color: #f01414;
			    }
    		}
    	}
    }
    .bulletin{
    	padding: 18px 18px 0;
    	.title{
    		margin-bottom: 8px;
    		line-height: 14px;
    		color: #07111b;
    		font-size: 14px;
    	}
    	.content-wrapper{
			padding: 0 12px 16px 12px;
    		@include border-1px;
    		.content{
    			line-height:24px;
    			color:rgb(240,20,20);
    			font-size:12px;
    			text-align: justify;
    		}
    	}
    }
    .supports{
		.support-item{
			padding:16px 12px;
			@include border-1px;
			font-size:0;
			&:last-child{
				@include border-none;
			}
			.icon{
				width:16px;
				height:16px;
				display:inline-block;
				vertical-align: top;
				margin-right:6px;
				background-size:16px 16px;
				background-repeat:no-repeat;
				&.decrease{
					@include bg-image('decrease_4');
				}
				&.discount{
					@include bg-image('discount_4');
				}
				&.guarantee{
					@include bg-image('guarantee_4');
				}
				&.invoice{
					@include bg-image('invoice_4');
				}
				&.special{
					@include bg-image('special_4');
				}
			}
			.text{
				line-height:16px;
				font-size:12px;
			}
		}
    }
    .pics{
		padding: 18px;
    	.title{
			margin-bottom: 12px;
		    line-height: 14px;
		    color: #07111b;
		    font-size: 14px;
    	}
    	.pic-wrapper{
	    	width:100%;
	    	overflow:hidden;
	    	white-space:nowrap;
	    	.pic-list{
	    		font-size: 0;
	    		.pic-item{
	    			display: inline-block;
				    margin-right: 6px;
				    width: 120px;
				    height: 90px;
	    		}
	    	}
	    }
    }
    .info{
    	padding: 18px 18px 0;
    	color: #07111b;
    	.title{
    		padding-bottom: 12px;
		    line-height: 14px;
		    position: relative;
		    font-size: 14px;
		    @include border-1px;
    	}
    	.info-item{
	    	padding: 16px 12px;
	    	line-height: 16px;
	    	position: relative;
	    	font-size: 12px;
	    	@include border-1px;
	    	&:last-child{
	    	@include border-none;
	    	}
    	}
    }
    
}
</style>
