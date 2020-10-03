// $Id: views.js,v 1.8 2009/08/15 10:45:00 wimleers Exp $


/**
 * @file
 * Make Hierarchical Select work in Views' exposed filters form.
 *
 * Views' exposed filters form is a GET form, but since Hierarchical Select
 * really is a combination of various form items, this will result in a very
 * ugly and unnecessarily long GET URL, which also breaks the exposed filters.
 * This piece of JavaScript is a necessity to make it work again, but it will
 * of course only work when JavaScript is enabled!
 */


if (Drupal.jsEnabled) {
  $(document).ready(function(){
    $('.view-filters form').submit(function() {
      // Remove the Hierarchical Select form build id and the form id, to
      // prevent them from ending up in the GET URL.
      $('#edit-hs-form-build-id').remove();

      // Prepare the hierarchical select form elements that are used as
      // exposed filters for a GET submit.
      $('.view-filters form')
      .find('.hierarchical-select-wrapper')
      .trigger('prepare-GET-submit');
    });
  });
}
;
/**
 * @file base.js
 *
 * Some basic behaviors and utility functions for Views.
 */

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = function (context) {
  $('#views-tabset:not(.views-processed)').addClass('views-processed').each(function() {
    new Drupal.Views.Tabs($(this), {selectedClass: 'active'});
  });

  $('a.views-remove-link')
    .addClass('views-processed')
    .click(function() {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      return false;
    });
}

/**
 * For IE, attach some javascript so that our hovers do what they're supposed
 * to do.
 */
Drupal.behaviors.viewsHoverlinks = function() {
  if ($.browser.msie) {
    // If IE, attach a hover event so we can see our admin links.
    $("div.view:not(.views-hover-processed)").addClass('views-hover-processed').hover(
      function() {
        $('div.views-hide', this).addClass("views-hide-hover"); return true;
      },
      function(){
        $('div.views-hide', this).removeClass("views-hide-hover"); return true;
      }
    );
    $("div.views-admin-links:not(.views-hover-processed)")
      .addClass('views-hover-processed')
      .hover(
        function() {
          $(this).addClass("views-admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("views-admin-links-hover"); return true;
        }
      );
  }
}

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[pair[0]] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};
;
/**
 * @file dependent.js
 *
 * Written by dmitrig01 (Dmitri Gaskin) for Views; this provides dependent
 * visibility for form items in Views' ajax forms.
 *
 * To your $form item definition add:
 * - '#process' => array('views_process_dependency'),
 * - Add '#dependency' => array('id-of-form-item' => array(list, of, values, that,
     make, this, item, show),
 *
 * Special considerations:
 * - radios are harder. Because Drupal doesn't give radio groups individual ids,
 *   use 'radio:name-of-radio'
 *
 * - Checkboxes don't have their own id, so you need to add one in a div
 *   around the checkboxes via #prefix and #suffix. You actually need to add TWO
 *   divs because it's the parent that gets hidden. Also be sure to retain the
 *   'expand_checkboxes' in the #process array, because the views process will
 *   override it.
 */

Drupal.Views = Drupal.Views || {};

Drupal.Views.dependent = { bindings: {}, activeBindings: {}, activeTriggers: [] };

Drupal.Views.dependent.inArray = function(array, search_term) {
  var i = array.length;
  if (i > 0) {
   do {
    if (array[i] == search_term) {
       return true;
    }
   } while (i--);
  }
  return false;
}


