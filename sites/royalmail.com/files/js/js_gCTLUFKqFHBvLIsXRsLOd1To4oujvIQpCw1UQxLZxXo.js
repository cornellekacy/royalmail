/**
 * @file
 * Interact with OSC service to check advisor availability and start chat.
 */

(function ($) {

  Drupal.behaviors.liveChatExternalJsCall = {
    attach: function (context, settings) {
      // Set engagement engine account number which Oracle has provided.
      ATGSvcs.setEEID(settings.config.livechat_customer_id);
      // Enable oracle engagement engine driven widgets.
      var l = settings.config.livechat_domain_url, d = document,ss = 'script',s = d.getElementsByTagName(ss)[0],rn = d.createElement(ss);
      rn.type = 'text/javascript';
      rn.defer = rn.async = !0;
      rn.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + l + '/rnt/rnw/javascript/vs/1/vsapi.js';
      s.parentNode.insertBefore(rn, s);

      /**
       * Attach pass through authentication (PTA) string of user details.
       */
      function addPta() {
        if (typeof RightNow !== "undefined") {
          if (settings.config.livechat_send_user_details === 1 && settings.config.livechat_pta_token !== undefined) {
            RightNow.Client.Event.evt_beforeDataRequest.subscribe(function (type, args, instance) {
              if (args[0]) {
                args[0].pta = settings.config.livechat_pta_token;
              }
            });
          }
        }
        else {
          setTimeout(addPta, 1000);
        }
      }

      $('#b2b-chat-link-container').once('rml_livechat_pta').each(function () {
        addPta();
      });

    }
  };

}(jQuery));
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
