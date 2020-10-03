/*
 * jQuery UI Effects 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects||function(f,j){function m(c){var a;if(c&&c.constructor==Array&&c.length==3)return c;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return[parseInt(a[1],
16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(c))return n.transparent;return n[f.trim(c).toLowerCase()]}function s(c,a){var b;do{b=f.curCSS(c,a);if(b!=""&&b!="transparent"||f.nodeName(c,"body"))break;a="backgroundColor"}while(c=c.parentNode);return m(b)}function o(){var c=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,
a={},b,d;if(c&&c.length&&c[0]&&c[c[0]])for(var e=c.length;e--;){b=c[e];if(typeof c[b]=="string"){d=b.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a[d]=c[b]}}else for(b in c)if(typeof c[b]==="string")a[b]=c[b];return a}function p(c){var a,b;for(a in c){b=c[a];if(b==null||f.isFunction(b)||a in t||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(b)))delete c[a]}return c}function u(c,a){var b={_:0},d;for(d in a)if(c[d]!=a[d])b[d]=a[d];return b}function k(c,a,b,d){if(typeof c=="object"){d=
a;b=null;a=c;c=a.effect}if(f.isFunction(a)){d=a;b=null;a={}}if(typeof a=="number"||f.fx.speeds[a]){d=b;b=a;a={}}if(f.isFunction(b)){d=b;b=null}a=a||{};b=b||a.duration;b=f.fx.off?0:typeof b=="number"?b:b in f.fx.speeds?f.fx.speeds[b]:f.fx.speeds._default;d=d||a.complete;return[c,a,b,d]}function l(c){if(!c||typeof c==="number"||f.fx.speeds[c])return true;if(typeof c==="string"&&!f.effects[c])return true;return false}f.effects={};f.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor",
"borderTopColor","borderColor","color","outlineColor"],function(c,a){f.fx.step[a]=function(b){if(!b.colorInit){b.start=s(b.elem,a);b.end=m(b.end);b.colorInit=true}b.elem.style[a]="rgb("+Math.max(Math.min(parseInt(b.pos*(b.end[0]-b.start[0])+b.start[0],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[1]-b.start[1])+b.start[1],10),255),0)+","+Math.max(Math.min(parseInt(b.pos*(b.end[2]-b.start[2])+b.start[2],10),255),0)+")"}});var n={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,
0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,
211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},q=["add","remove","toggle"],t={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};f.effects.animateClass=function(c,a,b,
d){if(f.isFunction(b)){d=b;b=null}return this.queue(function(){var e=f(this),g=e.attr("style")||" ",h=p(o.call(this)),r,v=e.attr("class");f.each(q,function(w,i){c[i]&&e[i+"Class"](c[i])});r=p(o.call(this));e.attr("class",v);e.animate(u(h,r),{queue:false,duration:a,easing:b,complete:function(){f.each(q,function(w,i){c[i]&&e[i+"Class"](c[i])});if(typeof e.attr("style")=="object"){e.attr("style").cssText="";e.attr("style").cssText=g}else e.attr("style",g);d&&d.apply(this,arguments);f.dequeue(this)}})})};
f.fn.extend({_addClass:f.fn.addClass,addClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{add:c},a,b,d]):this._addClass(c)},_removeClass:f.fn.removeClass,removeClass:function(c,a,b,d){return a?f.effects.animateClass.apply(this,[{remove:c},a,b,d]):this._removeClass(c)},_toggleClass:f.fn.toggleClass,toggleClass:function(c,a,b,d,e){return typeof a=="boolean"||a===j?b?f.effects.animateClass.apply(this,[a?{add:c}:{remove:c},b,d,e]):this._toggleClass(c,a):f.effects.animateClass.apply(this,
[{toggle:c},a,b,d])},switchClass:function(c,a,b,d,e){return f.effects.animateClass.apply(this,[{add:a,remove:c},b,d,e])}});f.extend(f.effects,{version:"1.8.16",save:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.data("ec.storage."+a[b],c[0].style[a[b]])},restore:function(c,a){for(var b=0;b<a.length;b++)a[b]!==null&&c.css(a[b],c.data("ec.storage."+a[b]))},setMode:function(c,a){if(a=="toggle")a=c.is(":hidden")?"show":"hide";return a},getBaseline:function(c,a){var b;switch(c[0]){case "top":b=
0;break;case "middle":b=0.5;break;case "bottom":b=1;break;default:b=c[0]/a.height}switch(c[1]){case "left":c=0;break;case "center":c=0.5;break;case "right":c=1;break;default:c=c[1]/a.width}return{x:c,y:b}},createWrapper:function(c){if(c.parent().is(".ui-effects-wrapper"))return c.parent();var a={width:c.outerWidth(true),height:c.outerHeight(true),"float":c.css("float")},b=f("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),
d=document.activeElement;c.wrap(b);if(c[0]===d||f.contains(c[0],d))f(d).focus();b=c.parent();if(c.css("position")=="static"){b.css({position:"relative"});c.css({position:"relative"})}else{f.extend(a,{position:c.css("position"),zIndex:c.css("z-index")});f.each(["top","left","bottom","right"],function(e,g){a[g]=c.css(g);if(isNaN(parseInt(a[g],10)))a[g]="auto"});c.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return b.css(a).show()},removeWrapper:function(c){var a,b=document.activeElement;
if(c.parent().is(".ui-effects-wrapper")){a=c.parent().replaceWith(c);if(c[0]===b||f.contains(c[0],b))f(b).focus();return a}return c},setTransition:function(c,a,b,d){d=d||{};f.each(a,function(e,g){unit=c.cssUnit(g);if(unit[0]>0)d[g]=unit[0]*b+unit[1]});return d}});f.fn.extend({effect:function(c){var a=k.apply(this,arguments),b={options:a[1],duration:a[2],callback:a[3]};a=b.options.mode;var d=f.effects[c];if(f.fx.off||!d)return a?this[a](b.duration,b.callback):this.each(function(){b.callback&&b.callback.call(this)});
return d.call(this,b)},_show:f.fn.show,show:function(c){if(l(c))return this._show.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="show";return this.effect.apply(this,a)}},_hide:f.fn.hide,hide:function(c){if(l(c))return this._hide.apply(this,arguments);else{var a=k.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:f.fn.toggle,toggle:function(c){if(l(c)||typeof c==="boolean"||f.isFunction(c))return this.__toggle.apply(this,arguments);else{var a=k.apply(this,
arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(c){var a=this.css(c),b=[];f.each(["em","px","%","pt"],function(d,e){if(a.indexOf(e)>0)b=[parseFloat(a),e]});return b}});f.easing.jswing=f.easing.swing;f.extend(f.easing,{def:"easeOutQuad",swing:function(c,a,b,d,e){return f.easing[f.easing.def](c,a,b,d,e)},easeInQuad:function(c,a,b,d,e){return d*(a/=e)*a+b},easeOutQuad:function(c,a,b,d,e){return-d*(a/=e)*(a-2)+b},easeInOutQuad:function(c,a,b,d,e){if((a/=e/2)<1)return d/
2*a*a+b;return-d/2*(--a*(a-2)-1)+b},easeInCubic:function(c,a,b,d,e){return d*(a/=e)*a*a+b},easeOutCubic:function(c,a,b,d,e){return d*((a=a/e-1)*a*a+1)+b},easeInOutCubic:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a+b;return d/2*((a-=2)*a*a+2)+b},easeInQuart:function(c,a,b,d,e){return d*(a/=e)*a*a*a+b},easeOutQuart:function(c,a,b,d,e){return-d*((a=a/e-1)*a*a*a-1)+b},easeInOutQuart:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a+b;return-d/2*((a-=2)*a*a*a-2)+b},easeInQuint:function(c,a,b,
d,e){return d*(a/=e)*a*a*a*a+b},easeOutQuint:function(c,a,b,d,e){return d*((a=a/e-1)*a*a*a*a+1)+b},easeInOutQuint:function(c,a,b,d,e){if((a/=e/2)<1)return d/2*a*a*a*a*a+b;return d/2*((a-=2)*a*a*a*a+2)+b},easeInSine:function(c,a,b,d,e){return-d*Math.cos(a/e*(Math.PI/2))+d+b},easeOutSine:function(c,a,b,d,e){return d*Math.sin(a/e*(Math.PI/2))+b},easeInOutSine:function(c,a,b,d,e){return-d/2*(Math.cos(Math.PI*a/e)-1)+b},easeInExpo:function(c,a,b,d,e){return a==0?b:d*Math.pow(2,10*(a/e-1))+b},easeOutExpo:function(c,
a,b,d,e){return a==e?b+d:d*(-Math.pow(2,-10*a/e)+1)+b},easeInOutExpo:function(c,a,b,d,e){if(a==0)return b;if(a==e)return b+d;if((a/=e/2)<1)return d/2*Math.pow(2,10*(a-1))+b;return d/2*(-Math.pow(2,-10*--a)+2)+b},easeInCirc:function(c,a,b,d,e){return-d*(Math.sqrt(1-(a/=e)*a)-1)+b},easeOutCirc:function(c,a,b,d,e){return d*Math.sqrt(1-(a=a/e-1)*a)+b},easeInOutCirc:function(c,a,b,d,e){if((a/=e/2)<1)return-d/2*(Math.sqrt(1-a*a)-1)+b;return d/2*(Math.sqrt(1-(a-=2)*a)+1)+b},easeInElastic:function(c,a,b,
d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g))+b},easeOutElastic:function(c,a,b,d,e){c=1.70158;var g=0,h=d;if(a==0)return b;if((a/=e)==1)return b+d;g||(g=e*0.3);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*a)*Math.sin((a*e-c)*2*Math.PI/g)+d+b},easeInOutElastic:function(c,a,b,d,e){c=1.70158;var g=
0,h=d;if(a==0)return b;if((a/=e/2)==2)return b+d;g||(g=e*0.3*1.5);if(h<Math.abs(d)){h=d;c=g/4}else c=g/(2*Math.PI)*Math.asin(d/h);if(a<1)return-0.5*h*Math.pow(2,10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)+b;return h*Math.pow(2,-10*(a-=1))*Math.sin((a*e-c)*2*Math.PI/g)*0.5+d+b},easeInBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*(a/=e)*a*((g+1)*a-g)+b},easeOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;return d*((a=a/e-1)*a*((g+1)*a+g)+1)+b},easeInOutBack:function(c,a,b,d,e,g){if(g==j)g=1.70158;
if((a/=e/2)<1)return d/2*a*a*(((g*=1.525)+1)*a-g)+b;return d/2*((a-=2)*a*(((g*=1.525)+1)*a+g)+2)+b},easeInBounce:function(c,a,b,d,e){return d-f.easing.easeOutBounce(c,e-a,0,d,e)+b},easeOutBounce:function(c,a,b,d,e){return(a/=e)<1/2.75?d*7.5625*a*a+b:a<2/2.75?d*(7.5625*(a-=1.5/2.75)*a+0.75)+b:a<2.5/2.75?d*(7.5625*(a-=2.25/2.75)*a+0.9375)+b:d*(7.5625*(a-=2.625/2.75)*a+0.984375)+b},easeInOutBounce:function(c,a,b,d,e){if(a<e/2)return f.easing.easeInBounce(c,a*2,0,d,e)*0.5+b;return f.easing.easeOutBounce(c,
a*2-e,0,d,e)*0.5+d*0.5+b}})}(jQuery);
;;
/*Slides, A Slideshow Plugin for jQuery
* Intructions: http://slidesjs.com
* By: Nathan Searles, http://nathansearles.com
* Version: 1.1.9
* Updated: September 5th, 2011
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.*/
(function($){
	$.fn.slides = function( option ) {
		option = $.extend( {}, $.fn.slides.option, option );
		
		return this.each(function(){
			
			$('#slides').addClass('slidesinit');
			
			var bwidth = $('body').width();
			bwidth = setslide(bwidth);
			
			$('.' + option.container, $(this)).children().wrapAll('<div class="slides_control"/>');
			
			var elem = $(this),
			control = $('.slides_control',elem),
			total = control.children().size(),
			width = bwidth,
			height = control.children().outerHeight(),
			start = option.start - 1,
			effect = option.effect.indexOf(',') < 0 ? option.effect : option.effect.replace(' ', '').split(',')[0],
			paginationEffect = option.effect.indexOf(',') < 0 ? effect : option.effect.replace(' ', '').split(',')[1],
			next = 0, prev = 0, number = 0, current = 0, loaded = true, active, clicked, position, direction, imageParent, pauseTimeout, playInterval, 
			ppause = false, pplay = 1, isinit = true;
			
			if (total < 2) {
				$('.' + option.container, $(this)).fadeIn(option.fadeSpeed, option.fadeEasing, function(){loaded = true; option.slidesLoaded();});
				$('.' + option.next + ', .' + option.prev).fadeOut(0);
				return false;}
			
			function animate(direction, effect, clicked) {								
				if (!active && loaded && !ppause) {					
					active = true;					
					option.animationStart(current + 1);
					switch(direction) {
						case 'next':
							prev = current;
							next = current + 1;
							next = total === next ? 0 : next;
							position = width*2;
							direction = -width*2;
							current = next;
						break;
						case 'prev':
							prev = current;
							next = current - 1;
							next = next === -1 ? total-1 : next;								
							position = 0;								
							direction = 0;		
							current = next;
						break;
						case 'pagination':
							next = parseInt(clicked,10);
							prev = $('.' + option.paginationClass + ' li.'+ option.currentClass +' a', elem).attr('href').match('[^#/]+$');
							if (next > prev) {position = width*2; direction = -width*2;}
							else{position = 0; direction = 0;}
							current = next;
						break;
					}
						
					if(effect === 'slide') 
					{
						control.children(':eq('+ next +')').css({left: position, display: 'block'});						
						control.animate({left: direction
						},option.slideSpeed, option.slideEasing, function(){
							control.css({left: -width});
							control.children(':eq('+ next +')').css({left: width, zIndex: 5}).addClass('active');
							control.children(':eq('+ prev +')').css({left: width, display: 'none', zIndex: 0}).removeClass('active');
							option.animationComplete(next + 1);
							active = false;
						});
					}
					
					// set current state for pagination
					if (option.pagination) {
						$('.'+ option.paginationClass +' li.' + option.currentClass, elem).removeClass(option.currentClass);
						$('.' + option.paginationClass + ' li:eq('+ next +')', elem).addClass(option.currentClass);
					}
				}
			} // end animate function
			
			// clear interval from stored id				
			function stop(){clearInterval(elem.data('interval'));}			
			
			function pause() {
				if (option.pause) {					
					clearTimeout(elem.data('pause'));
					clearInterval(elem.data('interval'));
					pauseTimeout = setTimeout(function() {
						clearTimeout(elem.data('pause'));
						playInterval = setInterval(	function(){animate("next", effect);},option.play);
						elem.data('interval',playInterval);
					},option.pause);
					elem.data('pause',pauseTimeout);
				}
				else {stop();}
			}
			
			if (total < 2) {return;}
			if (start < 0) {start = 0;}
			if (start > total) {start = total - 1;}
			if (option.start) {current = start;}
			$('.' + option.container, elem).css({overflow: 'hidden',position: 'relative'});
			setslide(width);
			$(window).resize(function(){			
				width = $('body').width();
				width = setslide(width);
				control.children().css({left: width});
				control.css({width: (width * 3), left: -width});
			});
			function setslide(width){
				if(width < 1025){width = 990; $('#slides').addClass('compact');}
				else{$('#slides').removeClass('compact');}
				
				if(width > 1250){width = 1250;}				
				$('#slides, .slides_container, .slide').css({'width':width+'px'});
				return width;
			}
			control.children().css({position: 'absolute', top: 0, left: width, zIndex: 0, display: 'none'});
			control.css({position: 'relative', width: (width * 3), height: height, left: -width});
			$('.' + option.container, elem).css({display: 'block'});
			if (option.autoHeight) {
				control.children().css({height: 'auto'});
				control.animate({height: control.children(':eq('+ start +')').outerHeight()},option.autoHeightSpeed);
			}
			
			if (option.preload && control.find('img:eq(' + start + ')').length) {
				$('.' + option.container, elem).css({background: '#333'});
				
				var img = control.find('img:eq(' + start + ')').attr('src');
				if ($('img', elem).parent().attr('class') != 'slides_control') {imageParent = control.children(':eq(0)')[0].tagName.toLowerCase();}
				else{imageParent = control.find('img:eq(' + start + ')');}
				control.find('img:eq(' + start + ')').attr('src', img).load(function() {
					control.find(imageParent + ':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){
						$(this).css({zIndex: 5});
						$('.' + option.container, elem).css({background: ''});
						loaded = true;
						option.slidesLoaded();
					});
				});
			} else {control.children(':eq(' + start + ')').fadeIn(option.fadeSpeed, option.fadeEasing, function(){loaded = true;option.slidesLoaded();});}
			
			// click slide for next
			if (option.bigTarget) {				
				control.children().css({cursor: 'pointer'});
				control.children().click(function(){animate('next', effect);return false;});									
			}
			
			// generate pagination
			if (option.generatePagination) {
				if (option.prependPagination)
				{elem.prepend('<div class="slidenav"><div class="paginationwrap"><ul class='+ option.paginationClass +'></ul></div></div>');} 
				else{elem.append('<div class="slidenav"><div class="paginationwrap"><ul class='+ option.paginationClass +'></ul></div></div>');}
				control.children().each(function(){$('.' + option.paginationClass, elem).append('<li><a href="#'+ number +'"><span>Load carousel item '+ (number+1) +'</span></a></li>');number++;});
				$('.paginationwrap').prepend('<span class="prevwrap"><a href="#" class="prev"><span>Load previous</span></a></span>');
				$('.paginationwrap').append('<span class="nextwrap"><a href="#" class="next"><span>Load next</span></a></span>');
				$('.paginationwrap').after('<span class="pausewrap"><a href="#" class="pause"><span>Pause carousel</span></a></span>');
			} 
			
			// next button
			$('.' + option.next ,elem).click(function(e){
				e.preventDefault();
				if (option.play){pause();}
				ppause=false;
				animate('next', effect);
				ppause=true;
				playpause('play');
				return false;
			});
			
			// previous button
			$('.' + option.prev, elem).click(function(e){
				e.preventDefault();
				if (option.play){pause();}
				ppause=false;
				animate('prev', effect);
				ppause=true;
				playpause('play');
				return false;
			});
			
			// add current class to start slide pagination
			$('.' + option.paginationClass + ' li:eq('+ start +')', elem).addClass(option.currentClass);
			
			// click handling 
			$('.' + option.paginationClass + ' li a', elem ).click(function(){				
				if (option.play) {pause();}
				clicked = $(this).attr('href').match('[^#/]+$');
				if (current != clicked) {
					ppause=false;
					animate('pagination', paginationEffect, clicked);
					ppause=true;
					playpause('play');
				}return false;
			});
			
			// click handling 
			$('a.link', elem).click(function(){
				if (option.play) {pause();}
				clicked = $(this).attr('href').match('[^#/]+$') - 1;
				if (current != clicked) {
					ppause=false;
					animate('pagination', paginationEffect, clicked);
					ppause = true;
					playpause('play');
				}return false;
			});
			
			$('.pausewrap a').click(function(){if($(this).hasClass('pause')){ppause = true; playpause('play');}else{ppause = false; playpause('pause'); animate('next', effect);} return false;});
			
			$('.slide .content, .slide .content a').focus(function(){ ppause = true;playpause('play'); });
			
			// pause on mouseover
			if (option.hoverPause && option.play) {
				control.bind('mouseover',function(){stop();});
				control.bind('mouseleave',function(){					
					if(isinit){
						playInterval = setInterval(function(){
							if(pplay < (total+1))
							{animate('next', effect); pplay++;}
							else{playpause('play'); ppause = true; isinit = false; stop();}
						}, option.play);				
						elem.data('interval',playInterval);
					}
					else{pause();}});
			}
			
			//Init play
			if (option.play) {
				playInterval = setInterval(function(){
					if(pplay < (total+1))
					{animate('next', effect); pplay++; if(pplay == total){playpause('play');}}
					else{ppause = true; isinit = false; stop();}
				}, option.play);				
				elem.data('interval',playInterval);
			}			
		});
	};
	
	function playpause(action){		
		if(action=='play')
		{$('.pausewrap a').removeClass('pause').addClass('play').children('span').text('Play carousel animation');}
		else
		{$('.pausewrap a').removeClass('play').addClass('pause').children('span').text('Pause carousel animation');;}		
	};
		
	// default options
	$.fn.slides.option = {
		preload: false, 
		preloadImage: '/img/loading.gif', 		
		container: 'slides_container', 
		next: 'next', 
		prev: 'prev', 
		pagination: true, 
		generatePagination: true, 
		prependPagination: false, 
		paginationClass: 'pagination', 
		currentClass: 'current', 
		fadeSpeed: 500, 
		fadeEasing: '', 
		slideSpeed: 500, 
		slideEasing: '', 
		start: 1, 
		effect: 'slide', 
		crossfade: false, 
		play: 0, 
		pause: 0, 
		hoverPause: false, 
		autoHeight: false, 
		autoHeightSpeed: 350, 
		bigTarget: false, 
		animationStart: function(){}, 
		animationComplete: function(){}, 
		slidesLoaded: function(){}
	};
})(jQuery);
;
;(function($) {
    "use strict";	
    $.fn.bjqs = function(o) {		
		
		var new_width = 1250;
		if ($(window).width() < 1250) {new_width = $(window).width();}else {new_width;}
	    
        // slider default settings
        var defaults        = {
            // w + h to enforce consistency
			width           : new_width,
            height          : 438,
            // transition values
            animtype        : 'slide',
            animduration    : 800,      // length of transition
            animspeed       : 4000,     // delay between transitions
            automatic       : true,     // enable/disable automatic slide rotation
            // control and marker configuration
            showcontrols    : true,     // enable/disable next + previous UI elements
            centercontrols  : true,     // vertically center controls
            nexttext        : 'Next',   // text/html inside next UI element
            prevtext        : 'Prev',   // text/html inside previous UI element
            showmarkers     : true,     // enable/disable individual slide UI markers
            centermarkers   : true,     // horizontally center markers
            // interaction values
            keyboardnav     : true,     // enable/disable keyboard navigation
            hoverpause      : true,     // enable/disable pause slides on hover
            // presentation options
            usecaptions     : true,     // enable/disable captions using img title attribute
            randomstart     : false,     // start from a random slide
            responsive      : false     // enable responsive behaviour
        };

        // create settings from defaults and user options
        var settings        = $.extend({}, defaults, o);
        
		// slider elements
        var $wrapper        = this,
            $slider         = $wrapper.find('ul.bjqs'),
            $slides         = $slider.children('li'),
            // control elements
            $c_wrapper      = null,
            $c_fwd          = null,
            $c_prev         = null,
            // marker elements
            $m_wrapper      = null,
            $m_markers      = null,
            // elements for slide animation
            $canvas         = null,
            $clone_first    = null,
            $clone_last     = null;
        
		// state management object
        var state           = {
            slidecount      : $slides.length,   // total number of slides
            animating       : false,            // bool: is transition is progress
            paused          : false,            // bool: is the slider paused
            play			: true,				// bool false stops the loop cycle 
			currentstate	: 'play',			// if 'paused' manage state so clicks will animate but does not automate after click is handled
			currentslide    : 1,                // current slide being viewed (not 0 based)
            nextslide       : 0,                // slide to view next (not 0 based)
            currentindex    : 0,                // current slide being viewed (0 based)
            nextindex       : 0,                // slide to view next (0 based)
            interval        : null              // interval for automatic rotation
        };
        
		var responsive      = {
            width           : 1023,
            height          : null,
            ratio           : null
        };
        
		// helpful variables
        var vars            = {
            fwd             : 'forward',
            prev            : 'previous'
        };  
        
		// run through options and initialise settings
        var init = function() {
            // differentiate slider li from content li
            $slides.addClass('bjqs-slide');
            
			conf_responsive();
			
			// configurations only avaliable if more than 1 slide
			if( state.slidecount > 1 ){				
				conf_controls();
				conf_markers();
				conf_hoverpause();
				conf_slide();				
			}

			// slide components are hidden by default, show them now
			$slider.show();
			$slides.eq(state.currentindex).show();

			// Finally, if automatic is set to true, kick off the interval
			if(settings.automatic){
				state.interval = setInterval(function () {
				go(vars.fwd, false);
				}, settings.animspeed);
			}
        };
		
        var conf_responsive = function() {
			responsive.width    = $wrapper.parent('div').parent('div').outerWidth();			
			responsive.ratio    = responsive.width/settings.width,
			responsive.height   = settings.height * responsive.ratio;
			
            if(settings.animtype === 'slide'){
				conf_hoverpause();
				// initial setup
				$slides.css({'width' : settings.width});
				$slider.css({'width' : settings.width * settings.slidecount});
				$wrapper.css({'max-width' : settings.width, 'position' : 'relative'});

				if(responsive.width < settings.width){
					//$slides.css({'height' : responsive.height});
					//$slides.children('img').css({'height' : responsive.height});
					//$slider.css({'height' : responsive.height});
					//$wrapper.css({'height' : responsive.height});
				}
				
				conf_show_controls();
				
                $(window).resize(function() {
					var objs = '.row-1250, .slider, .bjqs-wrapper, .bjqs-slide';
					var objs_width = $('body').width();
					if(objs_width > 1250){objs_width=1250;}
					else if(objs_width < 990){objs_width = 990;}
					
					$(objs).css({'width':objs_width+'px' ,'max-width':objs_width+'px'});
					
					// calculate and update dimensions
					responsive.width    = objs_width;	//$wrapper.outerWidth();
					responsive.ratio    = responsive.width/settings.width;
					responsive.height   = settings.height * responsive.ratio;
					
					$slides.css({'width' : responsive.width});
					$slider.css({'width' : responsive.width * settings.slidecount});
					$wrapper.css({});					
					$canvas.css({'width' : responsive.width});
					
					resize_complete(function(){
						conf_show_controls();
						go(false,state.currentslide);
					}, 200, 'message');
                });
            }
        };

        var resize_complete = (function () {
            var timers = {};            
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();
		
        var conf_slide = function() {
            // create two extra elements which are clones of the first and last slides
            $clone_first    = $slides.eq(0).clone();
            $clone_last     = $slides.eq(state.slidecount-1).clone();

            // add them to the DOM where we need them
            $clone_first.attr({'data-clone' : 'last', 'data-slide' : 0}).appendTo($slider).show();
            $clone_last.attr({'data-clone' : 'first', 'data-slide' : 0}).prependTo($slider).show();

            // update the elements object
            $slides             = $slider.children('li');
            state.slidecount    = $slides.length;

            // create a 'canvas' element which is necessary for the slide animation to work
            $canvas = $('<div class="bjqs-wrapper"></div>');
			
            // if the slider is responsive && the calculated width is less than the max width
            if(settings.responsive && (responsive.width < settings.width)){
                $canvas.css({
                    'width'     : responsive.width,
                    'height'    : responsive.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                // update the dimensions to the slider to accommodate all the slides side by side
                $slider.css({
                    'width'     : responsive.width * (state.slidecount + 2),
                    'left'      : -responsive.width * state.currentslide
                });
            }
            else {
                $canvas.css({
                    'width'     : settings.width,
                    'height'    : settings.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                // update the dimensions to the slider to accomodate all the slides side by side
                $slider.css({
                    'width'     : settings.width * (state.slidecount + 2),
                    'left'      : -settings.width * state.currentslide
                });
            }

            // add some inline styles which will align our slides for left-right sliding
            $slides.css({
                'float'         : 'left',
                'position'      : 'relative',
                'display'       : 'list-item'
            });

			// 'everything.. in it's right place'
			//$canvas.prependTo($wrapper);
			//$slider.appendTo($canvas);
        };
		
		var conf_show_controls = function(){
			
			if(state.slidecount > 1 && responsive.width < 1024){	
				$('.bjqs-controls').css({'display':'none'});
				$('.bjqs-markers-ctrl').css({'display':'block'});
				$('.bjqs-markers-wrap').css({'left':'42px'})
			}
			else{
				$('.bjqs-controls').css({'display':'block'});
				$('.bjqs-markers-ctrl').css({'display':'none'});
				$('.bjqs-markers-wrap').css({'left':'155px'})
			}
		};
		
		var conf_controls = function() {
			$('.bjqs-controls.v-centered a').click(function(e){
				e.preventDefault();
				state.play = true;
				var direction = $(this).attr('data-direction');
				if(!state.animating){
					if(direction === vars.fwd){go(vars.fwd,false);}
					if(direction === vars.prev){go(vars.prev,false);}
				}				
				conf_playpause('pause');
				return false;
			});
		};

		var conf_markers = function() {
			// create a wrapper for our markers
			$m_wrapper = $('<ol class="bjqs-markers"></ol>');            
			
			// for every slide, create a marker
			$.each($slides, function(key, slide){
				var slidenum = key + 1, gotoslide   = key + 1;                
				
				// + 2 to account for clones
				if(settings.animtype === 'slide'){gotoslide = key + 2;}
				
				var marker = $('<li><a href="#"></a></li>');                
				
				// set the first marker to be active
				if(slidenum === state.currentslide){ marker.addClass('active-marker'); }
				
				// bind the click event
				marker.click(function(e){					
					e.preventDefault();
					state.play = true;					
					if(!state.animating && state.currentslide !== gotoslide){go(false,gotoslide);}
					conf_playpause('pause');				
					return false;
				});
				
				// add the marker to the wrapper
				marker.appendTo($m_wrapper);				
			});
            
            var owrap = '<div class="bjqs-markers-wrap"><div class="bjqs-markers-lists"></div></div>';
            $wrapper.append(owrap);
            
			var mprev = '<div class="bjqs-markers-ctrl bjqs-prev"><a data-direction="previous" href="#"><span>previous</span></a></div>';
			var mnext = '<div class="bjqs-markers-ctrl bjqs-next"><a data-direction="forward" href="#"><span>next</span></a></div>';            
			var mpp = '<div class="bjqs-markers-pp"><a href="#" class="pause"><span>pause</span></a></div>';
			
            $('.bjqs-markers-lists').prepend(mprev);
            $('.bjqs-markers-lists').append($m_wrapper);
			$('.bjqs-markers-lists').append(mnext);
			$('.bjqs-markers-wrap').append(mpp);
			
			$m_markers = $m_wrapper.find('li');            
            
			$('.bjqs-markers-ctrl a').live('click',function(e){				
				e.preventDefault();
				state.play = true;
				var direction = $(this).attr('data-direction');
				if(!state.animating){
					if(direction === vars.fwd){go(vars.fwd,false);}
					if(direction === vars.prev){go(vars.prev,false);}
				}				
				state.play = false;
				return false;
			});
			
			$('.bjqs-markers-pp a').live('click', function(){
				if($(this).hasClass('pause'))
				{conf_playpause('pause');}
				else
				{conf_playpause('play');}				
				return false;
			});
			
			// center the markers
			if (settings.centermarkers) {$m_wrapper.addClass('bulletnav');var offset = '';$m_wrapper.css('left', offset);}
        };
		
		var conf_playpause = function(action){
			if(action == 'play'){
				state.play = true;
				state.currentstate = 'play';
				$('.bjqs-markers-pp a').removeClass('play').addClass('pause');
			}
			else
			{				
				state.play = false;
				state.currentstate = 'pause';
				$('.bjqs-markers-pp a').removeClass('pause').addClass('play');
			}		
		};

        var conf_hoverpause = function() {
            $wrapper.hover(function () {
                if (!state.paused) {
                    clearInterval(state.interval);
                    state.paused = true;
                }
            }, function () {
                if (state.paused) {
                    state.interval = setInterval(function () {
                        go(vars.fwd, false);
                    }, settings.animspeed);
                    state.paused = false;
                }
            });
        };
		
		var conf_keynav = function() {

            $(document).keyup(function (event) {

                if (!state.paused) {
                    clearInterval(state.interval);
                    state.paused = true;
                }

                if (!state.animating) {
                    if (event.keyCode === 39) {
                        event.preventDefault();
                        go(vars.fwd, false);
                    } else if (event.keyCode === 37) {
                        event.preventDefault();
                        go(vars.prev, false);
                    }
                }

                if (state.paused && settings.automatic) {
                    state.interval = setInterval(function () {
                        go(vars.fwd);
                    }, settings.animspeed);
                    state.paused = false;
                }
            });
        };
		
        var set_next = function(direction) {
            if(direction === vars.fwd){
                if($slides.eq(state.currentindex).next().length){
                    state.nextindex = state.currentindex + 1;
                    state.nextslide = state.currentslide + 1;
                }
                else{
                    state.nextindex = 0;
                    state.nextslide = 1;
                }
            }
            else{
                if($slides.eq(state.currentindex).prev().length){
                    state.nextindex = state.currentindex - 1;
                    state.nextslide = state.currentslide - 1;
                }
                else{
                    state.nextindex = state.slidecount - 1;
                    state.nextslide = state.slidecount;
                }
            }
        };
        
        var go = function(direction, position) {			
			// only if we're not already doing things
			if(!state.animating && state.play){
				// doing things
                state.animating = true;
				
				if(position){
					state.nextslide = position;
					state.nextindex = position-1;}
				else{ set_next(direction);}
                
                // slide animation
                if(settings.animtype === 'slide'){
					
                    if(settings.showmarkers){
                        
                        var markerindex = state.nextindex-1;

                        if(markerindex === state.slidecount-2){
                            markerindex = 0;
                        }
                        else if(markerindex === -1){
                            markerindex = state.slidecount-3;
                        }

                        $m_markers.removeClass('active-marker');
                        $m_markers.eq(markerindex).addClass('active-marker');
                    }

                    // if the slider is responsive && the calculated width is less than the max width
                    if(settings.responsive && ( responsive.width < settings.width ) ){
                        state.slidewidth = responsive.width;
                    }
                    else{
                        state.slidewidth = settings.width;
                    }

                    $slider.animate({'left': -state.nextindex * state.slidewidth }, settings.animduration, function(){
                        state.currentslide = state.nextslide;
                        state.currentindex = state.nextindex;
                        
                        // is the current slide a clone?
                        if($slides.eq(state.currentindex).attr('data-clone') === 'last'){
                            // affirmative, at the last slide (clone of first)
                            $slider.css({'left': -state.slidewidth });
                            state.currentslide = 2;
                            state.currentindex = 1;

                        }
                        else if($slides.eq(state.currentindex).attr('data-clone') === 'first'){
                            // affirmative, at the fist slide (clone of last)
                            $slider.css({'left': -state.slidewidth *(state.slidecount - 2)});
                            state.currentslide = state.slidecount - 1;
                            state.currentindex = state.slidecount - 2;
                        }
                        state.animating = false;
                    });
                }
            }
        };
        
        init();
    };
})(jQuery);;
(function ($) {
  Drupal.royalmail2017 = Drupal.royalmail2017 || {};

  Drupal.behaviors.royalmailHelp = function (context) {
    // Add inline-style tooltips on form elements
    if (Drupal.settings.inlineHelp !== undefined) {
      $('input, select, textarea', context).not('.inline-tooltip-processed').each(function () {
        var el = $(this);
        // Grab the help button icon
        var helpIcon = el.siblings('.rmg_help_button');
        if (helpIcon.length) {
          // Grab the content
          var helpElement = helpIcon.children('span'),
              helpText = helpElement.text();
          // Create the tooltip
          el.tooltip({
              className: 'inline',
              inline: true,
              bodyHandler: function () {
                return helpText;
              },
              showURL: false
          });

          // Add ARIA roles to help element.
          helpElement.attr({
            'role' : 'tooltip',
            'aria-hidden' : true
          })
          .addClass('visuallyhidden');

          // Add ARIA described-by role to input and add the help element.
          el.attr('aria-describedby', helpElement.attr('id')).after(helpElement);

          // This tooltip triggers on clicking the element - this is set in
          // jquery.tooltip.js - we need to also bind the focus and blur events
          // for keyboard accessibility.
          el.focus(function () {
            $('#tooltip').removeClass('reverse').removeClass('default');
            el.trigger('click.tooltip');
            Drupal.royalmail2017.setTooltipPosition(el, 'inline');
            if (this.getAttribute('aria-describedby')) {
              $('#' + this.getAttribute('aria-describedby')).attr('aria-hidden', false);
            }
          })
          .blur(function () {
            $('#tooltip').removeClass('reverse').removeClass('default');
            if (this.getAttribute('aria-describedby')) {
              $('#' + this.getAttribute('aria-describedby')).attr('aria-hidden', true);
            }
          });
          // As the event handler is a click, buttons and submit buttons can't
          // really have tooltips on them because the focus triggers a click.
          if (el.is('input[type="submit"]') || el.is('button')) {
            el.unbind('click.tooltip');
          }
          // Remove the original icon.
          helpIcon.remove();
        }
      }).addClass('inline-tooltip-processed');
    }

      // Add tooltips to 'i' icons
      $('a.rmg_help_button, .tabcontent a.help', context)
        .focus(function () {
          $('#tooltip').removeClass('reverse').removeClass('default');
          Drupal.royalmail2017.setTooltipPosition($(this), '');
          $(this).mouseover();
        })
        .blur(function () {
          $('#tooltip').removeClass('reverse').removeClass('default');
          $(this).mouseout();
        })
        .click(function (e) {
          e.preventDefault();
        })
        .each(function (i) {
          var helpText = $(this).find(".help_text").text();
          if (helpText) {
            $(this).tooltip({
              top: 0,
              left: 20,
              bodyHandler: function () {
                return helpText;
              },
              showURL: false
            });
          }
        });

      // email, print and share
      $('.eps a', context)
        .tooltip({
          top: -70,
          left: 0,
          className: '',
          inline: false,
          bodyHandler: function () {
            return $($(this).find("span")).html();
          },
          showURL: false
        })
        .focus(function () {
          $('#tooltip').removeClass('reverse').removeClass('default').css({'display': 'none'});
          Drupal.royalmail2017.setTooltipPosition($(this), '');
          $(this).mouseover();
        })
        .blur(function () {
          $('#tooltip').removeClass('reverse').removeClass('default').css({'display': 'none'});
        })
        .click(function () {
          $('#tooltip').removeClass('reverse').removeClass('default').css({'display': 'none'});
        });

      $('.fivestar ul li a').tooltip({top: -70, left: 0, bodyHandler: function () {
          var pos = $(this).position();
          return $($(this).find("span")).html();
      }, showURL: false})
        .focus(function () {
          $('#tooltip').removeClass('reverse').removeClass('default').css({'display': 'none'});
          Drupal.royalmail2017.setTooltipPosition($(this), '');
          $(this).mouseover();
        })
        .blur(function () {
          $('#tooltip').removeClass('reverse').removeClass('default').css({'display': 'none'});
        }
      );
  };

  /**
  * Sets the position of the tooltip element. The plugin doesn't handle focus
  * events, so this is needed to set the tooltip position.
  *
  * @param element - jQuery object
  * @param type - which tooltip style we are applying
  */
  Drupal.royalmail2017.setTooltipPosition = function (element, type) {
    var pos = element.offset(), left, top,
        tooltip = $('#tooltip');

    switch (type) {
      case 'inline':
        var tipHeight = tooltip.outerHeight(),
            elHeight = element.outerHeight();
        left = pos['left'] + element.width();
        // Position the tooltip in the vertical centre of the input element
        // according to the height of the tooltip and input element.
        top = pos['top'] - (tipHeight) + (tipHeight / 2) + (elHeight / 2);
        break;
      default:
        left = pos['left'] + 10;
        top = pos['top'] - 60;
        break;
    }

    tooltip.css({left: left, top: top});
  };
})(jQuery);
;
(function($){ 
	/* hoverIntent by Brian Cherne */
	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 5,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// next three lines copied from jQuery.hover, ignore children onMouseOver/onMouseOut
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }

			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// else e.type == "onmouseover"
			if (e.type == "mouseover") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "onmouseout"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.mouseover(handleHover).mouseout(handleHover);
	};
	
})(jQuery);;
/* jQuery Easing v1.1.1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 * Uses the built in easing capabilities added in jQuery 1.1
 * to offer multiple easing options
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php */ 
jQuery.extend(jQuery.easing,{easein:function(e,a,b,c,d){return c*(a/=d)*a+b},easeinout:function(f,c,e,b,a){if(c<a/2)return 2*b*c*c/(a*a)+e;var d=c-a/2;return-2*b*d*d/(a*a)+2*b*d/a+b/2+e},easeout:function(e,b,d,c,a){return-c*b*b/(a*a)+2*c*b/a+d},expoin:function(f,e,c,a,d){var b=1;if(a<0){b*=-1;a*=-1}return b*Math.exp(Math.log(a)/d*e)+c},expoout:function(f,e,d,a,c){var b=1;if(a<0){b*=-1;a*=-1}return b*(-Math.exp(-Math.log(a)/c*(e-c))+a+1)+d},expoinout:function(f,d,e,a,b){var c=1;if(a<0){c*=-1;a*=-1}return d<b/2?c*Math.exp(Math.log(a/2)/(b/2)*d)+e:c*(-Math.exp(-2*Math.log(a/2)/b*(d-b))+a+1)+e},bouncein:function(e,d,c,a,b){return a-jQuery.easing.bounceout(e,b-d,0,a,b)+c},bounceout:function(g,a,d,e,f){var c=7.5625,b=2.75;return(a/=f)<1/b?e*c*a*a+d:a<2/b?e*(c*(a-=1.5/b)*a+.75)+d:a<2.5/b?e*(c*(a-=2.25/b)*a+.9375)+d:e*(c*(a-=2.625/b)*a+.984375)+d},bounceinout:function(e,c,d,b,a){return c<a/2?jQuery.easing.bouncein(e,c*2,0,b,a)*.5+d:jQuery.easing.bounceout(e,c*2-a,0,b,a)*.5+b*.5+d},elasin:function(h,d,e,a,f){var g=1.70158,b=0,c=a;if(d==0)return e;if((d/=f)==1)return e+a;if(!b)b=f*.3;if(c<Math.abs(a)){c=a;var g=b/4}else var g=b/(2*Math.PI)*Math.asin(a/c);return-(c*Math.pow(2,10*(d-=1))*Math.sin((d*f-g)*2*Math.PI/b))+e},elasout:function(h,d,e,a,f){var g=1.70158,b=0,c=a;if(d==0)return e;if((d/=f)==1)return e+a;if(!b)b=f*.3;if(c<Math.abs(a)){c=a;var g=b/4}else var g=b/(2*Math.PI)*Math.asin(a/c);return c*Math.pow(2,-10*d)*Math.sin((d*f-g)*2*Math.PI/b)+a+e},elasinout:function(h,a,e,b,f){var g=1.70158,c=0,d=b;if(a==0)return e;if((a/=f/2)==2)return e+b;if(!c)c=f*.3*1.5;if(d<Math.abs(b)){d=b;var g=c/4}else var g=c/(2*Math.PI)*Math.asin(b/d);return a<1?-.5*d*Math.pow(2,10*(a-=1))*Math.sin((a*f-g)*2*Math.PI/c)+e:d*Math.pow(2,-10*(a-=1))*Math.sin((a*f-g)*2*Math.PI/c)*.5+b+e},backin:function(f,a,c,d,e){var b=1.70158;return d*(a/=e)*a*((b+1)*a-b)+c},backout:function(f,a,c,d,e){var b=1.70158;return d*((a=a/e-1)*a*((b+1)*a+b)+1)+c},backinout:function(f,a,c,d,e){var b=1.70158;return(a/=e/2)<1?d/2*a*a*(((b*=1.525)+1)*a-b)+c:d/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)+c}});
;
/* jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.*/
 
 /*****UPDATE - http://groups.google.com/group/jscrollpane/browse_thread/thread/694dbfa054bc27b2 $('html').unbind has been chained to work with jquery 1.2.6 ******/

(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var az,Q=this,Y,ak,v,am,T,Z,y,q,aA,aF,av,i,I,h,j,aa,U,aq,X,t,A,ar,af,an,G,l,au,ay,x,aw,aI,f,L,aj=true,P=true,aH=false,k=false,ap=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";aI=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0);function at(aR){var aM,aO,aN,aK,aJ,aQ,aP=false,aL=false;az=aR;if(Y===c){aJ=D.scrollTop();aQ=D.scrollLeft();D.css({overflow:"hidden",padding:0});ak=D.innerWidth()+f;v=D.innerHeight();D.width(ak);Y=b('<div class="jspPane" />').css("padding",aI).append(D.children());am=b('<div class="jspContainer" />').css({width:ak+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aP=az.stickToBottom&&K();aL=az.stickToRight&&B();aK=D.innerWidth()+f!=ak||D.outerHeight()!=v;if(aK){ak=D.innerWidth()+f;v=D.innerHeight();am.css({width:ak+"px",height:v+"px"})}if(!aK&&L==T&&Y.outerHeight()==Z){D.width(ak);return}L=T;Y.css("width","");D.width(ak);am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aR.contentWidth){T=aR.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/ak;q=Z/v;aA=q>1;aF=y>1;if(!(aF||aA)){D.removeClass("jspScrollable");Y.css({top:0,width:am.width()-f});n();E();R();w();ai()}else{D.addClass("jspScrollable");aM=az.maintainPosition&&(I||aa);if(aM){aO=aD();aN=aB()}aG();z();F();if(aM){N(aL?(T-ak):aO,false);M(aP?(Z-v):aN,false)}J();ag();ao();if(az.enableKeyboardNavigation){S()}if(az.clickOnTrack){p()}C();if(az.hijackInternalLinks){m()}}if(az.autoReinitialise&&!aw){aw=setInterval(function(){at(az)},az.autoReinitialiseDelay)}else{if(!az.autoReinitialise&&aw){clearInterval(aw)}}aJ&&D.scrollTop(0)&&M(aJ,false);aQ&&D.scrollLeft(0)&&N(aQ,false);D.trigger("jsp-initialised",[aF||aA])}function aG(){if(aA){am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=am.find(">.jspVerticalBar");aq=U.find(">.jspTrack");av=aq.find(">.jspDrag");if(az.showArrows){ar=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aE(0,-1)).bind("click.jsp",aC);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aE(0,1)).bind("click.jsp",aC);if(az.arrowScrollOnHover){ar.bind("mouseover.jsp",aE(0,-1,ar));af.bind("mouseover.jsp",aE(0,1,af))}al(aq,az.verticalArrowPositions,ar,af)}t=v;am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});av.hover(function(){av.addClass("jspHover")},function(){av.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);av.addClass("jspActive");var s=aJ.pageY-av.position().top;b("html").bind("mousemove.jsp",function(aK){V(aK.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});o()}}function o(){aq.height(t+"px");I=0;X=az.verticalGutter+aq.outerWidth();Y.width(ak-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aF){am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));an=am.find(">.jspHorizontalBar");G=an.find(">.jspTrack");h=G.find(">.jspDrag");if(az.showArrows){ay=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aE(-1,0)).bind("click.jsp",aC);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aE(1,0)).bind("click.jsp",aC);
if(az.arrowScrollOnHover){ay.bind("mouseover.jsp",aE(-1,0,ay));x.bind("mouseover.jsp",aE(1,0,x))}al(G,az.horizontalArrowPositions,ay,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aJ){b("html").bind("dragstart.jsp selectstart.jsp",aC);h.addClass("jspActive");var s=aJ.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aK){W(aK.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",ax);return false});l=am.innerWidth();ah()}}function ah(){am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aF&&aA){var aJ=G.outerHeight(),s=aq.outerWidth();t-=aJ;b(an).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;ak-=aJ;G.parent().append(b('<div class="jspCorner" />').css("width",aJ+"px"));o();ah()}if(aF){Y.width((am.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aF){au=Math.ceil(1/y*l);if(au>az.horizontalDragMaxWidth){au=az.horizontalDragMaxWidth}else{if(au<az.horizontalDragMinWidth){au=az.horizontalDragMinWidth}}h.width(au+"px");j=l-au;ae(aa)}if(aA){A=Math.ceil(1/q*t);if(A>az.verticalDragMaxHeight){A=az.verticalDragMaxHeight}else{if(A<az.verticalDragMinHeight){A=az.verticalDragMinHeight}}av.height(A+"px");i=t-A;ad(I)}}function al(aK,aM,aJ,s){var aO="before",aL="after",aN;if(aM=="os"){aM=/Mac/.test(navigator.platform)?"after":"split"}if(aM==aO){aL=aM}else{if(aM==aL){aO=aM;aN=aJ;aJ=s;s=aN}}aK[aO](aJ)[aL](s)}function aE(aJ,s,aK){return function(){H(aJ,s,this,aK);this.blur();return false}}function H(aM,aL,aP,aO){aP=b(aP).addClass("jspActive");var aN,aK,aJ=true,s=function(){if(aM!==0){Q.scrollByX(aM*az.arrowButtonSpeed)}if(aL!==0){Q.scrollByY(aL*az.arrowButtonSpeed)}aK=setTimeout(s,aJ?az.initialDelay:az.arrowRepeatFreq);aJ=false};s();aN=aO?"mouseout.jsp":"mouseup.jsp";aO=aO||b("html");aO.bind(aN,function(){aP.removeClass("jspActive");aK&&clearTimeout(aK);aK=null;aO.unbind(aN)})}function p(){w();if(aA){aq.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageY-aP.top-I,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageY-aS.top-A/2,aQ=v*az.scrollPagePercent,aR=i*aQ/(Z-v);if(aN<0){if(I-aR>aT){Q.scrollByY(-aQ)}else{V(aT)}}else{if(aN>0){if(I+aR<aT){Q.scrollByY(aQ)}else{V(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}if(aF){G.bind("mousedown.jsp",function(aO){if(aO.originalTarget===c||aO.originalTarget==aO.currentTarget){var aM=b(this),aP=aM.offset(),aN=aO.pageX-aP.left-aa,aK,aJ=true,s=function(){var aS=aM.offset(),aT=aO.pageX-aS.left-au/2,aQ=ak*az.scrollPagePercent,aR=j*aQ/(T-ak);if(aN<0){if(aa-aR>aT){Q.scrollByX(-aQ)}else{W(aT)}}else{if(aN>0){if(aa+aR<aT){Q.scrollByX(aQ)}else{W(aT)}}else{aL();return}}aK=setTimeout(s,aJ?az.initialDelay:az.trackClickRepeatFreq);aJ=false},aL=function(){aK&&clearTimeout(aK);aK=null;b(document).unbind("mouseup.jsp",aL)};s();b(document).bind("mouseup.jsp",aL);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(aq){aq.unbind("mousedown.jsp")}}function ax(){b("html").unbind("dragstart.jsp").unbind("selectstart.jsp").unbind("mousemove.jsp").unbind("mouseup.jsp").unbind("mouseleave.jsp");if(av){av.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aJ){if(!aA){return}if(s<0){s=0}else{if(s>i){s=i}}if(aJ===c){aJ=az.animateScroll}if(aJ){Q.animate(av,"top",s,ad)}else{av.css("top",s);ad(s)}}function ad(aJ){if(aJ===c){aJ=av.position().top}am.scrollTop(0);I=aJ;var aM=I===0,aK=I==i,aL=aJ/i,s=-aL*(Z-v);if(aj!=aM||aH!=aK){aj=aM;aH=aK;D.trigger("jsp-arrow-change",[aj,aH,P,k])}u(aM,aK);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aM,aK]).trigger("scroll")}function W(aJ,s){if(!aF){return}if(aJ<0){aJ=0}else{if(aJ>j){aJ=j}}if(s===c){s=az.animateScroll}if(s){Q.animate(h,"left",aJ,ae)
}else{h.css("left",aJ);ae(aJ)}}function ae(aJ){if(aJ===c){aJ=h.position().left}am.scrollTop(0);aa=aJ;var aM=aa===0,aL=aa==j,aK=aJ/j,s=-aK*(T-ak);if(P!=aM||k!=aL){P=aM;k=aL;D.trigger("jsp-arrow-change",[aj,aH,P,k])}r(aM,aL);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aM,aL]).trigger("scroll")}function u(aJ,s){if(az.showArrows){ar[aJ?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aJ,s){if(az.showArrows){ay[aJ?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aJ){var aK=s/(Z-v);V(aK*i,aJ)}function N(aJ,s){var aK=aJ/(T-ak);W(aK*j,s)}function ab(aW,aR,aK){var aO,aL,aM,s=0,aV=0,aJ,aQ,aP,aT,aS,aU;try{aO=b(aW)}catch(aN){return}aL=aO.outerHeight();aM=aO.outerWidth();am.scrollTop(0);am.scrollLeft(0);while(!aO.is(".jspPane")){s+=aO.position().top;aV+=aO.position().left;aO=aO.offsetParent();if(/^body|html$/i.test(aO[0].nodeName)){return}}aJ=aB();aP=aJ+v;if(s<aJ||aR){aS=s-az.verticalGutter}else{if(s+aL>aP){aS=s-v+aL+az.verticalGutter}}if(aS){M(aS,aK)}aQ=aD();aT=aQ+ak;if(aV<aQ||aR){aU=aV-az.horizontalGutter}else{if(aV+aM>aT){aU=aV-ak+aM+az.horizontalGutter}}if(aU){N(aU,aK)}}function aD(){return -Y.position().left}function aB(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aB()<10)}function B(){var s=T-ak;return(s>20)&&(s-aD()<10)}function ag(){am.unbind(ac).bind(ac,function(aM,aN,aL,aJ){var aK=aa,s=I;Q.scrollBy(aL*az.mouseWheelSpeed,-aJ*az.mouseWheelSpeed,false);return aK==aa&&s==I})}function n(){am.unbind(ac)}function aC(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aJ,aL=[];aF&&aL.push(an[0]);aA&&aL.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aO){if(aO.target!==this&&!(aL.length&&b(aO.target).closest(aL).length)){return}var aN=aa,aM=I;switch(aO.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aO.keyCode;aK();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aJ=aO.keyCode==s&&aN!=aa||aM!=I;return !aJ}).bind("keypress.jsp",function(aM){if(aM.keyCode==s){aK()}return !aJ});if(az.hideFocus){D.css("outline","none");if("hideFocus" in am[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in am[0]){D.attr("hideFocus",false)}}function aK(){var aN=aa,aM=I;switch(s){case 40:Q.scrollByY(az.keyboardSpeed,false);break;case 38:Q.scrollByY(-az.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*az.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*az.scrollPagePercent,false);break;case 39:Q.scrollByX(az.keyboardSpeed,false);break;case 37:Q.scrollByX(-az.keyboardSpeed,false);break}aJ=aN!=aa||aM!=I;return aJ}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aL,aJ,aK=escape(location.hash);try{aL=b(aK)}catch(s){return}if(aL.length&&Y.find(aK)){if(am.scrollTop()===0){aJ=setInterval(function(){if(am.scrollTop()>0){ab(aK,true);b(document).scrollTop(am.position().top);clearInterval(aJ)}},50)}else{ab(aK,true);b(document).scrollTop(am.position().top)}}}}function ai(){b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")}function m(){ai();b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),aJ;if(s.length>1){aJ=s[1];if(aJ.length>0&&Y.find("#"+aJ).length>0){ab("#"+aJ,true);return false}}})}function ao(){var aK,aJ,aM,aL,aN,s=false;am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aO){var aP=aO.originalEvent.touches[0];aK=aD();aJ=aB();aM=aP.pageX;aL=aP.pageY;aN=false;s=true}).bind("touchmove.jsp",function(aR){if(!s){return}var aQ=aR.originalEvent.touches[0],aP=aa,aO=I;Q.scrollTo(aK+aM-aQ.pageX,aJ+aL-aQ.pageY);aN=aN||Math.abs(aM-aQ.pageX)>5||Math.abs(aL-aQ.pageY)>5;
return aP==aa&&aO==I}).bind("touchend.jsp",function(aO){s=false}).bind("click.jsp-touchclick",function(aO){if(aN){aN=false;return false}})}function g(){var s=aB(),aJ=aD();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ap.append(Y.children()));ap.scrollTop(s);ap.scrollLeft(aJ)}b.extend(Q,{reinitialise:function(aJ){aJ=b.extend({},az,aJ);at(aJ)},scrollToElement:function(aK,aJ,s){ab(aK,aJ,s)},scrollTo:function(aK,s,aJ){N(aK,aJ);M(s,aJ)},scrollToX:function(aJ,s){N(aJ,s)},scrollToY:function(s,aJ){M(s,aJ)},scrollToPercentX:function(aJ,s){N(aJ*(T-ak),s)},scrollToPercentY:function(aJ,s){M(aJ*(Z-v),s)},scrollBy:function(aJ,s,aK){Q.scrollByX(aJ,aK);Q.scrollByY(s,aK)},scrollByX:function(s,aK){var aJ=aD()+Math[s<0?"floor":"ceil"](s),aL=aJ/(T-ak);W(aL*j,aK)},scrollByY:function(s,aK){var aJ=aB()+Math[s<0?"floor":"ceil"](s),aL=aJ/(Z-v);V(aL*i,aK)},positionDragX:function(s,aJ){W(s,aJ)},positionDragY:function(aJ,s){V(aJ,s)},animate:function(aJ,aM,s,aL){var aK={};aK[aM]=s;aJ.animate(aK,{duration:az.animateDuration,easing:az.animateEase,queue:false,step:aL})},getContentPositionX:function(){return aD()},getContentPositionY:function(){return aB()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aD()/(T-ak)},getPercentScrolledY:function(){return aB()/(Z-v)},getIsScrollableH:function(){return aF},getIsScrollableV:function(){return aA},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:function(){m()},destroy:function(){g()}});at(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}})(jQuery,this);

