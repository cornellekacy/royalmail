/* global a2a*/
(function (Drupal) {
  'use strict';

  Drupal.behaviors.addToAny = {
    attach: function (context, settings) {
      // If not the full document (it's probably AJAX), and window.a2a exists
      if (context !== document && window.a2a) {
        a2a.init_all(); // Init all uninitiated AddToAny instances
      }
    }
  };

})(Drupal);
;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","./version"],a):a(jQuery)}(function(a){return function(){function b(a,b,c){return[parseFloat(a[0])*(l.test(a[0])?b/100:1),parseFloat(a[1])*(l.test(a[1])?c/100:1)]}function c(b,c){return parseInt(a.css(b,c),10)||0}function d(b){var c=b[0];return 9===c.nodeType?{width:b.width(),height:b.height(),offset:{top:0,left:0}}:a.isWindow(c)?{width:b.width(),height:b.height(),offset:{top:b.scrollTop(),left:b.scrollLeft()}}:c.preventDefault?{width:0,height:0,offset:{top:c.pageY,left:c.pageX}}:{width:b.outerWidth(),height:b.outerHeight(),offset:b.offset()}}var e,f=Math.max,g=Math.abs,h=/left|center|right/,i=/top|center|bottom/,j=/[\+\-]\d+(\.[\d]+)?%?/,k=/^\w+/,l=/%$/,m=a.fn.position;a.position={scrollbarWidth:function(){if(void 0!==e)return e;var b,c,d=a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),f=d.children()[0];return a("body").append(d),b=f.offsetWidth,d.css("overflow","scroll"),c=f.offsetWidth,b===c&&(c=d[0].clientWidth),d.remove(),e=b-c},getScrollInfo:function(b){var c=b.isWindow||b.isDocument?"":b.element.css("overflow-x"),d=b.isWindow||b.isDocument?"":b.element.css("overflow-y"),e="scroll"===c||"auto"===c&&b.width<b.element[0].scrollWidth,f="scroll"===d||"auto"===d&&b.height<b.element[0].scrollHeight;return{width:f?a.position.scrollbarWidth():0,height:e?a.position.scrollbarWidth():0}},getWithinInfo:function(b){var c=a(b||window),d=a.isWindow(c[0]),e=!!c[0]&&9===c[0].nodeType,f=!d&&!e;return{element:c,isWindow:d,isDocument:e,offset:f?a(b).offset():{left:0,top:0},scrollLeft:c.scrollLeft(),scrollTop:c.scrollTop(),width:c.outerWidth(),height:c.outerHeight()}}},a.fn.position=function(e){if(!e||!e.of)return m.apply(this,arguments);e=a.extend({},e);var l,n,o,p,q,r,s=a(e.of),t=a.position.getWithinInfo(e.within),u=a.position.getScrollInfo(t),v=(e.collision||"flip").split(" "),w={};return r=d(s),s[0].preventDefault&&(e.at="left top"),n=r.width,o=r.height,p=r.offset,q=a.extend({},p),a.each(["my","at"],function(){var a,b,c=(e[this]||"").split(" ");1===c.length&&(c=h.test(c[0])?c.concat(["center"]):i.test(c[0])?["center"].concat(c):["center","center"]),c[0]=h.test(c[0])?c[0]:"center",c[1]=i.test(c[1])?c[1]:"center",a=j.exec(c[0]),b=j.exec(c[1]),w[this]=[a?a[0]:0,b?b[0]:0],e[this]=[k.exec(c[0])[0],k.exec(c[1])[0]]}),1===v.length&&(v[1]=v[0]),"right"===e.at[0]?q.left+=n:"center"===e.at[0]&&(q.left+=n/2),"bottom"===e.at[1]?q.top+=o:"center"===e.at[1]&&(q.top+=o/2),l=b(w.at,n,o),q.left+=l[0],q.top+=l[1],this.each(function(){var d,h,i=a(this),j=i.outerWidth(),k=i.outerHeight(),m=c(this,"marginLeft"),r=c(this,"marginTop"),x=j+m+c(this,"marginRight")+u.width,y=k+r+c(this,"marginBottom")+u.height,z=a.extend({},q),A=b(w.my,i.outerWidth(),i.outerHeight());"right"===e.my[0]?z.left-=j:"center"===e.my[0]&&(z.left-=j/2),"bottom"===e.my[1]?z.top-=k:"center"===e.my[1]&&(z.top-=k/2),z.left+=A[0],z.top+=A[1],d={marginLeft:m,marginTop:r},a.each(["left","top"],function(b,c){a.ui.position[v[b]]&&a.ui.position[v[b]][c](z,{targetWidth:n,targetHeight:o,elemWidth:j,elemHeight:k,collisionPosition:d,collisionWidth:x,collisionHeight:y,offset:[l[0]+A[0],l[1]+A[1]],my:e.my,at:e.at,within:t,elem:i})}),e.using&&(h=function(a){var b=p.left-z.left,c=b+n-j,d=p.top-z.top,h=d+o-k,l={target:{element:s,left:p.left,top:p.top,width:n,height:o},element:{element:i,left:z.left,top:z.top,width:j,height:k},horizontal:c<0?"left":b>0?"right":"center",vertical:h<0?"top":d>0?"bottom":"middle"};n<j&&g(b+c)<n&&(l.horizontal="center"),o<k&&g(d+h)<o&&(l.vertical="middle"),f(g(b),g(c))>f(g(d),g(h))?l.important="horizontal":l.important="vertical",e.using.call(this,a,l)}),i.offset(a.extend(z,{using:h}))})},a.ui.position={fit:{left:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollLeft:d.offset.left,g=d.width,h=a.left-b.collisionPosition.marginLeft,i=e-h,j=h+b.collisionWidth-g-e;b.collisionWidth>g?i>0&&j<=0?(c=a.left+i+b.collisionWidth-g-e,a.left+=i-c):j>0&&i<=0?a.left=e:i>j?a.left=e+g-b.collisionWidth:a.left=e:i>0?a.left+=i:j>0?a.left-=j:a.left=f(a.left-h,a.left)},top:function(a,b){var c,d=b.within,e=d.isWindow?d.scrollTop:d.offset.top,g=b.within.height,h=a.top-b.collisionPosition.marginTop,i=e-h,j=h+b.collisionHeight-g-e;b.collisionHeight>g?i>0&&j<=0?(c=a.top+i+b.collisionHeight-g-e,a.top+=i-c):j>0&&i<=0?a.top=e:i>j?a.top=e+g-b.collisionHeight:a.top=e:i>0?a.top+=i:j>0?a.top-=j:a.top=f(a.top-h,a.top)}},flip:{left:function(a,b){var c,d,e=b.within,f=e.offset.left+e.scrollLeft,h=e.width,i=e.isWindow?e.scrollLeft:e.offset.left,j=a.left-b.collisionPosition.marginLeft,k=j-i,l=j+b.collisionWidth-h-i,m="left"===b.my[0]?-b.elemWidth:"right"===b.my[0]?b.elemWidth:0,n="left"===b.at[0]?b.targetWidth:"right"===b.at[0]?-b.targetWidth:0,o=-2*b.offset[0];k<0?(c=a.left+m+n+o+b.collisionWidth-h-f,(c<0||c<g(k))&&(a.left+=m+n+o)):l>0&&(d=a.left-b.collisionPosition.marginLeft+m+n+o-i,(d>0||g(d)<l)&&(a.left+=m+n+o))},top:function(a,b){var c,d,e=b.within,f=e.offset.top+e.scrollTop,h=e.height,i=e.isWindow?e.scrollTop:e.offset.top,j=a.top-b.collisionPosition.marginTop,k=j-i,l=j+b.collisionHeight-h-i,m="top"===b.my[1],n=m?-b.elemHeight:"bottom"===b.my[1]?b.elemHeight:0,o="top"===b.at[1]?b.targetHeight:"bottom"===b.at[1]?-b.targetHeight:0,p=-2*b.offset[1];k<0?(d=a.top+n+o+p+b.collisionHeight-h-f,(d<0||d<g(k))&&(a.top+=n+o+p)):l>0&&(c=a.top-b.collisionPosition.marginTop+n+o+p-i,(c>0||g(c)<l)&&(a.top+=n+o+p))}},flipfit:{left:function(){a.ui.position.flip.left.apply(this,arguments),a.ui.position.fit.left.apply(this,arguments)},top:function(){a.ui.position.flip.top.apply(this,arguments),a.ui.position.fit.top.apply(this,arguments)}}}}(),a.ui.position});;
/*! jQuery UI - v1.12.1 - 2017-03-31
* http://jqueryui.com
* Copyright jQuery Foundation and other contributors; Licensed  */
!function(a){"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../unique-id","../version","../widget"],a):a(jQuery)}(function(a){return a.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var b=a(this).attr("title")||"";return a("<a>").text(b).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(b,c){var d=(b.attr("aria-describedby")||"").split(/\s+/);d.push(c),b.data("ui-tooltip-id",c).attr("aria-describedby",a.trim(d.join(" ")))},_removeDescribedBy:function(b){var c=b.data("ui-tooltip-id"),d=(b.attr("aria-describedby")||"").split(/\s+/),e=a.inArray(c,d);e!==-1&&d.splice(e,1),b.removeData("ui-tooltip-id"),d=a.trim(d.join(" ")),d?b.attr("aria-describedby",d):b.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=a("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=a([])},_setOption:function(b,c){var d=this;this._super(b,c),"content"===b&&a.each(this.tooltips,function(a,b){d._updateContent(b.element)})},_setOptionDisabled:function(a){this[a?"_disable":"_enable"]()},_disable:function(){var b=this;a.each(this.tooltips,function(c,d){var e=a.Event("blur");e.target=e.currentTarget=d.element[0],b.close(e,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var b=a(this);if(b.is("[title]"))return b.data("ui-tooltip-title",b.attr("title")).removeAttr("title")}))},_enable:function(){this.disabledTitles.each(function(){var b=a(this);b.data("ui-tooltip-title")&&b.attr("title",b.data("ui-tooltip-title"))}),this.disabledTitles=a([])},open:function(b){var c=this,d=a(b?b.target:this.element).closest(this.options.items);d.length&&!d.data("ui-tooltip-id")&&(d.attr("title")&&d.data("ui-tooltip-title",d.attr("title")),d.data("ui-tooltip-open",!0),b&&"mouseover"===b.type&&d.parents().each(function(){var b,d=a(this);d.data("ui-tooltip-open")&&(b=a.Event("blur"),b.target=b.currentTarget=this,c.close(b,!0)),d.attr("title")&&(d.uniqueId(),c.parents[this.id]={element:this,title:d.attr("title")},d.attr("title",""))}),this._registerCloseHandlers(b,d),this._updateContent(d,b))},_updateContent:function(a,b){var c,d=this.options.content,e=this,f=b?b.type:null;return"string"==typeof d||d.nodeType||d.jquery?this._open(b,a,d):(c=d.call(a[0],function(c){e._delay(function(){a.data("ui-tooltip-open")&&(b&&(b.type=f),this._open(b,a,c))})}),void(c&&this._open(b,a,c)))},_open:function(b,c,d){function e(a){j.of=a,g.is(":hidden")||g.position(j)}var f,g,h,i,j=a.extend({},this.options.position);if(d){if(f=this._find(c))return void f.tooltip.find(".ui-tooltip-content").html(d);c.is("[title]")&&(b&&"mouseover"===b.type?c.attr("title",""):c.removeAttr("title")),f=this._tooltip(c),g=f.tooltip,this._addDescribedBy(c,g.attr("id")),g.find(".ui-tooltip-content").html(d),this.liveRegion.children().hide(),i=a("<div>").html(g.find(".ui-tooltip-content").html()),i.removeAttr("name").find("[name]").removeAttr("name"),i.removeAttr("id").find("[id]").removeAttr("id"),i.appendTo(this.liveRegion),this.options.track&&b&&/^mouse/.test(b.type)?(this._on(this.document,{mousemove:e}),e(b)):g.position(a.extend({of:c},this.options.position)),g.hide(),this._show(g,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){g.is(":visible")&&(e(j.of),clearInterval(h))},a.fx.interval)),this._trigger("open",b,{tooltip:g})}},_registerCloseHandlers:function(b,c){var d={keyup:function(b){if(b.keyCode===a.ui.keyCode.ESCAPE){var d=a.Event(b);d.currentTarget=c[0],this.close(d,!0)}}};c[0]!==this.element[0]&&(d.remove=function(){this._removeTooltip(this._find(c).tooltip)}),b&&"mouseover"!==b.type||(d.mouseleave="close"),b&&"focusin"!==b.type||(d.focusout="close"),this._on(!0,c,d)},close:function(b){var c,d=this,e=a(b?b.currentTarget:this.element),f=this._find(e);return f?(c=f.tooltip,void(f.closing||(clearInterval(this.delayedShow),e.data("ui-tooltip-title")&&!e.attr("title")&&e.attr("title",e.data("ui-tooltip-title")),this._removeDescribedBy(e),f.hiding=!0,c.stop(!0),this._hide(c,this.options.hide,function(){d._removeTooltip(a(this))}),e.removeData("ui-tooltip-open"),this._off(e,"mouseleave focusout keyup"),e[0]!==this.element[0]&&this._off(e,"remove"),this._off(this.document,"mousemove"),b&&"mouseleave"===b.type&&a.each(this.parents,function(b,c){a(c.element).attr("title",c.title),delete d.parents[b]}),f.closing=!0,this._trigger("close",b,{tooltip:c}),f.hiding||(f.closing=!1)))):void e.removeData("ui-tooltip-open")},_tooltip:function(b){var c=a("<div>").attr("role","tooltip"),d=a("<div>").appendTo(c),e=c.uniqueId().attr("id");return this._addClass(d,"ui-tooltip-content"),this._addClass(c,"ui-tooltip","ui-widget ui-widget-content"),c.appendTo(this._appendTo(b)),this.tooltips[e]={element:b,tooltip:c}},_find:function(a){var b=a.data("ui-tooltip-id");return b?this.tooltips[b]:null},_removeTooltip:function(a){a.remove(),delete this.tooltips[a.attr("id")]},_appendTo:function(a){var b=a.closest(".ui-front, dialog");return b.length||(b=this.document[0].body),b},_destroy:function(){var b=this;a.each(this.tooltips,function(c,d){var e=a.Event("blur"),f=d.element;e.target=e.currentTarget=f[0],b.close(e,!0),a("#"+c).remove(),f.data("ui-tooltip-title")&&(f.attr("title")||f.attr("title",f.data("ui-tooltip-title")),f.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),a.uiBackCompat!==!1&&a.widget("ui.tooltip",a.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var a=this._superApply(arguments);return this.options.tooltipClass&&a.tooltip.addClass(this.options.tooltipClass),a}}),a.ui.tooltip});;
/**
 * @file
 * RMLCWR Theme JavaScript.
 */

(function ($, Drupal) {

  Drupal.rmlcwrCustom = {};

  /**
   * Attaches the Ajax behavior to links which use 'call-ajax' class.
   */
  Drupal.behaviors.rmlcwrBindAjax = {
    attach: function (context) {
      Drupal.rmlcwrCustom.callAjaxOnLinks(document.body);
    }
  };

  Drupal.behaviors.rmlcwrFormSubmitAddClass = {
    attach: function (context) {
      $('.webform-custom-submit').click(
        function () {
          // Add class to form on submit - to style textboxes if invalid after
          // submit.
          $('form').addClass('form-submitted');
        }
      );
    }
  };

  /**
   * RML floating labels.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Applies floating label behaviours to input fields that contain text.
   */
  Drupal.behaviors.floatingLabels = {
    attach: function (context) {
      $('.form-floating-labels').once().find('input[type="text"], input[type="email"], input[type="tel"]').each(function () {
        var $this = $(this);
        var $floatingLabelWrapper = $this.parent();
        var $floatingLabel = $floatingLabelWrapper.find('label');

        // Remove any placeholder, this element's label will act as a visual
        // placeholder.
        $this.attr('placeholder', '');

        // Set a flag to this label wrapper that it contains a floating label,
        // this avoids any issues with labels overlapping any text input for
        // non JS users.
        $floatingLabelWrapper.addClass('floating-label-wrapper');

        // Check if this element has a value, if it does prevent any label being
        // positioned over the input text. Also check for initial (hidden)
        // Loqate fields and float their labels automatically.
        if ($this.val() || $floatingLabelWrapper.hasClass('address-lookup__field--initial')) {
          $floatingLabelWrapper.addClass('active');
        }

        $this.on('focus', function () {
          // Don't show the fade behaviour if this element has a value.
          if ($this.val()) {
            $floatingLabelWrapper.addClass('active');
          }
          // No value so this label is acting as a placeholder, show the fade
          // animation.
          else {
            // 100 = 0.1s.
            var fadeDuration = 100;

            // Opacity = 0.6.
            $floatingLabel.fadeTo(fadeDuration, 0.6, function () {
              // Fade out animation complete, fade back in. CSS is repositioning
              // the label in the textfield border.
              $floatingLabelWrapper.addClass('active');

              // Opacity = 1.
              $floatingLabel.fadeTo(fadeDuration, 1);
            });
          }
        });

        $this.on('blur', function () {
          if ($floatingLabelWrapper.hasClass('address-lookup__field')) {
            // Dont replace the placeholder on Loqate fields to ensure a new
            // address search doesn't cause labels to overlap values.
            return;
          }

          if ($this.val() == '') {
            // The text element doesnt have a value so reposition the label as
            // a placeholder.
            $floatingLabelWrapper.removeClass('active')
          }
        });
      });
    }
  };

  /**
   * RML Accordion.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Adds accordion behaviours.
   */
  Drupal.behaviors.rmlcwrAccordion = {
    attach: function (context) {
      $('.accordion-toggle').once().click(function (e) {
        var $toggle = $(this);
        if ($toggle.hasClass('accordion-all-screens') || $(window).width() < 768) {
          e.preventDefault();
          var $menu = $toggle.next();
          var $accordion_wrapper = $toggle.closest('.accordion-wrapper');

          if ($accordion_wrapper.hasClass('auto-collapse')) {
            // Hide all related accordion content by default.
            $accordion_wrapper.find('.accordion-content').slideUp('slow');
            $accordion_wrapper.find('.accordion-toggle').removeClass('open').attr('aria-expanded', 'false');
          }

          if (($menu).is(':hidden')) {
            $menu.slideDown('slow');
            $toggle.addClass('open').attr('aria-expanded', 'true');

          }
          else {
            $menu.slideUp('slow');
            $toggle.removeClass('open').attr('aria-expanded', 'false');
          }
        }
      });
    }
  };

  /**
   * More info toggle accordion.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Adds show more info behaviours.
   */
  Drupal.behaviors.rmlcwrMoreInfo = {
    attach: function (context) {
      $('.more-info-toggle').once().click(function () {
        var $toggle = $(this);

        $toggle.closest('.more-info-accordion-wrapper').toggleClass('open');

        $toggle.attr('aria-expanded', ($toggle.attr('aria-expanded') == 'false' ? true : false));
      });
    }
  };

  /**
   * Toggle visibility of tabbed content on click of associated radio buttons.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Adds tabs behaviours.
   */
  Drupal.behaviors.rmlcwrTabs = {
    attach: function (context) {
      $('.tab-toggle').once().click(function (e) {

        var $toggle = $(this);
        var $tabs_wrapper = $toggle.closest('.tabs-wrapper');
        var tab_content_id = '#' + $toggle.attr('id') + '-content';

        // Hide all related tab content by default.
        $tabs_wrapper.find('.tab-content').removeClass('visible').addClass('hidden');
        $tabs_wrapper.find('.tab-toggle').attr('aria-expanded', 'false');

        $toggle.attr('aria-expanded', 'true');
        $(tab_content_id).removeClass('hidden').addClass('visible');
      });
    }
  };

  /**
   * Set a consistent element height.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Calculates the max height of a set of elements and adds a consistent
   *   height to all elements of this type.
   */
  Drupal.behaviors.rmlcwrSetHeight = {
    attach: function (context) {

      var $card_types = [
        '.promocard-content-wrapper',
        '.proof-point-body',
      ];

      // Weird iOS issue where this JS is firing too early causing a
      // miscalculation of height.
      setTimeout(function () {
        $.each($card_types, function (index, content_wrapper) {
          var maxHeight = -1;

          $(content_wrapper, context).once().each(function () {
              if ($(this).outerHeight() > maxHeight) {
                maxHeight = $(this).height();
              }
            });

          $(content_wrapper, context).height(maxHeight);
        });
      }, 50);
    }
  };

  /**
   * Primary Header behaviours.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Shows/hides the primary menu children on hover/focus.
   */
  Drupal.behaviors.rmlcwrPrimaryHeader = {
    attach: function (context) {
      var $primary_menu_links = $('.primary-menu-level-0 .accordion-toggle a', context);

      if ($(window).width() < 768) {
        $('.navbar-toggler').once().click(function (e) {
          e.preventDefault();

          $('body').toggleClass('menu-visible');
        });

        $('.block-primary-nav').on('touchstart', function (e) {
          e.stopPropagation();

          if ($(e.target).hasClass('block-primary-nav')) {
            // Collapse the menu if tapped outside of the menu.
            $('body').removeClass('menu-visible');
          }
        });
      }
      else {
        if (!Modernizr.touchevents) {
          $('.primary-menu-level-0.accordion-content-wrapper').on('focusout', function () {
            var $menu = $(this);
            // Set a short timeout as no element has immediate focus on
            // 'focusout'.
            setTimeout(function () {
              if ($menu.find(':focus').length === 0) {
                // No link within this menu has focus so collapse the menu.
                $menu.find('.menu-wrapper').slideUp('fast');
              }
            }, 10);
          });

          $primary_menu_links.hoverIntent({
            over: rmlcwrSlideDown,
            out: rmlcwrSlideUp
          }).focus(rmlcwrSlideDown);
        }
        else {
          // Handle touch device behaviours.
          $primary_menu_links.on('touchstart', function (event) {
            // Prevent the link routing on initial tap.
            event.preventDefault();

            var $this = $(this);
            rmlcwrSlideUp(event);
            $this.closest('.accordion-content-wrapper').find('.menu-wrapper').slideDown('fast');

            $primary_menu_links.not($this).removeClass('dropped');
            if ($this.hasClass('dropped')) {
              // Menu is already opened, assume the user wants to click the
              // link.
              window.location = $this.attr('href');
            }

            $this.addClass('dropped');
          });

          // Close the menu when tapped outside of the menu wrapper.
          $('html').on('touchstart', function (event) {
            rmlcwrSlideUp(event);
            $primary_menu_links.removeClass('dropped');
          });

          // Don't close the menu if the user has tapped inside the menu wrapper.
          $('.block-primary-nav').on('touchstart', function (event) {
            event.stopPropagation();
          });
        }

        // Position the megamenu when scrolling.
        $(window).scroll(function (event) {
          var scroll = $(window).scrollTop();
          var diff = scroll - (scroll * 2);

          var headerHeight = $('.header').outerHeight();
          var preHeaderHeight = $('.pre-header').outerHeight();

          var offset = headerHeight + preHeaderHeight;

          if ($('.toolbar-bar').is(':visible')) {
            offset += $('.toolbar-bar').outerHeight();
          }

          if ($('.toolbar-tray').hasClass('is-active')) {
            offset += $('.toolbar-tray').outerHeight();
          }

          $('.menu-wrapper').css('top', + (diff + offset) + 'px');
        });
      }

      // Adding class to parent li from menu attributes.
      $('.menu-links-introstyle').parent().addClass('list-item-intro');
      $('.menu-links-overarchingstyle').parent().addClass('list-item-overarching');
      $('.menu-links-arrowstyle').parent().addClass('list-item-arrow');
    }
  };

  /**
   * Add an icon and message for links that open in a new window.
   */
  Drupal.behaviors.rmlcwrExtLink = {
    attach: function (context) {
      Drupal.rmlcwrCustom.rmlcwrExtLinkIcon(context);
    }
  };

  /**
   * Add a file icon to download links.
   */
  Drupal.behaviors.rmlcwrFileIcon = {
    attach: function (context) {
      const downloadIcon = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="icon icon--download"><use xlink:href="#download"></svg>';
      $('.file-link.content-cta-primary, .file-link.content-cta-secondary', context).each(function () {
        $(this).append(downloadIcon);
      });
    }
  };

  /**
   * Display new window link icon for the links pointing to external website.
   */
  Drupal.rmlcwrCustom.rmlcwrExtLinkIcon = function (context) {
    const newWindowText = '<span class="visually-hidden">' +
      Drupal.t("Opens in a new window") + '</span>';
    const newWindowIndicator =
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="new-window"><use xlink:href="#external"></svg>';

    $("a, .external-window", context).each(function () {
      const $link = $(this);
      // Check if the link opens in a new window, ignore any 'addtoany' links.
      if (($link.attr("target") === "_blank" || $link.hasClass('external-window')) && !rmlcwrIsAddToAny($link)) {
        var linkText = $link.text().split(' ');

        // Store the last word from the link.
        var lastWord = linkText.pop();

        // Its possible the last word is actually an icon, so ignore those
        // scenarios here, as well as ignoring links that are only a single
        // word.
        if (lastWord.length > 0 && linkText.length > 0) {
          lastWord = lastWord + newWindowText;

          // Don't add icons if the link already has an icon.
          if (!$link.closest("nav").hasClass("royalmail-social-links")) {
            lastWord = lastWord + newWindowIndicator;
          }

          // Recompile the link wrapping the final word in a span to ensure
          // the text and ext icon sit on the same line.
          var finalText = linkText.join(" ") + ' <span class="ext-link-last-word">' + lastWord + '</span>';

          $link.addClass('ext-link-wrapped-last-word').html(finalText);
        }
        else {
          $link.append(newWindowText);

          // Don't add icons if the link already has an icon.
          if (!$link.closest("nav").hasClass("royalmail-social-links")) {
            $link.append(newWindowIndicator);
          }
        }
      }
    });
  };

  /**
   * Slides down the menu in the header navigation.
   *
   * @param object event
   *   The hover In event.
   */
  function rmlcwrSlideDown(event) {
    // Slide up all menus, and remove all menu classes.
    rmlcwrSlideUp(event);

    $(this).closest('.accordion-content-wrapper').find('.menu-wrapper').slideDown('fast');
  };

  /**
   * Determines if a link is from AddToAny.
   *
   * @param object $link
   *   The link.
   *
   * @return bool
   *   true if the link is from AddToAny, false otherwise.
   */
  function rmlcwrIsAddToAny($link) {
    if ($link.parent().hasClass('a2a_full_footer') || $link.parent().hasClass('a2a_kit') || $link.hasClass('a2a_i')) {
      return true;
    }

    return false;
  };

  /**
   * Slides up the menu in the header navigation.
   *
   * @param object event
   *   The hover Out event.
   */
  function rmlcwrSlideUp(event) {
    var $menu_attach_wrapper = $('.menu-wrapper');

    // When hovering off, slide up the menus remove styling classes.
    if ($(".menu-wrapper:hover").length === 0) {
      $menu_attach_wrapper.slideUp('fast');
    }

    // Collapse menu items that don't collapse on menu drop down hoverout.
    $menu_attach_wrapper.mouseleave(function (event) {
      $menu_attach_wrapper.slideUp('fast');
    });
  };

  /**
   * Add clear button when value is entered in track item field.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   */
  Drupal.behaviors.trackItemClear = {
    attach: function (context) {
      var $trackInput = $('.form-item-track-number .form-text:text');
      var $iconCloseBtn = $('.form-item-track-number .field-suffix > div');

      $trackInput.keyup(function (e) {
        if ($(this).val() != '') {
          $trackInput.not(this).attr('disabled','disabled');
          $iconCloseBtn.removeClass('visually-hidden');
        }
        else {
          $trackInput.removeAttr('disabled');
          $iconCloseBtn.addClass('visually-hidden');
        }

        $iconCloseBtn.click(function () {
          $trackInput.val('');
          $iconCloseBtn.addClass('visually-hidden');
        });
      });
    }
  };

  /**
   * Set a select element selected state.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   */
  Drupal.behaviors.selectState = {
    attach: function (context) {
      $('select').change(function () {
        var $this = $(this);

        if ($this.val()) {
          $this.addClass('selected');
        }
        else {
          $this.removeClass('selected');
        }
      });
    }
  };

  /**
   * Bind ajax to links that use the 'call-ajax' class.
   *
   * @param {HTMLElement} element
   *   Element to enable Ajax functionality for.
   */
  Drupal.rmlcwrCustom.callAjaxOnLinks = function (element) {
    // Bind Ajax behaviors to all items showing the class 'call-ajax'.
    $(element)
      .find('.call-ajax')
      .once('ajax')
      .each(function (i, ajaxLink) {
        const $linkElement = $(ajaxLink);

        const elementSettings = {
          progress: { type: 'throbber' },
          speed: 'fast',
          dialogType: $linkElement.data('dialog-type'),
          dialog: $linkElement.data('dialog-options'),
          dialogRenderer: $linkElement.data('dialog-renderer'),
          base: $linkElement.attr('id'),
          element: ajaxLink,
        };
        const href = $linkElement.attr('href');
        // For anchor tags, these will go to the target of the anchor rather
        // than the usual location.
        if (href) {
          elementSettings.url = href;
          elementSettings.event = 'click';
        }
        Drupal.ajax(elementSettings);
      });
  };

  /**
   * Add play button behaviour to video overlays.
   */
  Drupal.behaviors.rmlcwrVideo = {
    attach: function (context) {

      $('.video-play').once('rmlcwrVideo').click(function () {

        // Hide the play button.
        var $playButton = $(this).parent();
        $playButton.hide();

        // Hide the overlay.
        $playButton.siblings('.video-thumbnail').hide();

        // Play the video from the nested iframe.
        $playButton.siblings('.field--name-field-video').find('iframe').contents().find('iframe')[0].src += "&autoplay=1";
      });
    }
  };

}(jQuery, Drupal));
;
/**
 * @file
 * Set up tooltip triggers on form description elements.
 */

(function ($, Drupal) {

  'use strict'

  const tooltipDefaultOptions = {

    // @see
    // https://stackoverflow.com/questions/18231315/jquery-ui-tooltip-html-with-links
    disabled: true,
    position: {
      my: 'center+4 bottom-20',
      at: 'top',
      collision: 'flip none',
      using: function (position, feedback) {
        $('<div>')
          .addClass('tooltip-arrow')
          .appendTo(this);

        // Is the tooltip very close to the right edge?
        const atRight = (feedback.element.left + feedback.element.width) > $(window).width();
        if (atRight) {
          $(this).addClass('at-right-edge');
        }

        // Prevent tooltips appearing offscreen to the left on mobile.
        if ($(window).width() < 768 && position.left < 0) {
          position.left = 15;
        }

        $(this).css(position);
      }
    },
    open: function (event, ui) {
      ui.tooltip.click(function () {
        $(event.target).tooltip('disable').tooltip('close');
      });
    }
  }

  // @see http://api.jqueryui.com/tooltip/
  Drupal.rmlcwr = Drupal.rmlcwr || {}

  Drupal.rmlcwr.tooltipElement = Drupal.rmlcwr.tooltipElement || {}
  Drupal.rmlcwr.tooltipElement.options = Drupal.rmlcwr.tooltipElement.options || tooltipDefaultOptions
  Drupal.rmlcwr.tooltipIcon = '<a href="javascript:void(0)" class="tooltip-close"><span class="icon-wrapper"><svg class="icon icon--cross" focusable="false" aria-hidden="true" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#cross"></use></svg></span><span class="visually-hidden">close</span></a>';

  /**
   * Set up tooltip triggers.
   */
  Drupal.behaviors.rmlcwrTooltipElement = {
    attach: function (context) {
      $(context).find('.tooltip-trigger').once('tooltip-element').each(function () {
        const $element = $(this)

        let items = $element
        let description = $element.find('.tooltip-text').html()

        const tooltipOptions = $.extend(Drupal.rmlcwr.tooltipElement.options, {
          items: items,
          content: description + Drupal.rmlcwr.tooltipIcon
        })

        $element.tooltip(tooltipOptions)

      })
      .click(function () {
        var $this = $(this);

        if ($('#' + $this.attr('aria-describedby')).length) {
          // Tooltip is already open, close it.
          $this.tooltip('disable').tooltip('close');
        }
        else {
          $this.tooltip('enable').tooltip('open');

          var $toolTip = $('#' + $this.attr('aria-describedby'));
          // Reposition the tooltip arrow over the tooltip trigger.
          var triggerLeft = $this.offset().left;
          var triggerWidth = $this.width();

          // Central position of the tooltip relevant to the window.
          var triggerPosition = triggerLeft + (triggerWidth / 2);
          // Calculate the position of the tooltip relative to the trigger.
          var relativeArrowPosition = triggerPosition - $toolTip.offset().left;

          // Reposition the arrow over the tooltip.
          $toolTip.find('.tooltip-arrow').css('left', relativeArrowPosition + 'px');
          // Display external link icon if content contains any link.
          Drupal.rmlcwrCustom.rmlcwrExtLinkIcon($('.ui-tooltip-content'));
        }
      })
      .on('mouseleave mouseout focusout', function (e) {
        // Don't hide after hover.
        e.stopImmediatePropagation();
      });
    }
  };

  /**
   * Reload tooltip content dynamically.
   */
  Drupal.rmlcwr.rmlcwrReloadTooltipElement = function (element, content) {
    const tooltipOptions = $.extend(Drupal.rmlcwr.tooltipElement.options, {
      items: element,
      content: content + Drupal.rmlcwr.tooltipIcon
    })

    element.tooltip(tooltipOptions);
  };

}(jQuery, Drupal))
;
/**
 * @file
 * RMLCWR Common function JavaScript.
 */

(function ($, Drupal) {
  'use strict';
  Drupal.util = {
    "weekDays": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
  };

  /**
   * @description: Remove non-printable ASCII chars.
   * @param {String} String containing non-printable ASCII characters.
   * @returns {String} String without non-printable ASCII characters.
   */
  Drupal.util.removeInvalidChars = function (asciiString) {
    var nonAsciiString = '';
    for (var c = 0; c < asciiString.length; c++) {
      if (asciiString.charCodeAt(c) >= 0 && asciiString.charCodeAt(c) <= 127) {
        nonAsciiString += asciiString.charAt(c);
      }
    }
    return nonAsciiString;
  };

  /**
   * @description: Add javascript file dynamically.
   * @param {Object} Object containing required values
   *  related to script.
   * @returns {Object} Response of callback function.
   */
  Drupal.util.addScript = function (option) {
    var result = '';
    $.ajax({
      url: option.urls,
      dataType: 'script',
      cache: true,
      async: false,
      success: function () {
        if (typeof option.success === 'function') {
          result = option.success();
        }
      }
    });
    return result;
  }

  /**
   * @description: Check provided value is current day.
   * @param {String} day - Day value like 'Monday', 'Tuesday' etc..
   * @returns TRUE if the current day is equal to day.
   */
  Drupal.util.isCurrentDay = function (day) {
    var todayDate = Drupal.util.currentUKDate();
    return (
      day.toLowerCase().trim() ===
      Drupal.util.weekDays[todayDate.getDay()].toLowerCase().trim()
    );
  };

  /**
  * @description: Provide date with UK Timezone.
  * @returns {Date} UK current date(Format:Tue Dec 11 2018 14:56:51).
  */
  Drupal.util.currentUKDate = function () {
    var options = {
      timeZone: 'Europe/London',
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
    };

    try {
      // Use en-US to ensure the format passed to date() is mm/dd/yyyy.
      // dd/mm/yyyy is an invalid dateString to pass to date().
      var formatter = new Intl.DateTimeFormat(['en-US'], options);
    }
    catch (e) {
      // Add the required polyfills script for Intl.DateTimeFormat API
      // for IE and Edge browsers.
      var formatter = Drupal.util.addScript({
        urls: [
          '/themes/custom/rmlcwr/node_modules/date-time-format-timezone/build/browserified/date-time-format-timezone-complete-min.js'
        ],
        success: function (response) {
          return new Intl.DateTimeFormat([], options);
        }
      });
    }
    // Invalid characters are getting added when used
    // polyfill function Intl.DateTimeFormat for IE and Edge.
    // Hence need to remove those characters using
    // Drupal.util.removeInvalidChars().
    return new Date(Drupal.util.removeInvalidChars(formatter.format(new Date())));
  };

  /**
   * @description: Check current time is between two times.
   * @param {Object} start_time - Start time.
   * @param {Object} end_time - End time.
   * @return TRUE if the current time is between a start and end timestamp.
   */
  Drupal.util.nowBetweenTimes = function (start_time, end_time) {
    if (start_time && end_time) {
      var startTime = start_time.split(":");
      var endTime = end_time.split(":");
      var currentDate = Drupal.util.currentUKDate();
      var startDate = Drupal.util.currentUKDate();
      startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]));
      var endDate = Drupal.util.currentUKDate();
      endDate.setHours(parseInt(endTime[0]), parseInt(endTime[1]));
      return currentDate >= startDate && currentDate < endDate;
    }
  };
}(jQuery, Drupal));
;
/*!
 * hoverIntent v1.9.0 // 2017.09.01 // jQuery v1.7.0+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007-2017 Brian Cherne
 */
!function(factory){"use strict";"function"==typeof define&&define.amd?define(["jquery"],factory):jQuery&&!jQuery.fn.hoverIntent&&factory(jQuery)}(function($){"use strict";var cX,cY,_cfg={interval:100,sensitivity:6,timeout:0},INSTANCE_COUNT=0,track=function(ev){cX=ev.pageX,cY=ev.pageY},compare=function(ev,$el,s,cfg){if(Math.sqrt((s.pX-cX)*(s.pX-cX)+(s.pY-cY)*(s.pY-cY))<cfg.sensitivity)return $el.off(s.event,track),delete s.timeoutId,s.isActive=!0,ev.pageX=cX,ev.pageY=cY,delete s.pX,delete s.pY,cfg.over.apply($el[0],[ev]);s.pX=cX,s.pY=cY,s.timeoutId=setTimeout(function(){compare(ev,$el,s,cfg)},cfg.interval)},delay=function(ev,$el,s,out){return delete $el.data("hoverIntent")[s.id],out.apply($el[0],[ev])};$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var instanceId=INSTANCE_COUNT++,cfg=$.extend({},_cfg);$.isPlainObject(handlerIn)?(cfg=$.extend(cfg,handlerIn),$.isFunction(cfg.out)||(cfg.out=cfg.over)):cfg=$.isFunction(handlerOut)?$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector}):$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut});var handleHover=function(e){var ev=$.extend({},e),$el=$(this),hoverIntentData=$el.data("hoverIntent");hoverIntentData||$el.data("hoverIntent",hoverIntentData={});var state=hoverIntentData[instanceId];state||(hoverIntentData[instanceId]=state={id:instanceId}),state.timeoutId&&(state.timeoutId=clearTimeout(state.timeoutId));var mousemove=state.event="mousemove.hoverIntent.hoverIntent"+instanceId;if("mouseenter"===e.type){if(state.isActive)return;state.pX=ev.pageX,state.pY=ev.pageY,$el.off(mousemove,track).on(mousemove,track),state.timeoutId=setTimeout(function(){compare(ev,$el,state,cfg)},cfg.interval)}else{if(!state.isActive)return;$el.off(mousemove,track),state.timeoutId=setTimeout(function(){delay(ev,$el,state,cfg.out)},cfg.timeout)}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}});;
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&"object"==typeof module.exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){return function(A){"use strict";var L=A.tablesorter={version:"2.31.1",parsers:[],widgets:[],defaults:{theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,resort:!0,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",duplicateSpan:!0,textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,initWidgets:!0,widgetClass:"widget-{name}",widgets:[],widgetOptions:{zebra:["even","odd"]},initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssInfoBlock:"tablesorter-infoOnly",cssNoSort:"tablesorter-noSort",cssIgnoreRow:"tablesorter-ignoreRow",cssIcon:"tablesorter-icon",cssIconNone:"",cssIconAsc:"",cssIconDesc:"",cssIconDisabled:"",pointerClick:"click",pointerDown:"mousedown",pointerUp:"mouseup",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[],empties:{},strings:{},parsers:[],globalize:0,imgAttr:0},css:{table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",colgroup:"tablesorter-colgroup",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner",icon:"tablesorter-icon",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"},language:{sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ",sortNone:"No sort applied, ",sortDisabled:"sorting is disabled",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"},regex:{templateContent:/\{content\}/g,templateIcon:/\{icon\}/g,templateName:/\{name\}/i,spaces:/\s+/g,nonWord:/\W/g,formElements:/(input|select|button|textarea)/i,chunk:/(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i,comma:/,/g,digitNonUS:/[\s|\.]/g,digitNegativeTest:/^\s*\([.\d]+\)/,digitNegativeReplace:/^\s*\(([.\d]+)\)/,digitTest:/^[\-+(]?\d+[)]?$/,digitReplace:/[,.'"\s]/g},string:{max:1,min:-1,emptymin:1,emptymax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1},keyCodes:{enter:13},dates:{},instanceMethods:{},setup:function(t,r){if(t&&t.tHead&&0!==t.tBodies.length&&!0!==t.hasInitialized){var e,o="",s=A(t),a=A.metadata;t.hasInitialized=!1,t.isProcessing=!0,t.config=r,A.data(t,"tablesorter",r),L.debug(r,"core")&&(console[console.group?"group":"log"]("Initializing tablesorter v"+L.version),A.data(t,"startoveralltimer",new Date)),r.supportsDataObject=((e=A.fn.jquery.split("."))[0]=parseInt(e[0],10),1<e[0]||1===e[0]&&4<=parseInt(e[1],10)),r.emptyTo=r.emptyTo.toLowerCase(),r.stringTo=r.stringTo.toLowerCase(),r.last={sortList:[],clickedIndex:-1},/tablesorter\-/.test(s.attr("class"))||(o=""!==r.theme?" tablesorter-"+r.theme:""),r.namespace?r.namespace="."+r.namespace.replace(L.regex.nonWord,""):r.namespace=".tablesorter"+Math.random().toString(16).slice(2),r.table=t,r.$table=s.addClass(L.css.table+" "+r.tableClass+o+" "+r.namespace.slice(1)).attr("role","grid"),r.$headers=s.find(r.selectorHeaders),r.$table.children().children("tr").attr("role","row"),r.$tbodies=s.children("tbody:not(."+r.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"}),r.$table.children("caption").length&&((o=r.$table.children("caption")[0]).id||(o.id=r.namespace.slice(1)+"caption"),r.$table.attr("aria-labelledby",o.id)),r.widgetInit={},r.textExtraction=r.$table.attr("data-text-extraction")||r.textExtraction||"basic",L.buildHeaders(r),L.fixColumnWidth(t),L.addWidgetFromClass(t),L.applyWidgetOptions(t),L.setupParsers(r),r.totalRows=0,r.debug&&L.validateOptions(r),r.delayInit||L.buildCache(r),L.bindEvents(t,r.$headers,!0),L.bindMethods(r),r.supportsDataObject&&void 0!==s.data().sortlist?r.sortList=s.data().sortlist:a&&s.metadata()&&s.metadata().sortlist&&(r.sortList=s.metadata().sortlist),L.applyWidget(t,!0),0<r.sortList.length?(r.last.sortList=r.sortList,L.sortOn(r,r.sortList,{},!r.initWidgets)):(L.setHeadersCss(r),r.initWidgets&&L.applyWidget(t,!1)),r.showProcessing&&s.unbind("sortBegin"+r.namespace+" sortEnd"+r.namespace).bind("sortBegin"+r.namespace+" sortEnd"+r.namespace,function(e){clearTimeout(r.timerProcessing),L.isProcessing(t),"sortBegin"===e.type&&(r.timerProcessing=setTimeout(function(){L.isProcessing(t,!0)},500))}),t.hasInitialized=!0,t.isProcessing=!1,L.debug(r,"core")&&(console.log("Overall initialization time:"+L.benchmark(A.data(t,"startoveralltimer"))),L.debug(r,"core")&&console.groupEnd&&console.groupEnd()),s.triggerHandler("tablesorter-initialized",t),"function"==typeof r.initialized&&r.initialized(t)}else L.debug(r,"core")&&(t.hasInitialized?console.warn("Stopping initialization. Tablesorter has already been initialized"):console.error("Stopping initialization! No table, thead or tbody",t))},bindMethods:function(r){var e=r.$table,t=r.namespace,o="sortReset update updateRows updateAll updateHeaders addRows updateCell updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(t+" ");e.unbind(o.replace(L.regex.spaces," ")).bind("sortReset"+t,function(e,t){e.stopPropagation(),L.sortReset(this.config,function(e){e.isApplyingWidgets?setTimeout(function(){L.applyWidget(e,"",t)},100):L.applyWidget(e,"",t)})}).bind("updateAll"+t,function(e,t,r){e.stopPropagation(),L.updateAll(this.config,t,r)}).bind("update"+t+" updateRows"+t,function(e,t,r){e.stopPropagation(),L.update(this.config,t,r)}).bind("updateHeaders"+t,function(e,t){e.stopPropagation(),L.updateHeaders(this.config,t)}).bind("updateCell"+t,function(e,t,r,o){e.stopPropagation(),L.updateCell(this.config,t,r,o)}).bind("addRows"+t,function(e,t,r,o){e.stopPropagation(),L.addRows(this.config,t,r,o)}).bind("updateComplete"+t,function(){this.isUpdating=!1}).bind("sorton"+t,function(e,t,r,o){e.stopPropagation(),L.sortOn(this.config,t,r,o)}).bind("appendCache"+t,function(e,t,r){e.stopPropagation(),L.appendCache(this.config,r),A.isFunction(t)&&t(this)}).bind("updateCache"+t,function(e,t,r){e.stopPropagation(),L.updateCache(this.config,t,r)}).bind("applyWidgetId"+t,function(e,t){e.stopPropagation(),L.applyWidgetId(this,t)}).bind("applyWidgets"+t,function(e,t){e.stopPropagation(),L.applyWidget(this,!1,t)}).bind("refreshWidgets"+t,function(e,t,r){e.stopPropagation(),L.refreshWidgets(this,t,r)}).bind("removeWidget"+t,function(e,t,r){e.stopPropagation(),L.removeWidget(this,t,r)}).bind("destroy"+t,function(e,t,r){e.stopPropagation(),L.destroy(this,t,r)}).bind("resetToLoadState"+t,function(e){e.stopPropagation(),L.removeWidget(this,!0,!1);var t=A.extend(!0,{},r.originalSettings);(r=A.extend(!0,{},L.defaults,t)).originalSettings=t,this.hasInitialized=!1,L.setup(this,r)})},bindEvents:function(e,t,r){var o,i=(e=A(e)[0]).config,s=i.namespace,d=null;!0!==r&&(t.addClass(s.slice(1)+"_extra_headers"),(o=L.getClosest(t,"table")).length&&"TABLE"===o[0].nodeName&&o[0]!==e&&A(o[0]).addClass(s.slice(1)+"_extra_table")),o=(i.pointerDown+" "+i.pointerUp+" "+i.pointerClick+" sort keyup ").replace(L.regex.spaces," ").split(" ").join(s+" "),t.find(i.selectorSort).add(t.filter(i.selectorSort)).unbind(o).bind(o,function(e,t){var r,o,s,a=A(e.target),n=" "+e.type+" ";if(!(1!==(e.which||e.button)&&!n.match(" "+i.pointerClick+" | sort | keyup ")||" keyup "===n&&e.which!==L.keyCodes.enter||n.match(" "+i.pointerClick+" ")&&void 0!==e.which||n.match(" "+i.pointerUp+" ")&&d!==e.target&&!0!==t)){if(n.match(" "+i.pointerDown+" "))return d=e.target,void("1"===(s=a.jquery.split("."))[0]&&s[1]<4&&e.preventDefault());if(d=null,r=L.getClosest(A(this),"."+L.css.header),L.regex.formElements.test(e.target.nodeName)||a.hasClass(i.cssNoSort)||0<a.parents("."+i.cssNoSort).length||r.hasClass("sorter-false")||0<a.parents("button").length)return!i.cancelSelection;i.delayInit&&L.isEmptyObject(i.cache)&&L.buildCache(i),i.last.clickedIndex=r.attr("data-column")||r.index(),(o=i.$headerIndexed[i.last.clickedIndex][0])&&!o.sortDisabled&&L.initSort(i,o,e)}}),i.cancelSelection&&t.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})},buildHeaders:function(d){var e,l,t,r;for(d.headerList=[],d.headerContent=[],d.sortVars=[],L.debug(d,"core")&&(t=new Date),d.columns=L.computeColumnIndex(d.$table.children("thead, tfoot").children("tr")),l=d.cssIcon?'<i class="'+(d.cssIcon===L.css.icon?L.css.icon:d.cssIcon+" "+L.css.icon)+'"></i>':"",d.$headers=A(A.map(d.$table.find(d.selectorHeaders),function(e,t){var r,o,s,a,n,i=A(e);if(!L.getClosest(i,"tr").hasClass(d.cssIgnoreRow))return/(th|td)/i.test(e.nodeName)||(n=L.getClosest(i,"th, td"),i.attr("data-column",n.attr("data-column"))),r=L.getColumnData(d.table,d.headers,t,!0),d.headerContent[t]=i.html(),""===d.headerTemplate||i.find("."+L.css.headerIn).length||(a=d.headerTemplate.replace(L.regex.templateContent,i.html()).replace(L.regex.templateIcon,i.find("."+L.css.icon).length?"":l),d.onRenderTemplate&&(o=d.onRenderTemplate.apply(i,[t,a]))&&"string"==typeof o&&(a=o),i.html('<div class="'+L.css.headerIn+'">'+a+"</div>")),d.onRenderHeader&&d.onRenderHeader.apply(i,[t,d,d.$table]),s=parseInt(i.attr("data-column"),10),e.column=s,n=L.getOrder(L.getData(i,r,"sortInitialOrder")||d.sortInitialOrder),d.sortVars[s]={count:-1,order:n?d.sortReset?[1,0,2]:[1,0]:d.sortReset?[0,1,2]:[0,1],lockedOrder:!1,sortedBy:""},void 0!==(n=L.getData(i,r,"lockedOrder")||!1)&&!1!==n&&(d.sortVars[s].lockedOrder=!0,d.sortVars[s].order=L.getOrder(n)?[1,1]:[0,0]),d.headerList[t]=e,i.addClass(L.css.header+" "+d.cssHeader),L.getClosest(i,"tr").addClass(L.css.headerRow+" "+d.cssHeaderRow).attr("role","row"),d.tabIndex&&i.attr("tabindex",0),e})),d.$headerIndexed=[],r=0;r<d.columns;r++)L.isEmptyObject(d.sortVars[r])&&(d.sortVars[r]={}),e=d.$headers.filter('[data-column="'+r+'"]'),d.$headerIndexed[r]=e.length?e.not(".sorter-false").length?e.not(".sorter-false").filter(":last"):e.filter(":last"):A();d.$table.find(d.selectorHeaders).attr({scope:"col",role:"columnheader"}),L.updateHeader(d),L.debug(d,"core")&&(console.log("Built headers:"+L.benchmark(t)),console.log(d.$headers))},addInstanceMethods:function(e){A.extend(L.instanceMethods,e)},setupParsers:function(e,t){var r,o,s,a,n,i,d,l,c,g,p,u,f,h,m=e.table,b=0,y=L.debug(e,"core"),w={};if(e.$tbodies=e.$table.children("tbody:not(."+e.cssInfoBlock+")"),0===(h=(f=void 0===t?e.$tbodies:t).length))return y?console.warn("Warning: *Empty table!* Not building a parser cache"):"";for(y&&(u=new Date,console[console.group?"group":"log"]("Detecting parsers for each column")),o={extractors:[],parsers:[]};b<h;){if((r=f[b].rows).length)for(n=0,a=e.columns,i=0;i<a;i++){if((d=e.$headerIndexed[n])&&d.length&&(l=L.getColumnData(m,e.headers,n),p=L.getParserById(L.getData(d,l,"extractor")),g=L.getParserById(L.getData(d,l,"sorter")),c="false"===L.getData(d,l,"parser"),e.empties[n]=(L.getData(d,l,"empty")||e.emptyTo||(e.emptyToBottom?"bottom":"top")).toLowerCase(),e.strings[n]=(L.getData(d,l,"string")||e.stringTo||"max").toLowerCase(),c&&(g=L.getParserById("no-parser")),p||(p=!1),g||(g=L.detectParserForColumn(e,r,-1,n)),y&&(w["("+n+") "+d.text()]={parser:g.id,extractor:p?p.id:"none",string:e.strings[n],empty:e.empties[n]}),o.parsers[n]=g,o.extractors[n]=p,0<(s=d[0].colSpan-1)))for(n+=s,a+=s;0<s+1;)o.parsers[n-s]=g,o.extractors[n-s]=p,s--;n++}b+=o.parsers.length?h:1}y&&(L.isEmptyObject(w)?console.warn("  No parsers detected!"):console[console.table?"table":"log"](w),console.log("Completed detecting parsers"+L.benchmark(u)),console.groupEnd&&console.groupEnd()),e.parsers=o.parsers,e.extractors=o.extractors},addParser:function(e){var t,r=L.parsers.length,o=!0;for(t=0;t<r;t++)L.parsers[t].id.toLowerCase()===e.id.toLowerCase()&&(o=!1);o&&(L.parsers[L.parsers.length]=e)},getParserById:function(e){if("false"==e)return!1;var t,r=L.parsers.length;for(t=0;t<r;t++)if(L.parsers[t].id.toLowerCase()===e.toString().toLowerCase())return L.parsers[t];return!1},detectParserForColumn:function(e,t,r,o){for(var s,a,n,i=L.parsers.length,d=!1,l="",c=L.debug(e,"core"),g=!0;""===l&&g;)(n=t[++r])&&r<50?n.className.indexOf(L.cssIgnoreRow)<0&&(d=t[r].cells[o],l=L.getElementText(e,d,o),a=A(d),c&&console.log("Checking if value was empty on row "+r+", column: "+o+': "'+l+'"')):g=!1;for(;0<=--i;)if((s=L.parsers[i])&&"text"!==s.id&&s.is&&s.is(l,e.table,d,a))return s;return L.getParserById("text")},getElementText:function(e,t,r){if(!t)return"";var o,s=e.textExtraction||"",a=t.jquery?t:A(t);return"string"==typeof s?"basic"===s&&void 0!==(o=a.attr(e.textAttribute))?A.trim(o):A.trim(t.textContent||a.text()):"function"==typeof s?A.trim(s(a[0],e.table,r)):"function"==typeof(o=L.getColumnData(e.table,s,r))?A.trim(o(a[0],e.table,r)):A.trim(a[0].textContent||a.text())},getParsedText:function(e,t,r,o){void 0===o&&(o=L.getElementText(e,t,r));var s=""+o,a=e.parsers[r],n=e.extractors[r];return a&&(n&&"function"==typeof n.format&&(o=n.format(o,e.table,t,r)),s="no-parser"===a.id?"":a.format(""+o,e.table,t,r),e.ignoreCase&&"string"==typeof s&&(s=s.toLowerCase())),s},buildCache:function(e,t,r){var o,s,a,n,i,d,l,c,g,p,u,f,h,m,b,y,w,x,v,C,$,I,D=e.table,R=e.parsers,T=L.debug(e,"core");if(e.$tbodies=e.$table.children("tbody:not(."+e.cssInfoBlock+")"),l=void 0===r?e.$tbodies:r,e.cache={},e.totalRows=0,!R)return T?console.warn("Warning: *Empty table!* Not building a cache"):"";for(T&&(f=new Date),e.showProcessing&&L.isProcessing(D,!0),d=0;d<l.length;d++){for(y=[],o=e.cache[d]={normalized:[]},h=l[d]&&l[d].rows.length||0,n=0;n<h;++n)if(m={child:[],raw:[]},g=[],!(c=A(l[d].rows[n])).hasClass(e.selectorRemove.slice(1)))if(c.hasClass(e.cssChildRow)&&0!==n)for($=o.normalized.length-1,(b=o.normalized[$][e.columns]).$row=b.$row.add(c),c.prev().hasClass(e.cssChildRow)||c.prev().addClass(L.css.cssHasChild),p=c.children("th, td"),$=b.child.length,b.child[$]=[],x=0,C=e.columns,i=0;i<C;i++)(u=p[i])&&(b.child[$][i]=L.getParsedText(e,u,i),0<(w=p[i].colSpan-1)&&(x+=w,C+=w)),x++;else{for(m.$row=c,m.order=n,x=0,C=e.columns,i=0;i<C;++i){if((u=c[0].cells[i])&&x<e.columns&&(!(v=void 0!==R[x])&&T&&console.warn("No parser found for row: "+n+", column: "+i+'; cell containing: "'+A(u).text()+'"; does it have a header?'),s=L.getElementText(e,u,x),m.raw[x]=s,a=L.getParsedText(e,u,x,s),g[x]=a,v&&"numeric"===(R[x].type||"").toLowerCase()&&(y[x]=Math.max(Math.abs(a)||0,y[x]||0)),0<(w=u.colSpan-1))){for(I=0;I<=w;)a=e.duplicateSpan||0===I?s:"string"!=typeof e.textExtraction&&L.getElementText(e,u,x+I)||"",m.raw[x+I]=a,g[x+I]=a,I++;x+=w,C+=w}x++}g[e.columns]=m,o.normalized[o.normalized.length]=g}o.colMax=y,e.totalRows+=o.normalized.length}if(e.showProcessing&&L.isProcessing(D),T){for($=Math.min(5,e.cache[0].normalized.length),console[console.group?"group":"log"]("Building cache for "+e.totalRows+" rows (showing "+$+" rows in log) and "+e.columns+" columns"+L.benchmark(f)),s={},i=0;i<e.columns;i++)for(x=0;x<$;x++)s["row: "+x]||(s["row: "+x]={}),s["row: "+x][e.$headerIndexed[i].text()]=e.cache[0].normalized[x][i];console[console.table?"table":"log"](s),console.groupEnd&&console.groupEnd()}A.isFunction(t)&&t(D)},getColumnText:function(e,t,r,o){var s,a,n,i,d,l,c,g,p,u,f="function"==typeof r,h="all"===t,m={raw:[],parsed:[],$cell:[]},b=(e=A(e)[0]).config;if(!L.isEmptyObject(b)){for(d=b.$tbodies.length,s=0;s<d;s++)for(l=(n=b.cache[s].normalized).length,a=0;a<l;a++)i=n[a],o&&!i[b.columns].$row.is(o)||(u=!0,g=h?i.slice(0,b.columns):i[t],i=i[b.columns],c=h?i.raw:i.raw[t],p=h?i.$row.children():i.$row.children().eq(t),f&&(u=r({tbodyIndex:s,rowIndex:a,parsed:g,raw:c,$row:i.$row,$cell:p})),!1!==u&&(m.parsed[m.parsed.length]=g,m.raw[m.raw.length]=c,m.$cell[m.$cell.length]=p));return m}L.debug(b,"core")&&console.warn("No cache found - aborting getColumnText function!")},setHeadersCss:function(a){var e,t,r=a.sortList,o=r.length,s=L.css.sortNone+" "+a.cssNone,n=[L.css.sortAsc+" "+a.cssAsc,L.css.sortDesc+" "+a.cssDesc],i=[a.cssIconAsc,a.cssIconDesc,a.cssIconNone],d=["ascending","descending"],l=function(e,t){e.removeClass(s).addClass(n[t]).attr("aria-sort",d[t]).find("."+L.css.icon).removeClass(i[2]).addClass(i[t])},c=a.$table.find("tfoot tr").children("td, th").add(A(a.namespace+"_extra_headers")).removeClass(n.join(" ")),g=a.$headers.add(A("thead "+a.namespace+"_extra_headers")).removeClass(n.join(" ")).addClass(s).attr("aria-sort","none").find("."+L.css.icon).removeClass(i.join(" ")).end();for(g.not(".sorter-false").find("."+L.css.icon).addClass(i[2]),a.cssIconDisabled&&g.filter(".sorter-false").find("."+L.css.icon).addClass(a.cssIconDisabled),e=0;e<o;e++)if(2!==r[e][1]){if((g=(g=a.$headers.filter(function(e){for(var t=!0,r=a.$headers.eq(e),o=parseInt(r.attr("data-column"),10),s=o+L.getClosest(r,"th, td")[0].colSpan;o<s;o++)t=!!t&&(t||-1<L.isValueInArray(o,a.sortList));return t})).not(".sorter-false").filter('[data-column="'+r[e][0]+'"]'+(1===o?":last":""))).length)for(t=0;t<g.length;t++)g[t].sortDisabled||l(g.eq(t),r[e][1]);c.length&&l(c.filter('[data-column="'+r[e][0]+'"]'),r[e][1])}for(o=a.$headers.length,e=0;e<o;e++)L.setColumnAriaLabel(a,a.$headers.eq(e))},getClosest:function(e,t){return A.fn.closest?e.closest(t):e.is(t)?e:e.parents(t).filter(":first")},setColumnAriaLabel:function(e,t,r){if(t.length){var o=parseInt(t.attr("data-column"),10),s=e.sortVars[o],a=t.hasClass(L.css.sortAsc)?"sortAsc":t.hasClass(L.css.sortDesc)?"sortDesc":"sortNone",n=A.trim(t.text())+": "+L.language[a];t.hasClass("sorter-false")||!1===r?n+=L.language.sortDisabled:(a=(s.count+1)%s.order.length,r=s.order[a],n+=L.language[0===r?"nextAsc":1===r?"nextDesc":"nextNone"]),t.attr("aria-label",n),s.sortedBy?t.attr("data-sortedBy",s.sortedBy):t.removeAttr("data-sortedBy")}},updateHeader:function(e){var t,r,o,s,a=e.table,n=e.$headers.length;for(t=0;t<n;t++)o=e.$headers.eq(t),s=L.getColumnData(a,e.headers,t,!0),r="false"===L.getData(o,s,"sorter")||"false"===L.getData(o,s,"parser"),L.setColumnSort(e,o,r)},setColumnSort:function(e,t,r){var o=e.table.id;t[0].sortDisabled=r,t[r?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+r),e.tabIndex&&(r?t.removeAttr("tabindex"):t.attr("tabindex","0")),o&&(r?t.removeAttr("aria-controls"):t.attr("aria-controls",o))},updateHeaderSortCount:function(e,t){var r,o,s,a,n,i,d,l,c=t||e.sortList,g=c.length;for(e.sortList=[],a=0;a<g;a++)if(d=c[a],(r=parseInt(d[0],10))<e.columns){switch(e.sortVars[r].order||(l=L.getOrder(e.sortInitialOrder)?e.sortReset?[1,0,2]:[1,0]:e.sortReset?[0,1,2]:[0,1],e.sortVars[r].order=l,e.sortVars[r].count=0),l=e.sortVars[r].order,o=(o=(""+d[1]).match(/^(1|d|s|o|n)/))?o[0]:""){case"1":case"d":o=1;break;case"s":o=n||0;break;case"o":o=0===(i=l[(n||0)%l.length])?1:1===i?0:2;break;case"n":o=l[++e.sortVars[r].count%l.length];break;default:o=0}n=0===a?o:n,s=[r,parseInt(o,10)||0],e.sortList[e.sortList.length]=s,o=A.inArray(s[1],l),e.sortVars[r].count=0<=o?o:s[1]%l.length}},updateAll:function(e,t,r){var o=e.table;o.isUpdating=!0,L.refreshWidgets(o,!0,!0),L.buildHeaders(e),L.bindEvents(o,e.$headers,!0),L.bindMethods(e),L.commonUpdate(e,t,r)},update:function(e,t,r){e.table.isUpdating=!0,L.updateHeader(e),L.commonUpdate(e,t,r)},updateHeaders:function(e,t){e.table.isUpdating=!0,L.buildHeaders(e),L.bindEvents(e.table,e.$headers,!0),L.resortComplete(e,t)},updateCell:function(e,t,r,o){if(A(t).closest("tr").hasClass(e.cssChildRow))console.warn('Tablesorter Warning! "updateCell" for child row content has been disabled, use "update" instead');else{if(L.isEmptyObject(e.cache))return L.updateHeader(e),void L.commonUpdate(e,r,o);e.table.isUpdating=!0,e.$table.find(e.selectorRemove).remove();var s,a,n,i,d,l,c=e.$tbodies,g=A(t),p=c.index(L.getClosest(g,"tbody")),u=e.cache[p],f=L.getClosest(g,"tr");if(t=g[0],c.length&&0<=p){if(n=c.eq(p).find("tr").not("."+e.cssChildRow).index(f),d=u.normalized[n],(l=f[0].cells.length)!==e.columns)for(s=!1,a=i=0;a<l;a++)s||f[0].cells[a]===t?s=!0:i+=f[0].cells[a].colSpan;else i=g.index();s=L.getElementText(e,t,i),d[e.columns].raw[i]=s,s=L.getParsedText(e,t,i,s),d[i]=s,"numeric"===(e.parsers[i].type||"").toLowerCase()&&(u.colMax[i]=Math.max(Math.abs(s)||0,u.colMax[i]||0)),!1!==(s="undefined"!==r?r:e.resort)?L.checkResort(e,s,o):L.resortComplete(e,o)}else L.debug(e,"core")&&console.error("updateCell aborted, tbody missing or not within the indicated table"),e.table.isUpdating=!1}},addRows:function(e,t,r,o){var s,a,n,i,d,l,c,g,p,u,f,h,m,b="string"==typeof t&&1===e.$tbodies.length&&/<tr/.test(t||""),y=e.table;if(b)t=A(t),e.$tbodies.append(t);else if(!(t&&t instanceof A&&L.getClosest(t,"table")[0]===e.table))return L.debug(e,"core")&&console.error("addRows method requires (1) a jQuery selector reference to rows that have already been added to the table, or (2) row HTML string to be added to a table with only one tbody"),!1;if(y.isUpdating=!0,L.isEmptyObject(e.cache))L.updateHeader(e),L.commonUpdate(e,r,o);else{for(d=t.filter("tr").attr("role","row").length,n=e.$tbodies.index(t.parents("tbody").filter(":first")),e.parsers&&e.parsers.length||L.setupParsers(e),i=0;i<d;i++){for(p=0,c=t[i].cells.length,g=e.cache[n].normalized.length,f=[],u={child:[],raw:[],$row:t.eq(i),order:g},l=0;l<c;l++)h=t[i].cells[l],s=L.getElementText(e,h,p),u.raw[p]=s,a=L.getParsedText(e,h,p,s),f[p]=a,"numeric"===(e.parsers[p].type||"").toLowerCase()&&(e.cache[n].colMax[p]=Math.max(Math.abs(a)||0,e.cache[n].colMax[p]||0)),0<(m=h.colSpan-1)&&(p+=m),p++;f[e.columns]=u,e.cache[n].normalized[g]=f}L.checkResort(e,r,o)}},updateCache:function(e,t,r){e.parsers&&e.parsers.length||L.setupParsers(e,r),L.buildCache(e,t,r)},appendCache:function(e,t){var r,o,s,a,n,i,d,l=e.table,c=e.$tbodies,g=[],p=e.cache;if(L.isEmptyObject(p))return e.appender?e.appender(l,g):l.isUpdating?e.$table.triggerHandler("updateComplete",l):"";for(L.debug(e,"core")&&(d=new Date),i=0;i<c.length;i++)if((s=c.eq(i)).length){for(a=L.processTbody(l,s,!0),o=(r=p[i].normalized).length,n=0;n<o;n++)g[g.length]=r[n][e.columns].$row,e.appender&&(!e.pager||e.pager.removeRows||e.pager.ajax)||a.append(r[n][e.columns].$row);L.processTbody(l,a,!1)}e.appender&&e.appender(l,g),L.debug(e,"core")&&console.log("Rebuilt table"+L.benchmark(d)),t||e.appender||L.applyWidget(l),l.isUpdating&&e.$table.triggerHandler("updateComplete",l)},commonUpdate:function(e,t,r){e.$table.find(e.selectorRemove).remove(),L.setupParsers(e),L.buildCache(e),L.checkResort(e,t,r)},initSort:function(t,e,r){if(t.table.isUpdating)return setTimeout(function(){L.initSort(t,e,r)},50);var o,s,a,n,i,d,l,c=!r[t.sortMultiSortKey],g=t.table,p=t.$headers.length,u=L.getClosest(A(e),"th, td"),f=parseInt(u.attr("data-column"),10),h="mouseup"===r.type?"user":r.type,m=t.sortVars[f].order;if(u=u[0],t.$table.triggerHandler("sortStart",g),d=(t.sortVars[f].count+1)%m.length,t.sortVars[f].count=r[t.sortResetKey]?2:d,t.sortRestart)for(a=0;a<p;a++)l=t.$headers.eq(a),f!==(d=parseInt(l.attr("data-column"),10))&&(c||l.hasClass(L.css.sortNone))&&(t.sortVars[d].count=-1);if(c){if(A.each(t.sortVars,function(e){t.sortVars[e].sortedBy=""}),t.sortList=[],t.last.sortList=[],null!==t.sortForce)for(o=t.sortForce,s=0;s<o.length;s++)o[s][0]!==f&&(t.sortList[t.sortList.length]=o[s],t.sortVars[o[s][0]].sortedBy="sortForce");if((n=m[t.sortVars[f].count])<2&&(t.sortList[t.sortList.length]=[f,n],t.sortVars[f].sortedBy=h,1<u.colSpan))for(s=1;s<u.colSpan;s++)t.sortList[t.sortList.length]=[f+s,n],t.sortVars[f+s].count=A.inArray(n,m),t.sortVars[f+s].sortedBy=h}else if(t.sortList=A.extend([],t.last.sortList),0<=L.isValueInArray(f,t.sortList))for(t.sortVars[f].sortedBy=h,s=0;s<t.sortList.length;s++)(d=t.sortList[s])[0]===f&&(d[1]=m[t.sortVars[f].count],2===d[1]&&(t.sortList.splice(s,1),t.sortVars[f].count=-1));else if(n=m[t.sortVars[f].count],t.sortVars[f].sortedBy=h,n<2&&(t.sortList[t.sortList.length]=[f,n],1<u.colSpan))for(s=1;s<u.colSpan;s++)t.sortList[t.sortList.length]=[f+s,n],t.sortVars[f+s].count=A.inArray(n,m),t.sortVars[f+s].sortedBy=h;if(t.last.sortList=A.extend([],t.sortList),t.sortList.length&&t.sortAppend&&(o=A.isArray(t.sortAppend)?t.sortAppend:t.sortAppend[t.sortList[0][0]],!L.isEmptyObject(o)))for(s=0;s<o.length;s++)if(o[s][0]!==f&&L.isValueInArray(o[s][0],t.sortList)<0){if(i=(""+(n=o[s][1])).match(/^(a|d|s|o|n)/))switch(d=t.sortList[0][1],i[0]){case"d":n=1;break;case"s":n=d;break;case"o":n=0===d?1:0;break;case"n":n=(d+1)%m.length;break;default:n=0}t.sortList[t.sortList.length]=[o[s][0],n],t.sortVars[o[s][0]].sortedBy="sortAppend"}t.$table.triggerHandler("sortBegin",g),setTimeout(function(){L.setHeadersCss(t),L.multisort(t),L.appendCache(t),t.$table.triggerHandler("sortBeforeEnd",g),t.$table.triggerHandler("sortEnd",g)},1)},multisort:function(l){var e,t,c,r,g=l.table,p=[],u=0,f=l.textSorter||"",h=l.sortList,m=h.length,o=l.$tbodies.length;if(!l.serverSideSorting&&!L.isEmptyObject(l.cache)){if(L.debug(l,"core")&&(t=new Date),"object"==typeof f)for(c=l.columns;c--;)"function"==typeof(r=L.getColumnData(g,f,c))&&(p[c]=r);for(e=0;e<o;e++)c=l.cache[e].colMax,l.cache[e].normalized.sort(function(e,t){var r,o,s,a,n,i,d;for(r=0;r<m;r++){if(s=h[r][0],a=h[r][1],u=0===a,l.sortStable&&e[s]===t[s]&&1===m)return e[l.columns].order-t[l.columns].order;if(n=(o=/n/i.test(L.getSortType(l.parsers,s)))&&l.strings[s]?(o="boolean"==typeof L.string[l.strings[s]]?(u?1:-1)*(L.string[l.strings[s]]?-1:1):l.strings[s]&&L.string[l.strings[s]]||0,l.numberSorter?l.numberSorter(e[s],t[s],u,c[s],g):L["sortNumeric"+(u?"Asc":"Desc")](e[s],t[s],o,c[s],s,l)):(i=u?e:t,d=u?t:e,"function"==typeof f?f(i[s],d[s],u,s,g):"function"==typeof p[s]?p[s](i[s],d[s],u,s,g):L["sortNatural"+(u?"Asc":"Desc")](e[s]||"",t[s]||"",s,l)))return n}return e[l.columns].order-t[l.columns].order});L.debug(l,"core")&&console.log("Applying sort "+h.toString()+L.benchmark(t))}},resortComplete:function(e,t){e.table.isUpdating&&e.$table.triggerHandler("updateComplete",e.table),A.isFunction(t)&&t(e.table)},checkResort:function(e,t,r){var o=A.isArray(t)?t:e.sortList;!1===(void 0===t?e.resort:t)||e.serverSideSorting||e.table.isProcessing?(L.resortComplete(e,r),L.applyWidget(e.table,!1)):o.length?L.sortOn(e,o,function(){L.resortComplete(e,r)},!0):L.sortReset(e,function(){L.resortComplete(e,r),L.applyWidget(e.table,!1)})},sortOn:function(e,t,r,o){var s,a=e.table;for(e.$table.triggerHandler("sortStart",a),s=0;s<e.columns;s++)e.sortVars[s].sortedBy=-1<L.isValueInArray(s,t)?"sorton":"";L.updateHeaderSortCount(e,t),L.setHeadersCss(e),e.delayInit&&L.isEmptyObject(e.cache)&&L.buildCache(e),e.$table.triggerHandler("sortBegin",a),L.multisort(e),L.appendCache(e,o),e.$table.triggerHandler("sortBeforeEnd",a),e.$table.triggerHandler("sortEnd",a),L.applyWidget(a),A.isFunction(r)&&r(a)},sortReset:function(e,t){var r;for(e.sortList=[],r=0;r<e.columns;r++)e.sortVars[r].count=-1,e.sortVars[r].sortedBy="";L.setHeadersCss(e),L.multisort(e),L.appendCache(e),A.isFunction(t)&&t(e.table)},getSortType:function(e,t){return e&&e[t]&&e[t].type||""},getOrder:function(e){return/^d/i.test(e)||1===e},sortNatural:function(e,t){if(e===t)return 0;e=(e||"").toString(),t=(t||"").toString();var r,o,s,a,n,i,d=L.regex;if(d.hex.test(t)){if((r=parseInt(e.match(d.hex),16))<(o=parseInt(t.match(d.hex),16)))return-1;if(o<r)return 1}for(r=e.replace(d.chunk,"\\0$1\\0").replace(d.chunks,"").split("\\0"),o=t.replace(d.chunk,"\\0$1\\0").replace(d.chunks,"").split("\\0"),i=Math.max(r.length,o.length),n=0;n<i;n++){if(s=isNaN(r[n])?r[n]||0:parseFloat(r[n])||0,a=isNaN(o[n])?o[n]||0:parseFloat(o[n])||0,isNaN(s)!==isNaN(a))return isNaN(s)?1:-1;if(typeof s!=typeof a&&(s+="",a+=""),s<a)return-1;if(a<s)return 1}return 0},sortNaturalAsc:function(e,t,r,o){if(e===t)return 0;var s=L.string[o.empties[r]||o.emptyTo];return""===e&&0!==s?"boolean"==typeof s?s?-1:1:-s||-1:""===t&&0!==s?"boolean"==typeof s?s?1:-1:s||1:L.sortNatural(e,t)},sortNaturalDesc:function(e,t,r,o){if(e===t)return 0;var s=L.string[o.empties[r]||o.emptyTo];return""===e&&0!==s?"boolean"==typeof s?s?-1:1:s||1:""===t&&0!==s?"boolean"==typeof s?s?1:-1:-s||-1:L.sortNatural(t,e)},sortText:function(e,t){return t<e?1:e<t?-1:0},getTextValue:function(e,t,r){if(r){var o,s=e?e.length:0,a=r+t;for(o=0;o<s;o++)a+=e.charCodeAt(o);return t*a}return 0},sortNumericAsc:function(e,t,r,o,s,a){if(e===t)return 0;var n=L.string[a.empties[s]||a.emptyTo];return""===e&&0!==n?"boolean"==typeof n?n?-1:1:-n||-1:""===t&&0!==n?"boolean"==typeof n?n?1:-1:n||1:(isNaN(e)&&(e=L.getTextValue(e,r,o)),isNaN(t)&&(t=L.getTextValue(t,r,o)),e-t)},sortNumericDesc:function(e,t,r,o,s,a){if(e===t)return 0;var n=L.string[a.empties[s]||a.emptyTo];return""===e&&0!==n?"boolean"==typeof n?n?-1:1:n||1:""===t&&0!==n?"boolean"==typeof n?n?1:-1:-n||-1:(isNaN(e)&&(e=L.getTextValue(e,r,o)),isNaN(t)&&(t=L.getTextValue(t,r,o)),t-e)},sortNumeric:function(e,t){return e-t},addWidget:function(e){e.id&&!L.isEmptyObject(L.getWidgetById(e.id))&&console.warn('"'+e.id+'" widget was loaded more than once!'),L.widgets[L.widgets.length]=e},hasWidget:function(e,t){return(e=A(e)).length&&e[0].config&&e[0].config.widgetInit[t]||!1},getWidgetById:function(e){var t,r,o=L.widgets.length;for(t=0;t<o;t++)if((r=L.widgets[t])&&r.id&&r.id.toLowerCase()===e.toLowerCase())return r},applyWidgetOptions:function(e){var t,r,o,s=e.config,a=s.widgets.length;if(a)for(t=0;t<a;t++)(r=L.getWidgetById(s.widgets[t]))&&r.options&&(o=A.extend(!0,{},r.options),s.widgetOptions=A.extend(!0,o,s.widgetOptions),A.extend(!0,L.defaults.widgetOptions,r.options))},addWidgetFromClass:function(e){var t,r,o=e.config,s="^"+o.widgetClass.replace(L.regex.templateName,"(\\S+)+")+"$",a=new RegExp(s,"g"),n=(e.className||"").split(L.regex.spaces);if(n.length)for(t=n.length,r=0;r<t;r++)n[r].match(a)&&(o.widgets[o.widgets.length]=n[r].replace(a,"$1"))},applyWidgetId:function(e,t,r){var o,s,a,n=(e=A(e)[0]).config,i=n.widgetOptions,d=L.debug(n,"core"),l=L.getWidgetById(t);l&&(a=l.id,o=!1,A.inArray(a,n.widgets)<0&&(n.widgets[n.widgets.length]=a),d&&(s=new Date),!r&&n.widgetInit[a]||(n.widgetInit[a]=!0,e.hasInitialized&&L.applyWidgetOptions(e),"function"==typeof l.init&&(o=!0,d&&console[console.group?"group":"log"]("Initializing "+a+" widget"),l.init(e,l,n,i))),r||"function"!=typeof l.format||(o=!0,d&&console[console.group?"group":"log"]("Updating "+a+" widget"),l.format(e,n,i,!1)),d&&o&&(console.log("Completed "+(r?"initializing ":"applying ")+a+" widget"+L.benchmark(s)),console.groupEnd&&console.groupEnd()))},applyWidget:function(e,t,r){var o,s,a,n,i,d=(e=A(e)[0]).config,l=L.debug(d,"core"),c=[];if(!1===t||!e.hasInitialized||!e.isApplyingWidgets&&!e.isUpdating){if(l&&(i=new Date),L.addWidgetFromClass(e),clearTimeout(d.timerReady),d.widgets.length){for(e.isApplyingWidgets=!0,d.widgets=A.grep(d.widgets,function(e,t){return A.inArray(e,d.widgets)===t}),s=(a=d.widgets||[]).length,o=0;o<s;o++)(n=L.getWidgetById(a[o]))&&n.id?(n.priority||(n.priority=10),c[o]=n):l&&console.warn('"'+a[o]+'" was enabled, but the widget code has not been loaded!');for(c.sort(function(e,t){return e.priority<t.priority?-1:e.priority===t.priority?0:1}),s=c.length,l&&console[console.group?"group":"log"]("Start "+(t?"initializing":"applying")+" widgets"),o=0;o<s;o++)(n=c[o])&&n.id&&L.applyWidgetId(e,n.id,t);l&&console.groupEnd&&console.groupEnd()}d.timerReady=setTimeout(function(){e.isApplyingWidgets=!1,A.data(e,"lastWidgetApplication",new Date),d.$table.triggerHandler("tablesorter-ready"),t||"function"!=typeof r||r(e),l&&(n=d.widgets.length,console.log("Completed "+(!0===t?"initializing ":"applying ")+n+" widget"+(1!==n?"s":"")+L.benchmark(i)))},10)}},removeWidget:function(e,t,r){var o,s,a,n,i=(e=A(e)[0]).config;if(!0===t)for(t=[],n=L.widgets.length,a=0;a<n;a++)(s=L.widgets[a])&&s.id&&(t[t.length]=s.id);else t=(A.isArray(t)?t.join(","):t||"").toLowerCase().split(/[\s,]+/);for(n=t.length,o=0;o<n;o++)s=L.getWidgetById(t[o]),0<=(a=A.inArray(t[o],i.widgets))&&!0!==r&&i.widgets.splice(a,1),s&&s.remove&&(L.debug(i,"core")&&console.log((r?"Refreshing":"Removing")+' "'+t[o]+'" widget'),s.remove(e,i,i.widgetOptions,r),i.widgetInit[t[o]]=!1);i.$table.triggerHandler("widgetRemoveEnd",e)},refreshWidgets:function(e,t,r){var o,s,a=(e=A(e)[0]).config.widgets,n=L.widgets,i=n.length,d=[],l=function(e){A(e).triggerHandler("refreshComplete")};for(o=0;o<i;o++)(s=n[o])&&s.id&&(t||A.inArray(s.id,a)<0)&&(d[d.length]=s.id);L.removeWidget(e,d.join(","),!0),!0!==r?(L.applyWidget(e,t||!1,l),t&&L.applyWidget(e,!1,l)):l(e)},benchmark:function(e){return" ("+((new Date).getTime()-e.getTime())+" ms)"},log:function(){console.log(arguments)},debug:function(e,t){return e&&(!0===e.debug||"string"==typeof e.debug&&-1<e.debug.indexOf(t))},isEmptyObject:function(e){for(var t in e)return!1;return!0},isValueInArray:function(e,t){var r,o=t&&t.length||0;for(r=0;r<o;r++)if(t[r][0]===e)return r;return-1},formatFloat:function(e,t){return"string"!=typeof e||""===e?e:(e=(t&&t.config?!1!==t.config.usNumberFormat:void 0===t||t)?e.replace(L.regex.comma,""):e.replace(L.regex.digitNonUS,"").replace(L.regex.comma,"."),L.regex.digitNegativeTest.test(e)&&(e=e.replace(L.regex.digitNegativeReplace,"-$1")),r=parseFloat(e),isNaN(r)?A.trim(e):r);var r},isDigit:function(e){return isNaN(e)?L.regex.digitTest.test(e.toString().replace(L.regex.digitReplace,"")):""!==e},computeColumnIndex:function(e,t){var r,o,s,a,n,i,d,l,c,g,p=t&&t.columns||0,u=[],f=new Array(p);for(r=0;r<e.length;r++)for(i=e[r].cells,o=0;o<i.length;o++){for(d=r,l=(n=i[o]).rowSpan||1,c=n.colSpan||1,void 0===u[d]&&(u[d]=[]),s=0;s<u[d].length+1;s++)if(void 0===u[d][s]){g=s;break}for(p&&n.cellIndex===g||(n.setAttribute?n.setAttribute("data-column",g):A(n).attr("data-column",g)),s=d;s<d+l;s++)for(void 0===u[s]&&(u[s]=[]),f=u[s],a=g;a<g+c;a++)f[a]="x"}return L.checkColumnCount(e,u,f.length),f.length},checkColumnCount:function(e,t,r){var o,s,a=!0,n=[];for(o=0;o<t.length;o++)if(t[o]&&(s=t[o].length,t[o].length!==r)){a=!1;break}a||(e.each(function(e,t){var r=t.parentElement.nodeName;n.indexOf(r)<0&&n.push(r)}),console.error("Invalid or incorrect number of columns in the "+n.join(" or ")+"; expected "+r+", but found "+s+" columns"))},fixColumnWidth:function(e){var t,r,o,s,a,n=(e=A(e)[0]).config,i=n.$table.children("colgroup");if(i.length&&i.hasClass(L.css.colgroup)&&i.remove(),n.widthFixed&&0===n.$table.children("colgroup").length){for(i=A('<colgroup class="'+L.css.colgroup+'">'),t=n.$table.width(),s=(o=n.$tbodies.find("tr:first").children(":visible")).length,a=0;a<s;a++)r=parseInt(o.eq(a).width()/t*1e3,10)/10+"%",i.append(A("<col>").css("width",r));n.$table.prepend(i)}},getData:function(e,t,r){var o,s,a="",n=A(e);return n.length?(o=!!A.metadata&&n.metadata(),s=" "+(n.attr("class")||""),void 0!==n.data(r)||void 0!==n.data(r.toLowerCase())?a+=n.data(r)||n.data(r.toLowerCase()):o&&void 0!==o[r]?a+=o[r]:t&&void 0!==t[r]?a+=t[r]:" "!==s&&s.match(" "+r+"-")&&(a=s.match(new RegExp("\\s"+r+"-([\\w-]+)"))[1]||""),A.trim(a)):""},getColumnData:function(e,t,r,o,s){if("object"!=typeof t||null===t)return t;var a,n=(e=A(e)[0]).config,i=s||n.$headers,d=n.$headerIndexed&&n.$headerIndexed[r]||i.find('[data-column="'+r+'"]:last');if(void 0!==t[r])return o?t[r]:t[i.index(d)];for(a in t)if("string"==typeof a&&d.filter(a).add(d.find(a)).length)return t[a]},isProcessing:function(e,t,r){var o=(e=A(e))[0].config,s=r||e.find("."+L.css.header);t?(void 0!==r&&0<o.sortList.length&&(s=s.filter(function(){return!this.sortDisabled&&0<=L.isValueInArray(parseFloat(A(this).attr("data-column")),o.sortList)})),e.add(s).addClass(L.css.processing+" "+o.cssProcessing)):e.add(s).removeClass(L.css.processing+" "+o.cssProcessing)},processTbody:function(e,t,r){if(e=A(e)[0],r)return e.isProcessing=!0,t.before('<colgroup class="tablesorter-savemyplace"/>'),A.fn.detach?t.detach():t.remove();var o=A(e).find("colgroup.tablesorter-savemyplace");t.insertAfter(o),o.remove(),e.isProcessing=!1},clearTableBody:function(e){A(e)[0].config.$tbodies.children().detach()},characterEquivalents:{a:"áàâãäąå",A:"ÁÀÂÃÄĄÅ",c:"çćč",C:"ÇĆČ",e:"éèêëěę",E:"ÉÈÊËĚĘ",i:"íìİîïı",I:"ÍÌİÎÏ",o:"óòôõöō",O:"ÓÒÔÕÖŌ",ss:"ß",SS:"ẞ",u:"úùûüů",U:"ÚÙÛÜŮ"},replaceAccents:function(e){var t,r="[",o=L.characterEquivalents;if(!L.characterRegex){for(t in L.characterRegexArray={},o)"string"==typeof t&&(r+=o[t],L.characterRegexArray[t]=new RegExp("["+o[t]+"]","g"));L.characterRegex=new RegExp(r+"]")}if(L.characterRegex.test(e))for(t in o)"string"==typeof t&&(e=e.replace(L.characterRegexArray[t],t));return e},validateOptions:function(e){var t,r,o,s,a="headers sortForce sortList sortAppend widgets".split(" "),n=e.originalSettings;if(n){for(t in L.debug(e,"core")&&(s=new Date),n)if("undefined"===(o=typeof L.defaults[t]))console.warn('Tablesorter Warning! "table.config.'+t+'" option not recognized');else if("object"===o)for(r in n[t])o=L.defaults[t]&&typeof L.defaults[t][r],A.inArray(t,a)<0&&"undefined"===o&&console.warn('Tablesorter Warning! "table.config.'+t+"."+r+'" option not recognized');L.debug(e,"core")&&console.log("validate options time:"+L.benchmark(s))}},restoreHeaders:function(e){var t,r,o=A(e)[0].config,s=o.$table.find(o.selectorHeaders),a=s.length;for(t=0;t<a;t++)(r=s.eq(t)).find("."+L.css.headerIn).length&&r.html(o.headerContent[t])},destroy:function(e,t,r){if((e=A(e)[0]).hasInitialized){L.removeWidget(e,!0,!1);var o,s=A(e),a=e.config,n=s.find("thead:first"),i=n.find("tr."+L.css.headerRow).removeClass(L.css.headerRow+" "+a.cssHeaderRow),d=s.find("tfoot:first > tr").children("th, td");!1===t&&0<=A.inArray("uitheme",a.widgets)&&(s.triggerHandler("applyWidgetId",["uitheme"]),s.triggerHandler("applyWidgetId",["zebra"])),n.find("tr").not(i).remove(),o="sortReset update updateRows updateAll updateHeaders updateCell addRows updateComplete sorton appendCache updateCache applyWidgetId applyWidgets refreshWidgets removeWidget destroy mouseup mouseleave "+"keypress sortBegin sortEnd resetToLoadState ".split(" ").join(a.namespace+" "),s.removeData("tablesorter").unbind(o.replace(L.regex.spaces," ")),a.$headers.add(d).removeClass([L.css.header,a.cssHeader,a.cssAsc,a.cssDesc,L.css.sortAsc,L.css.sortDesc,L.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true"),i.find(a.selectorSort).unbind("mousedown mouseup keypress ".split(" ").join(a.namespace+" ").replace(L.regex.spaces," ")),L.restoreHeaders(e),s.toggleClass(L.css.table+" "+a.tableClass+" tablesorter-"+a.theme,!1===t),s.removeClass(a.namespace.slice(1)),e.hasInitialized=!1,delete e.config.cache,"function"==typeof r&&r(e),L.debug(a,"core")&&console.log("tablesorter has been removed")}}};A.fn.tablesorter=function(t){return this.each(function(){var e=A.extend(!0,{},L.defaults,t,L.instanceMethods);e.originalSettings=t,!this.hasInitialized&&L.buildTable&&"TABLE"!==this.nodeName?L.buildTable(this,e):L.setup(this,e)})},window.console&&window.console.log||(L.logs=[],console={},console.log=console.warn=console.error=console.table=function(){var e=1<arguments.length?arguments:arguments[0];L.logs[L.logs.length]={date:Date.now(),log:e}}),L.addParser({id:"no-parser",is:function(){return!1},format:function(){return""},type:"text"}),L.addParser({id:"text",is:function(){return!0},format:function(e,t){var r=t.config;return e&&(e=A.trim(r.ignoreCase?e.toLocaleLowerCase():e),e=r.sortLocaleCompare?L.replaceAccents(e):e),e},type:"text"}),L.regex.nondigit=/[^\w,. \-()]/g,L.addParser({id:"digit",is:function(e){return L.isDigit(e)},format:function(e,t){var r=L.formatFloat((e||"").replace(L.regex.nondigit,""),t);return e&&"number"==typeof r?r:e?A.trim(e&&t.config.ignoreCase?e.toLocaleLowerCase():e):e},type:"numeric"}),L.regex.currencyReplace=/[+\-,. ]/g,L.regex.currencyTest=/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/,L.addParser({id:"currency",is:function(e){return e=(e||"").replace(L.regex.currencyReplace,""),L.regex.currencyTest.test(e)},format:function(e,t){var r=L.formatFloat((e||"").replace(L.regex.nondigit,""),t);return e&&"number"==typeof r?r:e?A.trim(e&&t.config.ignoreCase?e.toLocaleLowerCase():e):e},type:"numeric"}),L.regex.urlProtocolTest=/^(https?|ftp|file):\/\//,L.regex.urlProtocolReplace=/(https?|ftp|file):\/\/(www\.)?/,L.addParser({id:"url",is:function(e){return L.regex.urlProtocolTest.test(e)},format:function(e){return e?A.trim(e.replace(L.regex.urlProtocolReplace,"")):e},type:"text"}),L.regex.dash=/-/g,L.regex.isoDate=/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,L.addParser({id:"isoDate",is:function(e){return L.regex.isoDate.test(e)},format:function(e){var t=e?new Date(e.replace(L.regex.dash,"/")):e;return t instanceof Date&&isFinite(t)?t.getTime():e},type:"numeric"}),L.regex.percent=/%/g,L.regex.percentTest=/(\d\s*?%|%\s*?\d)/,L.addParser({id:"percent",is:function(e){return L.regex.percentTest.test(e)&&e.length<15},format:function(e,t){return e?L.formatFloat(e.replace(L.regex.percent,""),t):e},type:"numeric"}),L.addParser({id:"image",is:function(e,t,r,o){return 0<o.find("img").length},format:function(e,t,r){return A(r).find("img").attr(t.config.imgAttr||"alt")||e},parsed:!0,type:"text"}),L.regex.dateReplace=/(\S)([AP]M)$/i,L.regex.usLongDateTest1=/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i,L.regex.usLongDateTest2=/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i,L.addParser({id:"usLongDate",is:function(e){return L.regex.usLongDateTest1.test(e)||L.regex.usLongDateTest2.test(e)},format:function(e){var t=e?new Date(e.replace(L.regex.dateReplace,"$1 $2")):e;return t instanceof Date&&isFinite(t)?t.getTime():e},type:"numeric"}),L.regex.shortDateTest=/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/,L.regex.shortDateReplace=/[\-.,]/g,L.regex.shortDateXXY=/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,L.regex.shortDateYMD=/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,L.convertFormat=function(e,t){e=(e||"").replace(L.regex.spaces," ").replace(L.regex.shortDateReplace,"/"),"mmddyyyy"===t?e=e.replace(L.regex.shortDateXXY,"$3/$1/$2"):"ddmmyyyy"===t?e=e.replace(L.regex.shortDateXXY,"$3/$2/$1"):"yyyymmdd"===t&&(e=e.replace(L.regex.shortDateYMD,"$1/$2/$3"));var r=new Date(e);return r instanceof Date&&isFinite(r)?r.getTime():""},L.addParser({id:"shortDate",is:function(e){return e=(e||"").replace(L.regex.spaces," ").replace(L.regex.shortDateReplace,"/"),L.regex.shortDateTest.test(e)},format:function(e,t,r,o){if(e){var s=t.config,a=s.$headerIndexed[o],n=a.length&&a.data("dateFormat")||L.getData(a,L.getColumnData(t,s.headers,o),"dateFormat")||s.dateFormat;return a.length&&a.data("dateFormat",n),L.convertFormat(e,n)||e}return e},type:"numeric"}),L.regex.timeTest=/^(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)$|^((?:[01]\d|[2][0-4]):[0-5]\d)$/i,L.regex.timeMatch=/(0?[1-9]|1[0-2]):([0-5]\d)(\s[AP]M)|((?:[01]\d|[2][0-4]):[0-5]\d)/i,L.addParser({id:"time",is:function(e){return L.regex.timeTest.test(e)},format:function(e){var t=(e||"").match(L.regex.timeMatch),r=new Date(e),o=e&&(null!==t?t[0]:"00:00 AM"),s=o?new Date("2000/01/01 "+o.replace(L.regex.dateReplace,"$1 $2")):o;return s instanceof Date&&isFinite(s)?(r instanceof Date&&isFinite(r)?r.getTime():0)?parseFloat(s.getTime()+"."+r.getTime()):s.getTime():e},type:"numeric"}),L.addParser({id:"metadata",is:function(){return!1},format:function(e,t,r){var o=t.config,s=o.parserMetadataName?o.parserMetadataName:"sortValue";return A(r).metadata()[s]},type:"numeric"}),L.addWidget({id:"zebra",priority:90,format:function(e,t,r){var o,s,a,n,i,d,l,c=new RegExp(t.cssChildRow,"i"),g=t.$tbodies.add(A(t.namespace+"_extra_table").children("tbody:not(."+t.cssInfoBlock+")"));for(i=0;i<g.length;i++)for(a=0,l=(o=g.eq(i).children("tr:visible").not(t.selectorRemove)).length,d=0;d<l;d++)s=o.eq(d),c.test(s[0].className)||a++,n=a%2==0,s.removeClass(r.zebra[n?1:0]).addClass(r.zebra[n?0:1])},remove:function(e,t,r,o){if(!o){var s,a,n=t.$tbodies,i=(r.zebra||["even","odd"]).join(" ");for(s=0;s<n.length;s++)(a=L.processTbody(e,n.eq(s),!0)).children().removeClass(i),L.processTbody(e,a,!1)}}})}(e),e.tablesorter});;
(function(factory){if (typeof define === 'function' && define.amd){define(['jquery'], factory);} else if (typeof module === 'object' && typeof module.exports === 'object'){module.exports = factory(require('jquery'));} else {factory(jQuery);}}(function(jQuery){

!function($){$.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/(\{.*\})/,single:"metadata"},setType:function(t,e){this.defaults.type=t,this.defaults.name=e},get:function(elem,opts){var data,m,e,attr,settings=$.extend({},this.defaults,opts);if(settings.single.length||(settings.single="metadata"),data=$.data(elem,settings.single),data)return data;if(data="{}","class"===settings.type)m=settings.cre.exec(elem.className),m&&(data=m[1]);else if("elem"===settings.type){if(!elem.getElementsByTagName)return;e=elem.getElementsByTagName(settings.name),e.length&&(data=$.trim(e[0].innerHTML))}else void 0!==elem.getAttribute&&(attr=elem.getAttribute(settings.name),attr&&(data=attr));return data.indexOf("{")<0&&(data="{"+data+"}"),data=eval("("+data+")"),$.data(elem,settings.single,data),data}}}),$.fn.metadata=function(t){return $.metadata.get(this[0],t)}}(jQuery);return jQuery;}));
;
(function(factory){if (typeof define === 'function' && define.amd){define(['jquery'], factory);} else if (typeof module === 'object' && typeof module.exports === 'object'){module.exports = factory(require('jquery'));} else {factory(jQuery);}}(function(jQuery){

/*!
* tablesorter (FORK) pager plugin
* updated 2018-08-27 (v2.31.0)
*/
!function(M){"use strict";var T=M.tablesorter;M.extend({tablesorterPager:new function(){this.defaults={container:null,ajaxUrl:null,customAjaxUrl:function(e,t){return t},ajaxError:null,ajaxObject:{dataType:"json"},processAjaxOnInit:!0,ajaxProcessing:function(e){return e},output:"{startRow} to {endRow} of {totalRows} rows",updateArrows:!0,page:0,pageReset:0,size:10,maxOptionSize:20,savePages:!0,storageKey:"tablesorter-pager",fixedHeight:!1,countChildRows:!1,removeRows:!1,cssFirst:".first",cssPrev:".prev",cssNext:".next",cssLast:".last",cssGoto:".gotoPage",cssPageDisplay:".pagedisplay",cssPageSize:".pagesize",cssErrorRow:"tablesorter-errorRow",cssDisabled:"disabled",totalRows:0,totalPages:0,filteredRows:0,filteredPages:0,ajaxCounter:0,currentFilters:[],startRow:0,endRow:0,$size:null,last:{}};var f="filterInit filterStart filterEnd sortEnd disablePager enablePager destroyPager updateComplete pageSize pageSet pageAndSize pagerUpdate refreshComplete ",u=this,h=function(e,t,a){var i,s="addClass",r="removeClass",o=t.cssDisabled,n=!!a,l=n||0===t.page,g=I(e,t),c=n||t.page===g-1||0===g;t.updateArrows&&((i=t.$container.find(t.cssFirst+","+t.cssPrev))[l?s:r](o),i.each(function(){this.ariaDisabled=l}),(i=t.$container.find(t.cssNext+","+t.cssLast))[c?s:r](o),i.each(function(){this.ariaDisabled=c}))},w=function(e,t){var a,i,s,r=e.config,o=r.$table.hasClass("hasFilters");if(o&&!t.ajax)if(T.isEmptyObject(r.cache))t.filteredRows=t.totalRows=r.$tbodies.eq(0).children("tr").not(t.countChildRows?"":"."+r.cssChildRow).length;else for(t.filteredRows=0,s=(a=r.cache[0].normalized).length,i=0;i<s;i++)t.filteredRows+=t.regexRows.test(a[i][r.columns].$row[0].className)?0:1;else o||(t.filteredRows=t.totalRows)},y=function(e,n,t){if(!n.initializing){var a,i,s,r,o,l,g,c,d=e.config,p=d.namespace+"pager",f=A(n,n.size,"get");if("all"===f&&(f=n.totalRows),n.countChildRows&&(i[i.length]=d.cssChildRow),n.totalPages=Math.ceil(n.totalRows/f),d.totalRows=n.totalRows,N(e,n),w(e,n),d.filteredRows=n.filteredRows,n.filteredPages=Math.ceil(n.filteredRows/f)||0,0<=I(e,n)){if(i=f*n.page>n.filteredRows&&t,n.page=i?n.pageReset||0:n.page,n.startRow=i?f*n.page+1:0===n.filteredRows?0:f*n.page+1,n.endRow=Math.min(n.filteredRows,n.totalRows,f*(n.page+1)),s=n.$container.find(n.cssPageDisplay),a="function"==typeof n.output?n.output(e,n):(c=s.attr("data-pager-output"+(n.filteredRows<n.totalRows?"-filtered":""))||n.output,(n.ajaxData&&n.ajaxData.output&&n.ajaxData.output||c).replace(/\{page([\-+]\d+)?\}/gi,function(e,t){return n.totalPages?n.page+(t?parseInt(t,10):1):0}).replace(/\{\w+(\s*:\s*\w+)?\}/gi,function(e){var t,a,i=e.replace(/[{}\s]/g,""),s=i.split(":"),r=n.ajaxData,o=/(rows?|pages?)$/i.test(i)?0:"";return/(startRow|page)/.test(s[0])&&"input"===s[1]?(t=(""+("page"===s[0]?n.totalPages:n.totalRows)).length,a="page"===s[0]?n.page+1:n.startRow,'<input type="text" class="ts-'+s[0]+'" style="max-width:'+t+'em" value="'+a+'"/>'):1<s.length&&r&&r[s[0]]?r[s[0]][s[1]]:n[i]||(r?r[i]:o)||o})),(r=n.$container.find(n.cssGoto)).length){for(i="",l=(g=b(e,n)).length,o=0;o<l;o++)i+='<option value="'+g[o]+'">'+g[o]+"</option>";r.html(i).val(n.page+1)}s.length&&(s["INPUT"===s[0].nodeName?"val":"html"](a),s.find(".ts-startRow, .ts-page").unbind("change"+p).bind("change"+p,function(){var e=M(this).val(),t=M(this).hasClass("ts-startRow")?Math.floor(e/f)+1:e;d.$table.triggerHandler("pageSet"+p,[t])}))}h(e,n),R(e,n),n.initialized&&!1!==t&&(T.debug(d,"pager")&&console.log("Pager >> Triggering pagerComplete"),d.$table.triggerHandler("pagerComplete",n),n.savePages&&T.storage&&T.storage(e,n.storageKey,{page:n.page,size:f===n.totalRows?"all":f}))}},b=function(e,t){var a,i,s,r,o,n,l=I(e,t)||1,g=5*Math.ceil(l/t.maxOptionSize/5),c=l>t.maxOptionSize,d=t.page+1,p=g,f=l-g,u=[1];for(a=c?g:1;a<=l;)u[u.length]=a,a+=c?g:1;if(u[u.length]=l,c){for(s=[],(p=d-(i=Math.max(Math.floor(t.maxOptionSize/g)-1,5)))<1&&(p=1),l<(f=d+i)&&(f=l),a=p;a<=f;a++)s[s.length]=a;g/2<(o=(u=M.grep(u,function(e,t){return M.inArray(e,u)===t})).length)-(n=s.length)&&o+n>t.maxOptionSize&&(r=Math.floor(o/2)-Math.floor(n/2),Array.prototype.splice.apply(u,[r,n])),u=u.concat(s)}return u=M.grep(u,function(e,t){return M.inArray(e,u)===t}).sort(function(e,t){return e-t})},R=function(e,t){var a,i,s,r=e.config,o=r.$tbodies.eq(0);o.find("tr.pagerSavedHeightSpacer").remove(),t.fixedHeight&&!t.isDisabled&&(i=M.data(e,"pagerSavedHeight"))&&(s=0,1<M(e).css("border-spacing").split(" ").length&&(s=M(e).css("border-spacing").split(" ")[1].replace(/[^-\d\.]/g,"")),5<(a=i-o.height()+s*t.size-s)&&M.data(e,"pagerLastSize")===t.size&&o.children("tr:visible").length<("all"===t.size?t.totalRows:t.size)&&o.append('<tr class="pagerSavedHeightSpacer '+r.selectorRemove.slice(1)+'" style="height:'+a+'px;"></tr>'))},z=function(e,t){var a,i=e.config,s=i.$tbodies.eq(0);s.find("tr.pagerSavedHeightSpacer").remove(),s.children("tr:visible").length||s.append('<tr class="pagerSavedHeightSpacer '+i.selectorRemove.slice(1)+'"><td>&nbsp</td></tr>'),a=s.children("tr").eq(0).height()*("all"===t.size?t.totalRows:t.size),M.data(e,"pagerSavedHeight",a),R(e,t),M.data(e,"pagerLastSize",t.size)},x=function(e,t){if(!t.ajaxUrl){var a,i=0,s=e.config,r=s.$tbodies.eq(0).children("tr"),o=r.length,n="all"===t.size?t.totalRows:t.size,l=t.page*n,g=l+n,c=0,d=0;for(t.cacheIndex=[],a=0;a<o;a++)t.regexFiltered.test(r[a].className)||(d===l&&r[a].className.match(s.cssChildRow)?r[a].style.display="none":(r[a].style.display=l<=d&&d<g?"":"none",c!==d&&l<=d&&d<g&&(t.cacheIndex[t.cacheIndex.length]=a,c=d),(d+=r[a].className.match(s.cssChildRow+"|"+s.selectorRemove.slice(1))&&!t.countChildRows?0:1)===g&&"none"!==r[a].style.display&&r[a].className.match(T.css.cssHasChild)&&(i=a)));if(0<i&&r[i].className.match(T.css.cssHasChild))for(;++i<o&&r[i].className.match(s.cssChildRow);)r[i].style.display=""}},j=function(e,t){t.size=A(t,t.$container.find(t.cssPageSize).val(),"get"),F(e,t.size,t),h(e,t),t.removeRows||(x(e,t),M(e).bind("sortEnd filterEnd ".split(" ").join(e.config.namespace+"pager "),function(){x(e,t)}))},P=function(e,t,a,i,s,r){if("function"==typeof a.ajaxProcessing){t.config.$tbodies.eq(0).empty();var o,n,l,g,c,d,p,f,u,h,w,b,R,z,x,j=t.config,P=j.$table,v="",m=a.ajaxProcessing(e,t,i)||[0,[]];if(T.showError(t),r)T.debug(j,"pager")&&console.error("Pager >> Ajax Error",i,s,r),T.showError(t,i,s,r),j.$tbodies.eq(0).children("tr").detach(),a.totalRows=0;else{if(M.isArray(m)?(R=m[(l=isNaN(m[0])&&!isNaN(m[1]))?1:0],a.totalRows=isNaN(R)?a.totalRows||0:R,j.totalRows=j.filteredRows=a.filteredRows=a.totalRows,w=0===a.totalRows?[]:m[l?0:1]||[],h=m[2]):(a.ajaxData=m,j.totalRows=a.totalRows=m.total,j.filteredRows=a.filteredRows=void 0!==m.filteredRows?m.filteredRows:m.total,h=m.headers,w=m.rows||[]),b=w&&w.length,w instanceof M)a.processAjaxOnInit&&(j.$tbodies.eq(0).empty(),j.$tbodies.eq(0).append(w));else if(b){for(o=0;o<b;o++){for(v+="<tr>",n=0;n<w[o].length;n++)v+=/^\s*<td/.test(w[o][n])?M.trim(w[o][n]):"<td>"+w[o][n]+"</td>";v+="</tr>"}a.processAjaxOnInit&&j.$tbodies.eq(0).html(v)}if(a.processAjaxOnInit=!0,h)for(d=(g=P.hasClass("hasStickyHeaders"))?j.widgetOptions.$sticky.children("thead:first").children("tr:not(."+j.cssIgnoreRow+")").children():"",c=P.find("tfoot tr:first").children(),z=(p=j.$headers.filter("th ")).length,n=0;n<z;n++)(f=p.eq(n)).find("."+T.css.icon).length?(u=f.find("."+T.css.icon).clone(!0),f.find("."+T.css.headerIn).html(h[n]).append(u),g&&d.length&&(u=d.eq(n).find("."+T.css.icon).clone(!0),d.eq(n).find("."+T.css.headerIn).html(h[n]).append(u))):(f.find("."+T.css.headerIn).html(h[n]),g&&d.length&&(a.$container=a.$container.add(j.widgetOptions.$sticky),d.eq(n).find("."+T.css.headerIn).html(h[n]))),c.eq(n).html(h[n])}j.showProcessing&&T.isProcessing(t),x=A(a,a.size,"get"),a.totalPages="all"===x?1:Math.ceil(a.totalRows/x),a.last.totalRows=a.totalRows,a.last.currentFilters=a.currentFilters,a.last.sortList=(j.sortList||[]).join(","),y(t,a,!1),T.updateCache(j,function(){a.initialized&&setTimeout(function(){T.debug(j,"pager")&&console.log("Pager >> Triggering pagerChange"),P.triggerHandler("pagerChange",a),T.applyWidget(t),y(t,a,!0)},0)})}a.initialized||q(t,a)},v=function(e,a){var t,i,s=e.config,r=a.ajaxUrl?a.ajaxUrl.replace(/\{page([\-+]\d+)?\}/,function(e,t){return a.page+(t?parseInt(t,10):0)}).replace(/\{size\}/g,a.size):"",o=s.sortList,n=a.currentFilters||M(e).data("lastSearch")||[],l=r.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),g=r.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),c=[];if(l){for(l=l[1],i=o.length,t=0;t<i;t++)c[c.length]=l+"["+o[t][0]+"]="+o[t][1];r=r.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g,c.length?c.join("&"):l),c=[]}if(g){for(g=g[1],i=n.length,t=0;t<i;t++)n[t]&&(c[c.length]=g+"["+t+"]="+encodeURIComponent(n[t]));r=r.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g,c.length?c.join("&"):g),a.currentFilters=n}return"function"==typeof a.customAjaxUrl&&(r=a.customAjaxUrl(e,r)),T.debug(s,"pager")&&console.log("Pager >> Ajax url = "+r),r},m=function(e,t,a){var i,s,r,o,n=M(e),l=e.config,g=T.debug(l,"pager"),c=l.$table.hasClass("hasFilters"),d=t&&t.length||0,p="all"===a.size?a.totalRows:a.size,f=a.page*p;if(d<1)g&&console.warn("Pager >> No rows for pager to render");else{if(a.page>=a.totalPages&&E(e,a),a.cacheIndex=[],a.isDisabled=!1,a.initialized&&(g&&console.log("Pager >> Triggering pagerChange"),n.triggerHandler("pagerChange",a)),a.removeRows){for(T.clearTableBody(e),i=T.processTbody(e,l.$tbodies.eq(0),!0),r=s=c?0:f,o=0;o<p&&s<t.length;)c&&a.regexFiltered.test(t[s][0].className)||f<++r&&o<=p&&(o++,a.cacheIndex[a.cacheIndex.length]=s,i.append(t[s])),s++;T.processTbody(e,i,!1)}else x(e,a);y(e,a),e.isUpdating&&(g&&console.log("Pager >> Triggering updateComplete"),n.triggerHandler("updateComplete",[e,!0]))}},C=function(e,t){var a,i,s;for(t.ajax?h(e,t,!0):(M.data(e,"pagerLastPage",t.page),M.data(e,"pagerLastSize",t.size),t.page=0,t.size=t.totalRows,t.totalPages=1,M(e).addClass("pagerDisabled").removeAttr("aria-describedby").find("tr.pagerSavedHeightSpacer").remove(),m(e,e.config.rowsCopy,t),t.isDisabled=!0,T.applyWidget(e),T.debug(e.config,"pager")&&console.log("Pager >> Disabled")),s=(i=t.$container.find(t.cssGoto+","+t.cssPageSize+", .ts-startRow, .ts-page")).length,a=0;a<s;a++)i.eq(a).addClass(t.cssDisabled)[0].disabled=!0,i[a].ariaDisabled=!0},S=function(i){var s=i.config,r=s.pager;T.updateCache(s,function(){var e,t=[],a=i.config.cache[0].normalized;for(r.totalRows=a.length,e=0;e<r.totalRows;e++)t[t.length]=a[e][s.columns].$row;s.rowsCopy=t,$(i,r,!0)})},$=function(e,t,a){if(!t.isDisabled){var i,s,r,o,n,l,g,c,d=e.config,p=T.debug(d,"pager"),f=M(e),u=t.last;if(!1!==a&&t.initialized&&T.isEmptyObject(d.cache))return S(e);if(!t.ajax||!T.hasWidget(e,"filter")||d.widgetOptions.filter_initialized)if(N(e,t),w(e,t),u.currentFilters=""===(u.currentFilters||[]).join("")?[]:u.currentFilters,t.currentFilters=""===(t.currentFilters||[]).join("")?[]:t.currentFilters,u.page!==t.page||u.size!==t.size||u.totalRows!==t.totalRows||(u.currentFilters||[]).join(",")!==(t.currentFilters||[]).join(",")||(u.ajaxUrl||"")!==(t.ajaxObject.url||"")||(u.optAjaxUrl||"")!==(t.ajaxUrl||"")||u.sortList!==(d.sortList||[]).join(","))p&&console.log("Pager >> Changing to page "+t.page),t.last={page:t.page,size:t.size,sortList:(d.sortList||[]).join(","),totalRows:t.totalRows,currentFilters:t.currentFilters||[],ajaxUrl:t.ajaxObject.url||"",optAjaxUrl:t.ajaxUrl||""},t.ajax?t.processAjaxOnInit||T.isEmptyObject(t.initialRows)?(n=v(s=e,r=t),l=M(document),g=s.config,c=g.namespace+"pager",""!==n&&(g.showProcessing&&T.isProcessing(s,!0),l.bind("ajaxError"+c,function(e,t,a,i){P(null,s,r,t,a,i),l.unbind("ajaxError"+c)}),o=++r.ajaxCounter,r.last.ajaxUrl=n,r.ajaxObject.url=n,r.ajaxObject.success=function(e,t,a){o<r.ajaxCounter||(P(e,s,r,a),l.unbind("ajaxError"+c),"function"==typeof r.oldAjaxSuccess&&r.oldAjaxSuccess(e))},T.debug(g,"pager")&&console.log("Pager >> Ajax initialized",r.ajaxObject),M.ajax(r.ajaxObject))):(t.processAjaxOnInit=!0,i=t.initialRows,t.totalRows=void 0!==i.total?i.total:p&&console.error("Pager >> No initial total page set!")||0,t.filteredRows=void 0!==i.filtered?i.filtered:p&&console.error("Pager >> No initial filtered page set!")||0,q(e,t)):t.ajax||m(e,d.rowsCopy,t),M.data(e,"pagerLastPage",t.page),t.initialized&&!1!==a&&(p&&console.log("Pager >> Triggering pageMoved"),f.triggerHandler("pageMoved",t),T.applyWidget(e),e.isUpdating&&(p&&console.log("Pager >> Triggering updateComplete"),f.triggerHandler("updateComplete",[e,!0])))}},I=function(e,t){return T.hasWidget(e,"filter")?Math.min(t.totalPages,t.filteredPages):t.totalPages},N=function(e,t){var a=I(e,t)-1;return t.page=parseInt(t.page,10),(t.page<0||isNaN(t.page))&&(t.page=0),t.page>a&&0<=a&&(t.page=a),t.page},A=function(e,t,a){var i=parseInt(t,10)||e.size||e.settings.size||10;return e.initialized&&(/all/i.test(i+" "+t)||i===e.totalRows)?e.$container.find(e.cssPageSize+' option[value="all"]').length?"all":e.totalRows:"get"===a?i:e.size},F=function(e,t,a){a.size=A(a,t,"get"),a.$container.find(a.cssPageSize).val(a.size),M.data(e,"pagerLastPage",N(e,a)),M.data(e,"pagerLastSize",a.size),a.totalPages="all"===a.size?1:Math.ceil(a.totalRows/a.size),a.filteredPages="all"===a.size?1:Math.ceil(a.filteredRows/a.size)},O=function(e,t){t.page=0,$(e,t)},E=function(e,t){t.page=I(e,t)-1,$(e,t)},L=function(e,t){t.page++;var a=I(e,t)-1;t.page>=a&&(t.page=a),$(e,t)},D=function(e,t){t.page--,t.page<=0&&(t.page=0),$(e,t)},q=function(e,t){t.initialized=!0,t.initializing=!1,T.debug(e.config,"pager")&&console.log("Pager >> Triggering pagerInitialized"),M(e).triggerHandler("pagerInitialized",t),T.applyWidget(e),y(e,t)},U=function(e,t,a){var i,s,r,o=e.config;t.$container.find(t.cssGoto+","+t.cssPageSize+",.ts-startRow, .ts-page").removeClass(t.cssDisabled).removeAttr("disabled").each(function(){this.ariaDisabled=!1}),t.isDisabled=!1,t.page=M.data(e,"pagerLastPage")||t.page||0,s=(r=t.$container.find(t.cssPageSize)).find("option[selected]").val(),t.size=M.data(e,"pagerLastSize")||A(t,s,"get"),t.totalPages="all"===t.size?1:Math.ceil(I(e,t)/t.size),F(e,t.size,t),e.id&&!o.$table.attr("aria-describedby")&&((i=(r=t.$container.find(t.cssPageDisplay)).attr("id"))||(i=e.id+"_pager_info",r.attr("id",i)),o.$table.attr("aria-describedby",i)),z(e,t),a&&(T.update(o),F(e,t.size,t),$(e,t),j(e,t),T.debug(o,"pager")&&console.log("Pager >> Enabled"))},H=function(o,e){var t,s,r,a,n=o.config,i=n.widgetOptions,l=T.debug(n,"pager"),g=n.pager=M.extend(!0,{},M.tablesorterPager.defaults,e),c=n.$table,d=n.namespace+"pager",p=g.$container=M(g.container).addClass("tablesorter-pager").show();g.settings=M.extend(!0,{},M.tablesorterPager.defaults,e),l&&console.log("Pager >> Initializing"),g.oldAjaxSuccess=g.oldAjaxSuccess||g.ajaxObject.success,n.appender=u.appender,g.initializing=!0,g.savePages&&T.storage&&(t=T.storage(o,g.storageKey)||{},g.page=isNaN(t.page)?g.page:t.page,g.size="all"===t.size?t.size:(isNaN(t.size)?g.size:t.size)||g.setSize||10,F(o,g.size,g)),g.regexRows=new RegExp("("+(i.filter_filteredRow||"filtered")+"|"+n.selectorRemove.slice(1)+"|"+n.cssChildRow+")"),g.regexFiltered=new RegExp(i.filter_filteredRow||"filtered"),c.unbind(f.split(" ").join(d+" ").replace(/\s+/g," ")).bind("filterInit filterStart ".split(" ").join(d+" "),function(e,t){var a;if(g.currentFilters=M.isArray(t)?t:n.$table.data("lastSearch"),g.ajax&&"filterInit"===e.type)return $(o,g,!1);a=T.filter.equalFilters?T.filter.equalFilters(n,n.lastSearch,g.currentFilters):(n.lastSearch||[]).join("")!==(g.currentFilters||[]).join(""),"filterStart"!==e.type||!1===g.pageReset||a||(g.page=g.pageReset)}).bind("filterEnd sortEnd ".split(" ").join(d+" "),function(){g.currentFilters=n.$table.data("lastSearch"),(g.initialized||g.initializing)&&(n.delayInit&&n.rowsCopy&&0===n.rowsCopy.length&&S(o),y(o,g,!1),$(o,g,!1),T.applyWidget(o))}).bind("disablePager"+d,function(e){e.stopPropagation(),C(o,g)}).bind("enablePager"+d,function(e){e.stopPropagation(),U(o,g,!0)}).bind("destroyPager"+d,function(e){var t,a,i,s,r;e.stopPropagation(),a=g,i=(t=o).config,s=i.namespace+"pager",r=[a.cssFirst,a.cssPrev,a.cssNext,a.cssLast,a.cssGoto,a.cssPageSize].join(","),C(t,a),a.$container.hide().find(r).unbind(s),i.appender=null,i.$table.unbind(s),T.storage&&T.storage(t,a.storageKey,""),delete i.pager,delete i.rowsCopy}).bind("resetToLoadState"+d,function(e){var t,a;e.stopPropagation(),a=g,(t=o).config.pager=M.extend(!0,{},M.tablesorterPager.defaults,a.settings),H(t,a.settings)}).bind("updateComplete"+d,function(e,t,a){if(e.stopPropagation(),t&&!a&&!g.ajax){var i=n.$tbodies.eq(0).children("tr").not(n.selectorRemove);g.totalRows=i.length-(g.countChildRows?0:i.filter("."+n.cssChildRow).length),g.totalPages="all"===g.size?1:Math.ceil(g.totalRows/g.size),i.length&&n.rowsCopy&&0===n.rowsCopy.length&&S(t),g.page>=g.totalPages&&E(t,g),x(t,g),z(t,g),y(t,g,!0)}}).bind("pageSize refreshComplete ".split(" ").join(d+" "),function(e,t){e.stopPropagation(),F(o,A(g,t,"get"),g),$(o,g),x(o,g),y(o,g,!1)}).bind("pageSet pagerUpdate ".split(" ").join(d+" "),function(e,t){e.stopPropagation(),"pagerUpdate"===e.type&&(t=void 0===t?g.page+1:t,g.last.page=!0),g.page=(parseInt(t,10)||1)-1,$(o,g,!0),y(o,g,!1)}).bind("pageAndSize"+d,function(e,t,a){e.stopPropagation(),g.page=(parseInt(t,10)||1)-1,F(o,A(g,a,"get"),g),$(o,g,!0),x(o,g),y(o,g,!1)}),s=[g.cssFirst,g.cssPrev,g.cssNext,g.cssLast],r=[O,D,L,E],l&&!p.length&&console.warn('Pager >> "container" not found'),p.find(s.join(",")).attr("tabindex",0).unbind("click"+d).bind("click"+d,function(e){e.stopPropagation();var t,a=M(this),i=s.length;if(!a.hasClass(g.cssDisabled))for(t=0;t<i;t++)if(a.is(s[t])){r[t](o,g);break}}),(a=p.find(g.cssGoto)).length?a.unbind("change"+d).bind("change"+d,function(){g.page=M(this).val()-1,$(o,g,!0),y(o,g,!1)}):l&&console.warn('Pager >> "goto" selector not found'),(a=p.find(g.cssPageSize)).length?(a.find("option").removeAttr("selected"),a.unbind("change"+d).bind("change"+d,function(){if(!M(this).hasClass(g.cssDisabled)){var e=M(this).val();F(o,e,g),$(o,g),z(o,g)}return!1})):l&&console.warn('Pager >> "size" selector not found'),g.initialized=!1,c.triggerHandler("pagerBeforeInitialized",g),U(o,g,!1),"string"==typeof g.ajaxUrl?(g.ajax=!0,n.widgetOptions.filter_serversideFiltering=!0,n.serverSideSorting=!0,$(o,g)):(g.ajax=!1,T.appendCache(n,!0),j(o,g)),g.ajax||g.initialized||(g.initializing=!1,g.initialized=!0,F(o,g.size,g),$(o,g),l&&console.log("Pager >> Triggering pagerInitialized"),n.$table.triggerHandler("pagerInitialized",g),n.widgetOptions.filter_initialized&&T.hasWidget(o,"filter")||y(o,g,!1)),n.widgetInit.pager=!0};u.appender=function(e,t){var a=e.config,i=a.pager;i.ajax||(a.rowsCopy=t,i.totalRows=i.countChildRows?a.$tbodies.eq(0).children("tr").length:t.length,i.size=M.data(e,"pagerLastSize")||i.size||i.settings.size||10,i.totalPages="all"===i.size?1:Math.ceil(i.totalRows/i.size),m(e,t,i),y(e,i,!1))},u.construct=function(e){return this.each(function(){this.config&&this.hasInitialized&&H(this,e)})}}}),T.showError=function(e,t,a,i){var s=M(e),r=s[0].config,o=r&&r.widgetOptions,n=r.pager&&r.pager.cssErrorRow||o&&o.pager_css&&o.pager_css.errorRow||"tablesorter-errorRow",l=typeof t,g=!0,c="",d=function(){r.$table.find("thead").find(r.selectorRemove).remove()};if(s.length){if("function"==typeof r.pager.ajaxError){if(!1===(g=r.pager.ajaxError(r,t,a,i)))return d();c=g}else if("function"==typeof o.pager_ajaxError){if(!1===(g=o.pager_ajaxError(r,t,a,i)))return d();c=g}if(""===c)if("object"===l)c=0===t.status?"Not connected, verify Network":404===t.status?"Requested page not found [404]":500===t.status?"Internal Server Error [500]":"parsererror"===i?"Requested JSON parse failed":"timeout"===i?"Time out error":"abort"===i?"Ajax Request aborted":"Uncaught error: "+t.statusText+" ["+t.status+"]";else{if("string"!==l)return d();c=t}M(/tr\>/.test(c)?c:'<tr><td colspan="'+r.columns+'">'+c+"</td></tr>").click(function(){M(this).remove()}).appendTo(r.$table.find("thead:first")).addClass(n+" "+r.selectorRemove.slice(1)).attr({role:"alert","aria-live":"assertive"})}else console.error("tablesorter showError: no table parameter passed")},M.fn.extend({tablesorterPager:M.tablesorterPager.construct})}(jQuery);return jQuery;}));
;
/**
 * @file
 * Plugin jQuery Tablesorter.
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.tablesorter = {
    attach: function (context, settings) {
      var widgets = [];
      var widgetsZebra = [];

      if (settings.tablesorter) {
        if (settings.tablesorter.zebra == 1) {
          widgets.push('zebra');
        }
        widgetsZebra.push(settings.tablesorter.odd);
        widgetsZebra.push(settings.tablesorter.even);
      }

      // Loop through each tablesorter and activate jQuery plugin.
      $('table.tablesorter').each(function (idx, table) {
        $(table).tablesorter({
          widgets: widgets,
          widgetsZebra: {
            css: widgetsZebra
          }
        });
        if ($("#tablesorter_pager").length != 0) {
          $(table).tablesorterPager({
            container: $("#tablesorter_pager")
          });
        }
      });
    }
  };
})(jQuery, Drupal);
;
/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});;
/**
 * @file
 * Defines the behavior of the rmg cookie policy popup.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.rmgCookiePolicyPopup = {
    attach: function (context) {
      $('body').once('rmg-cookie-policy').each(function () {
        Drupal.rmg_cookie_policy.execute();
      });
    },
  };

  Drupal.rmg_cookie_policy = {};

  /**
    * Contains the cookie policy display logic.
    */
  Drupal.rmg_cookie_policy.execute = function () {
    try {
      if (!drupalSettings.rmg_cookie_policy.popup_enabled) {
        return;
      }

      if (!Drupal.rmg_cookie_policy.cookiesEnabled()) {
        return;
      }

      if (!Drupal.rmg_cookie_policy.hasCookie()) {
        Drupal.rmg_cookie_policy.createPopup(drupalSettings.rmg_cookie_policy.popup_html_info);
      }
      if (!$.cookie('OPT_IN_CONSENT')) {
        Drupal.rmg_cookie_policy.attachAgreeEvents();
      }
    }
    catch (e) {
    }
  };

  /**
    * Function to display the Cookie policy popup.
    */
  Drupal.rmg_cookie_policy.createPopup = function (html) {
    var popup = $('<div></div>').html(html);
    popup.attr('id', 'sliding-popup');

    popup.hide();
    var height = 0;
    popup.prependTo('body');
    height = popup.outerHeight();
    popup.show()
      .addClass('sliding-popup-top clearfix')
      .css({ top: -1 * height })
      .animate({ top: 0 }, 1000, null, function () {
        popup.trigger('rmg_cookie_policy_popup_open');
      });
  };

  /**
    * Attach actions on the event of displaying the popup.
    */
  Drupal.rmg_cookie_policy.attachAgreeEvents = function () {
    Drupal.rmg_cookie_policy.acceptAction();
    $('.find-more-button').not('.find-more-button-processed').addClass('find-more-button-processed').click(Drupal.rmg_cookie_policy.moreInfoAction);
  };

  /**
    * Function to excute the actions for the cookie policy popup.
    */
  Drupal.rmg_cookie_policy.acceptAction = function () {
    Drupal.rmg_cookie_policy.changeStatus();
    $('.agree-button').click(Drupal.rmg_cookie_policy.hidePopup);
  };

  /**
    * Function to hide the popup.
    */
  Drupal.rmg_cookie_policy.hidePopup = function () {
    $('.sliding-popup-top').animate({ top: $('#sliding-popup').outerHeight() * -1 }, drupalSettings.rmg_cookie_policy.popup_delay, function () {
      $('#sliding-popup').trigger('rmg_cookie_policy_popup_close').remove();

    });
  };

  /**
    * It holds the logic of opening the moreinfo link in browser.
    */
  Drupal.rmg_cookie_policy.moreInfoAction = function () {
    if (drupalSettings.rmg_cookie_policy.popup_link_new_window) {
      window.open(drupalSettings.rmg_cookie_policy.popup_link);
    }
    else {
      window.location.href = drupalSettings.rmg_cookie_policy.popup_link;
    }
  };

  /**
    * Function to check whether the cookie is set or not.
    */
  Drupal.rmg_cookie_policy.hasCookie = function () {
    var sessionCookie = $.cookie('OPT_IN_TEMP');
    var persistentCookie = $.cookie('OPT_IN_CONSENT');
    return sessionCookie != null ||  persistentCookie != null;
  };

  /**
    * Function holds the related actions to happen while changing cookie value.
    */
  Drupal.rmg_cookie_policy.changeStatus = function () {

    if ($.cookie('OPT_IN_TEMP')) {
      $('.sliding-popup-top').animate({top: $('#sliding-popup').outerHeight() * -1}, drupalSettings.rmg_cookie_policy.popup_delay, function () {
        $('#sliding-popup').trigger('rmg_cookie_policy_popup_close').remove();
      });
    }

    Drupal.rmg_cookie_policy.setCookies();
  };

  /**
    * Function to set the cookie value.
    */
  Drupal.rmg_cookie_policy.setCookies = function () {

    var cookie_domain = drupalSettings.rmg_cookie_policy.domain ? drupalSettings.rmg_cookie_policy.domain : '';
    // If we have a session cookie...
    if ($.cookie('OPT_IN_TEMP')) {
      // Set the persistent cookie.
      var expireTime = new Date();
      expireTime.setDate(expireTime.getDate() + 365);

      $.cookie('OPT_IN_CONSENT', "OPT-IN-CC", {
        expires : expireTime,
        path    : '/',
        domain  : cookie_domain
      });
    }
    else {
      // Set the session Cookie.
      $.cookie("OPT_IN_TEMP", "OPT-IN-TEMP-Cookie", {
        path    : '/',
        domain  : cookie_domain
      });
    }
  };

  /**
    * Function to check whether the browser cookie is enabled or not.
    */
  Drupal.rmg_cookie_policy.cookiesEnabled = function () {
    var cookieEnabled = (navigator.cookieEnabled);
    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
      $.cookie('testcookie', 'testcookie', { expires: 100 });
      cookieEnabled = ($.cookie('testcookie').indexOf('testcookie') !== -1);
    }
    return (cookieEnabled);
  };

})(jQuery, Drupal, drupalSettings);
;
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});
;
/**
 * @file
 * RML paragraphs JavaScript.
 */

