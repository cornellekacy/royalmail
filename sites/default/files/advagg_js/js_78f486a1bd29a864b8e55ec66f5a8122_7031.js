/**
 * @file
 * RML Responsive account block javascript file.
 * Makes sure that the account block displays current user's details with an
 * asynchronous AJAX call to the server.
 */

(function ($) {
  Drupal.behaviors.RmlAccountBlock = function (context) {
    // Act only when a user is logged in.
    if ($.cookie('loggedIn') === '1') {
      // Retrieve account block's user details.
      $.ajax({
        type: "GET",
        url: "/rml-resp-account-block/data",
        dataType: "json",
        success: function (response) {
          // If a response was received, user is logged in: Adapt block's content.
          if (response.length !== 0) {
            // Set user name.
            $('.rml-account-name-title').html(response.name);
            // Set title elements to the received title.
            $('.rml-account-block-title').html(response.title);
            // Set received body.
            $('.rml-resp-account-block-body').html(response.body);

            // Remove secure text once logged in.
            $('.rml-account-block-secure-title').html('');
            $('.rml-resp-account-block-body').toggleClass("loggedin");
          }
        }
      });
    }
  };
})(jQuery);
;
/**
 * @file
 * This file contains the js functions to support some client-side
 * functionality of login form.
 */

//Functions for help text Popup
var popupWindow;

function LaunchHelpWindow(evt, helpUrl)
{
    try
    {
        evt = (evt) ? evt : ((window.event) ? window.event : "")


        if (evt.type == 'click' || (evt.type == 'keypress' && evt.keyCode== 13))
        {
            if (!popupWindow  || popupWindow.closed)
                popupWindow = window.open(helpUrl, "", "scrollbars,resizable,width=430,height=520,top=0,left=0");
            else
            {
                popupWindow.close();
                popupWindow = window.open(helpUrl, "", "scrollbars,resizable,width=430,height=520,top=0,left=0");
            }

            evt.returnValue = false;
            return false;
        }
    }
    catch( dummy )
    {
        alert("Error launching help window.");
    }
}
//Function for PopUp window
function LaunchHelpPopup(helpId) {
 timer1=setTimeout(function(){getElementWithId(helpId).style.visibility = 'visible';}, 1000);
}

function CloseHelpPopup(helpId) {
	clearTimeout(timer1)
	
	getElementWithId(helpId).style.visibility = 'hidden';
}

function getElementWithId(id){
    var obj = null;
    if(document.getElementById){
        obj = document.getElementById(id);
    }else if(document.all){

        obj = document.all[id];
    }
    return obj;
}

(function($, Drupal) {
    // Clear and then focus on the email field if there is a validation error.
    Drupal.behaviors.rmlLoginValidationErrorHandler = function (context) {
        var form_id = $('input[name="form_id"][value="user_login"]', context);
        var form = $(form_id.closest("form"));
        var name_field = $('input[name="name"]', form);
        if (form_id.length) {
            name_field.focus();
            name_field.val('');
        }
    }
})(jQuery, Drupal);

;
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(B,I,L){if(typeof I!="undefined"){L=L||{};if(I===null){I="";L.expires=-1}var E="";if(L.expires&&(typeof L.expires=="number"||L.expires.toUTCString)){var F;if(typeof L.expires=="number"){F=new Date();F.setTime(F.getTime()+(L.expires*24*60*60*1000))}else{F=L.expires}E="; expires="+F.toUTCString()}var K=L.path?"; path="+(L.path):"";var G=L.domain?"; domain="+(L.domain):"";var A=L.secure?"; secure":"";document.cookie=[B,"=",encodeURIComponent(I),E,K,G,A].join("")}else{var D=null;if(document.cookie&&document.cookie!=""){var J=document.cookie.split(";");for(var H=0;H<J.length;H++){var C=jQuery.trim(J[H]);if(C.substring(0,B.length+1)==(B+"=")){D=decodeURIComponent(C.substring(B.length+1));break}}}return D}};
;
var rmlPersonaName = 'seg_cookie';
var rmlPersonaPromptName = 'seg_prompt';
var rmlPersonaOptions = { path: '/', expires: 7 };

/*
 * Set the cookie for the page.
 */
