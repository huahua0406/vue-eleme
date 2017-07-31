<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import vHeader from '@/components/header/header'
import { requestSeller } from '@/api/api'
import {urlParse} from '@/util/util';
export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          console.log(queryParam);
          return queryParam.id;
        })()
      }
    }
  },
  created() {
    this.getSeller()
  },
  methods: {
    getSeller() {
      requestSeller({}).then(res => {
        // console.log(res);
        // this.seller = res.data;
        //根据ID来获取不同用户的信息
        //接口：'/api/seller/?id='+this.seller.id
        this.seller = Object.assign({}, this.seller, res.data);
        //把id属性合并在seller上
        //console.log(this.seller.id);
        // console.log(this.seller);
      })
    }
  },
  components: {
    vHeader
  }
}
</script>

<style lang="scss" scoped>
@import "common/scss/mixin";
#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, .1));
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
