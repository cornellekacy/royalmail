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
/**
 * Generates modal content links from the modal reference field on the page
 * content type.
 */
(function($, Drupal) {
  Drupal.behaviors.modalContent = function(context) {
    $('a.modal-content:not(.modal-content-processed)', context).each(function() {
      var settings_key = this.getAttribute('data-modal-content');
      var appName;
      // Modal content should be added to Drupal.settings via the preprocess.
      if (Drupal.settings.modalContent[settings_key] !== undefined) {
       if (Drupal.settings.modalContent[settings_key].app !== undefined) {
         appName = Drupal.settings.modalContent[settings_key].app;
       }
        // Create the markup and add it to the page.
        var dialog = $('<div></div>')
          .attr('title', Drupal.settings.modalContent[settings_key].title)
          .html(Drupal.settings.modalContent[settings_key].content)
          .appendTo('body')
          // Set dialog options.
          .dialog({
            autoOpen: false,
            resizable: false,
            draggable: false,
            width: Drupal.settings.modalContent[settings_key].width || 720,
            modal: true,
            title: '<h2>' + Drupal.settings.modalContent[settings_key].title + '</h2>',
            open: function (event, ui) {
              // Adds tealium tags.
              if (window.trackOverlay !== undefined && appName != 'FeeToPay') {
                var new_tag = [];
                new_tag['pageOverlayType'] = 'Help Guide';
                var current_title = $('<textarea />').html(Drupal.settings.modalContent[settings_key].title).text();
                new_tag['pageOverlayTitle'] = current_title;
                tealium_tag_overlay(new_tag);
              }
            }
          });

        $(this).click(function() {
          dialog.data('triggerElement', this);
          dialog.dialog('open');
          return false;
        });
      }
    }).addClass('modal-content-processed');
  };
})(jQuery, Drupal);
;
/**
 * @file
 * Controls setting of Tealium tags.
 *
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Sets Tealium tags on display modal content.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.rmlPayAFeeModalOpen = function () {
    $('.modal-content').click(function (e) {
      var tags = [];
      var nid = e.currentTarget.dataset.modalContent;
      var overlay = Drupal.settings.modalContent[nid].title.replace(/&#039;/g, '\'') + ' Overlay';
      var expr = new RegExp(overlay, "ig");

      if (!(expr.test(utag_data.pageApplicationStep))) {
        tags['pageApplicationStep'] = utag_data.pageApplicationStep + ': ' + overlay;
      }

      tags['pageName'] = 'RM PER >Receiving mail >Tools >Pay a fee ' + utag_data.pageNodeID + ' >' + overlay;
      tags['pageTemplate'] = 'Overlay';

      // Unset pageOverlayType tag as it can cause tags to be changed at Tealium end.
      delete utag_data.pageOverlayType;

      tealium_tag_overlay(tags);
    });
  };

})(jQuery, Drupal);
;
/**
 * @file
 * Chatbot block javascript file.
 */

