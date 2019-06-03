// components/musicCon/musicCon.js
const music=wx.getBackgroundAudioManager();
Component({
  /**
     * 组件的属性列表
     */
  properties: {
   imgPic:String,
   musicUrl:String,
   musicTitle:String,
   author:String,
   time:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: '/components/images/player@pause.png',
    playSrc: '/components/images/player@play.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
   onPlay(){
     if (!this.data.playing) {
       this.setData({
         playing: true
       })
       music.title = this.properties.musicTitle;
       music.src = this.properties.musicUrl;
       
     } else {
       music.pause();
       this.setData({
       
         playing: false
       })
      
     }
   }
  }




})