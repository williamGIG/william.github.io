// pages/index/index.js
import {HTTP} from "../../utils/http.js"; 
let http=new HTTP();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:null,
    content:null,
    title:null,
    num:0,
    data1:null
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  
  onLoad: function (options) {
 
    var number = this.data.num;

   var data = {
     url: "/movie/in_theaters?city=广州&start=0&count=20",
      success: (res) => {


        if (!res.data.subjects[number].summary) {
          var content2 = "抱歉，暂无简介"
        }
        else {
          var content1 = res.data.subjects[number].summary;
          var content2 = content1.replace(/\\n/g, "");
        }

        console.log(res);
        this.setData({
          src: res.data.subjects[number].images.large,
          content: content2,
          title: res.data.subjects[number].title,
          num: number ,
        

        })
      }
    }
    http.request(data)

   /* wx.request({
        url: 'http://t.yushu.im/v2/book/search?q=小王子&count=1',
        header:{
          "content-type": "application/json"
        },
        success:(res)=>{
          
         this.setData({
           src:res.data.books[0].image
         })
         
        },
      
       
      });*/

   


   
  }, 


  onNext(event) {
    var number = this.data.num;
    number++;
 
    var data = {
      url: "/movie/in_theaters?city=广州&start=0&count=20",
      success: (res) => {


        if (!res.data.subjects[number].summary) {
          var content2 = "抱歉，暂无简介"
        }
        else {
          var content1 = res.data.subjects[number].summary;
          var content2 = content1.replace(/\\n/g, "");
        }

        console.log(res);
        this.setData({
          src: res.data.subjects[number].images.large,
          content: content2,
          title: res.data.subjects[number].title,
          num: number,


        })
      }
    }; 
    http.request(data)
   
  },



  onPrevious(event){
    var number = this.data.num;
    number--;
    
    var data = {
      url: "/movie/in_theaters?city=广州&start=0&count=20",
      success: (res) => {
        if (!res.data.subjects[number].summary) {
          var content2 = "抱歉，暂无简介"
        }
        else {
          var content1 = res.data.subjects[number].summary;
          var content2 = content1.replace(/\\n/g, "");
        }

        console.log(res);
        this.setData({
          src: res.data.subjects[number].images.large,
          content: content2,
          title: res.data.subjects[number].title,
          num: number,

        })
      } 
  };
      http.request(data)
  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})