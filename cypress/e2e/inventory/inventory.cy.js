describe("Inventory Module", () => {

  before(() => {
    cy.login();
    cy.visit("/inventory");
  });

  it("IV001 - Verify inventory table headers", () => {
    cy.contains("Item Id");
    cy.contains("Item Name");
    cy.contains("Category");
    cy.contains("Brand");
    cy.contains("Stock");
    cy.contains("Unit Price");
    cy.contains("Total Price");
    cy.contains("Status");
  });

  it("IV002 - Verify search valid", () => {
    cy.get("input[placeholder='Enter Details']").type("white");
    cy.contains("white").should("exist");
  });

  it("IV003 - Verify search invalid", () => {
    cy.get("input[placeholder='Enter Details']").clear().type("xxxx");
    cy.contains("No records").should("exist");
  });

  it("IV004 - Verify import option", () => {
    cy.get("button").contains("⋮").click();
    cy.contains("Import").should("be.visible");
  });

  it("IV005 - Verify export option", () => {
    cy.contains("Export").should("be.visible");
  });

  it("IV006 - Verify download option", () => {
    cy.contains("Download").should("be.visible");
  });

  it("IV007 - Verify Add Inventory page fields", () => {
    cy.contains("+ Add").click();
    cy.contains("Create Inventory");
    cy.get("input").should("have.length.greaterThan", 5);
  });

  it("IV008 - Verify auto generated item id", () => {
    cy.get("input").first().should("not.have.value", "");
  });

  it("IV009 - Create inventory with valid data", () => {
    cy.fixture("inventory.sample.json").then(data => {
      cy.get("input").eq(1).type(data.itemName);
      cy.get("input").eq(2).type(data.unitPrice);
      cy.get("input").eq(3).type(data.quantity);
      cy.get("input").eq(4).type(data.restockPoint);
      cy.get("input").eq(6).type(data.brand);
      cy.get("input").eq(7).type(data.supplierName);
      cy.get("input").eq(8).type(data.supplierContact);
      cy.get("input").eq(9).type(data.supplierEmail);
      cy.get("input").eq(10).type(data.place);
      cy.contains("Add").click();
    });
  });

  it("IV010 - Verify empty submit validation", () => {
    cy.contains("+ Add").click();
    cy.contains("Add").click();
    cy.contains("required").should("exist");
  });

  it("IV011 - Verify invalid email validation", () => {
    cy.get("input[type='email']").type("abc.com");
    cy.contains("invalid").should("exist");
  });

  it("IV012 - Verify mobile responsive", () => {
    cy.viewport("iphone-6");
    cy.contains("Inventory Details");
  });

  it("IV013 - Verify tablet responsive", () => {
    cy.viewport("ipad-2");
    cy.contains("Inventory Details");
  });
});
