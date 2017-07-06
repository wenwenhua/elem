<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight' : totalCount > 0}">
                            <span class="icon-shopping_cart"></span>
                        </div>
                        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight' : totalCount > 0}">¥{{totalPrice}}</div>
                    <div class="desc">另需配送费¥{{deliveryPrice}}</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay"  :class="{'highlight': totalPrice - minPrice >= 0}">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                        <div v-show="ball.show" class="ball"><div class="inner inner-hook"></div></div>
                    </transition>
                </div>
            </div>
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h2 class="title">购物车</h2>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price"><span>¥{{food.price * food.count}}</span></div>
                                <div class="cartcontrol-wrapper"><v-cartcontrol :food="food"></v-cartcontrol></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>
<script type="text/javascript" charset="utf-8">
    import cartcontrol from '../cartControl/cartControl';
    import BScroll from 'better-scroll';
    export default {
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [
                    {
                        price: 10,
                        count: 1
                    }
                    ];
                }
            },
            // 获取父组件的seller数据
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                balls: [
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false},
                    {show: false}
                ],
                dropBalls: [],
                fold: true
            };
        },
        computed: {
            totalPrice () {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount () {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc () {
                if (this.totalPrice === 0) {
                    return '¥' + this.minPrice + '起送';
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return '还差¥' + diff + '元起送';
                } else {
                    return '去结算';
                }
            },
            listShow () {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        methods: {
            /*
            在父组件goods调用
             */
            drop (el) {
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball.el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeEnter (el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        //
                        let rect = ball.el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = (window.innerHeight - rect.top - 44);
                        el.style.display = '';
                        el.style.webkitTransform = `translate3d(0px, -${y}px, 0)`;
                        el.style.transform = `translate3d(0px, -${y}px, 0)`;
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter (el) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0px, 0px, 0px)';
                    el.style.transform = 'translate3d(0px, 0px, 0px)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                });
             },
             afterEnter (el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            toggleList () {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty () {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            hideList () {
                this.fold = true;
            },
            pay (e) {
                if (this.totalPrice < this.minPrice) {
                    return;
                }
                alert('需支付' + this.totalPrice + '元');
            }
        },
        components: {
            'v-cartcontrol': cartcontrol
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.shopcart
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #000;
    .ball-container
        .ball
            position: fixed
            left: 32px
            bottom: 22px
            z-index: 200
            transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            .inner
                    width 16px
                    height 16px
                    border-radius 50%
                    background rgb(0, 160, 220)
                    transition: all 0.4s linear
    .shopcart-list
        position: absolute;
        top: 0;
        left: 0
        z-index: -1
        width: 100%
        transition: all 0.5s
        transform: translate3d(0, -100%, 0)
        &.fold-enter, &.fold-leave-to
            transform: translate3d(0, 0, 0)
        .list-header
            height: 40px
            line-height: 40px
            padding: 0 18px
            background: #f3f5f7
            border-bottom: 1px solid rgba(7, 17, 27, .1)
            overflow: hidden
            .title
                float: left
                font-size: 14px
                color: rgb(7, 17, 27)
            .empty
                float: right
                font-size: 12px
                color: rgb(0, 160, 220)
        .list-content
            width: 100%
            max-height: 217px
            background:#fff
            overflow: hidden;
            .food
                position:relative
                padding: 12px 0
                margin: 0 18px;
                box-sizing: border-box
                border-bottom: 1px solid rgba(7, 17, 27, .1)
                .name
                    line-height: 24px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .price
                    position: absolute
                    right: 90px
                    bottom: 12px
                    line-height: 24px
                    font-size: 14px
                    font-weight: 700
                    color: rgb(240, 20, 20)
                .cartcontrol-wrapper
                    position: absolute
                    right: 0
                    bottom: 6px

.shopcart .content{
    display: flex;
    background: #141d27;
    font-size: 0;
}
.content-left{
    flex: 1;
}
.logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    .num{
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 400;
        color: #fff;
        background-color: rgb(240,20,20);
        box-shadow: 0 4px 8px rgba(0, 0, 0, .4);
    }
}
.logo-wrapper .logo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
    &.highlight{
        background-color: rgb(0, 160, 220);
        .icon-shopping_cart{
            color: #fff;
        }
    }
}
.logo-wrapper .logo .icon-shopping_cart{
    color: #80858a;
    font-size: 24px;
    line-height: 44px;
}
.content-left .price{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    &.highlight{
        color: #fff;
    }
}
.content-left .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 14px;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.4);
}
.content-right{
    flex: 0 0 105px;
    width: 105px;
    background-color: #2b333b;
    .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, .4);
        font-weight: 700;
        &.highlight{
            background-color: #00b43c;
            color: #fff;
        }
    }
}

.list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    transition: all 0.5s
    &.fade-enter, &.fade-leave-to
        opacity: 0
        background: rgba(7, 17, 27, 0.0)
</style>
