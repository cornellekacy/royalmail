/**
 * @description
 * The Oracle RightNow Knowledge Base Service.
 *
 * To use this service, you need to make sure :
 * - A configuration object is passed when initialising/using the widget
 * - The endpoint url to use is passed when initialising/using the widget
 * - The RightNow Client library is loaded (to use the RightNow object)
 * @see index.html
 **/

var oracleRightNowKnowledgeBaseWidgetService = new function () {

  this.endpointUrl = '';
  this.widgetConfig = {};

  /**
   * @description Check if the RightNow library is loaded.
   * @return {Boolean} True if the RightNow object is available, false instead.
   */
  this.isLibraryLoaded = function () {
    if (typeof window.RightNow !== 'undefined') {
      return true;
    }
    return false;
  };

  /**
   * @description Load the external Right Now library and Initialise the
   * RightNow Widget.
   * @param {String} endpointUrl The KB Widget endpoint URL to use.
   * @param {Object} config An object containing KB widget config to override.
   * @return {Object|Boolean} A promise is the widget was initialised or false.
   */
  this.initialiseWidget = function (endpointUrl, widgetConfig) {

    if (this.isLibraryLoaded) {
      this.endpointUrl = endpointUrl;
      this.widgetConfig = widgetConfig;
      RightNow.Client.Controller.addComponent(this.widgetConfig, this.endpointUrl);
      return true;
    }

    return false;
  };
  /**
   * @description Check that the widget was initialised by verifying that the
   * div widget contains at least one child element.
   *
   * @return {Boolean} true if the widget was loaded, false instead.
   *
   */
  this.widgetIsInitialised = function () {
    var widget = document.getElementById(this.widgetConfig.div_id);
    if (widget !== 'undefined'
      && widget !== null
      && widget.children.length > 0
    ) {
      return true;
    }

    return false;
  };

  /**
   * @description Alter a KB Request to update the categories to use.
   *
   * @return {Boolean} true if the widget was updated, false instead.
   *
   */

  this.updateCategoriesBeforeDataRequest = function (categories) {
    if (!this.widgetIsInitialised(this.widgetConfig)) {
      return false;
    }

    var modifyRequestData = function (type, args, instance) {

      var evtObj = args[0];

      evtObj.data.c = categories;

    }

    return RightNow.Client.Event.evt_beforeDataRequest.subscribe(modifyRequestData);
  }

  /**
   * @description Check that the widget was loaded by verifying that the div
   * widget contains at least one child element.
   *
   * @return {Boolean} true if the search was performed, false instead.
   *
   */

  this.searchByKeyword = function (keyword) {
    if (!this.widgetIsInitialised(this.widgetConfig)) {
      return false;
    }

    var searchRequest = new RightNow.Client.EventObject('evt_dataRequest', 'searchByKeyword');
    searchRequest.data.q = keyword;
    return RightNow.Client.Event.evt_searchRequest.fire(searchRequest);
  };

  /**
   * @description Reset the search by performing a search with an empty string.
   *
   * @return {Boolean} true if the search was resetted, false instead.
   *
   */

  this.resetSearch = function () {
    return this.searchByKeyword('');
  };
}
;
/**
 * @file
 * Present knowledge base articles from Oracle Service Cloud.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.rml_kb_widget = {
    attach: function (context, setting) {
      var instance_id = getInstanceID();
      $(window).once('rml_kb_widget').each(function () {
        try {
          var KBWidget = oracleRightNowKnowledgeBaseWidgetService;
          var searchTerm = '';
          KBWidget.initialiseWidget(setting.api_endpoint,
            getKBConfig(setting, instance_id));
        }
        catch (e) {
          // Hide all kb widget blocks if KBWidget initialization fails.
          $('.kb-widget').hide();
        }

        // Search when pressing enter.
        var $searchInput = $('#rn_Query' + instance_id)
        $searchInput.on('keyup', function (event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            searchTerm = getKBSearchTerm(instance_id);
            KBWidget.searchByKeyword(term);
          }
        });

        /**
         * Hide KB widget if the content inside is empty.
         */
        var hideKBWidgetIfEmpty = function () {
          // Check if widget is initialized i.e. call for fetching the articles
          // is completed.
          if (KBWidget.widgetIsInitialised()) {
            hideKBWidgetDisplay();
          }
          else {
            // Wait until widget is initialized.
            setTimeout(hideKBWidgetIfEmpty, 1000);
          }
        };

        if (!KBWidget.isLibraryLoaded()) {
          // Hide all KB widgets if Rightnow client isn't loaded on the page.
          $('.kb-widget').hide();
        }
        else {
          // Rightnow client is loaded on the page successfully hence
          // hide KB widget display on the page if widget is empty.
          hideKBWidgetIfEmpty();
        }

      })
    }
  }

  /**
   * Check if widget content element is empty.
   *
   * @param {Object} $element
   *
   * @returns {boolean}
   *   TRUE if elements content is empty.
   */
  function isWidgetContentEmpty($element){
    return !$.trim($element.html()).length;
  }

  /**
   * Hide KB widget display from page if articles list is empty.
   */
  function hideKBWidgetDisplay(){
    var $widgetSelector = $('.kb-widget .KnowledgeSyndication');
    $widgetSelector.each(function () {
      var $thisElement = $(this);
      if (isWidgetContentEmpty($thisElement.find('.rn_Content .rn_List')) &&
        isWidgetContentEmpty($thisElement.find('.rn_Documents .rn_List'))) {
        $thisElement.closest('.kb-widget').hide();
      }
    });
  }

  /**
   * Get the search term from the input box.
   *
   * @param {string} instance_id The instance.
   *
   * @return {string} The search term.
   */
  function getKBSearchTerm(instance_id) {
    return document.getElementById('rn_Query' + instance_id).value;
  }

  /**
   * @description: Return configuration Knowledge base Object.
   * @returns {array} - Knowledge base Object.
   */
  function getKBConfig(setting, instance_id) {
    return {
      'module': setting.module,
      'type': setting.type,
      'instance_id': instance_id,
      'correction': setting.correction,
      'description': setting.description,
      'display_answers_in_overlay': setting.display_answers_in_overlay,
      'hide_initial_answers': setting.hide_initial_answers,
      'ext_docs': setting.ext_docs,
      'label_created': setting.label_created,
      'label_documents': setting.label_documents,
      'label_more_results': setting.label_more_results,
      'label_no_results': setting.label_no_results,
      'label_related_searches': setting.label_related_searches,
      'label_search_button': setting.label_search_button,
      'label_updated': setting.label_updated,
      'navigation': setting.navigation,
      'payload_size': setting.payload_size,
      'number_answers': setting.number_answers,
      'persist_prodcat': setting.persist_prodcat,
      'recommended': setting.recommended,
      'related': setting.related,
      'search_box': setting.search_box,
      'target': setting.target,
      'c': setting.c,
      'p': setting.p,
      'div_id': setting.div_id,
      'preprocess': setting.preprocess,
      'truncate_size': setting.truncate_size,
      'widget_type': setting.widget_type
    };
  }

  /**
   * @description: Return random generated id.
   * @returns {Integer} - Random id.
   */
  function getInstanceID() {
    return 'kbsw_' + (Math.floor(Math.random() * (30 - 1 + 1)) + 1);
  }

})(jQuery, Drupal);
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