/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 * Version: 3.0.4 * Requires: 1.2.2+*/
(function($){var c=['DOMMouseScroll','mousewheel'];$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=c.length;i;){this.addEventListener(c[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=c.length;i;){this.removeEventListener(c[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}});function handler(a){var b=a||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;a=$.event.fix(b);a.type="mousewheel";if(a.wheelDelta){delta=a.wheelDelta/120}if(a.detail){delta=-a.detail/3}deltaY=delta;if(b.axis!==undefined&&b.axis===b.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta}if(b.wheelDeltaY!==undefined){deltaY=b.wheelDeltaY/120}if(b.wheelDeltaX!==undefined){deltaX=-1*b.wheelDeltaX/120}args.unshift(a,delta,deltaX,deltaY);
return $.event.handle.apply(this,args)}})(jQuery);

;

function ietidy() {
  var bwidth = $('body').width();
  if ($('body').hasClass('ie7') || $('body').hasClass('ie8')) {
    if (bwidth < 1025) {
      $('.row-940').css({'width':'940px'});
      $('.cookie-content a.close').css({'right':'30px'});
    }
    else {
      $('.cookie-content a.close').css({'right':'0'});
    }
  }
}

function eqheight(objs, refs) {
  var height = 0;
  var str = '';
  $(objs + ' ' + refs).each(function (e) {
    if ($(this).height() >= height) {
      height = $(this).height();
    }
  });
  $(objs + ' ' + refs).css({'height':height + 'px'});
}

function browser() {
  var ua = navigator.userAgent.toLowerCase();

  var checker = {
    ipad:ua.match(/(ipad)/),
    iphone:ua.match(/(iphone|ipod)/),
    blackberry:ua.match(/blackberry/),
    android:ua.match(/android/)};

  //Get Device
  $.browser.device = 'desktop';
  if (checker.android) {
    $.browser.device = 'android';
  }
  else {
    if (checker.iphone) {
      $.browser.device = 'iphone';
    }
    else {
      if (checker.ipad) {
        $.browser.device = 'ipad';
      }
      else {
        if (checker.blackberry) {
          $.browser.device = 'blackberry';
        }
      }
    }
  }

  //Get name
  var name = '';
  if ($.browser.msie) {
    name = 'msie';
  }
  else {
    if ($.browser.mozilla) {
      name = 'mozilla';
    }
    else {
      if (/chrome/.test(ua.toLowerCase())) {
        name = 'chrome';
      }
      else {
        if (/webkit/.test(ua.toLowerCase())) {
          name = 'wkit';
        }
        else {
          if ($.browser.webkit) {
            name = 'wkit';
          }
          else {
            if ($.browser.opera) {
              name = 'opera';
            }
          }
        }
      }
    }
  }
  $.browser.name = name;

  if (/mac os/.test(ua.toLowerCase())) {
    $('BODY').addClass('macos');
  }

  //Get version
  var version = $.browser.version;
  $.browser.version = version;

  //Add class
  $('BODY').addClass($.browser.name).addClass($.browser.device);
}

(function ($) {
  $.fn.Cookie = function () {
    $(this).click(function (event) {
      event.preventDefault();
      var $cookies = $('#block-cookie_policy-0');
      //Use existing theme class to hide cookie policy
      $cookies.addClass('display_none');
    });
  }
})(jQuery);

//ACCORDIAN
(function ($) {
  $.fn.Accordian = function () {
    $('div').removeClass('leftsidebar_default rightsidebar_default');
    if ($('body').hasClass('ie7')) {
      $('.acc_trigger').mouseenter(function () {
        $(this).addClass('hover');
      }).mouseleave(function () {
        $(this).removeClass('hover');
      });
    }

    // This piece of code is responsible for jumping to specific accordion
    // with expanded state based on anchor name. name property is added on
    // anchor tag linked to accordions to identify them.
    var loc = window.location.href;
    var search_anchor_name = loc.search('#');
    var accordion_anchor_name, accordion_object;
    if (search_anchor_name > 0) {
      accordion_anchor_name = loc.slice(search_anchor_name+1);
      // $('body').find( specifically excludes the possibility of creating a new
      // HTML element, thus closing an XSS security hole.
      accordion_object = $('body').find("a[name='" + accordion_anchor_name + "']");
      accordion_object.attr({"aria-expanded":"true"});
      //Aria code added by Capgemini, please do not remove or take into account when making changes
      accordion_object.parent().parent().addClass('active').children('div.acc_container').attr({"aria-hidden":"false"});
    }

    $('.accordion li:not(.active) .acc_container').hide();

    // Scroll the page to respective anchor name;
    if (typeof accordion_object === 'object' && accordion_object.length) {
      var scroll_to = parseInt(accordion_object.offset().top);
      $(document).scrollTop(scroll_to);
    }

    $(this).once().click(function () {
      //Aria code added by Capgemini, please do not remove or take into account when making changes
      $(this).attr({"aria-expanded":"true"});
      if ($(this).parent().parent().children('div.acc_container').is(':hidden')) {
        //Aria code added by Capgemini, please do not remove or take into account when making changes
        $(this).parent().parent().addClass('active').children('div.acc_container').attr({"aria-hidden":"false"});
        $(this).parent().parent().addClass('active').children('div.acc_container').slideDown();
      }
      else {
        //Aria code added by Capgemini, please do not remove or take into account when making changes
        $(this).attr({"aria-expanded":"false"});
        $(this).parent().parent().removeClass('active').children('div.acc_container').attr({"aria-hidden":"true"});
        $(this).parent().parent().removeClass('active').children('div.acc_container').slideUp();
      }
      return false;
    });
  }
})(jQuery);

(function ($) {
  $.fn.Shad = function () {
    $(this).click(function () {
      $('#sb-wrapper')
      if ($(this).parent().children('div').hasClass('transcript-link')) {
        $('#sb-wrapper .transcript-link').html(($(this).parent().children('.transcript-link').html()));

      }

      $('#sb-nav-close').bind("click", function () {
        $('.transcript-link black-arrow-right').focus(function () {
          css('border', '1px solid lime');
        });
      });
    });
  }
})(jQuery);

//TABBED TOOLS
(function ($) {
  $.fn.Tabs = function () {
    $('.tabs').css({'display':'block'});
    $('.tabs .tabcontent.first').css({'visibility':'visible'});

    //Set the height of the container as the height of first tab on page load.
    //This is done to override the height being set through CSS.
    var height = $(document).find('.first.tabcontent').height();
    $(document).find('.tabscontainer').css({'height':height + 'px'});

    $(this).click(function (e) {
      var href,
        $tab = $(this),
        $tabs = $tab.parents('.tabs');

      if (!$tab.parent().hasClass('active')) {
        // Get the href and content height of the clicked tab
        href = '.tool-' + $tab.attr('href').replace(/\D/g, '');
        height = $tabs.find(href).height();
        // Set the classes on the tabs
        $tab.parents('ul').children('li').removeClass('active');
        $tab.parent().addClass('active');
        //Aria code added by Capgemini, please do not remove or take into account when making changes
        $tab.parents('ul').children('li').children('a').attr({"aria-expanded":"false"});
        $tab.parent().children('a').attr({"aria-expanded":"true"});
        // Set the height of the container to the active tab content's height
        $tabs.find('.tabscontainer').css({'height':height + 'px'});
        // Toggle visibility of tab content
        $tabs.find('.tabcontent').css({'visibility':'hidden', 'display':'none'}).parent().attr({"aria-hidden":"true"});
        $tabs.find(href).css({'visibility':'visible', 'display':'block', 'left':0, 'top':0}).parent().attr({"aria-hidden":"false"});
      }
      e.preventDefault();
    });
  }
})(jQuery);

//Set the height of the container as the height of first tab on page load.
//This is done to override the height being set through CSS.
$(document).ready(function() {
  var height = $(this).find('.first.tabcontent').height();
  $(this).find('.tabscontainer').css({'height':height + 'px'});
});

//Promo carousel
//Adapted by Capgemini, please review any changes to this function
(function ($) {
  $.fn.Carousel = function () {
    var timer = setInterval(auto_rotate, 7000);
    var lastSlide = $('.promo-nav li').length - 1;

    $('.promo-nav').show();

    function auto_rotate() {
      var id = 0;

      $('.promo-nav').find('li').each(function (index) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $(this).next().addClass('active');
          // are we on the last slide?
          if ($(this).next().length == 0) {
            id = $('.promo-nav').find('li:first-child').index();
            $('.promo-nav').find('li:first-child').addClass('active');

            $(this).parent().parent().parent().siblings().children('.views-row').css({'display':'none'});
            $(this).parent().parent().parent().siblings().children('.views-row').eq(id).css({'display':'block'});
            // stop once we've looped all the way through
            if (index == lastSlide) {
              clearInterval(timer);
            }
            return false;
          }
          else {

            id = $(this).next().index();
            $(this).parent().parent().parent().siblings().children('.views-row').css({'display':'none'});
            $(this).parent().parent().parent().siblings().children('.views-row').eq(id).css({'display':'block'});
            // stop once we've looped all the way through
            if (index == lastSlide) {
              clearInterval(timer);
            }
            return false;
          }
        }
      });
    }

    $('.promo-carousel, .promo-nav').hover(function () {
      clearInterval(timer);
    }, function () {
      return false;
    });

    $('.prev a').click(function () {
      var previous = $(this).parent().siblings('ul').children('li.active').prev().index();
      if ($(this).parent().siblings('ul').children('li').hasClass('active')) {
        if (previous > -1) {
          $(this).parent().siblings('ul').children('li').removeClass('active').eq(previous).addClass('active');
          $(this).parent().parent().parent().siblings().children('.views-row').css({'display':'none'});
          $(this).parent().parent().parent().siblings().children('.views-row').eq(previous).css({'display':'block'});
        }
        return false;
      }
    });

    $('.next a').click(function () {
      var next = $(this).parent().siblings('ul').children('li.active').next().index();
      if ($(this).parent().siblings('ul').children('li').hasClass('active')) {
        if (next > 0 && next <= lastSlide) {
          $(this).parent().siblings('ul').children('li').removeClass('active').eq(next).addClass('active').children();
          $(this).parent().parent().parent().siblings().children('.views-row').css({'display':'none'});
          $(this).parent().parent().parent().siblings().children('.views-row').eq(next).css({'display':'block'});
        }
        return false;
      }
    });

    $(this).click(function () {
      var showid = 0;
      if (!$(this).parent().hasClass('active')) {
        showid = $(this).parent('li').index();
        $(this).parent().parent().children('li').removeClass('active');
        $(this).parent().addClass('active');
        $(this).parent().parent().parent().parent().siblings().children('.views-row').css({'display':'none'});
        $(this).parent().parent().parent().parent().siblings().children('.views-row').eq(showid).css({'display':'block'});
      }
      return false;
    });
  }
})(jQuery);

