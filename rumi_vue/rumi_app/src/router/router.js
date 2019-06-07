import Vue from "vue"
import Router from "vue-router"
Vue.use(Router)

const router= new Router({
    mode:'history',
    base: process.env.BASE_URL,
   routes:[
    {
        path:"/login",
        name:"login",
        component:()=>import ("../pages/login"),
      
    },
    {
        path:"/home",
        name:"home",
        component:()=>import ("../pages/home"),
        meta:{
            showTabbar:true
        }
    },
    {
        path:"/",
        redirect:"/home",
      
    },
    {
        path:"/order",
        name:"order",
        component:()=>import ("../pages/order"),
        meta:{
            showTabbar:true
        }
    },
    {
        path:"/city",
        name:"city",
        component:()=>import ("../pages/city"),
        meta:{
            showTabbar:true
        }
    },
    {
        path:"/location",
        name:"location",
        component:()=>import ("../pages/location"),
        meta:{
            showTabbar:true
        }
    },
    {
        path:"/search",
        name:"search",
        component:()=>import ("../pages/search"),
        meta:{
            showTabbar:true
        }
    },
    {
        path:"/profile",
        name:"profile",
        component:()=>import ("../pages/profile"),
        meta:{
            showTabbar:true
        }
    },
    {
        path:"/shop",
        
        component:()=>import ("../pages/shop"),
       children:[
        {
            path:"/shop/shopinfo",
            name:"shopinfo",
            component:()=>import ("../pages/shopinfo"),
           
        },
        {
            path:"/shop/shopcomment",
            name:"shopcomment",
            component:()=>import ("../pages/shopcomment"),
           
        },
        {
            path:"/shop/shoplist",
            name:"shoplist",
            component:()=>import ("../pages/shoplist"),
           
        },
     {
            path:"",
            redirect:"/shop/shoplist"
        }
       ]
    },
    
],

},
)
router.beforeEach((to, from, next) => {
    const isLogin=localStorage.app_login?true:false;
    if(to.path=="/login")
    {
      next()
    }else{
      isLogin?next():next("/login")
    }
  })
export default router