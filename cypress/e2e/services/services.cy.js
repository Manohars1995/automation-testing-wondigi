/// <reference types="cypress" />

describe("Administration → Services Module", () => {

  beforeEach(() => {
    cy.fixture("servicesSampleData").as("data");

    // 🔐 TOKEN LOGIN (use real token)
    cy.visit("/");
    cy.window().then(win => {
      win.localStorage.setItem("authToken", "PASTE_REAL_TOKEN_HERE");
    });

    cy.reload();

    // ✅ Go directly to Services page
    cy.visit("/servicesList");

    // ✅ HARD STABLE ASSERTIONS (NO TEXT DEPENDENCY)
    cy.url().should("include", "/servicesList");

    // Wait for table to load
    cy.get("table", { timeout: 20000 }).should("be.visible");

    // Confirm correct page by header column
    cy.contains("Service Id", { timeout: 20000 }).should("exist");
  });

  /* =========================================
     ST01–ST03 SERVICE STATUS
  ========================================= */

  it("ST01 - Verify active service status icon", () => {
    cy.get("table tbody tr").first().find("svg").should("exist");
  });

  it("ST02 - Make service inactive", () => {
    cy.get("table tbody tr").first().find("svg").click({ force: true });
    cy.contains(/make inactive/i).click();
    cy.contains(/inactive/i).should("exist");
  });

  it("ST03 - Cancel inactive action", () => {
    cy.get("table tbody tr").first().find("svg").click({ force: true });
    cy.contains(/cancel/i).click();
    cy.contains(/active/i).should("exist");
  });

  /* =========================================
     ST04–ST06 EXPORT / IMPORT / DOWNLOAD
  ========================================= */

  it("ST04 - Export services", () => {
    cy.get("input[type='checkbox']").first().check({ force: true });
    cy.contains("⋮").click();
    cy.contains("Export").click();
  });

  it("ST05 - Import services", () => {
    cy.contains("⋮").click();
    cy.contains("Import").should("exist");
  });

  it("ST06 - Download services", () => {
    cy.contains("⋮").click();
    cy.contains("Download").click();
  });

  /* =========================================
     ST07–ST08 SEARCH
  ========================================= */

  it("ST07 - Search valid service name", () => {
    cy.get("input[placeholder*='Enter']").clear().type("Tuition");
    cy.contains("Tuition").should("exist");
  });

  it("ST08 - Search invalid service name", () => {
    cy.get("input[placeholder*='Enter']").clear().type("INVALID123");
    cy.contains(/no data/i).should("exist");
  });

  /* =========================================
     ST09–ST10 CREATE SERVICE
  ========================================= */

  it("ST09 - Service ID auto generated", () => {
    cy.contains("Add").click();
    cy.get("input[readonly]").should("not.have.value", "");
  });

  it("ST10 - Create service with valid data", function () {
    cy.contains("Add").click();

    cy.get("input[name='serviceName']").type(this.data.serviceName);

    cy.contains("Category").click();
    cy.contains(this.data.category).click();

    cy.contains("Sub Category").click();
    cy.contains(this.data.subCategory).click();

    cy.get("input[name='price']").type(this.data.price);
    cy.get("input[name='discount']").type(this.data.discount);
    cy.get("input[name='tax']").type(this.data.tax);

    // Auto total price
    cy.get("input[name='totalPrice']").should("not.have.value", "");

    cy.contains("Status").click();
    cy.contains(this.data.status).click();

    cy.contains("Class").click();
    cy.contains(this.data.class).click();

    cy.contains("Section").click();
    cy.contains(this.data.section).click();

    cy.get("input[name='location']").type(this.data.location);
    cy.get("input[name='email']").type(this.data.email);
    cy.get("input[name='contact']").type(this.data.contact);
    cy.get("textarea").type(this.data.description);

    cy.contains("Submit").click();
    cy.contains(/success/i, { timeout: 15000 }).should("exist");
  });

  /* =========================================
     ST11–ST13 VALIDATIONS
  ========================================= */

  it("ST11 - Submit empty form", () => {
    cy.contains("Add").click();
    cy.contains("Submit").click();
    cy.contains(/required/i).should("exist");
  });

  it("ST12 - Invalid email validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='email']").type("abc.com");
    cy.contains("Submit").click();
    cy.contains(/invalid/i).should("exist");
  });

  it("ST13 - Invalid contact validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='contact']").type("123");
    cy.contains("Submit").click();
    cy.contains(/invalid/i).should("exist");
  });

  /* =========================================
     ST14–ST15 RESPONSIVENESS
  ========================================= */

  it("ST14 - Mobile responsive", () => {
    cy.viewport("iphone-6");
    cy.get("table").should("exist");
  });

  it("ST15 - Tablet responsive", () => {
    cy.viewport("ipad-2");
    cy.get("table").should("exist");
  });

});
