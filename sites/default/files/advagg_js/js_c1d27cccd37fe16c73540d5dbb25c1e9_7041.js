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
 * @file
 *
 * Implement a modal form.
 *
 * @see modal.inc for documentation.
 *
 * This javascript relies on the CTools ajax responder.
 */

(function ($) {
  // Make sure our objects are defined.
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.Modal = Drupal.CTools.Modal || {};

  /**
   * Display the modal
   *
   * @todo -- document the settings.
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice == 'string' && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    }
    else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: 'CToolsModalDialog',
      throbberTheme: 'CToolsModalThrobber',
      animation: 'show',
      animationSpeed: 'fast',
      modalSize: {
        type: 'scale',
        width: .8,
        height: .8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: .55,
        background: '#fff'
      }
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings != settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal,
        width, height;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == 'scale') {
        width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        height = $(window).height() * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      if (!isNaN(width)) {
        $('div.ctools-modal-content', context).css({
          'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px'
        });
        $('div.ctools-modal-content .modal-content', context).css({
          'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px'
        });
      }

      if (!isNaN(height)) {
        $('div.ctools-modal-content', context).css({
          'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
        });
        $('div.ctools-modal-content .modal-content', context).css({
          'height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
        });
      }
    };

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == 'scale') {
        $(window).bind('resize', resize);
      }
    }

    resize();

    $('span.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed);
    $('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme));
  };

  /**
   * Hide the modal
   */
  Drupal.CTools.Modal.dismiss = function() {
    if (Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal);
    }
  };

  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = ''
    html += '  <div id="ctools-modal">'
    html += '    <div class="ctools-modal-content">' // panels-modal-content
    html += '      <div class="modal-header">';
    html += '        <a class="close" href="#">';
    html +=            Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '        </a>';
    html += '        <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '      </div>';
    html += '      <div id="modal-content" class="modal-content">';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';

    return html;
  }

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '  <div id="modal-throbber">';
    html += '    <div class="modal-throbber-wrapper">';
    html +=        Drupal.CTools.Modal.currentSettings.throbber;
    html += '    </div>';
    html += '  </div>';

    return html;
  };

  /**
   * Figure out what settings string to use to display a modal.
   */
  Drupal.CTools.Modal.getSettings = function (object) {
    var match = $(object).attr('class').match(/ctools-modal-(\S+)/);
    if (match) {
      return match[1];
    }
  }

  /**
   * Click function for modals that can be cached.
   */
  Drupal.CTools.Modal.clickAjaxCacheLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    $('#modalContent').data('triggerElement', this);
    return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this);
  };

  /**
   * Generic replacement click handler to open the modal with the destination
   * specified by the href of the link.
   */
  Drupal.CTools.Modal.clickAjaxLink = function () {
    // show the empty dialog right away.
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    $('#modalContent').data('triggerElement', this);
    Drupal.CTools.AJAX.clickAJAXLink.apply(this);
    if (!$(this).hasClass('ctools-ajaxing')) {
      Drupal.CTools.Modal.dismiss();
    }

    return false;
  };

  /**
   * Generic replacement click handler to open the modal with the destination
   * specified by the href of the link.
   */
  Drupal.CTools.Modal.clickAjaxButton = function() {
    if ($(this).hasClass('ctools-ajaxing')) {
      return false;
    }

    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    $('#modalContent').data('triggerElement', this);
    Drupal.CTools.AJAX.clickAJAXButton.apply(this);
    if (!$(this).hasClass('ctools-ajaxing')) {
      Drupal.CTools.Modal.dismiss();
    }

    return false;
  };

  /**
   * Submit responder to do an AJAX submit on all modal forms.
   */
  Drupal.CTools.Modal.submitAjaxForm = function(e) {
    var url = $(this).attr('action');
    var form = $(this);

    setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit(form, url); }, 1);
    return false;
  }

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.ZZCToolsModal = function(context) {
    // Bind links
    // Note that doing so in this order means that the two classes can be
    // used together safely.
    $('a.ctools-use-modal-cache:not(.ctools-use-modal-processed)', context)
      .addClass('ctools-use-modal-processed')
      .click(Drupal.CTools.Modal.clickAjaxCacheLink)
      .each(function () {
        Drupal.CTools.AJAX.warmCache.apply(this);
      });

    $('a.ctools-use-modal:not(.ctools-use-modal-processed)', context)
      .addClass('ctools-use-modal-processed')
      .click(Drupal.CTools.Modal.clickAjaxLink);

    // Bind buttons
    $('input.ctools-use-modal:not(.ctools-use-modal-processed), button.ctools-use-modal:not(.ctools-use-modal-processed)', context)
      .addClass('ctools-use-modal-processed')
      .click(Drupal.CTools.Modal.clickAjaxButton);

    // Bind submit links in the modal form.
    $('#modal-content form:not(.ctools-use-modal-processed)', context)
      .addClass('ctools-use-modal-processed')
      .submit(Drupal.CTools.Modal.submitAjaxForm)
      .bind('CToolsAJAXSubmit', Drupal.CTools.AJAX.ajaxSubmit);

    // add click handlers so that we can tell which button was clicked,
    // because the AJAX submit does not set the values properly.

    $('#modal-content input[type="submit"]:not(.ctools-use-modal-processed), #modal-content button:not(.ctools-use-modal-processed)', context)
      .addClass('ctools-use-modal-processed')
      .click(function() {
        if (Drupal.autocompleteSubmit && !Drupal.autocompleteSubmit()) {
          return false;
        }

        // Make sure it knows our button.
        if (!$(this.form).hasClass('ctools-ajaxing')) {
          this.form.clk = this;
        }
      });

    // Bind a click handler to allow elements with the 'ctools-close-modal'
    // class to close the modal.
    $('.ctools-close-modal:not(.ctools-close-modal-processed)', context)
      .addClass('ctools-close-modal-processed')
      .click(function() {
        Drupal.CTools.Modal.dismiss();
        return false;
      });
  };

  // The following are implementations of AJAX responder commands.

  /**
   * AJAX responder command to place HTML within the modal.
   */
  Drupal.CTools.AJAX.commands.modal_display = function(command) {
    $('#modal-title').html(command.title);
    $('#modal-content').html(command.output);
    $('#modalContent')
      // Prevent tabbing outside the modal.
      .bind('keydown', function (event) {
        if (event.keyCode !== 9) {
          return;
        }
        var tabbables = $(':tabbable', this),
          first = tabbables.filter(':first'),
          last = tabbables.filter(':last');

        if (event.target === last[0] && !event.shiftKey) {
          setTimeout(function() {
            first.focus();
          }, 1);
          return false;
        }
        else if (event.target === first[0] && event.shiftKey) {
          setTimeout(function() {
            last.focus();
          }, 1);
          return false;
        }
      });
    if (!$(':tabbable:first', '#modal-content').focus().length) {
      $(':tabbable:first', '#modalContent').focus();
    }
    Drupal.attachBehaviors();
  };

  /**
   * AJAX responder command to dismiss the modal.
   */
  Drupal.CTools.AJAX.commands.modal_dismiss = function(command) {
    Drupal.CTools.Modal.dismiss();
    $('link.ctools-temporary-css').remove();
  }

  /**
   * Display loading
   */
  Drupal.CTools.AJAX.commands.modal_loading = function(command) {
    Drupal.CTools.AJAX.commands.modal_display({
      output: Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),
      title: Drupal.CTools.Modal.currentSettings.loadingText
    });
  }

  /**
   * modalContent
   * @param content string to display in the content box
   * @param css obj of css attributes
   * @param animation (fadeIn, slideDown, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.modalContent = function(content, css, animation, speed) {
    // If our animation isn't set, make it just show/pop
    if (!animation) {
      animation = 'show';
    }
    else {
      // If our animation isn't "fadeIn" or "slideDown" then it always is show
      if (animation != 'fadeIn' && animation != 'slideDown') {
        animation = 'show';
      }
    }

    if (!speed) {
      speed = 'fast';
    }

    // Build our base attributes and allow them to be overriden
    css = jQuery.extend({
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.55'
    }, css);

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
    content.hide();

    // if we already ahve a modalContent, remove it
    if ( $('#modalBackdrop')) $('#modalBackdrop').remove();
    if ( $('#modalContent')) $('#modalContent').remove();

    // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
    if (self.pageYOffset) { // all except Explorer
    var wt = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }

    // Get our dimensions

    // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
    var docHeight = $(document).height() + 50;
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    if( docHeight < winHeight ) docHeight = winHeight;

    // Create our divs
    $('body').append('<div id="modalBackdrop" style="z-index: 1000; display: none;"></div><div id="modalContent" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

    // Keyboard and focus event handler ensures focus stays on modal elements only
    modalEventHandler = function( event ) {
      target = null;
      if ( event ) { //Mozilla
        target = event.target;
      } else { //IE
        event = window.event;
        target = event.srcElement;
      }

      var parents = $(target).parents().get();
      for (var i = 0; i < parents.length; i++) {
        var position = $(parents[i]).css('position');
        if (position == 'absolute' || position == 'fixed') {
          return true;
        }
      }
      if( $(target).filter('*:visible').parents('#modalContent').size()) {
        // allow the event only if target is a visible child node of #modalContent
        return true;
      }
      if ( $('#modalContent')) $('#modalContent').get(0).focus();
      return false;
    };
    $('body').bind( 'focus', modalEventHandler );
    $('body').bind( 'keypress', modalEventHandler );

    // Create our content div, get the dimensions, and hide it
    var modalContent = $('#modalContent').css('top','-1000px');
    var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
    var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
    $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

    // Bind a click for closing the modalContent
    modalContentClose = function(){close(); return false;};
    $('.close').bind('click', modalContentClose);

    // Close the open modal content and backdrop
    function close() {
      $('#modalContent').trigger('dialogbeforeclose');
      // Unbind the events
      $(window).unbind('resize',  modalContentResize);
      $('body').unbind( 'focus', modalEventHandler);
      $('body').unbind( 'keypress', modalEventHandler );
      $('.close').unbind('click', modalContentClose);
      $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

      // Set our animation parameters and use them
      if ( animation == 'fadeIn' ) animation = 'fadeOut';
      if ( animation == 'slideDown' ) animation = 'slideUp';
      if ( animation == 'show' ) animation = 'hide';

      // Close the content
      modalContent.hide()[animation](speed);

      // Remove the content
      $('#modalContent').trigger('dialogclose');
      $('#modalContent').remove();
      $('#modalBackdrop').remove();
    };

    // Move and resize the modalBackdrop and modalContent on resize of the window
     modalContentResize = function(){
      // Get our heights
      var docHeight = $(document).height();
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Get where we should move content to
      var modalContent = $('#modalContent');
      var mdcTop = ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
      var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);

      // Apply the changes
      $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css('top', mdcTop + 'px').css('left', mdcLeft + 'px').show();
    };
    $(window).bind('resize', modalContentResize);

    $('#modalContent')
      .focus()
      .trigger('dialogopen', $('#modalContent'))
      // Prevent tabbing outside the modal.
      .bind('keydown', function (event) {
        if (event.keyCode !== 9) {
          return;
        }
        var tabbables = $(':tabbable', this),
            first = tabbables.filter(':first'),
            last = tabbables.filter(':last');

        if (event.target === last[0] && !event.shiftKey) {
          setTimeout(function() {
            first.focus();
          }, 1);
          return false;
        }
        else if (event.target === first[0] && event.shiftKey) {
          setTimeout(function() {
            last.focus();
          }, 1);
          return false;
        }
      });
    $(':tabbable', '#modalContent').focus();
  };

  /**
   * unmodalContent
   * @param content (The jQuery object to remove)
   * @param animation (fadeOut, slideUp, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.unmodalContent = function(content, animation, speed)
  {
    // If our animation isn't set, make it just show/pop
    if (!animation) { var animation = 'show'; } else {
      // If our animation isn't "fade" then it always is show
      if (( animation != 'fadeOut' ) && ( animation != 'slideUp')) animation = 'show';
    }
    // Set a speed if we dont have one
    if ( !speed ) var speed = 'fast';

    // Unbind the events we bound
    $(window).unbind('resize', modalContentResize);
    $('body').unbind('focus', modalEventHandler);
    $('body').unbind('keypress', modalEventHandler);
    $('.close').unbind('click', modalContentClose);
    $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

    // jQuery magic loop through the instances and run the animations or removal.
    content.each(function(){
      if ( animation == 'fade' ) {
        $('#modalContent').fadeOut(speed,function(){$('#modalBackdrop').fadeOut(speed, function(){$(this).remove();});$(this).remove();});
      } else {
        if ( animation == 'slide' ) {
          $('#modalContent').slideUp(speed,function(){$('#modalBackdrop').slideUp(speed, function(){$(this).remove();});$(this).remove();});
        } else {
          $('#modalContent').remove();$('#modalBackdrop').remove();
        }
      }
    });
  };

})(jQuery);
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
/**
 * Initiates the capture plus object.
 */
