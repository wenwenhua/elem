<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link class="link" to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link class="link" to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link class="link" to="/seller">商家</router-link>
            </div>
        </div>
        <!-- 保留组件状态或避免重新渲染 -->
        <keep-alive>
            <router-view :seller="seller" ></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6" charset="utf-8">
    import {urlParse} from './common/js/util'
    import header from './components/header/header';
    const ERR_OK = 0;
    export default {
        name: 'App',
        data () {
            return {
                seller: {
                    id: (() => {
                        let queryParam = urlParse();
                        return queryParam.id
                    })()
                }
            }
        },
        created () {
                console.log(this.seller.id);
            this.$http({
              method: 'get',
               url: '/api/seller?id=' + this.seller.id,
            }).then((response) => {
                response = response.data;
                this.seller = Object.assign({}, this.seller, response)
            });
        },
        components: {
            'v-header': header
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"
    #app
        .tab
            display: flex
            width: 100%
            height: 40px
            line-height: 40px
            border-1px(rgba(7, 17, 27, .1))
            .tab-item
                flex: 1
                text-align: center
                &>a
                    display: block
                    font-size: 14px
                    color: rgb(77, 85, 93)
                    &.active
                        color: rgb(240, 20, 20)
</style>
