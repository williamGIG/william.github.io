<template>
          <div class="shop_container">
            <ul class="shop_list" v-if="shops.length">
            
              <li class="shop_li border-1px" v-for="(item,index) in shops" :key="index" @click="$router.push('/shop')">
                <a>
                  <div class="shop_left">
                    <img class="shop_img" :src="item.image_path" >
                  </div>
                  <div class="shop_right">
                    <section class="shop_detail_header">
                      <h4 class="shop_title ellipsis">{{item.name}}</h4>
                      <ul class="shop_detail_ul">
                        <li class="supports" v-for="(list,index) in item.supports" 
                        :key="index">{{list.icon_name}}</li>
                      
                      </ul>
                    </section>
                    <section class="shop_rating_order">
                      <section class="shop_rating_order_left">
                    <star :score="item.rating"></star>

                        <div class="rating_section">
                         {{item.rating}}
                        </div>
                        <div class="order_section">
                          月售{{item.recent_order_num}}单
                        </div>
                      </section>
                      <section class="shop_rating_order_right">
                        <span class="delivery_style delivery_right">糯米专送</span>
                      </section>
                    </section>
                    <section class="shop_distance" >
                      <p class="" style="margin:0;float:left;color:#009eef">{{item.category}}</p>
                      <p class="shop_delivery_msg"  style="float:right">

                        <span>¥{{item.float_minimum_order_amount}}起送</span>
                        <span class="segmentation">/</span>
                        <span>{{item.piecewise_agent_fee.tips}}</span>
                      </p>
                    </section>
                  </div>
                </a>
              </li>
             </ul>
          <ul v-else>
            <!---svg蒙版--->
            <li v-for="i in 6" :key="i">
              <img src="./images/shop_back.svg" alt="">
            </li>
          </ul>
          </div>
</template>
<script>
import {mapState} from "vuex"
import star from "./star"
import BScroll from "better-scroll"
export default {
  components:{
    star
  },
    data(){
        return{
       
        }
    },
    computed:{
      ...mapState(["shops"])
    },
   
    methods:{
   
    
    },
    watch:{
      

      shops(){
            this.$nextTick(()=>{
        if(!this.shopScroll){
             this.shopScroll= new BScroll(".shop_container",{
          click:true
        })
        }else{
            this.shopScroll.refresh();
        }
      })
        
      }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
ul li{
    list-style none;
}
    @import "../common/mixins.styl"
            .shop_container
              margin-bottom 50px
              padding 0 10px
              max-height 370px
              overflow hidden
              .shop_list
                padding 0
                margin-top 0
                .shop_li
                  bottom-border-1px(#f1f1f1)
                  width 100%
                  >a
                    clearFix()
                    display block
                    box-sizing border-box
                    padding 15px 8px
                    width 100%
                    .shop_left
                      float left
                      box-sizing border-box
                      width 23%
                      height 75px
                      padding-right 10px
                      .shop_img
                        display block
                        width 100%
                        height 100%
                    .shop_right
                      float right
                      width 77%
                      
                      .shop_detail_header
                        clearFix()
                        width 100%
                        
                        .shop_title
                          text-overflow ellipsis
                          white-space nowrap
                          overflow hidden
                          float left
                          width 200px
                          color #333
                          font-size 15px
                          line-height 16px
                          font-weight 700
                          margin 0
                          &::before
                            content '品牌'
                            display inline-block
                            font-size 11px
                            line-height 11px
                            color #333
                            background-color #ffd930
                            padding 2px 2px
                            border-radius 2px
                            margin-right 5px
                        .shop_detail_ul
                          float right
                          padding 0
                          margin-top 3px
                          .supports
                            float left
                            font-size 10px
                            color #009eef
                            border 1px solid #009eef
                            padding 0 2px
                            border-radius 2px
                            margin 0 2px
                      .shop_rating_order
                        clearFix()
                        width 100%
                        padding 8px 0 0 0
                        
                       
                       
                        .shop_rating_order_left
                          float left
                          color #ff9a0d
                          
                          .rating_section
                            float left
                            font-size 10px
                            color #ff6000
                            margin-left 4px
                          .order_section
                            float left
                            font-size 10px
                            color #666
                            transform scale(.8)
                        .shop_rating_order_right
                          float right
                          font-size 0
                          .delivery_style
                            transform-origin 35px 0
                            transform scale(.7)
                            display inline-block
                            font-size 12px
                            padding 1px
                            border-radius 2px
                          .delivery_left
                            color #fff
                            margin-right -10px
                            background-color #02a774
                            border 1px solid #02a774
                          .delivery_right
                            color #009eef
                            border 1px solid #009eef
                      .shop_distance
                        clearFix()
                        width 100%
                        font-size 12px
                        padding 5px 0
                        .shop_delivery_msg
                          margin 0
                          float left
                          transform-origin 0
                          transform scale(.9)
                          color #666
                        .segmentation
                          color #ccc
</style>
