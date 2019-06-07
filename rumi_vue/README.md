糯米外卖vue_app
===
1) 此项目为外卖 Web App (SPA)
2) 包括商家, 商品, 购物车, 用户等多个子模块
3) 使用 Vue 全家桶+ES6+Webpack 等前端最新最热的技术
4) 采用模块化、组件化、工程化的模式开发

项目功能界面
###
![](https://github.com/williamGIG/williamGIG.github.io/blob/master/rumi_vue/imgs/home_one.png)
![](https://github.com/williamGIG/williamGIG.github.io/blob/master/rumi_vue/imgs/home_two.png)
![](https://github.com/williamGIG/williamGIG.github.io/blob/master/rumi_vue/imgs/home_three.png)<br/>
---
登录/注册
###

2种方式<br/>
a.手机号/短信验证码登陆<br/>
b.用户名/密码/图片验证码登陆<br/>
登陆的基本流程<br/>
       a.表单前台验证, 如果不通过, 提示<br/>
       b.发送ajax请求, 得到返回的结果<br/>
       c.根据结果的标识(code)来判断登陆请求是否成功<br/>
界面相关效果<br/>
    a. 切换登陆方式<br/>
    b. 手机号合法检查<br/>
    c. 倒计时效果<br/>
    d. 切换显示或隐藏密码<br/>
    g. 前台验证提示<br/>



---

搭建商家整体界面及获取用户地理位置
###

商家整体界面<br/>
  a. 拆分界面路由<br/>
  b. 路由的定义/配置|使用<br/>
 获取用户地理位置<br/>
  a.高德地图API获取用户定位<br/>
  b.地理位置进行模糊搜索<br/>
  c.全国城市地名A-Z检索<br/>
  
  ![](https://github.com/williamGIG/williamGIG.github.io/blob/master/rumi_vue/imgs/gif_two.gif)<br/>
  ![](https://github.com/williamGIG/williamGIG.github.io/blob/master/rumi_vue/imgs/png_four.png)<br/>
  ![](https://github.com/williamGIG/williamGIG.github.io/blob/master/rumi_vue/imgs/png_five.png)<br/>
  
  

---
