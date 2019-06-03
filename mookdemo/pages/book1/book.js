// pages/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      icon: 'success',
      duration: 500
    })

    var qurey = '计算机';

    var search = options.title;
    if (search) {
      qurey = search
    }
    console.log(search)
    wx.request({
      url: 'http://t.yushu.im/v2/book/search',
      data: { 'q': qurey },
      success: (res) => {
        console.log(res);
        var data = res.data;

        this.setData({
          bookImg: data.books[0].image,
          books: res.data.books

        });


      }
    });


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
