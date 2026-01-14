/// <reference types="cypress" />

describe('Dashboard Module – test.wondigi.com', () => {

  const users = [
    { role: 'Super Admin', email: 'user1@nowitservices.com' },
    { role: 'Admin', email: 'user2@nowitservices.com' },
    { role: 'Staff', email: 'user3@nowitservices.com' },
    { role: 'Student', email: 'user4@nowitservices.com' }
  ];

  const password = 'Nowit@123';

  users.forEach((user, index) => {
    it(`DB00${index + 1} - ${user.role} dashboard access`, () => {
      cy.visit('/login');
      cy.get('input[name=email]').type(user.email);
      cy.get('input[name=password]').type(password);
      cy.contains('button', /login/i).click();

      cy.url({ timeout: 20000 }).should('include', '/dashboard');
      cy.contains(/welcome/i).should('be.visible');
    });
  });

  it('DB005 - Dashboard logo visible', () => {
    cy.get('img').should('be.visible');
  });

  it('DB006 - Welcome message visible', () => {
    cy.contains(/welcome/i).should('be.visible');
  });

  it('DB007 - Alerts icon works', () => {
    cy.get('[data-testid="alerts"]').click({ force: true });
  });

  it('DB008 - Logout works', () => {
    cy.get('[data-testid="logout"]').click({ force: true });
    cy.url().should('include', '/login');
  });

  it('DB009 - Left navigation visible', () => {
    cy.get('nav').should('be.visible');
  });

  it('DB010 - Navigation toggle', () => {
    cy.get('[data-testid="menu-toggle"]').click({ force: true });
  });

  it('DB011 - Student status chart visible', () => {
    cy.contains(/student/i).should('be.visible');
  });

  it('DB012 - Staff status chart visible', () => {
    cy.contains(/staff/i).should('be.visible');
  });

  it('DB013 - Attendance charts visible', () => {
    cy.contains(/attendance/i).should('be.visible');
  });

  it('DB014 - Subject score chart visible', () => {
    cy.contains(/subject/i).should('be.visible');
  });

  it('DB015 - Profile → Settings', () => {
    cy.get('[data-testid="profile"]').click({ force: true });
    cy.url().should('include', 'settings');
  });

});
