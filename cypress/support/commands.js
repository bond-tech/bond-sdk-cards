// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ***********************************************
// visit webpage
// ***********************************************
Cypress.Commands.add('visitPage', (name = 'index') => {
  cy.visit(`${Cypress.env('clientEndpoint')}/${name}.html`);

  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

// ***********************************************
// Retrieve temporary token from Studio Auth Service
// ***********************************************
Cypress.Commands.add('getTempToken', () => {
  cy.request({
    method: 'POST',
    url: 'https://api.bond.tech/api/v0/auth/key/temporary',
    headers: {
      'Content-Type': 'application/json',
      Identity: Cypress.env('identity'),
      Authorization: Cypress.env('authorization'),
    },
    body: {
      customer_id: '7cc7edf5-028f-437c-802a-7fad4f224252',
    },
    timeout: 120000,
    failOnStatusCode: false,
  })
    .as('temp_token')
    .then((resp) => {
      if (
        !(
          resp.isOkStatusCode ||
          (ignoreIfExists && resp.body === IGNORED_ERROR_MSG)
        )
      ) {
        const EXCEPTION_MSG = 'Exception when requesting temporary token';
        console.error(EXCEPTION_MSG + ':\n' + JSON.stringify(resp));
        throw new Error(
          EXCEPTION_MSG +
            '.\nCode: ' +
            JSON.stringify(resp.status) +
            '\nMessage:' +
            JSON.stringify(resp.body)
        );
      }
    });

  cy.get('@temp_token').should((response) => {
    expect(response).to.have.property('body');
    expect(response.body).to.have.property('Identity');
    expect(response.body).to.have.property('Authorization');
    window.Identity = response.body['Identity'];
    window.Authorization = response.body['Authorization'];
  });
});

// ***********************************************
// Form in Brand Backend Section filled out
// - three input fields:
//   Card id, Identity, and Authorization
// ***********************************************
Cypress.Commands.add('fillBrandBackendSectionOut', (card_id) => {
  cy.get('#card-id').type(card_id).should('have.value', card_id);
  cy.get('#identity')
    .type(`${window.Identity}`)
    .should('have.value', `${window.Identity}`);
  cy.get('#authorization')
    .type(`${window.Authorization}`)
    .should('have.value', `${window.Authorization}`);
});

// ***********************************************
// Verify the values in Brand App Section of
// Sample Card Show and Sample Card Show Multiple
// - three values in response to be verified:
//   Card number, Expiration Date, and CVV
// ***********************************************
Cypress.Commands.add('verifyReavealedInfo', (card_num, card_exp, card_cvv) => {
  cy.get('[name=number]').then(($iframe) => {
    const $body = $iframe.contents().find('body');
    cy.wrap($body).find('#result').invoke('text').should('include', card_num);
  });

  cy.get('[name=expiry]').then(($iframe) => {
    const $body = $iframe.contents().find('body');
    cy.wrap($body).find('#result').invoke('text').should('include', card_exp);
  });

  cy.get('[name=cvv]').then(($iframe) => {
    const $body = $iframe.contents().find('body');
    cy.wrap($body).find('#result').invoke('text').should('include', card_cvv);
  });
});
