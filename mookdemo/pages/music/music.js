// pages/music/music.js

import { config } from "../../config.js";
import { REQUEST } from "../../conmom.js";
var http=new REQUEST();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function () {
    var number = this.data.num;
    number++;
    wx.request({
      url: config.music_url,
      data: config.data,
      method: config.method,
      success: (res) => {
       
        var data = res.data.Body;
        var time = data.songs[number].time;
        var m = Math.floor(time / 60);
        var s = time % 60;
        this.setData({
          imgPic: data.songs[number].pic,
          musicUrl: data.songs[number].url,
          musicTitle: data.songs[number].title,
          author: data.songs[number].author,
          time: m + "分" + s + "秒",
          num: number
        })
      }
    })
    
  },



  onNext(event) {
    var number = this.data.num;
    number++;
    wx.request({
      url: config.music_url,
      data: config.data,
      method: config.method,
      
      success: (res) => {
        console.log(res);
        var data = res.data.Body;
        var time = data.songs[number].time;
        var m = Math.floor(time / 60);
        var s = time % 60;
        this.setData({
          imgPic: data.songs[number].pic,
          musicUrl: data.songs[number].url,
          musicTitle: data.songs[number].title,
          author: data.songs[number].author,
          time: m + "分" + s + "秒",
          num: number
        })
      }
    })
  },

  onPrevious(event) {
    var number = this.data.num;
    number--;
    wx.request({
      url: config.music_url,
      data: config.data,
      method: config.method,
      success: (res) => {
      ;
        var data = res.data.Body;
        var time = data.songs[number].time;
        var m=Math.floor(time/60);
        var s=time%60;
       
        this.setData({
          imgPic: data.songs[number].pic,
          musicUrl: data.songs[number].url,
          musicTitle: data.songs[number].title,
          author: data.songs[number].author,
          time:m+"分"+s+"秒",
          num: number
        })
      }
    })
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