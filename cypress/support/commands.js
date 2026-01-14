Cypress.Commands.add("login", () => {

  cy.session("admin-session", () => {

    cy.visit("/login");

    cy.get('input[type="text"]').first().clear().type("admin");
    cy.get('input[type="password"]').first().clear().type("admin");

    cy.contains(/login/i).click();

    // ✅ ONLY reliable check
    cy.url({ timeout: 30000 }).should("not.include", "/login");
  });

});
