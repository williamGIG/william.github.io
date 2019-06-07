<template>
<div class="area " >
    <div class="scroll_wrap">
        <div class="hot_wrap citylist" >
            <div class="title">
                热门城市
             </div>
                <ul class="hot_city">
                    <li @click="$emit('selectCity',item)" v-for="(item,index) in city_info.hotCities" :key="index">
                        {{item.name}}
                    </li>
                </ul>
           
        </div>
        <div ref="area_scroll" class="area_scroll">
        <div class="city_wrap" ref="city_wrap" >
            <div class="city_content  citylist" v-for="(item,index) in keys" :key="index" >
                <div>{{item}}</div>
                <ul>
                    <li @click="$emit('selectCity',city)" v-for="(city,index) in city_info[item]" :key="index">
                        {{city.name}}
                    </li>
                </ul>
            </div>
        </div>
        </div>
       
        </div>
    <div class="area_keys">
      <ul>
        <li >#</li>
        <li @click="selectKey(index)" :class="{'current':currentIndex==index}"
        v-for="(item,index) in keys" :key="index">{{item}}</li>
      </ul>
    </div>
  
</div>    
</template>
<script>
import Bscroll from "better-scroll"

export default {
    name:"alphabet",
    data(){
        return{
          scrollY:0,
          tops:[]
        }
    },
    props:{
        city_info:{},
        keys:{},
      
            
    },
    computed:{
       currentIndex(){
            const {tops,scrollY}=this;
            let i=tops.findIndex((top,i)=>{              
                return scrollY>=top&&scrollY<tops[i+1];
            })
            return i
        }
    },
    watch:{
      //用watch不能用mounted
        city_info(){
          this.$nextTick(() => {      
             this.initScroll(); 
            this.initTops()  
            
          });
        }
          
      
          
    },
    methods:{
        initScroll(){
          if(!this.listScroll){
                this.listScroll= new Bscroll(this.$refs.area_scroll,{
                click:true,
                 probeType:2
                
            });
            this.listScroll.on('scroll',({x,y})=>{
                  this.scrollY=Math.abs(y)
            }) 
          }
           
        },
        initTops(){         
          let tops=[];
          let top=0;
          tops.push(top);
          const list=this.$refs.area_scroll.querySelectorAll(".citylist");
         
           Array.prototype.slice.call(list).forEach((li)=>{
                    top+=li.clientHeight;
                     tops.push(top)
            })
               this.tops=tops;
        },
         selectKey(index) {
       this.scrollY=this.tops[index];
       const citylist=this.$refs.area_scroll.getElementsByClassName("citylist");
      
       let el=citylist[index]
       this.listScroll.scrollToElement(el,150)
     
   
    }
    }
}
</script>
<style scoped>
ul li{
    list-style: none;
}
.area {
 
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;

 
}
.scroll_wrap {
  background: #fff;
 
 
}
.area_scroll{
 height: 380px;
  overflow: hidden;
}
.title {
  color: #aaa;
  padding: 10px 0;
}
.hot_city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 5px;
  box-sizing: border-box;
}
.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}
.area_keys  ul li{
    margin-top:4px; 
}
.area_keys {
  position: fixed;
  right: 0;
top: 20%;

  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
}
 .current{
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    color: #009eef;
    font-weight: 700;
    font-size: 14px;
 }
         

</style>