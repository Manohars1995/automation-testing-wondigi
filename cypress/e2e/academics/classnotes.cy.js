/// <reference types="cypress" />

describe("Class Notes Module", () => {

  before(() => {
    cy.login(); // assuming custom command already exists
  });

  beforeEach(() => {
    cy.visit("/academics");
    cy.contains("Class Notes").click();
    cy.url().should("include", "classNotes");
  });

  it("CN001 - Verify Class Notes document icons", () => {
    cy.get(".class-notes-card").should("have.length.greaterThan", 0);
    cy.contains("PDF Maker").should("be.visible");
    cy.contains("Demo").should("be.visible");
    cy.contains("Okok").should("be.visible");
  });

  it("CN002 - Verify document icons clickable", () => {
    cy.contains("PDF Maker").click();
    cy.contains("PDF Maker").should("exist");
  });

  it("CN003 - Valid search fetches results", () => {
    cy.get("input[placeholder='Enter Details']")
      .type("PDF Maker");
    cy.contains("PDF Maker").should("be.visible");
  });

  it("CN004 - Invalid search shows no records", () => {
    cy.get("input[placeholder='Enter Details']")
      .clear()
      .type("InvalidNote");
    cy.contains("No records found").should("be.visible");
  });

  it("CN005 - Mobile responsiveness", () => {
    cy.viewport("iphone-x");
    cy.contains("Class Notes").should("be.visible");
  });

  it("CN006 - Tablet responsiveness", () => {
    cy.viewport("ipad-2");
    cy.contains("Class Notes").should("be.visible");
  });

  it("CN007 - Verify Add Notes form fields", () => {
    cy.contains("+ Add").click();
    cy.url().should("include", "addClassNotes");

    cy.get("select").eq(0).should("be.visible"); // Class
    cy.get("select").eq(1).should("be.visible"); // Section
    cy.get("select").eq(2).should("be.visible"); // Subject
    cy.get("input[placeholder='File Name']").should("be.visible");
  });

  it("CN008 - Submit without file should show error", () => {
    cy.contains("Add Notes").click();
    cy.contains("Please upload file").should("be.visible");
  });

  it("CN009 - Add Notes with all fields", () => {
    cy.get("select").eq(0).select("Grade 1");
    cy.get("select").eq(1).select("A");
    cy.get("select").eq(2).select("English");

    cy.get("input[placeholder='File Name']").type("English");

    cy.get("input[type='file']").attachFile("sample.pdf");
    cy.contains("Add Notes").click();

    cy.contains("Notes added successfully").should("be.visible");
  });

  it("CN010 - Responsive Add Notes page", () => {
    cy.viewport(375, 667);
    cy.contains("Add Notes").should("be.visible");
  });

});
