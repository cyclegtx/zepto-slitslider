/**
* zepto.slitslider.js v0.0.1
* Zepto滑动插件，
* 依赖js: zepto.js, zepto.fx.js
* https://github.com/cyclegtx/zepto-slitslider
* 
* Copyright 2014, cyclegtx
**/
var SlitSlider = function(container, options){
  this.options = $.extend({
    orientation:'horizontal', //动画移动方向。horizontal:垂直,vertical:水平
    easing: 'ease-in-out',           // the easing function
    speed: 350,                //动画持续时间
    scale:1,  //图片缩放大小
    rotateZ:0,  //图片旋转角度
    opacity:1,  //图片透明度
    maxTrans:200 //图片最大移动距离
  }, options)
  this.animating = false;
  this.wrpEl = container;
  this.items = $(this.wrpEl).children();
  this.itemsNum = this.items.length;
  $(this.wrpEl).attr('data-step',0);
}

SlitSlider.prototype = {
  next:function(){
    if(this.animating)
      return;
    var self = this;
    var itemIndex = $(this.wrpEl).attr('data-step')>>0;
    if(itemIndex >= this.itemsNum-1)
      return;
    this.animating = true;
    var item = this.items.eq(itemIndex);
    var pW = item.width(),pH = item.height();
    item.wrapInner('<div class="wrapInner"></div>').wrapInner('<div class="half1">');
    var half1 = item.find('.half1');
    half1.clone().removeClass('half1').addClass('half2').appendTo(item);
    var half2 = item.find('.half2');
    var transAnim = 2;

    var option = {};
    option.orientation = item.attr('data-orientation')?item.attr('data-orientation'):this.options.orientation;
    option.easing = item.attr('data-easing')?item.attr('data-easing'):this.options.easing;
    option.speed = item.attr('data-speed')?item.attr('data-speed'):this.options.speed;
    option.scale = item.attr('data-scale')?item.attr('data-scale'):this.options.scale;
    option.rotateZ = item.attr('data-rotateZ')?item.attr('data-rotateZ'):this.options.rotateZ;
    option.opacity = item.attr('data-opacity')?item.attr('data-opacity'):this.options.opacity;
    option.maxTrans = item.attr('data-maxTrans')?item.attr('data-maxTrans'):this.options.maxTrans;

    if(option.orientation == 'horizontal'){
      //垂直
      half1.css({width:pW,height:pH/2,'overflow':'hidden'});
      half2.css({width:pW,height:pH/2,'overflow':'hidden'});
      half2.find('.wrapInner').css({'margin-top':-pH/2});
      half1.animate({'translate3d':'0,-'+option.maxTrans+'%,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          //已完成
          $(self).trigger('nextOver');
          $(self.wrpEl).attr('data-step',itemIndex+1);
          self.animating = false;
        }
      });
      half2.animate({'translate3d':'0,'+option.maxTrans+'%,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          //已完成
          $(self).trigger('nextOver');
          $(self.wrpEl).attr('data-step',itemIndex+1);
          self.animating = false;
        }
      });
    }else{
      //水平
      half1.css({width:pW/2,height:pH,'overflow':'hidden','position':'absolute','top':'0px','left':'0px'});
      half2.css({width:pW/2,height:pH,'overflow':'hidden','position':'absolute','top':'0px','right':'0px'});
      half1.find('.wrapInner').css({width:pW,height:pH});
      half2.find('.wrapInner').css({width:pW,height:pH,'margin-left':-pW/2});
      half1.animate({'translate3d':'-'+option.maxTrans+'%,0,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          //已完成
          $(self).trigger('nextOver');
          $(self.wrpEl).attr('data-step',itemIndex+1);
          self.animating = false;
        }
      });
      half2.animate({'translate3d':''+option.maxTrans+'%,0,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          //已完成
          $(self).trigger('nextOver');
          $(self.wrpEl).attr('data-step',itemIndex+1);
          self.animating = false;
        }
      });
    }
    
    
    
  },
  prev:function(){
    if(this.animating)
      return;
    var self = this;
    var itemIndex = $(this.wrpEl).attr('data-step')>>0;
    if(itemIndex == 0)
      return;
    this.animating = true;
    var item = this.items.eq(itemIndex-1);
    var half1 = item.find('.half1');
    var half2 = item.find('.half2');
    var transAnim = 2;
    var option = {};
    option.orientation = item.attr('data-orientation')?item.attr('data-orientation'):this.options.orientation;
    option.easing = item.attr('data-easing')?item.attr('data-easing'):this.options.easing;
    option.speed = item.attr('data-speed')?item.attr('data-speed'):this.options.speed;
    option.scale = item.attr('data-scale')?item.attr('data-scale'):this.options.scale;
    option.rotateZ = item.attr('data-rotateZ')?item.attr('data-rotateZ'):this.options.rotateZ;
    option.opacity = item.attr('data-opacity')?item.attr('data-opacity'):this.options.opacity;
    option.maxTrans = item.attr('data-maxTrans')?item.attr('data-maxTrans'):this.options.maxTrans;
    half1.animate({'translate3d':'0,0,0',rotateZ:"0deg",scale:'1',opacity:'1'},option.speed,option.easing,function(){
      transAnim--;
      if(transAnim === 0){
        //已完成
        $(self).trigger('prevOver');
        $(self.wrpEl).attr('data-step',itemIndex-1);
        half2.remove();
        half1.find('.wrapInner').children().unwrap().unwrap();
        self.animating = false;
      }
    });
    half2.animate({'translate3d':'0,0,0',rotateZ:"0deg",scale:'1',opacity:'1'},option.speed,option.easing,function(){
      transAnim--;
      if(transAnim === 0){
        //已完成
        $(self).trigger('prevOver');
        $(self.wrpEl).attr('data-step',itemIndex-1);
        half2.remove();
        half1.find('.wrapInner').children().unwrap().unwrap();
        self.animating = false;
      }
    });
  }
}




// zepto plugin
;(function($) {
  $.fn.SlitSlider = function(options) {
    var s = new SlitSlider(this, options);
    return s;
  }
})(window.Zepto)