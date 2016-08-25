/**
 * Created by 12 on 2016/7/27.
 */

$(function () {

    baner();
    $('.carousel').carousel({
        interval: 5000
    })
    setnav();
    $('[data-toggle="tooltip"]').tooltip()

})


/*
 1.请求数据 - ajax

 2.判断当前的设备类型 >= 768  | <768
 3.根据数据生成用于展示的html--（字符串拼接   模板引擎）
 4.展示--渲染

 5.当屏幕尺寸发生改变的时候，需要重新渲染
 * */

//从服务器获得数据
function  baner() {
   var setagax= function (callback) {
       $.ajax({
           url:'js/package.json',
           type:'get',
           success: function (data) {
               console.log(data);
               callback && callback(data);
           }
       });
   }
    //判断当前设备的尺寸大小
   var render= function () {
       var flag=false;
       if($(window).width()<768){
           flag=true;
       }
        setagax(function (data) {

            //创建模板
            var gettemllate= _.template($("#banner_img").html());
            //console.log(gettemllate);
            //模板赋值
            var html=gettemllate({arr:data,"flag":flag});

            $(".carousel-inner").html(html)

            //点的模板
            var gettemllate= _.template($("#point_temp").html());
            //console.log(gettemllate);
            //模板赋值
            var html2=gettemllate({arr:data});
            //console.log(html2);
            $(".carousel-indicators").html(html2)
        })

       var startX=0;
       var endX=0;
       var distancex=0
       $(".carousel-inner").on("touchstart", function (e) {
           startX= e.originalEvent.touches[0].pageX;

       })
       $(".carousel-inner").on("touchmove", function (e) {
           endX= e.originalEvent.touches[0].pageX;
           distancex=endX-startX;
           //console.log(distancex);
       })
       $(".carousel-inner").on("touchend", function (e) {
           if(Math.abs(distancex)>30){
               if(distancex>0){
                   $(".carousel").carousel('prev')
               }else if(distancex<0){
                   $(".carousel").carousel('next')
               }
           }

       })



    }
    //渲染图片
    render();
    //窗口在发生改变的时候,重新渲染
    $(window).on("resize", function () {
        render();

    })



}


//导航栏滑动部分开始
var setnav= function () {
    var length=0;
    var lis=$(".product_nav").find("li");
    var ul=$(".product_nav");
    $.each(lis, function (i,item) {
        length += $(item).innerWidth();
    });
    ul.width(length);
    itcast.iScroll({
    /*传递需要进行滑动的元素的父元素*/
    swipeDom:document.querySelector(".wjs_product_box"),
    swipeType:"x",
    swipeDistance:80
});

}