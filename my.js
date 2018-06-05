/**
 * Created by hexiaobo
 * on 2015/10/29.
 */
Function.prototype.curry = function () {
    var c = Array.prototype.slice,
        a = c.apply(arguments),
        b = this;
    return function () {
        return b.apply(null, a.concat(c.apply(arguments)))
    }
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

Date.prototype.getWeek = function () {
    var day = this.getDay(), week = "";
    if (day == 0) week = "周日";
    if (day == 1) week = "周一";
    if (day == 2) week = "周二";
    if (day == 3) week = "周三";
    if (day == 4) week = "周四";
    if (day == 5) week = "周五";
    if (day == 6) week = "周六";
    return week;
};

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (b, a) {
            return window.setTimeout(b, 1000 / 60)
        }
})();

function $$(id) {
    var dom = typeof(id) == "string" ? document.getElementById(id) : id,
        cla = dom.className || "";
    dom.show = function (d) {
        d = d || "block";
        dom.style.display = d;
        return dom
    };
    dom.hide = function () {
        dom.style.display = "none";
        return dom
    };
    dom.isShow = function () {
        return dom.style.display == "block" ? true : false
    };
    dom.addClass = function (d) {
        !(dom.hasClass(d)) && (dom.className = cla + " " + d);
        return dom
    };
    dom.removeClass = function (d) {
        //var e = RegExp("\\dom" + d + "\\dom", "g");
        //cla = cla.replace(e, "");
        //cla = cla.replace(/\s{2,}/g, " ");
        //dom.className = cla.replace(/(^\s*)|(\s*$)/g, "");
        //return dom;
        if (dom.hasClass(d)) {
            var reg = new RegExp('(\\s|^)' + d + '(\\s|$)');
            dom.className = cla.replace(reg, '');
        }
        return dom;
    };
    dom.hasClass = function (name) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        return cla.match(reg) ? true : false;
    };
    dom.toggleClass = function (e) {
        dom.hasClass(e) ? dom.removeClass(e) : dom.addClass(e);
        return dom
    };
    return dom
}

function stopProp(event) {
    event.preventDefault(); //取消事件的默认动作。
    event.stopPropagation();//阻止冒泡时间
}

function $getContentHeight() {
    var a = document.body;
    var b = document.compatMode == "BackCompat" ? a : document.documentElement;
    return (window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1) ? a.scrollHeight : b.scrollHeight
}
function $getContentWidth() {
    var a = document.body;
    var b = document.compatMode == "BackCompat" ? a : document.documentElement;
    return (window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1) ? a.scrollWidth : b.scrollWidth
}
function $getPageScrollHeight() {
    var a = document.body;
    var c = document.compatMode == "BackCompat" ? a : document.documentElement;
    var b = navigator.userAgent.toLowerCase();
    return (window.MessageEvent && b.indexOf("firefox") == -1 && b.indexOf("opera") == -1 && b.indexOf("msie") == -1) ? a.scrollTop : c.scrollTop
}
function $getPageScrollWidth() {
    var a = document.body;
    var b = document.compatMode == "BackCompat" ? a : document.documentElement;
    return (window.MessageEvent && navigator.userAgent.toLowerCase().indexOf("firefox") == -1) ? a.scrollLeft : b.scrollLeft
}
function $getWindowHeight() {
    var a = document.body;
    return (document.compatMode == "BackCompat" ? a : document.documentElement).clientHeight
}
function $getWindowWidth() {
    var a = document.body;
    return (document.compatMode == "BackCompat" ? a : document.documentElement).clientWidth
}

