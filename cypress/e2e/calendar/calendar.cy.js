describe("Calendar Module", () => {

before(() => {
  cy.login();
  cy.visit("/newCalendar");

  // Verify page loaded by URL only
  cy.location("pathname", { timeout: 30000 })
    .should("eq", "/newCalendar");
});



  it("CL001 - Week button displays week view", () => {
    cy.get('[aria-label="week view"]').click();
    cy.get(".fc-timegrid").should("be.visible");
  });

  it("CL002 - Day button displays day view", () => {
    cy.get('[aria-label="day view"]').click();
    cy.get(".fc-timegrid").should("be.visible");
  });

  it("CL003 - Agenda button displays agenda view", () => {
    cy.get('[aria-label="agenda view"]').click();
    cy.get(".fc-list").should("be.visible");
  });

  it("CL004 - Today button navigation", () => {
    cy.get('[aria-label="today"]').click();
    cy.get(".fc-view-harness").should("be.visible");
  });

  it("CL005 - Previous navigation", () => {
    cy.get(".fc-prev-button").click();
    cy.get(".fc-view-harness").should("be.visible");
  });

  it("CL006 - Next navigation", () => {
    cy.get(".fc-next-button").click();
    cy.get(".fc-view-harness").should("be.visible");
  });

  it("CL007 - Open calendar event popup", () => {
    cy.get(".fc-event", { timeout: 30000 }).first().click();
    cy.get(".modal, .popup").should("exist");
  });

  it("CL008 - Edit event popup opens", () => {
    cy.contains("Edit").click();
    cy.get("form").should("be.visible");
  });

  it("CL009 - Cancel edit event", () => {
    cy.contains("Cancel").click();
    cy.get(".modal, .popup").should("not.exist");
  });

  it("CL010 - Calendar alignment", () => {
    cy.get(".fc-view-harness").should("be.visible");
  });

  it("CL011 - Mobile responsiveness", () => {
    cy.viewport("iphone-x");
    cy.get(".fc-view-harness").should("be.visible");
  });

  it("CL012 - Tablet responsiveness", () => {
    cy.viewport("ipad-2");
    cy.get(".fc-view-harness").should("be.visible");
  });

});
