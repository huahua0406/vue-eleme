<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
						<span class="text border-1px">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="(item,index) in goods" :key="index" ref="foodList">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for="(food,index) in item.foods" class="food-item border-1px" :key="index" @click="selectFood(food,$event)">
								<div class="icon">
									<img :src="food.icon" width="57" height="57">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<!-- 
										-->
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">&yen;{{food.price}}</span>
										<span v-show="food.oldPrice" class="old">&yen;{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cart-control :food="food" @add="addFood"></cart-control>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shop-cart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shop-cart>
		</div>
	
		<food @add="addFood" :food="selectedFood" ref="food"></food>
	
	</div>
</template>

<script>
import { requestGoods } from '@/api/api';
import BScroll from 'better-scroll';
import cartControl from '@/components/cartcontrol/cartcontrol';
import shopCart from '@/pages/shopcart/shopcart';
import food from '@/pages/food/food';
export default {
	name: 'goods',
	props: ['seller'],
	data() {
		return {
			goods: [],
			listHeight: [],
			scrollY: 0,
			selectedFood: {}
		}
	},
	computed: {
		currentIndex() {
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i + 1];
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i
				}
			}
			return 0
		},
		selectFoods() {//选取到购物车的商品，根据是否有count属性判断
			let foods = [];
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count) {
						foods.push(food);
					}
				});
			});
			return foods;
		}
	},
	created() {
		this.getGoods();
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

	},
	methods: {
		getGoods() {
			requestGoods({}).then(res => {
				// console.log(res);
				this.goods = res.data;
				// console.log(this.goods);
				this.$nextTick(() => {
					this._initScroll();
					this._calculateHeight();
				});
			})
		},
		selectMenu(index, event) {
			if (!event._constructed) {
				return;
			}
			let foodList = this.$refs.foodList;
			// console.log(foodList)
			let el = foodList[index];
			this.foodsScroll.scrollToElement(el, 300);
		},
		selectFood(food, event) {
			if (!event._constructed) {
				return;
			}
			this.selectedFood = food;
			console.log(food);
			this.$refs.food.show();
		},
		addFood(target) {
			this._drop(target);
		},
		_drop(target) {
			// 体验优化,异步执行下落动画
			this.$nextTick(() => {
				this.$refs.shopcart.drop(target);
			});
		},
		_initScroll() {
			this.meunScroll = new BScroll(this.$refs.menuWrapper, {
				click: true
			});

			this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
				click: true,
				probeType: 3
			});

			this.foodsScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y));
			});
		},
		_calculateHeight() {
			let foodList = this.$refs.foodList;
			let height = 0;
			this.listHeight.push(height);
			for (let i = 0; i < foodList.length; i++) {
				let item = foodList[i];
				height += item.clientHeight;
				this.listHeight.push(height);
			}
		}
	},
	components: {
		cartControl,
		shopCart,
		food
	}
}

</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin";

.goods {
	position: absolute;
	top: 174px;
	bottom: 48px;
	display: flex;
	overflow: hidden;
	width: 100%;
	.menu-wrapper {
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
		.menu-item {
			display: table;
			width: 56px;
			height: 54px;
			line-height: 14px;
			padding: 0 12px;
			&.current {
				position: relative;
				margin-top: -1px;
				background: #fff;
				z-index: 10;
				.text {
					@include border-none;
					font-weight: 700;
				}
			}
			.icon {
				display: inline-block;
				width: 12px;
				height: 12px;
				vertical-align: top;
				margin-right: 2px;
				background-repeat: no-repeat;
				background-size: 12px 12px;
				&.decrease {
					@include bg-image('decrease_3');
				}
				&.discount {
					@include bg-image('discount_3');
				}
				&.guarantee {
					@include bg-image('guarantee_3');
				}
				&.invoice {
					@include bg-image('invoice_3');
				}
				&.special {
					@include bg-image('special_3');
				}
			}
			.text {
				font-size: 12px;
				display: table-cell;
				vertical-align: middle;
				width: 56px;
				@include border-1px(rgba(7, 17, 27, .1));
			}
		}
	}
	.foods-wrapper {
		flex: 1;
		.title {
			padding-left: 14px;
			height: 26px;
			line-height: 26px;
			border-left: 2px solid #d9dde1;
			font-size: 12px;
			color: rgb(147, 153, 159);
			background: #f3f5f7;
		}
		.food-item {
			display: flex;
			margin: 18px;
			padding-bottom: 18px;
			@include border-1px(rgba(7, 17, 27, .1));
			&:last-child {
				@include border-none;
				margin-bottom: 0;
			}
		}
		.icon {
			flex: 0 0 57px;
			margin-right: 10px;
		}
		.content {
			flex: 1;
			.name {
				margin: 2px 0 8px 0;
				line-height: 14px;
				font-size: 14px;
				color: rgb(7, 17, 27);
			}
			.desc,
			.extra {
				font-size: 10px;
				line-height: 12px;
				color: rgb(147, 153, 159);
			}
			.desc {
				margin-bottom: 8px;
			}
			.extra {
				.count {
					margin-right: 12px;
				}
			}
			.price {
				font-weight: 700;
				line-height: 24px;
				.now {
					margin-right: 8px;
					font-size: 14px;
					color: rgb(240, 20, 20);
				}
				.old {
					text-decoration: line-through;
					font-size: 10px;
					color: rgb(147, 153, 159);
				}
			}
			.cartcontrol-wrapper {
				position: absolute;
				right: 0;
				bottom: 12px;
			}
		}
	}
}
</style>
