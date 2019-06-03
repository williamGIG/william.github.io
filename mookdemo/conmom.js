import { config } from "config.js";

class REQUEST {




  request(sbak) {
   
    wx.request({
      url: config.music_url,
      data: config.data,
      method: config.method,
      success: (res) => {
     
      
      }
    })
  
      
    }
  }



export { REQUEST }