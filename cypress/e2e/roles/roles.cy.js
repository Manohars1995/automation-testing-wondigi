/// <reference types="cypress" />

Cypress.on("uncaught:exception", () => false);

describe("Administration → Roles Module", () => {

  beforeEach(() => {
    cy.fixture("rolesSampleData").as("data");

    cy.visit("https://test.wondigi.com");
    cy.window().then(win => {
      win.localStorage.setItem("authToken", "PASTE_REAL_VALID_TOKEN");
    });
    cy.reload();

    cy.intercept("GET", "**/roles**").as("getRoles");
    cy.visit("https://test.wondigi.com/rolesList");
    cy.wait("@getRoles");

    cy.contains("Role Details", { timeout: 10000 }).should("exist");
  });

  /* ================= RL001–RL002 ================= */
  it("RL001 - Verify roles table headers", () => {
    ["Role Id", "Role Name", "Description", "Count", "Role Status"]
      .forEach(h => cy.contains(h).should("exist"));
  });

  it("RL002 - Verify role active status icon", () => {
    cy.get("table tbody tr").first().find("svg").should("exist");
  });

  /* ================= RL003–RL004 ================= */
  it("RL003 - Search valid role name", () => {
    cy.get("input[placeholder*='Enter']").type("Doctor");
    cy.contains("Doctor").should("exist");
  });

  it("RL004 - Search invalid role name", () => {
    cy.get("input[placeholder*='Enter']").clear().type("InvalidRole");
    cy.contains(/no data/i).should("exist");
  });

  /* ================= RL005–RL007 ================= */
  it("RL005 - Export roles", () => {
    cy.get("table tbody tr input[type='checkbox']").first().check();
    cy.contains("⋮").click();
    cy.contains("Export").click();
  });

  it("RL006 - Import roles", () => {
    cy.contains("⋮").click();
    cy.contains("Import").should("exist");
  });

  it("RL007 - Download roles", () => {
    cy.contains("⋮").click();
    cy.contains("Download").click();
  });

  /* ================= RL008 ================= */
  it("RL008 - Auto generate Role ID", () => {
    cy.contains("Add").click();
    cy.get("input[readonly]").should("not.have.value", "");
  });

  /* ================= RL009–RL010 ================= */
  it("RL009 - Create role with Active status", function () {
    cy.contains("Add").click();
    cy.get("input[name='roleName']").type(this.data.roleName);
    cy.contains("Status").click();
    cy.contains(this.data.statusActive).click();
    cy.get("textarea").type(this.data.description);

    this.data.components.forEach(c =>
      cy.contains(c).parent().contains("Read").click()
    );

    cy.contains("Save").click();
    cy.contains(/success/i).should("exist");
  });

  it("RL010 - Create role with Inactive status", function () {
    cy.contains("Add").click();
    cy.get("input[name='roleName']").type("Doctor2");
    cy.contains("Status").click();
    cy.contains(this.data.statusInactive).click();
    cy.contains("Save").click();
  });

  /* ================= RL011 ================= */
  it("RL011 - Description length validation", function () {
    cy.contains("Add").click();
    cy.get("textarea").type(this.data.longDescription);
    cy.contains(/error|limit/i).should("exist");
  });

  /* ================= RL012–RL015 ================= */
  it("RL012 - Hide permissions", function () {
    cy.contains("Add").click();
    this.data.components.forEach(c =>
      cy.contains(c).parent().contains("Hide").click()
    );
  });

  it("RL013 - Read permissions", function () {
    cy.contains("Add").click();
    this.data.components.forEach(c =>
      cy.contains(c).parent().contains("Read").click()
    );
  });

  it("RL014 - Edit permissions", function () {
    cy.contains("Add").click();
    this.data.components.forEach(c =>
      cy.contains(c).parent().contains("Edit").click()
    );
  });

  it("RL015 - Mixed permissions", function () {
    cy.contains("Add").click();
    cy.contains("Dashboard").parent().contains("Read").click();
    cy.contains("Students").parent().contains("Edit").click();
    cy.contains("Calendar").parent().contains("Hide").click();
  });

  /* ================= RL016 ================= */
  it("RL016 - Submit empty form", () => {
    cy.contains("Add").click();
    cy.contains("Save").click();
    cy.contains(/required/i).should("exist");
  });

  /* ================= RL017 ================= */
  it("RL017 - Roles module responsiveness", () => {
    cy.viewport("iphone-6");
    cy.contains("Role Details").should("exist");

    cy.viewport("ipad-2");
    cy.contains("Role Details").should("exist");

    cy.viewport(1280, 800);
    cy.contains("Role Details").should("exist");
  });

});
