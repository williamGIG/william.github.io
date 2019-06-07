<template>
<div class="order">
  <headerTop :title="title"/>
          <div v-if="totalPrice" style="z-index:999">
           <div class="list-content" >
            <ul >
              <li class="food" v-for="(food,index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <span class="count">{{food.count}}份</span>
                <div class="price"><span>￥{{food.price*food.count}} </span> </div>
              
              </li>
            </ul>
            <div class="totalPrice">
             
              <span >￥{{totalPrice}}元</span></div>
               <p class="pay">确认支付</p>
          </div>
          </div>
          <div v-else class="order">
           
        <section class="order_no_login">
          <img src="./images/order/person.png">
          <div v-if="!userInfo">
          <h3>未添加外卖订单</h3>
          <button>立即登陆</button>
          </div>
          <h3 v-else>账号ID:{{userInfo.name||userInfo.phone}}未点餐</h3>
        </section>
      
          </div>
           <div class="food-cover" v-if="totalPrice"></div>
           
   
  </div>
</template>
<script>
import headerTop from "../components/headerTop"
import {mapState, mapGetters} from 'vuex'
import CartControl from '../components/CartControl.vue'

export default {
      components:{
    headerTop,CartControl
  },
    data(){
      return{
        title:"订单列表",
      }
    },
    computed:{
      ...mapState(['userInfo','cartFoods']),
      ...mapGetters(['totalPrice'])
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "../common/mixins.styl"

 
 .totalPrice{
   
   height 40px;
   width 100%;

 }
  .pay{
    
    text-align center
    background-color #009eef;
    color white
    line-height 30px;
    margin 10px 100px;
   
    padding 2px 10px
  
  }
 .totalPrice span{
   float right;
   color red;
   line-height 30px;
   margin 10px 45px;
       font-weight: 700;
 }
        &.order  //订单
          width 100%
          .header
            background-color #009eef
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
          .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 50%
            color #fff
            text-align center
          .header_title_text
            font-size 15px
            color #fff
            display block
          .order_no_login
            padding-top 140px
            width 60%
            margin 0 auto
            text-align center
            >img
              display block
              width 100%
              height 30%
            >h3
              padding 10px 0
              font-size 17px
              color #6a6a6a
            >button
              display inline-block
              background #009eef
              font-size 14px
              color #fff
              border 0
              outline none
              border-radius 5px
              padding 10px 20px
              
    
      .list-content
        border 1px solid rgba(7,17,27,0.1)
        z-index 66
        background #fff
        width  80%
        top 20%
        left 10%
        box-shadow 15px 15px 20px  #bab9b9;
        position absolute
        .food
          position relative
          padding 12px 30px
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 65px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .count
            position absolute
            right 35px
            bottom 15px
            display:inline-block;
            font-size:12px;
            color #93999f
            text-align center 
          
      .food-cover
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        z-index 55
        background-color rgba(0, 0, 0, 0.1)

              
</style>
