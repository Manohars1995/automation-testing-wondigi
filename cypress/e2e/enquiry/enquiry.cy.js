/// <reference types="cypress" />

describe("Administration → Enquiry Module", () => {

  beforeEach(() => {
    cy.fixture("enquirySampleData").as("data");

    cy.visit("https://test.wondigi.com");
    cy.window().then(win => {
      win.localStorage.setItem("authToken", "PASTE_REAL_TOKEN");
    });
    cy.reload();

    cy.intercept("GET", "**/queries**").as("getEnquiries");
    cy.visit("https://test.wondigi.com/queriesList");
    cy.wait("@getEnquiries");

    cy.contains("Enquiry Details", { timeout: 20000 }).should("be.visible");
  });

  /* =====================================================
     ST01–ST05 : VERIFY TABLE FIELDS
  ===================================================== */
  it("ST01 - Verify Enquiry ID column", () => {
    cy.get("table thead").contains("Id");
  });

  it("ST02 - Verify User ID column", () => {
    cy.get("table thead").contains("User Id");
  });

  it("ST03 - Verify Name column", () => {
    cy.get("table thead").contains("Name");
  });

  it("ST04 - Verify Title column", () => {
    cy.get("table thead").contains("Title");
  });

  it("ST05 - Verify Enquiry Status column", () => {
    cy.get("table thead").contains("Enquiry Status");
  });

  /* =====================================================
     ST06–ST07 : SEARCH FUNCTION
  ===================================================== */
  it("ST06 - Search enquiry with valid name", () => {
    cy.get("input[placeholder*='Enter']")
      .clear()
      .type("Praveen");

    cy.contains("Praveen").should("exist");
  });

  it("ST07 - Search enquiry with invalid name", () => {
    cy.get("input[placeholder*='Enter']")
      .clear()
      .type("InvalidUser");

    cy.contains(/no data|no records/i).should("exist");
  });

  /* =====================================================
     ST08–ST10 : IMPORT / EXPORT / DOWNLOAD
  ===================================================== */
  it("ST08 - Import enquiries option visible", () => {
    cy.contains("⋮").click();
    cy.contains("Import").should("be.visible");
  });

  it("ST09 - Export enquiries option visible", () => {
    cy.contains("⋮").click();
    cy.contains("Export").should("be.visible");
  });

  it("ST10 - Download enquiries option visible", () => {
    cy.contains("⋮").click();
    cy.contains("Download").should("be.visible");
  });

});
