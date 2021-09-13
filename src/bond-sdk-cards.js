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
    this.BONDSTUDIO = '/api/v0/cards';

    // Internal Show.js initialization
    this.internalShow = window.VGSShow.create(
      live ? 'tntmfo8fafa' : 'tntc4x4iymh',
      function (state) {}
    );
    this.internalShow.request = this.internalShow.__proto__.request;
    this.internalShow.replace = this.internalShow.SERIALIZERS.replace;
    this.internalShow.copyFrom = this.internalShow.__proto__.copyFrom;

    /**
     * @description Create new form instance
     * @return none
     */
    this.resetFormInstance = () => {
      // // Internal Collect.js initialization
      this.internalForm = window.VGSCollect.create(
          live ? 'tntmfo8fafa' : 'tntc4x4iymh',
          live ? 'live' : 'sandbox',
          function (state) {}
      );
      this.internalForm.field = this.internalForm.__proto__.field;
      this.internalForm.submit = this.internalForm.__proto__.submit;
      this.internalForm.reset = this.internalForm.__proto__.reset;
    }

    this.resetFormInstance();

    this.fieldEnum = {
      number: 'card_number',
      cvv: 'cvv',
      expiry: 'expiry_date',
    };

    this.firstrun = true;
  }

  _internalShowField(requestParams) {
    // To allow multiple show/hides, it seems show.js needs
    // a field we leave rendered (but we'll keep it hidden)
    if (this.firstrun) {
      const hiddenElm = document.createElement('div');
      hiddenElm.setAttribute('id', `bond_hidden`);
      hiddenElm.style.display = 'none';
      document.body.appendChild(hiddenElm);
      const newIframe = this.internalShow.request(requestParams);
      if (newIframe) {
        newIframe.render(`#bond_hidden`);
      }
      this.firstrun = false;
    }
  }

  /**
   * @description Resolves promise only after iframe async operation is finished
   * @param {Object} requestParams A configuration needed for request
   * @param {String} htmlSelector A selector for the field/element where the
   * iFrame will be placed.
   * @param {Object} [css={}] An object of CSS rules to apply to the response.
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either return an iFrame with the appropriate data or an error.
   */
  _delayedPromise(requestParams, htmlSelector, css) {
    return new Promise((resolve, reject) => {
      const newIframe = this.internalShow.request(requestParams);
      if (newIframe) {
        const iframe = newIframe.render(htmlSelector, css);
        const subscribe = (event) => {
          if (
            event.data.messageName === 'update' &&
            event.data.payload.revealed === true
          ) {
            resolve(iframe);
            window.removeEventListener('message', subscribe);
          }
        };
        window.addEventListener('message', subscribe, false);
      } else {
        reject();
      }
    });
  }

  /**
   * The FieldType
   * @typedef {('number'|'cvv'|'expiry')} FieldType
   */

  _createRequestParams({
    cardId,
    identity,
    authorization,
    field,
    htmlWrapper,
    format,
  }) {
    return {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Identity: identity,
        Authorization: authorization,
      },
      path: `${this.BONDSTUDIO}/${cardId}`,
      name: field,
      // The JSONPath that the request will show the value for
      jsonPathSelector: this.fieldEnum[field],
      htmlWrapper,
      ...(format.hasOwnProperty('replaceThis') &&
        format.hasOwnProperty('withThis') && {
          serializers: [
            this.internalShow.replace(
              format.replaceThis,
              format.withThis,
              format.count
            ),
          ],
        }),
    };
  }

  /**
   * @description Show card data including number, expiry, cvv
   * @param {String} cardId The unique ID used to identify a specific card.
   * @param {String} identity The temporary identity token allowing this call.
   * @param {String} authorization The temporary authorization token.
   * @param {FieldType} field The field to get/show
   * @param {String} [htmlWrapper="text"] The expected type of response data.
   * 'image' is wrapped in an <img src='<revealed_data>'/> HTML tag. 'text'
   * would be inserted into a <span> element inside the iframe.
   * @param {String} htmlSelector A selector for the field/element where the
   * iFrame will be placed.
   * @param {Object} [format] An object containing a regex pattern to find and
   * replace in the response.
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
    htmlWrapper = 'text',
    htmlSelector,
    format = {},
    css = {},
  }) {
    const requestParams = this._createRequestParams({
      cardId,
      identity,
      authorization,
      field,
      htmlWrapper,
      format,
    });

    this._internalShowField(requestParams);

    return this._delayedPromise(requestParams, htmlSelector, css);
  }

  /**
   * The FieldParams has all parameters regarding to card field
   * @typedef {Object} FieldParams
   * @property {String} [htmlWrapper="text"] The expected type of response data.
   * 'image' is wrapped in an <img src='<revealed_data>'/> HTML tag. 'text'
   * would be inserted into a <span> element inside the iframe.
   * @property {String} htmlSelector A selector for the field/element where the
   * iFrame will be placed.
   * @property {Object} [format] An objects containing a regex pattern to find and
   * replace.
   * @property {String} format.replaceThis String is to be replaced with the
   * new value. Please use the format where regexp is not enclosed between
   * slashes but do use quotation marks. ex: '(\\d{4})(\\d{4})(\\d{4})(\\d{4})'
   * @property {String} format.withThis The string that replaces the substring
   * specified by the specified regexp. ex: '$1-$2-$3-$4'
   * @property {String} [format.count] Optional, defines how many times a certain
   * string should be replaced.
   * @property {Object} [css={}] An object of CSS rules to apply to the response.
   */

  /**
   * @description Show multiple card data fields including number, expiry, cvv
   * @param {String} cardId The unique ID used to identify a specific card.
   * @param {String} identity The temporary identity token allowing this call.
   * @param {String} authorization The temporary authorization token.
   * @param {Object.<FieldType, FieldParams>} fields An object containing the fields to request
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either return an iFrame with the appropriate data or an error.
   */
  showMultiple({ cardId, identity, authorization, fields }) {
    const requestedFields = Object.entries(fields).filter(([field]) =>
      Object.keys(this.fieldEnum).includes(field)
    );

    if (Object.keys(fields).length !== requestedFields.length) {
      return Promise.reject(new Error('Incorrect field name present!'));
    }

    if (!requestedFields.length) {
      return Promise.reject(new Error('Have to be one or more fields!'));
    }

    const requests = requestedFields.map(
      ([field, { htmlWrapper = 'text', format = {} }]) => {
        return {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Identity: identity,
            Authorization: authorization,
          },
          path: `${this.BONDSTUDIO}/${cardId}`,
          name: field,
          // The JSONPath that the request will show the value for
          jsonPathSelector: this.fieldEnum[field],
          htmlWrapper,
          ...(format.hasOwnProperty('replaceThis') &&
            format.hasOwnProperty('withThis') && {
              serializers: [
                this.internalShow.replace(
                  format.replaceThis,
                  format.withThis,
                  format.count
                ),
              ],
            }),
        };
      }
    );

    this._internalShowField(requests[0]);

    const createPromises = (requestsArr) => {
      return requestsArr.map(
        (requestParams) =>
          new Promise((resolve, reject) => {
            const newIframe = this.internalShow.request(requestParams);
            if (newIframe) {
              const { htmlSelector, css = {} } = fields[requestParams.name];
              const iframe = newIframe.render(htmlSelector, css);
              const subscribe = (event) => {
                if (
                  event.data.messageName === 'update' &&
                  event.data.payload.revealed === true
                ) {
                  resolve({
                    params: requestParams,
                    iframe,
                  });
                  window.removeEventListener('message', subscribe);
                }
              };
              window.addEventListener('message', subscribe, false);
            } else {
              reject();
            }
          })
      );
    };

    const DEEP_NUMBER = 5;
    let deep = 0;
    const send = (requestsArr, fulfilledHashMap) => {
      if (deep === DEEP_NUMBER) {
        return Object.values(fulfilledHashMap).map((req) => {
          return req.iframe;
        });
      }

      const promises = createPromises(requestsArr);

      return Promise.allSettled(promises).then((response) => {
        const successfulRequests = response.filter(
          (item) => item.status === 'fulfilled'
        );

        if (successfulRequests.length === requests.length) {
          return successfulRequests.map((req) => {
            return req.value.iframe;
          });
        }

        const fulfilledHash = successfulRequests.reduce(
          (acc, item) => ({ ...acc, [item.value.params.name]: item.value }),
          fulfilledHashMap || {}
        );

        const rejected = requestsArr.filter(
          (requestParams) =>
            !Object.keys(fulfilledHash).includes(requestParams.name)
        );

        deep++;
        return send(rejected, fulfilledHash);
      });
    };

    return send(requests);
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
    htmlWrapper = 'text',
    htmlSelector,
    css = {},
  }) {
    const requestParams = {
      method: reset ? 'PATCH' : 'GET',
      headers: {
        'Content-type': 'application/json',
        Identity: identity,
        Authorization: authorization,
      },
      path: `${this.BONDSTUDIO}/${cardId}/pin`,
      name: 'pin',
      // The JSONPath that the request will show the value for
      jsonPathSelector: 'pin',
      htmlWrapper,
    };

    this._internalShowField(requestParams);

    return this._delayedPromise(requestParams, htmlSelector, css);
  }

  /**
   * @description Initilize a Field in a Form to submit for card manipulation
   * @param {String} selector CSS selector that points to the element where
   * the field will be added.
   * @param {('current_pin'|'new_pin'|'confirm_pin')} type The type of the field targeted.
   * @param {Object} [css={}] An object of CSS rules to apply to the field.
   * @param {String} [placeholder] Text displayed when the field is empty.
   * @param {String} [successColor] Text color when the field is valid.
   * @param {String} [errorColor] Text color when the field is invalid.
   * @param {String} [color] Text color.
   * @param {String} [lineHeight] Line height value.
   * @param {String} [fontSize] Size of text.
   * @param {String} [fontFamily] font family used in the text.
   * @param {Boolean} [disabled] Specifies that the input field is disabled.
   * @param {Boolean} [readOnly] Specifies that the input field is read only.
   * @param {String} [autoFocus] Specifies that the input field should
   * automatically get focus when the page loads.
   * @param {Boolean} [hideValue=true] Specifies that the input field should be masked with ****
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
    hideValue = true,
  }) {
    const validations = type === 'new_pin' ? ['required'] : [];
    if (type === 'confirm_pin')
      validations.push({
        type: 'compareValue',
        params: {
          field: 'new_pin',
          function: 'match',
        },
      });

    const requestParams = {
      type: 'card-security-code',
      validations: validations,
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
      hideValue,
    };

    return new Promise((resolve, reject) => {
      const newField = this.internalForm.field(selector, requestParams);
      if (newField) {
        resolve(newField);
      } else {
        reject(`Field ${type} not initialized.`);
      }
    });
  }

  /**
   * @description Copy card data (one of number, expiry, cvv)
   * @param {Object} iframe An iframe object returned from show method
   * @param {String} htmlSelector A selector for the field/element where the
   * iFrame will be placed.
   * @param {Object} [css={}] An object of CSS rules to apply to the response.
   * @param {String} [text='Copy'] A text for button.
   * @param {Function} [callback=function(){}] A function to call when copy handler called.
   * @return {Promise} Returns a Promise that, when fulfilled,
   * will either return an iFrame with the appropriate data or an error.
   */
  copy({ iframe, htmlSelector, css = {}, text = 'Copy', callback = () => {} }) {
    return new Promise((resolve, reject) => {
      try {
        const copyButton = this.internalShow.copyFrom(
          iframe,
          { text },
          callback
        );

        const btn = copyButton.render(htmlSelector, css);

        resolve(btn);
      } catch (error) {
        reject(error);
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
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
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
        this.resetFormInstance();
      } else {
        reject('Form Submit failed.');
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
