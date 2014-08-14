zepto.slitslider.js
===================

A slitslider remake using Zepto.js same with [jquery.slitslider.js](https://github.com/codrops/SlitSlider).  
[DEMO](http://www.iloushi.cn/ued/zepto-slitslider/)  
Required files:  
1.zepto.js  
2.zepto.fx.js  


===================
zepto版本的 [jquery.slitslider.js](https://github.com/codrops/SlitSlider)。  

[DEMO](http://www.iloushi.cn/ued/zepto-slitslider/)  
[桌面版DEMO](http://www.iloushi.cn/ued/zepto-slitslider/desktop.html)  

默认参数
```javascript
{
	horizontal:true, //动画移动方向。true:垂直,false:水平
	easing: 'ease-in-out',           // the easing function
	speed: 350,                //动画持续时间
	scale:1,  //图片缩放大小
	rotateZ:0,  //图片旋转角度
	opacity:1,  //图片透明度
	maxTrans:200 //图片最大移动距离
}

```
```html
<div class="slider">
	<div></div>
	<div data-orientation="vertical"></div>
	<div></div>
</div>
<script>
	var sslider = $('.slider').SlitSlider({speed:1000});
	$(document).swipeUp(function () {
		//下一页
		sslider.next();
	});
	$(document).swipeDown(function () {
		//上一页
		sslider.prev();
	});
</script>
```