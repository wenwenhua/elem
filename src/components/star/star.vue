<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass, index) in itemClasses" :class="itemClass" class="star-item" v-bind:key="index"></span>
    </div>
</template>
<script type="text/javascript" charset="utf-8" >

const LENGTH = 5;
const CLS_HALF = 'half';
const CLS_ON = 'on';
const CLS_OFF = 'off';

module.exports = {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType () {
            return 'star-' + this.size;
        },
        itemClasses () {
            // 数组容器
            let result = [];
            // 向下取整
            let score = Math.floor(this.score * 2) / 2;
            // 判断是否有小数
            let hasDecimal = score % 1 !== 0;
            let integer = Math.floor(score);
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            if (hasDecimal) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
};
</script>
<style type="text/css" media="screen">
    .star{}
    .star-item{
        display: inline-block;
        background-repeat: no-repeat;
    }
    .star.star-48 .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
    }
    .star.star-48 .star-item:last-child{
        margin-right: 0;
    }
    .star.star-48 .on{
        background: url(star48_on@2x.png) no-repeat center center;
        background-size: 20px 20px;
    }
    .star.star-48 .half{
        background: url(star48_half@2x.png) no-repeat center center;
        background-size: 20px 20px;
    }
    .star.star-48 .off{
        background: url(star48_off@2x.png) no-repeat center center;
        background-size: 20px 20px;
    }
    .star.star-36 .star-item{
        width: 15px;
        height: 15px;
        margin-right: 16px;
    }
    .star.star-36 .star-item:last-child{
        margin-right: 0;
    }
    .star.star-36 .on{
        background: url(star36_on@2x.png) no-repeat center center;
        background-size: 15px 15px;
    }
    .star.star-36 .half{
        background: url(star36_half@2x.png) no-repeat center center;
        background-size: 15px 15px;
    }
    .star.star-36 .off{
        background: url(star36_off@2x.png) no-repeat center center;
        background-size: 15px 15px;
    }
    .star.star-24 .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
    }
    .star.star-24 .star-item:last-child{
        margin-right: 0;
    }
    .star.star-24 .on{
        background: url(star24_on@2x.png) no-repeat center center;
        background-size: 10px 10px;
    }
    .star.star-24 .half{
        background: url(star24_half@2x.png) no-repeat center center;
        background-size: 10px 10px;
    }
    .star.star-24 .off{
        background: url(star24_off@2x.png) no-repeat center center;
        background-size: 10px 10px;
    }
</style>