(function ($, Drupal, pca) {
  'use strict';

  Drupal.behaviors.capturePlusInit = function (context) {
    // Loops over each capture+ field.
    $.each(Drupal.settings.capturePlus, function(id, capturePlusSettings) {
      if (capturePlusSettings.name && !$('#' + capturePlusSettings.name, context).hasClass('capture-plus-processed')) {

        var fields = [{element: capturePlusSettings.name, field: ""}];
        capturePlusSettings.control = new pca.Address(fields, capturePlusSettings);

        // Trigger custom event on the html element (textfield).
        capturePlusSettings.control.listen("populate", function(response) {
          $('#' + capturePlusSettings.name, context).trigger('capturePlusCallback', [response]);
        });

        // Trigger searches on pasting in content.
        $('#' + capturePlusSettings.name, context).bind('paste', function () {
          var element = this;
          window.setTimeout(function () {
            pca.fire(element, 'dblclick');
          }, 0);
        });

        $('#' + capturePlusSettings.name, context).addClass('capture-plus-processed');
      }
    });
  };

  /**
   * Capture plus default actions.
   *
   * If you want to disable one of these default actions you can use the unbind()
   * function.
   *
   * If you copy a part of this code make sure you replace 'default' by something
   * else in your code (e.g. 'capturePlusCallback.foobar').
   */
  Drupal.behaviors.capturePlusActions = function(context) {
    var search_box = $('input.search-box.capture-plus', context);

    // Capture plus default action.
    search_box.bind('capturePlusCallback.default', function (event, response) {
      $('div.capture-plus.result').remove();
      var html = '<div class="capture-plus result">' + Drupal.theme('capturePlusAddress', response) + '</div>';
      $('input[type=hidden].capture-plus', context).after(html);
    });
  };

  /**
   * Theme function for formatted address.
   *
   * @param response
   *   The Capture+ response.
   * @returns {string}
   *   The formatted address as html.
   */
  Drupal.theme.prototype.capturePlusAddress = function (response) {
    // Replacing new lines with <br />-tags and wrapping it in a paragraph.
    return '<p class="capture-plus address-formatted">' + response.Label.replace(/\n/g, '<br />') + '</p>';
  };

})(jQuery, Drupal, pca);
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
/**
 * @file
 * Provides overlay functionality for Postcode finder.
 */