Drupal.behaviors.rmlPersonaOnReady = function(context) {
  if (Drupal.settings.rml_persona) {
    var persona = Drupal.settings.rml_persona.persona;
    var domain = Drupal.settings.rml_persona.cookie_domain;
    var current_cookie = $.cookie(rmlPersonaName);
    var prompt_cookie = $.cookie(rmlPersonaPromptName);
    rmlPersonaOptions.domain = domain;

    if (!current_cookie) {
      $.cookie(rmlPersonaName, persona, rmlPersonaOptions);
    }
 
    //reset prompt cookie as section has been changed
    if (prompt_cookie && prompt_cookie != persona) {
      $.cookie(rmlPersonaPromptName, null, rmlPersonaOptions);
    }
    else if(prompt_cookie && prompt_cookie == persona) {
      $.cookie(rmlPersonaPromptName, persona, rmlPersonaOptions);
    }
    else if(current_cookie && current_cookie == persona) {
      $.cookie(rmlPersonaPromptName, persona, rmlPersonaOptions);
    }
    return true;
  }
}

$(document).ready(function(){	
 /**
  * Rules for displaying the prompt
  */
  var prompt = $('.prompt');
  var domain = '';
  var current_cookie = $.cookie(rmlPersonaPromptName);

  if (Drupal.settings.rml_persona) {
    domain = Drupal.settings.rml_persona.cookie_domain;
    rmlPersonaOptions.domain = domain;
  }
  
  if (!current_cookie) {
    prompt.children('.prompt-border').children('.close').click(function() {
      $.cookie(rmlPersonaPromptName, 1, rmlPersonaOptions);
    });
  }
  else {
    prompt.parent().children('.border .sophistication_dropdown_inner ul li').click(function() {
      $.cookie(rmlPersonaPromptName, null, rmlPersonaOptions);
    });
    prompt.parent().children('.border .sophistication_dropdown_inner ul li').keypress(function(e) {
      if (e.which == 13) {
        $.cookie(rmlPersonaPromptName, null, rmlPersonaOptions);
      }
    });
  }
});
;
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./chevin/chevin-bold-italic/chevin-bold-italic.ttf": 10,
	"./chevin/chevin-bold/chevin-bold.eot": 11,
	"./chevin/chevin-bold/chevin-bold.woff": 12,
	"./chevin/chevin-demibold-italic/chevin_demibold_italic.ttf": 13,
	"./chevin/chevin-demibold/chevin_demibold.eot": 14,
	"./chevin/chevin-demibold/chevin_demibold.woff": 15,
	"./chevin/chevin-light-italic/chevin-light-italic.ttf": 16,
	"./chevin/chevin-light/chevin-light.eot": 17,
	"./chevin/chevin-light/chevin-light.woff": 18,
	"./chevin/chevin-medium-italic/chevin-medium-italic.eot": 19,
	"./chevin/chevin-medium/chevin-medium.eot": 20,
	"./chevin/chevin-medium/chevin-medium.woff": 21,
	"./din-next-w01/din-next-w01-bold-italic/din-next-w01-bold-italic.eot": 22,
	"./din-next-w01/din-next-w01-bold-italic/din-next-w01-bold-italic.woff": 23,
	"./din-next-w01/din-next-w01-bold/din-next-w01-bold.eot": 24,
	"./din-next-w01/din-next-w01-bold/din-next-w01-bold.ttf": 25,
	"./din-next-w01/din-next-w01-regular-italic/din-next-w01-regular-italic.eot": 26,
	"./din-next-w01/din-next-w01-regular-italic/din-next-w01-regular-italic.ttf": 27,
	"./din-next-w01/din-next-w01-regular/din-next-w01-regular.eot": 28,
	"./din-next-w01/din-next-w01-regular/din-next-w01-regular.ttf": 29,
	"./din-next-w01/din-next-w01-ultra-light-italic/din-next-w01-ultra-light-italic.eot": 30,
	"./din-next-w01/din-next-w01-ultra-light-italic/din-next-w01-ultra-light-italic.ttf": 31,
	"./din-next-w01/din-next-w01-ultra-light/din-next-w01-ultra-light.eot": 32,
	"./din-next-w01/din-next-w01-ultra-light/din-next-w01-ultra-light.ttf": 33,
	"./rmg-icons/RMG_Icons.eot": 34,
	"./rmg-icons/RMG_Icons.ttf": 35
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 0;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./arrow-black-right-4-6.png": 36,
	"./comp/prompt/button_close_sprite.png": 37,
	"./icon/form-error-alert.png": 38,
	"./icon/main_eps.png": 39,
	"./keepmeposted.png": 40,
	"./new-window--777.png": 41,
	"./new-window--c00.png": 42,
	"./new-window.png": 43,
	"./sprite_general_01.png": 44
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $ */

