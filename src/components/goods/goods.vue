<template>
    <div>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item, idx) in goods" class="menu-item" :class="{'current' : currentIndex === idx}" @click="selectMenu(idx)"><span class="text border-1px"><i v-show="item.type > 0" class="icon" :class="classMap[item.type]"></i>{{item.name}}</span></li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li class="food-list food-list-hook" v-for="item in goods">
                    <h6 class="title">{{item.name}}</h6>
                    <ul>
                        <li @click="selectFood(food)" v-for="food in item.foods" class="food-item border-1px">
                            <div class="icon"><img :src="food.icon"></div>
                            <div class="content">
                                <h5 class="name">{{food.name}}</h5>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper"><v-cartcontrol :food="food"></v-cartcontrol></div>
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
<!-- type="text/ecmascript-6" -->
<script type="text/javascript" charset="utf-8">
    import BScroll from "better-scroll"
    import shopcart from "@/components/shopcart/shopcart"
    import cartcontrol from "@/components/cartcontrol/cartcontrol"
    import food from "@/components/food/food"
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                goods: [],
                selectedFood: {},
                listHeight: [],
                scrollY: 0
            };
        },
        created () {
            this.$root.eventHub.$on('cart.add',(target) => {
                // this.functionName(target)
                this._drop(target);
            });
            this.classMap = ['icon-decrease', 'icon-discount', 'icon-guarantee', 'icon-invoice', 'icon-special'];
            this.$http({
                method: 'post',
                url: '/api/goods',
            }).then((response) => {
                response = response.data;
                this.goods = response;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                })
            });
        },
        computed: {
            currentIndex () {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i], height2 = this.listHeight[i + 1];
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
                    })
                })
                return foods;
            }
        },
        methods: {
            _initScroll () {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true});
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight () {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                // console.log(foodList);
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodList.length; i++) {
                    height += foodList[i].clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu (idx) {
                // console.log(idx);
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[idx];
                this.foodsScroll.scrollToElement(el, 300)
            },
            _drop (target) {
                // 体验优化 异步执行下落动画
                this.$nextTick(()=>{
                    this.$refs.shopcart.drop(target)
                })
            },
            selectFood (food) {
                this.selectedFood =food;
                this.$refs.food.show();
            }
        },
        components: {
            "v-shopcart": shopcart,
            "v-cartcontrol": cartcontrol,
            "v-food": food
        }
    };
</script>
<!-- <style type="text/css" rel="stylesheet/style"> -->
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display: flex
        position: absolute
        width: 100%
        top: 174px
        bottom: 46px
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width: 80px
            background: #f3f5f7
            .menu-item
                display: table
                width: 56px
                height: 54px
                line-height: 14px
                padding: 0 12px
                // margin: 0 auto
                &.current
                    position: relative
                    margin-top: -1px
                    z-index: 10
                    background #fff
                    font-weight: 600
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.icon-decrease
                        bg-image('decrease_3')
                    &.icon-discount
                        bg-image('discount_3')
                    &.icon-guarantee
                        bg-image('guarantee_3')
                    &.icon-invoice
                        bg-image('invoice_3')
                    &.icon-special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    border-1px(rgba(7, 17, 27, .1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 16px
                border-1px(rgba(7, 17, 27, .1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                    img
                        width: 100%
                .content
                    flex: 0 0 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        line-height: 10px
                        // .count
                        //     margin-right: 6px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px





</style>
