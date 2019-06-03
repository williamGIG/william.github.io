import {config} from "../config.js";
const code={
  1:"抱歉",
  404:"NOT FOUND",
  402:"异常"
}
class HTTP{
  constructor(){
      this.baseRequestUrl=config.base_url;
  }



  request(params)
  {
   
    var requestUrl=this.baseRequestUrl+params.url;
if(!params.method)
{
  params.method="get"
}
  wx.request({
    url: requestUrl,
    method:params.method,
    header: {
      "content-type": "application/json"
    },


    success:(res)=>{
    
  var start_Code=res.statusCode.toString();
  var first_letter=start_Code.charAt(0);
      if (first_letter=="2")
  {
        params.success(res);
  }
  else{
        this.showErr(error_code)
  }   
    },


    showErr(error_code){
      wx.showToast({
        title: code[error_code],
        icon: "none",
        duration:2000
    })},


fail:(res)=>{
  wx.showToast({
    title: '网络环境差',
    icon:"none",
    duration: 2000
  })
}

  })
  }




}

export{HTTP}