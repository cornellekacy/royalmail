(function ($, Drupal) {
  Drupal.retailer = Drupal.retailer || {};
  Drupal.behaviors.rmlTrackedReturnRetailerBehavior = function (context) {
        var links = $('div.delete-retailer a:not(.retailer-processed)', context);

        if (links.length > 0) {
            links.each(function() {
                var hrefArray = this.href.split('/'),
                // Grab the retailer delete URL from the href - the links are in the
                // structure http://domain/delete/retailer/%/confirm.
                    retailerId = hrefArray[5],
                    link = $(this),
                    dialog = $('<div id="delete-retailer-dialog-' + retailerId + '"></div>')
                      // @todo: These two Drupal.t items need converting to Drupal.nlt
                        .attr({'title' : Drupal.t('Are you sure you want to delete the retailer?')})
                        .html(Drupal.t('<p>This action cannot be undone!.</p>'));
                link.parent().append(dialog);

                // Build jQuery UI dialog.
                dialog.dialog({
                    autoOpen: false,
                    resizable: false,
                    draggable: false,
                    height: 200,
                    width: 400,
                    modal: true,
                    buttons: {
                        'Delete': function() {
                            Drupal.retailer.deleteRetailer(retailerId);
                            $(this).dialog('close');
                        },
                        Cancel: function() {
                            $(this).dialog('close');
                        }
                    },
                    open: function(event, ui) {
                        var dialog = $(event.target).parents(".ui-dialog.ui-widget");
                        var buttons = dialog.find(".ui-dialog-buttonpane").find("button");

                        // Using both add and remove to fix PIE issue in IE
                        $(buttons[0]).removeClass('primary right').addClass("primary right");
                        $(buttons[1]).addClass("secondary left");
                        Drupal.retailer.focusDialogRetailerAddEvents('delete-retailer-dialog-' + retailerId);
                    },
                    close: function(event, ui) {
                        Drupal.retailer.focusDialogRetailerRemoveEvents('delete-retailer-dialog-' + retailerId);
                        $('#delete-retailer' + retailerId).find('a').trigger('focus');
                    }
                });

                // Mark element as processed and attach event handlers.
                link.addClass('retailer-processed').click(function(event) {
                    event.preventDefault();
                    dialog.dialog('open');
                });
            });
        }
    };

    /**
     * Delete function, passes a retailer ID to the server for deletion via
     * AJAX.
     *
     * @see royalmail_redirections.delete.inc
     *
     * @param id
     *   The retailer ID to delete
     * @returns {boolean}
     */
    Drupal.retailer.deleteRetailer = function(id) {
        var url = Drupal.settings.basePath + 'delete/retailer/' + id + '/ajax';
        $.ajax({
            type: 'POST',
            url: url,
            data: {'js' : 1, 'ctools_ajax' : 1},
            global: true,
            success: Drupal.CTools.AJAX.respond,
            error: function(xhr) {
                Drupal.CTools.AJAX.handleErrors(xhr, url);
            },
            complete: function() {
            },
            dataType: 'json'
        });

        return false;
    };
    /**
     * Binds two functions to the 'keyup' and 'keydown' events
     * @param idDialogMessage
     */
    Drupal.retailer.focusDialogRetailerAddEvents = function(idDialogMessage) {
        Drupal.retailer.countTabEntry = 0;
        if ($('#' + idDialogMessage).length > 0) {
            $('html').bind('keyup', Drupal.retailer.focusDialogRetailerKeyUp)
                .bind('keydown', { idDialogMessage: idDialogMessage }, Drupal.retailer.focusDialogRetailerKeyDown);
        }
    };

    /**
     * Unbinds two functions to the 'keyup' and 'keydown' events
     * @param idDialogMessage
     */
    Drupal.retailer.focusDialogRetailerRemoveEvents = function(idDialogMessage) {
        if ($('#' + idDialogMessage).length > 0) {
            $('html').unbind('keyup', Drupal.retailer.focusDialogRetailerKeyUp)
                .unbind('keydown', Drupal.retailer.focusDialogRetailerKeyDown);
        }
    };

    /**
     * Stops the default action linked to the 'Tab' keyboard button
     * @param e
     * @returns {boolean}
     */
    Drupal.retailer.focusDialogRetailerKeyUp = function(e) {
        if (e.keyCode == 9) {
          // case 'Tab' keyboard button
          e.preventDefault();
          return false;
        }
    };

    /**
     * Keyboard focus is trapped within the Save & Exit overlay
     * @param e
     * @returns {boolean}
     */
    Drupal.retailer.focusDialogRetailerKeyDown = function(e) {
        if (e.keyCode == 9) {
            // case 'Tab' keyboard button
            e.preventDefault();
            var buttons = $('#' + e.data.idDialogMessage).parents('.ui-dialog').find(".ui-dialog-buttonpane");
            var button_close = $('#' + e.data.idDialogMessage).parents('.ui-dialog').find(".ui-dialog-titlebar-close");
            // 'Save and Exit' dialog button
            var button_save_exit = buttons.find('.ui-state-default').eq(0);
            // 'Cancel' dialog button
            var button_cancel = buttons.find('.ui-state-default').eq(1);
            var focus_class = "ui-state-focus";
            var hover_class = "ui-state-hover";
            if (Drupal.datacashSaveCard.countTabEntry == 0) {
                // 'Close' dialog button
                button_close.removeClass(focus_class).removeClass(hover_class);
                // 'Cancel' dialog button
                button_cancel.trigger('focus').addClass(focus_class).addClass(hover_class);
                Drupal.datacashSaveCard.countTabEntry = 1;
            }
            else if (Drupal.datacashSaveCard.countTabEntry == 1) {
                // 'Cancel' dialog button
                button_cancel.removeClass(focus_class).removeClass(hover_class);
                // 'Close' dialog button
                button_close.trigger('focus').addClass(focus_class).addClass(hover_class);
                Drupal.datacashSaveCard.countTabEntry = 2;
            }
            else if (Drupal.datacashSaveCard.countTabEntry == 2) {
                // 'Cancel' dialog button
                button_cancel.removeClass(focus_class).removeClass(hover_class);
                // 'Close' dialog button
                button_close.removeClass(focus_class).removeClass(hover_class);
                Drupal.datacashSaveCard.countTabEntry = 0;
            }
            return false;
        }
    }

})(jQuery, Drupal);
;
(function($, Drupal) {
  /**
   * Retrieve a string based on a node locale message id.
   *
   * Strings need to have been added to the page via node_locale_messages_to_js().
   * See the documentation of the server-side nlt() function for further details.
   * See also Drupal.t()
   *
   * @param key
   *   A string containing the message id to translate.
   * @param args
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   Based on the first character of the key, the value is escaped and/or themed:
   *    - !variable: inserted as is
   *    - @variable: escape plain text to HTML (Drupal.checkPlain)
   *    - %variable: escape text and theme as a placeholder for user-submitted
   *      content (checkPlain + Drupal.theme('placeholder'))
   * @return
   *   The translated string.
   */
  Drupal.nlt = function(key, args) {
    var str = key;

    // Fetch the localized version of the string.
    if (Drupal.settings.nodeLocaleMessages && Drupal.settings.nodeLocaleMessages[key]) {
      str = Drupal.settings.nodeLocaleMessages[key];
    }

    if (args) {
      // Transform arguments before inserting them
      for (var arg in args) {
        switch (arg.charAt(0)) {
          // Escaped only
          case '@':
            args[arg] = Drupal.checkPlain(args[arg]);
          break;
          // Pass-through
          case '!':
            break;
          // Escaped and placeholder
          case '%':
          default:
            args[arg] = Drupal.theme('placeholder', args[arg]);
            break;
        }
        str = str.replace(arg, args[arg]);
      }
    }

    return str;
  };

})(jQuery, Drupal);
;
Drupal.settings.inlineHelp = true;

