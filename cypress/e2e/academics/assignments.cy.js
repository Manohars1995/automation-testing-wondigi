/// <reference types="cypress" />

describe("Academics → Assignments Module", () => {

  before(() => {
    cy.visit("https://test.wondigi.com");
    cy.contains("Academics", { timeout: 20000 }).click();
    cy.contains("Assignments").click();
  });

  it("AS001 - Open assignments page", () => {
    cy.contains("Assignments").should("exist");
  });

  it("AS002 - Create assignment", () => {
    cy.contains("Add").click();
    cy.contains("Create Assignment").should("exist");
  });

  it("AS003 - Assignment form", () => {
    cy.get("input").eq(0).should("not.have.value", "");
    cy.get("input").eq(1).click();
    cy.get("li").first().click();
  });

  it("AS004 - File upload", () => {
    cy.get("input[type='file']").selectFile("cypress/fixtures/sample.pdf", { force: true });
  });

  it("AS005 - Dropdowns", () => {
    cy.get("select").eq(0).select("Project-Based");
    cy.get("select").eq(1).select("Grade 1");
    cy.get("select").eq(2).select("A");
  });

  it("AS006 - Marks entry", () => {
    cy.get("input").contains("Marks").type("100");
  });

  it("AS007 - Submit assignment", () => {
    cy.contains("Add").click();
  });

  it("AS015 - Responsive UI", () => {
    cy.viewport(375, 667);
    cy.contains("Assignments").should("exist");

    cy.viewport(768, 1024);
    cy.contains("Assignments").should("exist");
  });

});
