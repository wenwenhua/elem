<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar"><img width="64" height="64" :src="seller.avatar"></div>
            <div class="content">
                <div class="title"><span class="brand"></span><span class="name">{{seller.name}}</span></div>
                <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
                <div v-if="seller.supports" class="support"><span class="icon" :class="classMap[seller.supports[0].type]"></span><span class="text">{{seller.supports[0].description}}</span></div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetails"><span class="count">{{seller.supports.length}} 个</span><i class="icon-keyboard_arrow_right"></i></div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="bg"><img :src="seller.avatar" width="100%" height="100%"></div>
        <transition name="fade">
            <div v-show="detailShow" class="details">
                <!-- 清楚浮动 -->
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h2 class="name">{{seller.name}}</h2>
                        <div class="star-wrapper"><v-star :size="48" :score="seller.score"></v-star></div>
                        <div class="titleShow">
                            <div class="lineShow"></div>
                            <div class="textShow">优惠信息</div>
                            <div class="lineShow"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li class="support support-item" v-for="(item, index) in seller.supports"><span class="icon" :class="classMap[seller.supports[index].type]"></span><span class="text">{{seller.supports[index].description}}</span></li>
                        </ul>
                        <div class="titleShow">
                            <div class="lineShow"></div>
                            <div class="textShow">商家公告</div>
                            <div class="lineShow"></div>
                        </div>
                        <div class="bulletinShow">{{seller.bulletin}}</div>
                    </div>
                </div>
                <div class="detail-close" @click="showDetails"><i class="icon-close"></i></div>
            </div>
        </transition>
    </div>
</template>
<script >
    import star from '../star/star';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created () {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        data: function () {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetails: function () {
                this.detailShow = !this.detailShow;
            }
        },
        components: {
            'v-star': star
        }
    };
</script>
<style>
.clearfix{
    display: inline-block;
}
.clearfix:after{
    display: block;
    content: "";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}

.header{
    color: #fff;
    background-color: rgba(7,17,27,.5);
    position: relative;
    overflow-y: hidden;
}
.content-wrapper{
    padding: 24px 12px 18px 24px;
    /*消除空白字符*/
    font-size: 0;
    position: relative;
}
.content-wrapper .avatar{
    display: inline-block;
    font-size: 14px;
    vertical-align: top;
}
.content-wrapper .avatar img{
    border-radius: 2px;
}
.content-wrapper .content{
    display: inline-block;
    font-size: 14px;
    margin-left: 16px;
}
.title{
    margin: 2px 0 8px 0;
}
.brand{
    display: inline-block;
    width: 30px;
    height: 18px;
    background: url(brand@2x.png) no-repeat center center;
    background-size:30px 18px;
    vertical-align: top;
    /* @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3){
        background: url(brand@3x.png) no-repeat center center;
    } */
}
.name{
    font-size: 16px;
    margin-left: 6px;
    line-height: 18px;
    font-weight: 600;
}
.description{
    margin-bottom: 10px;
    line-height: 12px;
    font-size: 12px;
}
.support .text{
    font-size: 10px;
    line-height: 12px;
    vertical-align: top;
}
.support .icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
}
.support .icon.decrease{
    background: url(decrease_1@2x.png) no-repeat center center;
    background-size: 12px 12px;
}
.support .icon.discount{
    background: url(discount_1@2x.png) no-repeat center center;
    background-size: 12px 12px;
}
.support .icon.guarantee{
    background: url(guarantee_1@2x.png) no-repeat center center;
    background-size: 12px 12px;
}
.support .icon.invoice{
    background: url(invoice_1@2x.png) no-repeat center center;
    background-size: 12px 12px;
}
.support .icon.special{
    background: url(special_1@2x.png) no-repeat center center;
    background-size: 12px 12px;
}

.support-count{
    position: absolute;
    bottom: 14px;
    right: 12px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba( 0, 0, 0, .2);
    text-align: center;
}
.count{
    font-size: 10px;
    vertical-align: top;
}
.icon-keyboard_arrow_right{
    font-size: 10px;
    line-height: 24px;
    margin-left: 2px;
}
.bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background-color: rgba( 0, 0, 0, .2);
}
.bulletin-title{
    display: inline-block;
    width: 22px;
    height: 12px;
    background: url(bulletin@2x.png) no-repeat center center;
    background-size: 22px 12px;
}
.bulletin-text{
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
    font-weight: 200;
}
.bulletin-wrapper .icon-keyboard_arrow_right{
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
}
.bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
}
.details{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: auto;
    background: rgba(7,17,27,0.8);
}
.detail-wrapper{
    min-height: 100%;
    width: 100%;
}
.detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
}
.detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0;
    clear: both;
    font-size: 32px;
    background-color: #fff;
}
.name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
}
.star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
}
.titleShow{
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
}
.lineShow{
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.textShow{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 600;
}
.support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
}
.supports .support-item:last-child{
    margin-bottom: 0;
    vertical-align: top;
}
.supports {
    width: 100%;
    margin-left: 10%;
}
.support.support-item .icon{
    width: 16px;
    height: 16px;
    margin-right: 6px;
}
.support.support-item .text{
    font-size: 12px;
    line-height: 16px;
}
.support.support-item .icon.decrease{
    background: url(decrease_2@2x.png) no-repeat center center;
    background-size: 16px 16px;
}
.support.support-item .icon.discount{
    background: url(discount_2@2x.png) no-repeat center center;
    background-size: 16px 16px;
}
.support.support-item .icon.guarantee{
    background: url(guarantee_2@2x.png) no-repeat center center;
    background-size: 16px 16px;
}
.support.support-item .icon.invoice{
    background: url(invoice_2@2x.png) no-repeat center center;
    background-size: 16px 16px;
}
.support.support-item .icon.special{
    background: url(special_2@2x.png) no-repeat center center;
    background-size: 16px 16px;
}
.bulletinShow{
    width: 80%;
    margin: 0 auto;
    line-height: 1.5;
    font-size: 14px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