(function ($, Drupal) {
  // Prevent errors when Tealium is disabled.
  var tealium_tag_overlay = window.tealium_tag_overlay || function () {
    };
  var utag_data = window.utag_data || {};

  Drupal.behaviors.rmlTrackedReturn = function (context) {
    $('input, select', context).not('.required-processed').filter('.required-field').each(function () {
      $(this).siblings('label').prepend('<span title="This field is required." class="req-field">*</span>');
    }).addClass('required-processed');

    var $span_form_clear = $('span.form-clear');
    $span_form_clear.toggle();
    $("#edit-search-keyword").bind("ajaxStart", function () {
      $span_form_clear.toggle();
    }).bind("ajaxStop", function () {
      $span_form_clear.show();
    });

    $span_form_clear.click(function () {
      $('#edit-search-keyword').val('');
      $span_form_clear.toggle();
    });
  };

  // Contextual help functionality
  Drupal.behaviors.rmlTrackedReturnContextualHelp = function (context) {
    // Use the contextual help link to toggle the state of the content.
    $('.rml-tracked-return-contextual-help-link', context).click(function () {
      var helpWrapper = $(this)
        .toggleClass('open')
        .closest('.rml-tracked-return-result')
        .find('.rml-tracked-return-contextual-help-wrapper');
      // Fix to stop IE and PIE.htc creating the 'floating button' effect.
      if ($.browser.msie && $.browser.version < 9) {
        var save = $('a.secondary[href="/user/login"]').hide();
        helpWrapper.slideToggle(400, function () {
          save.show();
        });
      }
      else {
        helpWrapper.slideToggle();
      }
    });
  };

  // Show hide size and no journey
  Drupal.behaviors.rmlTrackedReturnSizeAndNo = function (context) {
    if ($('.rmg-form-errors', context).length) {
      $('.retailer-yes').show();
      var pack_type = $('input:radio[name=package_shape]:checked').val();
      $('#' + pack_type + '-msg').show();
      $('.shape-msg').show();
      $('#edit-packages-package-size-yes').addClass('size-msg-button-active');

    }
    $(".package-type-radio").change(function () {
      $('.retailer-yes').hide();
    });
    $('#edit-package-shape-box', context).click(function () {
      $('.packages-msg-no-wrapper').hide();
      $('.size-msg-button-no').removeClass('size-msg-button-active');
      $('.shape-msg').show();
      $('.shape-image').removeClass('tube').addClass('box');
      $('#tube-msg').hide();
      $('#box-msg').show();
    });
    $('#edit-package-shape-tube', context).click(function () {
      $('.packages-msg-no-wrapper').hide();
      $('.size-msg-button-no').removeClass('size-msg-button-active');
      $('.shape-msg').show();
      $('.shape-image').removeClass('box').addClass('tube');
      $('#box-msg').hide();
      $('#tube-msg').show();
    });
    $('.size-msg-button-no', context).click(function () {
      $(this).addClass('size-msg-button-active');
      $('#edit-packages-package-size-yes').removeClass('size-msg-button-active');
      $('.packages-msg-no-wrapper').show();
      $('.retailer-yes').hide();
      return false;
    });

    $('#edit-packages-package-size-yes', context).click(function () {
      $('.retailer-yes').show();
      $('.size-msg-button-no').removeClass('size-msg-button-active');
      $('.packages-msg-no-wrapper').hide();
      $(this).addClass('size-msg-button-active');
      return false;
    });
  };

  /**
   * Triggers tealium tags when help dialog is opened
   *
   * Not in a behavior because content_overlay.js dialog attaches
   * behaviors after each run so gets in a loop.
   *
   * @param context
   */
  $("#content-dialog").live("dialogopen", function (event, ui) {
    var title = $($(this).dialog("option", "title")).text();
    var new_tag = [];

    new_tag['pageOverlayType'] = 'Help Article';
    new_tag['pageOverlayTitle'] = title;
    tealium_tag_overlay(new_tag);
  });

  /**
   * Trigger tealium tags when alternative postcode search is used.
   */
  $(document).bind('ajaxComplete', function (event, xhr, settings) {
    if (settings.data != null && typeof(window.utag_data) !== "undefined") {
      var ajax_call_data_settings = settings.data.split('&');
      // Check if the form id for the current ajax call is po finder
      if ($.inArray("form_id=rml_tracked_return_postoffice_finder_form", ajax_call_data_settings) > 0) {

        // Clean overlay tags
        delete window.utag_data.pageOverlayType;
        delete window.utag_data.pageOverlayTitle;

        // Check if there is an error message displayed and update tealium tags.
        var $error_message = $("#edit-form-search-postcode-wrapper .message");
        if ($error_message.length) {
          utag_data.pageApplicationStep = Drupal.settings.pageApplicationStep;
          utag_data.pageName = Drupal.settings.pageName;
          utag_data.pageErrorMessage = $error_message.text();
          utag_data.pageErrorType = 'Field Validation';
        }
        else {
          // Check if the new accordion div is on the page and if user has filled
          // a post code then update tealium tags.
          if ($(".po-finder-results .accordion").length && $("#edit-form-search-postcode").val().length > 0) {
            $('.accordion ul li h2 a').Accordian();
            utag_data.pageApplicationStep = Drupal.settings.pageApplicationStep;
            utag_data.pageName = Drupal.settings.pageName;
            // Reset errors tags
            utag_data.pageErrorMessage = "";
            utag_data.pageErrorType = "";
          }
        }
        // Update tealium tags.
        utag.view(utag_data);
      }
    }
  });
})
(jQuery, Drupal);
;

