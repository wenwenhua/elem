<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar"><img width="64" height="64" :src="seller.avatar"></div>
            <div class="content">
                <h6 class="title"><i class="icon icon-brand"></i><span>{{seller.name}}</span></h6>
                <div class="desc">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="supports" v-if="seller.supports">
                    <i class="icon" :class="classMap[seller.supports[0].type]"></i>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail()"><span class="count">{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i></div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail()"><span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i></div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="fade" mode="out-in" appear>
        <div class="details" v-show="detailShow">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h6 class="name">{{seller.name}}</h6>
                    <div class="star-wrapper">
                        <v-star :size="48" :score="seller.score" ></v-star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul class="supports" v-if="seller.supports">
                        <li class="support-item" v-for="(item, idx) in seller.supports">
                            <i class="icon" :class="classMap[seller.supports[idx].type]"></i>
                            <span class="text">{{seller.supports[idx].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail()"><i class="icon-close"></i></div>
        </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6" charset="utf-8">
    import star from '@/components/star/star'
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                detailShow: false
            };
        },
        created () {
            this.classMap = ['icon-decrease', 'icon-discount', 'icon-guarantee', 'icon-invoice', 'icon-special'];
        },
        computed: {
        },
        methods: {
            showDetail () {
                this.detailShow = true
            },
            hideDetail () {
                this.detailShow = false
            }
        },
        components: {
            'v-star': star
        }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .header
        position: relative
        color: #fff
        background: rgba(7, 17, 27, .5)
        .content-wrapper
            position: relative
            font-size: 0px
            padding: 24px 12px 18px 24px
            .avatar
                display: inline-block
                vertical-align: top
                img
                    border-radius: 2px
            .content
                display: inline-block
                margin-left: 16px
                font-size: 14px
                .title
                    margin: 2px 0 8px 0
                    .icon-brand
                        display: inline-block
                        vertical-align: top;
                        width: 30px
                        height: 18px
                        bg-image('brand')
                        background-size: 30px 18px
                        background-repeat: no-repeat
                    span
                        margin-left: 6px
                        font-weight: 600
                        line-height: 18px
                        font-size: 16px
                .desc
                    margin-bottom: 10px
                    line-height: 12px
                    font-size: 12px
                .supports
                    font-size: 0px
                    .icon
                        display: inline-block
                        vertical-align: top
                        width: 12px
                        height: 12px
                        margin-right: 4px
                        background-size: 12px 12px
                        background-repeat: no-repeat
                        &.icon-decrease
                            bg-image('decrease_1')
                        &.icon-discount
                            bg-image('discount_1')
                        &.icon-guarantee
                            bg-image('guarantee_1')
                        &.icon-invoice
                            bg-image('invoice_1')
                        &.icon-special
                            bg-image('special_1')
                    .text
                        font-size: 12px
                        line-height: 12px
            .support-count
                position: absolute
                right: 12px
                bottom: 18px
                padding: 0 8px
                height: 24px
                line-height: 24px
                border-radius: 14px
                background: rgba(0, 0, 0, .2)
                text-align: center
                .count
                    font-size: 10px
                .icon-keyboard_arrow_right
                    font-size: 10px
                    line-height: 24px
        .bulletin-wrapper
            background: rgba(7, 17, 27, .3)
            position: relative
            height: 28px
            line-height: 28px
            padding: 0 36px 0 12px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            // font-size: 0px
            .bulletin-title
                display: inline-block
                width: 22px
                height: 12px
                bg-image('bulletin')
                background-size: 22px 12px
                background-repeat: no-repeat
            .bulletin-text
                display: inline-block
                vertical-align: top
                font-size: 10px
                // line-height: 12px
                margin: 0 4px
            .icon-keyboard_arrow_right
                position: absolute
                right: 12px
                top: 8px
                font-size: 10px
        .background
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            z-index: -1
            filter: blur(10px)
        .details
            position: fixed
            top: 0
            left: 0
            z-index: 100
            width: 100%
            height: 100%
            overflow: auto
            background: rgba(7, 17, 27, .8)
            backdrop-filter: blur(10px)
            .detail-wrapper
                width: 100%
                min-height: 100%
                .detail-main
                    margin-top: 64px
                    padding-bottom: 64px
                    .name
                        line-height: 16px
                        text-align: center
                        font-weight: 600
                    .star-wrapper
                        margin-top:  18px
                        padding: 2px 0
                        text-align: center
                    .title
                        display: flex
                        width: 80%
                        margin: 28px auto 24px
                        .line
                            flex: 1
                            position: relative
                            top: -6px
                            border-bottom: 1px solid rgba(255, 255, 255, .2)
                        .text
                            padding: 0 12px
                            font-size: 14px
                            font-weight: 600
                    .supports
                        width: 80%
                        margin: 0 auto
                        .support-item
                            padding: 0 12px
                            margin-bottom: 12px
                            font-size: 0px
                            &:last-child
                                margin-bottom: 0px
                            .icon
                                display: inline-block
                                vertical-align: top
                                width: 16px
                                height: 16px
                                margin-right: 6px
                                background-size: 16px 16px
                                background-repeat: no-repeat
                                &.icon-decrease
                                    bg-image('decrease_2')
                                &.icon-discount
                                    bg-image('discount_2')
                                &.icon-guarantee
                                    bg-image('guarantee_2')
                                &.icon-invoice
                                    bg-image('invoice_2')
                                &.icon-special
                                    bg-image('special_2')
                            .text
                                line-height: 16px
                                font-size: 10px
                    .bulletin
                        width: 80%
                        margin: 0 auto
                        .content
                            padding: 0 12px
                            line-height: 24px
                            font-size: 12px
            .detail-close
                position: relative
                width: 32px
                height: 32px
                margin: -64px auto 0 auto
                clear: both
                font-size: 32px
        .fade-enter-active, .fade-leave-active
          transition: all .8s
        .fade-enter, .fade-leave-to
          opacity: 0



</style>