//MY ACCOUNT LOGIN
//Aria code added by Capgemini, please do not remove or take into account when making changes
(function ($) {
  var isVisible = false;

  $.fn.Login = function () {
    var login, account;

    $('body').prepend('<span class="login-overlay"></span>');
    $('.login-overlay').css({height:$(document).height() + 100});

    // Element that contains account, and acts as a button to show & hide account.
    login = $('.overlay-menu');

    // Dropdown overlay that is hidden & shown.
    account = $('.my-account', login);

    // Prevent clicking on overlay from bubbling an event to document.
    account.click(function (ev) {
      ev.stopPropagation();
    });

    login.click(function (ev) {
      if (account.is(':visible')) {
        unbindAccountLoginClickFromDocument();
        hideAccount();
        isVisible = false;
      }
      else {
        showAccount();
        isVisible = true;

        setTimeout(function () {
          bindAccountLoginClickToDocument();
        }, 1);
      }

      $('.overlay-menu__overlay-toggle').toggleClass('toggled');
      $('.overlay-menu__overlay-toggle').toggleClass('hidden');

      ev.preventDefault();
    });

    $('.my-account .close').click(function () {
      account.css("display", "block");
      login.children('a').attr({"aria-expanded":"false"});
      account.attr({"aria-hidden":"true"});
      isVisible = true;
      $('.top-search .search-input').focus();

      if (!$('body').hasClass('ie8')) {
        $('.login-overlay-box').hide();
        $('#nav').css({'z-index':'15'});
      }

      return false;
    });

    $(document).bind('keyup.accountLogin', keyup);

    function keyup (e) {
      // has the user pressed escape?
      if (e.keyCode == 27) {
        if (isVisible === true) {
          unbindAccountLoginClickFromDocument();
          hideAccount();
          isVisible = false;
          $('.overlay-menu__overlay-toggle').removeClass('toggled');
          $('.overlay-menu__overlay-toggle').addClass('hidden');
      }
      }
      // has the user pressed enter?
      else {
        if (e.keyCode == 13) {
          setTimeout(function () {
            setFocus();
          }, 800);
        }
      }

      function setFocus () {
        $('.newIcon  a').focus();
      }
    }

    function showAccount () {
      login.children('a').attr({"aria-expanded":"true"});
      account.attr({"aria-hidden":"false"});
      account.css("display", "block");
    }

    function hideAccount () {
      login.children('a').attr({"aria-expanded":"false"});
      account.attr({"aria-hidden":"true"});
      account.css("display", "none");
    }

    function unbindAccountLoginClickFromDocument () {
      $(document).unbind('click.accountLogin');
    }

    function bindAccountLoginClickToDocument () {
      $(document).bind('click.accountLogin', accountLoginClick);
    }

    function accountLoginClick () {
      // When a click event bubbles to document then hide the login dropdown (if it isn’t hidden).
      if (isVisible === true) {
        unbindAccountLoginClickFromDocument();
        hideAccount();
        isVisible = false;

        // TODO: replace 'toggled' with 'is-visible' or 'is-open'.
        $('.overlay-menu__overlay-toggle').removeClass('toggled');
        $('.overlay-menu__overlay-toggle').addClass('hidden');
      }
    }
  }
})(jQuery);


