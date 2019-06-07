<template>
   
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">糯米外卖</h2>
          <div class="login_header_title">
            <!---通过showType点击添加"on"样式实现手机登录与账号登录页面的切换
            showType:true为账号登录--->
            <a href="javascript:;" :class="{'on':!showType}" @click="showType=false" >短信登录</a>
            <a href="javascript:;" :class="{'on':showType}" @click="showType=true" >账号登录</a>
          </div>
        </div>
        
        <div class="login_content">
          <form>
          <!---手机登录--->
          <!---验证号码的正确性，如号码正确，添加'right_phone'样式，
          修改disabled，即可点击获取验证码，--->
            <div :class="{'on':!showType}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" :class="{'right_phone':rightPhone}" class="get_verification"
                @click.prevent="getCode">{{btnTitle}}</button>
              </section>
              <section class="login_verification">
                <input type="number" maxlength="6" placeholder="验证码" v-model="verifyCode" >
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
              <!---账号登录--->
            <div :class="{'on':showType}">
              <section >
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                   <input type="password" maxlength="8" placeholder="密码"  v-model="pwd" v-else>
                    <!---密码明文与密文的切换，通过showPwd控制input的type类型实现--->
                  <div class="switch_button" @click="showPwd=!showPwd" :class="[showPwd?'on':'off']">
                    <div class="switch_circle " :class="{'right':showPwd}"></div>
                    <span class="switch_text">{{showPwd?"abc":""}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" @click="get_verification" ref="captcha" src="http://localhost:4000/captcha" alt="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit"  @click.prevent="login">登录</button>
            
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
      
      </div>
      <!---自定义组件alertTip--->
      <alertTip :alertText="alertText" v-if="alertText" @closeTip="closeTip"></alertTip>
    </section>
    
</template>
<script>
import alertTip from "../components/AlertTip"
 import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../api'
import { Toast } from 'mint-ui';
import { async } from 'q';
export default {
  components:{
    alertTip
  },
    data(){
      return{
        showType:true,
        phone:"",
        btnTitle :"获取验证码",
        time:0,
        showPwd:false,
        pwd:"",
        verifyCode:"",
       alertText:'',
       captcha:"",
       name:""

        
      }
    },
    computed:{
     
      rightPhone(){
        return /^1[345678]\d{9}$/.test(this.phone)
      },
      /*isClick(){
      if(!/^1[345678]\d{9}$/.test(this.phone)||!this.verifyCode){
        return true;
      }else{
        return false
      }
      },*/
    },
    mounted(){
      //获取图形验证码
        this.get_verification();
    },
    methods:{
    get_verification()
      {
          this.$refs.captcha.src="http://localhost:4000/captcha?time="+Date.now()
      },

      //获取短信验证码
       getCode(){
        this.getCode();
      },
      //倒计时开始
      downTime(){
           if(this.time==0){
             this.time=60
           let timer=setInterval(()=>{
          this.btnTitle=this.time+"秒后重试";
            this.time--;
          if(this.time<=0)
          {
            clearInterval(timer);
             this.btnTitle = "获取验证码";       
          }},1000);
           }
  
      },
      getCode(){    
        this.downTime();
         this.alertText="验证码已发送"
        //发送请求,获取验证码
        this.$axios.post("/api/posts/sms_send",{
          //聚合数据接口
          tpl_id:"146606",key:"d36faa6593c81e203b8f4e945988b3e8",
          phone:this.phone,
        }).then(res=>{
          console.log(res)
        });
      
    },
    async login(){
      //showType决定哪种登录方式
      if(this.showType){
      // true密码登陆，const {name, pwd, captcha} = this
        if(!this.name) {
            // 用户名必须指定
            this.alertText='用户名必须指定'
            return
          } else if(!this.pwd) {
            // 密码必须指定
            this.alertText='密码必须指定'
            return
          } else if(!this.captcha) {
            // 验证码必须指定
            this.alertText='验证码必须指定'
            return
          }
      // 所有form验证逻辑已完成,发送ajax请求密码登陆
      // const  res = await reqPwdLogin({name, pwd, captcha})          
        const res= await reqPwdLogin({name:this.name, pwd:this.pwd, captcha:this.captcha})
        if(res.code==1)//登录失败
        {
          this.alertText=res.msg;
          this.get_verification();//失败重新刷新验证码
        }else{//登录成功
          const user=res.data;
          this.$store.dispatch("recordUser",user)//将user信息存到vuex
          localStorage.setItem("app_login",true)
          this.$router.push("/profile");
         Toast({
            message: '登录成功',
          });
             }
      }else{
        //账号登录
        if(!this.rightPhone)
        {    
          this.alertText="请输入正确手机号码"       
        }else if(!/^\d{6}$/.test(this.verifyCode)){
          this.alertText="验证码不正确"
        }
        else{
          //逻辑验证完成，登录验证
          Toast({
        message: '正在登录中...',duration: 3000});
        this.$axios.post("/api/posts/sms_back",{
        phone:this.phone,
        code:this.verifyCode,
      }).then(res=>{
        localStorage.setItem("app_login",true);
        const phone={phone:this.phone}
        this.$store.dispatch("recordUser",phone)
        this.$router.push("/profile");
         Toast({
            message: '登录成功',
           duration: 1000});
      }).catch(err=>{
       this.alertText="验证码错误"
      })
        }
     
      }
    },

     closeTip(){
       this.alertText=""
     }
    }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  

 @import "../common/mixins.styl"
    .loginContainer
      width 100%
      height 100%
      background #fff
      a
        text-decoration none 
      .loginInner
        padding-top 90px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right
                      transform translateX(27px)
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