(function ($) {
  Drupal.behaviors.RmlChatbotBlock = function (context) {
    const weekDayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    /**
     * Convert passed date/time object in UTC.
     *
     * @param {Object} dateToConvert Date object to convert in UTC.
     *
     * @return {Object} Converted Date Object in UTC.
     */
    function convertDateTime(dateToConvert) {
      let offset = '0';
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      // Consider BST while converting the date object.
      // BST starts at 01:00 UTC on the last Sunday in March and ends at 01:00 UTC
      // on the last Sunday in October each year.
      const lastDayMarch = new Date(currentYear, 3, 0);
      const lastSundayMarch = new Date(
        lastDayMarch.setDate(
          lastDayMarch.getDate() - (lastDayMarch.getDay() === 0 ? 7 : lastDayMarch.getDay())
        )
      );
      const lastDayOct = new Date(currentYear, 10, 0);
      const lastSundayOct = new Date(
        lastDayOct.setDate(
          lastDayOct.getDate() - (lastDayOct.getDay() === 0 ? 7 : lastDayOct.getDay())
        )
      );

      // Offset will be +1 if current date falls within BST
      if (currentDate >= lastSundayMarch && currentDate <= lastSundayOct) {
        offset = '+1';
      }

      // Get UTC time in msec
      const utc = dateToConvert.getTime() + (dateToConvert.getTimezoneOffset() * 60000);

      // Create new Date object using supplied offset.
      const newDate = new Date(utc + (3600000 * offset));

      return newDate;
    }

    /**
     * Check if current date/time falls under inclusion & exclusion date/time.
     *
     * @param {Array} schedule Contains configured inclusion / exclusion date/time.
     *
     * @return {Boolean} Return true if current date/time falls under configured
     *   inclusion / exclusion date/time. Otherwise retun false.
     */
    function checkScheduleInclusionExclusion(schedule) {
      const today = (convertDateTime(new Date()));
      for (let i = 0; i < schedule.length; i++) {
        // Set the date/time as require to validate against current date/time.
        let dateStartTimeObject = new Date(schedule[i].exceptionDate);
        let dateEndTimeObject = new Date(schedule[i].exceptionDate);
        dateStartTimeObject.setHours(
          parseInt(schedule[i].startTime.substr(0, 2), 10),
          parseInt(schedule[i].startTime.substr(3, 2), 10)
        );
        dateEndTimeObject.setHours(
          parseInt(schedule[i].endTime.substr(0, 2), 10),
          parseInt(schedule[i].endTime.substr(3, 2), 10)
        );

        // "inclusions": [{"exceptionDate": "2019-06-17", "startTime":"07:00", "endTime":"22:30"}]
        // If current date/time falls under inclusion start & end date/time,
        // then display chatbot window.

        // "exclusions": [
        //   {"exceptionDate": "2018-06-17", "startTime":"08:00", "endTime":"17:30"}
        //   {"exceptionDate": "2018-12-25", "startTime":"08:00", "endTime":"19:30"}
        // ]

        // If current date/time doesn't fall under exclusions defined date/time,
        // then display chatbot.
        // e.g. If current date/time is 2019-06-17 / 18:00pm which doesn't fall under
        // defined exclusions as {"exceptionDate": "2019-06-17", "startTime":"08:00", "endTime":"17:30"}
        // then display chatbot window.

        if (today >= dateStartTimeObject && today <= dateEndTimeObject) {
          return true;
        }
      }
      return false;
    }

    /**
     * Check if current date/time falls under configured operating hours for chatbot.
     *
     * @param {Object} chatbotWidgetOpHours Configured JSON array of operating hours.
     *
     * @return {Boolean} Return true if current date/time falls under configured
     *   operating hours. Otherwise retun false.
     */
    function displayChatbotInOpHours(chatbotWidgetOpHours) {
      let displayChatbot = false;
      let today = new Date();
      const day = weekDayArr[today.getDay()];

      // Create date objects and set the time as require.
      let startTimeObject = new Date(today);
      let endTimeObject = new Date(today);

      // Convert to require timezone.
      today = convertDateTime(today);
      startTimeObject = convertDateTime(startTimeObject);
      endTimeObject = convertDateTime(endTimeObject);

      // Loop through JSON array.
      $.each(chatbotWidgetOpHours.operatingSchedules.schedule, function (index, value) {

        // Check for inclusion dates.

        // "inclusions": [{"exceptionDate": "2019-06-17", "startTime":"07:00", "endTime":"22:30"}]
        // If current date/time falls under inclusion start & end date/time,
        // then display chatbot window.

        displayChatbot = checkScheduleInclusionExclusion(
          chatbotWidgetOpHours.operatingSchedules.schedule[index].inclusions
        );

        if (!displayChatbot) {
          // Check for normal days excluding date/time in exclusions.
          // "operatingHours": [
          // {"dayOfWeek":"Monday", "startTime":"08:00", "endTime":"19:30" },
          // {"dayOfWeek":"Tuesday", "startTime":"08:00", "endTime":"19:30" }]
          // "exclusions": [
          //   {"exceptionDate": "2019-06-18", "startTime":"08:00", "endTime":"17:30"}
          //   {"exceptionDate": "2018-12-25", "startTime":"08:00", "endTime":"19:30"}
          // ]

          // e.g. If current day is "Tuesday" with operating hours as 8:00am to 19:30pm
          // & exclusion has current date (2019-06-18) which falls on "Tuesday"
          // with operating hours as 8:00am to 17:30pm.
          // Then chatbot window should be displayed only within 17:30pm to 19:30pm on
          // date 2018-11-20.

          const opHours = chatbotWidgetOpHours.operatingSchedules.schedule[index].operatingHours;
          for (let i = 0; i < opHours.length; i++) {

            // Set the date/time as require to validate against current date/time.
            startTimeObject.setHours(
              parseInt(opHours[i].startTime.substr(0, 2), 10),
              parseInt(opHours[i].startTime.substr(3, 2), 10)
            );
            endTimeObject.setHours(
              parseInt(opHours[i].endTime.substr(0, 2), 10),
              parseInt(opHours[i].endTime.substr(3, 2), 10)
            );

            // If current day falls under normal days defined hours,
            // then display chatbot.

            // e.g If current day is "Monday" & current time is 9:00 am which
            // falls under the defined operating hours as
            // {"dayOfWeek":"Monday", "startTime":"08:00", "endTime":"19:30" }

            if (day === opHours[i].dayOfWeek && today >= startTimeObject && today <= endTimeObject) {
              displayChatbot = true;
              break;
            }
          }

          if (displayChatbot) {
            // Check for excluded date.

            // "exclusions": [
            //   {"exceptionDate": "2019-06-17", "startTime":"08:00", "endTime":"17:30"}
            //   {"exceptionDate": "2019-12-25", "startTime":"08:00", "endTime":"19:30"}
            // ]

            // If current date/time doesn't fall under exclusions defined date/time,
            // then display chatbot.
            // e.g. If current date/time is 2019-06-18 / 18:00pm which doesn't fall under
            // defined exclusions as {"exceptionDate": "2019-06-18", "startTime":"08:00", "endTime":"17:30"}
            // then display chatbot window.

            displayChatbot = !checkScheduleInclusionExclusion(
              chatbotWidgetOpHours.operatingSchedules.schedule[index].exclusions
            );
          }
        }
      });

      return displayChatbot;
    }

    /**
     * Check different conditions for chatbot window display.
     *
     * Conditions are - whether current day/time falls under configured operating hours
     * and configured frequency.
     *
     * @return {boolean} Return true if frequency is greater than 0 and
     *   current day/time falls under configured operating hours. Otherwise return false.
     */
    function displayChatbotWindow() {
      const chatbotWidgetOpJson = Drupal.settings.chatbot_settings.rml_chatbot_widget_operating_hours;
      var chatbotInServicePeriod = false;

      // Check if current date/time falls under chatbot configured operating hours.
      if (chatbotWidgetOpJson) {
        var chatbotWidgetOpHours = JSON.parse(chatbotWidgetOpJson);
        chatbotInServicePeriod = displayChatbotInOpHours(chatbotWidgetOpHours);
      }

      var chatbotFrequency = Drupal.settings.chatbot_settings.rml_chatbot_frequency;
      // Do not show chatbot if frequency is set to 0.
      // If frequency is set between 0 and 1 e.g. 0.5, 0.75, then display
      // chatbot window based on page requests randomly.
      if ((parseInt(chatbotFrequency, 10) === 1 || (Math.random() < chatbotFrequency)) && chatbotInServicePeriod === true) {
        return true;
      }

      return false;
    }

    if (!document.getElementById('flmntChatbot')) {
      // Check different conditions when the chatbot window needs to display.
      var displayChatbot = displayChatbotWindow();

      if (displayChatbot) {
        // Show chatbot after a delay of configured period.
        setTimeout(function() {
          const script = document.createElement('script');
          $('body').append('<div id="flmnt-placeholder"></div>');
          const placeholder = document.getElementById('flmnt-placeholder');
          script.type = 'text/javascript';
          script.async = true;
          script.src = Drupal.settings.chatbot_settings.rml_chatbot_widget_script_url;
          placeholder.appendChild(script);
        }, Drupal.settings.chatbot_settings.rml_chatbot_time_delay);
      }
    }
  };
})(jQuery);
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
Drupal.behaviors.rate = function(context) {
  $('.rate-widget:not(.rate-processed)', context).addClass('rate-processed').each(function () {
    var widget = $(this);
    var ids = widget.attr('id').match(/^rate\-([a-z]+)\-([0-9]+)\-([0-9]+)\-([0-9])$/);
    var data = {
      content_type: ids[1],
      content_id: ids[2],
      widget_id: ids[3],
      widget_mode: ids[4]
    };
    
    $('a.rate-button', widget).click(function() {
      var token = this.getAttribute('href').match(/rate\=([a-f0-9]{32})/)[1];
      return Drupal.rateVote(widget, data, token);
    });
  });
}