var My = (function () {
    return function (f) {
        var box = typeof(f) == "string" ? document.querySelectorAll(f) : f,
            a = undefined;

        function _open(i, j, box, h) {
            if (My.Load && box != My.Load) {
                if (My.Load.className != "") {
                    window.requestAnimFrame(_open.curry(i, j, box, h));
                    return false
                }
            }
            if ($$(box).hasClass("hidden")) {
                window.requestAnimFrame(_open.curry(i, j, box, h))
            } else {
                h = h || "block";
                a = (box.style.display == h) ? 1 : 0;
                if (!a) {
                    j && (box.style.cssText += " -webkit-animation-duration:" + j + "ms;");
                    i = i || "fadeAnim";
                    $$(box).show(h).classList.add(i);
                    box.classList.add("shown");
                    var g = box;
                    setTimeout(function () {
                        g.classList.remove(i);
                        g.classList.remove("shown")
                    }, j || 350)
                }
            }
        }

        function _close(h, i, j) {
            if ($$(j).hasClass("shown")) {
                if (My.Load && j == My.Load) {
                    My.Load.className = "";
                    My.Load.style.display = "none"
                }
                window.requestAnimFrame(_close.curry(h, i, j))
            } else {
                a = (j.style.display != "none") ? 1 : 0;
                if (a) {
                    i && (j.style.cssText += "-webkit-animation-duration:" + i + "ms;");
                    h = h || "fadeAnim";
                    j.classList.add(h);
                    j.classList.add("hidden");
                    var g = j;
                    setTimeout(function () {
                        g.style.display = "none";
                        g.classList.remove(h);
                        g.classList.remove("hidden")
                    }, i || 350)
                }
            }
        }

        function _touch(g, h) {
            g = g || "touch";
            h.addEventListener("touchstart", function () {
                this.classList.add(g)
            });
            h.addEventListener("touchend", function () {
                var i = this;
                setTimeout(function () {
                    i.classList.remove(g)
                }, 100)
            })
        }

        return {
            open: function (k, l, h) {
                var len = box.length;
                if (len) {
                    for (var i = 0; i < len; i++) {
                        _open(k, l, box[i], h)
                    }
                } else {
                    _open(k, l, box, h)
                }
            },
            close: function (j, k) {
                var len = box.length;
                if (len) {
                    for (var g = 0; g < len; g++) {
                        _close(j, k, box[g])
                    }
                } else {
                    _close(j, k, box)
                }
            },
            touch: function (g) {
                var len = box.length;
                if (len) {
                    for (var h = 0; h < len; h++) {
                        _touch(g, box[h])
                    }
                } else {
                    _touch(g, box)
                }
            }
        }
    }
})();

/*
 * 非关注、非登录提醒
 * */
(function (my) {
    var a;
    my.showFollow = function (d) {
        if (my.FollowUrl) {
            my.showLoad("正在跳转...");
            window.location.href = my.FollowUrl
        } else {
            if (!a) {
                a = c();
                a.btn.addEventListener("click", function () {
                    my.hideFollow(d)
                });
                a.div.addEventListener("touchmove", stopProp)
            }
            //my.FollowImg && (a.div.style.top = $getPageScrollHeight() + "px");
            my(a.div).open(d)
        }
    };
    my.hideFollow = function (d) {
        a && my(a.div).close(d)
    };

    function c() {
        var h = document.createElement("div"),
            f = document.createElement("div"),
            e = "",
            g = "";
        if (!my.FollowImg) {
            h.style.cssText = "position:fixed;z-index:1100;width:100%;height:100%;top:0;bottom:0;right:0;left:0;background-color:#22292c;font-size:16px;";
            e = "<div style = 'width:300px;margin:0 auto;padding-top:40px; color:#fff;'><h3>方法1：</h3><p>点击右上角<span class = 'wx_menuIcon'></span>查看公众号";
            e += "<span class = 'wx_weIcon'></span>关注我们</p><div class = 'clear blank'></div><h3>方法2：</h3><div class = 'clear blank'></div><span>长按复制微信号：</span><br/>";
            e += "<h3 style = 'display:inline-block;margin:8px 0;padding:2px 8px 0;background-color:#fff;color:#333;border-radius:5px;font-size:16px;line-height:30px;'>";
            e += my.WxName || "懒保险" + "</h3><br/><span>到微信 “公众号” 中搜索关注</span></div>"
        } else {
            h.style.cssText = "position:fixed;z-index:1100;width:100%;height:100%;top:0;bottom:0;right:0;left:0;background-color:rgba(0,0,0,.6);";
            e = "<div style = 'width:180px; height:200px; margin:30% auto; padding:25px; background-color:#fff; text-align:center;'><img src='" + my.FollowImg + "' style='width:180px;height:180px;'/><p style='margin:0; font-size:12px;'>长按二维码，关注我们</p>"
        }
        h.innerHTML = e;
        f.style.cssText = "position:fixed;bottom:16%;left:50%;margin-left:-25px;padding:16px;background-color: rgba(0,0,0,.5);text-align:center;border-radius:100px;";
        g = "<span class = 'wx_closeIcon'><span/>";
        f.innerHTML = g;
        h.appendChild(f);
        document.body.appendChild(h);
        h.addEventListener("touchmove", stopProp);
        return {
            div: $$(h),
            btn: $$(f)
        }
    }
})(My);

