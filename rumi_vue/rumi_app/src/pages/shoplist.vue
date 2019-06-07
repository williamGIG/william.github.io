<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul class="content" >
          <!--current-->
          <li class="menu-item"  v-for="(item,index) in goods" :key="index" 
          :class="{'current':currentIndex==index}" 
          @click="clickMenu(index)"
              >
            <span class="text bottom-border-1px">
              <img class="icon" :src="item.icon" v-if="item.icon">
                       {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl" class="content">
          <li class="food-list-hook" v-for="(content,index) in goods" :key="index" >
            <h1 class="title">{{content.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,i) in content.foods" 
              :key="i" >
                <div class="icon" @click="showFood(food)">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div @click="showFood(food)">
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    <ShopCart ></ShopCart>
    </div>
    <Food  :food="food" ref="food"></Food>
  </div>
</template>
<script>
import BScroll from "better-scroll"
import {mapState} from "vuex"

import CartControl from "../components/CartControl"
import ShopCart from "../components/ShopCart"
import Food from "../components/Food"


export default {
    data(){
        return{
            flag:false,
            tops:[],
            scrollY:0,
     
            food:{}
            
            
        }
    },
    components:{
      CartControl,ShopCart,Food
    },
    computed:{
        ...mapState(['goods']),
      
        currentIndex(){
            const {tops,scrollY}=this;
            let i=tops.findIndex((top,i)=>{              
                return scrollY>=top&&scrollY<tops[i+1];
            })
            return i
        }
    },
  
    mounted(){
        this.$store.dispatch("getShopGoods",()=>{
            //列表数据更新显示后
            this.$nextTick(()=>{
                this.initScroll();
                this.initTops();
            })
        });
      
      
    },
    methods:{
      showFood(obj){
          //点击某食物将vuex中的food设为this.food再传给Food子组件
          this.food=obj
          //父组件调用子组件的方法，让Food自组件显示
          this.$refs.food.isShow();
      } ,      
        initScroll(){
                  new BScroll(".menu-wrapper",{
                    click:true
                  })
                  this.foodsScroll=new BScroll(".foods-wrapper",{
                       probeType:3,
                        click:true
                   });
                   this.foodsScroll.on("scroll",({x,y})=>{
                       this.scrollY=Math.abs(y)
                   
                       
                   });
                  /*  this.foodsScroll.on("scrollEnd",({x=0,y})=>{
                       this.scrollY=Math.abs(y)
                         
                                        
                   })*/
        },
        initTops(){
            let tops=[];
            let top=0;
            tops.push(top)
            let list=this.$refs.foodsUl.querySelectorAll(".food-list-hook");
            //Array.prototype.slice伪数组变数组
        Array.prototype.slice.call(list).forEach((li)=>{
                    top+=li.clientHeight;
                     tops.push(top)
            })
            this.tops=tops;
        },
        clickMenu(index){
          /*this.scrollY=this.tops[index];
           this.foodsScroll.scrollTo(0,-this.scrollY,400)*/
            let list=this.$refs.foodsUl.querySelectorAll(".food-list-hook");
            let el=list[index];
            this.foodsScroll.scrollToElement(el,200)

        },
    }
    }

</script>




<style lang="stylus" rel="stylesheet/stylus">
ul{padding:0}
ul li{list-style:none}

  @import "../common/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 200px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      height 450px
      background: #f3f5f7
      
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
            z-index 1
</style>
