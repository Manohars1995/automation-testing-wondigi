/// <reference types="cypress" />

describe("Examinations Module", () => {

  before(() => {
    cy.login(); // existing custom command
  });

  beforeEach(() => {
    cy.visit("/academics");
    cy.contains("Exams").click();
    cy.url().should("include", "exams");
  });

  it("EX001 - Verify exam toggles visible", () => {
    cy.contains("Half yearly").should("be.visible");
    cy.contains("Final").should("be.visible");
    cy.contains("Unit test-2").should("be.visible");
  });

  it("EX002 - Toggle Half yearly", () => {
    cy.contains("Half yearly")
      .parent()
      .find("input[type='checkbox']")
      .click({ force: true });
  });

  it("EX003 - Toggle Final", () => {
    cy.contains("Final")
      .parent()
      .find("input[type='checkbox']")
      .click({ force: true });
  });

  it("EX004 - Toggle Unit test-2", () => {
    cy.contains("Unit test-2")
      .parent()
      .find("input[type='checkbox']")
      .click({ force: true });
  });

  it("EX005 - Valid search", () => {
    cy.get("input[placeholder='Enter Details']").type("Half yearly");
    cy.contains("Half yearly").should("be.visible");
  });

  it("EX006 - Invalid search", () => {
    cy.get("input[placeholder='Enter Details']")
      .clear()
      .type("RandomExam123");
    cy.contains("No Records Found").should("be.visible");
  });

  it("EX007 - Click +ADD and verify fields", () => {
    cy.contains("+ ADD").click();
    cy.url().should("include", "addExam");

    cy.contains("Exam Id").should("be.visible");
    cy.contains("Examination Name").should("be.visible");
    cy.contains("Start Date").should("be.visible");
    cy.contains("End Date").should("be.visible");
    cy.contains("Classes").should("be.visible");
  });

  it("EX008 - Exam ID auto generated", () => {
    cy.get("input[name='examId']")
      .invoke("val")
      .should("match", /^EX\d+/);
  });

  it("EX009 - Start & End date system date editable", () => {
    const today = new Date().toISOString().split("T")[0];
    cy.get("input[name='startDate']").should("have.value", today);
    cy.get("input[name='endDate']").should("have.value", today);
  });

  it("EX010 - Create exam with valid timetable", () => {
    cy.get("input[name='examinationName']").type("Sem Examination");
    cy.get("select").contains("I").click({ force: true });

    cy.get("input[placeholder='dd-mm-yyyy']").type("16-11-1995");
    cy.get("input[placeholder='Enter Day']").type("Monday");
    cy.get("input[placeholder='Enter Subject']").type("English");
    cy.get("input[placeholder='Enter Timings']").type("10:30");
    cy.get("input[placeholder='Enter Syllabus']").type("Completed");
    cy.get("input[placeholder='Enter Marks']").type("75");

    cy.contains("Update").click();
    cy.contains("Record created successfully").should("be.visible");
  });

  it("EX011 - Invalid timetable submission", () => {
    cy.contains("+ ADD").click();
    cy.contains("Update").click();
    cy.contains("This field is required").should("be.visible");
  });

  it("EX012 - Mobile responsiveness", () => {
    cy.viewport("iphone-x");
    cy.contains("Examinations").should("be.visible");
  });

  it("EX013 - Tablet responsiveness", () => {
    cy.viewport("ipad-2");
    cy.contains("Examinations").should("be.visible");
  });

});
