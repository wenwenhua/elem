<template>
  <div class="container">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item"> <router-link to="/goods">商品</router-link> </div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';

const ERR_OK = 0;

export default {
  data () {
    // console.log('test');
    return {
      seller: {}
    };
  },
  created () {
    const url = '/api/seller';
    this.$http.get(url).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style>
.container{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}

.container .tab{
  display: flex;
  width: 100%;
  line-height: 40px;
  height: 40px;
  position: relative;
}
.container .tab:after{
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(7, 17, 27, 0.1);
  -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
}
.container .tab .tab-item{
  flex: 1;
  text-align: center;
}
.container .tab .tab-item{

}
.container .tab .tab-item a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.container .tab .tab-item a.active{
  color: rgb(240,20,20);
}


</style>
