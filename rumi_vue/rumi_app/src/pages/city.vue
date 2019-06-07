<template>
    <div class="city">
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="city_val" type="text" placeholder="输入城市名">
      </div>
      <button @click="$router.push({name:'home'})">取消</button>
    </div>
    <div  style="height:100%" v-if="searchlist.length==0">
      <div class="loca">
        <currentLocation />
      </div>
       <div>
    <alphabet @selectCity="selectCity" :city_info="city_info" :keys="keys" ref="city_scroll">

    </alphabet>
  </div>
     
    </div>
   <div class="search_list"  v-else>
     
     <ul>
       <li>搜索到含"{{city_val}}"的结果：</li>
       <li v-for="(item,index) in searchlist" :key="index" @click="selectCity(item)">
         {{item.name}}
       </li>
     </ul>
     
   </div>
 


    </div>
</template>
<script>
import currentLocation from "../components/currentLocation"
import Alphabet from "../components/alphabet"
import BScroll from "better-scroll"

export default {
    name:"city",
    components:{
        currentLocation,Alphabet
    },
   data(){
       return{
            city_val:"",
            city_info:{},
            keys:{},
            allCity:[],
            searchlist:[]
       }
   },
   created(){
     this.getAllCity()
   },
    computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    }
  },
   watch:{
     city_val(){
       this.searchCity()
     },
     searchlist(){
       if(this.city_val){
             this.$nextTick(()=>{
          new BScroll(".search_list",{
          click:true
        })
       })
       }
    
        
     }
   },
 
   methods:{
     getAllCity(){
       this.$axios("/api/posts/cities").then(res=>{
         //将res.data中的字母A-Z取出
         this.city_info=res.data;
       console.log(res.data)
         this.keys=Object.keys(res.data);
         this.keys.pop();
         this.keys.sort();
       
          this.keys.forEach((item,i)=>{
            //将res.data中A-Z中对应的所有城市信息取出放入this.allCity,传入子组件
            this.city_info[item].forEach(key=>{
              this.allCity.push(key)
            })
          })
         

       }).catch(err=>{console.log(err)})
     },
     selectCity(city){
       this.$router.push({name:"location",params:{city:city.name}})
     },
     searchCity(){
       if(!this.city_val){
         return this.searchlist=[];

       }else{
         this.searchlist=this.allCity.filter(item=>{
           //通过在input中过滤搜索返回新数组
           return item.name.indexOf(this.city_val)!=-1
         });
         console.log(this.searchlist)
         return this.searchlist
         
         
       }
     }
   }
}
</script>
<style scoped>
ul li{
  list-style: none
}
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 55px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 55px;
  width: 100%;
  background: #009eef;
  box-sizing: border-box;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  outline: none;
  color: #fff;
  border:none;
  background-color:transparent;
}

.loca {
  background: #fff;
  padding: 5px 16px;

  box-sizing: border-box;
  border-top:1px dotted #ccc; 
  border-bottom:1px dotted #ccc; 
}

.search_list {
  background: #fff;
  padding: 5px 16px;
  max-height:600px ;
  overflow: hidden;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
