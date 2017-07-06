<template>
    <div>
        <transition name="move">
            <div v-show="showFlag" class="food" ref="food">
                <div class="food-content">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                    <div class="img-header"><img :src="food.image"></div>
                    <div class="content">
                        <h2 class="title">{{food.name}}</h2>
                        <div class="detail">
                            <span class="sell-count">月售{{food.sellCount}}</span>
                            <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now">¥{{food.price}}</span>
                            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <v-cartcontrol :food="food"></v-cartcontrol>
                        </div>
                        <transition name="fade">
                            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
                        </transition>
                    </div>
                    <v-split v-show="food.info"></v-split>
                    <div class="info" v-show="food.info">
                        <h2 class="title">商品信息</h2>
                        <p class="text">{{food.info}}</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript" charset="utf-8" >
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';

export default {
    data () {
        return {
            showFlag: false
        };
    },
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        show () {
            this.showFlag = true;
            this.$nextTick(() => {
            /* 保证在DOM渲染之后执行以下代码 */
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                }
            });
        },
        addFirst (event) {
            if (!event._constructed) {
                return;
            }
            Vue.set(this.food, 'count', 1);
            /* 子组件向父组件传值，在 addCart 方法上分发cartcontrol事件 */
            this.$emit('cartcontrol', event.target);
        },
        hide () {
            this.showFlag = false;
        }
    },
    components: {
        'v-cartcontrol': cartcontrol,
        'v-split': split
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30px
    width: 100%
    background: #fff;
    transition: all 0.2s linear
    transform: translate3d(0, 0, 0);
    &.move-enter, &.move-leave-to
        transform: translate3d(100%, 0, 0);
    .back
        position: absolute;
        left: 4px
        top: 8px
        padding 8px
        color #fff
        z-index 100
    .img-header
        position: relative
        width: 100%
        height: 0
        /* height为0padding的百分值是依据width来计算 */
        padding-top: 100%
        img
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
    .content
        position: relative
        padding: 18px
        .title
            line-height: 14px
            margin-bottom: 8px
            font-size: 14px
            font-weight: 700
            color: rgb(7, 17, 27)
        .detail
            margin-bottom: 18px
            line-height 10px
            height 10px
            font-size 0
            .sell-count, .rating
                font-size 10px
                color rgb(147, 153, 159)
            .sell-count
                margin-right: 12px
        .price
            font-weight: 700;
            line-height: 24px;
            font-size: 14px;
            color: rgb(240, 20, 20);
            .old
                margin-left: 8px
                font-size: 10px;
                color: rgb(147, 153, 159);
                text-decoration: line-through;
        .cartcontrol-wrapper
            position: absolute
            right: 12px
            bottom 12px
        .buy
            position: absolute;
            right: 18px
            bottom 18px
            z-index 10
            height 24px
            line-height 24px
            padding 0 12px
            box-sizing border-box
            font-size 10px
            border-radius 12px
            color #fff
            background #00a0dc
            transition all 0.5s
            opacity 1
            &.fade-enter, &.fade-leave-to
                opacity 0
    .info
        line-height 14px
        margin-bottom 6px
        padding: 18px;
        font-size 14px
        color rgb(7, 17, 27)
        .text
            padding: 0 8px
            line-height 14px
            font-size 12px
            color rgb(77, 85, 93)


</style>
