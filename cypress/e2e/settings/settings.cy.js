describe("Settings Module", () => {

  before(() => {
    cy.visit("https://test.wondigi.com/settings");
  });

  /* ===============================
     PAGE LOAD
  =============================== */

  it("ST001 - Open Settings page", () => {
    cy.url().should("include", "/settings");
    cy.contains("Settings").should("be.visible");
  });

  it("ST002 - Verify all settings sections visible", () => {
    cy.contains("My Profile").should("be.visible");
    cy.contains("KYC").should("be.visible");
    cy.contains("Templates").should("be.visible");
    cy.contains("Change Password").should("be.visible");
    cy.contains("FAQs").should("be.visible");
    cy.contains("Contact Us").should("be.visible");
    cy.contains("Invite").should("be.visible");
  });

  /* ===============================
     MY PROFILE
  =============================== */

  it("ST003 - Expand My Profile section", () => {
    cy.contains("My Profile").click();
    cy.contains("Full Name").should("be.visible");
  });

  it("ST004 - Verify profile basic fields", () => {
    cy.contains("Email").should("be.visible");
    cy.contains("Date of Birth").should("be.visible");
    cy.contains("Gender").should("be.visible");
    cy.contains("Contact Number").should("be.visible");
  });

  it("ST005 - Verify address fields", () => {
    cy.contains("Nationality").should("be.visible");
    cy.contains("State").should("be.visible");
    cy.contains("City").should("be.visible");
    cy.contains("Pin Code").should("be.visible");
  });

  it("ST006 - Verify Save button", () => {
    cy.contains("SAVE").should("be.visible");
  });

  it("ST007 - Verify Delete button", () => {
    cy.contains("DELETE").should("be.visible");
  });

  /* ===============================
     KYC
  =============================== */

  it("ST008 - Expand KYC section", () => {
    cy.contains("KYC").click();
    cy.contains("Account Holder Name").should("be.visible");
  });

  it("ST009 - Verify KYC input fields", () => {
    cy.contains("Account Number").should("be.visible");
    cy.contains("IFSC Code").should("be.visible");
    cy.contains("Tax Number").should("be.visible");
  });

  it("ST010 - Verify KYC Update button", () => {
    cy.contains("UPDATE").should("be.visible");
  });

  /* ===============================
     TEMPLATES
  =============================== */

  it("ST011 - Expand Templates section", () => {
    cy.contains("Templates").click();
    cy.contains("Invoice").should("be.visible");
  });

  it("ST012 - Verify template tabs", () => {
    cy.contains("Invoice").should("be.visible");
    cy.contains("TC").should("be.visible");
    cy.contains("Conduct").should("be.visible");
    cy.contains("Score Card").should("be.visible");
  });

  it("ST013 - Select Invoice template", () => {
    cy.contains("Invoice").click();
    cy.get("img").should("exist");
  });

  it("ST014 - Switch between templates", () => {
    cy.get("img").first().click();
  });

  /* ===============================
     CHANGE PASSWORD
  =============================== */

  it("ST015 - Expand Change Password section", () => {
    cy.contains("Change Password").click();
    cy.contains("Change Password").should("be.visible");
  });

  it("ST016 - Verify Change Password button", () => {
    cy.contains("Change Password").should("be.visible");
  });

  /* ===============================
     FAQs
  =============================== */

  it("ST017 - Expand FAQs section", () => {
    cy.contains("FAQs").click();
    cy.contains("What is Wondigi").should("be.visible");
  });

  it("ST018 - Verify FAQ cards content", () => {
    cy.contains("Who can use Wondigi").should("be.visible");
    cy.contains("inventory management").should("be.visible");
  });

  /* ===============================
     CONTACT US
  =============================== */

  it("ST019 - Expand Contact Us section", () => {
    cy.contains("Contact Us").click();
    cy.contains("@").should("be.visible");
  });

  it("ST020 - Verify contact email displayed", () => {
    cy.contains("sales@").should("be.visible");
  });

  /* ===============================
     INVITE
  =============================== */

  it("ST021 - Expand Invite section", () => {
    cy.contains("Invite").click();
    cy.get('input[placeholder*="Invite"]').should("be.visible");
  });

  it("ST022 - Verify Invite button", () => {
    cy.contains("INVITE").should("be.visible");
  });

  /* ===============================
     RESPONSIVENESS
  =============================== */

  it("ST023 - Mobile responsiveness (iPhone)", () => {
    cy.viewport("iphone-x");
    cy.contains("Settings").should("be.visible");
  });

  it("ST024 - Tablet responsiveness (iPad)", () => {
    cy.viewport("ipad-2");
    cy.contains("Settings").should("be.visible");
  });

  it("ST025 - Restore desktop view", () => {
    cy.viewport(1280, 720);
    cy.contains("Settings").should("be.visible");
  });

  it("ST026 - Verify page stability after all actions", () => {
    cy.url().should("include", "/settings");
    cy.contains("Settings").should("be.visible");
  });

});