//Thumb Rating
(function ($) {
  $.fn.ThumbsRating = function () {
    $(this).click(function (e) {
      e.preventDefault();
      if ($(this).parent().hasClass('thump-down')) {
        if ($(this).parent().parent().parent().siblings('.thumbs-comment').length) {
          $(this).parent().siblings('.thump-up').children().unbind('click')
          $(this).parent().siblings('.thump-up').children().css('cursor', 'default');
          $(this).parent().parent().parent().siblings('.thumbs-comment').show();
        }
        return false;
      }
      else {
        $(this).parent().parent().parent().hide();
        $(this).parent().parent().parent().siblings().hide();
        $(this).parent().parent().parent().siblings('.rating-message').show();
        $(this).parent().parent().parent().siblings('.rating-message').after('<div class="clearboth"></div>');
      }
    });
    $(this).parent().parent().parent().parent().children('.thumbs-comment').children().children('input.secondary').click(function (e) {
      e.preventDefault();
      $(this).parent().parent().parent().parent().children().children().hide();
      $(this).parent().parent().parent().parent().children().children('.rating-message').show();
      $(this).parent().parent().parent().parent().children().children().after('<div class="clearboth"></div>');
    });
  }
})(jQuery);

//Star Rating
(function ($) {
  $.fn.StarRating = function () {
    var active = 0;
    $(this).siblings().children('a').focus(function () {
      if (active == 0) {
        if ($(this).parent().parent().children('.average-rating-message').not(':active')) {
          $(this).parent().siblings().children('a').addClass('fivestar-btn-filled').removeClass('fivestar-btn-empty');
          $(this).addClass('fivestar-btn-filled').removeClass('fivestar-btn-empty');
          $(this).parent().nextAll().children('a').removeClass('fivestar-btn-filled').addClass('fivestar-btn-empty');
        }
      }
    }).blur(function () {
        if (($(this).parent().hasClass('last') && (active == 0)) || ($(this).parent().hasClass('first') && (active == 0))) {
          $(this).parent().siblings().children('a').removeClass('fivestar-btn-filled').addClass('fivestar-btn-empty');
          $(this).removeClass('fivestar-btn-filled').addClass('fivestar-btn-empty');
        }
      });

    $(this).hover(function () {
      if ($('li a.do-not-change').length) {
        $('.fivestar ul li a').css('cursor', 'default');
        return false;
      }
      else {
        $(this).siblings().children('a').addClass('fivestar-btn-filled').removeClass('fivestar-btn-empty');
        $(this).children('a').addClass('fivestar-btn-filled').removeClass('fivestar-btn-empty');
        $(this).nextAll().children('a').removeClass('fivestar-btn-filled').addClass('fivestar-btn-empty');
      }
    }, function () {
      if ($('li a.do-not-change').length) {
        $('.fivestar ul li a').css('cursor', 'default');
        return false;
      }
      else {
        $(this).parent().children().children('a').removeClass('fivestar-btn-filled').addClass('fivestar-btn-empty');
      }
    });

    $(this).click(function (e) {
      e.preventDefault();
      $(this).unbind('mouseleave');
      var status = $('li a.fivestar-btn-filled').length;
      $(this).parent().parent().siblings('.left').addClass('hide');
      $(this).parent().parent().siblings('.star-rating-message, .fivestar').removeClass('hide');
      $(this).parent().parent().children('.average-rating-message').removeClass('hide');
      $(this).parent().children().slice(0, status).children('a').removeClass('fivestar-btn-empty').addClass('fivestar-btn-filled do-not-change');
    });

    $('.fivestar-comment input.secondary').click(function () {
      $(this).parent().addClass('hide');
      $(this).parent().parent().children('.comment-rating-message').removeClass('hide');
    });
  }
})(jQuery);


