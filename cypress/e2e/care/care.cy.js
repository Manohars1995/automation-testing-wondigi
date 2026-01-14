describe("Care Module", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/care");
  });

  it("CR001 - Search valid student", () => {
    cy.get("input[placeholder='Enter Details']").type("Kayal");
    cy.contains("Kayal").should("be.visible");
  });

  it("CR002 - Search invalid student", () => {
    cy.get("input[placeholder='Enter Details']").clear().type("invalid123");
    cy.contains("No records").should("be.visible");
  });

  it("CR003 - Verify table headers", () => {
    [
      "Student Id",
      "Roll No",
      "Student Name",
      "Class",
      "Section",
      "Contact",
      "Status"
    ].forEach(text => {
      cy.contains(text).should("be.visible");
    });
  });

  it("CR004 - Toggle inactive cancel", () => {
    cy.get("svg").first().click();
    cy.contains("Cancel").click();
    cy.get("svg").first().should("exist");
  });

  it("CR005 - Toggle inactive confirm", () => {
    cy.get("svg").first().click();
    cy.contains("Confirm").click();
  });

  it("CR006 - Open care detail view", () => {
    cy.get("a").contains("ST").first().click();
    cy.url().should("include", "careDetailView");
  });

  it("CR007 - Care detail widgets", () => {
    cy.contains("Emotional").should("be.visible");
    cy.contains("Social").should("be.visible");
  });

  it("CR008 - Filter by class & section", () => {
    cy.get("select").eq(0).select("1");
    cy.get("select").eq(1).select("A");
    cy.get("table").should("be.visible");
  });

  it("CR009 - Mobile responsive", () => {
    cy.viewport("iphone-x");
    cy.get("table").should("be.visible");
  });

  it("CR010 - Tablet responsive", () => {
    cy.viewport("ipad-2");
    cy.get("table").should("be.visible");
  });
});