Drupal.behaviors.rmlPostcodeFinderOverlays = function(context) {
  // Creating overlays.
  var overlays = [];
  $('.rml-postcode-finder-overlay', context).each(function(index) {
    var id = $(this).attr('id');
    overlays[id] = $(this);

    overlays[id].dialog({
      autoOpen: false,
      modal: true,
      draggable: false,
      width: Drupal.settings.CToolsModal.modalSize.width,
      title: '<h2>' + $(this).attr('title') + '</h2>',
      closeText: Drupal.nlt('rml_postcode_finder.dialog_close')
    });
  });

  // Making overlay links active.
  $('.rml-postcode-finder-overlay-link', context).each(function(index) {
    $(this).click(function (event) {
      var id = $(this).attr('rel');
      overlays[id].data('triggerElement', this);
      overlays[id].dialog('open');
      event.preventDefault();
    });
  });

  // Add close text nlt to overlays
  $(document).bind('dialogopen', function (event) {
    var dialog = $(event.target);
    if (dialog.is('#modalContent') && dialog.not('.close-text-processed')) {
      dialog
        .addClass('close-text-processed')
        .find('.ui-dialog-titlebar a.close span')
        .text(Drupal.nlt('rml_postcode_finder.dialog_close'));
    }
    if (dialog.is('#login-register-dialog-form') && dialog.not('.close-text-processed')) {
      dialog
        .addClass('close-text-processed')
        .siblings('.ui-dialog-titlebar')
        .find('a.ui-dialog-titlebar-close span')
        .text(Drupal.nlt('rml_postcode_finder.dialog_close'));
    }
  });
};
;
/**
 * Map generation function.
 */
