/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

require('dotenv').config();

module.exports = (on, config) => {
  require('cypress-terminal-report/src/installLogsPrinter')(on, {
    printLogsToConsole: 'always',
  });

  // `config` is the resolved Cypress config
  config.baseUrl = process.env.CLIENT_ENDPOINT;
  config.env = {
    identity: process.env.IDENTITY,
    authorization: process.env.AUTHORIZATION,
    clientEndpoint: process.env.CLIENT_ENDPOINT,
    CREDIT_CARD_ID: process.env.CYPRESS_CREDIT_CARD_ID,
    CREDIT_CARD_NUMBER: process.env.CYPRESS_CREDIT_CARD_NUMBER,
    CREDIT_CARD_EXP: process.env.CYPRESS_CREDIT_CARD_EXP,
    CREDIT_CARD_CVV: process.env.CYPRESS_CREDIT_CARD_CVV,
    CREDIT_CARD_PIN: process.env.CYPRESS_CREDIT_CARD_PIN,
    CREDIT_CARD_NEW_PIN: process.env.CYPRESS_CREDIT_CARD_NEW_PIN,
    DEBIT_CARD_ID: process.env.CYPRESS_DEBIT_CARD_ID,
    DEBIT_CARD_NUMBER: process.env.CYPRESS_DEBIT_CARD_NUMBER,
    DEBIT_CARD_EXP: process.env.CYPRESS_DEBIT_CARD_EXP,
    DEBIT_CARD_CVV: process.env.CYPRESS_DEBIT_CARD_CVV,
    DEBIT_CARD_PIN: process.env.CYPRESS_DEBIT_CARD_PIN,
    DEBIT_CARD_NEW_PIN: process.env.CYPRESS_DEBIT_CARD_NEW_PIN,
  };
  return config;
};
