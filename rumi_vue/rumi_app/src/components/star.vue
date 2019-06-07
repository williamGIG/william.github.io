<template>
       <div class="star star-24">
             <span class="star-item" 
         v-for="(item,index) in starClass" :key="index" :class="item">
         </span>
                         
        </div>
</template>
<script>

export default {
    props:{
        score:Number
    },
    computed:{
        starClass(){
            let {score}=this;
            let classList=[];
           const scoreInt=Math.floor(score)
           for(let i=0;i<scoreInt;i++){
                classList.push("on")
           }
           if(score*10-scoreInt*10>=5)
           {
               classList.push("half")
           }
           while(classList.length<5){//直到数组添加五颗星星为止
               classList.push("off")
           }
           return classList
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "../common/mixins.styl"
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>
