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


```html
<div class="slider">
	<div></div>
	<div data-orientation="vertical"></div>
	<div></div>
</div>
<script>
	var sslider = $('.slider').SlitSlider({vertical:true,speed:1000});
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