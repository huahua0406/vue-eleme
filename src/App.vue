<template>
  <div id="app">
      <v-header :seller="seller"></v-header>
      <div class="tab border-1px">
      	<div class="tab-item"><router-link to="/goods">商品</router-link></div>
      	<div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      	<div class="tab-item"><router-link to="/seller">商家</router-link></div>
      </div>
      <keep-alive>
  		  <router-view :seller="seller"></router-view>
  	  </keep-alive>
  </div>
</template>

<script>
import vHeader from './components/header/header'
import {urlParse} from 'assets/js/util';
import data from 'assets/json/data.json'
export default {
  name: 'app',
  components: {
    vHeader
  },
  data(){
  	return{
  		seller:{
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      }
  	}
  },
  mounted(){
  	this.$nextTick(() => { 
  		/* 初始化数据 */ 
  		// this.getData();
      this.seller = data.seller;
  	})
  },
  methods: {
    	getData(){
    		this.$http.get('/api/seller/?id='+this.seller.id).then(response=>{
  		    // console.log(response);
  		    // this.seller = response.data.data;
          this.seller = Object.assign({}, this.seller, response.data.data);
          //把id属性合并在seller上
          console.log(this.seller.id)
  		}).catch(err=>{
  		    console.log(err);
  		});
  	}
  }
}
</script>

<style lang="scss">
@import "assets/scss/mixin";
#app {
  //max-width: 540px;
  margin: auto;
  .tab{
  	display: flex;
  	width: 100%;
  	height: 40px;
  	line-height: 40px;
	  @include border-1px;
  	.tab-item{
  		flex: 1;
  		text-align:center;
  		a{
		  	display: block;
		  	font-size: 14px;
		  	color: rgb(77,85,93);
  		}
  		.router-link-active{
			color: rgb(240,20,20);
  		}
  	}
  }
}
</style>
