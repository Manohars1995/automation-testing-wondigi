describe("Billing → Fee Transactions", () => {

  beforeEach(() => {
    cy.visit("/feeTable");
  });

  it("BL001 - Verify table headers", () => {
    cy.contains("Fee Transactions");
    cy.contains("Total Fee");
    cy.contains("Fee Paid");
    cy.contains("Due");
  });

  it("BL002 - Download receipt", () => {
    cy.get("table tbody tr").first().find("svg").last().click();
  });

  it("BL004 - Search valid record", () => {
    cy.get('input[placeholder="Enter Details"]').type("Kayal");
    cy.contains("Kayal");
  });

  it("BL005 - Search invalid record", () => {
    cy.get('input[placeholder="Enter Details"]').clear().type("ABCD");
    cy.contains("No records").should("exist");
  });

  it("BL006 - Import option", () => {
    cy.get("button").contains("⋮").click();
    cy.contains("Import").should("exist");
  });

  it("BL007 - Export option", () => {
    cy.get("button").contains("⋮").click();
    cy.contains("Export").click();
  });

  it("BL008 - Download option", () => {
    cy.get("button").contains("⋮").click();
    cy.contains("Download").click();
  });

  it("BL009 - Open billing detail view", () => {
    cy.contains("ST000001").click();
    cy.url().should("include", "billingDetailView");
  });

  it("BL010 - Billing data auto loaded", () => {
    cy.contains("User Name");
    cy.contains("Due Date");
  });

  it("BL013 - Mobile responsiveness", () => {
    cy.viewport("iphone-12");
    cy.contains("Fee Transactions");
  });

  it("BL014 - Tablet responsiveness", () => {
    cy.viewport("ipad-2");
    cy.contains("Fee Transactions");
  });

});
