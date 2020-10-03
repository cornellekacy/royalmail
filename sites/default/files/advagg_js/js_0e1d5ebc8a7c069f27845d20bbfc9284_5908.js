/*
 * jQuery UI Draggable 1.7.3
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	ui.core.js
 */(function(a){a.widget("ui.draggable",a.extend({},a.ui.mouse,{_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"}(this.options.addClasses&&this.element.addClass("ui-draggable"));(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));this._mouseInit()},destroy:function(){if(!this.element.data("draggable")){return}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy()},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")){return false}this.handle=this._getHandle(b);if(!this.handle){return false}return true},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b);this._cacheHelperProportions();if(a.ui.ddmanager){a.ui.ddmanager.current=this}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(b);this.originalPageX=b.pageX;this.originalPageY=b.pageY;if(c.cursorAt){this._adjustOffsetFromHelper(c.cursorAt)}if(c.containment){this._setContainment()}this._trigger("start",b);this._cacheHelperProportions();if(a.ui.ddmanager&&!c.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,b)}this.helper.addClass("ui-draggable-dragging");this._mouseDrag(b,true);return true},_mouseDrag:function(b,d){this.position=this._generatePosition(b);this.positionAbs=this._convertPositionTo("absolute");if(!d){var c=this._uiHash();this._trigger("drag",b,c);this.position=c.position}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}if(a.ui.ddmanager){a.ui.ddmanager.drag(this,b)}return false},_mouseStop:function(c){var d=false;if(a.ui.ddmanager&&!this.options.dropBehaviour){d=a.ui.ddmanager.drop(this,c)}if(this.dropped){d=this.dropped;this.dropped=false}if((this.options.revert=="invalid"&&!d)||(this.options.revert=="valid"&&d)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d))){var b=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){b._trigger("stop",c);b._clear()})}else{this._trigger("stop",c);this._clear()}return false},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==b.target){c=true}});return c},_createHelper:function(c){var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c])):(d.helper=="clone"?this.element.clone():this.element);if(!b.parents("body").length){b.appendTo((d.appendTo=="parent"?this.element[0].parentNode:d.appendTo))}if(b[0]!=this.element[0]&&!(/(fixed|absolute)/).test(b.css("position"))){b.css("position","absolute")}return b},_adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){b={top:0,left:0}}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.element.position();return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options;if(e.containment=="parent"){e.containment=this.helper[0].parentNode}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(e.containment)&&e.containment.constructor!=Array){var c=a(e.containment)[0];if(!c){return}var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}else{if(e.containment.constructor==Array){this.containment=e.containment}}},_convertPositionTo:function(f,h){if(!h){h=this.position}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))}},_generatePosition:function(e){var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var d=e.pageX;var c=e.pageY;if(this.originalPosition){if(this.containment){if(e.pageX-this.offset.click.left<this.containment[0]){d=this.containment[0]+this.offset.click.left}if(e.pageY-this.offset.click.top<this.containment[1]){c=this.containment[1]+this.offset.click.top}if(e.pageX-this.offset.click.left>this.containment[2]){d=this.containment[2]+this.offset.click.left}if(e.pageY-this.offset.click.top>this.containment[3]){c=this.containment[3]+this.offset.click.top}}if(h.grid){var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f}}return{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()}this.helper=null;this.cancelHelperRemoval=false},_trigger:function(b,c,d){d=d||this._uiHash();a.ui.plugin.call(this,b,[c,d]);if(b=="drag"){this.positionAbs=this._convertPositionTo("absolute")}return a.widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(b){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs}}}));a.extend(a.ui.draggable,{version:"1.7.3",eventPrefix:"drag",defaults:{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false}});a.ui.plugin.add("draggable","connectToSortable",{start:function(c,e){var d=a(this).data("draggable"),f=d.options,b=a.extend({},e,{item:d.element});d.sortables=[];a(f.connectToSortable).each(function(){var g=a.data(this,"sortable");if(g&&!g.options.disabled){d.sortables.push({instance:g,shouldRevert:g.options.revert});g._refreshItems();g._trigger("activate",c,b)}})},stop:function(c,e){var d=a(this).data("draggable"),b=a.extend({},e,{item:d.element});a.each(d.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;d.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert){this.instance.options.revert=true}this.instance._mouseStop(c);this.instance.options.helper=this.instance.options._helper;if(d.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})}}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",c,b)}})},drag:function(c,f){var e=a(this).data("draggable"),b=this;var d=function(i){var n=this.offset.click.top,m=this.offset.click.left;var g=this.positionAbs.top,k=this.positionAbs.left;var j=i.height,l=i.width;var p=i.top,h=i.left;return a.ui.isOver(g+n,k+m,p,h,j,l)};a.each(e.sortables,function(g){this.instance.positionAbs=e.positionAbs;this.instance.helperProportions=e.helperProportions;this.instance.offset.click=e.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(b).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return f.helper[0]};c.target=this.instance.currentItem[0];this.instance._mouseCapture(c,true);this.instance._mouseStart(c,true,true);this.instance.offset.click.top=e.offset.click.top;this.instance.offset.click.left=e.offset.click.left;this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top;e._trigger("toSortable",c);e.dropped=this.instance.element;e.currentItem=e.element;this.instance.fromOutside=e}if(this.instance.currentItem){this.instance._mouseDrag(c)}}else{if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",c,this.instance._uiHash(this.instance));this.instance._mouseStop(c,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder){this.instance.placeholder.remove()}e._trigger("fromSortable",c);e.dropped=false}}})}});a.ui.plugin.add("draggable","cursor",{start:function(c,d){var b=a("body"),e=a(this).data("draggable").options;if(b.css("cursor")){e._cursor=b.css("cursor")}b.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._cursor){a("body").css("cursor",d._cursor)}}});a.ui.plugin.add("draggable","iframeFix",{start:function(b,c){var d=a(this).data("draggable").options;a(d.iframeFix===true?"iframe":d.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")})},stop:function(b,c){a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});a.ui.plugin.add("draggable","opacity",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("opacity")){e._opacity=b.css("opacity")}b.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._opacity){a(c.helper).css("opacity",d._opacity)}}});a.ui.plugin.add("draggable","scroll",{start:function(c,d){var b=a(this).data("draggable");if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){b.overflowOffset=b.scrollParent.offset()}},drag:function(d,e){var c=a(this).data("draggable"),f=c.options,b=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!f.axis||f.axis!="x"){if((c.overflowOffset.top+c.scrollParent[0].offsetHeight)-d.pageY<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop+f.scrollSpeed}else{if(d.pageY-c.overflowOffset.top<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop-f.scrollSpeed}}}if(!f.axis||f.axis!="y"){if((c.overflowOffset.left+c.scrollParent[0].offsetWidth)-d.pageX<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft+f.scrollSpeed}else{if(d.pageX-c.overflowOffset.left<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft-f.scrollSpeed}}}}else{if(!f.axis||f.axis!="x"){if(d.pageY-a(document).scrollTop()<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-f.scrollSpeed)}else{if(a(window).height()-(d.pageY-a(document).scrollTop())<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+f.scrollSpeed)}}}if(!f.axis||f.axis!="y"){if(d.pageX-a(document).scrollLeft()<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-f.scrollSpeed)}else{if(a(window).width()-(d.pageX-a(document).scrollLeft())<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+f.scrollSpeed)}}}}if(b!==false&&a.ui.ddmanager&&!f.dropBehaviour){a.ui.ddmanager.prepareOffsets(c,d)}}});a.ui.plugin.add("draggable","snap",{start:function(c,d){var b=a(this).data("draggable"),e=b.options;b.snapElements=[];a(e.snap.constructor!=String?(e.snap.items||":data(draggable)"):e.snap).each(function(){var g=a(this);var f=g.offset();if(this!=b.element[0]){b.snapElements.push({item:this,width:g.outerWidth(),height:g.outerHeight(),top:f.top,left:f.left})}})},drag:function(u,p){var g=a(this).data("draggable"),q=g.options;var y=q.snapTolerance;var x=p.offset.left,w=x+g.helperProportions.width,f=p.offset.top,e=f+g.helperProportions.height;for(var v=g.snapElements.length-1;v>=0;v--){var s=g.snapElements[v].left,n=s+g.snapElements[v].width,m=g.snapElements[v].top,A=m+g.snapElements[v].height;if(!((s-y<x&&x<n+y&&m-y<f&&f<A+y)||(s-y<x&&x<n+y&&m-y<e&&e<A+y)||(s-y<w&&w<n+y&&m-y<f&&f<A+y)||(s-y<w&&w<n+y&&m-y<e&&e<A+y))){if(g.snapElements[v].snapping){(g.options.snap.release&&g.options.snap.release.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=false;continue}if(q.snapMode!="inner"){var c=Math.abs(m-e)<=y;var z=Math.abs(A-f)<=y;var j=Math.abs(s-w)<=y;var k=Math.abs(n-x)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m-g.helperProportions.height,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s-g.helperProportions.width}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n}).left-g.margins.left}}var h=(c||z||j||k);if(q.snapMode!="outer"){var c=Math.abs(m-f)<=y;var z=Math.abs(A-e)<=y;var j=Math.abs(s-x)<=y;var k=Math.abs(n-w)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A-g.helperProportions.height,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n-g.helperProportions.width}).left-g.margins.left}}if(!g.snapElements[v].snapping&&(c||z||j||k||h)){(g.options.snap.snap&&g.options.snap.snap.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=(c||z||j||k||h)}}});a.ui.plugin.add("draggable","stack",{start:function(b,c){var e=a(this).data("draggable").options;var d=a.makeArray(a(e.stack.group)).sort(function(g,f){return(parseInt(a(g).css("zIndex"),10)||e.stack.min)-(parseInt(a(f).css("zIndex"),10)||e.stack.min)});a(d).each(function(f){this.style.zIndex=e.stack.min+f});this[0].style.zIndex=e.stack.min+d.length}});a.ui.plugin.add("draggable","zIndex",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("zIndex")){e._zIndex=b.css("zIndex")}b.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._zIndex){a(c.helper).css("zIndex",d._zIndex)}}})})(jQuery);;

(function ($) {

/**
 * Modal Frame object for parent windows.
 */
Drupal.modalFrame = Drupal.modalFrame || {
  dirtyFormsWarning: Drupal.t('Your changes will be lost if you close this popup now.'),
  options: {},
  iframe: { $container: null, $element: null },
  isOpen: false,

  // Flag that tells us if we have a child document loaded. Our window resize
  // handler will ignore events while no child document is loaded.
  isChildLoaded: false,

  // Flag used to control if we have already installed our custom
  // event handlers to the parent window.
  parentReady: false,

  // Provide a unique namespace for event handlers managed by this
  // Modal Frame instance.
  uniqueName: 'modalframe-'+ ((new Date()).getTime())
};

/**
 * Provide a unique name for an event handler.
 */
Drupal.modalFrame.eventHandlerName = function(name) {
  var self = this;
  return name +'.'+ self.uniqueName;
};

/**
 * Open a modal frame.
 *
 * Ensure that only one modal frame is opened ever. Use Drupal.modalFrame.load()
 * if the modal frame is already open but a new page needs to be loaded.
 *
 * @param options
 *   Properties of the modal frame to open:
 *   - url: the URL of the page to open in the modal frame.
 *   - width: width of the modal frame in pixels.
 *   - height: height of the modal frame in pixels.
 *   - autoFit: boolean indicating whether the modal frame should be resized to
 *     fit the contents of the document loaded.
 *   - onOpen: callback to invoke when the modal frame is opened.
 *   - onLoad: callback to invoke when the child document in the modal frame is
 *     fully loaded.
 *   - onSubmit: callback to invoke when the modal frame is closed.
 *     @todo: We could rename onSubmit to onClose, however we would be breaking
 *     other modules that rely on it. Maybe when doing a formal port to D7?
 *   - customDialogOptions: an object with custom jQuery UI Dialog options.
 *
 * @return
 *   If the modal frame was opened true, otherwise false.
 */
Drupal.modalFrame.open = function(options) {
  var self = this;

  // Just one modal is allowed.
  if (self.isOpen || $('#modalframe-container').size()) {
    return false;
  }

  // Make sure the modal frame is not resized until a child document is loaded.
  self.isChildLoaded = false;

  // If not ready yet, install custom event handlers to the parent window
  // for proper communication with the child window.
  if (!self.parentReady) {
    // Install a custom event handler to allow child windows to tell us they
    // have just loaded a document.
    $(window).bind(self.eventHandlerName('childLoad'), function(event, iFrameWindow, isClosing) {
      self.bindChild(iFrameWindow, isClosing);
    });

    // Install a custom event handler to allow child windows to tell us they
    // are unloading the document.
    $(window).bind(self.eventHandlerName('childUnload'), function(event, iFrameWindow) {
      self.unbindChild(iFrameWindow);
    });

    // Install a custom event handler to allow child windows to tell us they
    // want to close the Modal Frame.
    $(window).bind(self.eventHandlerName('childClose'), function(event, args, statusMessages) {
      self.close(args, statusMessages);
    });

    // Ok, so we're ready to properly communicate with child windows.
    self.parentReady = true;
  }

  // For some reason, onblur events attached by the Drupal autocomplete
  // behavior do not fire after a Modal Frame has been closed. I spent a lot
  // of time trying to figure out the cause, but I've been unable to. :(
  // Anyway, here's a temporary fix that makes sure the autocomplete popup
  // is hidden as soon as the user selects a candidate. I'm not enterily
  // happy with this solution, but it seems to solve the problem for now.
  // Please, see the following issue: http://drupal.org/node/635754
  if (Drupal.jsAC && !Drupal.jsAC.prototype.modalFrameSelect) {
    Drupal.jsAC.prototype.modalFrameSelect = Drupal.jsAC.prototype.select;
    Drupal.jsAC.prototype.select = function(node) {
      this.modalFrameSelect(node);
      this.hidePopup();
    };
  }

  // Build the modal frame options structure.
  self.options = {
    url: options.url,
    width: options.width,
    height: options.height,
    autoFit: (options.autoFit == undefined || options.autoFit),
    draggable: (options.draggable == undefined || options.draggable),
    onOpen: options.onOpen,
    onLoad: options.onLoad,
    onSubmit: options.onSubmit,
    customDialogOptions: options.customDialogOptions || {}
  };

  // Create the dialog and related DOM elements.
  self.create();

  // Open the dialog offscreen where we can set its size, etc.
  self.iframe.$container.dialog('option', {position: ['-999em', '-999em']}).dialog('open');

  return true;
};

/**
 * Create the modal dialog.
 */
Drupal.modalFrame.create = function() {
  var self = this;

  // Note: We use scrolling="yes" for IE as a workaround to yet another IE bug
  // where the horizontal scrollbar is always rendered, no matter how wide the
  // iframe element is defined. IE also requires a few more non-std properties.
  self.iframe.$element = $('<iframe id="modalframe-element" name="modalframe-element"'+ ($.browser.msie ? ' scrolling="yes" frameborder="0" allowTransparency="true"' : '') +'/>');
  self.iframe.$container = $('<div id="modalframe-container"/>').append(self.iframe.$element);
  $('body').append(self.iframe.$container);

  // Open callback for the jQuery UI dialog.
  var dialogOpen = function() {
    // Unbind the keypress handler installed by ui.dialog itself.
    // IE does not fire keypress events for some non-alphanumeric keys
    // such as the tab character. http://www.quirksmode.org/js/keys.html
    // Also, this is not necessary here because we need to deal with an
    // iframe element that contains a separate window.
    // We'll try to provide our own behavior from bindChild() method.
    $('.modalframe').unbind('keypress.ui-dialog');

    // Adjust close button features.
    $('.modalframe .ui-dialog-titlebar-close:not(.modalframe-processed)').addClass('modalframe-processed')
      .attr('href', 'javascript:void(0)')
      .attr('title', Drupal.t('Close'))
      .unbind('click').bind('click', function() { self.close(false); return false; });

    // Adjust titlebar.
    if (!self.options.draggable) {
      $('.modalframe .ui-dialog-titlebar').css('cursor', 'default');
    }

    // Fix dialog position on the viewport.
    self.fixPosition($('.modalframe'), true);

    // Compute initial dialog size.
    var dialogSize = self.sanitizeSize({width: self.options.width, height: self.options.height});

    // Compute frame size and dialog position based on dialog size.
    var frameSize = $.extend({}, dialogSize);
    frameSize.height -= $('.modalframe .ui-dialog-titlebar').outerHeight(true);
    var dialogPosition = self.computeCenterPosition($('.modalframe'), dialogSize);

    // Adjust size of the iframe element and container.
    $('.modalframe').width(dialogSize.width).height(dialogSize.height);
    self.iframe.$container.width(frameSize.width).height(frameSize.height);
    self.iframe.$element.width(frameSize.width).height(frameSize.height);

    // Update the dialog size so that UI internals are aware of the change.
    self.iframe.$container.dialog('option', {width: dialogSize.width, height: dialogSize.height});

    // Hide the dialog, center it on the viewport and then fade it in with
    // the iframe still hidden, until the child document is loaded.
    self.iframe.$element.hide();
    $('.modalframe').hide().css({top: dialogPosition.top, left: dialogPosition.left});
    $('.modalframe').fadeIn('slow', function() {
      // Load the document on the hidden iframe (see bindChild method).
      self.load(self.options.url);
    });

    // Install the window resize event handler if autoFit option is enabled.
    if (self.options.autoFit) {
      var $window = $(window);
      self.currentWindowSize = {width: $window.width(), height: $window.height()};
      $window.bind(self.eventHandlerName('resize'), function() {
        // Prevent from resizing the modal frame while a child document is
        // loading or unloading. Note that we will resize the modal frame
        // anyway, as soon as it is loaded, so we can safely ignore these
        // events until then.
        if (!self.isChildLoaded) {
          return;
        }
        // Check that we really have a modal frame opened.
        if (!self.isOpen || !self.isObject(self.iframe.documentSize)) {
          return;
        }
        // Do not resize the modal frame if the window dimensions have not
        // changed more than a few pixels tall or wide.
        var newWindowSize = {width: $window.width(), height: $window.height()};
        if (Math.abs(self.currentWindowSize.width - newWindowSize.width) > 5 || Math.abs(self.currentWindowSize.height - newWindowSize.height) > 5) {
          self.currentWindowSize = newWindowSize;
          self.resize();
        }
      });
    }

    // Allow external modules to intervene when the modal frame is just opened.
    if ($.isFunction(self.options.onOpen)) {
      self.options.onOpen(self);
    }

    self.isOpen = true;
  };

  // BeforeClose callback for the jQuery UI dialog.
  var dialogBeforeClose = function() {
    if (self.beforeCloseEnabled) {
      return true;
    }
    if (!self.beforeCloseIsBusy) {
      self.beforeCloseIsBusy = true;
      setTimeout(function() { self.close(false); }, 1);
    }
    return false;
  };

  // Close callback for the jQuery UI dialog.
  var dialogClose = function() {
    if (self.options.autoFit) {
      $(window).unbind(self.eventHandlerName('resize'));
      delete self.currentWindowSize;
    }
    $(document).unbind(self.eventHandlerName('keydown'));
    $('.modalframe .ui-dialog-titlebar-close').unbind(self.eventHandlerName('keydown'));
    self.fixPosition($('.modalframe'), false);
    try {
      self.iframe.$element.remove();
      self.iframe.$container.dialog('destroy').remove();
    } catch(e) {};
    delete self.iframe.documentSize;
    delete self.iframe.Drupal;
    delete self.iframe.$element;
    delete self.iframe.$container;
    if (self.beforeCloseEnabled) {
      delete self.beforeCloseEnabled;
    }
    if (self.beforeCloseIsBusy) {
      delete self.beforeCloseIsBusy;
    }
    self.isOpen = false;
  };

  // Options for the jQuery UI dialog.
  var dialogOptions = {
    modal: true,
    autoOpen: false,
    closeOnEscape: true,
    draggable: self.options.draggable,
    resizable: false,
    title: Drupal.t('Loading...'),
    dialogClass: 'modalframe',
    open: dialogOpen,
    beforeclose: dialogBeforeClose,
    close: dialogClose
  };

  // Hide the contents of the dialog while dragging?
  if (self.options.draggable) {
    dialogOptions.dragStart = function() {
      self.iframe.$container.hide();
    };
    dialogOptions.dragStop = function() {
      self.iframe.$container.show('fast');
    };
  }

  // Allow external scripts to override the default jQuery UI Dialog options.
  $.extend(dialogOptions, self.options.customDialogOptions);

  // Open the jQuery UI dialog offscreen.
  self.iframe.$container.dialog(dialogOptions);
};

/**
 * Load the given URL into the dialog iframe.
 */
Drupal.modalFrame.load = function(url) {
  var self = this;
  var iframe = self.iframe.$element.get(0);
  // Get the document object of the iframe window.
  // @see http://xkr.us/articles/dom/iframe-document/
  var doc = (iframe.contentWindow || iframe.contentDocument);
  if (doc.document) {
    doc = doc.document;
  }
  // Install an onLoad event handler for the iframe element. This is a
  // last resort mechanism, in case the server-side code of the child
  // window is broken and it does not invoke modalframe_child_js().
  self.iframe.$element.bind('load', function() {
    // If the iframe is not visible, this means the bindChild() method
    // has not been invoked, hence something went wrong. If we do not
    // show the iframe now, we'll get an endless loading animation.
    // Showing the iframe is not the perfect solution, but it is better
    // than nothing. Probably, there's a bug in the server-side script.
    if (!self.iframe.$element.is(':visible')) {
      setTimeout(function() {
        try {
          self.iframe.$element.fadeIn('fast');
        } catch(e) {}
      }, 1000);
    }
  });
  doc.location.replace(url);
};

/**
 * Check if the dialog can be closed.
 */
Drupal.modalFrame.canClose = function() {
  var self = this;
  if (!self.isOpen) {
    return false;
  }
  if (self.isObject(self.iframe.Drupal)) {
    // Ignore errors that may happen here.
    try {
      // Prompt the user for confirmation to close the dialog if the child
      // window has dirty forms.
      if (self.isObject(self.iframe.Drupal.dirtyForms)) {
        if (self.iframe.Drupal.dirtyForms.isDirty() && !confirm(self.dirtyFormsWarning)) {
          return false;
        }
        self.iframe.Drupal.dirtyForms.warning = null;
      }
      // Disable onBeforeUnload behaviors on the child window.
      if (self.isObject(self.iframe.Drupal.onBeforeUnload)) {
        self.iframe.Drupal.onBeforeUnload.disable();
      }
    } catch(e) {}
  }
  return true;
};

/**
 * Close the modal frame.
 */
Drupal.modalFrame.close = function(args, statusMessages) {
  var self = this;

  // Check if the dialog can be closed.
  if (!self.canClose()) {
    delete self.beforeCloseIsBusy;
    return false;
  }

  // Hide and destroy the dialog.
  function closeDialog() {
    // Prevent double execution when close is requested more than once.
    if (!self.isObject(self.iframe.$container)) {
      return;
    }
    self.beforeCloseEnabled = true;
    self.iframe.$container.dialog('close');
    if ($.isFunction(self.options.onSubmit)) {
      self.options.onSubmit(args, statusMessages);
    }
  }
  if (!self.isObject(self.iframe.$element) || !self.iframe.$element.size() || !self.iframe.$element.is(':visible')) {
    closeDialog();
  }
  else {
    self.iframe.$element.fadeOut('fast', function() {
      $('.modalframe').animate({height: 'hide', opacity: 'hide'}, closeDialog);
    });
  }
  return true;
};

/**
 * Bind the child window.
 */
Drupal.modalFrame.bindChild = function(iFrameWindow, isClosing) {
  var self = this;
  var $iFrameWindow = iFrameWindow.jQuery;
  var $iFrameDocument = $iFrameWindow(iFrameWindow.document);
  self.iframe.Drupal = iFrameWindow.Drupal;

  // We are done if the child window is closing.
  if (isClosing) {
    return;
  }

  // Update the dirty forms warning on the child window.
  if (self.isObject(self.iframe.Drupal.dirtyForms)) {
    self.iframe.Drupal.dirtyForms.warning = self.dirtyFormsWarning;
  }

  // Update the dialog title with the child window title.
  $('.modalframe .ui-dialog-title').html($iFrameDocument.attr('title'));

  // Setting tabIndex makes the div focusable.
  // Setting outline to 0 prevents a border on focus in Mozilla.
  // Inspired by ui.dialog initialization code.
  $iFrameDocument.attr('tabIndex', -1).css('outline', 0);

  // Perform animation to show the iframe element.
  self.iframe.$element.fadeIn('slow', function() {
    // @todo: Watch for experience in the way we compute the size of the
    // iframed document. There are many ways to do it, and none of them
    // seem to be perfect. Note though, that the size of the iframe itself
    // may affect the size of the child document, specially on fluid layouts.
    // If you get in trouble, then I would suggest to choose a known dialog
    // size and disable the autoFit option.
    self.iframe.documentSize = {width: $iFrameDocument.width(), height: $iFrameWindow('body').height() + 25};

    // If the autoFit option is enabled, resize the modal frame based on the
    // size of the child document just loaded.
    if (self.options.autoFit) {
      self.currentWindowSize = {width: $(window).width(), height: $(window).height()};
      self.resize();

      // Install a custom resize handler to allow the child window to trigger
      // changes to the modal frame size.
      $(window).unbind(self.eventHandlerName('childResize')).bind(self.eventHandlerName('childResize'), function() {
        var overflow = $('html', $iFrameDocument).css('overflow');
        $('html', $iFrameDocument).css('overflow', 'hidden');
        self.iframe.documentSize = {width: $iFrameDocument.width(), height: $iFrameWindow('body').height() + 25};
        $('html', $iFrameDocument).css('overflow', overflow);
        self.resize();
      });
    }

    // Try to enhance keyboard based navigation of the modal dialog.
    // Logic inspired by the open() method in ui.dialog.js, and
    // http://wiki.codetalks.org/wiki/index.php/Docs/Keyboard_navigable_JS_widgets

    // Get a reference to the close button.
    var $closeButton = $('.modalframe .ui-dialog-titlebar-close');

    // Search tabbable elements on the iframed document to speed up related
    // keyboard events.
    // @todo: Do we need to provide a method to update these references when
    // AJAX requests update the DOM on the child document?
    var $iFrameTabbables = $iFrameWindow(':tabbable:not(form)');
    var $firstTabbable = $iFrameTabbables.filter(':first');
    var $lastTabbable = $iFrameTabbables.filter(':last');

    // Set focus to the first tabbable element in the content area or the
    // first button. If there are no tabbable elements, set focus on the
    // close button of the dialog itself.
    if (!$firstTabbable.focus().size()) {
      $iFrameDocument.focus();
    }

    // Unbind keyboard event handlers that may have been enabled previously.
    $(document).unbind(self.eventHandlerName('keydown'));
    $closeButton.unbind(self.eventHandlerName('keydown'));

    // When the focus leaves the close button, then we want to jump to the
    // first/last inner tabbable element of the child window.
    $closeButton.bind(self.eventHandlerName('keydown'), function(event) {
      if (event.keyCode && event.keyCode == $.ui.keyCode.TAB) {
        var $target = (event.shiftKey ? $lastTabbable : $firstTabbable);
        if (!$target.size()) {
          $target = $iFrameDocument;
        }
        setTimeout(function() { $target.focus(); }, 10);
        return false;
      }
    });

    // When the focus leaves the child window, then drive the focus to the
    // close button of the dialog.
    $iFrameDocument.bind(self.eventHandlerName('keydown'), function(event) {
      if (event.keyCode) {
        if (event.keyCode == $.ui.keyCode.TAB) {
          if (event.shiftKey && event.target == $firstTabbable.get(0)) {
            setTimeout(function() { $closeButton.focus(); }, 10);
            return false;
          }
          else if (!event.shiftKey && event.target == $lastTabbable.get(0)) {
            setTimeout(function() { $closeButton.focus(); }, 10);
            return false;
          }
        }
        else if (event.keyCode == $.ui.keyCode.ESCAPE) {
          // Checking the closeOnEscape option, if is false then let the child window open
          if (typeof self.options.customDialogOptions.closeOnEscape == 'undefined' || self.options.customDialogOptions.closeOnEscape) {
            setTimeout(function() { self.close(false); }, 10);
            return false;
          }
        }
      }
    });

    // When the focus is captured by the parent document, then try
    // to drive the focus back to the first tabbable element, or the
    // close button of the dialog (default).
    $(document).bind(self.eventHandlerName('keydown'), function(event) {
      if (event.keyCode && event.keyCode == $.ui.keyCode.TAB) {
        setTimeout(function() {
          if (!$iFrameWindow(':tabbable:not(form):first').focus().size()) {
            $closeButton.focus();
          }
        }, 10);
        return false;
      }
    });

    // Our window resize handler can proceed while we have a document loaded.
    self.isChildLoaded = true;

    // Get rid of the loading animation.
    self.iframe.$container.addClass('modalframe-loaded');

    // Allow external modules to intervene when the child document in the modal
    // frame is fully loaded.
    if ($.isFunction(self.options.onLoad)) {
      self.options.onLoad(self, $iFrameWindow, $iFrameDocument);
    }
  });
};

/**
 * Unbind the child window.
 */
Drupal.modalFrame.unbindChild = function(iFrameWindow) {
  var self = this;

  // Lock our window resize handler until we have a new child document loaded.
  self.isChildLoaded = false;

  // Prevent memory leaks by explicitly unbinding event handlers attached
  // to the child document.
  iFrameWindow.jQuery(iFrameWindow.document).unbind(self.eventHandlerName('keydown'));
  $(window).unbind(self.eventHandlerName('childResize'));

  // Change the modal dialog title.
  $('.modalframe .ui-dialog-title').html(Drupal.t('Please, wait...'));

  // Restore the loading animation.
  self.iframe.$container.removeClass('modalframe-loaded');

  // Hide the iframe element.
  self.iframe.$element.fadeOut('fast');
};

/**
 * Check if the given variable is an object.
 */
Drupal.modalFrame.isObject = function(something) {
  return (something !== null && typeof something === 'object');
};

/**
 * Sanitize dialog size.
 */
Drupal.modalFrame.sanitizeSize = function(size) {
  var width, height;
  var $window = $(window);
  var minWidth = 300, maxWidth = $window.width() - 30;
  if (typeof size.width != 'number') {
    width = maxWidth;
  }
  else if (size.width < minWidth || size.width > maxWidth) {
    width = Math.min(maxWidth, Math.max(minWidth, size.width));
  }
  else {
    width = size.width;
  }
  var minHeight = 100, maxHeight = $window.height() - 30;
  if (typeof size.height != 'number') {
    height = maxHeight;
  }
  else if (size.height < minHeight || size.height > maxHeight) {
    height = Math.min(maxHeight, Math.max(minHeight, size.height));
  }
  else {
    height = size.height;
  }
  return {width: width, height: height};
};

/**
 * Fix the position of the modal frame within the viewport.
 *
 * Possible alternative to position:'fixed' for IE6:
 * @see http://www.howtocreate.co.uk/fixedPosition.html
 */
Drupal.modalFrame.fixPosition = function($element, isOpen) {
  var self = this, $window = $(window);
  if ($.browser.msie && parseInt($.browser.version) <= 6) {
    // IE6 does not support position:'fixed'.
    // Lock the window scrollBar instead.
    if (isOpen) {
      var yPos = $window.scrollTop();
      var xPos = $window.scrollLeft();
      $window.bind(self.eventHandlerName('scroll'), function() {
        window.scrollTo(xPos, yPos);
        // Default browser action cannot be prevented here.
      });
    }
    else {
      $window.unbind(self.eventHandlerName('scroll'));
    }
  }
  else {
    // Use CSS to do it on other browsers.
    if (isOpen) {
      var offset = $element.offset();
      $element.css({
        left: (offset.left - $window.scrollLeft()),
        top: (offset.top - $window.scrollTop()),
        position: 'fixed'
      });
    }
  }
};

/**
 * Compute the position to center an element with the given size.
 */
Drupal.modalFrame.computeCenterPosition = function($element, elementSize) {
  var $window = $(window);
  var position = {
    left: Math.max(0, parseInt(($window.width() - elementSize.width) / 2)),
    top: Math.max(0, parseInt(($window.height() - elementSize.height) / 2))
  };
  if ($element.css('position') != 'fixed') {
    var $document = $(document);
    position.left += $document.scrollLeft();
    position.top += $document.scrollTop();
  }
  return position;
};

/**
 * Resize the modal frame based on the current document size.
 *
 * This method may be invoked by:
 * - The parent window resize handler (when the parent window is resized).
 * - The bindChild() method (when the child document is loaded).
 * - The child window resize handler (when the child window is resized).
 */
Drupal.modalFrame.resize = function() {
  var self = this, documentSize = self.iframe.documentSize;

  // Compute frame and dialog size based on document size.
  var maxSize = self.sanitizeSize({}), titleBarHeight = $('.modalframe .ui-dialog-titlebar').outerHeight(true);
  var frameSize = self.sanitizeSize(documentSize), dialogSize = $.extend({}, frameSize);
  if ((dialogSize.height + titleBarHeight) <= maxSize.height) {
    dialogSize.height += titleBarHeight;
  }
  else {
    dialogSize.height = maxSize.height;
    frameSize.height = dialogSize.height - titleBarHeight;
  }

  // Compute dialog position centered on viewport.
  var dialogPosition = self.computeCenterPosition($('.modalframe'), dialogSize);

  var animationOptions = $.extend(dialogSize, dialogPosition);

  // Perform the resize animation.
  $('.modalframe').animate(animationOptions, 'fast', function() {
    // Proceed only if the dialog still exists.
    if (self.isObject(self.iframe.$element) && self.isObject(self.iframe.$container)) {
      // Resize the iframe element and container.
      $('.modalframe').width(dialogSize.width).height(dialogSize.height);
      self.iframe.$container.width(frameSize.width).height(frameSize.height);
      self.iframe.$element.width(frameSize.width).height(frameSize.height);

      // Update the dialog size so that UI internals are aware of the change.
      self.iframe.$container.dialog('option', {width: dialogSize.width, height: dialogSize.height});
    }
  });
};

/**
 * Render the throbber.
 */
Drupal.theme.prototype.modalFrameThrobber = function() {
  return '<div class="modalframe-throbber">&nbsp;</div>';
};

})(jQuery);
;
// $ID$

(function ($, Drupal, window, undefined) {

  /*
   * Add the automodal settings to the selectors.
   */
  Drupal.behaviors.automodal = function (context) {
    $.each(Drupal.settings.automodal, function(selector, settings) {
      $(selector +':not(.automodal-processed)', context)
        .addClass('automodal-processed')
        .bind('click', function() {
          settings.url = $(this).attr('href') || '#';
          if (settings.url.indexOf('?') >= 0) {
            settings.url += '&'
          }
          else {
            settings.url += '?'
          }
          settings.url += 'automodal=true';

          // Allow others to alter the settings as needed.
          settings = Drupal.automodal.settingsAlterCall(settings);

          settings.onSubmit = Drupal.automodal.onSubmitCall;
          Drupal.modalFrame.open(settings);
          return false;
        });
    });
  }

  Drupal.automodal = Drupal.automodal || {};

  /**
   * Functions under Drupal.automodal.onSubmitCall are iterated over onSubmit
   * for the modalFrames when the window is set to close.
   */
  Drupal.automodal.onSubmitCallback = {
    automodal: function(args, statusMessages) {
      if (args.redirect) {
        window.location = decodeURIComponent(args.redirect);
      }

      if (args.reload) {
        window.location.reload();
      }
    }
  }

  /**
   * Functions under Drupal.automodal.settingsAlter are iterated over when a
   * Modal Frame is created allowing the alteration of settings.
   */
  Drupal.automodal.settingsAlter = {
    automodal: function(settings) {
      if (settings.automodalClose) {
        settings.url += '&automodalClose=true';
      }

      if (settings.automodalReload) {
        settings.url += '&automodalReload=true';
      }

      if (settings.automodalRedirect != undefined) {
        settings.url += '&automodalRedirect=' + encodeURIComponent(settings.automodalRedirect);
      }
      return settings;
    }
  }

  /**
   * Allow the settings to be altered for Modal Frame.
   *
   * When a Modal Frame instance is created allow the the settings to be altered
   * by others. Other scripts can alter the settings by adding functions under
   * Drupal.automodal.settingsAlter. There is a default implementation at
   * Drupal.automodal.settingsAlter.automodal.
   */
  Drupal.automodal.settingsAlterCall = function(settings) {
    var newSettings = settings;
    for (var i in Drupal.automodal.settingsAlter) {
      newSettings = Drupal.automodal.settingsAlter[i](newSettings);
    }
    return newSettings;
  }

  /**
   * Iterate over multiple onSubmit functions when Modal Frame calls the onSubmit
   * function. There is a default implementation at
   * Drupal.automodal.onSubmitCallback.automodal. Other scripts can add their
   * own callbacks as functions under Drupal.automodal.onSubmitCallback (e.g.,
   * Drupal.automodal.onSubmitCallback.foo).
   */
  Drupal.automodal.onSubmitCall = function(args, statusMessages) {
    for (var i in Drupal.automodal.onSubmitCallback) {
      Drupal.automodal.onSubmitCallback[i](args, statusMessages);
    }
  }
})(jQuery, Drupal, window);;
// $Id: nice_menus.js,v 1.10.2.6 2008/08/04 23:45:51 add1sun Exp $

// We need to do some browser sniffing to weed out IE 6 only
// because only IE6 needs this hover hack.
if (document.all && !window.opera && (navigator.appVersion.search("MSIE 6.0") != -1) && $.browser.msie) {
  function IEHoverPseudo() {
      $("ul.nice-menu li.menuparent").hover(function(){
          $(this).addClass("over").find("> ul").show().addShim();
        },function(){
          $(this).removeClass("over").find("> ul").removeShim().hide();
        }
      );
      // Add a hover class to all li for CSS styling. Silly naming is done
      // so we don't break CSS compatibility for .over class already in use
      // and due to the fact that IE6 doesn't understand multiple selectors.
      $("ul.nice-menu li").hover(function(){
          $(this).addClass("ie-over");
        },function(){
          $(this).removeClass("ie-over");
        }
      );
    }

    // This is the jquery method of adding a function
    // to the BODY onload event.  (See jquery.com)
    $(document).ready(function(){ IEHoverPseudo() });
}

$.fn.addShim = function() {
  return this.each(function(){
	  if(document.all && $("select").size() > 0) {
	    var ifShim = document.createElement('iframe');
	    ifShim.src = "javascript:false";
			ifShim.style.width=$(this).width()+1+"px";
      ifShim.style.height=$(this).find("> li").size()*23+20+"px";
			ifShim.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
		  ifShim.style.zIndex="0";
    $(this).prepend(ifShim);
      $(this).css("zIndex","99");
		}
	});
};

$.fn.removeShim = function() {
  return this.each(function(){
	  if (document.all) $("iframe", this).remove();
	});
};
;

(function ($) {
  Drupal.Panels = {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
/*
 * Provides javascript functionality for cookie_policy
 */

Drupal.cookiePolicy = {};
Drupal.cookiePolicy.cookiesChecked = false;
/**
 * Initialise cookie_policy script
 * @param context
 */

Drupal.behaviors.cookiePolicy = function (context) {
  var $cookie_policy_banner = $('div[id=block-cookie_policy-0]');
  // If no banner is displayed then the cookie policy was suppressed.
  if (!$cookie_policy_banner.length) {
    return;
  }
  // Show policy text, If the cookie is not set.
  if (!Drupal.cookiePolicy.hasCookie()) {
    $cookie_policy_banner.removeClass('display_none');
  }
  // set session or persisent cookies as requirred
  if (Drupal.cookiePolicy.cookiesChecked === false && $.cookie) {
    Drupal.cookiePolicy.setCookies();
    Drupal.cookiePolicy.cookiesChecked = true;
  }

  // Create the initially hidden modal popup if the hidden div is present.
  // Have to pattern match as different themes apply different ids for the same
  // block.
  var cookiePolicyPopup = $('div[id$=cookie_policy-popup]');
  if (cookiePolicyPopup.length !== 0) {
    var overlayWidth = '100%';
    var overlayMinWidth = '320px';
    var overlayMaxWidth = '800px';

    cookiePolicyPopup.dialog({
      autoOpen: false,
      modal: false,
      title: Drupal.settings.cookie_policy.cookiePolicyPopupTitle,
      width: overlayWidth,
      zIndex: 10000,
      open: function () {
        // Set 'left' to 0 if negative number.
        if (cookiePolicyPopup.parent().offset().left < 0) {
          cookiePolicyPopup.parent().css({"left": "0"});
        }

        // Set some basic styles.
        cookiePolicyPopup.parent().css({"maxWidth": overlayMaxWidth, "minWidth": overlayMinWidth});
      }
    });

    // Add additional styles so that jQuery 1.7.3 class stylings will be applied to 1.6 if necessary
    if ($.ui.version === '1.6') {
      var dialogs = $('.ui-dialog');
      if (dialogs.length !== 0) {
        dialogs.each(function(index) {
          $(this).addClass('ui-widget ui-widget-content ui-corner-all');
          $(this).css('height', 'auto');
        });
      }
      var titleBars = $('.ui-dialog-titlebar');
      if (titleBars.length !== 0) {
        titleBars.each(function(index) {
          $(this).addClass('ui-widget-header ui-widget-header ui-corner-all ui-helper-clearfix');
        });
      }
      var titleBarCloseButtons = $('.ui-dialog-titlebar-close span');
      if (titleBarCloseButtons.length !== 0) {
        titleBarCloseButtons.each(function(index) {
          $(this).addClass('ui-icon ui-icon-closethick');
        });
      }
      var dialogContents = $('.ui-dialog-content');
      if (dialogContents.length !== 0) {
        dialogContents.each(function(index) {
          $(this).addClass('ui-widget-content');
          $(this).css('height', 'auto');
          $(this).css('width', 'auto');
        });
      }
      var overlays = $('.ui-dialog-overlay');
      if (overlays.length !== 0) {
        overlays.each(function(index) {
          $(this).addClass('ui-widget-overlay');
        });
      }
    }
    // bind the popup trigger to any elements that require it
    // note passing context to selector fails with ajax replacement
    $('.cookie_policy-popup-trigger').bind('click', Drupal.cookiePolicy.popup);
  }
};

/**
 * Checks and sets the cookies to determine whether the user has accepted the cookie policy
 */
Drupal.cookiePolicy.setCookies = function () {
  // get cookie policy cookies
  var sessionCookie = $.cookie('OPT_IN_TEMP');

  var cookie_domain = Drupal.settings.cookie_policy.cookiePolicyDomain;

  // if we have a session cookie...
  if (sessionCookie != null) {
    //..set the persistent cookie
    var expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 365);

    $.cookie('OPT_IN_CONSENT', "OPT-IN-CC", {
      expires : expireTime,
      path    : '/',
      domain  : cookie_domain
    });
  }
  else {
    // set the session Cookie
    $.cookie("OPT_IN_TEMP", "OPT-IN-TEMP-Cookie", {
      path    : '/',
      domain  : cookie_domain
    });
  }
};

/**
 * Checks the cookies exist for cookie policy.
 */
Drupal.cookiePolicy.hasCookie = function () {
  var sessionCookie = $.cookie('OPT_IN_TEMP');
  var persistentCookie = $.cookie('OPT_IN_CONSENT');
  return sessionCookie != null ||  persistentCookie != null;
};

/**
 * Opens the modal dialog explaining cookie policy
 * @returns {Boolean}
 */
Drupal.cookiePolicy.popup = function () {
  var popup = $('div[id$=cookie_policy-popup]');
  popup.dialog("open");
  if ($.ui.version === '1.6') {
    popup.css('width', 'auto');
  }
  Drupal.cookiePolicy.sendOmnitureScreen();
  // Adds tealium tags.
  if (window.trackOverlay !== undefined) {
    var new_tag = [];
    new_tag['pageOverlayType'] = 'Legal';
    new_tag['pageOverlayTitle'] = 'More about Cookies';
    tealium_tag_overlay(new_tag);
  }
  return false;
};

/**
 * Sends an updated message to omniture in response to the popup being invoked 
 */
Drupal.cookiePolicy.sendOmnitureScreen = function () {
  // Check s object already created by initial omniture call on page load
  if (typeof s != 'undefined') {
    // set properties
    s.pageName = Drupal.settings.cookie_policy.cookiePolicyPopupPageName;
    s.prop7    = Drupal.settings.cookie_policy.cookiePolicyPopupTitle;
    s.prop8    = Drupal.settings.cookie_policy.cookiePolicyPopupTitle;
    s.prop12   = Drupal.settings.cookie_policy.cookiePolicyPopupTitle;
    // send message
    s.t();
  }
};
;
