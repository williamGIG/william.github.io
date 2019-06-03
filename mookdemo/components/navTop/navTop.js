// components/navTop/navTop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
     num:{
       type:String,
       observer: function (newVal, oldVal, changedPath) {
         newVal = parseInt(newVal) + 1;
         let val = newVal < 10 ? '0' + newVal  : newVal ;
         this.setData({
           _num: val
         })
       }
     }
   
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year:"",
    month:"",
    date:""
  

  },
attached:function(){
  var date=new Date();
  var  year=date.getFullYear();
  var   month=date.getMonth();
  var  date=date.getDate();
  this.setData({
    year:year,
    months: this.data.months[month],
    date:date
  })


},
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
