/**
 * @file
 * Opens a link's content in a jQuery UI dialog.
 */

(function ($, Drupal) {
  /**
   * Opens linked content in a jQuery UI dialog.
   */
  Drupal.contentOverlay = Drupal.contentOverlay || {};

  Drupal.behaviors.contentOverlay = function (context) {
    // Grab the selector and dialog settings and merge in with the defaults.
    var selector = Drupal.settings.contentOverlay.selector;
    var defaults = {
      autoOpen: false,
      draggable: false,
      modal: true,
      width: 700,
      closeText : Drupal.t('Close'),
      open: function () {
        Drupal.attachBehaviors(this);
        $(':tabbable:first', this).focus();
      }
    };
    var dialogSettings = Drupal.settings.contentOverlay.dialogSettings;
    var settings = $.extend(true, {}, defaults, dialogSettings);

    // Object to use as a local cache for previously retrieved content.
    var cache = {
      'set' : function (key, data) {
        this.data[key] = data;
      },
      'get' : function (key) {
        if (this.data[key] !== undefined) {
          return this.data[key];
        }
        return false;
      },
      'data' : {}
    };

    $(selector, context).click(function (event) {
        var link = $(this);
        var dialog = $('#content-dialog');

        if (!dialog.length) {
          dialog = $('<div id="content-dialog"></div>');
          dialog.dialog(settings).removeAttr('role');
        }

        // Store the triggering element to allow us to return focus to it.
        dialog.data('triggerElement', this);

        // Grab parameters from the link.
        var nid = link.attr('data-nid'),
            href = link.attr('href'),
            params, param;

        // Determine which of the node id or href to pass in as the parameter.
        // A node id is preferred.
        if (nid) {
          params = {nids : nid};
          param = nid;
        }
        else {
          params = {href : href};
          param = href;
        }

        // Check for "cached" content.
        if (cache.get(param)) {
          var content = cache.get(param);
          if (content.hasOwnProperty('title') && content.hasOwnProperty('content')) {
            // Update application step with the page title.
            // The rest of the utag data is inherited from the parent page.
            Drupal.contentOverlay.trackContentOverlay(content.title, content.type);
            dialog.attr('title', content.title)
              .html(content.content)
              .dialog('option', 'title', '<h2>' + dialog.attr('title') + '</h2>')
              .dialog('open');
          }
          else {
            return true;
          }

        }
        else {
          // Grab the content.
          link.addClass('ctools-ajaxing');
          $.ajax({
            url : '/rest/content/node/retrieve.json',
            dataType: 'json',
            data : params,
            success : function (data) {
              if (data[param].hasOwnProperty('title') && data[param].hasOwnProperty('content')) {
                Drupal.contentOverlay.trackContentOverlay(data[param].title, data[param].type);
                cache.set(param, data[param]);
                dialog.attr('title', data[param].title)
                  .html(data[param].content)
                  .dialog('option', 'title', '<h2>' + dialog.attr('title') + '</h2>')
                  .dialog('open');
              }
              else {
                // The content isn't a node, it's some other page.
                cache.set(param, data);
                window.open(href, '_blank');
              }

              link.removeClass('ctools-ajaxing');
            },
            error : function (xhr) {
              // If the node is not of the allowed type, we may get a 404.
              // In this case, try and open the page in a new window.
              if (xhr.status === 404) {
                cache.set(param, xhr.statusText);
                window.open(href, '_blank');
              }
              else {
                // Handle the error with CTools if its available.
                try {
                  Drupal.CTools.AJAX.handleErrors(xhr);
                }
                catch (e) {
                  console.log(Drupal.t('error: @status, message: @msg', {'@status' : xhr.status, '@msg' : xhr.statusText}));
                }
              }
              link.removeClass('ctools-ajaxing');
            }
          });
        }

        event.preventDefault();
      });
  };

  /**
   * Function to trigger tealium overlay tracking.
   */
  Drupal.contentOverlay.trackContentOverlay = function (title, type) {
    // Adds tealium tags.
    if (window.trackOverlay !== undefined) {
      var new_tag = [];
      var page_overlay_type = 'Legal';
      if (type == 'faq_item') {
        page_overlay_type = 'Help Article';
      }
      new_tag['pageOverlayType'] = page_overlay_type;
      new_tag['pageOverlayTitle'] = $('<textarea />').html(title).text();
      tealium_tag_overlay(new_tag);
    }
  };

})(jQuery, Drupal);
;
(function($, Drupal) {
  /**
   * Adds the login/register form to a jQuery UI dialog.
   */
  Drupal.behaviors.loginRegisterDialog = function (context) {
    var form = $('#login-register-dialog-form');

    form.dialog({
      autoOpen: false,
      modal: true,
      draggable: false,
      title: '<h2>' + form.attr('title') + '</h2>',
      width: 'auto',
      // Remove error messages on closing the dialog.
      close: function () {
        $('span.message', this).remove();
        $('.form-item-error, input.error', this).removeClass('form-item-error error');
      },
      open: function () {
        // In IE8, the form doesn't submit on pressing enter, workaround here:
        if ($.browser.msie && $.browser.version == 8) {
          $('input[type="text"], input[type="password"]', this).keyup(function (event) {
            if (event.which == '13') {
              event.preventDefault();
              $(this).closest('form').find('input[type="submit"]:first').click();
            }
          });
        }
      }
    });

    var selector = Drupal.settings.loginRegisterDialogSelector;
    $(selector).live('click', function (event) {
      form
        .data('triggerElement', this)
        .dialog('open');
      event.preventDefault();
    });

    // Check for form errors - in this case we need to show the dialog immediately.
    var hasErrors = form.find('.form-item-error').length;
    if (hasErrors) {
      form.dialog('open');
      // Workaround to fix the fact that we have a duplicate dialog as we've
      // replaced the old dialog as a result of the AJAX call.
      $('.ui-dialog').each(function() {
        if (!$(this).find('#login-register-dialog-form').length) {
         $(this).find('.ui-dialog-titlebar-close').click();
        }
      });
    }
  };
})(jQuery, Drupal);

