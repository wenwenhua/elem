<template>
  <div class="container">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view></router-view> -->
    <v-header></v-header>
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

export default {
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container .tab{
  display: flex;
  width: 100%;
  line-height: 40px;
  height: 40px;
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
