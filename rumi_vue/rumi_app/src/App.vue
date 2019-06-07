<template>
  <div id="app">


<tabbar
:tabbarData="tabbarData"
v-if="$route.meta.showTabbar"
></tabbar>
<transition name='fade'>
<router-view></router-view>
  </transition>
  </div>

</template>

<script>
import tabbar from "./components/tabbar"
import {mapActions} from "vuex"



export default {
  name: 'app',
  components: {
   tabbar,
  },
 mounted(){
   this.getUserInfo();
   this.getLocation();
  },
  methods:{
    //刷新页面获取最近一次用户登录的信息
      ...mapActions(["getUserInfo"]),   
 getLocation(){//高德地图api
     const  self=this;
      AMap.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout:10000,})

      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', onComplete)
      AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
    // data是具体的定位信息，准确定位信息
        }
      function onError (data) {
        // 定位出错,非准确定位
        self.getLngLaction()
      }
})
    },
    getLngLaction(){
      const self=this;
      AMap.plugin('AMap.CitySearch', function () {
      var citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
      // 查询成功，result即为当前所在城市信息
      
      AMap.plugin('AMap.Geocoder', function() {
      var geocoder = new AMap.Geocoder({
    // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: result.adcode
            })
 
      var lnglat = result.rectangle.split(";")[0].split(",");

      geocoder.getAddress(lnglat, function(status, data) {
        if (status === 'complete' && data.info === 'OK') {
        // result为对应的地理位置详细信息
        console.log( result)
        console.log( data)
        self.$store.dispatch("setLocation", {
          addressComponent: {
            city: result.city,
            province: result.province
          },
          formattedAddress: data.regeocode.formattedAddress
        });

        self.$store.dispatch(
          "setAddress",
          data.regeocode.formattedAddress
        );
                  
          }
        })
      })
    }
          })
        })
    }
  },
  data(){
    return{
      //iconFont的使用，添加图标到项目，在线生成css链接，应用class类
      //点击tabbar的router-link跳转到各个页面
      tabbarData:[
        {
          title:"外卖",path:"/home",icon: "iconfont icon-waimai1",
        },{ title:"搜索",path:"/search",icon: "iconfont icon-sousuo",},
        { title:"订单",path:"/order",icon: "iconfont icon-dd",},
        { title:"个人中心",path:"/profile",icon: "iconfont icon-renwu",}
      ]
    }
  }
}
</script>

<style scoped>
/*#app{
  overflow-x: hidden;
   overflow-y: hidden;
}
.fade-enter{
opacity: 0;
transform: translateX(100%)
}
.fade-leave-to{
opacity: 0;
transform: translateX(-100%)

}
.fade-enter-active{
  transition: all 0.3s ease;
  
}
.fade-leave-active{
transition: all 0.1s ease;
  position: absolute;
}*/

 
</style>
