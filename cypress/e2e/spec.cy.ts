/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

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
    cy.get('[data-test="tags-general"]').as("tagsGeneral");
    const newTagText = "new tag text";
    // creating an alias
    cy.get("@tagsGeneral").find('[data-js="btn-add-tag"]').click();
    cy.focused().type(newTagText).type("{enter}");
    cy.focused().should("not.exist");
    // there should no longer be a text input rendered
    cy.get("@tagsGeneral").find("input").should("not.exist");
    // general tag section should contain the new tag text
    cy.get("@tagsGeneral").contains(newTagText);
  });

  it("can add multiple tags using tab key", () => {
    const newTagText = [
      "multiple tags 1",
      "multiple tags 2",
      "multiple tags 1",
    ];
    // creating an alias
    cy.get('[data-test="tags-general"]').as("tagsGeneral");
    cy.get("@tagsGeneral").find('[data-js="btn-add-tag"]').click();
    cy.focused().type(newTagText[0]).realPress("Tab");
    cy.focused().type(newTagText[1]).realPress("Tab");
    cy.focused().type(newTagText[2]).realPress("Tab");
    // page should now contain new tag text
    newTagText.forEach((tag) => {
      cy.contains(tag);
    });
  });
});