/**
 * Attaches the autocomplete behavior to all required fields
 */
Drupal.behaviors.autocomplete = function (context) {
  var acdb = [];
  $('input.autocomplete:not(.autocomplete-processed)', context).each(function () {
    var uri = this.value;
    if (!acdb[uri]) {
      acdb[uri] = new Drupal.ACDB(uri);
    }
    var input = $('#' + this.id.substr(0, this.id.length - 13))
      .attr('autocomplete', 'OFF')[0];
    $(input.form).submit(Drupal.autocompleteSubmit);
    new Drupal.jsAC(input, acdb[uri]);
    $(this).addClass('autocomplete-processed');
  });
};

/**
 * Prevents the form from submitting if the suggestions popup is open
 * and closes the suggestions popup when doing so.
 */
Drupal.autocompleteSubmit = function () {
  return $('#autocomplete').each(function () {
    this.owner.hidePopup();
  }).size() == 0;
};

/**
 * An AutoComplete object
 */
Drupal.jsAC = function (input, db) {
  var ac = this;
  this.input = input;
  this.db = db;

  $(this.input)
    .keydown(function (event) { return ac.onkeydown(this, event); })
    .keyup(function (event) { ac.onkeyup(this, event); })
    .blur(function () { ac.hidePopup(); ac.db.cancel(); });

};