Drupal.rateVote = function(widget, data, token) {
  // Invoke JavaScript hook.
  $.event.trigger('eventBeforeRate', [data]);

  $(".rate-info", widget).text(Drupal.t('Saving vote...'));

  // Random number to prevent caching, see http://drupal.org/node/1042216#comment-4046618
  var random = Math.floor(Math.random() * 99999);

  var q = '?q=rate%2Fvote%2Fjs&widget_id=' + data.widget_id + '&content_type=' + data.content_type + '&content_id=' + data.content_id + '&widget_mode=' + data.widget_mode + '&token=' + token + '&destination=' + escape(document.location) + '&r=' + random;
  if (data.value) {
    q = q + '&value=' + data.value;
  }

  $.get(Drupal.settings.basePath + q, function(data) {
    if (data.match(/^https?\:\/\/[^\/]+\/(.*)$/)) {
      // We got a redirect.
      document.location = data;
    }
    else {
      // get parent object
      var p = widget.parent();

      widget.before(data);

      // remove widget
      widget.remove();
      widget = undefined;

      Drupal.attachBehaviors(p.get(0));

      // Invoke JavaScript hook.
      $.event.trigger('eventAfterRate', [data]);      
    }
  });

  return false;
}
;
// Fivestar highlight interaction
Drupal.behaviors.highlightedStarRate = function(context) {
    $('.rate-widget-fivestar ul:not(.highlightedStarRate-processed)',context).addClass('.highlightedStarRate-processed').each(function() {
        var $this = $(this);
        // Save the current vote status
        var status = $('li a.rate-fivestar-btn-filled', $this).length;

        $this.children().hover(
            function()
            {
                // Append rate-fivestar-btn-filled class to all the a-elements except the a-elements after the hovered element
                var $this = $(this);
                $this.siblings().children('a').addClass('rate-fivestar-btn-filled').removeClass('rate-fivestar-btn-empty');
                $this.children('a').addClass('rate-fivestar-btn-filled').removeClass('rate-fivestar-btn-empty');
                $this.nextAll().children('a').removeClass('rate-fivestar-btn-filled').addClass('rate-fivestar-btn-empty');
            },
            function()
            {
                // Restore the current vote status
                $(this).parent().children().children('a').removeClass('rate-fivestar-btn-filled').addClass('rate-fivestar-btn-empty');
                $(this).parent().children().slice(0,status).children('a').removeClass('rate-fivestar-btn-empty').addClass('rate-fivestar-btn-filled');
            }
        );
    });
};

;