//Share overlay
(function ($) {
  $.fn.Share = function () {
    var share = $('.share-overlay');
    var height = 100;
    var width = (($('#maincontent').width() - share.outerWidth()) / 2);
    share.css({'top':height, 'left':width});
    $('html').click(function () {
      share.slideUp();
    });
    $('.eps-s a, .share-overlay').click(function (event) {
      event.stopPropagation();
    });
    $(this).click(function () {
      if ($('.email-overlay').not(':hidden')) {
        $('.email-overlay').hide();
        share.slideToggle('fast', function () {
          share.find('.close').focus();
        });
      }
    });
    share.find('.close').click(function () {
      share.slideUp('fast');
    });
    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        share.slideUp('fast');
      }
    });
  }
})(jQuery);

//Email overlay
(function ($) {
  $.fn.Email = function () {
    var url = document.location;
    var dev_nid = '19352238';
    var prod_nid = '19353589';
    //Check if the current page is the "email this page" webform and NOT a modal window
    if (((url.href.indexOf(dev_nid) > -1) || (url.href.indexOf(prod_nid) > -1)) && (url.href.indexOf('popup') == -1)) {
      //hide cancel button
      $('#edit-cancel').hide();
    }
    //Check if browser is IE7 OR the current page is sourced from https OR postcode-finder
    else if ($('body').hasClass('ie7') || (url.href.indexOf('postcode-finder') > -1)) {
      //Disable modal due to IE7 and cross source (https -> http) multiple browser issues
      try {
        $('.eps-e #email').unbind('click').attr('href', this.attr('href').replace('/popup', ''));
      }
      catch (err) {
      }
    }
    else {
      var email_overlay = $('.email-overlay');
      var email_li = $(".eps-e");
      if (email_li.find("a.automodal").length <= 0) {
        var height = 100;
        var width = (($('#maincontent').width() - email_overlay.outerWidth()) / 2);
        email_overlay.css({'top':height, 'left':width});
        $('html').click(function () {
          email_overlay.slideUp();
        });
        $('.eps-e a, .email-overlay').click(function (event) {
          event.stopPropagation();
        });
        $(this).click(function () {
          if (email_overlay.not(':hidden')) {
            email_overlay.hide();
            email_overlay.slideToggle('fast');
          }
        });
        email_overlay.find("#edit-cancel").click(function (e) {
          email_overlay.find(':input').each(function () {
            switch (this.type) {
              case 'password':
              case 'select-multiple':
              case 'select-one':
              case 'text':
              case 'textarea':
                $(this).val('');
                break;

              case 'checkbox':
              case 'radio':
                this.checked = false;
            }
          });

          email_overlay.slideUp('fast');
          e.preventDefault();
        });

        // Adds tealium tags.
        if (window.trackOverlay !== undefined && Drupal.modalFrameChild !== undefined) {
          var new_tag = [];
          new_tag['pageOverlayType'] = 'Global Email';
          new_tag['pageOverlayTitle'] = 'Email this page webform';
          window.parent.tealium_tag_overlay(new_tag);
        }
      }

      //If email icon is click, hide share pop up and add an iframe title attribute
      email_li.find("a.automodal").click(function () {
        $('.share-overlay').slideUp('fast');
        try {
          $('#modalframe-element').attr('title', 'Email this page');
          window.frames["modalframe-element"].location.reload();
        }
        catch (err) {
        }
      });

      email_overlay.find('.close').click(function () {
        //If the close link is clicked, close the modalframe
        try {
          Drupal.modalFrameChild.triggerParentEvent('childClose', false);
          return false;
        }
        catch (err) {
        }
        $('#modalframe-container').slideUp('fast');
        email_overlay.slideUp('fast');
      });
      email_overlay.find("#edit-cancel").click(function () {
        try {
          Drupal.modalFrameChild.triggerParentEvent('childClose', false);
          return false;
        }
        catch (err) {
        }
      });

      $('.modalframe-page').find('.close').click(function () {
          try {
              Drupal.modalFrameChild.triggerParentEvent('childClose', false);
              return false;
          }
          catch (err) {
          }
      });

      //Click outside of the frame, close
      $(document).click(function () {
        try {
          Drupal.modalFrame.close();
        }
        catch (err) {
        }
      });
      $(document).keyup(function (e) {
        if (e.keyCode == 27) {
          email_overlay.slideUp('fast');
        }
      });

      $("#email-top").focus(function () {
        $(document).find('.close').focus();
      });
    }
  }
})(jQuery);

