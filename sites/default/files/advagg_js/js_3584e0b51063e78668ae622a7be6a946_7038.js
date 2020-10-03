(function ($) {

  Drupal.redirections = Drupal.redirections || {};

  Drupal.redirections.countTabEntry = 0;

  /**
   * Save and Exit button dialog confirmation.
   * @param context
   */
  Drupal.behaviors.royalmailRedirectionsSaveAndExit = function(context) {

    var save = $('input[name="op_save"]:not(.save-processed):first', context);

    // When address step form gets rebuild more than once, multiple dailog
    // boxes were getting created. Hence, fix is added for not creating the
    // dialog box if present.
    if (save.length > 0) {
      if ($('#save-and-exit-dialog', context).length > 0) {
        $('#save-and-exit-dialog', context).remove();
      }
      var dialog = $('<div id="save-and-exit-dialog"></div>');
      dialog.attr({'title': Drupal.t('Are you sure you want to save and exit this application?')})
        .html(Drupal.nlt('royalmail_redirections.save_and_exit'));
      save.parent().append(dialog);

      dialog.dialog({
        autoOpen: false,
        resizable: false,
        draggable: false,
        width: 400,
        modal: true,
        buttons: {
          'Save and Exit': function() {
            save.unbind("click");
            save.click();
          },
          Cancel: function() {
            $(this).dialog("close");
          }
        },
        open: function(event, ui) {
          var dialog = $(event.target).parents(".ui-dialog.ui-widget");
          var buttons = dialog.find(".ui-dialog-buttonpane").find("button");
          // Using both add and remove to fix PIE issue in IE
          $(buttons[0]).removeClass('primary right').addClass("primary right");
          $(buttons[1]).addClass("secondary left");
          Drupal.redirections.focusDialogRedirectionAddEvents('save-and-exit-dialog');
        },
        close: function(event, ui) {
          Drupal.redirections.focusDialogRedirectionRemoveEvents('save-and-exit-dialog');
          $('#edit-buttons-save-and-exit').trigger('focus');
        }
      });

      save.addClass('save-processed').click(function(event) {
        event.preventDefault();
        dialog.dialog('open');
      });

    }

  };

  /**
   * Attach dialog to 'delete redirection' links.
   * @param context
   */
  Drupal.behaviors.royalmailRedirectionsDelete = function(context) {
    var links = $('div.delete-redirect a:not(.redirections-processed)', context);

    if (links.length > 0) {
      links.each(function() {
        var hrefArray = this.href.split('/'),
        // Grab the redirection URL from the href - the links are in the
        // structure http://domain/redirections/new/delete/%/confirm.
        redirectionId = hrefArray[6],
        link = $(this),
        dialog = $('<div id="delete-redirection-dialog-' + redirectionId + '"></div>')
                    .attr({'title' : Drupal.t('Are you sure you want to delete this application?')})
                    .html(Drupal.t('<p>Any details you have entered for this application will be lost.</p>'));
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
              Drupal.redirections.deleteRedirection(redirectionId);
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
            Drupal.redirections.focusDialogRedirectionAddEvents('delete-redirection-dialog-' + redirectionId);
          },
          close: function(event, ui) {
            Drupal.redirections.focusDialogRedirectionRemoveEvents('delete-redirection-dialog-' + redirectionId);
            $('#saved-redirection-' + redirectionId).find('a').trigger('focus');
          }
        });

        // Mark element as processed and attach event handlers.
        link.addClass('redirections-processed').click(function(event) {
          event.preventDefault();
          dialog.dialog('open');
        });
      });
    }
  };

  /**
   * Delete function, passes a redirection ID to the server for deletion via
   * AJAX.
   *
   * @see royalmail_redirections.delete.inc
   *
   * @param id
   *   The redirection ID to delete
   * @returns {boolean}
   */
  Drupal.redirections.deleteRedirection = function(id) {
    var url = Drupal.settings.basePath + 'delete/redirections/new/' + id + '/ajax';
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
  Drupal.redirections.focusDialogRedirectionAddEvents = function(idDialogMessage) {
    Drupal.redirections.countTabEntry = 0;
    if ($('#' + idDialogMessage).length > 0) {
      $('html').bind('keyup', Drupal.redirections.focusDialogRedirectionKeyUp)
      .bind('keydown', { idDialogMessage: idDialogMessage }, Drupal.redirections.focusDialogRedirectionKeyDown);
    }
  };

  /**
   * Unbinds two functions to the 'keyup' and 'keydown' events
   * @param idDialogMessage
   */
  Drupal.redirections.focusDialogRedirectionRemoveEvents = function(idDialogMessage) {
    if ($('#' + idDialogMessage).length > 0) {
      $('html').unbind('keyup', Drupal.redirections.focusDialogRedirectionKeyUp)
      .unbind('keydown', Drupal.redirections.focusDialogRedirectionKeyDown);
    }
  };

  /**
   * Stops the default action linked to the 'Tab' keyboard button
   * @param e
   * @returns {boolean}
   */
  Drupal.redirections.focusDialogRedirectionKeyUp = function(e) {
    if (e.keyCode == 9) { // case 'Tab' keyboard button
      e.preventDefault();
      return false;
    }
  }

  /**
   * Keyboard focus is trapped within the Save & Exit overlay
   * @param e
   * @returns {boolean}
   */
  Drupal.redirections.focusDialogRedirectionKeyDown = function(e) {
    if (e.keyCode == 9) { // case 'Tab' keyboard button
      e.preventDefault();
      var buttons = $('#' + e.data.idDialogMessage).parents('.ui-dialog').find(".ui-dialog-buttonpane");
      var button_close = $('#' + e.data.idDialogMessage).parents('.ui-dialog').find(".ui-dialog-titlebar-close");
      var button_save_exit = buttons.find('.ui-state-default').eq(0);  // 'Save and Exit' dialog button
      var button_cancel = buttons.find('.ui-state-default').eq(1);  // 'Cancel' dialog button
      var focus_class = "ui-state-focus";
      var hover_class = "ui-state-hover";
      if ( Drupal.redirections.countTabEntry == 0 ) {
        button_save_exit.removeClass(focus_class).removeClass(hover_class);  // 'Save and Exit' dialog button
        button_close.removeClass(focus_class).removeClass(hover_class);  // 'Close' dialog button
        button_cancel.trigger('focus').addClass(focus_class).addClass(hover_class);  // 'Cancel' dialog button
        Drupal.redirections.countTabEntry = 1;
      }
      else if ( Drupal.redirections.countTabEntry == 1 ) {
        button_cancel.removeClass(focus_class).removeClass(hover_class);  // 'Cancel' dialog button
        button_save_exit.removeClass(focus_class).removeClass(hover_class);  // 'Save and Exit' dialog button
        button_close.trigger('focus').addClass(focus_class).addClass(hover_class);  // 'Close' dialog button
        Drupal.redirections.countTabEntry = 2;
      }
      else if ( Drupal.redirections.countTabEntry == 2 ) {
        button_cancel.removeClass(focus_class).removeClass(hover_class);  // 'Cancel' dialog button
        button_close.removeClass(focus_class).removeClass(hover_class);  // 'Close' dialog button
        button_save_exit.trigger('focus').addClass(focus_class).addClass(hover_class);  // 'Save and Exit' dialog button
        Drupal.redirections.countTabEntry = 0;
      }
      return false;
    }
  }

})(jQuery);
;
/**
 * @file
 *
 * CTools flexible AJAX responder object.
 */

