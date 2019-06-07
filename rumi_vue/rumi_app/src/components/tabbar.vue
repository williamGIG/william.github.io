<template>
    
   <footer class="footer_guide border-1px">
    <router-link href="javascript:;" class="guide_item" v-for="(item,index) in tabbarData"
    :key="index" :to="item.path"
 active-class="on">
      <span class="item_icon">
        <i :class="item.icon"></i>
      </span>
      <span>{{item.title}}</span>
    </router-link>
 
  </footer>
</template>
<script>
export default {
    props:{
      tabbarData:Array
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../common/mixins.styl"
  footer a
     text-decoration none

.footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 55px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #009eef
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
        a
            list-style  none  
</style>

