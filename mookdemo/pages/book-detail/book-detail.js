Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const title = options.title;
   wx.request({
     url: 'http://t.yushu.im/v2/book/search',
     data: { 'q': title },
     success:(res)=>{
       var book = res.data.books[0];
       var content1 = book.summary;
       var content2 = content1.replace(/\\n/g, "");
       console.log(res)
    
      this.setData({
        bookImg:book.image,
        title:book.title,
        author:book.author,
        binding: book.binding,
        price: book.price,
        pubdate: book.pubdate,
        pages: book.pages,
        publisher: book.publisher,
        summary: content2,
        isbn: book.isbn 
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