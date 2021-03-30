/**
 * @classdesc Represents the Bond Cards SDK. It allows developers to make
 * all calls to the APIs that securely store PCI data with a single function.
 * @class
 */
class BondCards {
  /**
   * Create a BondCards instance.
   * @constructor
   * @param {boolean} [live=true] Set to True to work with live data.
   * False for sandbox data
   */
  constructor({ live = false }) {
    this.BONDSTUDIO = "/api/v0/cards";
    // Internal Show.js initialization
    this.internalShow = window.VGSShow.create(
      live ? "tntmfo8fafa" : "tntc4x4iymh",
      function (state) {}
    );
    this.internalShow.request = this.internalShow.__proto__.request;
    this.internalShow.replace = this.internalShow.SERIALIZERS.replace;

    // // Internal Collect.js initialization
    this.internalForm = window.VGSCollect.create(
      live ? "tntmfo8fafa" : "tntc4x4iymh",
      live ? "live" : "sandbox",
      function (state) {}
    );
    this.internalForm.field = this.internalForm.__proto__.field;
    this.internalForm.submit = this.internalForm.__proto__.submit;
    this.internalForm.reset = this.internalForm.__proto__.reset;
  }

  /**
   * @description Show card data including number, expiry, cvv
   * @param {String} cardId The unique ID used to identify a specific card.
   * @param {String} identity The temporary identity token allowing this call.
   * @param {String} authorization The temporary authorization token.
   * @param {('number'|'cvv'|'expiry')} field The field to get/show
   * @param {String} [htmlWrapper="text"] The expected type of response data.
   * 'image' is wrapped in an <img src='<revealed_data>'/> HTML tag. 'text'
   * would be inserted into a <span> element inside the iframe.
   * @param {String} htmlSelector A selector for the field/element where the
   * iFrame will be placed.
   * @param {Object} [format] An objects containing a regex pattern to find and
   * replace.
   * @param {String} format.replaceThis String is to be replaced with the
   * new value. Please use the format where regexp is not enclosed between
   * slashes but do use quotation marks. ex: '(\\d{4})(\\d{4})(\\d{4})(\\d{4})'
   * @param {String} format.withThis The string that replaces the substring
   * specified by the specified regexp. ex: '$1-$2-$3-$4'
   * @param {String} [format.count] Optional, defines how many times a certain
   * string should be replaced.
   * @param {Object} [css={}] An object of CSS rules to apply to the response.
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either return an iFrame with the appropriate data or an error.
   */
  show({
    cardId,
    identity,
    authorization,
    field,
    htmlWrapper = "text",
    htmlSelector,
    format = {},
    css = {},
  }) {
    const fieldEnum = {
      number: "card_number",
      cvv: "cvv",
      expiry: "expiry_date",
    };

    const requestParams = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Identity: identity,
        Authorization: authorization,
      },
      path: `${this.BONDSTUDIO}/${cardId}`,
      name: field,
      // The JSONPath that the request will show the value for
      jsonPathSelector: fieldEnum[field],
      htmlWrapper,
      ...(format.hasOwnProperty("replaceThis") &&
        format.hasOwnProperty("withThis") && {
          serializers: [
            this.internalShow.replace(
              format.replaceThis,
              format.withThis,
              format.count
            ),
          ],
        }),
    };

    return new Promise((resolve, reject) => {
      const newIframe = this.internalShow.request(requestParams);
      if (newIframe) {
        resolve(newIframe.render(htmlSelector, css));
      } else {
        reject();
      }
    });
  }

  /**
   * @description Show multiple card data fields including number, expiry, cvv
   * @param {String} cardId The unique ID used to identify a specific card.
   * @param {String} identity The temporary identity token allowing this call.
   * @param {String} authorization The temporary authorization token.
   * @param {Object} fields An object containing the fields to request
   * @param {('number'|'cvv'|'expiry')} fields.key The field name to get/show
   * @param {String} fields.key.[htmlWrapper="text"] The expected type of response data.
   * 'image' is wrapped in an <img src='<revealed_data>'/> HTML tag. 'text'
   * would be inserted into a <span> element inside the iframe.
   * @param {String} fields.key.htmlSelector A selector for the field/element where the
   * iFrame will be placed.
   * @param {Object} fields.key.[format] An objects containing a regex pattern to find and
   * replace.
   * @param {String} fields.key.format.replaceThis String is to be replaced with the
   * new value. Please use the format where regexp is not enclosed between
   * slashes but do use quotation marks. ex: '(\\d{4})(\\d{4})(\\d{4})(\\d{4})'
   * @param {String} fields.key.format.withThis The string that replaces the substring
   * specified by the specified regexp. ex: '$1-$2-$3-$4'
   * @param {String} fields.key.[format.count] Optional, defines how many times a certain
   * string should be replaced.
   * @param {Object} fields.key.[css={}] An object of CSS rules to apply to the response.
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either return an iFrame with the appropriate data or an error.
   */
  showMultiple({
    cardId,
    identity,
    authorization,
    fields,
  }) {
    const fieldEnum = {
      number: "card_number",
      cvv: "cvv",
      expiry: "expiry_dat",
    };

    const requestedFields = Object.entries(fields)
      .filter(([field]) => Object.keys(fieldEnum).includes(field))

    if(Object.keys(fields).length !== requestedFields.length){
      return Promise.reject(new Error('Incorrect field name present!'));
    }

    if(!requestedFields.length){
      return Promise.reject(new Error('Have to be one or more fields!'));
    }

    const requests = requestedFields
      .map(([field, { htmlWrapper = "text", format = {} }]) => {
        return {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Identity: identity,
            Authorization: authorization,
          },
          path: `${this.BONDSTUDIO}/${cardId}`,
          name: field,
          // The JSONPath that the request will show the value for
          jsonPathSelector: fieldEnum[field],
          htmlWrapper,
          ...(format.hasOwnProperty("replaceThis") &&
            format.hasOwnProperty("withThis") && {
              serializers: [
                this.internalShow.replace(
                  format.replaceThis,
                  format.withThis,
                  format.count
                ),
              ],
            }),
        }
      });

    const promises = requests.map(requestParams => new Promise((resolve, reject) => {
      const newIframe = this.internalShow.request(requestParams);
      if (newIframe) {
        const { htmlSelector, css = {} } = fields[requestParams.name];
        resolve(newIframe.render(htmlSelector, css));
      } else {
        reject();
      }
    }))


    return Promise.all(promises);
  }

  /**
   * @description Show card PIN data
   * @param {String} cardId The unique ID used to identify a specific card.
   * @param {String} identity The temporary identity token allowing this call.
   * @param {String} authorization The temporary authorization token.
   * @param {Boolean} [reset=false] Reset the PIN and view
   * @param {String} [htmlWrapper="text"] The expected type of response data.
   * 'image' is wrapped in an <img src='<revealed_data>'/> HTML tag. 'text'
   * would be inserted into a <span> element inside the iframe.
   * @param {String} htmlSelector A selector for the field/element where the
   * iFrame will be placed.
   * @param {Object} [css={}] An object of CSS rules to apply to the response.
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either return an iFrame with the appropriate data or an error.
   */
  showPIN({
    cardId,
    identity,
    authorization,
    reset = false,
    htmlWrapper = "text",
    htmlSelector,
    css = {},
  }) {
    const requestParams = {
      method: reset ? "PATCH" : "GET",
      headers: {
        "Content-type": "application/json",
        Identity: identity,
        Authorization: authorization,
      },
      path: `${this.BONDSTUDIO}/${cardId}/pin`,
      name: "pin",
      // The JSONPath that the request will show the value for
      jsonPathSelector: "pin",
      htmlWrapper,
    };

    return new Promise((resolve, reject) => {
      const newIframe = this.internalShow.request(requestParams);
      if (newIframe) {
        resolve(newIframe.render(htmlSelector, css));
      } else {
        reject();
      }
    });
  }

  /**
   * @description Initilize a Field in a Form to submit for card manipulation
   * @param {String} selector CSS selector that points to the element where
   * the field will be added.
   * @param {('current_pin'|'new_pin')} type The type of the field targeted.
   * @param {Object} [css={}] An object of CSS rules to apply to the field.
   * @param {String} [placeholder] Text displayed when the field is empty.
   * @param {String} [successColor] Text color when the field is valid.
   * @param {String} [errorColor] Text color when the field is invalid.
   * @param {String} [color] Text color.
   * @param {String} [lineHeight] Line height value.
   * @param {String} [fontSize] Size of text.
   * @param {String} [fontFamily] font family used in the text.
   * @param {'disabled'} [disabled] Specifies that the input field is disabled.
   * @param {'readonly'} [readOnly] Specifies that the input field is read only.
   * @param {String} [autoFocus] Specifies that the input field should
   * automatically get focus when the page loads.
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either initialize the field or return an error.
   */
  field({
    selector,
    type,
    css = {},
    placeholder,
    successColor,
    errorColor,
    color,
    lineHeight,
    fontSize,
    fontFamily,
    disabled,
    readOnly,
    autoFocus,
  }) {
    const requestParams = {
      type: "card-number",
      validations: type === "new_pin" ? ["required"] : [],
      name: type,
      css,
      placeholder,
      successColor,
      errorColor,
      color,
      lineHeight,
      fontSize,
      fontFamily,
      disabled,
      readOnly,
      autoFocus,
    };

    return new Promise((resolve, reject) => {
      const newField = this.internalForm.field(selector, requestParams);
      if (newField) {
        resolve(newField);
      } else {
        reject(`Field ${name} not initialized.`);
      }
    });
  }

  /**
   * @callback successCallback
   * @param {String} status HTTP status code of HTTPRequest
   * @param {Object} response Data object of the response
   */

  /**
   * @callback errorCallback
   * @param {Object} errors Object of the error messages
   */

  /**
   * @description Show appropriate card data
   * @param {String} cardId The unique ID used to identify a specific card.
   * @param {String} identity The temporary identity token allowing this call.
   * @param {String} authorization The temporary authorization token.
   * @param {String} currentPin The value of the current pin number.
   * @param {String} newPin The value of the new pin number.
   * @param {successCallback} callback Function that will be executed
   * when the HTTPRequest has finished successfully.
   * @param {errorCallback} callback Function Error handling callback. Will be
   * triggered if one of the fields has an invalid value on submit. By default,
   * it will push the error messages to the console.
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either return an iFrame with the appropriate data or an error.
   */
  submit({
    cardId,
    identity,
    authorization,
    currentPin = undefined,
    newPin,
    successCallback,
    errorCallback,
  }) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Identity: identity,
        Authorization: authorization,
      },
      data: {
        card_id: cardId,
        new_pin: newPin,
      },
    };

    return new Promise((resolve, reject) => {
      const submitResult = this.internalForm.submit(
        `${this.BONDSTUDIO}/set_pin`,
        options,
        successCallback,
        errorCallback
      );
      if (submitResult) {
        resolve(submitResult);
      } else {
        reject("Form Submit failed.");
      }
    });
  }

  /**
   * @description Reset the form or a field
   */
  reset() {
    return this.internalForm.reset();
  }
}

module.exports = BondCards;
