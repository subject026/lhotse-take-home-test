/// <reference types="cypress" />
/// <reference types="cypress-real-events" />

import { supplier, suggestedTagsPortfolio } from "../../src/data";

before(() => {
  cy.visit("/");
});

describe("App renders correct initial data", () => {
  it("renders supplier name", () => {
    cy.contains(supplier.name);
  });

  it("general category renders the correct tags", () => {
    supplier["tags-general"].forEach((tag) => {
      cy.contains(tag.name);
    });
  });
  it("portfolio category renders the correct tags", () => {
    supplier["tags-portfolio"].forEach((tag) => {
      cy.contains(tag.name);
    });
  });

  it("certificates category renders the correct tags", () => {
    supplier["tags-certificates"].forEach((tag) => {
      cy.contains(tag.name);
    });
  });
});

describe("can add freetext tags to general category", () => {
  it("can add a single tag using enter key", () => {
    const newTagText = "new tag text";
    cy.get('[data-test="tags-general"]').as("tagsGeneral");

    cy.get("@tagsGeneral").find('[data-test="btn-add-tag"]').click();
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

    cy.get('[data-test="tags-general"]').as("tagsGeneral");
    cy.get("@tagsGeneral").find('[data-test="btn-add-tag"]').click();
    cy.focused().type(newTagText[0]).realPress("Tab");
    cy.focused().type(newTagText[1]).realPress("Tab");
    cy.focused().type(newTagText[2]).realPress("Tab");

    newTagText.forEach((tag) => {
      cy.contains(tag);
    });
  });
});

describe("can add suggested tags to portfolio section", () => {
  it("can add a single tag using enter key", () => {
    cy.get('[data-test="tags-portfolio"]').as("tagsPortfolio");

    cy.get("@tagsPortfolio").find('[data-test="btn-add-tag"]').click();
    cy.get("@tagsPortfolio")
      .find('[data-test="input-select"]')
      .focus()
      .realPress("{enter}");

    cy.focused().should("not.exist");
    cy.get("@tagsPortfolio").find("input").should("not.exist");

    cy.get("@tagsPortfolio").contains(suggestedTagsPortfolio[0]);
  });

  it("can add multiple tags using tab key", () => {
    cy.get('[data-test="tags-portfolio"]').as("tagsPortfolio");

    cy.get("@tagsPortfolio").find('[data-test="btn-add-tag"]').click();
    cy.get("@tagsPortfolio")
      .find('[data-test="input-select"]')
      .focus()
      .realPress("{downarrow}")
      .realPress("Tab")
      .realPress("{downarrow}")
      .realPress("{downarrow}")
      .realPress("{downarrow}")
      .realPress("Tab");

    cy.get("@tagsPortfolio").contains(suggestedTagsPortfolio[1]);
    cy.get("@tagsPortfolio").contains(suggestedTagsPortfolio[2]);
  });
});

describe("can remove appropriate tags", () => {
  it("can remove all tags except first tag in list", () => {
    // click all remove-tag buttons in a section
    cy.get('[data-test="tags-general"]')
      .find('[data-test="btn-remove-tag"]')
      .each((tag) => {
        cy.wrap(tag).click();
      });
    // should still find a tag in that section afterwards
    cy.get('[data-test="tags-general"]')
      .find('[data-test="tag"]')
      .should("exist");
  });
});