//TABLE TABS
(function ($) {
  $.fn.tabletabs = function () {
    $('.table-tab').css({'display':'block'});
    $('.table-tab-div').css({'display':'none'});
    $('.table-tab-div.first').css({'display':'block'});
    $(this).click(function () {
      var showid = '#table-tab-0';
      if (!$(this).parent().hasClass('selected')) {
        showid = '#table-' + $(this).attr('id');
        $(this).parent().parent().children('LI').removeClass('selected');
        $(this).parent().addClass('selected');
        //Aria code added by Capgemini, please do not remove or take into account when making changes
        $(this).parent().parent().children('li').children('a').attr({"aria-expanded":"false"});
        $(this).parent().children('a').attr({"aria-expanded":"true"});
        $(this).parent().parent().parent().children('DIV.table-tab-div').css({'display':'none'}).attr({"aria-hidden":"true"});
        $(this).parent().parent().parent().children('DIV.table-tab-div' + showid).css({'display':'block'}).attr({"aria-hidden":"false"});
      }
      return false;
    });
  };
})(jQuery);

//Main menu
(function ($) {
  $.fn.MainMenu = function () {
    $('.megamenu-menu > li.basket > a').width(57);
    if ($.browser.mozilla) {
      $('.megamenu-menu > li.basket > a').width(56);
    }
    if ($('body').hasClass('ie9')) {
      $('.megamenu-menu > li.basket > a').width(48);
    }
  };
})(jQuery);

//AtoZ content
(function ($) {
  $.fn.Atozcontent = function () {
    var currentTallest = 0;
    $('.atoz-content li:nth-child(odd)').css('margin', '0 20px 0 0');
    $('.atoz-content li').each(function () {
      if ($(this).height() > currentTallest) {
        currentTallest = $(this).height();
      }
    });
    $('.atoz-content li').css('min-height', currentTallest);

    //Addition so that class is added to the li for application tabs
    $(this).find('a').click(function () {
      $(this).parent().parent().children('li').removeClass('active');
      $(this).parent('li').addClass('active');
    });
  };
})(jQuery);

Drupal.behaviors.usefulToolsCorp = function(context) {
  $('.panels-homepage-corporate .u-tools .content li a').focus(function() {
    $(this).closest('li').addClass('hover');
  }).blur(function() {
    $(this).closest('li').removeClass('hover');
  });
};

/**
 * IE fix for issue where buttons in dialog boxes do not render properly.
 * We check within jQuery UI dialogs for elements with CSS3 PIE applied,
 * then trigger the onmove event to make PIE recalculate its positioning.
 *
 * @see http://snippets.webaware.com.au/snippets/telling-css3pie-about-dynamic-elements/
 *
 * @param context
 */
Drupal.behaviors.dialogPieElements = function(context) {
  if ($.browser.msie) {
    $(document).bind('dialogopen', function(event) {
      var elements = $('.primary, .secondary, .tertiary', event.target).get();
      $.each(elements, function(index, element) {
        element.fireEvent('onmove');
      });
    });
  }
};

/**
 * Adds classes to the bottons into the autologout dialog.
 */
Drupal.behaviors.dialogLogout = function(context) {
  $(document, context).bind('dialogopen', function(e) {
    if ($(e.target, context).is('#ui-dialog-logout')) {
      var buttons = $('#ui-dialog-logout', context).parents('.ui-dialog').find(".ui-state-default");
      var right_button = buttons.eq(0);
      var left_button = buttons.eq(1);
      if (!right_button.hasClass('right')) {
        right_button.addClass('primary right');
        left_button.addClass('secondary');
      }
    }
  });
}

/**
 * IE fix for placeholder issue.
 *
 * HTML5 introduced the placeholder attribute on input elements, which allows
 * to display a greyed-out default text.
 * Sadly the Internet Explorer, including IE 9 does not support it.
 *
 * @param context
 */
Drupal.behaviors.placeholderRML = function(context) {
  // Test for native placeholder functionality.
  var i = document.createElement('input');
  if ('placeholder' in i) {
    // Change the behaviour to match our IE polyfill.
    $('input[placeholder]:not(.placeholder-processed)', context).each(function () {
      var placeholder = $(this).attr('placeholder');
      $(this)
        .bind('click focus', function () {
          $(this).attr('placeholder', '');
        })
        .blur(function () {
          $(this).attr('placeholder', placeholder);
        });
    }).addClass('placeholder-processed');
  }
  else if ($.browser.msie && $.browser.version < 10) {
    $('input[placeholder]:not(.placeholder-processed)', context).each(function() {
      var el = $(this);
      var div = $('<div></div>').addClass('placeholder-container');
      // Appends the new element 'div' to the parent of 'el'.
      el.before(div);
      // Moves the input field inside 'div'.
      el.appendTo(div);
      var span = $('<span></span>').html(el.attr('placeholder')).addClass('placeholder').hide();
      div.append(span);

      // Hide the placeholder when we click in the input or placeholder.
      el.click(function () {
        span.hide();
      });
      span.click(function () {
        $(this).hide();
        el.focus();
      });

      // Initial state - show placeholder if no value is set.
      if (el.val() == '') {
        span.show();
      }

      // Set the placeholder state on input events.
      el.blur(function () {
        if (el.val() == '') {
          span.show();
        }
      }).bind('keyup change focus',function() {
        if (el.val().length) {
          span.hide();
        }
      });

      // Hide the placeholder on returning to the page if an input element
      // with a placeholder is the actively focused element.
      $(window).focus(function () {
        var element = document.activeElement,
            $element = $(element);

        if ($element.hasClass('placeholder-processed')) {
          $element.click();
        }
      });
    }).addClass('placeholder-processed');
  }
};

/**
 * When closing a jQuery UI dialog, move the focus back to the element which
 * triggered the dialog.
 *
 * As dialogs are typically triggered from anonymous functions within an event
 * handler (e.g. .click()) or indeed any other JavaScript event, there is not
 * really a way of automatically knowing which element triggered the dialog,
 * so this is specified as a data attribute from within the JavaScript that
 * creates the dialog.
 */
Drupal.behaviors.dialogFocusOnClose = function() {
  $(document).bind('dialogclose', function (event) {
    var target = $(event.target),
        trigger = target.data('triggerElement');

    if (!trigger) {
      trigger = target.parents('div.ui-dialog').find('div.ui-dialog-content').data('triggerElement')
    }

    if (typeof trigger !== 'undefined') {
      try {
        trigger.focus();
      }
      catch (error) {
        if (typeof console !== 'undefined') {
          console.log(error);
        }
      }
    }
  });
};

/**
 * Adds the tabindex attribute to elements to allow them to be focusable when
 * used as anchor links within a page.
 */
Drupal.behaviors.focusAnchorLinks = function(context) {
  $('a[href^="#"]', context).each(function() {
    var id = this.getAttribute('href').slice(1),
    // There is an issue with the #maincontent div on webkit which adds an
    // outline whenever anything in the div is clicked. Functionally the skip
    // nav link works without a tabindex so excluding it here.
        target = id.length && id != 'maincontent' ? document.getElementById(id) : null;

    if (target != null && !target.getAttribute('tabindex')) {
      // Setting a tabindex of 0 will allow an element to be focusable. The tab
      // order is the DOM order when the value is 0.
      // Don't apply this to elements hidden offscreen.
      var targetPos = $(target).offset();
      if (!targetPos.left < -500) {
        target.setAttribute('tabindex', '0');
      }
    }

    // Fix for Safari not applying focus when clicking on anchor links.
    if ($.browser.safari && id.length) {
      $(this).click(function() {
        $('#' + id).focus();
      });
    }
  });
};

/**
 * Functionality for collapsible FAQ nodes - these are created using the
 * "FAQ collection" content type and selecting "Contextual Tips (collapsible)"
 * from the "Type" field.
 */
Drupal.behaviors.contextualCollapsible = function (context) {
  /**
   * Add the toggle icon to allow collapsing/uncollapsing the content.
   *
   * @param node
   *   The FAQ node as a jQuery object.
   * @param collapsed
   *   Boolean to indicate whether the initial state should be collapsed.
   */
  function addToggle (node, collapsed) {
    var link = $('<a href="javascript:void(0);" class="contextual-collapsible"><span class="scr-hide visuallyhidden"></span></a>');

    link.click(function() {
      $(this)
        .toggleClass('closed')
        .closest('.tips-contextual.collapsible')
        .find('.body-content').slideToggle()
        .closest('.node.tips-contextual.collapsible')
        .toggleClass('closed');

      var text = $(this).hasClass('closed') ? 'Show content' : 'Hide content';
      $(this).find('span').text(text);
    });

    node.find('h2:first').after(link);

    if (collapsed) {
      node.find('.body-content').hide();
      node.find('a.contextual-collapsible').addClass('closed');
      node.addClass('closed');
    }

    var text = node.hasClass('closed') ? 'Show content' : 'Hide content';
    node.find('a.contextual-collapsible span').text(text);
    node.addClass('collapsible-processed');
  }

  // Go through all the nodes added to settings, add the toggle and set the
  // initial state of the node.
  $('.tips-contextual:not(.collapsible-processed)', context).each(function () {
    var node = $(this),
        collapsed = node.hasClass('collapsed');
    if (node.hasClass('collapsible')) {
      addToggle(node, collapsed);
    }
  });
};

/**
 * Allow modal jQuery UI dialogs to be closed by clicking on the transparent
 * background around/behind the overlay.
 */
Drupal.behaviors.modalDialogClose = function (context) {
  $(document).bind('dialogopen', function (event, ui) {
    // Ensure the background overlay covers the size of the content.
    $('.ui-widget-overlay').css('height', $(document).height() + 'px');

    var dialog = $(event.target);
    // jQuery UI dialogs.
    if (dialog.dialog('option', 'modal')) {
      $('.ui-widget-overlay').bind('click', function () {
        dialog.dialog('close');
      });
    }
    // CTools modals.
    if (dialog.children('.ctools-modal-content').length) {
      $('#modalBackdrop').bind('click', function () {
        dialog.find('a.close').click();
      });
      $(document).bind('keyup', function (event) {
        if (event.keyCode === 27) {
          dialog.find('a.close').click();
        }
      });
    }
  });

  // Ensure the background overlay covers the size of the content in cases
  // where we retrieve the modal content via AJAX.
  $(document).ajaxComplete(function () {
    $('.ui-widget-overlay').css('height', $(document).height() + 'px');
  });
}

/**
 * Prevent scrolling past the top or bottom of dialogs.
 */
Drupal.behaviors.dialogScroll = function (context) {
  var
    newPosition,
    ctoolsModal;

  $(document)
    .bind('dialogopen', function (event) {
      var
        dialog,
        newPosition,
        offset,
        gteIE11 = !!navigator.userAgent.toLowerCase().match(/trident/);

      // Workaround to fix unscrollable scrollbars - this is fixed in a later
      // version of jQuery UI - http://bugs.jqueryui.com/ticket/4671
      window.setTimeout(function () {
        $(document).unbind('mousedown.dialog-overlay mouseup.dialog-overlay');
      }, 1);

      // Grab the dialog.
      // If it's a CTools dialog we reposition it, by default it will be halfway
      // down the screen.
      if ($(event.target).children('.ctools-modal-content').length) {
        dialog = $(event.target);
        newPosition = $(window).scrollTop() + 20;
        dialog.css('top', newPosition + 'px').addClass('ctools-modal');
      }
      else {
        dialog = $(event.target).parent('.ui-dialog');
      }

      $(window).unbind('resize.dialogscroll').bind('resize.dialogscroll', function () {
        dialog.css('top', $(window).scrollTop() + 20 + 'px');
      });

      // Grab the difference between the dialog's top position and the current
      // window scroll position. If this is 0 then we give a value of 40 px for
      // padding.
      offset = dialog.offset().top - $(window).scrollTop();
      if (offset <= 0) {
          offset = 40;
      }

      $(window).unbind('scroll.dialog').bind('scroll.dialog', function () {
        // Grab the position of where the dialog ends. This can change with
        // dynamic content, tabs etc so we check during the scroll event.
        // Add 40 px for a bit of padding.
        var dialogTop = dialog.offset().top;
        var dialogHeight = dialog.height();
        var dialogBottom = dialogHeight + dialogTop + 40;

        // The visible window height.
        var visible = $(this).height();
        // Get current scroll position.
        var topPosition = $(this).scrollTop();
        // Add the height of the window to get the bottom position.
        var bottomPosition = topPosition + visible;

        // If the dialog is smaller than the window or the current scroll
        // position is smaller than the dialog's top position, set the scroll so
        // the dialog stays in view.
        if (dialogHeight < visible) {
          if (dialog.data('scrollTop')) {
            newPosition = dialogTop - dialog.data('scrollTop');
          }
          else {
            newPosition = (dialogTop + (dialogHeight - visible) / 2);
          }
          // Unbind the events for scroll bar issue for admin panel content type.
          if (Drupal.adminToolbar) {
            $(document).trigger('dialogclose', $('#modalContent'));
          }
        }
        // Scroll position is before the start of the dialog, set the scroll so
        // the dialog stays in view.
        else if (topPosition < dialogTop - offset) {
          newPosition = dialogTop - offset;
        }
        // If the bottom position exceeds the bottom of the dialog, set the
        // scroll so the dialog stays in view.
        else if (bottomPosition >= dialogBottom) {
          newPosition = dialogBottom - visible;
        }
        else {
          newPosition = false;
        }

        if (newPosition) {
          // $.browser was removed in jQuery 1.9 and is made available through the jQuery.migrate plugin.
          // $.browser.msie returns true for IE8 IE9 IE10 but not IE11 which returns undefined. gteIE11 tests for
          // IE11 which uses Trident/7 in it's userAgent string, as yet unreleased versions of IE may also use Trident.
          if ($.browser.msie || gteIE11) {

            if (gteIE11) {
              // In IE11 this line does not cause a crash, butsv it results in an unpleasantly jerky scroll.
              $('html')
                .stop(true)
                .animate({scrollTop : newPosition + 'px'}, 25);
            } else {
              $('html, body')
                .stop(true)
                .animate({scrollTop : newPosition + 'px'}, 250);
            }
          }
          else {
            // In IE11 this line will cause memory leaks and a browser crash (using jQuery 1.10.1)
            $(window).scrollTop(newPosition);
          }
        }
      });
    })
    .bind('dialogclose', function () {
      $(window).unbind('scroll.dialog resize.dialogscroll');
      // Case where we have triggered a jQuery UI dialog on top of a CTools modal.
      // Have to re-trigger the dialogopen event to re-bind the window scroll.
      var ctoolsModal = $('#modalContent');
      if (ctoolsModal.length && ctoolsModal.is(':visible')) {
        ctoolsModal.find('#modal-content').trigger('dialogopen');
      }
    });

  // Reposition the CTools modal - once content has come in via AJAX, behaviors
  // are run again so we can check the height of the modal and reposition accordingly.
  ctoolsModal = $('#modalContent');
  if (ctoolsModal.length && ctoolsModal.is(':visible')) {
    if (ctoolsModal.height() < $(window).height()) {
      newPosition = $(window).scrollTop() + (($(window).height() - ctoolsModal.height()) / 2);
      ctoolsModal.css('top', newPosition + 'px').data('scrollTop', newPosition - $(window).scrollTop());
    }
  }

}