/*
 * 初始化加载提示
 * */
(function (my) {
    var box;
    my.showLoad = function (msg, e) {
        box = box || createBox();
        box.text.innerHTML = msg || "正在加载...";
        my(box.div).open(e, 1);
        my.Load = box.div
    };
    my.hideLoad = function (d) {
        box && my(box.div).close(d)
    };

    function createBox() {
        var box = document.createElement("div"),
            span = document.createElement("span"),
            info = "";
        box.style.cssText = "display:none;position:fixed; top:0px;left:0;width:100%; height:100%; z-index:1200; overflow:hidden;background: rgba(0,0,0,.1);text-align:center;";
        info = "<div style = 'max-width:200px; color: #fff; font-size:16px;margin: 48% auto 0;line-height: 22px;border-radius: 5px;background: rgba(0, 0, 0, 0.6);display: inline-block;padding: 12px 15px 10px;'>";
        info += "<img style = 'width:22px;height:22px;margin:0 6px 3px 0;' src = 'data:image/gif;base64,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'/>";
        info += "</div>";
        box.innerHTML = info;
        box.firstChild.appendChild(span);
        document.body.appendChild(box);
        return {
            div: $$(box),
            text: $$(span)
        }
    }
})(My);

/*
 * 信息提示
 * */
(function (c) {
    var b;
    c.showTip = function (e, d, f) {
        b = b || a();
        b.div.className = "my_tip";
        b.text.innerHTML = e || "提示信息";
        c(b.div).open(f);
        setTimeout(c.closeTip, d || 2500)
    }, c.successTip = function (e, d, f) {
        b = b || a();
        b.div.className = "my_tip tip_success";
        b.text.innerHTML = e || "成功信息";
        c(b.div).open(f);
        setTimeout(c.closeTip, d || 2500)
    }, c.errorTip = function (e, d, f) {
        b = b || a();
        b.div.className = "my_tip tip_error";
        b.text.innerHTML = e || "错误信息";
        c(b.div).open(f);
        setTimeout(c.closeTip, d || 2500)
    }, c.closeTip = function (d) {
        b && c(b.div).close(d)
    };

    function a() {
        var f = document.createElement("div"),
            d = document.createElement("span"),
            e = "";
        f.style.cssText = "display:none; position: fixed; top: 30%; margin: 0 auto; z-index: 1300; width: 100%; text-align: center;";
        e = "<div style = 'color: #fff; font-size: 16px; line-height: 22px; padding: 10px 20px;margin: 0 auto;display: inline-block; border-radius: 4px; max-width: 200px; background: rgba(0, 0, 0, 0.6);'></div>";
        f.innerHTML = e;
        f.firstChild.appendChild(d);
        document.body.appendChild(f);
        return {
            div: $$(f),
            text: $$(d)
        }
    }
})(My);

/*
 * 分享提示
 * */
