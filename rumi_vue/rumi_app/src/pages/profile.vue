<template>
    <div style="width:100%">
      <section class="profile">
       <headerTop :title="title"></headerTop>
        <section class="profile-number">
          <router-link :to="userInfo._id||userInfo.phone? '':'/login'" href="javascript:" class="profile-link">
            <div class="profile_image">
              <i class="iconfont icon-person"></i>
            </div>
            <div class="user-info">
              <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name||"登录/注册"}}</p>
              <p>
                <span class="user-icon">
                  <i class="iconfont icon-shouji1 icon-mobile"></i>
                </span>
                <span class="icon-mobile-number">{{userInfo.phone||"暂无绑定手机号"}}</span>
              </p>
            </div>
            <span class="arrow">
              <i class="iconfont icon-jiantou1"></i>
            </span>
          </router-link>
        </section>
        <section class="profile_info_data border-1px">
          <ul class="info_data_list">
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0.00</span>元</span>
              <span class="info_data_bottom">我的余额</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>个</span>
              <span class="info_data_bottom">我的优惠</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>分</span>
              <span class="info_data_bottom">我的积分</span>
            </a>
          </ul>
        </section>
        <section class="profile_my_order border-1px">
    
          <a href='javascript:' class="my_order" v-for="(item,index) in messageData" 
          :key="index">
            <span>
              <i class="iconfont" :class=" item.icon"></i>
            </span>
            <div class="my_order_div">
              <span>{{item.title}}</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou1"></i>
              </span>
            </div>
          </a>
      
          
        </section>
          <section class="profile_my_order border-1px" v-if="userInfo.phone||userInfo.name">
          <mt-button type="danger" class="login_out" @click="login_out" >
                退出登录
       </mt-button>
          </section>
      </section>
    </div>
  
</template>
<script>
import headerTop from "../components/headerTop"
import {mapState} from "vuex"
import { userInfo } from 'os'
import {MessageBox} from "mint-ui"

  
export default {
      components:{
    headerTop,
  },
    data(){
      return{
        title:"个人中心",
            messageData:[
        {
          title:"我的订单",icon: "iconfont  icon-icon-",
        },{ title:"积分商城",icon: "iconfont icon-shangcheng",},
        { title:"硅谷外卖会员卡",icon: "iconfont icon-huiyuanqia",},
        { title:"服务中心",icon: "iconfont icon-fuwuzhongxin",}
      ]
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      login_out(){
            MessageBox.confirm("确认退出登录？").then(()=>{
                  localStorage.setItem("app_login","")
                  this.$router.push("/login")
                    this.$store.dispatch("logout")
            },()=>{

            })
      }
      
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .login_out{width:100%;}
    .profile a{ text-decoration: none;}
 @import "../common/mixins.styl"
    
        &.profile //我的
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
          .profile-number
            margin-top 45.5px
            
            margin-left -10
            .profile-link
              clearFix()
              position relative
              display block
              background #009eef
              padding 20px 10px
              border-top 1px solid white 
              .profile_image
                float left
                width 60px
                height 60px
                border-radius 50%
                overflow hidden
                vertical-align top
                color white
                .icon-person
                  background #e4e4e4
                  font-size 62px
              .user-info
                float left
                margin-top 8px
                margin-left 15px
                p
                  font-weight: 700
                  font-size 18px
                  color #fff
                  margin 0
                  padding 0
                  &.user-info-top
                    padding-bottom 8px
                  .user-icon
                    display inline-block
                    margin-left 0px
                    margin-right 15px
                    width 5px
                    height 20px
                    .icon-mobile
                      font-size 16px
                      vertical-align text-bottom
                  .icon-mobile-number
                    font-size 14px
                    
                    color #fff
              .arrow
                width 12px
                height 12px
                position absolute
                right 15px
                top 40%
                .icon-jiantou1
                  color #fff
                  font-size 5px
          .profile_info_data
            bottom-border-1px(#e4e4e4)
            width 100%
            background #fff
            overflow hidden
            .info_data_list
              clearFix()
              margin 0
              padding 0
              
              .info_data_link
                float left
                width 33%
                text-align center
                border-right 1px solid #f1f1f1
                .info_data_top
                  display block
                  width 100%
                  font-size 14px
                  color #333
                  padding 15px 5px 10px
                  span
                    display inline-block
                    font-size 30px
                    color #f90
                    font-weight 700
                    line-height 30px
                .info_data_bottom
                  display inline-block
                  font-size 14px
                  color #666
                  font-weight 400
                  padding-bottom 10px
              .info_data_link:nth-of-type(2)
                .info_data_top
                  span
                    color #ff5f3e
              .info_data_link:nth-of-type(3)
                border 0
                .info_data_top
                  span
                    color #6ac20b
          .profile_my_order
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .my_order
              display flex
              align-items center
              padding-left 15px
              >span
                display flex
                align-items center
                width 20px
                height 20px
                >.iconfont
                 
                  font-size 20px
                .icon-icon-
                  color #02a774
                .icon-shangcheng
                  color #ff5f3e
                .icon-huiyuanqia
                  color #f90
                .icon-fuwuzhongxin
                  color #02a774
              .my_order_div
                width 100%
                border-bottom 1px solid #f1f1f1
                padding 18px 10px 18px 10px
                font-size 16px
                color #333
                display flex
                justify-content space-between
                span
                  display block
                .my_order_icon
                  width 10px
                  height 10px
                  .icon-jiantou1
                    color #bbb
                    font-size 10px

                
</style>
