describe("Library Module", () => {

  before(() => {
    cy.login();

    // Go to library landing page
    cy.visit("/libraryView");

    // ✅ STABLE CHECK (sidebar menu, always visible)
    cy.contains("Library", { timeout: 30000 }).should("be.visible");
  });

  it("LB001 - Verify books table fields", () => {
    cy.contains("Books").click();
    cy.url().should("include", "/library");
    cy.contains("Book Id").should("exist");
    cy.contains("Book Name").should("exist");
    cy.contains("Author").should("exist");
    cy.contains("Status").should("exist");
  });

  it("LB002 - Verify inactive toggle cancel", () => {
    cy.contains("Books").click();
    cy.get("tbody tr").first().find("button").last().click();
    cy.contains("Cancel").click();
  });

  it("LB003 - Verify inactive toggle confirm", () => {
    cy.contains("Books").click();
    cy.get("tbody tr").first().find("button").last().click();
    cy.contains("Confirm").click();
  });

  it("LB004 - Verify three dot menu", () => {
    cy.contains("Books").click();
    cy.get("button").contains("⋮").click();
    cy.contains("Import").should("be.visible");
    cy.contains("Export").should("be.visible");
    cy.contains("Download").should("be.visible");
  });

  it("LB005 - Verify book search", () => {
    cy.contains("Books").click();
    cy.get("input[placeholder='Enter Details']")
      .clear()
      .type("BK");
    cy.get("tbody tr").should("exist");
  });

  it("LB006 - Verify Add Book mandatory fields", () => {
    cy.contains("Books").click();
    cy.contains("+ Add").click();
    cy.url().should("include", "/createBook");
    cy.get("input").should("have.length.greaterThan", 5);
  });

  it("LB007 - Create book with valid data", () => {
    cy.contains("Books").click();
    cy.contains("+ Add").click();

    cy.get("input").eq(1).type("manohar");
    cy.get("input").eq(2).type("manohar");
    cy.get("input").eq(3).type("manohar publishers");
    cy.get("input").eq(4).type("comic");
    cy.get("input").eq(5).type("100000");
    cy.get("input").eq(6).type("11111");
    cy.get("input").eq(7).type("121");
    cy.get("input").eq(8).type("11111");
    cy.get("input").eq(9).type("100");
    cy.get("textarea").type("hi");
    cy.get("input").last().type("123456789");

    cy.contains("Add Book").click();
  });

  it("LB008 - Verify users search", () => {
    cy.contains("Users").click();
    cy.get("input[placeholder='Enter Details']")
      .clear()
      .type("ST");
    cy.contains("No Books Found").should("exist");
  });

  it("LB009 - Add book to user", () => {
    cy.contains("Users").click();
    cy.contains("+ Add Book").click();
    cy.url().should("include", "/addBook");
  });

  it("LB010 - Responsive checks", () => {
    cy.viewport(375, 667);
    cy.contains("Library").should("exist");

    cy.viewport(768, 1024);
    cy.contains("Library").should("exist");
  });

});
