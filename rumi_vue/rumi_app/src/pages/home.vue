<template>
    <section class="msite">
        <!--首页头部-->        
        <headerTop :title="title"  :only="only">
             <span class="header_login" slot="login">
            <span class="header_login_text" @click="$router.push('/login')" v-if="!(userInfo._id||userInfo.phone)">登录|注册</span>
            
             <span class="header_login_text" v-else><i class="iconfont icon-person" ></i>
            </span>
          </span>
        </headerTop>
          <div ref="msite-wrapper" class="msite-wrapper">
       <div>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container">
            <div class="swiper-wrapper" v-if="categorys.length">
              <!---分类栏二维数组循环--->
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(list,index) in categorys " :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+list.image_url">
                   
                  </div>
                  <span>{{list.title}}</span>
                </a>
              
              </div>
            </div>
            <!---网速较慢时图片蒙版--->
            <img src="./images/msite_back.svg" alt="" v-else>
           <div class="swiper-pagination"></div>
          </div>
        </nav>
        <!--首页附近商家列表-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <itemList></itemList>
        </div>
        </div>
      </div>
      </section>
</template>
<script>
import headerTop from "../components/headerTop"
import itemList from "../components/itemList"
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"
import {mapState} from "vuex"
import BScroll from "better-scroll"
export default {
 
  components:{
    headerTop,itemList
  },
    data(){
      return{
        only:true,
     baseImageUrl:"https://fuss10.elemecdn.com"

    }
      
    },
    computed:{
    
     title(){
       return this.$store.state.address
     },
       ...mapState(["categorys"]),
       ...mapState(["userInfo"]),
       //创建二维数组进行遍历
       categorysArr(){
         const {categorys}=this;
         const arr=[];
         let minArr=[];
         //二维数组的设计[[minArr],[minArr]]
         categorys.forEach(item=>{
           if(minArr.length==8){
             minArr=[]
           }
           if(minArr==0){
             arr.push(minArr)
           }
           minArr.push(item)
         })
       
         return arr
       }

    },
    created(){
           this.$store.dispatch("getCategorys"),
  /* this.$store.dispatch("getAddress"),*/
    this.$store.dispatch("getShops")
    },
    mounted(){
     
    },
    watch:{
      categorys(value){
            //在页面渲染this.$nextTick完成之后才能初始化swiper
               this.$nextTick(()=>{
                var mySwiper = new Swiper ('.swiper-container', {
          pagination : '.swiper-pagination',
        });
       

      });

    
  
    }
},
  methods:{
  
    
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.msite-wrapper{
       position: fixed;
    top: 15px;
    bottom: 46px;
    width: 100%;

}
.swiper-pagination{
  bottom 0
}
    @import "../common/mixins.styl"
    .msite a
      text-decoration none
    .msite li
      list-style none
    &.msite  //首页
         
         
          .msite_header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
         
          .header_search
            position absolute
            left 15px
            top 50%
            transform translateY(-50%)
            width 10%
            height 50%
          .icon-sousuo
            font-size 25px
            color #fff
          .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 50%
            color #fff
            text-align center
          .header_title_text
            font-size 10px
            color #fff
            display block
          .header_login
            font-size 10px
            color #fff
            position absolute
            right 30px
            top 50%
            transform translateY(-50%)
            .header_login_text
              color #fff
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 35px
            height 170px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                
                .swiper-slide
                  width 100%
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                     
                      font-size 0
                      img
                       display inline-block
                       width 50px
                       height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
            
</style>