(function ($, Drupal) {

  /**
   * Slick Carousel functions.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Handles adding/removing a promo card carousel.
   */
  Drupal.behaviors.slickCarousel = {
    attach: function (context) {
      processCarousel();
      // Add a window resize event to attach/detach a carousel as needed.
      window.addEventListener("resize", function () {
        // Re-center the carousel.
        $('.carousel').css('transform', 'translate3d(0, 0, 0)');
        processCarousel();
      }, false);
    }
  };

  /**
   * Attach/detach a slick carousel.
   */
  function processCarousel() {
    var $carousel_element = $('.carousel .row');

    if ($carousel_element.length) {
      if ($(window).width() < 992) {
        $carousel_element.not('.slick-initialized').slick({
          infinite: false,
          speed: 300,
          slidesToShow: 1,
          variableWidth: true,
          arrows: false,
          responsive: [
            {
              breakpoint: 767,
              settings: {
                centerMode: true,
              }
            }
          ]
        });

        var $slide_wrapper = $('.slide-wrapper');
        var $carousel = $('.carousel');
        if (!Modernizr.touchevents) {
          // Non touch device, handle carousel hover events.
          $slide_wrapper.hover(function () {
            var offsetRight = calculateSlideOffset($(this));

            if (offsetRight > $(window).width()) {
              // Reposition the carousel to uncover the partly hidden card.
              $carousel.css('transform', 'translate3d(-30px, 0, 0)');
            }
          });

          $slide_wrapper.mouseout(function () {
            // Reset the carousel position.
            $carousel.css('transform', 'translate3d(0, 0, 0)');
          });

          // Non touch device, handle carousel click events.
          $slide_wrapper.click(function (e) {
            var offsetRight = calculateSlideOffset($(this));

            if (offsetRight > $(window).width()) {
              // The clicked slide is outside of the viewport, prevent the
              // click.
              e.preventDefault();

              // Progress the carousel slide into view.
              $carousel_element.slick('slickNext');
            }
          });
        }
      }
      else {
        // The users device is more than 992px, detach any carousel.
        if ($carousel_element.hasClass('slick-initialized')) {
          $carousel_element.slick('unslick');
        }
      }
    }
  };

  /**
   * Calculate a promo card slide offset.
   *
   * @param {object} $slide
   *   A promo card slide jQuery object.
   *
   * @return {int}
   *   The slide offset.
   */
  function calculateSlideOffset($slide) {
    var left = $slide.parent().offset().left;
    var width = $slide.parent().outerWidth();
    return left + width;
  }
}(jQuery, Drupal));
;
/**
 * @file
 * Provide toggling of Bing search form.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.rml_bing_search = {

    attach: function (context, settings) {

      var $searchBlock = $('#block-bingsearch');

      $searchBlock.once('rml_bing_search').each(function () {

        var $menu = $('.menu-item-icon-search');
        $menu.click(function (event) {

          event.preventDefault();

          $searchBlock.toggleClass('visually-hidden');
          $menu.find('.open').toggleClass('visually-hidden');
          $menu.find('.close').toggleClass('visually-hidden');

          // Set focus to Search box while it is visible.
          if (!$searchBlock.hasClass('visually-hidden')) {
            $searchBlock.find('.form-item-keys input').focus();
          }

        });

      });

      var $searchSubmit = $('input[name=Search]');
      $searchSubmit.each(function () {

        var $currentInput = $(this).parent().parent().find('.form-text');

        $(this).click(function (event) {
          // Prevent search if there is no text inside search bar.
          var searchInput = $currentInput.val();
          if (searchInput.length == 0 || searchInput === settings.emptyResultsText) {
            event.preventDefault();
            $currentInput.val(settings.emptyResultsText);
          }
        });
      });

      var $searchInputs = $('input[name=keys]');
      $searchInputs.each(function () {

        var $currentInput = $(this);
        var $closestClearButton = $(this).parent().next('.clear-text-input');

        toggleClearIcon($currentInput, $closestClearButton);
        clearSearchBar($currentInput, $closestClearButton);

        $currentInput.keyup(function () {
          // Check to see if there is text inside the search bar on key entry
          // if so display clear icon.
          toggleClearIcon($currentInput, $closestClearButton);
        });

        $currentInput.focus(function () {
          // Clear search bar while getting focus.
          if ($currentInput.val() != '') {
            $currentInput.val('');
          }
        });

      });

      /**
       * Toggle clear icon display when there is text in search bar.
       *
       * @param object currentInput
       *   Text input object.
       * @param object closestClearButton
       *   Closest clear button within the text input object.
       */
      function toggleClearIcon($currentInput, $closestClearButton) {
        // If there is content in the nearest search input then display cross.
        if ($closestClearButton && $currentInput.val().length > 0) {
          $closestClearButton.addClass('is-visible');
        }
        else {
          $closestClearButton.removeClass('is-visible');
        }

      }

      /**
       * Remove text from search bar when clear icon is clicked.
       *
       * @param object currentInput
       *   Text input object.
       * @param object closestClearButton
       *   Closest clear button within the text input object.
       */
      function clearSearchBar($currentInput, $closestClearButton) {
        // Clear out nearest search input.
        $closestClearButton.click(function () {
          $currentInput.val('');
          $closestClearButton.removeClass('is-visible');
        });
      }

    }
  };
})(jQuery, Drupal);
;
