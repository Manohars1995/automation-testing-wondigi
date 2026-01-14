/// <reference types="cypress" />

describe("Administration → Students Module", () => {

  beforeEach(() => {

  cy.fixture("studentSampleData").as("data");

  cy.visit("https://test.wondigi.com", { failOnStatusCode: false });

  cy.window().then(win => {
    win.localStorage.setItem("authToken", "PASTE_REAL_VALID_TOKEN_HERE");
  });

  cy.reload();

  cy.intercept("GET", "**/students**").as("getStudents");

  cy.visit("https://test.wondigi.com/studentsList", {
    failOnStatusCode: false
  });

  cy.wait("@getStudents", { timeout: 20000 });

  cy.contains("Student", { timeout: 20000 }).should("exist");
});

  /* =====================================================
     ST001 – ACTIVE STATUS (GREEN TICK)
  ===================================================== */
  it("ST001 - Verify student active status (Green Tick)", () => {
    cy.get("table tbody tr").first().find("svg").should("exist");
  });

  /* =====================================================
     ST002 – DEACTIVATE STUDENT
  ===================================================== */
  it("ST002 - Deactivate student using status icon", () => {
    cy.contains("Kayal")
      .parents("tr")
      .find("svg")
      .first()
      .click({ force: true });

    cy.contains(/mark inactive/i).click();
    cy.contains(/inactive/i).should("exist");
  });

  /* =====================================================
     ST003 – CANCEL DEACTIVATION
  ===================================================== */
  it("ST003 - Cancel student deactivation", () => {
    cy.contains("Kayal")
      .parents("tr")
      .find("svg")
      .first()
      .click({ force: true });

    cy.contains(/cancel/i).click();
    cy.contains(/active/i).should("exist");
  });

  /* =====================================================
     ST004 – SEARCH VALID
  ===================================================== */
  it("ST004 - Search student with valid name", () => {
    cy.get("input[placeholder*='Enter']")
      .clear()
      .type("Kayal");

    cy.contains("Kayal").should("exist");
  });

  /* =====================================================
     ST005 – SEARCH INVALID
  ===================================================== */
  it("ST005 - Search student with invalid name", () => {
    cy.get("input[placeholder*='Enter']")
      .clear()
      .type("Shriya");

    cy.contains(/no data/i).should("exist");
  });

  /* =====================================================
     ST006 – EXPORT
  ===================================================== */
  it("ST006 - Export selected student records", () => {
    cy.get("table tbody tr input[type='checkbox']").first().check();
    cy.contains("⋮").click();
    cy.contains("Export").click();
  });

  /* =====================================================
     ST007 – IMPORT
  ===================================================== */
  it("ST007 - Import student data", () => {
    cy.contains("⋮").click();
    cy.contains("Import").should("be.visible");
  });

  /* =====================================================
     ST008 – DOWNLOAD
  ===================================================== */
  it("ST008 - Download students list", () => {
    cy.contains("⋮").click();
    cy.contains("Download").click();
  });

  /* =====================================================
     ST009 – AUTO GENERATED ID
  ===================================================== */
  it("ST009 - Verify auto-generated Student ID", () => {
    cy.contains("Add").click();
    cy.get("input[readonly]").should("not.have.value", "");
  });

  /* =====================================================
     ST010 – CREATE STUDENT (ACTIVE)
  ===================================================== */
  it("ST010 - Create student with valid data", function () {

    cy.contains("Add").click();

    cy.get("input[name='admissionNo']").type(this.data.admissionNo);
    cy.get("input[name='penNo']").type(this.data.penNo);
    cy.get("input[name='fullName']").type(this.data.fullName);

    cy.contains(this.data.gender).click();
    cy.get("input[type='date']").type(this.data.dob);

    cy.get("input[name='caste']").type(this.data.caste);

    cy.contains("Nationality").click();
    cy.contains(this.data.nationality).click();

    cy.contains("State").click();
    cy.contains(this.data.state).click();

    cy.contains("City").click();
    cy.contains(this.data.city).click();

    cy.get("input[name='doorNo']").type(this.data.doorNo);
    cy.get("input[name='street']").type(this.data.street);
    cy.get("input[name='pincode']").type(this.data.pincode);

    cy.contains("Status").click();
    cy.contains(this.data.status).click();

    cy.get("input[name='parentName']").type(this.data.parentName);
    cy.get("input[name='relationship']").type(this.data.relationship);
    cy.get("input[name='guardianContact']").type(this.data.guardianContact);
    cy.get("input[name='motherName']").type(this.data.motherName);
    cy.get("input[name='email']").type(this.data.email);
    cy.get("input[name='occupation']").type(this.data.occupation);

    cy.get("input[name='schoolName']").type(this.data.schoolName);
    cy.get("input[name='lastClass']").type(this.data.lastClass);

    cy.contains("Grade/Class").click();
    cy.contains(this.data.grade).click();

    cy.contains("Section").click();
    cy.contains(this.data.section).click();

    cy.get("input[name='emergencyContact']").type(this.data.emergencyContact);

    cy.contains(this.data.medical).click();

    cy.contains("Product").click();
    cy.contains(this.data.product).click();

    cy.contains("Documents").click();
    cy.contains(this.data.attachment).click();

    cy.contains("Submit").click();
    cy.contains(/success/i, { timeout: 10000 }).should("exist");
  });

  /* =====================================================
     ST011 – CREATE STUDENT (INACTIVE)
  ===================================================== */
  it("ST011 - Create student with inactive status", () => {
    cy.contains("Add").click();
    cy.contains("Status").click();
    cy.contains("Inactive").click();
    cy.contains("Submit").click();
  });

  /* =====================================================
     ST012 – EMPTY FORM SUBMIT
  ===================================================== */
  it("ST012 - Submit empty Create Student form", () => {
    cy.contains("Add").click();
    cy.contains("Submit").click();
    cy.contains(/required/i).should("exist");
  });

  /* =====================================================
     ST013 – MISSING EMAIL & CONTACT
  ===================================================== */
  it("ST013 - Missing email and guardian contact validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='fullName']").type("Test");
    cy.contains("Submit").click();
    cy.contains(/email/i).should("exist");
    cy.contains(/contact/i).should("exist");
  });

  /* =====================================================
     ST014 – INVALID EMAIL
  ===================================================== */
  it("ST014 - Invalid email format validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='email']").type("abc.com");
    cy.contains("Submit").click();
    cy.contains(/invalid/i).should("exist");
  });

  /* =====================================================
     ST015 – INVALID CONTACT
  ===================================================== */
  it("ST015 - Invalid guardian contact number validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='guardianContact']").type("12345");
    cy.contains("Submit").click();
    cy.contains(/invalid/i).should("exist");
  });

  /* =====================================================
     ST016 – NATIONALITY DROPDOWN
  ===================================================== */
  it("ST016 - Verify nationality dropdown values", () => {
    cy.contains("Add").click();
    cy.contains("Nationality").click();
    cy.contains("India").should("exist");
  });

  /* =====================================================
     ST017 – STATE DROPDOWN
  ===================================================== */
  it("ST017 - Verify state dropdown values", () => {
    cy.contains("Add").click();
    cy.contains("State").click();
    cy.contains("Andhra Pradesh").should("exist");
  });

  /* =====================================================
     ST018 – CITY DROPDOWN
  ===================================================== */
  it("ST018 - Verify city dropdown values", () => {
    cy.contains("Add").click();
    cy.contains("City").click();
    cy.contains("Vijayawada").should("exist");
  });

  /* =====================================================
     ST019 – GRADE DROPDOWN
  ===================================================== */
  it("ST019 - Verify Grade/Class dropdown values", () => {
    cy.contains("Add").click();
    cy.contains("Grade/Class").click();
    cy.contains("Grade 1").should("exist");
  });

  /* =====================================================
     ST020 – SECTION DROPDOWN
  ===================================================== */
  it("ST020 - Verify Section dropdown values", () => {
    cy.contains("Add").click();
    cy.contains("Section").click();
    ["A", "B", "C", "D"].forEach(s => cy.contains(s).should("exist"));
  });

  /* =====================================================
     ST021 – GENDER RADIO BUTTONS
  ===================================================== */
  it("ST021 - Verify gender radio buttons", () => {
    cy.contains("Add").click();
    ["Male", "Female", "Others"].forEach(g => cy.contains(g).click());
  });

  /* =====================================================
     ST022 – MEDICAL RADIO BUTTONS
  ===================================================== */
  it("ST022 - Verify medical information radio buttons", () => {
    cy.contains("Add").click();
    ["YES", "NO"].forEach(v => cy.contains(v).click());
  });

  /* =====================================================
     ST023 – RESPONSIVENESS
  ===================================================== */
  it("ST023 - Verify Students module responsiveness", () => {
    cy.viewport("iphone-6");
    cy.contains("Student Details").should("exist");

    cy.viewport("ipad-2");
    cy.contains("Student Details").should("exist");

    cy.viewport(1280, 800);
    cy.contains("Student Details").should("exist");
  });

});
