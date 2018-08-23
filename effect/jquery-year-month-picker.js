//var year_month_picker=(function(){
//Created by zailushang on 2018-07-03
//pc端 月份选择插件
// 插件调用方法 ：   $("input").yearMonthPicker();

(function(){
	"user strict";
	function year_month_picker(element,left,top){
		this.element=element;
		this.left=left;
		this.top=top;
		this.init();
	}
	year_month_picker.prototype={
		init:function(){
			var me=this;
			var ins=$("#year-month-picker").attr("data-func");  //查找是否已创建元素  避免重复创建
			if(!ins){
				me._createbox(me.left,me.top);  //若未创建  生成一个
			}
			$(me)[0].element.click(function(){
				var nowleft=$("#year-month-picker").offset().left;
				var nowtop=$("#year-month-picker").offset().top;
				
				//为保证同元素切换正常 不同元素先收起其他再显示 同时事件绑定无误 故加判断  绑定事件用one  点其他元素时 unbind
				if(((nowleft-me.left)<1) && ((nowleft-me.left)>-1) && ((nowtop-me.top)<1) && ((nowtop-me.top)>-1)){
					me._slider();
					$(".year-month-picker-month").one("click","li",function(){
						$(me)[0].element.val($(".year-month-picker-year span").text().slice(0,4)+"-"+$(this).attr("data-month"));
						me._sliderUp();
					})
				}else{
					$(".year-month-picker-month").unbind();
					me._sliderUp();
					setTimeout(function(){
						$("#year-month-picker").css({
							"left": me.left,
							"top": me.top
						})
						me._sliderDown();
						$(".year-month-picker-month").one("click","li",function(){
							$(me)[0].element.val($(".year-month-picker-year span").text().slice(0,4)+"-"+$(this).attr("data-month"));
							me._sliderUp();
						})
					},350)
				}
			})
		},
		_slider:function(){
			$("#year-month-picker").slideToggle();
		},
		_sliderUp:function(){
			$("#year-month-picker").slideUp();
		},
		_sliderDown:function(){
			$("#year-month-picker").slideDown();
		},
		_createbox:function(left,top){
			var me=this;
			var a=document.createElement("div");
			a.id="year-month-picker";
			document.body.appendChild(a);
			$("#year-month-picker").css({
				"position": "absolute",
				"left": left,
				"top": top,
				"z-index": 1111,
				"width": "250px",
				"font-size": "16px",
				"background": "#FFFFFF",
				"border": "1px solid #c5c5c5"
			})
			$(document).click(function(){
				me._sliderUp();
			})
			$("#year-month-picker").click(function(){
				event.stopPropagation();
			})
			var nowYear=new Date().getFullYear();
			var b=document.createElement("div");
			b.className="year-month-picker-year";
			a.appendChild(b);
			$(".year-month-picker-year").css({
				"display": "flex",
				"justify-content": "space-between",
				"height": "40px",
			    "line-height": "40px",
			    "padding": "0 10px",
			    "border-bottom": "1px solid #C5C5C5"
			})
			var c='<b class="prev">&lt;</b><span>'+nowYear+'年</span><b class="next">&gt;</b>';
			$(".year-month-picker-year").html(c);
			$(".year-month-picker-year b").css({
				"cursor":"pointer",
				"width":"20px",
				"text-align":"center"
			})
			var d=document.createElement("ul");
			d.className="year-month-picker-month";
			a.appendChild(d);
			var e="",f=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
			for(var i=0;i<12;i++){
				e+='<li data-month="'+((i+1)<10?"0"+(i+1):(i+1))+'">'+f[i]+'</li>';
			}
			$(".year-month-picker-month").html(e);
			$(".year-month-picker-month").css({
				"display": "flex",
				"justify-content": "space-between",
				"flex-wrap": "wrap",
				"padding": "0 10px 10px",
				"font-size": "14px"
			})
			$(".year-month-picker-month li").css({
				"width": "50px",
				"height": "40px",
				"line-height": "40px",
				"text-align": "center",
				"border": "1px solid #C5C5C5",
				"margin-top": "10px",
				"background": "#f6f6f6",
				"cursor": "pointer"
			})
			$(".year-month-picker-month li").mouseover(function(){
				$(this).css({
					"background":"#999999",
					"color":"#ffffff"
				})
			})
			$(".year-month-picker-month li").mouseout(function(){
				$(this).css({
					"background":"#f6f6f6",
					"color":"#000"
				})
			})
			$(".year-month-picker-year .prev").click(function(){
				var num=Number($(this).next().text().slice(0,4))-1;
				$(this).next().text(num+"年");
			})
			$(".year-month-picker-year .next").click(function(){
				var num=Number($(this).prev().text().slice(0,4))+1;
				$(this).prev().text(num+"年");
			})
			$("#year-month-picker").hide();
		}
	}
//	return year_month_picker;
//})
$.fn.yearMonthPicker = function() {
//      return this.each(function() {
            var me = $(this),
//              instance = me.data("calendarSwitch"),
                left = me.offset().left,
				top = me.offset().top+me.outerHeight()+1;
                var a = new year_month_picker(me,left,top);
                $("#year-month-picker").attr("data-func",a);
//      });
    };

})(jQuery)
