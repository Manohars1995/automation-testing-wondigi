describe("Administration → Time Table Module", () => {
  let data;

  before(() => {
    cy.fixture("timetablesampledata.json").then(d => (data = d));
  });

  beforeEach(() => {
    cy.visit("/timeTableList");
    cy.contains("Time Tables", { timeout: 20000 }).should("be.visible");
  });

  it("TT01 - Verify timetable cards visible", () => {
    cy.contains("Class").should("exist");
  });

  it("TT02 - Verify import / export / download menu", () => {
    cy.get("button").contains("ADD").parent().find("button").last().click();
    cy.contains("Import").should("be.visible");
    cy.contains("Export").should("be.visible");
    cy.contains("Download").should("be.visible");
  });

  it("TT03 - Search valid record", () => {
    cy.get("input[placeholder='Enter Details']").type("Class");
    cy.contains("Class").should("exist");
  });

  it("TT04 - Search invalid record", () => {
    cy.get("input[placeholder='Enter Details']").type("XYZ");
    cy.contains("No data").should("exist");
  });

  it("TT05 - Click Add and verify form", () => {
    cy.contains("+ ADD").click();
    cy.contains("Create TimeTable").should("be.visible");
  });

  it("TT06 - Verify TimeTable ID auto-generated", () => {
    cy.get("input[label='TimeTable ID']").invoke("val").should("match", /^TB/);
  });

  it("TT07 - Verify working days non-editable", () => {
    cy.get("input").contains("6").should("be.disabled");
  });

  it("TT08 - Create timetable with valid data", () => {
    cy.get("input").eq(1).type(data.class);
    cy.get("input").eq(2).type(data.section);
    cy.get("input").eq(3).type(data.academicYear);
    cy.get("input").eq(5).type(data.noOfPeriods);
    cy.get("input").eq(6).type(data.periodDuration);
    cy.get("input").eq(7).type(data.roomNo);

    cy.get("select").contains(data.status);

    Object.entries(data.weeklySchedule).forEach(([day, d]) => {
      cy.contains(day).parent().within(() => {
        cy.get("input").eq(0).type(d.staffId);
        cy.get("input").eq(1).type(d.staffName);
        cy.get("select").eq(0).select(d.subject);
        cy.get("input").eq(2).type(d.period);
        cy.get("input[type='time']").eq(0).type(d.start);
        cy.get("input[type='time']").eq(1).type(d.end);
      });
    });

    cy.contains("Submit").click();
    cy.contains("Success", { timeout: 20000 }).should("be.visible");
  });

  it("TT09 - Submit empty form shows errors", () => {
    cy.contains("+ ADD").click();
    cy.contains("Submit").click();
    cy.contains("*").should("exist");
  });

  it("TT10 - Verify Active status creation", () => {
    cy.contains("Active").should("exist");
  });

  it("TT11 - Verify Inactive status creation", () => {
    cy.contains("+ ADD").click();
    cy.get("select").select("Inactive");
    cy.contains("Submit").click();
    cy.contains("Inactive").should("exist");
  });

  it("TT12 - Responsive mobile view", () => {
    cy.viewport("iphone-x");
    cy.contains("Time Tables").should("be.visible");
  });

  it("TT13 - Responsive tablet view", () => {
    cy.viewport("ipad-2");
    cy.contains("Time Tables").should("be.visible");
  });
});
