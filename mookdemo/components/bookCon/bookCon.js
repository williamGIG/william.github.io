// components/bookCon/bookCon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
      ontop(){
        const title = this.properties.book.title;
     
        wx.navigateTo({
          url: '/pages/book-detail/book-detail?title=' + title,
        })
      }
  }
})
