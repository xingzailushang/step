// weChat mpvue开发小程序 特殊问题汇总

// 0 监听页面滚动值，动态修改absolute元素位置
// 		①为该模块添加行内样式修改top值，监听事件用微信api onPageScroll；
// 		②vue ref属性及this.$refs.name 在小程序中获取不到dom对象，更无法修改其css样式；
// 		③用微信api  wx.createSelectorQuery().select('#the-id').boundingClientRect(function(){})  可获取到top值但无法修改

// 1 设置input placeholder样式
// 小程序中不支持css  input::-webkit-input-placeholder{ } 这种写法
// 需在页面内用小程序属性  placeholder-style 添加行内样式 或 placeholder-class添加专用css名来修改
// 根据网上说法，小程序中placeholder 样式不继承input样式，为保证效果一致需要单独写css

// 2 图片
// 小程序中图片不支持相对路径，只能用base64 或网络地址