Drupal.behaviors.bingMapsMap = function (context) {
  // There could be more than one map so we loop over all of them.
  if (Drupal.settings.bingMapsMaps) {
    $.each(Drupal.settings.bingMapsMaps, function (id, bingMapsSettings){
      if (bingMapsSettings.location) {
        if (typeof bingMapsSettings.location === 'string') {
          bingMapsGeoCode(bingMapsSettings, bingMapsSettings.location);
        }
        else {
          var coordinates = bingMapsSettings.location;
          bingMapsMap(bingMapsSettings, coordinates);
        }
      }
    });
  }
};

/**
 * Create a map with the given coordinates and settings
 *
 * @param bingMapsSettings
 *   The Bing Maps settings.
 * @param coordinates
 *   The coordinates to show.
 */
function bingMapsMap(bingMapsSettings, coordinates) {
  var container = document.getElementById(bingMapsSettings.id);

  // Only execute if there is a container and the coordinates are set.
  if (container && coordinates.length > 0) {

    // Create location object.
    var location = new Microsoft.Maps.Location(coordinates[0], coordinates[1]);

    // Populate mapOptions object.
    var mapOptions = bingMapsSettings.mapOptions;
    mapOptions.credentials = bingMapsSettings.key;
    mapOptions.center = location;
    // Evaluate the mapTypeId string so it can execute.
    if (typeof mapOptions.mapTypeId !== 'undefined' && mapOptions.mapTypeId.length > 10) {
      mapOptions.mapTypeId = eval(mapOptions.mapTypeId);
    }

    // Only create a map if we don't already have one.
    if (typeof bingMapsSettings.bingMap === 'undefined') {
      bingMapsSettings.bingMap = new Microsoft.Maps.Map(container, mapOptions);
    }
    // If the map already exists, reuse it.
    // This reduces the number of billable transactions.
    else {
      // Clear any existing entities (e.g. pins) first.
      bingMapsSettings.bingMap.entities.clear();
      bingMapsSettings.bingMap.setView(mapOptions);
    }

    // Adding a the location pin.
    if (bingMapsSettings.pinOptions.show_pin) {
      var pushPinOptions = bingMapsSettings.pinOptions.pushPinOptions || {};
      var pin = new Microsoft.Maps.Pushpin(location, pushPinOptions);
      bingMapsSettings.bingMap.entities.push(pin);
    }

    // Adding info-box
    if (bingMapsSettings.pinOptions.show_info_box) {
      var pinInfoBox = new Microsoft.Maps.Infobox(location, {
        title: bingMapsSettings.pinOptions.info_box.title,
        description: bingMapsSettings.pinOptions.info_box.description
      });
      bingMapsSettings.bingMap.entities.push(pinInfoBox);
    }
  }
}

