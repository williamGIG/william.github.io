// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      like:{
        type: Boolean,
        value:false
      },
        
      
  },

  /**
   * 组件的初始数据
   */
  data: {
    oneSrc:"/components/images/like.png",
    twoSrc: "/components/images/like@dis.png"  },

  /**
   * 组件的方法列表
   */
  methods: {
  onLike:function(event){

  let like=this.properties.like;
  let count=this.properties.count;
    count = like ? count - 1 : count + 1;
  if(!like){
    wx.showToast({
      title: '已收藏',
      icon:'none',
      duration:500
    })
  }
  else{
    wx.showToast({
      title: '已取消',
      icon: 'none',
      duration: 500
    })
  }
  this.setData({
    like:!like,
    count:count
  })


  }
  }
})