(function (my) {
    var box;
    //发送给朋友
    my.showShare = function (d) {
        if (!box) {
            box = createBox();
            box.div.addEventListener("click", function () {
                my.hideShare(d)
            })
        }
        my(box.div).open(d)
    };
    //分享到朋友圈
    my.showShare2 = function (d) {
        if (!box) {
            box = createBox2();
            box.div.addEventListener("click", function () {
                my.hideShare(d)
            })
        }
        my(box.div).open(d)
    };   
    my.hideShare = function (d) {
        box && my(box.div).close(d)
    };
	
    function createBox() {
        var $div = document.createElement("div"),
            $divInfo = "";
        $div.style.cssText = "position:fixed;left:0;top:0;z-index:1000;width:100%;height:100%;background-color:rgba(0,0,0,.8);color:#fff;text-align:center;font-size:16px;";
        $divInfo = "<div><span class = 'wx_arrowIcon fr'></span><div style = 'padding-top: 48px;width: 300px;margin: 0 auto;line-height:32px;'>请点击右上角";
        $divInfo += "<p>通过<span class = 'wx_sendIcon'></span>【发送给朋友】功能</p><p>把消息告诉小伙伴哟～</p>";
        $divInfo += "<div style = 'position:absolute;bottom:18%;left:50%;margin-left:-25px; padding:16px;background-color: rgba(0,0,0,.5);text-align:center;border-radius:100px;'>";
        $divInfo += "<span class = 'wx_closeIcon'><span/></div></div>";
        $div.innerHTML = $divInfo;
        document.body.appendChild($div);
        $div.addEventListener("touchmove", stopProp);
        return {
            div: $$($div)
        }
    }
    function createBox2() {
        var $div = document.createElement("div"),
            $divInfo = "";
        $div.style.cssText = "position:fixed;left:0;top:0;z-index:1000;width:100%;height:100%;background-color:rgba(0,0,0,.8);color:#fff;text-align:center;font-size:16px;";
        $divInfo = "<div><span class = 'wx_arrowIcon fr'></span><div style = 'padding-top: 48px;width: 300px;margin: 0 auto;line-height:32px;'>请点击右上角";
        $divInfo += "<p>通过<span class = 'wx_shareIcon'></span>【分享到朋友圈】功能</p><p>把消息告诉小伙伴哟～</p>";
        $divInfo += "<div style = 'position:absolute;bottom:18%;left:50%;margin-left:-25px; padding:16px;background-color: rgba(0,0,0,.5);text-align:center;border-radius:100px;'>";
        $divInfo += "<span class = 'wx_closeIcon'><span/></div></div>";
        $div.innerHTML = $divInfo;
        document.body.appendChild($div);
        $div.addEventListener("touchmove", stopProp);
        return {
            div: $$($div)
        }
    }
})(My);

(function (my) {
    var box;
    my.showShare_cr = function (d) {
        if (!box) {
            box = createBox();
            box.div.addEventListener("click", function () {
                my.hideShare_cr(d)
            })
        }
        my(box.div).open(d)
    };
    my.hideShare_cr = function (d) {
        box && my(box.div).close(d)
    };

    function createBox() {
        var $div = document.createElement("div"),
            $divInfo = "";
        $share_img = _LBXSTATIC.rootRes + "h5/dist/images/share/ico-share.gif";
        $div.style.cssText = "position:fixed;left:0;top:0;z-index:1000;width:100%;height:100%;background-color:rgba(0,0,0,.8);color:#fff;text-align:center;font-size:16px;";
        $divInfo += '<div><img src="' + $share_img + '" />';
        $divInfo += "<div style = 'position:absolute;bottom:18%;left:50%;margin-left:-25px; padding:16px;background-color: rgba(0,0,0,.5);text-align:center;border-radius:100px;'>";
        $divInfo += '<span class = "wx_closeIcon"></span></div>';
        $divInfo += '</div>';
        $div.innerHTML = $divInfo;
        document.body.appendChild($div);
        $div.addEventListener("touchmove", stopProp);
        return {
            div: $$($div)
        }
    }
})(My);

/*
 * 弹窗
 * */
