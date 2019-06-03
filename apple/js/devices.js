
  var mySwiper = new Swiper ('.swiper-container', {
     autoplay:true,
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮

    // 如果需要滚动条
    scrollbar: {
      
    },
  })        

  
$(function(){
  



  $('#dowebok').fullpage({
     anchors: ['firstPage', 'secondPage', 'thirdPage'],
    menu: '#myMenu',
    css3:true,
    
    afterLoad: function(anchorLink, index){
      if(index == 2){
        $('.cd-iphone-6 .cd-body').delay(100).animate({
          left: '0'
        }, 1000, 'easeOutExpo');

      }
      if(index == 3){
        $('.cd-ipad .cd-body').delay(100).animate({
          right: '0'
        }, 1000, 'easeOutExpo');

      }
      if(index == 4){
        $('.cd-mac').fadeIn(2000);
      }
    },
    onLeave: function(index, direction){
      if(index == '2'){
        $('.cd-iphone-6 .cd-body').animate({
          left: '-400%'
        }, 10, 'easeOutExpo');

      }
      if(index == '3'){
        $('.cd-ipad .cd-body').animate({
          right: '-300%'
        }, 10, 'easeOutExpo');

      }
      if(index == '4'){
        $('.cd-mac').fadeOut(200);
      }
    }


  });
  var scroll=function(id,time=200){
      $("html,body").animate({ scrollTop: $(id).offset().top }, time);
    };
    scroll("#part1")
    setInterval(function(){
      $(".logo p").addClass("animated fadeInUp").show();
      $(".logoyezi ").addClass("animated fadeIn").show()
      $(".arr_btm ").addClass("tranY")
    },1000)
    
    
  
    
    
  });