/// <reference types="Cypress" />

describe("Content load tests", () => {
  beforeEach(() => {
    cy.visit("/").get("ul").injectAxe();
  });

  it("Finds structured data in the list", () => {
    cy.findByRole("heading").should("have.attr", "href");
    cy.get("address").should("have.descendants", "br");
  });
});
