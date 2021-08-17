/* E2E Cypress tests on getting card number, expiration date, */
/* CVV via Bond SDK Card */

describe('Sample Card Show Form Multiple', () => {

  beforeEach(() => {

    cy.visitPage('sample_card_show_multiple');

  })

  it('get temporary token from studio auth service', () => {

    //  Get Temporary token from Studio Auth Service
    //  Temporary token is required
    cy.getTempToken();

  });

  it.skip('fill the form out in sample card show multiple (Credit)', () => {

    // find card id, and temporary token inputs
    // and fill the form out
    cy.fillBrandBackendSectionOut(Cypress.env('CREDIT_CARD_ID'));
  
  });

  it.skip('reveal card information in sample card show multiple (Credit)', () => {

    // clean up default values in card number, expiration date and cvv
    cy.get('#num').invoke('val','')
    cy.get('#exp').invoke('val','')
    cy.get('#cvv').invoke('val','')

    // fill out the form (credit card id, temporary token) in brand backend section
    cy.fillBrandBackendSectionOut(Cypress.env('CREDIT_CARD_ID'));

    cy.intercept("GET",`/api/v0/cards/${Cypress.env('CREDIT_CARD_ID')}`)
      .as("credit_card_show_multiple");

    // click on reveal button
    cy.get('#toggle').click();
    cy.wait('@credit_card_show_multiple');

    // varify the response, the returned credit card number, expiration date and cvv
    cy.verifyReavealedInfo( Cypress.env('CREDIT_CARD_NUMBER'),
                            Cypress.env('CREDIT_CARD_EXP'),
                            Cypress.env('CREDIT_CARD_CVV'));
    
  });

  it('fill the form out in sample card show multiple (Debit)', () => {

    // find card id, and temporary token inputs
    // and fill the form out - debit card id
    cy.fillBrandBackendSectionOut(Cypress.env('DEBIT_CARD_ID'));
    
  });

  it('reveal card information in sample card show multiple (Debit)', () => {

    // clean up default values in card number, expiration date and cvv
    cy.get('#num').invoke('val','')
    cy.get('#exp').invoke('val','')
    cy.get('#cvv').invoke('val','')

    // fill out the form (debit card id, temporary token) in brand backend section
    cy.fillBrandBackendSectionOut(Cypress.env('DEBIT_CARD_ID'));
  
    cy.intercept("GET",`/api/v0/cards/${Cypress.env('DEBIT_CARD_ID')}`)
      .as("debit_card_show_multiple");

    // click on reveal button
    cy.get('#toggle').click();
    cy.wait('@debit_card_show_multiple');

    // varify the response, the returned debit card number, expiration date and cvv
    cy.verifyReavealedInfo( Cypress.env('DEBIT_CARD_NUMBER'),
                            Cypress.env('DEBIT_CARD_EXP'),
                            Cypress.env('DEBIT_CARD_CVV'));

  });  

});