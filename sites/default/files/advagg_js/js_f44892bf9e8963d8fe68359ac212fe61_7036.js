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
$(document).ready(function(){
  // use the standard browser print function
  $('#print').click(function (ev) {
    ev.preventDefault();
    window.print();
  });
  //Add jScrollPane to the body element of the email this page modalframe
  //Note, the scroll does not work very well for IE8
  try {
  }
  catch(err) {}

  /* modal frame supporting js is located in the theme, jquery.rm.global.2011.js file */
});
;
Drupal.behaviors.rmgHelp = function(context) {
  // Close all help if mouse is clicked anywhere outside of the help dialog.
  $(document).click(function(e){
    if ($(e.target).is('.help-content, .help-content *, form a.rmg_help_button')) {
      return;
    }
    closeall(true);
  });

  // Close all help if TAB or ESCAPE key pressed, or any key if the target element is
  // not part of the help dialog.
  $(document).keydown(function(e) {
    if ($(e.target).is('.help-content, .help-content *, form a.rmg_help_button')
        && e.keyCode != $.ui.keyCode.TAB && e.keyCode != $.ui.keyCode.ESCAPE) {
      return;
    }
    closeall(e.keyCode != $.ui.keyCode.TAB);
  });

  var popupHelpButtons;
  var blockButtons;
  var popupControls;
  var blockControls;

  if ($('.rmg-help-msg-block').length > 0) {
    // If msg block exists, only attach pop-ups to help buttons in forms without the rmg_help_block_style class.
    popupHelpButtons = $('form:not(.rmg_help_block_style) a.rmg_help_button');
    blockButtons = $('form.rmg_help_block_style a.rmg_help_button');
    blockControls = $('form.rmg_help_block_style a.rmg_help_button').closest('.form-item').find("select[id^='edit'], input[id^='edit']");
  }
  else {
    // If msg block does not exist, only attach pop-ups to help buttons in all forms.
    popupHelpButtons = $('form a.rmg_help_button');
    popupControls = $('form.rmg_help_block_style a.rmg_help_button').closest('.form-item').find("select[id^='edit'], input[id^='edit']");
  }

  if (popupHelpButtons != undefined && popupHelpButtons.length > 0) {
    popupHelpButtons.each(function() {
      // Check if the help icon doesn't work already with Drupal.behaviors.royalmailHelp.
      if ($(this).find('span.help_text').length == 0) {
        $(this).unbind().click(function(e) {
          e.preventDefault();
          var lastActiveElement = $(this).data('lastActiveElement');
          // Check if the help-content block has been already created, in that case it needs just to be displayed, otherwise it's to be created and displayed.
          if ($('.help-content', $(this).parent()).length == 0) {
            closeall();
            displayhelp($(this), embedded_text_callback_with_ajax_fallback);
          }
          else {
            if ($('.help-content', $(this).parent()).is(":visible")) {
              closehelp($(this), true);
            }
            else {
              closeall();
              // Move the RmgHelp box according the width of the window.
              moveRmgHelp($('.help-content', $(this).parent()), this);
              openhelp($(this));
            }
          }
        }).mousedown(function(e) {
          // Save the active element so focus can be returned to it.
          $(this).data('lastActiveElement', document.activeElement);
        }).keydown(function(e) {
          // Save the active element so focus can be returned to it.
          $(this).data('lastActiveElement', document.activeElement);
        });
      }
    });
  }

  if (popupControls != undefined && popupControls.length > 0) {
    popupControls.click(function(e) {
        // Check if the help-content block has been already created, in that case it needs just to be displayed, otherwise it's to be created and displayed.
      if ($('.help-content', $(this).parent()).length == 0) {
        closeall();
        displayhelp($(this), embedded_text_callback);
      }
      else {
        if ($('.help-content', $(this).parent()).is(":visible")) {
          // Do nowt.
        }
        else {
          closeall();
          // Move the RmgHelp box according the width of the window.
          moveRmgHelp($('.help-content', $(this).parent()), this);
          openhelp($(this));
        }
      }
      return false;
    });
  }

  if (blockButtons != undefined && blockButtons.length > 0) {
    // Display contextual form help when control is clicked.
    blockButtons.unbind('click').click(function(){
      $('.rmg-help-msg-block').html(Drupal.t('Loading...'));
      embedded_text_callback($(this), function(message) {
        if (message) {
          $('.rmg-help-msg-block').html('<p>' + message + '</p>');
        }
        else {
          $('.rmg-help-msg-block').html('<p>Sorry, No help content found</p>');
        }
      }, ajax_text_callback);
      return false;
    });
  }

  if (blockControls != undefined && blockControls.length > 0) {
    // Display contextual form help when control is clicked.
    blockControls.click(function(){
      $('.rmg-help-msg-block').html(Drupal.t('Loading...'));
      embedded_text_callback($(this), function(message) {
        if (message) {
          $('.rmg-help-msg-block').html('<p>' + message + '</p>');
        }
        else {
          $('.rmg-help-msg-block').html('<p>Sorry, No help content found</p>');
        }
      }, control_ajax_text_callback);
      return false;
    });
  }

  var closehelp = function(ele, restoreFocus) {
    $('.help-content', ele.parent())
      .fadeOut('fast', function() {
        if (restoreFocus) {
          $(ele.data('lastActiveElement')).focus();
        }
      });
  }

  var openhelp = function(ele, focus) {
    $('.help-content', ele.parent())
      .fadeIn('fast', function() {
        if (focus) {
          $(this).find('.close').focus();
        }
      });
  }

  function closeall(restoreFocus) {
    $('.help-content:visible').each(function() {
      closehelp($(this).data('triggering_element'), restoreFocus);
    });
  }

  /**
   * Position a help box relative to the given DOM element. By default will
   * position box to right of control if there is sufficient space, otherwise will
   * position help to the left.
   *
   * The help element is a sibling of the control element so help is positioned
   * absolutely within the parent of the control.
   *
   * @param help_element
   *  The complete help box element to be positioned.
   * @param control_element
   *  The control element to which the help box should be positioned relative to.
   */
  function moveRmgHelp(help, control) {
    var window_width = parseInt($(window).width());

    var control_offset = $(control).offset();
    var control_position = $(control).position();
    var control_width = $(control).width();
    var control_height = $(control).height();
    var help_top_adjustment = 11;

    // Add help block to rendering tree so we can get it's width and height.
    $(help).css({'position': 'absolute', 'visibility': 'hidden', 'display': 'block'});
    var help_arrow = $(help).find('.help-arrow');
    var width_arrow = $(help_arrow).width();
    var help_width = $(help).outerWidth();

    // calculate help top relative to control
    var help_top = control_position.top - help_top_adjustment;

    // calculate help arrow top relative to help to line up with middle of control
    var help_arrow_height_difference = $(help_arrow).height() - control_height;
    var help_arrow_top = help_top_adjustment - parseInt(help_arrow_height_difference / 2);

    if (control_offset.left + control_width + width_arrow + help_width > window_width) {
      // Right hand edge of help box would be off right side of screen - so position to left of control.
      // Position absolutely within it's containing box - but relative to the control.
      var help_left = control_position.left - help_width - width_arrow;
      help.css({left: help_left + 'px', top: help_top + 'px'});

      // Position help arrow relative to help box.
      help_arrow.css({
        'background-image': 'url(/sites/all/modules/custom/rmg_help/images/helpTriangleRight.gif)',
        'left': '100%',
        'top' : help_arrow_top + 'px'
      });
    }
    else {
      var help_left = control_position.left + control_width + width_arrow;
      help.css({left: help_left + 'px', top: help_top + 'px'});
      help_arrow.css({
        'background-image': 'url(/sites/all/modules/custom/rmg_help/images/helpTriangle.gif)',
        'left': (width_arrow * -1) + 'px',
        'top' : help_arrow_top + 'px'
      });
    }
    $(help).css({'position': 'absolute', 'visibility': 'visible', 'display': 'none'});

    return;
  }

  var embedded_text_callback_with_ajax_fallback = function(ele, callback) {
    return embedded_text_callback(ele, callback, ajax_text_callback);
  }

    /**
   * Callback to get text from embedded html element.
   *
   * @param ele
   * @returns {*}
   */
  var embedded_text_callback = function(ele, callback, fallback) {
    var embeddedHelpMsgHtml = ele.closest('.form-item').children('.field-prefix').find('.rmg-help-link-msg').html();
    if (embeddedHelpMsgHtml != undefined && embeddedHelpMsgHtml.length > 0) {
      callback(embeddedHelpMsgHtml);
    }
    else {
      // if embedded help not found, try the fallback
      if (fallback) {
        fallback(ele, callback);
      }
      else {
        return false;
      }
    }
  }

  /**
   * Ajax callback for use with control elements. Finds help anchor then calls ajax_text_callback.
   *
   * @param ele
   * @param callback
   */
  var control_ajax_text_callback = function(ele, callback) {
    var help_anchor = $(ele).closest('.form-item').find('a.rmg_help_button');
    if (help_anchor != undefined && help_anchor.length > 0) {
      ajax_text_callback(help_anchor, callback);
    }
    else {
      return false;
    }
  }

    /**
   * Callback to get text from embedded html element.
   *
   * @param ele
   * @returns {*}
   */
  var ajax_text_callback = function(ele, callback) {
    var href = ele.attr("href");
    if (href == '#' || href == '# ' || href == '') {
      return false;
    }

    var basePath = Drupal.settings.basePath;
    var href = href.replace(basePath, basePath + 'js/')

    $.getJSON(href, function(data) {
      if (data != '') {
        callback(data);
      }
      else {
        callback(false);
      }
    });
  }

  /*
   * @param {jQuery object} ele
   *   Help link to attach help pop-up to.
   */
  var displayhelp = function(ele, set_message_callback) {
    var helpcontainer = '<div class="help-content loading" style="display: none;"></div>';
    var loadingText = '<div class="help-data">Loading...</div>';

    var helpLink = ele;

    var help = $(helpcontainer)
      .appendTo(ele.parent())
      .html(loadingText);

    // easily find the triggering element that caused this help element to be created
    help.data('triggering_element', ele);

    var close = $('<a class="close" href="#">Close</a>')
      .click(function(event) {
        event.preventDefault();
        closehelp(helpLink, true);
        return false;
      })
      .prependTo(help);

    var helparrow = $('<div></div>')
      .addClass("help-arrow")
      .appendTo(help);

    // Display the help dialog for the first time.
    moveRmgHelp(help, ele);
    openhelp(helpLink);

    set_message_callback(ele, function(message) {
      if (message) {
        help.removeClass('loading');
        $('.help-data', ele.parent()).html(message);
      }
      else {
        help.removeClass('loading');
        $('.help-data', ele.parent()).html('<p>Sorry, no help content found.</p>');
      }
    });
  };
};
;
var breadTrail = '';

