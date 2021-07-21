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
  // `on` is used to hook into various events Cypress emits
  require('cypress-log-to-output').install(on, (type, event) => {
    // return true or false from this plugin to control if the event is logged
    // `type` is either `console` or `browser`
    // if `type` is `browser`, `event` is an object of the type `LogEntry`:
    //  https://chromedevtools.github.io/devtools-protocol/tot/Log#type-LogEntry
    // if `type` is `console`, `event` is an object of the type passed to
    // `Runtime.consoleAPICalled`:
    //  https://chromedevtools.github.io/devtools-protocol/tot/Runtime#event-consoleAPICalled
    // for example, to only show error events:
    // if (event.level === 'error' || event.type === 'error') {
    //   return true;
    // }
    // return false;

    return true;
  });

  // `config` is the resolved Cypress config
  config.baseUrl = process.env.CLIENT_ENDPOINT;
  config.env = {
    identity: process.env.IDENTITY,
    authorization: process.env.AUTHORIZATION,
    clientEndpoint: process.env.CLIENT_ENDPOINT
  };
  return config;
};
