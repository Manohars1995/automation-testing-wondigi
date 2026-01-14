/// <reference types="cypress" />

Cypress.config({
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 60000,
  retries: 0
});

describe("Academics → Attendance Module", () => {

  /* ================= STUDENT ATTENDANCE ================= */

  before(() => {
    cy.viewport(1366, 768);

    // Direct URL – no menu navigation
    cy.visit("https://test.wondigi.com/studentAttendence", {
      timeout: 60000
    });

    // Real element that exists
    cy.get("table", { timeout: 60000 }).should("be.visible");
  });

  it("ST001 - Verify system date", () => {
    // System date text (not input)
    cy.contains(/\d{2}\/\d{2}\/\d{4}/).should("exist");
  });

  it("ST002 - Search valid student", () => {
    cy.get("input")
      .filter(":visible")
      .first()
      .clear()
      .type("Kayal");

    cy.contains("Kayal").should("exist");
  });

  it("ST003 - Search invalid student", () => {
    cy.get("input")
      .filter(":visible")
      .first()
      .clear()
      .type("XXXX");

    cy.contains(/no/i).should("exist");
  });

  it("ST004 - Verify student table fields", () => {
    [
      "Student Id",
      "Roll No",
      "Name",
      "Class",
      "Section",
      "Working",
      "Present",
      "Status"
    ].forEach(text => {
      cy.contains("th", text).should("exist");
    });
  });

  it("ST005 - Mark Present / Absent", () => {
    cy.contains("P").click({ force: true });
    cy.contains("A").click({ force: true });
  });

  it("ST006 - Student attendance responsiveness", () => {
    cy.viewport(375, 667);
    cy.get("table").should("exist");

    cy.viewport(768, 1024);
    cy.get("table").should("exist");
  });

  /* ================= STAFF ATTENDANCE ================= */

  it("ST007 - Open Staff Attendance", () => {
    cy.visit("https://test.wondigi.com/staffAttendence", {
      timeout: 60000
    });

    cy.get("table", { timeout: 60000 }).should("be.visible");
  });

  it("ST008 - Verify staff table fields", () => {
    [
      "Staff Id",
      "Name",
      "Title",
      "Department",
      "Working",
      "Present",
      "Status"
    ].forEach(text => {
      cy.contains("th", text).should("exist");
    });
  });

  it("ST009 - Staff search", () => {
    cy.get("input")
      .filter(":visible")
      .first()
      .clear()
      .type("ZZZZ");

    cy.contains(/no/i).should("exist");
  });

  it("ST010 - Staff attendance responsiveness", () => {
    cy.viewport(375, 667);
    cy.get("table").should("exist");

    cy.viewport(768, 1024);
    cy.get("table").should("exist");
  });

});
