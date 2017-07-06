<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index)"><span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span></li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li v-for="item in goods" class="food-list food-list-hook">
                        <h2 class="title">{{item.name}}</h2>
                        <ul>
                            <li @click.stop.prevent="selectFood(food)" v-for="food in item.foods" class="food-item">
                                <div class="icon"><img :src="food.icon"></div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra"><span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></div>
                                    <div class="price"><span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span></div>
                                    <div class="cartcontrol-wrapper">
                                        <!-- 子组件向父组件传值，使用 v-on监听子组件上 $emit 的变化-->
                                        <v-cartcontrol v-on:cartcontrol="_drop" :food="food"></v-cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <v-shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
        </div>
        <v-food :food="selectedFood" ref="food"></v-food>
    </div>
</template>
<script >
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';

    const ERR_OK = 0;

    export default {
        props: {
            // 获取父组件的seller数据
            seller: {
                type: Object
            }
        },
        data () {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            };
        },
        computed: {
            currentIndex () {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods () {
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
        created () {
            this.$http.get('/api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        methods: {
            _initScroll () {
                // console.log(this.$els.menuWrapper);
                this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    // 滚动时实时监测位置信息
                    click: true,
                    probeType: 3
                });

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight () {
                // 原生DOM
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                // console.log(foodList);
                let height = 0;
                // 第一个区块的高度
                this.listHeight.push(height);

                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu (index) {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el, 300);
                console.log(index);
            },
            /*
            定义_drop() 方法，在监听到子组件上 $emit 的变化时调用
             */
            _drop (target) {
                /*
                获取shopcart组件，并调用其drop方法
                 */
                // console.log(this.$refs.shopcart); shopcart组件
                // 体验优化，异步执行下落动画
                this.$nextTick(() => {
                    this.$refs.shopcart.drop(target);
                });
            },
            selectFood (food) {
                this.selectedFood = food;
                this.$refs.food.show();
            }
        },
        components: {
            'v-shopcart': shopcart,
            'v-cartcontrol': cartcontrol,
            'v-food': food
        }
    };
</script>
<style>
    .goods{
        display: flex;
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 46px;
        overflow: hidden;
    }
    .menu-wrapper{
        /*等分  缩放 占位空间*/
        flex: 0 0 80px;
        width: 80px;
        background-color: #f3f5f7;
    }
    .menu-item{
        display: table;
        width: 56px;
        height: 54px;
        line-height: 14px;
        padding: 0 12px;
    }
    .menu-item .icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        vertical-align: top;
    }
    .menu-item .icon.decrease{
        background: url(decrease_3@2x.png) no-repeat center center;
        background-size: 12px 12px;
    }
    .menu-item .icon.discount{
        background: url(discount_3@2x.png) no-repeat center center;
        background-size: 12px 12px;
    }
    .menu-item .icon.guarantee{
        background: url(guarantee_3@2x.png) no-repeat center center;
        background-size: 12px 12px;
    }
    .menu-item .icon.invoice{
        background: url(invoice_3@2x.png) no-repeat center center;
        background-size: 12px 12px;
    }
    .menu-item .icon.special{
        background: url(special_3@2x.png) no-repeat center center;
        background-size: 12px 12px;
    }
    .menu-item.current{
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
    }
    .menu-item.current .text{
        border: none 0;
    }
    .menu-item .text{
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        border-bottom: rgba(7,17,27,.1) solid 1px;
    }
    .foods-wrapper{
        flex: 1;
    }
    .foods-wrapper .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159);
        background: #f3f5f7;
    }
    .food-item{
        display: flex;
        margin: 12px 12px 0;
        padding-bottom: 12px;
        border-bottom: rgba(7, 17, 27, 0.1) solid 1px;
    }
    .food-item:last-child{
        border-bottom: 0 none;
    }
    .food-item .icon{
        flex: 0 0 57px;
        margin-right: 10px;
    }
    .food-item .icon img{
        width: 100%;
    }
    .food-item .content{
        flex: 1;
        position: relative;
    }
    .food-item .name{
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    .food-item .desc, .food-item .extra{
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .food-item .desc{
        margin-bottom: 8px;
    }
    .food-item .extra{
    }
    .food-item .count{
        margin-right: 8px;
    }
    .food-item .price{
        font-weight: 700;
        line-height: 24px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    .food-item .now{
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }
    .cartcontrol-wrapper{
        position: absolute;
        right: 0;
        bottom: 12px;
    }
</style>
