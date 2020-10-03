/**
 * @file
 * Attaches behaviors for the Clientside Validation jQuery module.
 */
(function ($, Drupal, drupalSettings) {
  'use strict';

  /**
   * Attaches jQuery validate behavior to forms.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *  Attaches the outline behavior to the right context.
   */
  Drupal.behaviors.cvJqueryValidate = {
    attach: function (context) {
      if (typeof drupalSettings.cvJqueryValidateOptions === 'undefined') {
        drupalSettings.cvJqueryValidateOptions = {};
      }

      if (typeof Drupal.Ajax !== 'undefined') {
        // Update Drupal.Ajax.prototype.beforeSend only once.
        if (typeof Drupal.Ajax.prototype.beforeSubmitCVOriginal === 'undefined') {
          var validateAll = 2;
          try {
            validateAll = drupalSettings.clientside_validation_jquery.validate_all_ajax_forms;
          }
          catch(e) {
            // Do nothing if we do not have settings or value in settings.
          }

          Drupal.Ajax.prototype.beforeSubmitCVOriginal = Drupal.Ajax.prototype.beforeSubmit;
          Drupal.Ajax.prototype.beforeSubmit = function (form_values, element_settings, options) {
            if (typeof this.$form !== 'undefined' && (validateAll === 1 || $(this.element).hasClass('cv-validate-before-ajax'))) {
              $(this.$form).removeClass('ajax-submit-prevented');

              $(this.$form).validate();
              if (!($(this.$form).valid())) {
                this.ajaxing = false;
                $(this.$form).addClass('ajax-submit-prevented');
                return false;
              }
            }

            return this.beforeSubmitCVOriginal();
          };
        }
      }

      if (drupalSettings.clientside_validation_jquery.force_validate_on_blur) {
        drupalSettings.cvJqueryValidateOptions.onfocusout = function(element) {
          // "eager" validation
          this.element(element);
        };
      }

      // Allow all modules to update the validate options.
      // Example of how to do this is shown below.
      $(document).trigger('cv-jquery-validate-options-update', drupalSettings.cvJqueryValidateOptions);

      $(context).find('form').each(function() {
        $(this).validate(drupalSettings.cvJqueryValidateOptions);
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
/**
 * @file
 * Attaches behaviors for the Clientside Validation jQuery module.
 */
(function ($, Drupal, debounce, CKEDITOR) {
  /**
   * Attaches jQuery validate behavoir to forms.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *  Attaches the outline behavior to the right context.
   */
  Drupal.behaviors.cvJqueryValidateCKEditor = {
    attach: function (context) {
      if (typeof CKEDITOR === 'undefined') {
        return;
      }
      var ignore = ':hidden';
      var not = [];
      for (var instance in CKEDITOR.instances) {
        if (CKEDITOR.instances.hasOwnProperty(instance)) {
          not.push('#' + instance);
        }
      }
      ignore += not.length ? ':not(' + not.join(', ') + ')' : '';
      $('form').each(function () {
        var validator = $(this).data('validator');
        if (!validator) {
          return;
        }
        validator.settings.ignore = ignore;
        validator.settings.errorPlacement = function(place, $element) {
          var id = $element.attr('id');
          var afterElement = $element[0];
          if (CKEDITOR.instances.hasOwnProperty(id)) {
            afterElement = CKEDITOR.instances[id].container.$;
          }
          place.insertAfter(afterElement);
        };
      });
      var updateText = function (instance) {
        return debounce(function (e) {
          instance.updateElement();
          var event = $.extend(true, {}, e.data.$);
          delete event.target;
          delete event.explicitOriginalTarget;
          delete event.originalTarget;
          delete event.currentTarget;
          $(instance.element.$).trigger(new $.Event(e.name, event));
        }, 250);
      };
      CKEDITOR.on('instanceReady', function () {
        for (var instance in CKEDITOR.instances) {
          if (CKEDITOR.instances.hasOwnProperty(instance)) {
            CKEDITOR.instances[instance].document.on("keyup", updateText(CKEDITOR.instances[instance]));
            CKEDITOR.instances[instance].document.on("paste", updateText(CKEDITOR.instances[instance]));
            CKEDITOR.instances[instance].document.on("keypress", updateText(CKEDITOR.instances[instance]));
            CKEDITOR.instances[instance].document.on("blur", updateText(CKEDITOR.instances[instance]));
            CKEDITOR.instances[instance].document.on("change", updateText(CKEDITOR.instances[instance]));
          }
        }
      });
    }
  };
})(jQuery, Drupal, Drupal.debounce, (typeof CKEDITOR === 'undefined') ? undefined : CKEDITOR);
;
/**
 * @file
 * Attaches behaviors for the Clientside Validation jQuery module.
 */
(function ($) {
  // Override clientside validation jquery validation options.
  // We do this to display the error markup same as in inline_form_errors.
  $(document).once('cvjquery').on('cv-jquery-validate-options-update', function (event, options) {
    options.errorElement = 'strong';
    options.showErrors = function(errorMap, errorList) {
      // First remove all errors.
      for (var i in errorList) {
        $(errorList[i].element).parent().find('.form-item--error-message').remove();
      }

      // Show errors using defaultShowErrors().
      this.defaultShowErrors();

      // Wrap all errors with div.form-item--error-message.
      $(this.currentForm).find('strong.error').each(function () {
        if (!$(this).parent().hasClass('form-item--error-message')) {
          $(this).wrap('<div class="form-item--error-message"/>');
        }
      });
    };
  });
})(jQuery);
;
/**
 * @file
 * Webform GDPR component functions.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Config instance for this library.
   *
   * @type {object}
   *   Config object.
   */
  Drupal.rml_webform_gdpr = {
    'submitted': false,
  };

  /**
   * Implements GDPR specific handlers on webform.
   *
   * @type {{attach: Drupal.behaviors.rml_webform_gdpr.attach}}
   */
  Drupal.behaviors.rml_webform_gdpr = {
    attach: function (context, settings) {

      /**
       * Helper to send tracking data to tealium via utag script.
       *
       * @param {Object} form
       *   Form instance.
       * @param {Object} $thisElement
       *   Submit element instance.
       */
      var sendUtagData = function (form, $thisElement) {
        // Default Tealium tag values.
        // Marketing values are in integer i.e. 0 - Opt out
        // or 1 - Implied consent and default value.
        var pageName = '';
        var pageApplicationName = 'Webform';
        var formRMPPost = 1;
        var formRMPEmail = 1;
        var formRMPTelephone = 1;
        var formRMPText = 1;
        var formEmail = '';
        var pageNodeID = '';
        var optionClassPrefix = 'gdpr-consent-option-';

        $('input, select, textarea', form).each(function () {
          var $formElement = $(this);
          var fieldName = $formElement.attr('name');
          var fieldValue = $formElement.val();

          // Get the marketing user selected checkbox values.
          if ($formElement.prop('checked')) {
            if ($formElement.hasClass(optionClassPrefix + 'post')) {
              formRMPPost = 0;
            }
            else if ($formElement.hasClass(optionClassPrefix + 'email')) {
              formRMPEmail = 0;
            }
            else if ($formElement.hasClass(optionClassPrefix + 'telephone')) {
              formRMPTelephone = 0;
            }
            else if ($formElement.hasClass(optionClassPrefix + 'text')) {
              formRMPText = 0;
            }
          }
          // Get user email.
          if (fieldName === 'email') {
            formEmail = fieldValue;
          }
        });
        // Get utag pageName, pageApplicationName, these values are set
        // after <body> tag.
        if (utag_data['pageName'] !== 'undefined') {
          pageName = utag_data['pageName'];
        }
        if (utag_data['pageApplicationName'] !== 'undefined') {
          pageApplicationName = utag_data['pageApplicationName'];
        }
        if (utag_data['pageNodeID'] !== 'undefined') {
          pageNodeID = utag_data['pageNodeID'];
        }
        // Remove nid from end of the string and append '>Form Confirmation
        // nid' at the end.
        pageName = Drupal.rml_webform_gdpr.pageName(pageName, pageNodeID);

        // Send all data to TealiumIQ.
        // function utag.view is defined in utag.js, this script loaded
        // after <body> tag.
        utag.view({
          'pageName': pageName,
          'pageApplicationName': pageApplicationName,
          // For confirmation page after user submit form.
          'pageApplicationStep': 'Confirmation Page',
          'formSID': Drupal.rml_webform_gdpr.getFormSID(),
          'formEmail': formEmail,
          'formRMPPost': formRMPPost,
          'formRMPPhone': formRMPTelephone,
          'formRMPEmail': formRMPEmail,
          'formRMPOther': formRMPText,
        }, function () {
          Drupal.rml_webform_gdpr.submitted = true;
          $thisElement.trigger('click');
        });
      };

      var form = $('.webform-submission-form');
      // On submit button click send data to TealiumIQ.
      $('input[type=submit]', form).on('click', function (event) {
        // Don't send data to utag service if already submitted.
        if (Drupal.rml_webform_gdpr.submitted) {
          return;
        }

        // Prevent the drupal submission until the utag tracking is finished.
        event.preventDefault();

        // Cache the current submit instance for later use.
        var $thisElement = $(this);
        // Check TealiumIQ utag_data is added below <body> tag.
        if (typeof utag_data !== 'undefined') {
          sendUtagData(form, $thisElement);
        }
      });

    }
  };

  /**
   * Helper function to alter pageName.
   *
   * @param {string} pageName
   *   pageName string to alter.
   * @param {integer} pageNodeID
   *   pageNodeID nid to append at the end.
   * @param {string} pageName
   *   Altered pageName.
   */
  Drupal.rml_webform_gdpr.pageName = function (pageName, pageNodeID) {
    var pageName = pageName.split(' ');
    pageName[pageName.length - 1] = '>Form Confirmation ' + pageNodeID;
    pageName = pageName.join(' ');

    return pageName;
  };

  /**
   * Generate unique form submission id to be sent to Tealium.
   *
   * Rule for creating unique sid is as follows :
   * Token 1: WEB (Text).
   * Token 2: formID (nodeID or webform id for standalone form).
   * Token 3: Epoch datetime.
   * Token 4: Random number between 0 to 9.
   *
   * @returns {string}
   *   Unique submission id.
   */
  Drupal.rml_webform_gdpr.getFormSID = function () {
    var formSID = 'WEB';
    if (drupalSettings.webform_utag_uuid) {
      formSID += drupalSettings.webform_utag_uuid;
    }
    formSID += !Date.now ? (new Date()).getTime() : Date.now();
    formSID += Math.floor(Math.random() * Math.floor(10));
    return formSID;
  };

})(jQuery, Drupal, drupalSettings);
;
