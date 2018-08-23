// 1、移动端bug
var time=new Date("yyyy-mm-dd");
//该日期格式在pc浏览器测试可以，在移动端不识别，建议全用
var time=new Date("yyyy/mm/dd");

//2、jquery缓存
var abc=$("abc").data("id");
//由于jquery缓存，页面进入首次可取到 abc 的 data-id 值，data-id 属性值被改变后，不再去页面取，而是去缓存取，造成改变后的值取不到
//解决方案：
var abc=$("abc").attr("data-id");
//参考链接：  https://blog.csdn.net/KevinHades/article/details/79164661

//3、touch-action
// body添加此css属性后，安卓移动端超出页面部分滚动无效，ios正常
//解决：
  // touch-action:auto;