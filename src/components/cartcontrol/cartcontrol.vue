<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="decreaseCart"></div>
        </transition>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>
<script type="text/javascript" charset="utf-8">
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart (e) {
                if (!e._constructed) {
                    return;
                }
                console.log('test');
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                    // this.food.count = 1;
                } else {
                    this.food.count++;
                }
                /* 子组件向父组件传值，在 addCart 方法上分发cartcontrol事件 */
                this.$emit('cartcontrol', event.target);
            },
            decreaseCart (event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        },

        created () {
            // console.log(this.food);
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size: 0
        .cart-decrease
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size:24px
            color: rgb(0,160,220)
            transition: all .3s linear
            transform: translate3d(0,0,0) rotate(0)
            opacity:1
            &.move-enter, &.move-leave-to
                opacity: 0
                transform: translate3d(24px,0,0) rotate(-180deg)
        .cart-count
            display: inline-block
            vertical-align: top
            width: 12px
            padding-left: 6px
            line-height: 24px
            text-align: center
            font-size: 10px
            color: rgb(147, 153, 1)
        // .cart-decrease
        .cart-add
            display: inline-block
            padding: 6px
            line-height: 24px
            font-size:24px
            color: rgb(0,160,220)

</style>