var Cookie = function () {
  _createClass(Cookie, [{
    key: 'init',
    value: function init() {
      $(this).click(function (event) {
        event.preventDefault();
        $('.cookie-policy').slideUp();
      });
    }
  }]);

  function Cookie() {
    _classCallCheck(this, Cookie);

    $.fn.Cookie = this.init;
  }

  return Cookie;
}();

exports.default = Cookie;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global $ */

/* doc

 ---
 title: External Links
 name: extlinks
 category: Javascript
 ---

 Legacy function in old Fixed Width theme to add an external image and add
 target _blank to any external links on the page.
 Adapted to only add a class to identify these auto generated links and the
 target _blank to the link, as the icon for external links is managed by CSS.
*/
var ExtLinks = function () {
  function ExtLinks() {
    _classCallCheck(this, ExtLinks);

    this.linkSelector = $('a[href*="http"]' + ':not([href*="royalmail."])' + ':not([href*="rml"])' + ':not([href^="/"])' + ':not([href^="function"])' + ':not([href^=".."])' + ':not([href=""])' + ':not([href*="javascript"])' + ':not([href^="#"])' + ':not([href*="?"]),' + 'a[target="_blank"],' + 'a[target="blank"]' + '.new_window,' + 'a[onclick^="window.open"]');
    this.init();
  }

  _createClass(ExtLinks, [{
    key: 'init',
    value: function init() {
      this.linkSelector.each(function () {
        var thisLink = $(this);

        // To provide an escape option of adding the target there are different classes we could use:
        // Don't add the icon to the links with the class 'no-icon'.
        // Don't add the icon to the links with the class 'keep-me-posted'.
        // Don't add the icon to the RSS feed link.
        // Don't add the icon to the Footer Social links.
        if (thisLink.hasClass('no-icon') || thisLink.hasClass('keep-me-posted') || thisLink.closest('.feeds').length || thisLink.closest('.footer__social').length) {
          return;
        }

        // Add a class and the target blank attribute.
        thisLink.addClass('extlink-auto').attr('target', '_blank');
      });
    }
  }]);

  return ExtLinks;
}();

exports.default = ExtLinks;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* use strict */
/* global window, $ */

/* doc

  ---
  title: Responsive Menu
  name: responsive-menu
  category: Javascript
  ---

  The ResponsiveMenu class manages the javascript/jquery
  functionality for the header menu. In particular the toggling of the
  Hamburger menu and the Search bar, which it also defines the client
  side Validation for.

  ## Arguments

  - container (string)
  -- A jquery/css selector string for the Search form parent container
  - searchBar (string)
  -- A jquery/css selector string for the Search form itself
  - options (object)
  -- backdrop (boolean) - shows the backdrop if set to true
  -- onlyValidate (boolean) - only validates the search input if set to true


  ## Methods

  - closeOverlay()
  -- Closes the Hamburger menu overlay

  - toggleSearch()
  -- Toggles the search form

  - hamburgerLink()
  -- Toggles the Hamburger menu

  - validateSearch(e <jquery:Event>)
  -- Validates the search form on submit
*/

var deviceWidths = {
  mobile: 768,
  desktop: 1024
};

var selector = {
  overlay: '.hamburger-nav__overlay',
  wide: '.hamburger-nav__wide',
  link: '.hamburger-nav__link'
};

var className = {
  open: 'is-hamburger-nav-open'
};