(function (c) {
    var d, e;
    c.showAlert = function (f) {
        var j = {
            width: 260,
            title: "",
            text: "弹窗提示",
            yesText: "好的",
            yesStyle: "b_dred",
            onYes: function () {
                return true
            },
            noText: "",
            noStyle: "b_white",
            onNo: function () {
                return true
            },
            animte: "fadeAnim",
            hasMask: true,
            clickMaskHide: false
        };
        for (var g in f) {
            j[g] = f[g]
        }
        var o = j.title,
            q = j.text,
            m = j.yesText,
            r = j.yesStyle,
            p = j.onYes,
            l = j.noText,
            h = j.noStyle,
            s = j.onNo,
            n = j.animte,
            k = j.clickMaskHide,
            width = j.width;
        e = j.hasMask;
        d && d.div.parentNode.removeChild(d.div);
        d = b();
        d.div.style.width = width + "px";
        d.text.innerHTML = q;
        d.btnY.innerHTML = m;
        d.btnY.className = "btn btn_yes " + r;
        d.btnY.addEventListener("click", function () {
            (p() !== false) && c.hideAlert(n)
        });
        if (o) {
            d.tit.show().innerHTML = o
        } else {
            d.tit.hide()
        }
        if (l) {
            d.btnY.style.display = "table-cell";
            d.btnN.style.display = "table-cell";
            d.btnN.className = "btn btn_no " + h;
            d.btnN.innerHTML = l;
            d.btnN.addEventListener("click", function () {
                (s() !== false) && c.hideAlert(n)
            })
        } else {
            d.btnN.hide()
        }
        c(d.div).open(n);
        e && c.showMask();
        if (e && k) {
            c.mask.addEventListener("click", function () {
                My.hideAlert()
            })
        }
        c.reshowAlert = function () {
            c(d.div).open(n);
            e && c.showMask()
        }
    };
    c.hideAlert = function (f) {
        c(d.div).close(f);
        e && c.hideMask()
    };

    function b() {
        var l = document.createElement("div");
        l.style.cssText = "display:none; text-align:center; position:fixed; top:27%; left:50%; z-index:1400; margin-left:-130px; width:260px; font-size:14px; background-color:#fff; border-radius: 4px;";
        l.className = "alert";
        var i = document.createElement("div");
        i.style.cssText = "";
        i.className = "btn_cont";
        var g = document.createElement("div"),
            h = document.createElement("div"),
            f = document.createElement("h3"),
            k = document.createElement("a"),
            j = document.createElement("a");
        f.className = "alert_tit";
        g.className = "alert_text";
        h.style.textAlign = "left";
        k.className = "btn_yes";
        j.style.cssText = "display:none;";
        j.className = "btn_cont";
        g.appendChild(h);
        l.appendChild(f);
        l.appendChild(g);
        i.appendChild(k);
        i.appendChild(j);
        l.appendChild(i);
        document.body.appendChild(l);
        l.addEventListener("touchmove", stopProp);
        return {
            div: $$(l),
            tit: $$(f),
            text: $$(h),
            btnY: $$(k),
            btnN: $$(j)
        }
    }

    c.showMask = function (g, f) {
        c.mask = c.mask || a();
        c(c.mask).open(g, f)
    };
    c.hideMask = function (g, f) {
        c(c.mask).close(g, f)
    };

    function a() {
        var f = document.createElement("div");
        f.setAttribute("id", "myMask");
        f.style.cssText = "position:fixed;left:0;top:0;z-index:1000;width:100%;height:100%;background-color:rgba(0,0,0,.6);display:none;";
        document.body.appendChild(f);
        f.addEventListener("touchmove", stopProp);
        return $$(f)
    }
})(My);

/*
 * 弹窗改
 * */