$(document).ready(function(){
  // set up the breadcrumb trail to use in the page name
  $('.breadcrumb li').each(function(){
    breadTrail = breadTrail + $(this).text() + ' : ';
  });
})



this.randomPromo = function(region){
  var selector = region + ' .views-row';
  var length = $(selector).length; 
  // if there is only 1 promo, do nothing
  if(length > 1) {
    
    // set up an array to sort out weighting - unweighted items are counted as 1
    var weighting = new Array();
    $(selector).each(function(){
      var weight;
      var fullClasses = '.' + $(this).attr('class').replace(/ /g, '.');
      var promoWeight = $(this).find('.promo-weight');
      if(promoWeight.length) {
        // use a regex to find the relevant class        
        var weightClass = $.grep(promoWeight[0].classList, function(a){
          return a.substring(0, 6) == 'weight';
        });
        // extract the number from the class
        weight = weightClass[0].substring(7);
        // add this element's class multiple times based on its weight
        for(x = 0; x < weight; x++) {
          weighting.push(fullClasses);
        }
      }
      else {
        weighting.push(fullClasses);
      }
    });
    
    // get a random number
    var ran = Math.floor(Math.random()*weighting.length) + 1;
    
    // get a class from the weighted array
    var shownPromo = weighting[ran];
    
    // take away all the other promos
    $(selector).not(shownPromo).remove();	
  }

  // add region details to promo links
  $(selector + ' a').each(function(){
    var clickAction = $(this).attr('rmlr_tracking');
    breadTrail = breadTrail + region;
    clickAction = clickAction.replace(/LinkNameUndefined/g, breadTrail);
    
    $(this).removeAttr('rmlr_tracking');
    $(this).click(clickAction);    
//    $(this).attr('myat', 'dsadsa');    
  });  


};;