/**
 * Geocode the given location and than create a map with the given settings.
 *
 * @param bingMapsSettings
 *   The Bing Maps settings.
 * @param location
 *   The location to geocode as a string.
 * @param tries
 *   The number of attempts made to access the Bing Maps API.
 */
function bingMapsGeoCode(bingMapsSettings, location, tries) {
  tries = tries || 0;
  var url = Drupal.settings.bingMapsGeoCodeURL;
  if (tries < 3) {
    $.ajax({
      type: 'GET',
      url: url,
      data: {q: location, key: bingMapsSettings.key},
      contentType: 'jsonp',
      dataType: 'jsonp',
      jsonp: 'jsonp',
      success: function (json) {
        if (json.statusCode === 200 && json.resourceSets.length) {
          var coordinates = json.resourceSets[0].resources[0].point.coordinates;
          bingMapsMap(bingMapsSettings, coordinates);
        }
        else {
          tries++;
          bingMapsGeoCode(bingMapsSettings, location, tries);
        }
      }
    });
  }

}
;
/**
 * Contains all capture plus response related javascript code.
 */
(function ($, Drupal, pca) {
  'use strict';

  Drupal.rmlPostcodeFinder = Drupal.rmlPostcodeFinder || {};

  /**
   * Showing bing map after clicking on the link.
   */
  Drupal.behaviors.rmlPostcodeFinderBingMap = function (context) {
    // This enables the latitude en longitude fields in the Capture+ response.
    Drupal.settings.capturePlus.cp_search.control.advancedFields = ["{Latitude}", "{Longitude}", "{BFPONumber}"];

    var map_link_container = $('.postcode-finder-main .rml-postcode-finder-map-link', context);
    var show_map = false;
    var response = {};
    var browser_type = isIE ();

    if (browser_type == 8 || browser_type == 9) {
      $('#map-link').remove();
    }

    /**
     * Adding response to variable and showing map if linked has already been
     * clicked.
     */
    $('.postcode-finder-main .search-box.capture-plus', context).bind('capturePlusCallback.rmlPostCodeFinderShowBingMap', function (event, active_response) {
      response = active_response;
      // Show map.
      if (show_map) {
        if (response.Field1 == '' || response.Field2 == '') {
          show_map = false;
          $('.postcode-finder-main .bing-maps, .rml-postcode-finder-bing-map', context).slideUp(150);
          $('#map-not-available-message').show();
        } else {
          showMap();
        }
      }
      else {
        // Show map link.
        map_link_container.show();
        $('#map-not-available-message').hide();
      }
    });

    /**
     * Enable map showing after clicking on the link.
     */
    $('#map-link', map_link_container).click(function (event) {
      event.preventDefault();
      if (response.Field1 == '' || response.Field2 == '') {
        map_link_container.hide();
        $('#map-not-available-message').show();
      } else {
        $('#map-not-available-message').hide();
        show_map = true;
        $('.postcode-finder-main .bing-maps, .rml-postcode-finder-bing-map', context).slideDown(150);
        showMap();
      }
    });

    /**
     * Checks if the browser is Internet Explorer (IE) and returns the version.
     */
    function isIE () {
      var myNav = navigator.userAgent.toLowerCase();
      return (myNav.search('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }

    /**
     * Showing the actual map.
     * For reference see http://www.bingmapsportal.com/ and http://msdn.microsoft.com/en-us/library/gg427610.aspx
     */
    function showMap() {
      if (response.Label.length) {
        var settings = Drupal.settings.bingMapsMaps.postcodefinder_map;
        settings.pinOptions.show_pin = true;
        settings.mapOptions.enableSearchLogo = false;
        settings.mapOptions.enableClickableLogo = false;
        settings.mapOptions.mapTypeId = 'r';
        settings.mapOptions.tileBuffer = 4;

        bingMapsMap(settings, [response.Field1, response.Field2]);

        // Show (unhide) container
        map_link_container.hide();
      }
    }
  };

  /**
   * Removing default behaviour and displaying address in result div.
   */
  Drupal.behaviors.rmlPostcodeFinderResult = function (context) {
    var search_box = $('.postcode-finder-main .search-box.capture-plus', context);
    var placeholder = $('div.rml-postcode-finder-result', context);

    search_box.unbind('capturePlusCallback.default');

    search_box.bind('capturePlusCallback.rmlPostcodeFinderResult', function (event, response) {
      // Formatting the response.
      var output = Drupal.theme('capturePlusAddress', response);
      // Replacing new lines with <br />-tags and wrapping it in a paragraph.
      output = '<p class="capture-plus address-formatted">' + output.replace(/\n/g, '<br />') + '</p>';

      $('.address', placeholder).html(output);
      placeholder.show();

      // Event trigger for content changes.
      $('.tips-contextual.collapsible', context).trigger('rmlPostcodeFinder.complete');

      // Hide the help content block.
      $('.rml-postcode-finder-help-box', context).hide();

      // For IE, clear the value so the placeholder polyfill returns.
      if ($.browser.msie && $.browser.version < 10) {
        $('#cp-search').val('').focus();
      }

      // Scroll the window down.
      $('html, body').animate({ scrollTop: $('.rml-postcode-finder-header').offset().top + 'px'});
    });
  };

  /**
   * Adding custom text to capture+
   */
  Drupal.behaviors.rmlPostcodeFinderCapturePlusText = function (context) {
    var cpElement = document.getElementById('cp-search');
    var cpClasses = cpElement.className;

    if (cpClasses.indexOf('rpf-text-processed') !== -1) {
      return;
    }

    var control = Drupal.settings.capturePlus.cp_search.control;
    var texts = Drupal.settings.postcodeFinderCapturePlusText;
    if (pca) {
      pca.messages[control.language].NORESULTS = texts.no_results;

      // Hidden message to provide details for screen reader users.
      $(cpElement).before('<span id="cp-search-reader-message" class="visuallyhidden" role="status" aria-live="polite"></span>');
      var statusMessage = document.getElementById('cp-search-reader-message');

      // Reposition the autocomplete inside the input's padding.
      var inputWidth = $(cpElement).width();
      var reposition = function () {
        this.setWidth(inputWidth);
        this.element.style.left = (parseInt(this.element.style.left, 10) + 25) + 'px';
      };

      // Workaround odd issue where the control hasn't fully loaded in some cases.
      if (control.loaded) {
        control.autocomplete.listen('move', reposition);
        control.autocomplete.listen("keyup", function (key) {
          if (key === 38 || key === 40) {
            statusMessage.innerHTML = control.autocomplete.list.currentItem().title;
          }
        });
      }
      else {
        control.listen('load', function () {
          control.autocomplete.listen('move', reposition);
          control.autocomplete.listen("keyup", function (key) {
            if (key === 38 || key === 40) {
              statusMessage.innerHTML = control.autocomplete.list.currentItem().title;
            }
          });
        });
        control.load();
        pca.messages[control.language].NORESULTS = texts.no_results;
      }

      // Processing ctools modal link. Capture+ adds the noresult text as a string
      // before each noresult event, so we need to process it each time.
      control.listen('noresults', function (items, attributes) {
        var messsage = $('.pcatext', context);

        // Replace the placeholder with the searched term.
        var searchTerm = messsage.find('span.capture-plus-message-text span.term');
        var text = searchTerm.text().replace('@term', cpElement.value);
        searchTerm.text(text);
        messsage.find('.capture-plus-message-text').removeClass('display').addClass('noresults');

        Drupal.behaviors.ZZCToolsModal(messsage);
        // Hide the message after a link has been clicked.
        $('a', messsage).click(function (event) {
          messsage.hide();
          // Removing response from storage, this way we know that the enquiry is
          // not about a previous lookup.
          Drupal.behaviors.rmlPostcodeFinderMailDataStorage.response = false;
        });
      });

      control.listen('error', function (message) {
        if (typeof console.log === 'function') {
          console.log(message);
        }
      });

      $(cpElement).addClass('rpf-text-processed');
    }
  };

  /**
   * Test for cookies and set a limit or disable the widget.
   */
  Drupal.behaviors.rmlPostcodeFinderLimitLookups = function (context) {
    if (Drupal.settings.rmlPostcodeFinder.enabled) {
      // Test for the temporary cookie to see if cookies are enabled.
      if (Drupal.rmlPostcodeFinder.cookieEnabled()) {
        Drupal.rmlPostcodeFinder.limitCookie(context);
      }
      else {
        Drupal.rmlPostcodeFinder.cookieDisabled(context);
      }
    }
  };

  /**
   * Test to check if cookies are enabled.
   *
   * @see https://github.com/Modernizr/Modernizr/issues/191
   *
   * @returns {boolean}
   */
  Drupal.rmlPostcodeFinder.cookieEnabled = function () {
    // Quick test if browser has cookieEnabled host property
    if (navigator.cookieEnabled) {
      return true;
    }
    // Create cookie
    document.cookie = "cookietest=1";
    var ret = document.cookie.indexOf("cookietest=") != -1;
    // Delete cookie
    document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    return ret;
  };

  /**
   * Disables the widget.
   */
  Drupal.rmlPostcodeFinder.cookieDisabled = function (context) {
    // Remove Capture+.
    Drupal.settings.capturePlus.cp_search.control.destroy();
    $('.postcode-finder-main .search-box.capture-plus', context)
      .attr('disabled', 'disabled')
      .addClass('disabled');
    var limit_div = $('.rml_postcode_finder_limit', context)
      .addClass('disabled-warning padding20b')
      .removeClass('low-warning');
    var limit_span = $('span.limit-message', limit_div);

    // Show and update text
    var disabled = $('.rml_postcode_finder_disabled_text', context).show();
    $('p.block-title', disabled).text(Drupal.nlt('rml_postcode_finder.limit_cookies_disabled_heading'));
    $('p.block-text', disabled).text(Drupal.nlt('rml_postcode_finder.limit_cookies_disabled_text'));

    var text = Drupal.nlt('rml_postcode_finder.limit_cookies_disabled_message', {'@value': Drupal.settings.rmlPostcodeFinder.default_value});
    limit_span.html(text);

    $('.rml-postcode-finder-result', context).remove();
  };

  /**
   * Limit the number of lookups a user can do by setting a cookie.
   */
  Drupal.rmlPostcodeFinder.limitCookie = function (context) {
    var search_box = $('.postcode-finder-main .search-box.capture-plus', context);
    var limit_div = $('.rml_postcode_finder_limit', context);
    var limit_span = $('span.limit-message', limit_div);

    // The cookie name includes day of the year, this ensures that we have a new
    // cookie after midnight (server time).
    var cookie_name = Drupal.settings.rmlPostcodeFinder.cookie_name + Drupal.settings.rmlPostcodeFinder.day_of_year;

    /**
     * Set the current value of the cookie.
     *
     * @param value
     *   The value to set cookie to (Number).
     */
    function setCurrentValue(value) {
      $.cookie(cookie_name, value, { expires: 1, path: '/' });
    }

    /**
     * Returns the current cookie value.
     *
     * If the no cookie has been set one is set and the default value is returned.
     *
     * @returns Number
     */
    function getCurrentValue() {
      var current_value = $.cookie(cookie_name);
      if (!current_value) {
        setCurrentValue(0);
        current_value = 0;
      }
      return Number(current_value);
    }

    /**
     * Updates the number of lookups left on the page.
     *
     * @param value
     *  The value to display (Number).
     */
    function updateLimitElement(value) {
      // Check if cookies are enabled (if they have been disabled during the
      // current browsing session).
      if (Drupal.rmlPostcodeFinder.cookieEnabled()) {
        var limit = Drupal.settings.rmlPostcodeFinder.default_value;
        var warning = Drupal.settings.rmlPostcodeFinder.warning;

        // Show warning.
        if (warning && value >= (limit - warning)) {
          limit_div.addClass('low-warning');
        }
        // Disable search box if there are no lookups left.
        if (value >= limit) {
          Drupal.settings.capturePlus.cp_search.control.destroy();
          search_box.attr('disabled', 'disabled');
          search_box.addClass('disabled');
          limit_div.addClass('disabled-warning padding20b');
          limit_div.removeClass('low-warning');
          $('.rml_postcode_finder_disabled_text', context).show();
        }

        var currentValue = limit - value;
        var text = Drupal.nlt('rml_postcode_finder.limit_message', {'@value': currentValue});
        if (currentValue < warning && currentValue > 1) {
          text = Drupal.nlt('rml_postcode_finder.lower_limit_message', {'@value': currentValue});
        }
        else if (currentValue === 1) {
          text = Drupal.nlt('rml_postcode_finder.one_search_message', {'@value': currentValue});
        }
        else if (currentValue <= 0) {
          text = Drupal.nlt('rml_postcode_finder.limit_reached_message', {'@value': limit});
        }
        limit_span.html(text);
      }
      else {
        // Disable the widget.
        Drupal.rmlPostcodeFinder.cookieDisabled(context);
      }
    }

    // This updates the current value on screen.
    updateLimitElement(getCurrentValue());

    // Binds to the Capture plus callback event and updates the number of lookups
    // that are left.
    $('input.search-box.capture-plus', context).bind('capturePlusCallback.rmlPostCodeFinderLimitLookups', function (event, response) {
      var current_value = getCurrentValue() + 1;
      setCurrentValue(current_value);
      updateLimitElement(current_value);
    });
  };

  /**
   * Adding data to 'Buy and print postage' link.
   */
  Drupal.behaviors.rmlPostcodeFinderBuyAndPrintPostage = function (context) {
    var search_box = $('.postcode-finder-main .search-box.capture-plus', context);
    var buy_link = $('.postcode-finder-main #buy-and-print-postage', context);
    var buy_link_original_href = buy_link.attr('href');

    search_box.bind('capturePlusCallback.rmlPostcodeFinderBuyAndPrintPostage', function (event, response) {
      // Data mapping.
      var data = rmlPostcodeFinderStringifyResponse(response);

      // Update URL.
      var new_href = buy_link_original_href + '?data=' + encodeURIComponent(data);
      buy_link.attr('href', new_href);
    });
  };

  /**
   * Mail this address data.
   */
  Drupal.behaviors.rmlPostcodeFinderMailDataStorage = function (context) {
    var search_box = $('.postcode-finder-main .search-box.capture-plus', context);

    search_box.bind('capturePlusCallback.rmlPostcodeFinderMailDataStorage', function (event, response) {
      Drupal.behaviors.rmlPostcodeFinderMailDataStorage.response = response;
    });
  };

  /**
   * Tealium data.
   */
  Drupal.behaviors.rmlPostcodeFinderTealiumData = function (context) {
    var search_box = $('.postcode-finder-main .search-box.capture-plus', context);
    var tealium_data_container = $('.postcode-finder-main #tealiumdata', context);

    search_box.bind('capturePlusCallback.rmlPostcodeFinderTealiumData', function (event, response) {
      var limit_container = $('.rml_postcode_finder_limit .current-limit', context);

      var postcode = response.PostalCode;
      var remaining_searches = limit_container.html();
      // Adding data to container.
      $('.postcode', tealium_data_container).html(postcode);
      $('.remaining-searches', tealium_data_container).html(remaining_searches);

      // Triggering a change event on the Tealium container.
      var detail = {
        postcode: postcode,
        remainingSearches: remaining_searches,
        response: response
      };
      tealium_data_container.trigger('change.rmlPostcodeFinderTealiumData', [detail]);
    });
  };

  /**
   * Converts a Capture+ response to simplified object as a string.
   *
   * @param response
   *   The Capture+ response.
   * @returns string
   *   The simplified object as a string.
   */
  function rmlPostcodeFinderStringifyResponse(response) {
    return JSON.stringify({
      postalcode: response.PostalCode,
      line1: response.Line1,
      line2: response.Line2,
      line3: response.Line3,
      buildingname: response.BuildingName,
      subbuilding: response.SubBuilding,
      buildingnumber: response.BuildingNumber,
      secondarystreet: response.SecondaryStreet,
      street: response.Street,
      district: response.District,
      neighbourhood: response.Neighbourhood,
      city: response.City,
      province: response.Province,
      company: response.Company,
      department: response.Department
    });
  }

  /**
   * Overriding default address formatter.
   *
   * @param response
   *   The Capture+ response.
   * @returns {string}
   *   The formatted address as html.
   */
  Drupal.theme.capturePlusAddress = function (response) {
    var output = '';

    var elements = ['Company', 'Department', 'Line1', 'Line2', 'Line3', 'Line4', 'Line5'];
    for (var i = 0; i < elements.length; i++) {
      if (response[elements[i]].length) {
        output += response[elements[i]] + "\n";
      }
    }

    // Field3 includes BFPO Number.
    if (response.Field3 != '') {
      output += response.Field3 + "\n";
    }
    output += response.City.toUpperCase() + "\n";
    output += response.PostalCode.toUpperCase() + "\n";

    return output;
  };

})(jQuery, Drupal, pca);
;
if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());;
