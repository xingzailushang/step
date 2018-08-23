////////////////////////////////  0  窗口尺寸  ///////////////////////////////////////

// 原生JS 窗口尺寸：

window.innerWidth  //返回窗口的文档显示区的高度。
window.innerHeight  //返回窗口的文档显示区的宽度。
document.body.clientWidth  //网页可见区域宽
document.body.clientHeight  //网页可见区域高

// JQuery 窗口尺寸：

$(window).height(); //浏览器时下窗口可视区域高度
$(document).height(); //浏览器时下窗口文档的高度
$(document.body).height();//浏览器时下窗口文档body的高度
$(document.body).outerHeight(true);//浏览器时下窗口文档body的总高度 包括border padding margin
$(window).width(); //浏览器时下窗口可视区域宽度
$(document).width();//浏览器时下窗口文档对于象宽度
$(document.body).width();//浏览器时下窗口文档body的高度
$(document.body).outerWidth(true);//浏览器时下窗口文档body的总宽度 包括border padding margin

$(document).scrollTop(); //获取滚动条到顶部的垂直高度
$(document).scrollLeft(); //获取滚动条到左边的垂直宽度

$("#div").width(),//width()返回元素的宽高，不包括padding/border/margin
$("#div").innerWidth(),//innerWidth()返回元素的宽高 + padding
$("#div").outerWidth(),//outerWidth()返回元素的宽高 + padding + border
$("#div").outerWidth(true);//outerWidth(true)返回元素宽高 + padding + border + margin

// 参考链接：https://blog.csdn.net/zjlovety/article/details/6641644


////////////////////////////////  1  根据屏幕尺寸改变根元素大小  ///////////////////////////////////////

(function ($, window) {
    window.addEventListener('DOMContentLoaded', function () {
        var shuping = 'onorientationchange' in window ? 'orientationchange' : 'resize';
        var timer = null;

        //设置字体
        function setFontSize() {
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            document.documentElement.style.fontSize = parseInt(100 * w / 750) + 'px';
            $('body').css('opacity',1);
        }
        setFontSize();
        window.addEventListener(shuping, function () {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }, false);
    }, false);
})($, window);


/*获取设备宽度，设置根字体大小*/
document.documentElement.style.fontSize=document.documentElement.clientWidth*24/750+"px";
window.onresize=function(){
    document.documentElement.style.fontSize=document.documentElement.clientWidth*24/750+"px";
}

////////////////////////////////  2  将三维对象数组转成二维数组  ///////////////////////////////////////

function objToArr(obj){
  var arr2=[];
  //将返回的三维对象数组转为二维对象数组
  for(var i=0;i<obj.length;i++){
    arr2[i]={};
    for(var key in obj[i]){
      if(typeof(eval("obj[i]."+key))=="object"){
        for(var key1 in eval("obj[i]."+key)){
          eval("arr2[i]."+key1+"=obj[i]."+key+"."+key1);
        }
      }else{
        eval("arr2[i]."+key+"=obj[i]."+key);
      }
    }
  }
  return arr2;
}