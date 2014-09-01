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
    maxTrans:200, //图片最大移动距离
    loop:false //是否循环
  }, options);
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
    if(itemIndex >= this.itemsNum-1 && !this.options.loop)
      return;
    if(itemIndex === this.itemsNum-1 && this.options.loop){
      this.items.eq(0).css('display','block');
      this.reset();
    }
    
    var aniItem = this.items.eq(itemIndex);
    this.items.eq(itemIndex+1).css('display','block');
    this.donext(aniItem);
    
  },
  donext:function(item){
    var self = this;
    this.animating = true;
    var pW = item.width(),pH = item.height();
    item.wrapInner('<div class="wrapInner"></div>').wrapInner('<div class="half1">');
    var half1 = item.find('.half1');
    half1.clone().removeClass('half1').addClass('half2').appendTo(item);
    var half2 = item.find('.half2');
    var transAnim = 2;
    var option = this.getSpeOption(item);
    if(option.orientation == 'horizontal'){
      //垂直
      half1.css({width:pW,height:pH/2,'overflow':'hidden'});
      half2.css({width:pW,height:pH/2,'overflow':'hidden'});
      half1.find('.wrapInner').css({width:pW,height:pH});
      half2.find('.wrapInner').css({'margin-top':-pH/2,width:pW,height:pH});
      half1.animate({'translate3d':'0,-'+option.maxTrans+'%,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          //已完成
          finish();
        }
      });
      half2.animate({'translate3d':'0,'+option.maxTrans+'%,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          //已完成
          finish();
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
          finish();
        }
      });
      half2.animate({'translate3d':''+option.maxTrans+'%,0,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          //已完成
          finish();
        }
      });
    }
    
    function finish(){
      $(self).trigger('nextOver');
      item.css('display','none');
      var itemIndex = $(self.wrpEl).attr('data-step')>>0;
      if(itemIndex === self.itemsNum-1 && self.options.loop){
        $(self.wrpEl).attr('data-step',0);
        var lastZIndex = self.items.eq(self.itemsNum-2).css('z-index') >>0;
        var tmp = self.items.eq(self.itemsNum-1);
        tmp.css('z-index',lastZIndex-1);
        tmp.find('.half1').find('.wrapInner').children().unwrap().unwrap();
        tmp.find('.half2').remove();
      }else{
        $(self.wrpEl).attr('data-step',itemIndex+1);
      }
      self.animating = false;
    }
  },
  prev:function(){
    if(this.animating)
      return;
    var self = this;
    var itemIndex = $(this.wrpEl).attr('data-step')>>0;
    if(itemIndex == 0)
      return;
    var aniItem = this.items.eq(itemIndex-1);
    this.doprev(aniItem);
  },
  doprev:function(item){
    var self = this;
    this.animating = true;
    item.css('display','block');
    var half1 = item.find('.half1');
    var half2 = item.find('.half2');
    var transAnim = 2;
    var option = this.getSpeOption(item);
    half1.animate({'translate3d':'0,0,0',rotateZ:"0deg",scale:'1',opacity:'1'},option.speed,option.easing,function(){
      transAnim--;
      if(transAnim === 0){
        //已完成
        finish();
      }
    });
    half2.animate({'translate3d':'0,0,0',rotateZ:"0deg",scale:'1',opacity:'1'},option.speed,option.easing,function(){
      transAnim--;
      if(transAnim === 0){
        //已完成
        finish();
      }
    });
    function finish(){
      $(self).trigger('prevOver');
      var itemIndex = $(self.wrpEl).attr('data-step')>>0;
      $(self.wrpEl).attr('data-step',itemIndex-1);
      half2.remove();
      half1.find('.wrapInner').children().unwrap().unwrap();
      self.animating = false;
    }
  },
  reset: function(){
    var topIndex = this.items.eq(0).css('z-index') >>0;
    this.items.eq(this.itemsNum-1).css('z-index',topIndex+1);
    for(var i = 0;i<this.itemsNum-1;i++){
      var item = this.items.eq(i);
      var half1 = item.find('.half1');
      var half2 = item.find('.half2');
      half2.remove();
      half1.find('.wrapInner').children().unwrap().unwrap();
      item.css('display','block');
    }
  },
  to:function(toStep){
    var self = this;
    var toStep = toStep === undefined?0:toStep;
    var curStep = $(this.wrpEl).attr('data-step')>>0;
    if(toStep > curStep){
      //next
      for(var i=curStep+1;i<toStep;i++){
        var aniItem = self.items.eq(i);
        var pW = aniItem.width(),pH = aniItem.height();
        aniItem.wrapInner('<div class="wrapInner"></div>').wrapInner('<div class="half1">');
        aniItem.css('display','none');
        var half1 = aniItem.find('.half1');
        half1.clone().removeClass('half1').addClass('half2').appendTo(aniItem);
        var half2 = aniItem.find('.half2');
        var option = this.getSpeOption(aniItem);
        if(option.orientation == 'horizontal'){
          //垂直
          half1.css({width:pW,height:pH/2,'overflow':'hidden'});
          half2.css({width:pW,height:pH/2,'overflow':'hidden'});
          half1.find('.wrapInner').css({width:pW,height:pH});
          half2.find('.wrapInner').css({width:pW,height:pH,'margin-top':-pH/2});
          half1.animate({'translate3d':'0,-'+option.maxTrans+'%,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},0);
          half2.animate({'translate3d':'0,'+option.maxTrans+'%,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},0);
        }else{
          //水平
          half1.css({width:pW/2,height:pH,'overflow':'hidden','position':'absolute','top':'0px','left':'0px'});
          half2.css({width:pW/2,height:pH,'overflow':'hidden','position':'absolute','top':'0px','right':'0px'});
          half1.find('.wrapInner').css({width:pW,height:pH});
          half2.find('.wrapInner').css({width:pW,height:pH,'margin-left':-pW/2});
          half1.animate({'translate3d':'-'+option.maxTrans+'%,0,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},0);
          half2.animate({'translate3d':''+option.maxTrans+'%,0,0',rotateZ:option.rotateZ+"deg",scale:option.scale,opacity:option.opacity},0);
        }
      }
      var curItem = this.items.eq(curStep);
      this.items.eq(toStep).css('display','block');
      $(this.wrpEl).attr('data-step',toStep-1);
      this.donext(curItem);
    }else if(toStep < curStep){
      //prev
      this.animating = true;
      var toItem = this.items.eq(toStep);
      toItem.css('display','block');
      var half1 = toItem.find('.half1');
      var half2 = toItem.find('.half2');
      var transAnim = 2;
      var option = this.getSpeOption(aniItem);
      half1.animate({'translate3d':'0,0,0',rotateZ:"0deg",scale:'1',opacity:'1'},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          prefinish();
        }
      });
      half2.animate({'translate3d':'0,0,0',rotateZ:"0deg",scale:'1',opacity:'1'},option.speed,option.easing,function(){
        transAnim--;
        if(transAnim === 0){
          prefinish();
        }
      });
      function prefinish(){
        $(self).trigger('prevOver');
        $(self.wrpEl).attr('data-step',toStep);
        half2.remove();
        half1.find('.wrapInner').children().unwrap().unwrap();
        self.animating = false;
        for(var i=curStep;i>toStep;i--){
          var aniItem = self.items.eq(i);
          aniItem.css('display','block');
          aniItem.find('.half2').remove();
          aniItem.find('.half1').find('.wrapInner').children().unwrap().unwrap();
        }
      }
    }else{
      return;
    }
  },
  getSpeOption:function(item){
    var option = {};
    option.orientation = item.attr('data-orientation')?item.attr('data-orientation'):this.options.orientation;
    option.easing = item.attr('data-easing')?item.attr('data-easing'):this.options.easing;
    option.speed = item.attr('data-speed')?item.attr('data-speed'):this.options.speed;
    option.scale = item.attr('data-scale')?item.attr('data-scale'):this.options.scale;
    option.rotateZ = item.attr('data-rotateZ')?item.attr('data-rotateZ'):this.options.rotateZ;
    option.opacity = item.attr('data-opacity')?item.attr('data-opacity'):this.options.opacity;
    option.maxTrans = item.attr('data-maxTrans')?item.attr('data-maxTrans'):this.options.maxTrans;
    return option;
  }
}




// zepto plugin
;(function($) {
  $.fn.SlitSlider = function(options) {
    var s = new SlitSlider(this, options);
    return s;
  }
})(window.Zepto)