/**
 * Provide the HTML to create the modal dialog.
 */
Drupal.theme.prototype.RoyalMail2017ModalDialog = function () {
  var html = ''
  html += '  <div id="ctools-modal">'
  // panels-modal-content
  html += '    <div class="ctools-modal-content ui-dialog ui-widget ui-widget-content ui-corner-all">'
  html += '      <div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">';
  html += '        <a class="close ui-dialog-titlebar-close ui-corner-all" href="#">';
  html += '<span class="ui-icon ui-icon-closethick" unselectable="on">' + Drupal.t('Close') + '</span></a>';
  html += '        <h2 id="modal-title" class="ui-dialog-title">&nbsp;</h2>';
  html += '      </div>';
  html += '      <div id="modal-content" class="ui-dialog-content ui-widget-content">';
  html += '      </div>';
  html += '    </div>';
  html += '  </div>';

  return html;
};
;
(function ($) {
  Drupal.behaviors.init_2011 = function(context) {
    // Moved to here as it must run in the order that Drupal.behaviors are run.
    $('.scroll-pane').jScrollPane();
  }
})(jQuery);

// It's called when the entire page is loaded, rather than when the DOM becomes
// available.
$(window).bind("load", function() {
  ietidy();
});

$(document).ready(function(){
  browser();
  if ($.browser.name == 'chrome' || $.browser.name == 'wkit'){
    resizewkit();
    $(window).resize(function() {resizewkit()});
  }

  ietidy();
  $(window).resize(function() {
    ietidy();
  });

  try {
    // make promo display random
    randomPromo('.rightsidebar .view-promos');
    randomPromo('.leftsidebar .view-promos');

  } catch(err){}

  $('.cookie-content .close').Cookie();

  $('.megamenu-menu > li.basket > a').MainMenu();
  $('.eps-s a').Share();
  $('.eps-e a').Email();
  $('.thumbs_up_down ul li a').ThumbsRating();
  $('.fivestar ul li').StarRating();
  $('a').Shad();
  $('.promo-nav ul li a').Carousel();
  $('.atoz-tabs').Atozcontent();
  if(! $('body').hasClass('ie7')){$('.login').Login();}
  $('.accordion ul li h2 a').Accordian();
  $(".tabsnav:not('.tabbed-links') li:not('.all-tools') > a").Tabs();

  // add a placeholder blank alt attribute to <img> tags with no alt attribute
  $('img:not([alt])').each(function() {
    $(this).attr('alt', '');
  });

  // add wmode to fix problem with youtube and megamenu z-index
  $("iframe").each(function(){
    var ifr_source = $(this).attr('src');
    try {
      if (ifr_source.indexOf('youtube') != -1) {
        $(this).attr('src', ifr_source + "?wmode=transparent");
      }
    }
    catch(err) {}
  });

  // tabletabs from jquery.rm.KC
  $(".table-tab:not('.tabbed-table-links') A").tabletabs();

  // sort out style on max length webform
  $('#maxlength-submitted-message').addClass('margin20b80l color-grey-darker');

  try {
    if($('.ticker-min').length==1){$('.ticker-min .feeds UL').Ticker({div:'.ticker-min ',width:458});}
  }
  catch(err) {}
  try {
    if($('.ticker-max').length==1){$('.ticker-max .feeds UL').Ticker({div:'.ticker-max ',width:778});}
  }
  catch(err) {}
  try {
    if($('.dyn-list').length>0){$('.dyn-list LI A, .dyn-col-back A').DynamicColumns();}
  }
  catch(err) {}
  //working out height of background image
  $(window).load(function(){var content_height = $('.content-wrap').outerHeight();$('.maincontent-bg').css({'height':content_height});});

  //skip to content fix

  var userAgent = navigator.userAgent.toLowerCase();
  $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
  if ($.browser.webkit || $.browser.chrome) {
    $('.skipnav').click(function() {$('.breadcrumb li:first-child a').focus();});
	$('body').addClass('wkit');
    resizewkit();

    $(window).resize(function() {
      resizewkit()
    });
  }

  /**
   * Make sure that no regions are wider than the body, or absurdly small.
   */
  function resizewkit() {
    var bodyWidth = $('body').width();
    var $objs = $('.wkit .header-wrap, .wkit .content-wrap, .wkit .content-wrap-two, .wkit .footer-wrap, .panels-homepage-corporate .slider-wrap .promo_redesign');

    if (bodyWidth > 1000 && bodyWidth < 1250) {
      $objs.css({'width': bodyWidth + 'px'});
    }
    else {
      if (bodyWidth < 1000) {
        $objs.css({'width':'990px'});
      }
      else {
        $objs.css({'width':'1250px'});
      }
    }
  }

  // fix captionless tables
  $('table:not(:has(caption))').addClass('caption-less');

  // RQM 8171 - focus on new message after rating
  $(document).bind('eventAfterRate', function(event, data) {
    var selector = data.match(/id="(.*)"><div/);
    $('#' + selector[1]).attr('tabindex', 0).focus();
  });

  if ($('body').hasClass('ie7')) {
    // Fix some issues around multiple radios and checkboxes being hidden by overflow
    $('.webform-component-checkboxes, .webform-component-radios').each(function() {
      var height = $(this).find('div.form-checkboxes, div.form-radios').outerHeight();
      $(this).css({'min-height': height + 'px'});
    });
  }
});
;
(function(window, document, $, undefined) {
  'use strict';

  // This is not the standard Megamenu Module JavaScript.  It has been adapted
  // for compatibility with the views output generated for the Royalmail2012
  // theme and to enable the visual designs prescribed for the newer Royalmail
  // Responsive and Royalmail 2017 themes.
  // It has been written for compatibility with jQuery 1.3.2.
  //
  // Mouse click events, tab & keyboard navigation (for accessibility), and
  // touch events may all be employed to use the menu.
  var $document = $(document);

  $document.ready(function () {
    var
      $body,
      $wrapper,
      $megamenu,
      $megaParents,
      activeParentIndex,
      parentClass,
      parentSelector,
      parentActiveStateClass,
      parentTitleSelector,
      binClass,
      binActiveStateClass,
      binOpeningStateClass,
      binClosingStateClass,
      binContainerClass,
      binSelector,
      parentNamePrefix,
      closeTime,
      revealTransitionTime;

    activeParentIndex = null;
    parentClass = 'megamenu-parent';
    parentActiveStateClass = 'is-active';
    binClass = 'megamenu-bin';
    binActiveStateClass = 'is-active';
    binOpeningStateClass = 'is-opening';
    binClosingStateClass = 'is-closing';
    binContainerClass = 'megamenu-bin-container';

    parentSelector = '.' + parentClass;
    binSelector = '.' + binClass;
    parentTitleSelector = '.megamenu-parent-title';
    parentNamePrefix = 'megaParent';

    $body = $('body', $document);
    $megamenu = $('.megamenu-menu');
    $megaParents = $megamenu.find(parentSelector);

    $wrapper = $megamenu.parents('.megamenu-wrapper') || $megamenu;

    // Close Time provides hysterisis to allow a user’s mouse to leave the
    // Parent button and diagonally pass over to the Bin, without the Bin
    // hiding before the user’s intention has been achieved.
    // Measured in milliseconds.
    closeTime = 320;

    // Reveal Time is the time taken for a Bin to be revealed, matching a
    // transition defined by CSS.
    // Measured in milliseconds.
    revealTransitionTime = 2200;
    if ('ontouchstart' in window) {
      revealTransitionTime = 1;
    }

    $wrapper.css({ position: 'relative' });

    $megaParents.each(function (index) {
      var
        $parent,
        $bin,
        $binContainer,
        $binLinks,
        $linkParent,
        parentDoesNotHaveLinkChild,
        parentTitleDoesNotHaveLinkChild,
        state,
        parentName;

      state = {
        // Visible is quad-state:
        // 0: Closed  - invisible.
        // 1: Closing - animation in progress.
        // 2: Opening - animation in progress.
        // 3: Open    - visible. Animation finished.
        visible: 0,

        containerTimer: null,
        closeTimer: null
      };
      parentName = parentNamePrefix + index;

      $parent = $(this);
      $linkParent = $('> .link-parent', $parent);
      $bin = $(binSelector, $parent);
      $binLinks = $('a', $bin);

      // Wrap a container around the bin.  This enables the Bin to remain
      // a constant reference for animated heights.
      $binContainer = $bin
        .wrap('<div />')
        .parent()
        .addClass(binContainerClass);

      // Test to see if $parent contains a link, or a parentTitle with a link,
      // as a child.  If it does not, then add enable $parent to be focussed
      // by adding tabindex to it.
      parentDoesNotHaveLinkChild = ($parent.find('> a').length > 1);
      parentTitleDoesNotHaveLinkChild = ($parent.find(parentTitleSelector + ' > a').length > 1);
      if (parentDoesNotHaveLinkChild || parentTitleDoesNotHaveLinkChild) {
        // Add focus and blur to parent.
        $parent.attr('tabindex', '-1');
      }

      $parent.bind('hide', function () {
        hideBin($binContainer, $bin, $parent, state);
      });

      $parent
        .bind('focus', open)
        .bind('blur', startCloseTimer);

      $binLinks
        .bind('focus', open)
        .bind('blur', startCloseTimer);

      // TODO: a click should not be used on a link, replace it with a span
      // or button.  This may be done by updating the database.
      $linkParent
        .bind('click', toggle)
        .bind('blur', startCloseTimer);

      function toggle (ev) {
        // Used because toggle is an event listener on a link.
        // TODO: replace link with a button or span, and remove this line.
        ev.preventDefault();

        // If megamenu is closed or closing then open it.
        if (state.visible < 2) {
          open();
        }
        // Else if megamenu is opened or opening then close it.
        else {
          close();
        }
      }

      function open () {
        // Either a button, Parent, or Bin might call this handler, and either event
        // should not close the bin.
        cancelCloseTimer(state);

        hideActiveBin();
        activateParent($parent, index);
        showBin($binContainer, $bin, $parent, state);

        setTimeout(function () {
          bindDocumentEventListeners(parentName, close, keyup, touchStartClose);
        }, 1);
      }

      function close () {
        unbindDocumentEventListeners(parentName);
        hideBin($binContainer, $bin, $parent, state);
      }

      function startCloseTimer () {
        cancelCloseTimer(state);
        state.closeTimer = window.setTimeout(close, closeTime);
      }

      function keyup (ev) {
        // If Escape is pressed, then close the megamenu.
        if (ev.keyCode === 27) {
          close();
        }
      }

      function touchStartClose (ev) {
        var target, $target, $targetParent;

        target = ev.target || ev.srcElement;

        if (target) {
          $target = $(target);
          $targetParent = $target.parent();

          if (
            // If megamenu is opened or opening, and,
            (state.visible > 1) &&

            // If the target is not a link-parent button, or a link or button,
            // then close it.
            !$targetParent.hasClass('.link-parent') &&
            !$target.hasClass('.link-parent') &&
            !$targetParent.is('a, button') &&
            !$target.is('a, button')
          ) {
            close();
          }
        }
      }
    });

    function bindDocumentEventListeners (parentName, close, keyup, touchStartClose) {
      $document.bind('click.' + parentName, close);
      $document.bind('keyup.' + parentName, keyup);

      if ('ontouchstart' in window) {
        $body.bind('touchstart.' + parentName, touchStartClose);
      }
    }

    function unbindDocumentEventListeners (parentName) {
      $document.unbind('click.' + parentName);
      $document.unbind('keyup.' + parentName);

      if ('ontouchstart' in window) {
        $body.unbind('touchstart.' + parentName);
      }
    }

    function showBin ($binContainer, $bin, $parent, state) {

      // Only open Bin if visible is 0: Closed, or 1: Closing.
      // i.e. the Bin is not 3: Open, or 2: Opening.
      if (state.visible < 2) {
        $binContainer
          .addClass(binOpeningStateClass)
          .removeClass(binClosingStateClass)
          .css({
            top: $parent.height()
          });

        // Set a zero height only if the Bin is closed, and thus does not
        // have a height already set.
        if (state.visible === 0) {

          // Set bin height to zero, so that it may animate.
          $binContainer.css({
            height: 0
          });
        }

        // Set visible to opening state.
        state.visible = 2;

        // Make bin visible.
        $binContainer.addClass(binActiveStateClass);

        // Animate to full height.
        setTimeout(function () {
          $binContainer.css({
            height: $bin.height()
          });
        }, 1);

        // Once bin is full height, remove the inline CSS.
        cancelContainerTimer(state);
        state.containerTimer = setTimeout(function () {

          // Set visible to Open state.
          state.visible = 3;

          $binContainer
            .removeClass(binOpeningStateClass)
            .css({
              height: null
            });
        }, revealTransitionTime);
      }
    }

    function hideBin ($binContainer, $bin, $parent, state) {
      // Only close Bin if it is visible, and not closing.
      // Visible might be 2: Opening, or 3: Opened.
      if (state.visible > 1) {
        $binContainer
          .addClass(binClosingStateClass)
          .removeClass(binOpeningStateClass)
          .css({
            top: $parent.height()
          });

        // If Bin is Open:
        if (state.visible === 3) {
          // Set bin container height to full bin height, so that it may animate.
          $binContainer.css({
            height: $bin.height()
          });
        }

        // Set visible to closing state.
        state.visible = 1;

        // Animate to zero.
        setTimeout(function () {
          $binContainer.css({
            height: 0
          });
        }, 1);

        cancelContainerTimer(state);
        state.containerTimer = setTimeout(function () {
          $binContainer
            .removeClass(binActiveStateClass)
            .removeClass(binClosingStateClass)
            .css({
              height: null
            });

          // Set visible to closed & invisible state.
          state.visible = 0;
        }, revealTransitionTime);

        // Change state signalisation on parent button.
        $parent.removeClass(parentActiveStateClass);
      }
    }

    // Don’t call hideActiveBin after activateParent has been called, as it
    // updates activeParentIndex.
    function hideActiveBin () {
      if (activeParentIndex !== null) {
        unbindDocumentEventListeners(parentNamePrefix + activeParentIndex);
        $megaParents.eq(activeParentIndex).trigger('hide');
      }
    }

    function cancelCloseTimer (state) {
      if (state.closeTimer) {
        window.clearTimeout(state.closeTimer);
        state.closeTimer = null;
      }
    }

    function cancelContainerTimer (state) {
      if (state.containerTimer) {
        window.clearTimeout(state.containerTimer);
        state.containerTimer = null;
      }
    }

    function activateParent ($parent, index) {
      // There should only be one active Parent (with the active class);
      if (activeParentIndex !== null) {
        $megaParents.eq(activeParentIndex).removeClass(parentActiveStateClass);
      }

      activeParentIndex = index;
      $parent.addClass(parentActiveStateClass);
    }
  });
}(window, document, jQuery));
;
Drupal.royalmail2017 = Drupal.royalmail2017 || {};

