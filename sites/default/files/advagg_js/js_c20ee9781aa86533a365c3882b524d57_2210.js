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
// $Id: hierarchical_select.js,v 1.104 2010/08/26 15:28:58 wimleers Exp $

(function($) {

Drupal.behaviors.HierarchicalSelect = function (context) {
  $('.hierarchical-select-wrapper:not(.hierarchical-select-wrapper-processed)', context)
  .addClass('hierarchical-select-wrapper-processed').each(function() {
    var hsid = $(this).attr('id').replace(/^hierarchical-select-(\d+)-wrapper$/, "$1");
    Drupal.HierarchicalSelect.initialize(hsid);
  });
};

Drupal.HierarchicalSelect = {};

Drupal.HierarchicalSelect.state = [];

Drupal.HierarchicalSelect.context = function() {
  return $("form .hierarchical-select-wrapper");
};

Drupal.HierarchicalSelect.initialize = function(hsid) {
  // Prevent JS errors when Hierarchical Select is loaded dynamically.


 if (undefined == Drupal.settings.HierarchicalSelect || undefined == Drupal.settings.HierarchicalSelect.settings[hsid]) {
    return false;
  }

  // If you set Drupal.settings.HierarchicalSelect.pretendNoJS to *anything*,
  // and as such, Hierarchical Select won't initialize its Javascript! It
  // will seem as if your browser had Javascript disabled.
  if (undefined != Drupal.settings.HierarchicalSelect.pretendNoJS) {
    return false;
  }

  // Turn off Firefox' autocomplete feature. This causes Hierarchical Select
  // form items to be disabled after a hard refresh.
  // See http://drupal.org/node/453048 and
  // http://www.ryancramer.com/journal/entries/radio_buttons_firefox/
  if ($.browser.mozilla) {
    $('#hierarchical-select-'+ hsid +'-wrapper').parents('form').attr('autocomplete', 'off');
  }

  if (this.cache != null) {
    this.cache.initialize();
  }

  Drupal.settings.HierarchicalSelect.settings[hsid]['updatesEnabled'] = true;
  if (undefined == Drupal.HierarchicalSelect.state[hsid]) {
    Drupal.HierarchicalSelect.state[hsid] = {};
  }

  this.transform(hsid);
  if (Drupal.settings.HierarchicalSelect.settings[hsid].resizable) {
    this.resizable(hsid);
  }
  Drupal.HierarchicalSelect.attachBindings(hsid);

  if (this.cache != null && this.cache.status()) {
    this.cache.load(hsid);
  }

  Drupal.HierarchicalSelect.log(hsid);
};

Drupal.HierarchicalSelect.log = function(hsid, messages) {
  // Only perform logging if logging is enabled.
  if (Drupal.settings.HierarchicalSelect.initialLog == undefined || Drupal.settings.HierarchicalSelect.initialLog[hsid] == undefined) {
    return;
  }
  else {
    Drupal.HierarchicalSelect.state[hsid].log = [];
  }

  // Store the log messages. The first call to this function may not contain a
  // message: the initial log included in the initial HTML rendering should be
  // used instead.. 
  if (Drupal.HierarchicalSelect.state[hsid].log.length == 0) {
    Drupal.HierarchicalSelect.state[hsid].log.push(Drupal.settings.HierarchicalSelect.initialLog[hsid]);
  }
  else {
      Drupal.HierarchicalSelect.state[hsid].log.push(messages);
  }

  // Print the log messages.
  console.log("HIERARCHICAL SELECT " + hsid);
  var logIndex = Drupal.HierarchicalSelect.state[hsid].log.length - 1;
  for (var i = 0; i < Drupal.HierarchicalSelect.state[hsid].log[logIndex].length; i++) {
    console.log(Drupal.HierarchicalSelect.state[hsid].log[logIndex][i]);
  }
  console.log(' ');
};

Drupal.HierarchicalSelect.transform = function(hsid) {
  var removeString = $('#hierarchical-select-'+ hsid +'-wrapper .dropbox .dropbox-remove:first', Drupal.HierarchicalSelect.context).text();

  $('#hierarchical-select-'+ hsid +'-wrapper', Drupal.HierarchicalSelect.context)
  // Remove the .nojs div.
  .find('.nojs').remove().end()
  // Find all .dropbox-remove cells in the dropbox table.
  .find('.dropbox .dropbox-remove')
  // Hide the children of these table cells. We're not removing them because
  // we want to continue to use the "Remove" checkboxes.
  .find('*').css('display', 'none').end() // We can't use .hide() because of collapse.js: http://drupal.org/node/351458#comment-1258303.
  // Put a "Remove" link there instead.
  .append('<a href="">'+ removeString +'</a>');  
};

Drupal.HierarchicalSelect.resizable = function(hsid) {
  var $selectsWrapper = $('#hierarchical-select-' + hsid + '-wrapper .hierarchical-select .selects', Drupal.HierarchicalSelect.context);

  // No select wrapper present: the user is creating a new item.
  if ($selectsWrapper.length == 0) {
    return;
  }

  // Append the drag handle ("grippie").
  $selectsWrapper.append($('<div class="grippie"></div>'));

  // jQuery object that contains all selects in the hierarchical select, to
  // speed up DOM manipulation during dragging.
  var $selects = $selectsWrapper.find('select');

  var defaultHeight = Drupal.HierarchicalSelect.state[hsid].defaultHeight = $selects.slice(0, 1).height();
  var defaultSize = Drupal.HierarchicalSelect.state[hsid].defaultSize = $selects.slice(0, 1).attr('size');
  defaultSize = (defaultSize == 0) ? 1 : defaultSize;
  var margin = Drupal.HierarchicalSelect.state[hsid].margin = parseInt($selects.slice(0, 1).css('margin-bottom').replace(/^(\d+)px$/, "$1"));

  // Bind the drag event.
  $('.grippie', $selectsWrapper)
  .mousedown(startDrag)
  .dblclick(function() {
    if (Drupal.HierarchicalSelect.state[hsid].resizedHeight == undefined) {
      Drupal.HierarchicalSelect.state[hsid].resizedHeight = defaultHeight;
    }
    var resizedHeight = Drupal.HierarchicalSelect.state[hsid].resizedHeight = (Drupal.HierarchicalSelect.state[hsid].resizedHeight > defaultHeight + 2) ? defaultHeight : 4.6 / defaultSize * defaultHeight;
    Drupal.HierarchicalSelect.resize($selects, defaultHeight, resizedHeight, defaultSize, margin);
  });

  function startDrag(e) {
    staticOffset = $selects.slice(0, 1).height() - e.pageY;
    $selects.css('opacity', 0.25);
    $(document).mousemove(performDrag).mouseup(endDrag);
    return false;
  }

  function performDrag(e) {
    var resizedHeight = staticOffset + e.pageY;
    Drupal.HierarchicalSelect.resize($selects, defaultHeight, resizedHeight, defaultSize, margin);
    return false;
  }

  function endDrag(e) {
    var height = $selects.slice(0, 1).height();

    $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
    $selects.css('opacity', 1);
    if (height != Drupal.HierarchicalSelect.state[hsid].resizedHeight) {
      Drupal.HierarchicalSelect.state[hsid].resizedHeight = (height > defaultHeight) ? height : defaultHeight;
    }
  }
};

Drupal.HierarchicalSelect.resize = function($selects, defaultHeight, resizedHeight, defaultSize, margin) {
  if (resizedHeight == undefined) {
    resizedHeight = defaultHeight;
  }

  $selects
  .attr('size', (resizedHeight > defaultHeight) ? 2 : defaultSize)
  .height(Math.max(defaultHeight + margin, resizedHeight)); // Without the margin component, the height() method would allow the select to be sized to low: defaultHeight - margin.
};

Drupal.HierarchicalSelect.disableForm = function(hsid) {
  // Disable *all* submit buttons in this form, as well as all input-related
  // elements of the current hierarchical select.
  $('form:has(#hierarchical-select-' + hsid +'-wrapper) input[type=submit]')
  .add('#hierarchical-select-' + hsid +'-wrapper .hierarchical-select .selects select')
  .add('#hierarchical-select-' + hsid +'-wrapper .hierarchical-select input')
  .attr('disabled', true);

  // Add the 'waiting' class. Default style: make everything transparent.
  $('#hierarchical-select-' + hsid +'-wrapper').addClass('waiting');

  // Indicate that the user has to wait.
  $('body').css('cursor', 'wait');
};

Drupal.HierarchicalSelect.enableForm = function(hsid) {
  // This method undoes everything the disableForm() method did.

  $e = $('form:has(#hierarchical-select-' + hsid +'-wrapper) input[type=submit]');
  $e = $e.add('#hierarchical-select-' + hsid +'-wrapper .hierarchical-select input[type!=submit]');

  // Don't enable the selects again if they've been disabled because the
  // dropbox limit was exceeded.
  dropboxLimitExceeded = $('#hierarchical-select-' + hsid +'-wrapper .hierarchical-select-dropbox-limit-warning').length > 0;
  if (!dropboxLimitExceeded) {
    $e = $e.add($('#hierarchical-select-' + hsid +'-wrapper .hierarchical-select .selects select'));
  }
  $e.attr('disabled', false);

  // Don't enable the 'Add' button again if it's been disabled because the
  // dropbox limit was exceeded.
  if (dropboxLimitExceeded) {
    $('#hierarchical-select-' + hsid +'-wrapper .hierarchical-select input[type=submit]')
    .attr('disabled', true);
  }

  $('#hierarchical-select-' + hsid +'-wrapper').removeClass('waiting');

  $('body').css('cursor', 'auto');
};

Drupal.HierarchicalSelect.throwError = function(hsid, message) {
  // Show the error to the user.
  alert(hsid + ":" + message);

  // Log the error.
  Drupal.HierarchicalSelect.log(hsid, [ message ]);

  // Re-enable the form to allow the user to retry, but reset the selection to
  // the level label if possible, otherwise the "<none>" option if possible.
  var $select = $('#hierarchical-select-' + hsid +'-wrapper .hierarchical-select .selects select:first');
  var levelLabelOption = $('option[value^=label_]', $select).val();
  if (levelLabelOption !== undefined) {
    $select.val(levelLabelOption);
  }
  else {
    var noneOption = $('option[value=none]', $select).val();
    if (noneOption !== undefined) {
      $select.val(noneOption);
    }
  }
  Drupal.HierarchicalSelect.enableForm(hsid);
};

Drupal.HierarchicalSelect.prepareGETSubmit = function(hsid) {
  // Remove the name attributes of all form elements that end up in GET,
  // except for the "flat select" form element.
  $('#hierarchical-select-'+ hsid +'-wrapper', Drupal.HierarchicalSelect.context)
  .find('input, select')
  .not('.flat-select')
  .removeAttr('name');

  // Update the name attribute of the "flat select" form element
  var $flatSelect = $('#hierarchical-select-'+ hsid +'-wrapper .flat-select', Drupal.HierarchicalSelect.context);
  var newName = $flatSelect.attr('name').replace(/^([a-zA-Z0-9_\-]*)(?:\[flat_select\]){1}(\[\])?$/, "$1$2");
  $flatSelect.attr('name', newName);

  Drupal.HierarchicalSelect.triggerEvents(hsid, 'prepared-GET-submit', {});
};

Drupal.HierarchicalSelect.attachBindings = function(hsid) {
  var addOpString = $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select input', Drupal.HierarchicalSelect.context).val();
  var createNewItemOpString = $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .create-new-item-create', Drupal.HierarchicalSelect.context).val();
  var cancelNewItemOpString = $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .create-new-item-cancel', Drupal.HierarchicalSelect.context).val();

  var data = {};
  data.hsid = hsid;

  $('#hierarchical-select-'+ hsid +'-wrapper', this.context)
  // "disable-updates" event
  .unbind('disable-updates').bind('disable-updates', data, function(e) {
    Drupal.settings.HierarchicalSelect.settings[e.data.hsid]['updatesEnabled'] = false;
  })
  
  // "enforce-update" event
  .unbind('enforce-update').bind('enforce-update', data, function(e, extraPost) {
     Drupal.HierarchicalSelect.update(e.data.hsid, 'enforced-update', { extraPost: extraPost });
  })

  // "prepare-GET-submit" event
  .unbind('prepare-GET-submit').bind('prepare-GET-submit', data, function(e) {
    Drupal.HierarchicalSelect.prepareGETSubmit(e.data.hsid);
  })

  // "update-hierarchical-select" event
  .find('.hierarchical-select .selects select').unbind().change(function(_hsid) {
    return function() {
      if (Drupal.settings.HierarchicalSelect.settings[_hsid]['updatesEnabled']) {
        Drupal.HierarchicalSelect.update(_hsid, 'update-hierarchical-select', { select_id : $(this).attr('id') });
      }
    };
  }(hsid)).end()

  // "create-new-item" event
  .find('.hierarchical-select .create-new-item .create-new-item-create').unbind().click(function(_hsid) {
    return function() {
      Drupal.HierarchicalSelect.update(_hsid, 'create-new-item', { opString : createNewItemOpString });
      return false; // Prevent the browser from POSTing the page.
    };
  }(hsid)).end()

  // "cancel-new-item" event"
  .find('.hierarchical-select .create-new-item .create-new-item-cancel').unbind().click(function(_hsid) {
    return function() {
      Drupal.HierarchicalSelect.update(_hsid, 'cancel-new-item', { opString : cancelNewItemOpString });
      return false; // Prevent the browser from POSTing the page (in case of the "Cancel" button).
    };
  }(hsid)).end()

  // "add-to-dropbox" event
  .find('.hierarchical-select .add-to-dropbox').unbind().click(function(_hsid) {
    return function() {
      Drupal.HierarchicalSelect.update(_hsid, 'add-to-dropbox', { opString : addOpString });
      return false; // Prevent the browser from POSTing the page.
    };
  }(hsid)).end()

  // "remove-from-dropbox" event
  // (anchors in the .dropbox-remove cells in the .dropbox table)
  .find('.dropbox .dropbox-remove a').unbind().click(function(_hsid) {
    return function() {
      var isDisabled = $('#hierarchical-select-'+ hsid +'-wrapper', Drupal.HierarchicalSelect.context).attr('disabled');

      // If the hierarchical select is disabled, then ignore this click.
      if (isDisabled) {
        return false;
      }

      // Check the (hidden, because JS is enabled) checkbox that marks this
      // dropbox entry for removal. 
      $(this).parent().find('input[type=checkbox]').attr('checked', true);
      Drupal.HierarchicalSelect.update(_hsid, 'remove-from-dropbox', {});
      return false; // Prevent the browser from POSTing the page.
    };
  }(hsid));
};

Drupal.HierarchicalSelect.preUpdateAnimations = function(hsid, updateType, lastUnchanged, callback) {
	 if(callback){
		callback();
	 }
	 return false;
//changeRSS****************************************************************************************************************   
/*
  	switch (updateType) {
    	case 'update-hierarchical-select':
      	// Drop out the selects of the levels deeper than the select of the
      	// level that just changed.
     		var animationDelay = Drupal.settings.HierarchicalSelect.settings[hsid]['animationDelay'];
	 		var $animatedSelects = $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .selects select', Drupal.HierarchicalSelect.context).slice(lastUnchanged);
     
	if ($animatedSelects.size() > 0) {
        $animatedSelects.hide();
        for (var i = 0; i < $animatedSelects.size(); i++) {
          if (i < $animatedSelects.size() - 1) {
           // $animatedSelects.slice(i, i + 1).hide("drop", { direction: "left" }, animationDelay);
          }
          else {
            //$animatedSelects.slice(i, i + 1).hide("drop", { direction: "left" }, animationDelay, callback);
          }
        }
      }
      else if (callback) {
        callback();
      }
      break;
    default:
      if (callback) {
        callback();
      }  
 	 break;
	 
  }
*/
//****************************************************************************************************************endofchange
};

Drupal.HierarchicalSelect.postUpdateAnimations = function(hsid, updateType, lastUnchanged, callback) {
  
  //alert("called");
  if (Drupal.settings.HierarchicalSelect.settings[hsid].resizable) {
    // Restore the resize.  
    Drupal.HierarchicalSelect.resize(
      $('#hierarchical-select-' + hsid + '-wrapper .hierarchical-select .selects select', Drupal.HierarchicalSelect.context),
      Drupal.HierarchicalSelect.state[hsid].defaultHeight,
      Drupal.HierarchicalSelect.state[hsid].resizedHeight,
      Drupal.HierarchicalSelect.state[hsid].defaultSize,
      Drupal.HierarchicalSelect.state[hsid].margin
    );
  }

  switch (updateType) {
    case 'update-hierarchical-select':
      var $createNewItemInput = $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .create-new-item-input', Drupal.HierarchicalSelect.context);
      
      if ($createNewItemInput.size() == 0) {
        // Give focus to the level below the one that has changed, if it
        // exists.
        if (!$.browser.mozilla) { // Don't give focus in Firefox: the user would have to click twice before he can make a selection.
          $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .selects select', Drupal.HierarchicalSelect.context)
          .slice(lastUnchanged, lastUnchanged + 1)
          .focus();
        }
      }
      else {
        // Give focus to the input field of the "create new item/level"
        // section, if it exists, and also select the existing text.
        $createNewItemInput.focus();
        $createNewItemInput[0].select();
      }
      // Hide the loaded selects after the one that was just changed, then
      // drop them in.
//changeRSS****************************************************************************************************************
     /*
	 var animationDelay = Drupal.settings.HierarchicalSelect.settings[hsid]['animationDelay'];
      var $animatedSelects = $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .selects select', Drupal.HierarchicalSelect.context).slice(lastUnchanged);
      if ($animatedSelects.size() > 0) {
        //$animatedSelects.hide();
        for (var i = 0; i < $animatedSelects.size(); i++) {
          if (i < $animatedSelects.size() - 1) {
            //$animatedSelects.slice(i, i + 1).show("drop", { direction: "left" }, animationDelay);
          }
          else {
            //$animatedSelects.slice(i, i + 1).show("drop", { direction: "left" }, animationDelay, callback);
          }
        }
      }
      else if (callback) {
        callback();
      }
	  */
	 if (callback) {
		 callback();
	  }
	 
//****************************************************************************************************************endofchange
      break;

    case 'create-new-item':
      // Make sure that other Hierarchical Selects that represent the same
      // hierarchy are also updated, to make sure that they have the newly
      // created item!
      var cacheId = Drupal.settings.HierarchicalSelect.settings[hsid].cacheId;
      for (var otherHsid in Drupal.settings.HierarchicalSelect.settings) {
        if (Drupal.settings.HierarchicalSelect.settings[otherHsid].cacheId == cacheId) {
          $('#hierarchical-select-'+ otherHsid +'-wrapper')
          .trigger('enforce-update');
        }
      }
      // TRICKY: NO BREAK HERE!

    case 'cancel-new-item':
      // After an item/level has been created/cancelled, reset focus to the
      // beginning of the hierarchical select.
      $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .selects select', Drupal.HierarchicalSelect.context)
      .slice(0, 1)
      .focus();

      if (callback) {
        callback();
      }
      break;

    default:
      if (callback) {
        callback();
      }
      break;
  }
};

Drupal.HierarchicalSelect.triggerEvents = function(hsid, updateType, settings) {
  $('#hierarchical-select-'+ hsid +'-wrapper', Drupal.HierarchicalSelect.context)
  .trigger(updateType, [ hsid, settings ]);
};

Drupal.HierarchicalSelect.update = function(hsid, updateType, settings) {
  var post = $('form:has(#hierarchical-select-' + hsid +'-wrapper)', Drupal.HierarchicalSelect.context).formToArray();

  // Pass the hierarchical_select id via POST.
  post.push({ name : 'hsid', value : hsid });
  
  // If a cache system is installed, let the server know if it's running
  // properly. If it is running properly, the server will send back additional
  // information to maintain a lazily-loaded cache.
  if (Drupal.HierarchicalSelect.cache != null) {
    post.push({ name : 'client_supports_caching', value : Drupal.HierarchicalSelect.cache.status() });
  }

  // updateType is one of:
  // - 'none' (default)
  // - 'update-hierarchical-select'
  // - 'enforced-update'
  // - 'create-new-item'
  // - 'remove-from-dropbox'
  switch (updateType) {
    case 'update-hierarchical-select':
      var value = $('#'+ settings.select_id).val();
      var lastUnchanged = parseInt(settings.select_id.replace(/^.*-hierarchical-select-selects-(\d+)$/, "$1")) + 1;
      var optionClass = $('#'+ settings.select_id).find('option[value='+ value +']').attr('class');

      // Don't do anything (also no callback to the server!) when the selected
      // item is:
      // - the '<none>' option and the renderFlatSelect setting is disabled, or
      // - a level label, or
      // - an option of class 'has-no-children', and
      //   (the renderFlatSelect setting is disabled or the dropbox is enabled)
      //   and
      //   (the createNewLevels setting is disabled).
      if ((value == 'none' && Drupal.settings.HierarchicalSelect.settings[hsid]['renderFlatSelect'] == false)
          || value.match(/^label_\d+$/)
          || (optionClass == 'has-no-children'
             &&
             (
               (Drupal.settings.HierarchicalSelect.settings[hsid]['renderFlatSelect'] == false
                || $('#hierarchical-select-'+ hsid +'-wrapper .dropbox').length > 0
               )
               &&
               Drupal.settings.HierarchicalSelect.settings[hsid]['createNewLevels'] == false
             )
           )
         )
      {
        Drupal.HierarchicalSelect.preUpdateAnimations(hsid, updateType, lastUnchanged, function() {
          // Remove the sublevels.
          $('#hierarchical-select-'+ hsid +'-wrapper .hierarchical-select .selects select', Drupal.HierarchicalSelect.context)
          .slice(lastUnchanged)
          .remove();

          // The selection of this hierarchical select has changed!
          Drupal.HierarchicalSelect.triggerEvents(hsid, 'change-hierarchical-select', settings);
        });
      }
      break;
    
    case 'enforced-update':
      post = post.concat(settings.extraPost);
      break;

    case 'create-new-item':
    case 'cancel-new-item':
    case 'add-to-dropbox':
      post.push({ name : 'op', value : settings.opString });
      break;
  }

  // Construct the URL the request should be made to. GET arguments may not be
  // forgotten.
  var url = Drupal.settings.HierarchicalSelect.basePath + Drupal.settings.HierarchicalSelect.settings[hsid]['path'];
  if (Drupal.settings.HierarchicalSelect.getArguments.length > 0) {
    url += (url.indexOf('?') == -1) ? '?' : '&';
    url += Drupal.settings.HierarchicalSelect.getArguments;
  }

  // Construct the object that contains the options for a callback to the
  // server. If a client-side cache is found however, it's possible that this
  // won't be used.
  var ajaxOptions = {
    url:        url,
    type:       'POST',
    dataType:   'json',
    data:       post,
    beforeSend: function() {
      Drupal.HierarchicalSelect.triggerEvents(hsid, 'before-' + updateType, settings);
      Drupal.HierarchicalSelect.disableForm(hsid); 
    },
    //error: function (XMLHttpRequest, textStatus, errorThrown) {
      // When invalid HTML is received in Safari, jQuery calls this function.
      //Drupal.HierarchicalSelect.throwError(hsid, Drupal.t('Received an invalid response from the server.'));
    //},
    success:    function(response) {
      // When invalid HTML is received in Firefox, jQuery calls this function.
      //if ($('.hierarchical-select-wrapper > *', $(response.output)).length == 0) {
        //Drupal.HierarchicalSelect.throwError(hsid, Drupal.t('Received an invalid response from the server.'));
        //return;
      //}

      // Replace the old HTML with the (relevant part of) retrieved HTML.
      $('#hierarchical-select-'+ hsid +'-wrapper', Drupal.HierarchicalSelect.context)
      .removeClass('hierarchical-select-wrapper-processed')
      .html($('.hierarchical-select-wrapper > *', $(response.output)));

      // Attach behaviors. This is just after the HTML has been updated, so
      // it's as soon as we can.
      Drupal.attachBehaviors(Drupal.HierarchicalSelect.context);

      // Transform the hierarchical select and/or dropbox to the JS variant,
      // make it resizable again and re-enable the disabled form items.
      Drupal.HierarchicalSelect.enableForm(hsid);

      Drupal.HierarchicalSelect.postUpdateAnimations(hsid, updateType, lastUnchanged, function() {
        // Update the client-side cache when:
        // - information for in the cache is provided in the response, and
        // - the cache system is available, and
        // - the cache system is running.
        if (response.cache != null && Drupal.HierarchicalSelect.cache != null && Drupal.HierarchicalSelect.cache.status()) {
          Drupal.HierarchicalSelect.cache.sync(hsid, response.cache);
        }

        if (response.log != undefined) {
          Drupal.HierarchicalSelect.log(hsid, response.log);
        }

        Drupal.HierarchicalSelect.triggerEvents(hsid, updateType, settings);

        if (updateType == 'update-hierarchical-select') {
          // The selection of this hierarchical select has changed!
          Drupal.HierarchicalSelect.triggerEvents(hsid, 'change-hierarchical-select', settings);
        }
      });
    }
  };

  // Use the client-side cache to update the hierarchical select when:
  // - the hierarchical select is being updated (i.e. no add/remove), and
  // - the renderFlatSelect setting is disabled, and
  // - the createNewItems setting is disabled, and
  // - the cache system is available, and
  // - the cache system is running.
  // Otherwise, perform a normal dynamic form submit.
  if (updateType == 'update-hierarchical-select'
      && Drupal.settings.HierarchicalSelect.settings[hsid]['renderFlatSelect'] == false
      && Drupal.settings.HierarchicalSelect.settings[hsid]['createNewItems'] == false
      && Drupal.HierarchicalSelect.cache != null
      && Drupal.HierarchicalSelect.cache.status())
  {
    Drupal.HierarchicalSelect.cache.updateHierarchicalSelect(hsid, value, settings, lastUnchanged, ajaxOptions);
  }
  else {
    Drupal.HierarchicalSelect.preUpdateAnimations(hsid, updateType, lastUnchanged, function() {
      $.ajax(ajaxOptions);
    });
  }
};

Drupal.HierarchicalSelect.ajaxViewPagerSettingsUpdate = function(target, response) {
  $.extend(Drupal.settings.HierarchicalSelect.settings, response.hs_drupal_js_settings);
  Drupal.attachBehaviors($(target));
};

})(jQuery);
;
// $Id: hierarchical_select_formtoarray.js,v 1.3 2008/06/26 21:55:05 wimleers Exp $

