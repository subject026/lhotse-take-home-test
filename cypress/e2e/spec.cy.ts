/// <reference types="cypress" />

import { supplier } from "../../src/data";

before(() => {
  cy.visit("/");
});

describe("App Renders Correct Initial Data", () => {
  it("Renders supplier name", () => {
    cy.contains(supplier.name);
  });
  it("Renders the correct tags for the general category", () => {
    supplier["tags-general"].forEach((tag) => {
      cy.contains(tag.name);
    });
  });
  it("Renders the correct tags for the portfolio category", () => {
    supplier["tags-portfolio"].forEach((tag) => {
      cy.contains(tag.name);
    });
  });
  it("Renders the correct tags for the certificates category", () => {
    supplier["tags-certificates"].forEach((tag) => {
      cy.contains(tag.name);
    });
  });
});

describe("Can add freetext tags to general category", () => {
  it("can add a single tag using enter key", () => {
    const newTagText = "new tag text";
    // creating an alias
    cy.get('[data-test="tags-general"]').as("tagsGeneral");
    cy.get("@tagsGeneral").find('[data-js="btn-add-tag"]').click();
    cy.focused().type(newTagText).type("{enter}");

    // there should no longer be a focused element
    cy.focused().should("not.exist");
    // there should no longer be a text input rendered
    cy.get("@tagsGeneral").find("input").should("not.exist");
    // general tag section should contain the new tag text
    cy.get("@tagsGeneral").contains(newTagText);
  });

  /*
  see request for tab feature: https://github.com/cypress-io/cypress/issues/299

  cypress-plugin-tab seems a bit buggy possibly doesn't support event.preventDafault():
  https://github.com/kuceb/cypress-plugin-tab/issues/52

  Maybe try keyboard plugin: https://www.npmjs.com/package/cypress-keyboard-plugin

  Or real events (only works with chrome apparently) with: https://github.com/dmtrKovalenko/cypress-real-events


  
  it("can add multiple tags using tab key", () => {
      const newTagText = [
        "multiple tags 1",
        "multiple tags 2",
        "multiple tags 1",
      ];
      // creating an alias
      cy.get('[data-test="tags-general"]').as("tagsGeneral");
      cy.get("@tagsGeneral").find('[data-js="btn-add-tag"]').click();
      cy.focused().type(newTagText[0]).tab();
      // cy.focused().should("exist");
      // cy.focused().type(newTagText[1]).tab();

      // cy.focused().type(newTagText[2]).tab();
      // newTagText.forEach((tag) => {
        // });
        
        // // input should still be focused
        // cy.focused().should("exist");
      });
      
    */
});