(function ($) {
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.AJAX = Drupal.CTools.AJAX || {};
  Drupal.CTools.AJAX.commands = Drupal.CTools.AJAX.commands || {};
  Drupal.CTools.AJAX.commandCache = Drupal.CTools.AJAX.commandCache || {};
  Drupal.CTools.AJAX.scripts = {};
  Drupal.CTools.AJAX.css = {};
  Drupal.settings.CToolsUrlIsAjaxTrusted = Drupal.settings.CToolsUrlIsAjaxTrusted || {};

  /**
   * Success callback for an ajax request.
   *
   * This function expects to receive a packet of data from a JSON object
   * which is essentially a list of commands. Each commands must have a
   * 'command' setting and this setting must resolve to a function in the
   * Drupal.CTools.AJAX.commands space.
   */
  Drupal.CTools.AJAX.respond = function(data) {
    var i;
    for (i in data) {
      if (data[i]['command'] && Drupal.CTools.AJAX.commands[data[i]['command']]) {
        Drupal.CTools.AJAX.commands[data[i]['command']](data[i]);
      }
    }
  };

  /**
   * Grab the response from the server and store it.
   */
  Drupal.CTools.AJAX.warmCache = function () {
    // Store this expression for a minor speed improvement.
    var $this = $(this),
        old_url = $this.attr('href');
    // If we are currently fetching, or if we have fetched this already which is
    // ideal for things like pagers, where the previous page might already have
    // been seen in the cache.
    if ($this.hasClass('ctools-fetching') || !Drupal.CTools.AJAX.urlIsLocal(old_url) || Drupal.CTools.AJAX.commandCache[old_url]) {
      return false;
    }

    // Grab all the links that match this url and add the fetching class.
    // This allows the caching system to grab each url once and only once
    // instead of grabbing the url once per <a>.
    var $objects = $('a[href="' + old_url + '"]');
    $objects.addClass('ctools-fetching');
    try {
      var url = Drupal.CTools.AJAX.urlReplaceNojs(url);
      var ajaxOptions = {
        type: "POST",
        url: url,
        data: { 'js': 1, 'ctools_ajax': 1},
        global: true,
        success: function (data) {
          if (!Drupal.CTools.AJAX.isAjaxResponseTrusted(ajaxOptions.cXhr, url)) {
            return this.error(ajaxOptions.cXhr);
          }

          Drupal.CTools.AJAX.commandCache[old_url] = data;
          $objects.addClass('ctools-cache-warmed').trigger('ctools-cache-warm', [data]);
        },
        beforeSend: Drupal.CTools.AJAX.beforeSend,
        complete: function() {
          $objects.removeClass('ctools-fetching');
        },
        dataType: 'json'
      };
      $.ajax(ajaxOptions);
    }
    catch (err) {
      $objects.removeClass('ctools-fetching');
      return false;
    }

    return false;
  };

  /**
   * Cachable click handler to fetch the commands out of the cache or from url.
   */
  Drupal.CTools.AJAX.clickAJAXCacheLink = function () {
    var $this = $(this);
    if ($this.hasClass('ctools-fetching')) {
      $this.bind('ctools-cache-warm', function (event, data) {
        Drupal.CTools.AJAX.respond(data);
      });
      return false;
    }
    else {
      if ($this.hasClass('ctools-cache-warmed') && Drupal.CTools.AJAX.commandCache[$this.attr('href')]) {
        Drupal.CTools.AJAX.respond(Drupal.CTools.AJAX.commandCache[$this.attr('href')]);
        return false;
      }
      else {
        return Drupal.CTools.AJAX.clickAJAXLink.apply(this);
      }
    }
  };

  /**
   * Generic replacement click handler to open the modal with the destination
   * specified by the href of the link.
   */
  Drupal.CTools.AJAX.clickAJAXLink = function() {
    if ($(this).hasClass('ctools-ajaxing')) {
      return false;
    }

    var url = $(this).attr('href');
    if (!Drupal.CTools.AJAX.urlIsLocal(url)) {
      return false;
    }
    $(this).addClass('ctools-ajaxing');
    try {
      url = Drupal.CTools.AJAX.urlReplaceNojs(url);
      $.ajax({
        type: "POST",
        url: url,
        data: { 'js': 1, 'ctools_ajax': 1},
        global: true,
        success: Drupal.CTools.AJAX.success,
        beforeSend: Drupal.CTools.AJAX.beforeSend,
        error: function(xhr) {
          Drupal.CTools.AJAX.handleErrors(xhr, url);
        },
        complete: function() {
          $('.ctools-ajaxing').removeClass('ctools-ajaxing');
        },
        dataType: 'json'
      });
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $('.ctools-ajaxing').removeClass('ctools-ajaxing');
      return false;
    }

    return false;
  };

  /**
   * Generic replacement click handler to open the modal with the destination
   * specified by the href of the link.
   */
  Drupal.CTools.AJAX.clickAJAXButton = function() {
    if ($(this).hasClass('ctools-ajaxing')) {
      return false;
    }

    // Put our button in.
    this.form.clk = this;

    var url = Drupal.CTools.AJAX.findURL(this);
    $(this).addClass('ctools-ajaxing');
    try {
      if (url) {
        url = Drupal.CTools.AJAX.urlReplaceNojs(url);
        $.ajax({
          type: "POST",
          url: url,
          data: { 'js': 1, 'ctools_ajax': 1},
          global: true,
          success: Drupal.CTools.AJAX.success,
          beforeSend: Drupal.CTools.AJAX.beforeSend,
          error: function(xhr) {
            Drupal.CTools.AJAX.handleErrors(xhr, url);
          },
          complete: function() {
            $('.ctools-ajaxing').removeClass('ctools-ajaxing');
          },
          dataType: 'json'
        });
      }
      else {
        var form = this.form;
        url = $(form).attr('action');
        setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit(form, url); }, 1);
      }
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $(this).removeClass('ctools-ajaxing');
      return false;
    }
    return false;
  };

  /**
   * Helper method to stash the xhr object so it is available in the success callback.
   */
  Drupal.CTools.AJAX.beforeSend = function(xhr) {
    this.cXhr = xhr;
  };

  /**
   * Respond wrapper that checks security of the request.
   */
  Drupal.CTools.AJAX.success = function(data) {
    if (data !== null && !Drupal.CTools.AJAX.isAjaxResponseTrusted(this.cXhr, this.url)) {
      return this.error(this.cXhr);
    }
    Drupal.CTools.AJAX.respond(data);
  };

  Drupal.CTools.AJAX.isAjaxResponseTrusted = function(xhr, url) {
    return Drupal.settings.CToolsUrlIsAjaxTrusted[url] || (Drupal.CTools.AJAX.urlIsLocal(url) && xhr.getResponseHeader('X-Drupal-Ajax-Token') === '1');
  };

  /**
   * Event handler to submit an AJAX form.
   *
   * Using a secondary event ensures that our form submission is last, which
   * is needed when submitting wysiwyg controlled forms, for example.
   */
  Drupal.CTools.AJAX.ajaxSubmit = function (form, url) {
    var $form = $(form);

    if ($form.hasClass('ctools-ajaxing')) {
      return false;
    }

    $form.addClass('ctools-ajaxing');

    try {
      url = Drupal.CTools.AJAX.urlReplaceNojs(url);

      var ajaxOptions = {
        type: 'POST',
        url: url,
        data: { 'js': 1, 'ctools_ajax': 1},
        global: true,
        success: function(data) {
          Drupal.CTools.AJAX.success.apply(ajaxOptions, [data]);
        },
        beforeSend: function (xhr) {
          Drupal.CTools.AJAX.beforeSend.apply(ajaxOptions, [xhr]);
        },
        error: function(xhr) {
          Drupal.CTools.AJAX.handleErrors(xhr, url);
        },
        complete: function() {
          $('.ctools-ajaxing').removeClass('ctools-ajaxing');
          $('div.ctools-ajaxing-temporary').remove();
        },
        dataType: 'json'
      };

      // If the form requires uploads, use an iframe instead and add data to
      // the submit to support this and use the proper response.
      if ($form.attr('enctype') == 'multipart/form-data') {
        $form.append('<input type="hidden" name="ctools_multipart" value="1">');
        var ajaxIframeOptions = {
          success: function(data) {
            if (!Drupal.CTools.AJAX.isAjaxResponseTrusted(ajaxOptions.cXhr, url)) {
              return this.error(ajaxOptions.cXhr);
            }

            Drupal.CTools.AJAX.iFrameJsonRespond(data);
          },
          iframe: true
        };
        ajaxOptions = $.extend(ajaxOptions, ajaxIframeOptions);
      }

      $form.ajaxSubmit(ajaxOptions);
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $('.ctools-ajaxing').removeClass('ctools-ajaxing');
      $('div.ctools-ajaxing-temporary').remove();
      return false;
    }
  };

  /**
   * Wrapper for handling JSON responses from an iframe submission
   */
  Drupal.CTools.AJAX.iFrameJsonRespond = function(data) {
    var myJson = eval(data);
    Drupal.CTools.AJAX.respond(myJson);
  };

  /**
   * Display error in a more fashion way
   */
  Drupal.CTools.AJAX.handleErrors = function(xhr, path) {
    var error_text = '';

    if ((xhr.status == 500 && xhr.responseText) || xhr.status == 200) {
      error_text = xhr.responseText;

      // Replace all &lt; and &gt; by < and >
      error_text = error_text.replace("/&(lt|gt);/g", function (m, p) {
        return (p == "lt")? "<" : ">";
      });

      // Now, replace all html tags by empty spaces
      error_text = error_text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,"");

      // Fix end lines
      error_text = error_text.replace(/[\n]+\s+/g,"\n");
    }
    else if (xhr.status == 500) {
      error_text = xhr.status + ': ' + Drupal.t("Internal server error. Please see server or PHP logs for error information.");
    }
    else {
      error_text = xhr.status + ': ' + xhr.statusText;
    }

    alert(Drupal.t("An error occurred at @path.\n\nError Description: @error", {'@path': path, '@error': error_text}));
  };

  /**
   * Generic replacement for change handler to execute ajax method.
   */
  Drupal.CTools.AJAX.changeAJAX = function () {
    if ($(this).hasClass('ctools-ajaxing')) {
      return false;
    }

    var url = Drupal.CTools.AJAX.findURL(this);
    $(this).addClass('ctools-ajaxing');
    var $object = $(this);
    var form_id = $object.parents('form').get(0).id;
    try {
      if (url) {
        url = Drupal.CTools.AJAX.urlReplaceNojs(url);
        $.ajax({
          type: "POST",
          url: url,
          data: {'ctools_changed': $(this).val(), 'js': 1, 'ctools_ajax': 1 },
          global: true,
          success: Drupal.CTools.AJAX.success,
          beforeSend: Drupal.CTools.AJAX.beforeSend,
          error: function(xhr) {
            Drupal.CTools.AJAX.handleErrors(xhr, url);
          },
          complete: function() {
            $('.ctools-ajaxing').removeClass('ctools-ajaxing');
            if ($(object).hasClass('ctools-ajax-submit-onchange')) {
              $('form#' + form_id).submit();
            }
          },
          dataType: 'json'
        });
      }
      else {
        if ($object.hasClass('ctools-ajax-submit-onchange')) {
          $('form#' + form_id).submit();
        }
        return false;
      }
    }
    catch (err) {
      alert("An error occurred while attempting to process " + url);
      $('.ctools-ajaxing').removeClass('ctools-ajaxing');
      return false;
    }
    return false;
  };

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.AJAX.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        if (url && $(this).val()) {
          url += '/';
        }
        url += $(this).val();
      });
    return Drupal.CTools.AJAX.urlIsLocal(url) ? url : '/';
  };

  Drupal.CTools.AJAX.getPath = function (link) {
    if (!link) {
      return;
    }

    var index = link.indexOf('?');
    if (index != -1) {
      link = link.substr(0, index);
    }

    return link;
  };

  Drupal.CTools.AJAX.commands.prepend = function(data) {
    $(data.selector).prepend(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.append = function(data) {
    $(data.selector).append(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.replace = function(data) {
    $(data.selector).replaceWith(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.after = function(data) {
    var object = $(data.data);
    $(data.selector).after(object);
    Drupal.attachBehaviors(object);
  };

  Drupal.CTools.AJAX.commands.before = function(data) {
    var object = $(data.data);
    $(data.selector).before(object);
    Drupal.attachBehaviors(object);
  };

  Drupal.CTools.AJAX.commands.html = function(data) {
    $(data.selector).html(data.data);
    Drupal.attachBehaviors($(data.selector));
  };

  Drupal.CTools.AJAX.commands.remove = function(data) {
    $(data.selector).remove();
  };

  Drupal.CTools.AJAX.commands.changed = function(data) {
    if (!$(data.selector).hasClass('changed')) {
      $(data.selector).addClass('changed');
      if (data.star) {
        $(data.selector).find(data.star).append(' <span class="star">*</span> ');
      }
    }
  };

  Drupal.CTools.AJAX.commands.alert = function(data) {
    alert(data.text, data.title);
  };

  Drupal.CTools.AJAX.commands.css = function(data) {
  /*
    if (data.selector && data.selector.contains('* html ')) {
      // This indicates an IE hack and we should only do it if we are IE.
      if (!jQuery.browser.msie) {
        return;
      }
      data.selector = data.selector.replace('* html ', '');
    }
  */
    $(data.selector).css(data.argument);
  };

  Drupal.CTools.AJAX.commands.css_files = function(data) {
    // Build a list of css files already loaded:
    $('link:not(.ctools-temporary-css)').each(function () {
      if ($(this).attr('type') == 'text/css') {
        var href = $(this).attr('href');
        var link = Drupal.CTools.AJAX.getPath(href);
        if (link && Drupal.CTools.AJAX.urlIsLocal(href)) {
          Drupal.CTools.AJAX.css[link] = href;
        }
      }
    });

    var html = '';
    for (var i = 0; i < data.argument.length; i++) {
      var link = Drupal.CTools.AJAX.getPath(data.argument[i].file);
      if (!Drupal.CTools.AJAX.css[link]) {
        html += '<link class="ctools-temporary-css" type="text/css" rel="stylesheet" media="' + data.argument[i].media +
          '" href="' + data.argument[i].file + '" />';
      }
    }

    if (html) {
      $('link.ctools-temporary-css').remove();
      $('body').append($(html));
    }
  };

  Drupal.CTools.AJAX.commands.settings = function(data) {
    $.extend(Drupal.settings, data.argument);
  };

  Drupal.CTools.AJAX.commands.scripts = function(data) {
    // Build a list of scripts already loaded:
    $('script').each(function () {
      var link = Drupal.CTools.AJAX.getPath($(this).attr('src'));
      if (link) {
        Drupal.CTools.AJAX.scripts[link] = $(this).attr('src');
      }
    });

    var html = '',
        head = document.getElementsByTagName('head')[0];
    for (var i = 0; i < data.argument.length; i++) {
      var link = Drupal.CTools.AJAX.getPath(data.argument[i]);
      if (!Drupal.CTools.AJAX.scripts[link]) {
        Drupal.CTools.AJAX.scripts[link] = link;
        // Use this to actually get the script tag into the dom, which is
        // needed for scripts that self-reference to determine paths.
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = data.argument[i];
        head.appendChild(script);
        html += '<script type="text/javascript" src="' + data.argument[i] + '"></script>';
      }
    }

    if (html) {
      $('body').append($(html));
    }
  };

  Drupal.CTools.AJAX.commands.data = function(data) {
    $(data.selector).data(data.name, data.value);
  };

  Drupal.CTools.AJAX.commands.attr = function(data) {
    $(data.selector).attr(data.name, data.value);
  };

  Drupal.CTools.AJAX.commands.restripe = function(data) {
    // :even and :odd are reversed because jquery counts from 0 and
    // we count from 1, so we're out of sync.
    $('tbody tr:not(:hidden)', $(data.selector))
      .removeClass('even')
      .removeClass('odd')
      .filter(':even')
        .addClass('odd')
      .end()
      .filter(':odd')
        .addClass('even');
  };

  Drupal.CTools.AJAX.commands.redirect = function(data) {
    if (data.delay > 0) {
      setTimeout(function () {
        if (data.new_window) {
          window.open(data.url, '_blank');
        }
        else {
          location.href = data.url;
        }
      }, data.delay);
    }
    else if (data.new_window) {
      window.open(data.url, '_blank');
    }
    else {
      location.href = data.url;
    }
  };

  Drupal.CTools.AJAX.commands.reload = function(data) {
    location.reload();
  };

  Drupal.CTools.AJAX.commands.submit = function(data) {
    $(data.selector).submit();
  };

  /**
   * Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
   * the server detect when it needs to degrade gracefully.
   * There are five scenarios to check for:
   * 1. /nojs/
   * 2. /nojs$ - The end of a URL string.
   * 3. /nojs? - Followed by a query (with clean URLs enabled).
   *      E.g.: path/nojs?destination=foobar
   * 4. /nojs& - Followed by a query (without clean URLs enabled).
   *      E.g.: ?q=path/nojs&destination=foobar
   * 5. /nojs# - Followed by a fragment.
   *      E.g.: path/nojs#myfragment
   */
  Drupal.CTools.AJAX.urlReplaceNojs = function(url) {
    var new_url = url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');

    // If the 'nojs' version of the URL is trusted, also trust the 'ajax'
    // version.
    if (Drupal.settings.CToolsUrlIsAjaxTrusted[url]) {
      Drupal.settings.CToolsUrlIsAjaxTrusted[new_url] = true;
    }
    return new_url;
  };

  /**
  * Returns the passed in URL as an absolute URL.
  *
  * @param url
  *   The URL string to be normalized to an absolute URL.
  *
  * @return
  *   The normalized, absolute URL.
   *
   * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
   * @see https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L53
  */
  Drupal.CTools.AJAX.absoluteUrl = function (url) {
    var urlParsingNode = document.createElement('a');

    // Decode the URL first; this is required by IE <= 6. Decoding non-UTF-8
    // strings may throw an exception.
    try {
      url = decodeURIComponent(url);
    } catch (e) {}

    urlParsingNode.setAttribute('href', url);

    // IE <= 7 normalizes the URL when assigned to the anchor node similar to
    // the other browsers.
    return urlParsingNode.cloneNode(false).href;
  };

  /**
   * Returns true if the URL is within Drupal's base path.
   *
   * @param url
   *   The URL string to be tested.
   *
   * @return
   *   Boolean true if local, or false if the url may be external or have a scheme.
   *
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L58
   */
  Drupal.CTools.AJAX.urlIsLocal = function (url) {
    // Always use browser-derived absolute URLs in the comparison, to avoid
    // attempts to break out of the base path using directory traversal.
    var absoluteUrl = Drupal.CTools.AJAX.absoluteUrl(url);

    var protocol = location.protocol;

    // Consider URLs that match this site's base URL but use HTTPS instead of HTTP
    // as local as well.
    if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
      protocol = 'https:';
    }
    var baseUrl = protocol + '//' + location.host + Drupal.settings.basePath.slice(0, -1);

    // Decoding non-UTF-8 strings may throw an exception.
    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    } catch (e) {}
    try {
      baseUrl = decodeURIComponent(baseUrl);
    } catch (e) {}

    // The given URL matches the site's base URL, or has a path under the site's
    // base URL.
    return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + '/') === 0;
  };

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.CToolsAJAX = function(context) {
    // Bind links

    // Note that doing so in this order means that the two classes can be
    // used together safely.
    $('a.ctools-use-ajax-cache:not(.ctools-use-ajax-processed)', context)
      .addClass('ctools-use-ajax-processed')
      .click(Drupal.CTools.AJAX.clickAJAXCacheLink)
      .each(function () {
        Drupal.CTools.AJAX.warmCache.apply(this);
      });

    $('a.ctools-use-ajax:not(.ctools-use-ajax-processed)', context)
      .addClass('ctools-use-ajax-processed')
      .click(Drupal.CTools.AJAX.clickAJAXLink);


    // Bind buttons
    $('input.ctools-use-ajax:not(.ctools-use-ajax-processed), button.ctools-use-ajax:not(.ctools-use-ajax-processed)', context)
      .addClass('ctools-use-ajax-processed')
      .click(Drupal.CTools.AJAX.clickAJAXButton);

    // Bind select
    $('select, input:text, input:radio, input:checkbox', context)
       .filter('.ctools-use-ajax-onchange:not(.ctools-use-ajax-processed)')
       .addClass('ctools-use-ajax-processed')
       .change(Drupal.CTools.AJAX.changeAJAX);

    // Add information about loaded CSS and JS files.
    if (Drupal.settings.CToolsAJAX && Drupal.settings.CToolsAJAX.css) {
      $.extend(Drupal.CTools.AJAX.css, Drupal.settings.CToolsAJAX.css);
    }
    if (Drupal.settings.CToolsAJAX && Drupal.settings.CToolsAJAX.scripts) {
      $.extend(Drupal.CTools.AJAX.scripts, Drupal.settings.CToolsAJAX.scripts);
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
