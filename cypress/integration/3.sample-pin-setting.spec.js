/* E2E Cypress tests on resetting PIN via */
/* CVV via Bond SDK Card */

describe("Sample PIN Setting", () => {

  beforeEach(() => {

    cy.intercept("/api/v0/cards/set_pin").as("pin_setting");

    cy.visitPage("sample_pin_setting");

  });

  it("get temporary token from studio auth service", () => {

    //  Get Temporary token from Studio Auth Service
    //  Temporary token is required
    cy.getTempToken();

  });

  it("fill the brand backend section out in sample pin setting (Credit)", () => {

    // find card id, and temporary token inputs
    // and fill the form out
    cy.fillBrandBackendSectionOut(Cypress.env("CREDIT_CARD_ID"));

  });

  it("reset PIN in sample pin setting (Credit)", () => {

    // input credit card id, temporary token in brand backend section
    cy.fillBrandBackendSectionOut(Cypress.env("CREDIT_CARD_ID"));

    // input new PIN, and confirm new PIN in Brand APP section
    cy.get("#cc-form").get("iframe").then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).then(items => {
        cy.wrap(items[1])
          .find("[type=password]")
          .type(Cypress.env("CREDIT_CARD_NEW_PIN"));
        cy.wrap(items[2])
          .find("[type=password]")
          .type(Cypress.env("CREDIT_CARD_NEW_PIN"));
      });
    });

    // click on submit button to send the request to reset pin
    cy.get("[class=\"panel panel2\"]")
      .get("[class=\"action\"]")
      .find("#submit").click();
    cy.wait('@pin_setting');

    // verify the response indicating pin is changed successfully
    cy.get("[class=\"panel panel2\"]")
      .get("#result")
      .should("have.text",
              `card_id @ service: ${Cypress.env("CREDIT_CARD_ID")}\n      pin_changed @ service: true`);

  });

  it("reset PIN in sample pin setting (Debit)", () => {

    cy.fillBrandBackendSectionOut(Cypress.env("DEBIT_CARD_ID"));

    cy.get("#cc-form").get("iframe").then($iframe => {
      const $body = $iframe.contents().find("body");
      cy.wrap($body).then(items => {
        cy.wrap(items[1])
          .find("[type=password]")
          .type(Cypress.env("DEBIT_CARD_NEW_PIN"));
        cy.wrap(items[2])
          .find("[type=password]")
          .type(Cypress.env("DEBIT_CARD_NEW_PIN"));
      });
    });

    // click on submit button to send the request to reset pin
    cy.get("[class=\"panel panel2\"]")
      .get("[class=\"action\"]")
      .find("#submit")
      .click();
    cy.wait('@pin_setting');

    // verify the response indicating pin is changed successfully
    cy.get("[class=\"panel panel2\"]")
      .get("#result")
      .should("have.text",
              `card_id @ service: ${Cypress.env("DEBIT_CARD_ID")}\n      pin_changed @ service: true`);

  });

});