(function (c) {
    var d, e;
    c.showAlert2 = function (f) {
        var j = {
            width: '',
            title: "",
            text: "弹窗提示",
            yesText: "好的",
            yesStyle: "b_dred",
            onYes: function () {
                return true
            },
            noText: "",
            noStyle: "b_white",
            onNo: function () {
                return true
            },
            animte: "fadeAnim",
            hasMask: true,
            clickMaskHide: false
        };
        for (var g in f) {
            j[g] = f[g]
        }
        var o = j.title,
            q = j.text,
            m = j.yesText,
            r = j.yesStyle,
            p = j.onYes,
            l = j.noText,
            h = j.noStyle,
            s = j.onNo,
            n = j.animte,
            k = j.clickMaskHide,
            width = j.width;
        e = j.hasMask;
        d && d.div.parentNode.removeChild(d.div);
        d = b();
        console.log(d);
        d.div.style.width = width + "px";
        d.text.innerHTML = q;
        d.btnY.innerHTML = m;
        d.btnY.className = "btn btn_yes " + r;
        d.btnY.addEventListener("click", function () {
            (p() !== false) && c.hideAlert2(n)
        });
        if (o) {
            d.tit.show().innerHTML = o
        } else {
            d.tit.hide()
        }
        if (l) {
            d.btnY.style.display = "table-cell";
            d.btnN.style.display = "table-cell";
            d.btnN.className = "btn btn_no " + h;
            d.btnN.innerHTML = l;
            d.btnN.addEventListener("click", function () {
                (s() !== false) && c.hideAlert2(n)
            })
        } else {
            d.btnN.hide()
        }
//      c(d.div).open(n);     //修改为display:block 不行 需修改为 display:flex
		d.div.style.display = "flex";
        e && c.showMask2();
        if (e && k) {
            c.mask.addEventListener("click", function () {
                My.hideAlert2()
            })
        }
        c.reshowAlert = function () {
//          c(d.div).open(n);
			d.div.style.display = "flex";
            e && c.showMask2()
        }
    };
    c.hideAlert2 = function (f) {
//      c(d.div).close(f);
        d.div.style.display = "none";
        e && c.hideMask2();
    };

    function b() {
        var l = document.createElement("div");
        l.style.cssText = "display:flex;flex-direction: column; text-align:center; position:fixed; top:15%; left:10%;max-height: 70%; z-index:1700; width:80%; font-size:14px; background-color:#fff; border-radius: 4px;";
        l.className = "alert";
        var i = document.createElement("div");
        i.style.cssText = "";
        i.className = "btn_cont";
        i.style.cssText = "padding: 0;flex-grow: 0;flex-shrink: 0;";
        var g = document.createElement("div"),
            h = document.createElement("div"),
            f = document.createElement("h3"),
            k = document.createElement("a"),
            j = document.createElement("a");
        f.className = "alert_tit";
        f.style.cssText = "text-align: center;color: #000000;padding: .5rem 0;margin-bottom: 0;flex-grow: 0;flex-shrink: 0;background: #eee;font-size: 1.5rem;border-top-left-radius: 4px;border-top-right-radius: 4px;";
        g.className = "alert_text";
        g.style.cssText = "width:90%;text-align: center;margin-left: 5%;display: block;padding: 0;overflow:scroll;flex-grow: 1;";
        h.style.cssText = "text-align: left;padding: .5rem 0;";
        k.className = "btn_yes";
        k.style.cssText = "background: #FFFFFF;color: #B92C1F;width: 100%;font-size: 14px;height: 32px;line-height: 32px;padding: 0;";
        j.style.cssText = "display:none;";
        j.className = "btn_cont";
        g.appendChild(h);
        l.appendChild(f);
        l.appendChild(g);
        i.appendChild(k);
        i.appendChild(j);
        l.appendChild(i);
        document.body.appendChild(l);
//      l.addEventListener("touchmove", stopProp);
        return {
            div: $$(l),
            tit: $$(f),
            text: $$(h),
            btnY: $$(k),
            btnN: $$(j)
        }
    }

    c.showMask2 = function (g, f) {
    	$("body,html").css("overflow","hidden");
    	$("body,html").css("height","100%");
        c.mask = c.mask || a();
        c(c.mask).open(g, f)
    };
    c.hideMask2 = function (g, f) {
    	$("body,html").css("overflow","auto");
    	$("body,html").css("height","auto");
        c(c.mask).close(g, f)
    };

    function a() {
        var f = document.createElement("div");
        f.setAttribute("id", "myMask");
        f.style.cssText = "position:fixed;left:0;top:0;z-index:1600;width:100%;height:100%;background-color:rgba(0,0,0,.8);display:none;";
        document.body.appendChild(f);
        f.addEventListener("touchmove", stopProp);
        f.addEventListener("click",function(){
        	c.hideAlert2();
        })
        return $$(f)
    }
})(My);

(function (my) {

    my.page = {
        open: function (element) {
            document.getElementsByTagName("html")[0].style.cssText = "position:static";
            document.getElementsByTagName("body")[0].style.cssText = "position:static";
            element.css("display", "block");
            setTimeout(function () {
                element.addClass("current")
            }, 20);
            $(window).scrollTop(0);
        },
        close: function (element) {
            setTimeout(function () {
                element.removeClass("current")
            }, 20);
            $(window).scrollTop(0);
            setTimeout(function () {
                element.css("display", "none")
            }, 200);
        }
    };

})(My);

