<template>
    <div>
        <shopheader></shopheader>
         <div class="tab">
      <div class="tab-item">
        <!---设置 replace 属性的话，
        当点击时，会调用 router.replace() 而不是 router.push()，导航后不会留下 history 记录--->
        <router-link to="/shop/shoplist" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopcomment" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/shopinfo" replace>商家</router-link>
      </div>
    </div>
    <!---为了让组件数据缓存，避免每次资源重复加载（
    例如每次切换导航时数据会重新加载一次，体验真的差）--->
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
       
    </div>
</template>
<script>
import shopheader from "../components/shopheader"

export default {
    components:{
        shopheader
    },
    mounted(){
        this.$store.dispatch("getShopInfo")
    }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
 a{
  text-decoration: none
}

  @import "../common/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>