/// <reference types="cypress" />

describe("Administration → Department Module", () => {

  beforeEach(() => {
    cy.fixture("departmentsampledata").as("data");

    cy.visit("/");
    cy.window().then(win => {
      win.localStorage.setItem("authToken", "PASTE_REAL_TOKEN_HERE");
    });

    cy.reload();
    cy.visit("/departmentList");

    cy.url().should("include", "/departmentList");
    cy.get("table", { timeout: 20000 }).should("be.visible");
    cy.contains("Department Details").should("exist");
  });

  it("DP001 - Verify table headers", () => {
    ["Id", "Name", "Staff Id", "Staff Name", "Dept. Status"]
      .forEach(h => cy.contains(h).should("exist"));
  });

  it("DP002 - Verify active status icon", () => {
    cy.get("table tbody tr").first().find("svg").should("exist");
  });

  it("DP003 - Export departments", () => {
    cy.contains("⋮").click();
    cy.contains("Export").click();
  });

  it("DP004 - Import departments", () => {
    cy.contains("⋮").click();
    cy.contains("Import").should("exist");
  });

  it("DP005 - Download departments", () => {
    cy.contains("⋮").click();
    cy.contains("Download").click();
  });

  it("DP006 - Search valid department", () => {
    cy.get("input[placeholder*='Enter']").type("Telugu");
    cy.contains("Telugu").should("exist");
  });

  it("DP007 - Search invalid department", () => {
    cy.get("input[placeholder*='Enter']").clear().type("Java");
    cy.contains(/no data/i).should("exist");
  });

  it("DP008 - Auto generate Department ID", () => {
    cy.contains("Add").click();
    cy.get("input[readonly]").should("not.have.value", "");
  });

  it("DP009 - Auto populate staff id & name", () => {
    cy.contains("Add").click();
    cy.get("input[name='staffId']").click();
    cy.get("input[name='staffName']").should("not.have.value", "");
  });

  it("DP010 - Create department", function () {
    cy.contains("Add").click();

    cy.get("input[name='departmentName']").type(this.data.departmentName);
    cy.contains("Department Status").click();
    cy.contains(this.data.status).click();

    cy.get("textarea").type(this.data.description);

    cy.contains("Class").click();
    cy.contains(this.data.class).click();

    cy.contains("Section").click();
    cy.contains(this.data.section).click();

    cy.contains("Save").click();
    cy.contains(/success/i, { timeout: 15000 }).should("exist");
  });

  it("DP011 - Submit empty form", () => {
    cy.contains("Add").click();
    cy.contains("Save").click();
    cy.contains(/required/i).should("exist");
  });

  it("DP012 - Partial form validation", () => {
    cy.contains("Add").click();
    cy.get("input[name='departmentName']").type("Test");
    cy.contains("Save").click();
    cy.contains(/required/i).should("exist");
  });

  it("DP013 - Responsive UI", () => {
    cy.viewport("iphone-6");
    cy.get("table").should("exist");

    cy.viewport("ipad-2");
    cy.get("table").should("exist");
  });

});
