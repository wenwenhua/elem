import Vue from 'vue';
import Router from 'vue-router';
// import Hello from '@/components/Hello';
import Goods from '@/components/goods/goods';
import Seller from '@/components/seller/seller';
import Ratings from '@/components/ratings/ratings';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
        path: '/', redirect: '/goods'
    }
  ]
});
