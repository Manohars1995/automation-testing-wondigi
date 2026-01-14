/// <reference types="cypress" />

describe("Results Module", () => {

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit("/result");
    cy.contains("Results").should("be.visible");
  });

  it("RS001 - Verify table fields", () => {
    cy.contains("Id").should("be.visible");
    cy.contains("Roll No").should("be.visible");
    cy.contains("Name").should("be.visible");
    cy.contains("Class").should("be.visible");
    cy.contains("Section").should("be.visible");
    cy.contains("Guardian Number").should("be.visible");
    cy.contains("Status").should("be.visible");
  });

  it("RS002 - Verify records exist", () => {
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("RS003 - Valid search by name", () => {
    cy.get("input[placeholder='Enter Details']").type("Kayal");
    cy.contains("Kayal").should("be.visible");
  });

  it("RS004 - Invalid search", () => {
    cy.get("input[placeholder='Enter Details']")
      .clear()
      .type("RandomXYZ");
    cy.contains("No Records Found").should("be.visible");
  });

  it("RS005 - Filter by Class & Section", () => {
    cy.get("select").eq(0).select("Grade 1");
    cy.get("select").eq(1).select("A");
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("RS006 - Click +ADD and verify fields", () => {
    cy.contains("+ ADD").click();
    cy.url().should("include", "createResult");

    cy.contains("Class/Grade").should("be.visible");
    cy.contains("Section").should("be.visible");
    cy.contains("Subject").should("be.visible");
    cy.contains("Examination").should("be.visible");
  });

  it("RS007 - Select class and fetch students", () => {
    cy.get("select").eq(0).select("Grade 1");
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("RS008 - Select section", () => {
    cy.get("select").eq(1).select("A");
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("RS009 - Select subject", () => {
    cy.get("select").eq(2).select("Telugu");
  });

  it("RS010 - Select examination", () => {
    cy.get("select").eq(3).select("Half yearly");
  });

  it("RS011 - Save result with valid data", () => {
    cy.get("input[placeholder='Marks']").type("75");
    cy.get("input[placeholder='Grade']").type("A");
    cy.get("input[placeholder='Remarks']").type("Good");

    cy.contains("Save").click();
    cy.contains("Result saved successfully").should("be.visible");
  });

  it("RS012 - Mobile responsiveness", () => {
    cy.viewport("iphone-x");
    cy.contains("Results").should("be.visible");
  });

  it("RS013 - Tablet responsiveness", () => {
    cy.viewport("ipad-2");
    cy.contains("Results").should("be.visible");
  });

});