/**
 * id打开层id: #id，
 * anim动画自定义，
 * iscloseMask 关闭是否关闭阴影
 */
(function (my) {
    //打开层
    my.showLayer = function (id, anim) {
        var t = anim || "popAnim";
        my.showMask();
        if (t == "popEase") {
            id = id.replace("#", '');
            document.getElementsByTagName("html")[0].style.cssText = "position:relative;height:" + window.screen.height + "px;overflow:hidden";
            document.getElementsByTagName("body")[0].style.cssText = "position:relative;height:" + window.screen.height + "px;overflow:hidden";
            $$(id).removeClass("hidden");
            $$(id).addClass("shown");
            $$(id).style.cssText = "height:" + $$(id).childNodes[1].offsetHeight + "px";
        } else {
            my(id).open(t);
        }
        my.mask.addEventListener("click", function () {
            my.hideLayer(id, t, false);
        });
    };
    //关闭层
    my.hideLayer = function (id, anim, iscloseMask) {
        !iscloseMask && setTimeout(my.hideMask, 100);
        var t = anim || "popAnim";
        my.hideMask();
        if (t == "popEase") {
            id = id.replace("#", '');
            document.getElementsByTagName("html")[0].style.cssText = "position:static";
            document.getElementsByTagName("body")[0].style.cssText = "position:static";
            $$(id).removeClass("shown");
            $$(id).addClass("hidden");
        } else {
            my(id).close(t);
        }
    };
    //普通弹窗
    my.alertBox = function (text, btnText, callback) {
        My.showAlert({
            text: text || "网络不给力，刷新再试~",
            yesText: btnText || "确定",
            yesStyle: "b_dred",
            onYes: function () {
                if (typeof callback == 'function')
                    callback();
            }
        });
    };

    /*
     获取指定的URL参数值
     URL:http://www.8791.com/?name=8791
     参数：paramName URL参数
     调用方法:getParam("name")
     返回值:8791
     */
    my.getParam = function (paramName) {
        var paramValue = "", isFound = false, params = window.location.search;
        if (params.indexOf("?") == 0 && params.indexOf("=") > 1) {
            params = params.replace('&amp;', '&');
            var arrSource = unescape(params).substring(1, params.length).split("&"), i = 0;
            while (i < arrSource.length && !isFound) {
                if (arrSource[i].indexOf("=") > 0) {
                    if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                        paramValue = arrSource[i].split("=")[1];
                        isFound = true;
                    }
                }
                i++;
            }
        }
        return paramValue;
    };

    my.getParam2 = function (paramName) {
        var paramValue = "", isFound = false, params = window.location.search;
        if (params.indexOf("?") == 0 && params.indexOf("=") > 1) {
            params = params.replace('&amp;', '&');
            var arrSource = decodeURI(params).substring(1, params.length).split("&"), i = 0;
            while (i < arrSource.length && !isFound) {
                if (arrSource[i].indexOf("=") > 0) {
                    if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                        paramValue = arrSource[i].split("=")[1];
                        isFound = true;
                    }
                }
                i++;
            }
        }
        return paramValue;
    };

    /*
     * 时间转换 （1421826531） time * 1000 转换成 js 的毫秒级 再  new Date()
     * */
    my.convertTime = function (time, format) {
        return (new Date(parseInt(time * 1000, 10)).format(format || "yyyy-MM-dd hh:mm:ss"));
    };

    //json反序列化
    my.jsonDeserialize = function (jsondata) {
        return eval('(' + jsondata + ')');
    };
    /* 转化为两位小数
     */
    my.fix = function (value, v) {
        if (typeof v !== 'undefined') {
            return parseFloat(value).toFixed(v);
        }
        return parseFloat(value).toFixed(2);
    };
})(My);


(function (my) {

    /* 去空格
     */
    function trim(s) {
        return s.replace(/^\s+|\s+$/g, '');
    }

    my.cookie = function (name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cook = trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cook.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cook.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

})(My);


