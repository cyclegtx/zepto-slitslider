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

默认参数，改变其中的参数可以制作各种转场效果。  
```javascript
{
	orientation:'horizontal', //动画移动方向。horizontal:垂直,vertical:水平
	easing: 'ease-in-out',           // the easing function
	speed: 350,                //动画持续时间
	scale:1,  //图片缩放大小
	rotateZ:0,  //图片旋转角度
	opacity:1,  //图片透明度
	maxTrans:200, //图片最大移动距离
	loop:false //是否循环
}

```  
在实例化的的时候可以修改默认参数。在html节点中可以使用```data-*```的方式修改单个页面的参数。例如```data-orientation="vertical"```可以让第二个页面的转场变为左右分开，并且```data-*```不会影响其他页面。  
```html
<div class="slider">
	<div></div>
	<div data-orientation="vertical" data-scale="2"></div>
	<div></div>
</div>
<script>
	var sslider = $('.slider').SlitSlider({speed:1000,loop:true});
	$(document).swipeUp(function () {
		//下一页
		sslider.next();
	});
	$(document).swipeDown(function () {
		//上一页
		sslider.prev();
	});
	//去往第3页
	sslider.to(2)
</script>
```  
调用```.next()```为下一页，```.prev()```为上一页，```.to(n)```为跳往第n页   

#####大体实现方法：  
当调用```next()```的时候会根据```.slider````上的```data-step```来确定当前是第几页，并取得当前页面的节点。和页面的宽度高度```pW,pH```  
```javscript
var item = this.items.eq(itemIndex);
var pW = item.width(),pH = item.height();
```  
然后是关键部分，将当页的*内部节点*包在一个class为```wrapInner```的新div中，这个div是为了改变当前内容的位置所用，下面会用到。然后再包一层class为```half1```的div，这个层是为了做动画。把包好的节点half1复制一份出来，并将half1换成half2加到当前页面根节点之下。没错half1与half2就是动画中页面裂开的两个部分。  
```javscript
item.wrapInner('<div class="wrapInner"></div>').wrapInner('<div class="half1">');
var half1 = item.find('.half1');
half1.clone().removeClass('half1').addClass('half2').appendTo(item);
var half2 = item.find('.half2');
```  
剩下的部分就是根据是垂直还是水平来为half1,half2加上不同的样式，使其宽度或者高度为其父节点的一半，并使两部分对其。  
```javascript
if......
//垂直
  half1.css({width:pW,height:pH/2,'overflow':'hidden'});
  half2.css({width:pW,height:pH/2,'overflow':'hidden'});
  half1.find('.wrapInner').css({width:pW,height:pH});
  half2.find('.wrapInner').css({width:pW,height:pH,'margin-top':-pH/2});
  ......
}else{
  //水平
  half1.css({width:pW/2,height:pH,'overflow':'hidden','position':'absolute','top':'0px','left':'0px'});
  half2.css({width:pW/2,height:pH,'overflow':'hidden','position':'absolute','top':'0px','right':'0px'});
  half1.find('.wrapInner').css({width:pW,height:pH});
  half2.find('.wrapInner').css({width:pW,height:pH,'margin-left':-pW/2});
  ......
}
```  
最后就是按照设置的参数做转场动画了。  
当调用```prev()```的时候将half1，half2的参数归为零来做返回动画，动画做完后将half2与之前包的div删掉，使其恢复之前的节点层次。这样动画就做完了。



欢迎关注我的微博[@UED天机](http://weibo.com/uedtianji)

更多教程请访问：[ued.sexy](http://ued.sexy)  