/**
 * @file
 * Contains the formToArray method and the method it depends on. Taken from
 * jQuery Form Plugin 2.12. (http://www.malsup.com/jquery/form/)
 */

(function ($) {

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
    var a = [];
    if (this.length == 0) return a;

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) return a;
    for(var i=0, max=els.length; i < max; i++) {
        var el = els[i];
        var n = el.name;
        if (!n) continue;

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            continue;
        }

        var v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            for(var j=0, jmax=v.length; j < jmax; j++)
                a.push({name: n, value: v[j]});
        }
        else if (v !== null && typeof v != 'undefined')
            a.push({name: n, value: v});
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle them here
        var inputs = form.getElementsByTagName("input");
        for(var i=0, max=inputs.length; i < max; i++) {
            var input = inputs[i];
            var n = input.name;
            if(n && !input.disabled && input.type == "image" && form.clk == input)
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (typeof successful == 'undefined') successful = true;

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1))
            return null;

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) return null;
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                // extra pain for IE...
                var v = $.browser.msie && !(op.attributes['value'].specified) ? op.text : op.value;
                if (one) return v;
                a.push(v);
            }
        }
        return a;
    }
    return el.value;
};

})(jQuery);
;
/*
 * jQuery UI Effects 1.7.3
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */jQuery.effects||(function(d){d.effects={version:"1.7.3",save:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.data("ec.storage."+h[f],g[0].style[h[f]])}}},restore:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.css(h[f],g.data("ec.storage."+h[f]))}}},setMode:function(f,g){if(g=="toggle"){g=f.is(":hidden")?"show":"hide"}return g},getBaseline:function(g,h){var i,f;switch(g[0]){case"top":i=0;break;case"middle":i=0.5;break;case"bottom":i=1;break;default:i=g[0]/h.height}switch(g[1]){case"left":f=0;break;case"center":f=0.5;break;case"right":f=1;break;default:f=g[1]/h.width}return{x:f,y:i}},createWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent()}var g={width:f.outerWidth(true),height:f.outerHeight(true),"float":f.css("float")};f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var j=f.parent();if(f.css("position")=="static"){j.css({position:"relative"});f.css({position:"relative"})}else{var i=f.css("top");if(isNaN(parseInt(i,10))){i="auto"}var h=f.css("left");if(isNaN(parseInt(h,10))){h="auto"}j.css({position:f.css("position"),top:i,left:h,zIndex:f.css("z-index")}).show();f.css({position:"relative",top:0,left:0})}j.css(g);return j},removeWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent().replaceWith(f)}return f},setTransition:function(g,i,f,h){h=h||{};d.each(i,function(k,j){unit=g.cssUnit(j);if(unit[0]>0){h[j]=unit[0]*f+unit[1]}});return h},animateClass:function(h,i,k,j){var f=(typeof k=="function"?k:(j?j:null));var g=(typeof k=="string"?k:null);return this.each(function(){var q={};var o=d(this);var p=o.attr("style")||"";if(typeof p=="object"){p=p.cssText}if(h.toggle){o.hasClass(h.toggle)?h.remove=h.toggle:h.add=h.toggle}var l=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.addClass(h.add)}if(h.remove){o.removeClass(h.remove)}var m=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.removeClass(h.add)}if(h.remove){o.addClass(h.remove)}for(var r in m){if(typeof m[r]!="function"&&m[r]&&r.indexOf("Moz")==-1&&r.indexOf("length")==-1&&m[r]!=l[r]&&(r.match(/color/i)||(!r.match(/color/i)&&!isNaN(parseInt(m[r],10))))&&(l.position!="static"||(l.position=="static"&&!r.match(/left|top|bottom|right/)))){q[r]=m[r]}}o.animate(q,i,g,function(){if(typeof d(this).attr("style")=="object"){d(this).attr("style")["cssText"]="";d(this).attr("style")["cssText"]=p}else{d(this).attr("style",p)}if(h.add){d(this).addClass(h.add)}if(h.remove){d(this).removeClass(h.remove)}if(f){f.apply(this,arguments)}})})}};function c(g,f){var i=g[1]&&g[1].constructor==Object?g[1]:{};if(f){i.mode=f}var h=g[1]&&g[1].constructor!=Object?g[1]:(i.duration?i.duration:g[2]);h=d.fx.off?0:typeof h==="number"?h:d.fx.speeds[h]||d.fx.speeds._default;var j=i.callback||(d.isFunction(g[1])&&g[1])||(d.isFunction(g[2])&&g[2])||(d.isFunction(g[3])&&g[3]);return[g[0],i,h,j]}d.fn.extend({_show:d.fn.show,_hide:d.fn.hide,__toggle:d.fn.toggle,_addClass:d.fn.addClass,_removeClass:d.fn.removeClass,_toggleClass:d.fn.toggleClass,effect:function(g,f,h,i){return d.effects[g]?d.effects[g].call(this,{method:g,options:f||{},duration:h,callback:i}):null},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"show"))}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"hide"))}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(d.isFunction(arguments[0])||typeof arguments[0]=="boolean")){return this.__toggle.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"toggle"))}},addClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{add:g},f,i,h]):this._addClass(g)},removeClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{remove:g},f,i,h]):this._removeClass(g)},toggleClass:function(g,f,i,h){return((typeof f!=="boolean")&&f)?d.effects.animateClass.apply(this,[{toggle:g},f,i,h]):this._toggleClass(g,f)},morph:function(f,h,g,j,i){return d.effects.animateClass.apply(this,[{add:h,remove:f},g,j,i])},switchClass:function(){return this.morph.apply(this,arguments)},cssUnit:function(f){var g=this.css(f),h=[];d.each(["em","px","%","pt"],function(j,k){if(g.indexOf(k)>0){h=[parseFloat(g),k]}});return h}});d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(g,f){d.fx.step[f]=function(h){if(h.state==0){h.start=e(h.elem,f);h.end=b(h.end)}h.elem.style[f]="rgb("+[Math.max(Math.min(parseInt((h.pos*(h.end[0]-h.start[0]))+h.start[0],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[1]-h.start[1]))+h.start[1],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[2]-h.start[2]))+h.start[2],10),255),0)].join(",")+")"}});function b(g){var f;if(g&&g.constructor==Array&&g.length==3){return g}if(f=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)){return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)]}if(f=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)){return[parseFloat(f[1])*2.55,parseFloat(f[2])*2.55,parseFloat(f[3])*2.55]}if(f=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)){return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)]}if(f=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)){return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)]}if(f=/rgba\(0, 0, 0, 0\)/.exec(g)){return a.transparent}return a[d.trim(g).toLowerCase()]}function e(h,f){var g;do{g=d.curCSS(h,f);if(g!=""&&g!="transparent"||d.nodeName(h,"body")){break}f="backgroundColor"}while(h=h.parentNode);return b(g)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};d.easing.jswing=d.easing.swing;d.extend(d.easing,{def:"easeOutQuad",swing:function(g,h,f,j,i){return d.easing[d.easing.def](g,h,f,j,i)},easeInQuad:function(g,h,f,j,i){return j*(h/=i)*h+f},easeOutQuad:function(g,h,f,j,i){return -j*(h/=i)*(h-2)+f},easeInOutQuad:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h+f}return -j/2*((--h)*(h-2)-1)+f},easeInCubic:function(g,h,f,j,i){return j*(h/=i)*h*h+f},easeOutCubic:function(g,h,f,j,i){return j*((h=h/i-1)*h*h+1)+f},easeInOutCubic:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h+f}return j/2*((h-=2)*h*h+2)+f},easeInQuart:function(g,h,f,j,i){return j*(h/=i)*h*h*h+f},easeOutQuart:function(g,h,f,j,i){return -j*((h=h/i-1)*h*h*h-1)+f},easeInOutQuart:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h+f}return -j/2*((h-=2)*h*h*h-2)+f},easeInQuint:function(g,h,f,j,i){return j*(h/=i)*h*h*h*h+f},easeOutQuint:function(g,h,f,j,i){return j*((h=h/i-1)*h*h*h*h+1)+f},easeInOutQuint:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h*h+f}return j/2*((h-=2)*h*h*h*h+2)+f},easeInSine:function(g,h,f,j,i){return -j*Math.cos(h/i*(Math.PI/2))+j+f},easeOutSine:function(g,h,f,j,i){return j*Math.sin(h/i*(Math.PI/2))+f},easeInOutSine:function(g,h,f,j,i){return -j/2*(Math.cos(Math.PI*h/i)-1)+f},easeInExpo:function(g,h,f,j,i){return(h==0)?f:j*Math.pow(2,10*(h/i-1))+f},easeOutExpo:function(g,h,f,j,i){return(h==i)?f+j:j*(-Math.pow(2,-10*h/i)+1)+f},easeInOutExpo:function(g,h,f,j,i){if(h==0){return f}if(h==i){return f+j}if((h/=i/2)<1){return j/2*Math.pow(2,10*(h-1))+f}return j/2*(-Math.pow(2,-10*--h)+2)+f},easeInCirc:function(g,h,f,j,i){return -j*(Math.sqrt(1-(h/=i)*h)-1)+f},easeOutCirc:function(g,h,f,j,i){return j*Math.sqrt(1-(h=h/i-1)*h)+f},easeInOutCirc:function(g,h,f,j,i){if((h/=i/2)<1){return -j/2*(Math.sqrt(1-h*h)-1)+f}return j/2*(Math.sqrt(1-(h-=2)*h)+1)+f},easeInElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return -(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f},easeOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return h*Math.pow(2,-10*i)*Math.sin((i*l-j)*(2*Math.PI)/k)+m+f},easeInOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l/2)==2){return f+m}if(!k){k=l*(0.3*1.5)}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}if(i<1){return -0.5*(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f}return h*Math.pow(2,-10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k)*0.5+m+f},easeInBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*(h/=j)*h*((i+1)*h-i)+f},easeOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*((h=h/j-1)*h*((i+1)*h+i)+1)+f},easeInOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}if((h/=j/2)<1){return k/2*(h*h*(((i*=(1.525))+1)*h-i))+f}return k/2*((h-=2)*h*(((i*=(1.525))+1)*h+i)+2)+f},easeInBounce:function(g,h,f,j,i){return j-d.easing.easeOutBounce(g,i-h,0,j,i)+f},easeOutBounce:function(g,h,f,j,i){if((h/=i)<(1/2.75)){return j*(7.5625*h*h)+f}else{if(h<(2/2.75)){return j*(7.5625*(h-=(1.5/2.75))*h+0.75)+f}else{if(h<(2.5/2.75)){return j*(7.5625*(h-=(2.25/2.75))*h+0.9375)+f}else{return j*(7.5625*(h-=(2.625/2.75))*h+0.984375)+f}}}},easeInOutBounce:function(g,h,f,j,i){if(h<i/2){return d.easing.easeInBounce(g,h*2,0,j,i)*0.5+f}return d.easing.easeOutBounce(g,h*2-i,0,j,i)*0.5+j*0.5+f}})})(jQuery);;
/*
 * jQuery UI Effects Drop 1.7.3
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	effects.core.js
 */(function(a){a.effects.drop=function(b){return this.queue(function(){var e=a(this),d=["position","top","left","opacity"];var i=a.effects.setMode(e,b.options.mode||"hide");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e);var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true})/2:e.outerWidth({margin:true})/2);if(i=="show"){e.css("opacity",0).css(f,c=="pos"?-j:j)}var g={opacity:i=="show"?1:0};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;
