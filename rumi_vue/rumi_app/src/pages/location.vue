<template>
    <div class="address">
       <headerTop :title="title" :isBack="isBack"></headerTop>
    <div style="background:white;padding:10px 5px;margin-top:44px;">
    <div class="search">
       <span class="city" v-if="city"
       @click="$router.push('/city')"
       >{{city}}
           <i class="fa fa-angle-down"></i>
          </span> 
           
        <input type="text" v-model="search_city" placeholder="小区/写字楼/办公楼">
         <i class="fa fa-search"></i>
    </div>
    
    </div>
    <currentLocation/>
     <div class="area">
         <div>
      <ul class="area_list" v-for="(item,index) in placeList" :key="index">
        <li @click="setAddress(item)">
          <h4>{{item.name}}</h4>
          <p>{{item.district}}{{item.address}}</p>
        </li>
      </ul>
    </div>
    </div>
    </div>
</template>
<script>
import headerTop from "../components/headerTop"
import currentLocation from "../components/currentLocation"
import BScroll from "better-scroll"
import {mapState} from "vuex"
export default {
    name:"Address",
    components:{
        currentLocation,headerTop
    },
    data(){
        return{
            title:"请选择地址",
            isBack:true,
            city:this.$store.state.location.addressComponent.city,
            search_city:"",
            placeList:"",
            
        }
    },

    computed:{
   
    },
    watch:{
       search_city(){
         this.searchPlace();
       }
    },
    methods:{
      setAddress(place){
          this.$store.dispatch("setAddress",place.district+place.address);
          this.$router.push("/home");
      },
      searchPlace(){
        const self=this;
   AMap.plugin('AMap.Autocomplete', function(){
  // 实例化Autocomplete
  var autoOptions = {
    //city 限定城市，默认全国
    city: self.city
  }
  var autoComplete= new AMap.Autocomplete(autoOptions);
  autoComplete.search(self.search_city, function(status, result) {
    // 搜索成功时，result即是对应的匹配数据
    self.placeList=result.tips;
  //result.tips地图提供的返回搜索结果
    new BScroll(".area",{
        click:true
    })
  })
})
      }
    },
     beforeRouteEnter(to,from,next){
   
        next(vm=>{
          vm.city=to.params.city||vm.city  
         
        })
         
    },
}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
}
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;

  background: #eee;

}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 20px;
  box-sizing: border-box;
  line-height: 40px;
  padding: 0 10px;
  margin:5px; 
}
.search .city {
  padding-left:10px;
  border-right: 1px solid #908EA7;
  font-size: 15px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 20px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top:5px;
  background: #eee;
  height: 500px;
  overflow: hidden
}
.area li {
  border-bottom: 1px dashed #ecdada;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
}
.area li p{
  line-height: 12px;
   font-size: 12px;
}
</style>


