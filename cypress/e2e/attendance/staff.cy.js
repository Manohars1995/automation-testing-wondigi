/// <reference types="cypress" />

describe("Attendance → Staff Module", () => {

  beforeEach(() => {

  cy.fixture("staffSampleData").as("data");

  // 🔐 DIRECT AUTH INJECTION (NO UI LOGIN)
  cy.visit("https://test.wondigi.com");

  cy.window().then(win => {
    win.localStorage.setItem(
      "authToken",
      "PASTE_REAL_VALID_TOKEN_HERE"
    );
  });

  // 🔁 Reload so app reads token
  cy.reload();

  // ================= API WAIT =================
  cy.intercept("GET", "**/staff**").as("getStaff");

  cy.visit("https://test.wondigi.com/staffList");
  cy.wait("@getStaff");

  cy.contains("Staff Id", { timeout: 10000 }).should("be.visible");
});


  /* =====================================================
     ST001 – STAFF LIST TABLE HEADERS
  ===================================================== */
  it("ST001 - Verify staff list table headers", () => {
    cy.get("table").within(() => {
      [
        "Staff Id",
        "Staff Name",
        "Job Title",
        "Class",
        "Section",
        "Contact",
        "Job Status"
      ].forEach(h => {
        cy.contains("th", h).should("be.visible");
      });
    });
  });

  /* =====================================================
     ST002 – JOB STATUS INDICATOR
  ===================================================== */
  it("ST002 - Verify job status green tick indicator", () => {
    cy.get("table tbody tr")
      .first()
      .find("svg")
      .should("exist");
  });

  /* =====================================================
     ST003 – DEACTIVATE STAFF
  ===================================================== */
  it("ST003 - Deactivate staff using job status icon", () => {
    cy.contains("Leela")
      .parents("tr")
      .within(() => {
        cy.get("svg").first().click({ force: true });
      });

    cy.contains(/mark inactive/i).click();
    cy.contains(/inactive/i).should("exist");
  });

  /* =====================================================
     ST004 – CANCEL DEACTIVATION
  ===================================================== */
  it("ST004 - Cancel staff deactivation", () => {
    cy.contains("Leela")
      .parents("tr")
      .within(() => {
        cy.get("svg").first().click({ force: true });
      });

    cy.contains(/cancel/i).click();
    cy.contains(/active/i).should("exist");
  });

  /* =====================================================
     ST005 – IMPORT STAFF
  ===================================================== */
  it("ST005 - Import staff data option visible", () => {
    cy.contains("Staff")
      .parent()
      .find("[aria-label='More options']")
      .click();

    cy.contains("Import").should("be.visible");
  });

  /* =====================================================
     ST006 – EXPORT STAFF
  ===================================================== */
  it("ST006 - Export staff data option visible", () => {
    cy.contains("Staff")
      .parent()
      .find("[aria-label='More options']")
      .click();

    cy.contains("Export").should("be.visible");
  });

  /* =====================================================
     ST007 – DOWNLOAD STAFF
  ===================================================== */
  it("ST007 - Download staff data option visible", () => {
    cy.contains("Staff")
      .parent()
      .find("[aria-label='More options']")
      .click();

    cy.contains("Download").should("be.visible");
  });

  /* =====================================================
     ST008 – SEARCH VALID STAFF
  ===================================================== */
  it("ST008 - Search staff with valid name", () => {
    cy.get("input[placeholder*='Enter']")
      .clear()
      .type("Leela");

    cy.wait(500);
    cy.contains("Leela").should("exist");
  });

  /* =====================================================
     ST009 – SEARCH INVALID STAFF
  ===================================================== */
  it("ST009 - Search staff with invalid name", () => {
    cy.get("input[placeholder*='Enter']")
      .clear()
      .type("InvalidNameXYZ");

    cy.contains(/no data/i).should("exist");
  });

  /* =====================================================
     ST010 – OPEN ADD STAFF
  ===================================================== */
  it("ST010 - Open Add Staff form", () => {
    cy.contains("Add").click();
    cy.url().should("include", "create");
  });

  /* =====================================================
     ST011 – VERIFY FORM SECTIONS
  ===================================================== */
  it("ST011 - Verify Add Staff form sections", () => {
    cy.contains("Add").click();

    [
      "Staff Details",
      "Address",
      "Job Details",
      "Class Information",
      "Medical Information",
      "Product"
    ].forEach(section => {
      cy.contains(section).should("be.visible");
    });
  });

  /* =====================================================
     ST012 – AUTO GENERATED EMPLOYEE ID
  ===================================================== */
  it("ST012 - Verify auto-generated Employee ID", () => {
    cy.contains("Add").click();
    cy.get("input[readonly]").should("not.have.value", "");
  });

  /* =====================================================
     ST013 – CREATE STAFF (ACTIVE)
  ===================================================== */
  it("ST013 - Create staff with valid data (Active)", function () {
    cy.contains("Add").click();

    cy.get("input[name='staffName']").type(this.data.employeeName);
    cy.contains(this.data.gender).click();
    cy.get("input[type='date']").type(this.data.dob);

    cy.get("input[name='contact']").type(this.data.contact);
    cy.get("input[name='email']").type(this.data.email);

    cy.contains("Status").click();
    cy.contains(this.data.statusActive).click();

    cy.contains("Nationality").click();
    cy.contains(this.data.nationality).click();

    cy.contains("State").click();
    cy.contains(this.data.state).click();

    cy.contains("City").click();
    cy.contains(this.data.city).click();

    cy.get("input[name='doorNo']").type(this.data.doorNo);
    cy.get("input[name='street']").type(this.data.street);
    cy.get("input[name='pincode']").type(this.data.pincode);

    cy.contains("Job Title").click();
    cy.contains(this.data.jobTitle).click();

    cy.contains("Department").click();
    cy.contains(this.data.department).click();

    cy.contains("Class").click();
    cy.contains(this.data.class).click();

    cy.contains("Section").click();
    cy.contains(this.data.section).click();

    cy.contains(this.data.medical).click();

    cy.contains("Product").click();
    cy.contains(this.data.product).click();

    cy.contains("Submit").click();
    cy.contains(/success/i, { timeout: 10000 }).should("exist");
  });

  /* =====================================================
     ST014 – CREATE STAFF (INACTIVE)
  ===================================================== */
  it("ST014 - Create staff with inactive status", () => {
    cy.contains("Add").click();
    cy.contains("Status").click();
    cy.contains("Inactive").click();
    cy.contains("Submit").click();
  });

  /* =====================================================
     ST015 – SUBMIT EMPTY FORM
  ===================================================== */
  it("ST015 - Submit empty form", () => {
    cy.contains("Add").click();
    cy.contains("Submit").click();
    cy.contains(/required/i).should("exist");
  });

  /* =====================================================
     ST016 – MISSING EMAIL VALIDATION
  ===================================================== */
  it("ST016 - Missing email validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='staffName']").type("Test");
    cy.contains("Submit").click();
    cy.contains(/email/i).should("exist");
  });

  /* =====================================================
     ST017 – MISSING CONTACT VALIDATION
  ===================================================== */
  it("ST017 - Missing contact validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='email']").type("test@gmail.com");
    cy.contains("Submit").click();
    cy.contains(/contact/i).should("exist");
  });

  /* =====================================================
     ST018 – INVALID EMAIL FORMAT
  ===================================================== */
  it("ST018 - Invalid email format validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='email']").type("abc@gmail");
    cy.contains("Submit").click();
    cy.contains(/invalid/i).should("exist");
  });

  /* =====================================================
     ST019 – INVALID CONTACT NUMBER
  ===================================================== */
  it("ST019 - Invalid contact number validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='contact']").type("912345");
    cy.contains("Submit").click();
    cy.contains(/invalid/i).should("exist");
  });

  /* =====================================================
     ST020 – GENDER RADIO BUTTON
  ===================================================== */
  it("ST020 - Gender radio button selection", () => {
    cy.contains("Add").click();
    ["Male", "Female", "Others"].forEach(g => {
      cy.contains(g).click();
    });
  });

  /* =====================================================
     ST021 – JOB TITLE DROPDOWN
  ===================================================== */
  it("ST021 - Job title dropdown options", () => {
    cy.contains("Add").click();
    cy.contains("Job Title").click();

    ["Principal", "HOD", "Teacher", "Librarian", "Accountant", "Driver"]
      .forEach(role => {
        cy.contains(role).should("exist");
      });
  });

  /* =====================================================
     ST022 – PRODUCT AUTO POPULATION
  ===================================================== */
  it("ST022 - Product services auto population", () => {
    cy.contains("Add").click();
    cy.contains("Product").click();
    cy.contains("SV00001").should("exist");
  });

  /* =====================================================
     ST023 – RESPONSIVENESS
  ===================================================== */
  it("ST023 - Staff module responsiveness", () => {
    cy.viewport("iphone-6");
    cy.contains("Staff").should("exist");

    cy.viewport("ipad-2");
    cy.contains("Staff").should("exist");

    cy.viewport(1280, 800);
    cy.contains("Staff").should("exist");
  });

});
