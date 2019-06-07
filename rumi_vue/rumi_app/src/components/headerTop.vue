<template>
    <div class="home">
       <div class="header">
        <div class="header-button is-left" v-show="isBack">
      <button @click="$router.push('/home')"> 
      <i class="fa fa-chevron-left"></i>返回</button>
             </div>
           <div class="address_map" >
              <i class="fa fa-map-marker" v-if="only"></i>
              <span @click="toLocation">{{title||'GPS正在定位中...'}}</span>
           </div>
            <slot name="login"></slot>

       </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
 export default {
   props:{
      title:String,
      only:Boolean,
      isBack:Boolean
   },
   methods:{
     toLocation(){
       if(this.title)
       {
         this.$router.push("/location")
       }else{
         return
       }
     }
   }
     
}
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

 
}
.header {
  background-color: #009eef;
  padding: 10px; position:fixed;
   width: 100%;

  z-index: 999;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
  position: relative;
  text-align: center
}
.address_map .fa-map-marker {
       position: absolute;
    left: 50px;
    top: 0px;
    font-size: 20px;
    z-index: 1;
}

.address_map span {
  display: inline-block;
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
   font-size: 14px;
  text-align: center
}
.header .shop_search {
  margin-top: 10px;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.header-button button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  font-size: 12px;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: none;
  padding: 0 5px;
  position:absolute;
  left: 10px;
  top: 20%;
  color: white;
  z-index: 3;
}
.is-left {
  text-align: left;
}
</style>