Drupal.Views.dependent.autoAttach = function() {
  // Clear active bindings and triggers.
  if (Drupal.Views.dependent.activeTriggers.length > 0) {
    for (i in Drupal.Views.dependent.activeTriggers) {
      jQuery(Drupal.Views.dependent.activeTriggers[i]).unbind('change');
    }
  }
  Drupal.Views.dependent.activeTriggers = [];
  Drupal.Views.dependent.activeBindings = {};
  Drupal.Views.dependent.bindings = {};

  if (!Drupal.settings.viewsAjax) {
    return;
  }

  // Iterate through all relationships
  for (id in Drupal.settings.viewsAjax.formRelationships) {

    // Drupal.Views.dependent.activeBindings[id] is a boolean,
    // whether the binding is active or not.  Defaults to no.
    Drupal.Views.dependent.activeBindings[id] = 0;
    // Iterate through all possible values
    for(bind_id in Drupal.settings.viewsAjax.formRelationships[id].values) {
      // This creates a backward relationship.  The bind_id is the ID
      // of the element which needs to change in order for the id to hide or become shown.
      // The id is the ID of the item which will be conditionally hidden or shown.
      // Here we're setting the bindings for the bind
      // id to be an empty array if it doesn't already have bindings to it
      if (!Drupal.Views.dependent.bindings[bind_id]) {
        Drupal.Views.dependent.bindings[bind_id] = [];
      }
      // Add this ID
      Drupal.Views.dependent.bindings[bind_id].push(id);
      // Big long if statement.
      // Drupal.settings.viewsAjax.formRelationships[id].values[bind_id] holds the possible values

      if (bind_id.substring(0, 6) == 'radio:') {
        var trigger_id = "input[name='" + bind_id.substring(6) + "']";
      }
      else {
        var trigger_id = '#' + bind_id;
      }

      Drupal.Views.dependent.activeTriggers.push(trigger_id);

      if (jQuery(trigger_id).attr('type') == 'checkbox') {
        $(trigger_id).parent().addClass('hidden-options');
      }

      var getValue = function(item, trigger) {
        if (item.substring(0, 6) == 'radio:') {
          var val = jQuery(trigger + ':checked').val();
        }
        else {
          switch (jQuery(trigger).attr('type')) {
            case 'checkbox':
              var val = jQuery(trigger).attr('checked') || 0;

              if (val) {
                $(trigger).parent().removeClass('hidden-options').addClass('expanded-options');
              }
              else {
                $(trigger).parent().removeClass('expanded-options').addClass('hidden-options');
              }

              break;
            default:
              var val = jQuery(trigger).val();
          }
        }
        return val;
      }

      var setChangeTrigger = function(trigger_id, bind_id) {
        // Triggered when change() is clicked.
        var changeTrigger = function() {
          var val = getValue(bind_id, trigger_id);

          for (i in Drupal.Views.dependent.bindings[bind_id]) {
            var id = Drupal.Views.dependent.bindings[bind_id][i];

            // Fix numerous errors
            if (typeof id != 'string') {
              continue;
            }

            // This bit had to be rewritten a bit because two properties on the
            // same set caused the counter to go up and up and up.
            if (!Drupal.Views.dependent.activeBindings[id]) {
              Drupal.Views.dependent.activeBindings[id] = {};
            }

            if (Drupal.Views.dependent.inArray(Drupal.settings.viewsAjax.formRelationships[id].values[bind_id], val)) {
              Drupal.Views.dependent.activeBindings[id][bind_id] = 'bind';
            }
            else {
              delete Drupal.Views.dependent.activeBindings[id][bind_id];
            }

            var len = 0;
            for (i in Drupal.Views.dependent.activeBindings[id]) {
              len++;
            }

            var object = jQuery('#' + id + '-wrapper');
            if (!object.size()) {
              object = jQuery('#' + id).parent();
            }

            var rel_num = Drupal.settings.viewsAjax.formRelationships[id].num;
            if (typeof rel_num === 'object') {
              rel_num = Drupal.settings.viewsAjax.formRelationships[id].num[0];
            }

            if (rel_num <= len) {
              // Show if the element if criteria is matched
              object.show(0);
              object.addClass('dependent-options');
            }
            else {
              // Otherwise hide
              object.hide(0);
            }
          }
        }

        jQuery(trigger_id).change(function() {
          // Trigger the internal change function
          // the attr('id') is used because closures are more confusing
          changeTrigger(trigger_id, bind_id);
        });
        // Trigger initial reaction
        changeTrigger(trigger_id, bind_id);
      }
      setChangeTrigger(trigger_id, bind_id);
    }
  }
}

Drupal.behaviors.viewsDependent = function (context) {
  Drupal.Views.dependent.autoAttach();

  // Really large sets of fields are too slow with the above method, so this
  // is a sort of hacked one that's faster but much less flexible.
  $("select.views-master-dependent:not(.views-processed)")
    .addClass('views-processed')
    .change(function() {
      var val = $(this).val();
      if (val == 'all') {
        $('.views-dependent-all').show(0);
      }
      else {
        $('.views-dependent-all').hide(0);
        $('.views-dependent-' + val).show(0);
      }
    })
    .trigger('change');
}
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