(function ($) {
  Drupal.behaviors.royalmailExtlinks = function(context) {
    Drupal.royalmail2017.extlinks(context);
    if ($('.twitter .scroll-pane').length > 0) {
      $('.twitter .scroll-pane').data('jsp').getContentPane().find('img.extlink').remove();
    }
    if ($('.rml_social').length > 0) {
      $('.rml_social').find('img.extlink').remove();
    }
  };

  /*
   * add an icon to all links which open in a new window
   */
  Drupal.royalmail2017.extlinks = function (context) {
    $('a[href*="http"]:not([href*="royalmail."]):not([href*="rml"]):not([href^="/"]):not([href^="function"]):not([href^=".."]):not([href=""]):not([href*="javascript"]):not([href^="#"]):not([href*="?"]), a[target="_blank"], a[target="blank"], .new_window, a[onclick^="window.open"]', context).each(function(el){
      var this_link = $(this);

      // don't add the icon to the links with the class 'no-icon'.
      if (this_link.hasClass("no-icon")) {
        return;
      }

      // don't add an icon if the link already contains an image
      var new_window_images = $(this).find('img');
      if (!new_window_images.length) {
        if ((this_link.is("input")) || (this_link.html())) {

          // don't add the icon to the RSS feed link
          if (this_link.closest(".feeds").length) {
            return;
          }
          var filename = 'newwin-red-13-12.png';
          var footer = this_link.closest(".footer-wrap").length;
          var mega = this_link.closest(".megamenu-slot").length;
          var summary_block = this_link.closest(".summary-block").length;
          var unsupported_browser = this_link.closest(".unsupported-browser").length;

          // use a white icon against dark backgrounds
          if (this_link.hasClass('primary') || this_link.hasClass('tertiary') || footer || mega || summary_block || unsupported_browser) {
            filename = 'newwin-white-13-12.png';
          }

          // Use a black icon for secondary (grey gradient) backgrounds.
          if (this_link.hasClass('secondary') || this_link.css('color') === 'rgb(0, 0, 0)') {
            filename = 'newwin-black-white-15-14.png';
          }

          var icon = ' <img class="extlink" src="/sites/all/themes/royalmail2017/img/icon/' + filename + '" alt="Opens in new window"/>';

          if (this_link.is("input")) {
            this_link.after(icon);
          }
          else {
            this_link.append(icon);
          }
          this_link.addClass('window-icon').attr("target", "_blank").after('  ');
        }
        if (window.PIE) {
          this.fireEvent('onmove');
        }
      }
    });
  }

})(jQuery);
;
/*jQuery Tooltip plugin 1.3 * http://bassistance.de/jquery-plugins/jquery-plugin-tooltip/ * http://docs.jquery.com/Plugins/Tooltip
 * Copyright (c) 2006 - 2008 Jörn Zaefferer * $Id: jquery.tooltip.js 5741 2008-06-21 15:22:16Z joern.zaefferer $ * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php * http://www.gnu.org/licenses/gpl.html */
;
(function ($) {
  // the tooltip element // the current tooltipped element // the title of the current element, used for restoring // timeout id for delayed tooltips // IE 5.5 or 6 // flag for mouse tracking
  var helper = {}, current, title, tID, IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent), track = false;
  var thisOff = 0;
  var thisWidth = 0;
  var iseps = 0;
  var thisHeight = 0;
  $.tooltip = {
    blocked: false,
    defaults: {
      delay: 200,
      fade: false,
      showURL: true,
      extraClass: "",
      top: 15,
      left: 15,
      id: "tooltip",
      inline: false
    },
    block: function () {
      $.tooltip.blocked = !$.tooltip.blocked;
    }
  };

  $.fn.extend({
    tooltip: function (settings) {
      settings = $.extend({}, $.tooltip.defaults, settings);
      createHelper(settings);
      return this.each(function () {
        $.data(this, "tooltip", settings);
        this.tOpacity = helper.parent.css("opacity");
        this.tooltipText = this.title;
        $(this).removeAttr("title");
        this.alt = "";
      }).bind('blur mouseover mouseout click click.tooltip', toggle);
    },
    fixPNG: IE ? function () {
      return this.each(function () {
        var image = $(this).css('backgroundImage');
        if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
          image = RegExp.$1;
          $(this).css({'backgroundImage': 'none', 'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"}).each(function () {
            var position = $(this).css('position');
            if (position != 'absolute' && position != 'relative') $(this).css('position', 'relative');
          });
        }
      });
    } : function () {
      return this;
    },
    unfixPNG: IE ? function () {
      return this.each(function () {
        $(this).css({'filter': '', backgroundImage: ''});
      });
    } : function () {
      return this;
    },
    hideWhenEmpty: function () {
      return this.each(function () {
        $(this)[ $(this).html() ? "show" : "hide" ]();
      });
    },
    url: function () {
      return this.attr('href') || this.attr('src');
    }});
  function createHelper(settings) {
    // there can be only one tooltip helper // create the helper, h3 for title, div for url // add to document // hide it at first // apply bgiframe if available // save references to title and url elements
    if (helper.parent) {
      return;
    }
    helper.parent = $('<div id="' + settings.id + '"><div id="' + settings.id + 'wrap"><div class="body"></div><div class="url"></div></div><div class="after"></div></div>').appendTo(document.body).hide();
    if ($.fn.bgiframe) {
      helper.parent.bgiframe();
    }
    helper.title = $('h3', helper.parent);
    helper.body = $('div.body', helper.parent);
    helper.url = $('div.url', helper.parent);
  }

  function settings(element) {
    return $.data(element, "tooltip");
  }

  // main event handler to start showing tooltips
  function handle(event) {
    if (settings(this).delay) {
      tID = setTimeout(show, settings(this).delay);
    }
    else {
      show();
    }
    track = !!settings(this).track;
    $(document.body).bind('mousemove', update);
    update(event);
  }

  // save elements title before the tooltip is displayed
  function save() {
    //Bespoked updates start
    var tooltip = $('#tooltip');
    if ($(this).parent().parent().parent().hasClass('eps')) {
      iseps = 1;
      tooltip.addClass('reverse');
      tooltip.removeClass('default');
    }
    else { 
      iseps = 0;
      tooltip.removeClass('reverse');
      tooltip.addClass('default');
    }
    thisOff = $(this).offset();
    thisWidth = $(this).width();
    thisHeight = $(this).outerHeight();
    //Bespoked updates end

    if ($.tooltip.blocked || this == current || (!this.tooltipText && !settings(this).bodyHandler)) {
      return;
    }
    // save current
    current = this;
    title = this.tooltipText;
    if (settings(this).bodyHandler) {
      helper.title.hide();
      var bodyContent = settings(this).bodyHandler.call(this);
      if (bodyContent.nodeType || bodyContent.jquery) {
        helper.body.empty().append(bodyContent)
      }
      else {
        helper.body.html(bodyContent);
      }
      helper.body.show();
    }
    else if (settings(this).showBody) {
      var parts = title.split(settings(this).showBody);
      helper.title.html(parts.shift()).show();
      helper.body.empty();
      for (var i = 0, part; (part = parts[i]); i++) {
        if (i > 0)
          helper.body.append("<br/>");
        helper.body.append(part);
      }
      helper.body.hideWhenEmpty();
    }
    else {
      helper.title.html(title).show();
      helper.body.hide();
    }
    // if element has href or src, add and show it, otherwise hide it
    if (settings(this).showURL && $(this).url()) {
      helper.url.html($(this).url().replace('http://', '')).show();
    }
    else {
      helper.url.hide();
    }
    // add an optional class for this tip
    helper.parent.addClass(settings(this).extraClass);
    // fix PNG background for IE
    if (settings(this).fixPNG) {
      helper.parent.fixPNG();
    }
    handle.apply(this, arguments);
  }

  // delete timeout and show helper
  function show() {
    tID = null;
    if ((!IE || !$.fn.bgiframe) && settings(current).fade) {
      if (helper.parent.is(":animated")) {
        helper.parent.stop().show().fadeTo(settings(current).fade, current.tOpacity);
      }
      else {
        helper.parent.is(':visible') ? helper.parent.fadeTo(settings(current).fade, current.tOpacity) : helper.parent.fadeIn(settings(current).fade);
      }
    }
    else {
      helper.parent.show();
    }
    update();
  }

  /* callback for mousemove * updates the helper position * removes itself when no current element */
  function update(event) {
    if ($.tooltip.blocked) {
      return;
    }
    if (event && event.target.tagName == "OPTION") {
      return;
    }
    // stop updating when tracking is disabled and the tooltip is visible
    if (!track && helper.parent.is(":visible")) {
      $(document.body).unbind('mousemove', update)
    }
    // if no current element is available, remove this listener
    if (current == null) {
      $(document.body).unbind('mousemove', update);
      return;
    }
    // remove position helper classes
    helper.parent.removeClass("viewport-right").removeClass("viewport-bottom");
    var left = helper.parent[0].offsetLeft;
    var top = helper.parent[0].offsetTop;
    var tooltip = $('#tooltip');
    // Amend the tooltip position if we have an event passed in. Also, we need
    // to amend the position if the tooltip is visible or the new tooltip will
    // display in the position of the last tooltip triggered.
    if (event || tooltip.is(':visible')) {
      // Bespoked updates start
      var thisTipHeight = tooltip.height();
      var thisYOffset = 32;
      var thisTipOuterHeight = tooltip.outerHeight();
      if ($.browser.msie) {
        if (iseps == 1) {
          thisYOffset = 32;
        }
        else {
          thisYOffset = 32;
        }
      }
      top = thisOff.top - (thisTipHeight + thisYOffset);
      if (iseps == 1) {
        left = thisOff.left - (tooltip.width() + 16) + (thisWidth / 2);
      }
      else {
        left = thisOff.left + (thisWidth / 2);
      }
      // settings for inline help style tooltips
      if (settings(current).inline) {
        left = thisOff.left + thisWidth;
        // Set the vertical alignment to the centre of the input element.
        top = thisOff.top - thisTipOuterHeight + (thisTipOuterHeight / 2) + (thisHeight / 2);
        helper.parent.addClass('inline');
      }
      else {
        helper.parent.removeClass('inline');
      }
      //Bespoked updates end
      var right = 'auto';
      if (settings(current).positionLeft) {
        right = $(window).width() - left;
        left = 'auto';
      }
      helper.parent.css({left: left, right: right, top: top});
    }
    var v = viewport(),
        h = helper.parent[0];
    // Check horizontal && vertical position and apply corrections unless
    // we are using the inline style.
    if (v.x + v.cx < h.offsetLeft + h.offsetWidth && !settings(current).inline) {
      left -= h.offsetWidth + 20 + settings(current).left;
      helper.parent.css({left: left + 'px'}).addClass("viewport-right");
    }
    if (v.y + v.cy < h.offsetTop + h.offsetHeight && !settings(current).inline) {
      top -= h.offsetHeight + 20 + settings(current).top;
      helper.parent.css({top: top + 'px'}).addClass("viewport-bottom");
    }
    // Trigger event to allow other scripts to alter the tooltip.
    helper.parent.trigger('tooltip.display', current);
  }

  function viewport() {
    return {x: $(window).scrollLeft(), y: $(window).scrollTop(), cx: $(window).width(), cy: $(window).height()};
  }

  function hide(element) {
    $('#tooltip').removeClass('reverse').removeClass('default').css({'display': 'none'});
    if ($.tooltip.blocked) {
      return;
    }
    if (tID) {
      clearTimeout(tID);
    }
    current = null;
    var tsettings = settings(element);

    function complete() {
      helper.parent.removeClass(tsettings.extraClass).hide().css("opacity", "");
    }

    if ((!IE || !$.fn.bgiframe) && tsettings.fade) {
      if (helper.parent.is(':animated')) {
        helper.parent.stop().fadeTo(tsettings.fade, 0, complete);
      }
      else {
        helper.parent.stop().fadeOut(tsettings.fade, complete);
      }
    }
    else {
      complete();
    }
    if (settings(element).fixPNG) {
      helper.parent.unfixPNG();
    }
  }

  /**
   * Callback for mouseover and click events to trigger relevant tooltip
   * functionality.
   * @param event
   */
  function toggle(event) {
    if (settings(this).inline) {
      switch (event.type) {
        case 'click':
          // The save function is dependent on the context of the element providing
          // the tooltip, so we call it via jQuery's .each() method.
          $(this).each(save);
          break;
        case 'blur':
          hide(this);
          break;
      }
    }
    else {
      switch (event.type) {
        case 'mouseover':
          $(this).each(save);
          break;
        case 'click':
        case 'mouseout':
          hide(this);
          break;
      }
    }
  }
})(jQuery);;
/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
jQuery.extend({
	isArray: function( obj ) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	},
  
	queue: function( elem, type, data ) {
		if ( !elem ) {
			return;
		}

		type = (type || "fx") + "queue";
		var q = jQuery.data( elem, type );

		// Speed up dequeue by getting out quickly if this is just a lookup
		if ( !data ) {
			return q || [];
		}

		if ( !q || jQuery.isArray(data) ) {
			q = jQuery.data( elem, type, jQuery.makeArray(data) );

		} else {
			q.push( data );
		}

		return q;
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ), fn = queue.shift();

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift("inprogress");
			}

			fn.call(elem, function() {
				jQuery.dequeue(elem, type);
			});
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function( i, elem ) {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},

	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";

		return this.queue( type, function() {
			var elem = this;
			setTimeout(function() {
				jQuery.dequeue( elem, type );
			}, time );
		});
	},

	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
  
  // Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {
		if ( !elem || typeof elem === "string" ) {
			return jQuery.inArray( this[0],
				// If it receives a string, the selector is used
				// If it receives nothing, the siblings are used
				elem ? jQuery( elem ) : this.parent().children() );
		}
		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	}
});;
Drupal.behaviors.rmgSearch = function (context) {
  var clearForm = false;
  $('form[name=search]').submit(function() {
	if ($('#searchInput').val().length == 0) {
	  $('#searchInput').val('Enter a search term');
	  clearForm = true;
	  return false;
	}
  });
  
  $('#searchInput').click(function() {
    if (clearForm) {
      clearForm = false;
      $(this).val('');
    }
  });
}

function validateSearch(form) {
	var str = new String(form.value);
	if (str.match(/^(\s*(?:Search)?\s*|\s*(?:Enter\s*(?:a\s*(?:search\s*(?:term?)?)?)?)\s*)$/i) )
	{
	    // Looks like "Search" literal, (null) or whitespace(s) was entered; do
	    // nothing other than encourage our enquirer to enter a proper search expression.
		form.value = "Enter a search term";
		return false;
	}
	else if ( str.match(/^\s*(?:(?:career|job)s?|employment|work)\s*$/i) )
	{
	    // Potential employee; redirect to Careers page...
	    self.location = "http://www.royalmailgroup.com/our-people";
	    return false;
	}
	else
	{
	    // Search expression looks kosher, let it pass thru...
	    return true;
	}
  
};
(function ($) {
  Drupal.behaviors.equalHeights = function (context) {
    $('.pane-content.page .grid_2 .color-white, .pane-content.eib-eib .grid_2 .color-white, .pane-content.eib-unsorted_awg .grid_2 .color-white', context).equalHeights(2);
    $('.pane-content.document .grid_2 .color-white', context).equalHeights(2);
    $('.view-oms-category-menu ul li .grid_2', context).equalHeights(2);
  }
})(jQuery);

(function ($) {
  /*
   * Use to set equal heights on a collection of elements. If
   * elements form a grid and heights only need to match in each row,
   * specify the number of columns.
   */
  $.fn.equalHeights = function (columns, minHeight, maxHeight) {
    columns = (columns) ? columns : $(this).length;
    for (var i = 0, len = $(this).length; i < len; i += columns) {
      var tallest = (minHeight) ? minHeight : 0;
      // use slice to break collection into rows
      $(this).slice(i, i + columns)
        .each(function () {
          // find the tallest height in each row
          tallest = $(this).height() > tallest ? $(this).height() : tallest;
        })
        // manipulate row elements
        .height((maxHeight && maxHeight < tallest) ? maxHeight : tallest)
        .css("overflow", "visible");
    }

    return this;
  }
})(jQuery);
;
/*!
 * jQuery Once v2.0.0-beta.3 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var n=function(e){e=e||"once";if(typeof e!=="string"){throw new Error("The jQuery Once id parameter must be a string")}return e};e.fn.once=function(t){var r="jquery-once-"+n(t);return this.filter(function(){return e(this).data(r)!==true}).data(r,true)};e.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+n(e))};e.fn.findOnce=function(t){var r="jquery-once-"+n(t);return this.filter(function(){return e(this).data(r)===true})}});
//# sourceMappingURL=jquery.once.min.js.map;
