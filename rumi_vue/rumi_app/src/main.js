import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import store from './store'
import axios from 'axios'
import lazyload from "vue-lazyload"
import {Button} from 'mint-ui'
import "../src/mock/mockServe.js"
import loading from './pages/images/timg.gif'
import "./filter/filter"

Vue.component(Button.name, Button)
Vue.prototype.$axios=axios
Vue.use(Button)
Vue.config.productionTip = false
Vue.use(lazyload,{
  preLoad: 1.3,
  
  loading,
  attempt: 1
})
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
