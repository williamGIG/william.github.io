<template>
<div class="currentLocation">
      
    <div class="title">当前定位</div>
       <div class="des" >
      <i class="fa fa-location-arrow"></i>
      <span>{{address}}</span>
    </div>
    
  </div>
  
</template>
<script>
export default {
    name:"currentLocation",
    data(){
        return{
            address: this.$store.state.address,
        }
    },
    computed:{

    }
}
</script>
<style scoped>
.currentLocation{
    background-color: #fff;
    padding: 5px 15px;

    
   
}
.title {
  margin:0 0 10px 10px;
  font-size: 12px;
}
.des i {
  color: #009eef;
}
.des span {
  color: #333;
  font-weight: bold;
  font-size: 14px;
  margin-left: 5px;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