var ResponsiveMenu = function () {
  function ResponsiveMenu(container, searchBar, options) {
    _classCallCheck(this, ResponsiveMenu);

    this.window = $(window);
    this.container = $(container);
    this.searchBar = this.container.find(searchBar);
    this.searchIcon = this.container.find('.header-search-enabler');
    this.backdrop = $('.backdrop');
    this.options = options || {};
    this.toggled = false;
    this.toggleSearch();

    if (this.options.device === 'mobile') {
      this.hamburgerLink();
    }

    this.searchBar.find('form').bind('submit', this.validateSearch);

    this.$wide = $(selector.wide);
    this.$overlay = $(selector.overlay);
  }

  _createClass(ResponsiveMenu, [{
    key: 'closeOverlay',
    value: function closeOverlay() {
      this.$overlay.removeClass(className.open);
      this.$wide.removeClass(className.open);
      this.window.scrollTop();
    }
  }, {
    key: 'toggleSearch',
    value: function toggleSearch() {
      var _this = this;

      this.searchIcon.click(function (e) {
        e.preventDefault();
        _this.searchIcon.parents('.icon-holder').toggleClass('icon-holder--active');
        _this.searchBar.toggle();

        if (_this.options.backdrop) {
          _this.backdrop.toggle();
        }
      });

      this.window.resize(function () {
        if (_this.window.width() >= deviceWidths.mobile && _this.window.width() < deviceWidths.desktop) {
          _this.searchIcon.parents('.icon-holder').removeClass('icon-holder--active');
          _this.searchBar.hide();
          _this.backdrop.hide();
          _this.toggled = false;
          _this.closeOverlay();
        } else if (_this.window.width() >= deviceWidths.desktop) {
          _this.searchBar.show();
        }
      });
    }
  }, {
    key: 'hamburgerLink',
    value: function hamburgerLink() {
      var _this2 = this;

      $(selector.link).click(function (e) {
        e.preventDefault();

        // Hide the search bar first.
        _this2.searchIcon.parents('.icon-holder').removeClass('icon-holder--active');
        _this2.searchBar.hide();
        _this2.backdrop.hide();

        if (!_this2.toggled) {
          _this2.$overlay.addClass(className.open);
          _this2.$wide.addClass(className.open);

          $('.header__mobile-search').hide();
          _this2.backdrop.show();
        } else {
          _this2.closeOverlay();
          _this2.backdrop.hide();
        }

        _this2.toggled = !_this2.toggled;
      });
    }
  }, {
    key: 'validateSearch',
    value: function validateSearch(e) {
      var searchInput = $(e.currentTarget).find('input[type=text]');

      if (searchInput.val().match(/^(\s*(?:Search)?\s*|\s*(?:Enter\s*(?:a\s*(?:search\s*(?:term?)?)?)?)\s*)$/i)) {
        // Looks like "Search" literal, (null) or whitespace(s) was entered; do
        // nothing other than encourage our enquirer to enter a proper search expression.
        searchInput.val('Enter a search term');
        return false;
      } else if (searchInput.val().match(/^\s*(?:(?:career|job)s?|employment|work)\s*$/i)) {
        // Potential employee; redirect to Careers page...
        this.window.location = 'http://www.royalmailgroup.com/our-people';
        return false;
      }

      return true;
    }
  }]);

  return ResponsiveMenu;
}();

exports.default = ResponsiveMenu;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  updating = false;
  updateId = null;
  open = false;

  init();
};

/* global window, document, $ */

var updating, updateId, open, $document, $body, $button, $overlay;

var openClass = 'open',
    overlaySelector = '.login-overlay-box',
    buttonSelector = '.overlay-menu__overlay-toggle.rml-account-block-title',
    hysterisis = 200,
    ESCAPE = 27;

function init() {
  // On ready:
  $(function () {
    $document = $(document);
    $body = $('body', $document);
    $button = $(buttonSelector);
    $overlay = $(overlaySelector);

    $button.click(function () {
      if (!updating) {
        update();

        if (open) {
          removeClickOutside();
          hide();
        } else {
          show();

          setTimeout(function () {
            addClickOutside();
          }, 1);
        }
      }
    });

    // Prevent clicking the log in box
    // from closing the overlay.
    $overlay.click(function (ev) {
      ev.stopPropagation();
    });
  });
}

function clickOutside() {
  hide();
  removeClickOutside();
}

function touchStartOutside(ev) {
  var target, $touchedOverlay;

  if (!updating) {
    update();

    target = ev.target || ev.srcElement;

    if (target) {
      $touchedOverlay = $(target).closest(overlaySelector);

      if ($touchedOverlay.length < 1) {
        // Then the touch was not on something inside the overlay, and
        // thus could have been on a link or button underneath the overlay,
        // which should not be triggered when all the user wants to do is close
        // the overlay.  (Unfortunately this also prevents the triggering of
        // links and buttons that might not be underneath the overlay).
        //
        // N.B. This handler is only expected to be called when the overlay is
        // open, and the megamenu thus already closed.

        ev.stopPropagation();
        ev.preventDefault();
        hide();
        removeClickOutside();
      }
    }
  }
}

function update() {
  updating = true;

  if (updateId) {
    clearTimeout(updateId);
  }

  updateId = setTimeout(function () {
    updating = false;
  }, hysterisis);
}

function hide() {
  open = false;
  $overlay.hide();
  $button.removeClass(openClass);
}

function show() {
  open = true;
  $overlay.show();
  $button.addClass(openClass);
}

