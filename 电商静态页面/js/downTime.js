
window.onload = function(){
  
    /*倒计时*/
    downTime();
}

    var downTime = function(){
    /*
    * 1.模拟倒计时的时间  是11个小时
    * 2.利用定时器  1  秒一次   重新展示时间
    * */

    var time = 60*60*11;

    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');

    var timer = setInterval(function(){

        time -- ;

        /*格式化时间*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        /*设置时间*/
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }

    },1000);}