// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    musicTitle:String,
 
   
    num:{
      type:String,
      observer: function (newVal, oldVal, changedPath)
      {
        console.log(newVal)
        if (newVal==0){
          this.setData({
            first:'false'
          })
        } else if (newVal == 13){
          this.setData({
            end: 'false'
          })
        }else{
          this.setData({
            first: '',
             end: ''
          })
        }
      }
      
      
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    srcLeft: "/components/images/triangle@left.png",
    srcLeftDis: "/components/images/triangle.dis@left.png",
    srcRight: "/components/images/triangle@right.png",
    srcRightDis: "/components/images/triangle.dis@right.png",
  
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(event){
      this.triggerEvent('left', {}, { })
    },
    onRight:function(event){
      this.triggerEvent('right', { }, {})
    }

  }
})