function addClickOutside() {
  // Hide Overlay when clicking elsewhere.
  $document.bind('click.loginOverlay', clickOutside).bind('keyup.loginOverlay', keyup);

  if ('ontouchstart' in window) {
    $body.bind('touchstart.loginOverlay', touchStartOutside);
  }
}

function removeClickOutside() {
  $document.unbind('click.loginOverlay').unbind('keyup.loginOverlay');

  if ('ontouchstart' in window) {
    $body.unbind('touchstart.loginOverlay');
  }
}

function keyup(ev) {
  // Close when Escape is pressed.
  if (ev.keyCode === ESCAPE) {
    clickOutside();
  }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  $document = $(document);

  init();
  addOutsideClickListener();
};

/* global window, document, $ */

var $document, $overlayDialogs, $widgetOverlay;

var overlayDialogClass = '.ui-dialog',
    widgetOverlayClass = '.ui-widget-overlay',
    widgetClassName = 'ui-widget-overlay',
    responsiveOverlayClass = '.ui-dialog--responsive';

function init() {
  bindDialogEvents();

  // On ready:
  $(function () {
    var $loginRegisterDialogFormDialog;

    $overlayDialogs = $(overlayDialogClass);
    $widgetOverlay = $(widgetOverlayClass);

    // Override overlay code in login_register_dialog.js.
    if ($overlayDialogs && $overlayDialogs.length > 0) {
      $loginRegisterDialogFormDialog = $('#login-register-dialog-form').parents('.ui-dialog');

      if ($loginRegisterDialogFormDialog.length > 0 && $overlayDialogs.children('.ui-dialog__inner').length < 1) {

        $loginRegisterDialogFormDialog.addClass(responsiveOverlayClass).wrapInner('<div class="ui-dialog__inner ui-widget-content"></div>').removeClass('ui-widget-content');
      }
    }

    window.addEventListener('resize', resizeLoginOverlay);
  });
}

/**
 * Description: Adds an event listener to close the overlay.
 */
function addOutsideClickListener() {

  $('body').click(function (ev) {

    var clickedItem = ev.target || ev.srcElement;

    // Ensure the ui-widget-overlay is clicked.
    if (clickedItem.className === widgetClassName) {

      closeOverlay();
    }
  });
}

function bindDialogEvents() {

  // Bind dialog overlay open.
  $document.bind('dialogopen', function () {
    // Bind click outside.
    $widgetOverlay.bind('click.closeOverlay', closeOverlay);
  });

  $document.bind('dialogclose', function () {
    // Unbind click outside.
    $widgetOverlay.unbind('click.closeOverlay');
  });
}

/**
 * Description: Find the open dialogs and simulate a click in the Close link.
 */
function closeOverlay() {
  var $openDialog = void 0;

  // Check if there is a dialog and iterate each of them to find the ones open.
  if ($overlayDialogs) {
    for (var i = 0; i < $overlayDialogs.length; i++) {
      if ($overlayDialogs[i].style.display !== 'none') {
        $openDialog = $($overlayDialogs[i]);

        // Close dialog simulating click on close link.
        $openDialog.find('a.ui-dialog-titlebar-close').click();
      }
    }
  }
}

/**
 * Description: Change width of the overlay when resizing the browser.
 */