/**
 * Handler for the "keydown" event
 */
Drupal.jsAC.prototype.onkeydown = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 40: // down arrow
      this.selectDown();
      return false;
    case 38: // up arrow
      this.selectUp();
      return false;
    default: // all other keys
      return true;
  }
};

/**
 * Handler for the "keyup" event
 */
Drupal.jsAC.prototype.onkeyup = function (input, e) {
  if (!e) {
    e = window.event;
  }
  switch (e.keyCode) {
    case 16: // shift
    case 17: // ctrl
    case 18: // alt
    case 20: // caps lock
    case 33: // page up
    case 34: // page down
    case 35: // end
    case 36: // home
    case 37: // left arrow
    case 38: // up arrow
    case 39: // right arrow
    case 40: // down arrow
      return true;

    case 9:  // tab
    case 13: // enter
    case 27: // esc
      this.hidePopup(e.keyCode);
      return true;

    default: // all other keys
      if (input.value.length > 0)
        this.populatePopup();
      else
        this.hidePopup(e.keyCode);
      return true;
  }
};

/**
 * Puts the currently highlighted suggestion into the autocomplete field
 */
Drupal.jsAC.prototype.select = function (node) {
  this.input.value = node.autocompleteValue;
};

/**
 * Highlights the next suggestion
 */
Drupal.jsAC.prototype.selectDown = function () {
  if (this.selected && this.selected.nextSibling) {
    this.highlight(this.selected.nextSibling);
  }
  else {
    var lis = $('li', this.popup);
    if (lis.size() > 0) {
      this.highlight(lis.get(0));
    }
  }
};

/**
 * Highlights the previous suggestion
 */
Drupal.jsAC.prototype.selectUp = function () {
  if (this.selected && this.selected.previousSibling) {
    this.highlight(this.selected.previousSibling);
  }
};

/**
 * Highlights a suggestion
 */
Drupal.jsAC.prototype.highlight = function (node) {
  if (this.selected) {
    $(this.selected).removeClass('selected');
  }
  $(node).addClass('selected');
  this.selected = node;
};

/**
 * Unhighlights a suggestion
 */
Drupal.jsAC.prototype.unhighlight = function (node) {
  $(node).removeClass('selected');
  this.selected = false;
};