(function($, Drupal) {
    // Clear the email field if there is a validation error.
    Drupal.behaviors.loginRegisterDialogValidationErrorHandler = function (context) {
        var form_id_tnt = $('input[name="form_id"][value="login_register_dialog_form"]', context);
        var form_tnt = $(form_id_tnt.closest("form"));
        var name_field_tnt = $('input[name="name"]', form_tnt);
        if (form_id_tnt.length) {
            name_field_tnt.val('');
        }
    }
})(jQuery, Drupal);
;
/**
 * Knowledge Base functions to interact with the Oracle RightNow JavaScript library.
 */
(function ($) {

  window.s = window.s || {};
  var rightNowTimer;
  var unrestrictedSWClassName = 'kbsw_unrestricted';
  var restrictedSWClassName = 'kbsw_restricted';
  var utag_data = window.utag_data || {};

  Drupal.RightNow = Drupal.RightNow || {};

  Drupal.behaviors.knowledgeBaseSyndicatedWidgetInstance = function (context) {

    if (Drupal.RightNow.checkLoaded() === false) {
      // Load Client.
      Drupal.RightNow.loadClient();
    }

    // Modal dialog for Unrestricted Syndicated Widget.
    Drupal.RightNow.modalDialog();
  };

  /**
   * Load the RightNow client.
   */
  Drupal.RightNow.loadClient = function () {
    try {
      RightNow.Client.Controller.addComponent(Drupal.settings.kbsw.conf, Drupal.settings.kbsw.apiUrl);
      rightNowTimer = setInterval(Drupal.RightNow.checkLoaded, 50);
    }
    catch (e) {
      if (window.RightNow == undefined) {
        var widget_type = Drupal.settings.kbsw.conf.widget_type;
        var css_properties = {
          'visibility': 'hidden',
          'min-height': '106px'
        };
        if (widget_type == 'kbsw_unrestricted') {
          $('.kb-widget-main').closest('.block.bmfx').css(css_properties);
        }
        else if (widget_type == 'kbsw_restricted') {
          $('.kb-widget-main').closest('.kb-restricted-widget').css(css_properties);
        }
      }
    }
  };

  /**
   * Check to see when the RightNow javascript is loaded and ready to use.
   */
  Drupal.RightNow.checkLoaded = function () {
    var $widget = $('#' + Drupal.settings.kbsw.conf.div_id);
    if ($widget.length && !$widget.is(':empty')) {
      clearTimeout(rightNowTimer);
      // Dispatch events.
      if (Drupal.settings.kbsw.conf.widget_type === 'kbsw_unrestricted') {
        Drupal.RightNow.unrestrictedSWAddRedirectToHelpPortal();
        Drupal.RightNow.unrestrictedSWAddTopicTitle();
        Drupal.RightNow.unrestrictedSWAddTopicDescription();
      }
      // Add Tealium tags when a user clicks on the article links.
      Drupal.RightNow.addTealiumTagOnClickArticle();

      // Add focus classes to clicked links.
      Drupal.RightNow.linkFocus();
    }
    else {
      // Widget is not loaded.
      return false;
    }
  };

  /**
   * Add a focus class to clicked links.
   */
   Drupal.RightNow.linkFocus = function () {
    var $articleList = $('.rn_List');

    if ($articleList.length) {
      $articleList.find('a').bind('click', function () {
        $(this).addClass('clicked-link');
      });
    }
  };

  /**
   * Modal dialog.
   *
   * This is specific for Restricted Syndicated Widget.
   */
  Drupal.RightNow.modalDialog = function () {
    $('body').addClass('page-with-restricted-widget');
    var modalShown = false;
    var dialog = $('<div></div>')
      .appendTo('body')
      // Set dialog options.
      .dialog({
        autoOpen: false,
        resizable: false,
        draggable: false,
        modal: true,
        width: 'auto',
        close: function () {
          modalShown = false;
          $('div.rn_AnswerOverlay').remove();

          // Return focus to the clicked article link.
          $('.clicked-link').focus().removeClass('clicked-link');
        }
      });

    // Check if the RightNow client is trying to open an overlay.
    $(document).bind('DOMNodeInserted propertychange', function () {
      if ($('div.rn_AnswerOverlay').length && modalShown == false) {
        modalShown = true;
        dialog.html($('div.rn_AnswerOverlay').html());
        var title = "<h2>" + $('div.rn_AnswerSummary').html(); + "</h2>";
        dialog.dialog('option', 'title', title);
        dialog.dialog('open');

        // Remove Answer Attachments section from a restricted SW.
        Drupal.RightNow.restrictedSWRemoveAnswerAttachments();

        // Add new window icon to the external links in the overlay.
        if (typeof Drupal.royalmail2012 !== 'undefined') {
          if (typeof Drupal.royalmail2012.extlinks == 'function') {
            Drupal.royalmail2012.extlinks(dialog);
          }
        }

        // Set focus to the dialog title, then the close button after a timeout
        // to prevent unwanted focus behaviours. This is mainly to prevent an
        // issue with Rightnow JS adding focus to contentInner which causes the
        // page to scroll in Firefox.
        setTimeout(function () {
          var $titleBar = $('.ui-dialog-titlebar');

          // Add focus to the titlebar to ensure the dialog window is in full
          // view.
          $titleBar.attr('tabindex', '0').focus();

          // Move focus onto the close button.
          $('.ui-dialog-titlebar-close').focus();

          // Remove the titlebar element tabindex.
          $titleBar.removeAttr('tabindex');
        }, 100)
      }
    });
  };

  /**
   * Define a method to add the topic title to the Unrestricted Syndicated Widget.
   */
  Drupal.RightNow.unrestrictedSWAddTopicTitle = function () {
    if ($('.' + unrestrictedSWClassName).length && $('.' + unrestrictedSWClassName).find('.rn_Content').length) {
      var $topics_title = $(document.createElement('h3')).addClass('spacer').text(Drupal.t('Top topics'));
      $('.' + unrestrictedSWClassName).find('.rn_Content').prepend($topics_title);
    }
  };

  /**
   * Add a description before widget body.
   */
  Drupal.RightNow.unrestrictedSWAddTopicDescription = function() {
    if (Drupal.settings.kbsw.conf.widget_description.length) {
      var $widget = $('#' + Drupal.settings.kbsw.conf.div_id);
      var $widget_description = $('<p class="kb-widget-description"></p>')
          .append(Drupal.settings.kbsw.conf.widget_description);
      $widget.before($widget_description);
    }
  };

  /**
   * Add the redirect to the search form of an Unrestricted Syndicated Widget.
   */
  Drupal.RightNow.unrestrictedSWAddRedirectToHelpPortal = function () {
    // Remove default behavior of RightNow when a search is executed.
    delete RightNow.Client.Event.evt_searchResponse;

    // Add event on button click.
    if ($('.' + unrestrictedSWClassName).length && $('.' + unrestrictedSWClassName).find('.rn_ButtonInput').length) {
      $('.' + unrestrictedSWClassName).find('.rn_ButtonInput').bind('click', function (event) {
        event.preventDefault();
        // Set Tealium tags on the search.
        Drupal.RightNow.addTealiumTagOnSearch();
        Drupal.RightNow.unrestrictedSWDoRedirectToHelpPortal();
      });
    }

    // Add event on Enter key press in the textfield.
    if ($('.' + unrestrictedSWClassName).length && $('.' + unrestrictedSWClassName).find('.rn_Query').length) {
      $('.' + unrestrictedSWClassName).find('.rn_Query').keyup(function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          // Set Tealium tags on the search.
          Drupal.RightNow.addTealiumTagOnSearch();
          Drupal.RightNow.unrestrictedSWDoRedirectToHelpPortal();
        }
      });
    }
  };

  /**
   * Redirect the user from an Unrestricted Syndicated Widget to the Personal or Corporate Help portal.
   */
  Drupal.RightNow.unrestrictedSWDoRedirectToHelpPortal = function () {
    if ($('.' + unrestrictedSWClassName).find('.rn_Query').length) {
      var $keywords = $('.' + unrestrictedSWClassName).find('.rn_Query').val();
      window.location.href = Drupal.settings.kbsw.conf.search_url + $keywords;
    }
  };

  /**
   * Add Tealium tags when a user clicks on the article links.
   */
  Drupal.RightNow.addTealiumTagOnClickArticle = function () {
    if (typeof(window.utag_data) !== "undefined" && $('.rn_List').find('a').length) {
      var $widget = $('#' + Drupal.settings.kbsw.conf.div_id);
      if ($widget.hasClass(restrictedSWClassName)) {
        $('.rn_List').find('a').bind('click', function () {
          Drupal.RightNow.restrictedSWSetTealiumTag($(this));
        });
      }
    }
  };

  /**
   * Add Tealium tags when the search form is submitted.
   *
   * Specific for Unrestricted Syndicated Widget.
   */
  Drupal.RightNow.addTealiumTagOnSearch = function () {
    if (typeof(window.utag_data) !== "undefined" && $('.rn_List').find('a').length) {
      Drupal.RightNow.unrestrictedSWSetTealiumTag();
    }
  };

  /**
   * Set Tealium tags for Unrestricted Syndicated Widget.
   */
  Drupal.RightNow.unrestrictedSWSetTealiumTag = function () {
    var env = 'PER';
    var env_full = 'Personal';

    if ($('#' + Drupal.settings.kbsw.conf.div_id).hasClass('corporate')) {
      env = 'COR';
      env_full = 'Corporate';
    }

    // Tealium tags for Unrestricted Widget.
    utag_data.pageName = Drupal.t('RM !environment >Help >Quick Search', {'!environment': env});
    utag_data.pageMenuTree = Drupal.t('!env_full|Help', {'!env_full': env_full});
    utag_data.pageBreadCrumb = Drupal.t('Home|Help');
    utag_data.pageLanguage = Drupal.t('en-gb');
    utag_data.pageApplicationName = Drupal.t('Knowledge Base');
    utag_data.pageApplicationStep = Drupal.t('Quick Search');
    utag_data.pageTemplate = Drupal.t('Help Widget (Unrestricted)');

    // Update tealium tags.
    utag.view(utag_data);
  };

  /**
   * Set Tealium tags for Restricted Syndicated Widget.
   *
   * @param {object} article_link
   *   The current article link object selected.
   */
  Drupal.RightNow.restrictedSWSetTealiumTag = function (article_link) {

    var $env = $('#' + Drupal.settings.kbsw.conf.div_id).hasClass('personal') ? 'PER' : 'COR';
    var $article_title = article_link.text();

    // Extract the Answer Id from the url.
    var $href_array = article_link.attr('data-link').split('/');
    var answer_id = $href_array[$href_array.length - 1];

    // Extract the categories and the products.
    var categories = Drupal.settings.kbsw.conf.c.split(',');
    var products = Drupal.settings.kbsw.conf.p.split(',');

    // Tealium tags for Restricted Widget.
    utag_data.pageName = Drupal.t('RM !environment >Help Overlay >!answer_id : !article_title', {
      '!environment': $env,
      '!answer_id': answer_id,
      '!article_title': $article_title.replace(/,/g, ' ')
    });

    // The tag 'pageApplicationName' is retained from the parent and
    // it is set to 'Knowledge Base' if undefined or empty.
    if (!utag_data.pageApplicationName || utag_data.pageApplicationName.length == 0) {
      utag_data.pageApplicationName = Drupal.t('Knowledge Base');
    }

    utag_data.pageApplicationStep = Drupal.t('Help Article');
    utag_data.pageTemplate = Drupal.t('Help Article Overlay');
    utag_data.helpCategory = (categories.length) ? categories[0] : '';
    utag_data.helpSubCategoryLvl2 = (categories.length > 1) ? categories[1] : '';
    utag_data.helpSubCategoryLvl3 = '';
    utag_data.helpSubCategoryLvl4 = '';
    utag_data.helpSubCategoryLvl5 = '';
    utag_data.helpSubCategoryLvl6 = '';
    utag_data.helpArticleID = answer_id;
    utag_data.helpArticleTitle = $article_title;
    utag_data.helpProduct = (products.length) ? products[0] : '';
    utag_data.helpSubProductLvl2 = (products.length > 1) ? products[1] : '';
    utag_data.helpSubProductLvl3 = (products.length > 2) ? products[2] : '';
    utag_data.helpSubProductLvl4 = (products.length > 3) ? products[3] : '';
    utag_data.helpSubProductLvl5 = (products.length > 4) ? products[4] : '';
    utag_data.helpSubProductLvl6 = (products.length > 5) ? products[5] : '';

    // Update tealium tags.
    utag.view(utag_data);
  };

  /**
   * Remove Answer Attachments section from a restricted SW.
   */
  Drupal.RightNow.restrictedSWRemoveAnswerAttachments = function () {
    if ($('.rn_AnswerContent').find('.rn_AnswerAttachments').length) {
      $('.rn_AnswerContent').find('.rn_AnswerAttachments').remove();
    }
  }

})(jQuery);
;
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
/*!
* jQuery Form Plugin
* version: 2.43 (12-MAR-2010)
* @requires jQuery v1.3.2 or later
*
* Examples and documentation at: http://malsup.com/jquery/form/
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/
(function(b){function o(){if(b.fn.ajaxSubmit.debug){var a="[jquery.form] "+Array.prototype.join.call(arguments,"");if(window.console&&window.console.log)window.console.log(a);else window.opera&&window.opera.postError&&window.opera.postError(a)}}b.fn.ajaxSubmit=function(a){function d(){function r(){var p=h.attr("target"),n=h.attr("action");j.setAttribute("target",z);j.getAttribute("method")!="POST"&&j.setAttribute("method","POST");j.getAttribute("action")!=g.url&&j.setAttribute("action",g.url);g.skipEncodingOverride||
h.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});g.timeout&&setTimeout(function(){C=true;s()},g.timeout);var m=[];try{if(g.extraData)for(var u in g.extraData)m.push(b('<input type="hidden" name="'+u+'" value="'+g.extraData[u]+'" />').appendTo(j)[0]);t.appendTo("body");t.data("form-plugin-onload",s);j.submit()}finally{j.setAttribute("action",n);p?j.setAttribute("target",p):h.removeAttr("target");b(m).remove()}}function s(){if(!D){var p=true;try{if(C)throw"timeout";var n,m;m=v.contentWindow?
v.contentWindow.document:v.contentDocument?v.contentDocument:v.document;var u=g.dataType=="xml"||m.XMLDocument||b.isXMLDoc(m);o("isXml="+u);if(!u&&(m.body==null||m.body.innerHTML=="")){if(--G){o("requeing onLoad callback, DOM not available");setTimeout(s,250);return}o("Could not access iframe DOM after 100 tries.");return}o("response detected");D=true;i.responseText=m.body?m.body.innerHTML:null;i.responseXML=m.XMLDocument?m.XMLDocument:m;i.getResponseHeader=function(H){return{"content-type":g.dataType}[H]};
if(g.dataType=="json"||g.dataType=="script"){var E=m.getElementsByTagName("textarea")[0];if(E)i.responseText=E.value;else{var F=m.getElementsByTagName("pre")[0];if(F)i.responseText=F.innerHTML}}else if(g.dataType=="xml"&&!i.responseXML&&i.responseText!=null)i.responseXML=A(i.responseText);n=b.httpData(i,g.dataType)}catch(B){o("error caught:",B);p=false;i.error=B;b.handleError(g,i,"error",B)}if(p){g.success(n,"success");w&&b.event.trigger("ajaxSuccess",[i,g])}w&&b.event.trigger("ajaxComplete",[i,g]);
w&&!--b.active&&b.event.trigger("ajaxStop");if(g.complete)g.complete(i,p?"success":"error");setTimeout(function(){t.removeData("form-plugin-onload");t.remove();i.responseXML=null},100)}}function A(p,n){if(window.ActiveXObject){n=new ActiveXObject("Microsoft.XMLDOM");n.async="false";n.loadXML(p)}else n=(new DOMParser).parseFromString(p,"text/xml");return n&&n.documentElement&&n.documentElement.tagName!="parsererror"?n:null}var j=h[0];if(b(":input[name=submit]",j).length)alert('Error: Form elements must not be named "submit".');
else{var g=b.extend({},b.ajaxSettings,a),q=b.extend(true,{},b.extend(true,{},b.ajaxSettings),g),z="jqFormIO"+(new Date).getTime(),t=b('<iframe id="'+z+'" name="'+z+'" src="'+g.iframeSrc+'" onload="(jQuery(this).data(\'form-plugin-onload\'))()" />'),v=t[0];t.css({position:"absolute",top:"-1000px",left:"-1000px"});var i={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=
1;t.attr("src",g.iframeSrc)}},w=g.global;w&&!b.active++&&b.event.trigger("ajaxStart");w&&b.event.trigger("ajaxSend",[i,g]);if(q.beforeSend&&q.beforeSend(i,q)===false)q.global&&b.active--;else if(!i.aborted){var D=false,C=0;if(q=j.clk){var y=q.name;if(y&&!q.disabled){g.extraData=g.extraData||{};g.extraData[y]=q.value;if(q.type=="image"){g.extraData[y+".x"]=j.clk_x;g.extraData[y+".y"]=j.clk_y}}}g.forceSync?r():setTimeout(r,10);var G=100}}}if(!this.length){o("ajaxSubmit: skipping submit process - no element selected");
return this}if(typeof a=="function")a={success:a};var e=b.trim(this.attr("action"));if(e)e=(e.match(/^([^#]+)/)||[])[1];e=e||window.location.href||"";a=b.extend({url:e,type:this.attr("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},a||{});e={};this.trigger("form-pre-serialize",[this,a,e]);if(e.veto){o("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(a.beforeSerialize&&a.beforeSerialize(this,a)===false){o("ajaxSubmit: submit aborted via beforeSerialize callback");
return this}var f=this.formToArray(a.semantic);if(a.data){a.extraData=a.data;for(var c in a.data)if(a.data[c]instanceof Array)for(var l in a.data[c])f.push({name:c,value:a.data[c][l]});else f.push({name:c,value:a.data[c]})}if(a.beforeSubmit&&a.beforeSubmit(f,this,a)===false){o("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[f,this,a,e]);if(e.veto){o("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}c=b.param(f);if(a.type.toUpperCase()==
"GET"){a.url+=(a.url.indexOf("?")>=0?"&":"?")+c;a.data=null}else a.data=c;var h=this,k=[];a.resetForm&&k.push(function(){h.resetForm()});a.clearForm&&k.push(function(){h.clearForm()});if(!a.dataType&&a.target){var x=a.success||function(){};k.push(function(r){var s=a.replaceTarget?"replaceWith":"html";b(a.target)[s](r).each(x,arguments)})}else a.success&&k.push(a.success);a.success=function(r,s,A){for(var j=0,g=k.length;j<g;j++)k[j].apply(a,[r,s,A||h,h])};c=b("input:file",this).fieldValue();l=false;
for(e=0;e<c.length;e++)if(c[e])l=true;if(c.length&&a.iframe!==false||a.iframe||l||0)a.closeKeepAlive?b.get(a.closeKeepAlive,d):d();else b.ajax(a);this.trigger("form-submit-notify",[this,a]);return this};b.fn.ajaxForm=function(a){return this.ajaxFormUnbind().bind("submit.form-plugin",function(d){d.preventDefault();b(this).ajaxSubmit(a)}).bind("click.form-plugin",function(d){var e=d.target,f=b(e);if(!f.is(":submit,input:image")){e=f.closest(":submit");if(e.length==0)return;e=e[0]}var c=this;c.clk=e;
if(e.type=="image")if(d.offsetX!=undefined){c.clk_x=d.offsetX;c.clk_y=d.offsetY}else if(typeof b.fn.offset=="function"){f=f.offset();c.clk_x=d.pageX-f.left;c.clk_y=d.pageY-f.top}else{c.clk_x=d.pageX-e.offsetLeft;c.clk_y=d.pageY-e.offsetTop}setTimeout(function(){c.clk=c.clk_x=c.clk_y=null},100)})};b.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")};b.fn.formToArray=function(a){var d=[];if(this.length==0)return d;var e=this[0],f=a?e.getElementsByTagName("*"):e.elements;
if(!f)return d;for(var c=0,l=f.length;c<l;c++){var h=f[c],k=h.name;if(k)if(a&&e.clk&&h.type=="image"){if(!h.disabled&&e.clk==h){d.push({name:k,value:b(h).val()});d.push({name:k+".x",value:e.clk_x},{name:k+".y",value:e.clk_y})}}else if((h=b.fieldValue(h,true))&&h.constructor==Array)for(var x=0,r=h.length;x<r;x++)d.push({name:k,value:h[x]});else h!==null&&typeof h!="undefined"&&d.push({name:k,value:h})}if(!a&&e.clk){a=b(e.clk);f=a[0];if((k=f.name)&&!f.disabled&&f.type=="image"){d.push({name:k,value:a.val()});
d.push({name:k+".x",value:e.clk_x},{name:k+".y",value:e.clk_y})}}return d};b.fn.formSerialize=function(a){return b.param(this.formToArray(a))};b.fn.fieldSerialize=function(a){var d=[];this.each(function(){var e=this.name;if(e){var f=b.fieldValue(this,a);if(f&&f.constructor==Array)for(var c=0,l=f.length;c<l;c++)d.push({name:e,value:f[c]});else f!==null&&typeof f!="undefined"&&d.push({name:this.name,value:f})}});return b.param(d)};b.fn.fieldValue=function(a){for(var d=[],e=0,f=this.length;e<f;e++){var c=
b.fieldValue(this[e],a);c===null||typeof c=="undefined"||c.constructor==Array&&!c.length||(c.constructor==Array?b.merge(d,c):d.push(c))}return d};b.fieldValue=function(a,d){var e=a.name,f=a.type,c=a.tagName.toLowerCase();if(typeof d=="undefined")d=true;if(d&&(!e||a.disabled||f=="reset"||f=="button"||(f=="checkbox"||f=="radio")&&!a.checked||(f=="submit"||f=="image")&&a.form&&a.form.clk!=a||c=="select"&&a.selectedIndex==-1))return null;if(c=="select"){c=a.selectedIndex;if(c<0)return null;d=[];a=a.options;
e=(f=f=="select-one")?c+1:a.length;for(c=f?c:0;c<e;c++){var l=a[c];if(l.selected){var h=l.value;h||(h=l.attributes&&l.attributes.value&&!l.attributes.value.specified?l.text:l.value);if(f)return h;d.push(h)}}return d}return a.value};b.fn.clearForm=function(){return this.each(function(){b("input,select,textarea",this).clearFields()})};b.fn.clearFields=b.fn.clearInputs=function(){return this.each(function(){var a=this.type,d=this.tagName.toLowerCase();if(a=="text"||a=="password"||d=="textarea")this.value=
"";else if(a=="checkbox"||a=="radio")this.checked=false;else if(d=="select")this.selectedIndex=-1})};b.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)this.reset()})};b.fn.enable=function(a){if(a==undefined)a=true;return this.each(function(){this.disabled=!a})};b.fn.selected=function(a){if(a==undefined)a=true;return this.each(function(){var d=this.type;if(d=="checkbox"||d=="radio")this.checked=a;else if(this.tagName.toLowerCase()==
"option"){d=b(this).parent("select");a&&d[0]&&d[0].type=="select-one"&&d.find("option").selected(false);this.selected=a}})}})(jQuery);
;