function resizeLoginOverlay() {

  // Target all UI Dialogs except any that contain #login-register-dialog-form.
  $overlayDialogs.each(function () {
    var $overlayDialog = $(this),
        hasNotDialogForm = $overlayDialog.find('#login-register-dialog-form').length < 1,
        isVisible = this.style.display !== 'none';

    // Test that the dialog is not for the Login Register form, and
    // that the dialog could be visible, and thus worth adjusting.
    if (hasNotDialogForm && isVisible) {

      // Calculates the spacing position of the overlay from the left of
      // the screen. The dialog width is the maximum width available.
      // Divide the excess of pixels by 2 to display the dialog centered.
      var overlayLeft = ($document.width() - $overlayDialog.width()) / 2;

      if (overlayLeft >= 0) {
        this.style.left = overlayLeft + 'px';
      } else {
        this.style.left = '0px';
      }
    }
  });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  $(function () {
    var $document = $(document),
        $main = $('.l-main'),
        $shareOverlay = $('.share-overlay'),
        $shareIcon = $('.eps-s a'),
        $emailLink = $('.eps-e #email'),
        height = $main.offset() + 100,
        width = ($main.width() - $shareOverlay.outerWidth()) / 2;

    $shareOverlay.css({ top: height, left: width });

    $shareOverlay.click(function (e) {
      e.stopPropagation();
    });

    $shareOverlay.find('.close').click(function (ev) {
      ev.preventDefault();
      $shareOverlay.slideUp('fast');
    });

    $shareIcon.click(function (e) {
      e.preventDefault();
      e.stopPropagation();

      if ($('.email-overlay').not(':hidden')) {
        $('.email-overlay').hide();

        $shareOverlay.slideToggle('fast', function () {
          $shareOverlay.find('.close').focus();
        });
      }
    });

    $document.keyup(function (e) {
      if (e.keyCode === 27) {
        $shareOverlay.slideUp('fast');
      }
    }).click(function () {
      $shareOverlay.slideUp();
    });

    if (document.location.protocol === 'https:') {
      // Disable modal due cross source (https -> http).
      $emailLink.unbind('click').attr('href', $emailLink.attr('href').replace('/popup', ''));
    }
  });
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _hamburgerNav = __webpack_require__(4);

var _hamburgerNav2 = _interopRequireDefault(_hamburgerNav);

var _cookiePolicy = __webpack_require__(2);

var _cookiePolicy2 = _interopRequireDefault(_cookiePolicy);

var _share = __webpack_require__(7);

var _share2 = _interopRequireDefault(_share);

var _extlinks = __webpack_require__(3);

var _extlinks2 = _interopRequireDefault(_extlinks);

var _loginOverlay = __webpack_require__(5);

var _loginOverlay2 = _interopRequireDefault(_loginOverlay);

var _overlays = __webpack_require__(6);

var _overlays2 = _interopRequireDefault(_overlays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FONTS = __webpack_require__(0); /* global $ */

FONTS.keys().forEach(function (key) {
  FONTS(key);
});

var IMGS = __webpack_require__(1);
IMGS.keys().forEach(function (key) {
  IMGS(key);
});

/* eslint-disable no-new */
new _hamburgerNav2.default('.l-header__second-row', '.header-search-form');
new _cookiePolicy2.default();
(0, _share2.default)();
new _extlinks2.default();
(0, _loginOverlay2.default)();
(0, _overlays2.default)();

$('.cookie-policy-content .close').Cookie();

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-bold-italic.ttf";

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-bold.eot";

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-bold.woff";

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin_demibold_italic.ttf";

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin_demibold.eot";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin_demibold.woff";

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-light-italic.ttf";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-light.eot";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-light.woff";

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-medium-italic.eot";

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-medium.eot";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = ".././fonts/chevin-medium.woff";

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-bold-italic.eot";

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-bold-italic.woff";

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-bold.eot";

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-bold.ttf";

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-regular-italic.eot";

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-regular-italic.ttf";

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-regular.eot";

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-regular.ttf";

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-ultra-light-italic.eot";

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-ultra-light-italic.ttf";

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-ultra-light.eot";

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = ".././fonts/din-next-w01-ultra-light.ttf";

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = ".././fonts/RMG_Icons.eot";

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = ".././fonts/RMG_Icons.ttf";

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = ".././img/arrow-black-right-4-6.png";

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = ".././img/button_close_sprite.png";

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = ".././img/form-error-alert.png";

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = ".././img/main_eps.png";

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = ".././img/keepmeposted.png";

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = ".././img/new-window--777.png";

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = ".././img/new-window--c00.png";

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = ".././img/new-window.png";

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = ".././img/sprite_general_01.png";

/***/ })
/******/ ]);;
(function(window, document, $, undefined) {
  'use strict';

  // This is not the standard Megamenu Module JavaScript.  It has been adapted
  // for compatibility with the views output generated for the Royalmail2012
  // theme and to enable the visual designs prescribed for this newer Royalmail
  // Responsive theme.
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
/* doc

  ---
  title: Narrow Navigation
  name: narrow-nav
  category: JavaScript
  ---

  This file deals with the narrow (mobile) navigation bar, which contains
  several parts:
  * Hamburger button, and the opening and closing of the side menu drawer.
  * Account icon, which may be a button or link, depending on whether the user
    is logged in or out.
  * Search Sub Bar button. Which shows or hides the Sub Bar containing a
    search form.

  Account (Log-in / Log-out) icon.
  * Logged-in state:
    It should be a button that opens a dropdown that links to a log-out page.
    i.e.: https://m.royalmail.com/h5/user?id=login
    That's probably wrong, but at the time of writing this is
    yet to be finalised.
  * Logged-out state:
    It should be a link to a log-in page.
    i.e.: https://m.royalmail.com/h5/user?id=login
*/
(function (window, $) {
  'use strict';

  // On readyState.
  $(function () {
    var
      loggedIn,
      subBarIsOpen,
      subBarAccountIsOpen,
      subBarSearchIsOpen,
      hamburgerMenuIsOpen,
      deviceWidths,
      selector,
      className,
      $window,
      $searchNavBtn,
      $accountNavBtn,
      $hamburgerBtn,
      $accountLink,
      $subBar,
      $subBarSearch,
      $subBarAccount,
      $hamburgerNavWide,
      $hamburgerNavDrawer,
      $muteContent;

    // Initialise state.
    initState();

    // Define device viewport widths.
    deviceWidths = {
      tablet: 768
    };

    // Define jQuery selectors.
    selector = {
      accountLink: '.global-nav-first .global-nav__account-link:first',
      subBar: '.mobile-nav-sub-bar:first',
      subBarSearch: '.mobile-nav-sub-bar__search:first',
      subBarAccount: '.mobile-nav-sub-bar__account:first',
      searchBtn: '.mobile-nav__btn--search:first',
      accountBtn: '.mobile-nav__btn--account:first',
      hamburgerBtn: '.mobile-nav__btn--hamburger:first',
      navBtnLabel: '.mobile-nav__btn-text',
      hamburgerNavDrawer: '.hamburger-nav__overlay',
      hamburgerNavWide: '.hamburger-nav__wide',
      muteContent: '.l-main'
    };

    // Define class names.
    className = {
      open: 'is-open',
      active: 'is-active',
      hamburgerOpen: 'is-hamburger-nav-open',
      muted: 'is-muted'
    };

    // Find DOM elements.
    $window = $(window);
    $accountLink = $(selector.accountLink);
    $subBar = $(selector.subBar);
    $subBarSearch = $(selector.subBarSearch, $subBar);
    $subBarAccount = $(selector.subBarAccount, $subBar);

    $searchNavBtn = $(selector.searchBtn);
    $accountNavBtn = $(selector.accountBtn);
    $hamburgerBtn = $(selector.hamburgerBtn);

    $hamburgerNavWide = $(selector.hamburgerNavWide);
    $hamburgerNavDrawer = $(selector.hamburgerNavDrawer);
    $muteContent = $(selector.muteContent);

    if (loggedIn) {
      // Convert the account link to a button.
      initAccountNavButton();

      // Change `Log in / Register` link to a `Log out` link.
      $accountLink
        .attr('href', '/logout')
        .text('Log out');
    }

    // Add handler to Search Nav Button & Hamburger Button.
    $searchNavBtn.click(searchButtonClick);
    $hamburgerBtn.click(hamburgerClick);

    // Add handler for when logout is clicked.
    $subBarAccount.click(startLogOut);

    // Add other event listeners.
    $window.resize(onResize);
    $subBarSearch
      .find('form')
      .bind('submit', validateSearch);

    // Declare functions:

    // Initialise state.
    function initState () {
      loggedIn = !!($.cookie && $.cookie('loggedIn'));
      subBarIsOpen = false;
      subBarAccountIsOpen = false;
      subBarSearchIsOpen = false;
      hamburgerMenuIsOpen = false;
    }

    // Replace account link with an account button.
    function initAccountNavButton () {
      var
        accountClasses,
        accountLabel,
        accountHTML,
        accountReplacement;

      accountLabel = $accountNavBtn.attr('data-account-button-label');
      accountClasses = $accountNavBtn.attr('class');
      accountReplacement = '<button class="' + accountClasses + '"></button>';

      if (accountLabel) {
        $(selector.navBtnLabel, $accountNavBtn).text(accountLabel);
      }

      accountHTML = $accountNavBtn.html();

      $accountNavBtn.replaceWith(accountReplacement);
      $accountNavBtn = $(selector.accountBtn);
      $accountNavBtn.html(accountHTML).click(accountButtonClick);
    }

    function accountButtonClick () {
      // Show or hide and Sub Nav Account Bar as required.
      subBarAccountToggle();
    }

    function searchButtonClick () {
      // Show or hide Sub Nav Search Bar as required.
      subBarSearchToggle();
    }

    function hamburgerClick () {
      hamburgerToggle();
    }

    function startLogOut () {
      // Forward the user to the logout URL.
      window.location.href = Drupal.settings.mobile_nav_accout_logout_link;
    }

    // Show or hide and Sub Nav Account Bar as required.
    function subBarAccountToggle () {

      // Toggle the Sub Bar visibility.
      if (subBarIsOpen && subBarAccountIsOpen) {
        // Hide the Sub Bar.
        $subBar.removeClass(className.open);
        $subBarAccount.removeClass(className.open);

        // Set button signalisation.
        $accountNavBtn.removeClass(className.active);

        subBarIsOpen = false;
        subBarAccountIsOpen = false;
      }
      else {
        // Show the Sub Bar.
        $subBarAccount.addClass(className.open);
        $subBar.addClass(className.open);

        // Hide other stuff in the Sub Bar.
        $subBarSearch.removeClass(className.open);

        // Set button signalisation.
        $accountNavBtn.addClass(className.active);
        $searchNavBtn.removeClass(className.active);

        subBarIsOpen = true;
        subBarAccountIsOpen = true;
        subBarSearchIsOpen = false;
      }
    }

    function subBarSearchToggle () {
      // Show or hide and Sub Nav Search Bar as required.

      // Toggle the Sub Bar visibility.
      if (subBarIsOpen && subBarSearchIsOpen) {
        // Hide the Sub Bar.
        $subBar.removeClass(className.open);
        $subBarSearch.removeClass(className.open);

        // Set button signalisation.
        $searchNavBtn.removeClass(className.active);

        subBarIsOpen = false;
        subBarSearchIsOpen = false;
      }
      else {
        // Show the Sub Bar.
        $subBarSearch.addClass(className.open);
        $subBar.addClass(className.open);

        // Hide other stuff in the Sub Bar.
        $subBarAccount.removeClass(className.open);

        // Set button signalisation.
        $searchNavBtn.addClass(className.active);
        $accountNavBtn.removeClass(className.active);

        subBarIsOpen = true;
        subBarSearchIsOpen = true;
        subBarAccountIsOpen = false;
      }
    }

    // Hide Sub Bar.
    function hideSubBar () {
      $subBar.removeClass(className.open);
      $subBarAccount.removeClass(className.open);
      $subBarSearch.removeClass(className.open);
      $searchNavBtn.removeClass(className.active);
      $accountNavBtn.removeClass(className.active);
      subBarIsOpen = false;
      subBarAccountIsOpen = false;
      subBarSearchIsOpen = false;
    }

    function hamburgerToggle () {
      // Hide Sub Bar.
      hideSubBar();

      if (hamburgerMenuIsOpen) {
        // Close the hamburger menu side drawer.
        hideDrawer();
        showContent();
      }
      else {
        // Open the hamburger menu side drawer.
        openDrawer();
        hideContent();
      }

      hamburgerMenuIsOpen = !hamburgerMenuIsOpen;
    }

    function hideDrawer () {
      $hamburgerNavDrawer.removeClass(className.hamburgerOpen);
      $hamburgerNavWide.removeClass(className.hamburgerOpen);
      $window.scrollTop();
    }

    function openDrawer () {
      $hamburgerNavDrawer.addClass(className.hamburgerOpen);
      $hamburgerNavWide.addClass(className.hamburgerOpen);
    }

    function hideContent () {
      $muteContent.addClass(className.muted);
    }

    function showContent () {
      $muteContent.removeClass(className.muted);
    }

    function onResize () {
      if ($window.width() >= deviceWidths.tablet) {
        hideSubBar();
        hideDrawer();
        showContent();
      }
    }

    function validateSearch (ev) {
      var
        searchInput,
        searchRegex,
        careerRegex;

      searchInput = $(ev.currentTarget).find('input[type=text]');

      // Test for 'Search' literal, null, or whitespace(s).
      searchRegex = /^(\s*(?:Search)?\s*|\s*(?:Enter\s*(?:a\s*(?:search\s*(?:term?)?)?)?)\s*)$/i;
      careerRegex = /^\s*(?:(?:career|job)s?|employment|work)\s*$/i;

      if (searchInput.val().match(searchRegex)) {
        // Looks like "Search" literal, (null) or whitespace(s) was entered; do
        // nothing other than encourage our enquirer to enter a proper search expression.
        searchInput.val('Enter a search term');
        return false;
      }
      else if (searchInput.val().match(careerRegex)) {
        // Potential employee; redirect to Careers page.
        window.location.replace('http://www.royalmailgroup.com/our-people');
        return false;
      }

      return true;
    }
  });
}(window, jQuery));
;