/**
 * Hides the autocomplete suggestions
 */
Drupal.jsAC.prototype.hidePopup = function (keycode) {
  // Select item if the right key or mousebutton was pressed
  if (this.selected && ((keycode && keycode != 46 && keycode != 8 && keycode != 27) || !keycode)) {
    this.input.value = this.selected.autocompleteValue;
  }
  // Hide popup
  var popup = this.popup;
  if (popup) {
    this.popup = null;
    $(popup).fadeOut('fast', function() { $(popup).remove(); });
  }
  this.selected = false;
};

/**
 * Positions the suggestions popup and starts a search
 */
Drupal.jsAC.prototype.populatePopup = function () {
  // Show popup
  if (this.popup) {
    $(this.popup).remove();
  }
  this.selected = false;
  this.popup = document.createElement('div');
  this.popup.id = 'autocomplete';
  this.popup.owner = this;
  $(this.popup).css({
    marginTop: this.input.offsetHeight +'px',
    width: (this.input.offsetWidth - 4) +'px',
    display: 'none'
  });
  $(this.input).before(this.popup);

  // Do search
  this.db.owner = this;
  this.db.search(this.input.value);
};

/**
 * Fills the suggestion popup with any matches received
 */
Drupal.jsAC.prototype.found = function (matches) {
  // If no value in the textfield, do not show the popup.
  if (!this.input.value.length) {
    return false;
  }

  // Prepare matches
  var ul = document.createElement('ul');
  var ac = this;
  for (key in matches) {
    var li = document.createElement('li');
    $(li)
      .html('<div>'+ matches[key] +'</div>')
      .mousedown(function () { ac.select(this); })
      .mouseover(function () { ac.highlight(this); })
      .mouseout(function () { ac.unhighlight(this); });
    li.autocompleteValue = key;
    $(ul).append(li);
  }

  // Show popup with matches, if any
  if (this.popup) {
    if (ul.childNodes.length > 0) {
      $(this.popup).empty().append(ul).show();
    }
    else {
      $(this.popup).css({visibility: 'hidden'});
      this.hidePopup();
    }
  }
};

Drupal.jsAC.prototype.setStatus = function (status) {
  switch (status) {
    case 'begin':
      $(this.input).addClass('throbbing');
      break;
    case 'cancel':
    case 'error':
    case 'found':
      $(this.input).removeClass('throbbing');
      break;
  }
};

/**
 * An AutoComplete DataBase object
 */
Drupal.ACDB = function (uri) {
  this.uri = uri;
  this.delay = 300;
  this.cache = {};
};

/**
 * Performs a cached and delayed search
 */
Drupal.ACDB.prototype.search = function (searchString) {
  var db = this;
  this.searchString = searchString;

  // See if this string needs to be searched for anyway. The pattern ../ is
  // stripped since it may be misinterpreted by the browser.
  searchString = searchString.replace(/^\s+|\.{2,}\/|\s+$/g, '');
  // Skip empty search strings, or search strings ending with a comma, since
  // that is the separator between search terms.
  if (searchString.length <= 0 ||
    searchString.charAt(searchString.length - 1) == ',') {
    return;
  }

  // See if this key has been searched for before
  if (this.cache[searchString]) {
    return this.owner.found(this.cache[searchString]);
  }

  // Initiate delayed search
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.timer = setTimeout(function() {
    db.owner.setStatus('begin');

    // Ajax GET request for autocompletion
    $.ajax({
      type: "GET",
      url: db.uri +'/'+ Drupal.encodeURIComponent(searchString),
      dataType: 'json',
      success: function (matches) {
        if (typeof matches['status'] == 'undefined' || matches['status'] != 0) {
          db.cache[searchString] = matches;
          // Verify if these are still the matches the user wants to see
          if (db.searchString == searchString) {
            db.owner.found(matches);
          }
          db.owner.setStatus('found');
        }
      },
      error: function (xmlhttp) {
        alert(Drupal.ahahError(xmlhttp, db.uri));
      }
    });
  }, this.delay);
};

/**
 * Cancels the current autocomplete request
 */
Drupal.ACDB.prototype.cancel = function() {
  if (this.owner) this.owner.setStatus('cancel');
  if (this.timer) clearTimeout(this.timer);
  this.searchString = '';
};
;
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
