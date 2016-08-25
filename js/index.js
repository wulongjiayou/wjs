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
 1.�������� - ajax

 2.�жϵ�ǰ���豸���� >= 768  | <768
 3.����������������չʾ��html--���ַ���ƴ��   ģ�����棩
 4.չʾ--��Ⱦ

 5.����Ļ�ߴ緢���ı��ʱ����Ҫ������Ⱦ
 * */

//�ӷ������������
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
    //�жϵ�ǰ�豸�ĳߴ��С
   var render= function () {
       var flag=false;
       if($(window).width()<768){
           flag=true;
       }
        setagax(function (data) {

            //����ģ��
            var gettemllate= _.template($("#banner_img").html());
            //console.log(gettemllate);
            //ģ�帳ֵ
            var html=gettemllate({arr:data,"flag":flag});

            $(".carousel-inner").html(html)

            //���ģ��
            var gettemllate= _.template($("#point_temp").html());
            //console.log(gettemllate);
            //ģ�帳ֵ
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
    //��ȾͼƬ
    render();
    //�����ڷ����ı��ʱ��,������Ⱦ
    $(window).on("resize", function () {
        render();

    })



}


//�������������ֿ�ʼ
var setnav= function () {
    var length=0;
    var lis=$(".product_nav").find("li");
    var ul=$(".product_nav");
    $.each(lis, function (i,item) {
        length += $(item).innerWidth();
    });
    ul.width(length);
    itcast.iScroll({
    /*������Ҫ���л�����Ԫ�صĸ�Ԫ��*/
    swipeDom:document.querySelector(".wjs_product_box"),
    swipeType:"x",
    swipeDistance:80
});

}