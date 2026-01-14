/// <reference types="cypress" />

describe("Circulars Module", () => {

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.visit("/circular");
    cy.contains("Circulars").should("be.visible");
  });

  it("CR001 - Valid search", () => {
    cy.get("input[placeholder='Enter Details']").type("Holiday");
    cy.contains("Holiday").should("be.visible");
  });

  it("CR002 - Invalid search", () => {
    cy.get("input[placeholder='Enter Details']")
      .clear()
      .type("RandomXYZ");
    cy.contains("No Records Found").should("be.visible");
  });

  it("CR003 - Click +ADD and verify fields", () => {
    cy.contains("+ ADD").click();
    cy.url().should("include", "addCircular");

    cy.contains("Circular ID").should("be.visible");
    cy.contains("Receiver").should("be.visible");
    cy.contains("Event Date").should("be.visible");
    cy.contains("Status").should("be.visible");
    cy.contains("Title").should("be.visible");
    cy.contains("Subject").should("be.visible");
  });

  it("CR004 - Create circular with valid data", () => {
    cy.get("select").eq(0).select("Students");
    cy.get("select").eq(1).select("Active");

    cy.get("input[placeholder='Title']").type("Circular");
    cy.get("input[placeholder='Subject']").type("Hi");

    cy.get(".ql-editor").type("This is an automated circular content");

    cy.contains("Create").click();
    cy.contains("Circular created successfully").should("be.visible");
  });

  it("CR005 - Create circular with all mandatory fields", () => {
    cy.contains("+ ADD").click();
    cy.get("select").eq(0).select("Students");
    cy.get("select").eq(1).select("Active");
    cy.get("input[placeholder='Title']").type("Mandatory Circular");
    cy.get("input[placeholder='Subject']").type("Mandatory");
    cy.contains("Create").click();
    cy.contains("Circular created successfully").should("be.visible");
  });

  it("CR006 - Empty title validation", () => {
    cy.contains("+ ADD").click();
    cy.get("select").eq(0).select("Students");
    cy.get("select").eq(1).select("Active");
    cy.get("input[placeholder='Subject']").type("Test");
    cy.contains("Create").click();
    cy.contains("This field is required").should("be.visible");
  });

  it("CR007 - Empty subject validation", () => {
    cy.contains("+ ADD").click();
    cy.get("select").eq(0).select("Students");
    cy.get("select").eq(1).select("Active");
    cy.get("input[placeholder='Title']").type("Test");
    cy.contains("Create").click();
    cy.contains("This field is required").should("be.visible");
  });

  it("CR008 - Empty all fields", () => {
    cy.contains("+ ADD").click();
    cy.contains("Create").click();
    cy.contains("This field is required").should("be.visible");
  });

  it("CR009 - Mobile responsiveness", () => {
    cy.viewport("iphone-x");
    cy.contains("Circulars").should("be.visible");
  });

  it("CR010 - Tablet responsiveness", () => {
    cy.viewport("ipad-2");
    cy.contains("Circulars").should("be.visible");
  });

});
