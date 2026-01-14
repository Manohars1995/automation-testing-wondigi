/// <reference types="cypress" />

describe('Login Module – test.wondigi.com', () => {

  beforeEach(() => {
    cy.visit('/login');
    cy.wait(2000);
  });

  /* =========================================================
     LP001 – Login with valid Super Admin
  ========================================================= */
  it('LP001 - Login with valid Super Admin', () => {
    cy.get('input').eq(0).type('user1@nowitservices.com');
    cy.get('input').eq(1).type('Nowit@123');
    cy.contains('button', /login/i).click();

    cy.url({ timeout: 20000 }).should('not.include', '/login');
  });

  /* =========================================================
     LP002 – Login with valid Admin
  ========================================================= */
  it('LP002 - Login with valid Admin', () => {
    cy.get('input').eq(0).type('user2@nowitservices.com');
    cy.get('input').eq(1).type('Nowit@123');
    cy.contains('button', /login/i).click();

    cy.url({ timeout: 20000 }).should('not.include', '/login');
  });

  /* =========================================================
     LP003 – Login with valid Staff
  ========================================================= */
  it('LP003 - Login with valid Staff', () => {
    cy.get('input').eq(0).type('user3@nowitservices.com');
    cy.get('input').eq(1).type('Nowit@123');
    cy.contains('button', /login/i).click();

    cy.url({ timeout: 20000 }).should('not.include', '/login');
  });

  /* =========================================================
     LP004 – Login with valid Student
  ========================================================= */
  it('LP004 - Login with valid Student', () => {
    cy.get('input').eq(0).type('user4@nowitservices.com');
    cy.get('input').eq(1).type('Nowit@123');
    cy.contains('button', /login/i).click();

    cy.url({ timeout: 20000 }).should('not.include', '/login');
  });

  /* =========================================================
     LP005 – Login with all fields empty
  ========================================================= */
  it('LP005 - Login with all fields empty', () => {
    cy.contains('button', /login/i).click();
    cy.contains(/required|error/i).should('be.visible');
  });

  /* =========================================================
     LP006 – Email filled, Password empty
  ========================================================= */
  it('LP006 - Email entered, Password empty', () => {
    cy.get('input').eq(0).type('user2@nowitservices.com');
    cy.contains('button', /login/i).click();
    cy.contains(/password/i).should('be.visible');
  });

  /* =========================================================
     LP007 – Password filled, Email empty
  ========================================================= */
  it('LP007 - Password entered, Email empty', () => {
    cy.get('input').eq(1).type('Nowit@123');
    cy.contains('button', /login/i).click();
    cy.contains(/email/i).should('be.visible');
  });

  /* =========================================================
     LP008 – Invalid email format
  ========================================================= */
  it('LP008 - Invalid email format', () => {
    cy.get('input').eq(0).type('usergmail.com');
    cy.get('input').eq(1).type('Nowit@123');
    cy.contains('button', /login/i).click();
    cy.contains(/email/i).should('be.visible');
  });

  /* =========================================================
     LP009 – Invalid password
  ========================================================= */
  it('LP009 - Invalid password', () => {
    cy.get('input').eq(0).type('user2@nowitservices.com');
    cy.get('input').eq(1).type('Wrong@123');
    cy.contains('button', /login/i).click();
    cy.contains(/invalid|error/i).should('be.visible');
  });

  /* =========================================================
     LP010 – Forgot Password navigation
  ========================================================= */
  it('LP010 - Forgot Password navigation', () => {
    cy.contains(/forgot password/i).click();
    cy.url().should('include', 'forgot');
  });

  /* =========================================================
     LP011 – Forgot Password with registered email
  ========================================================= */
  it('LP011 - Forgot Password with registered email', () => {
    cy.contains(/forgot password/i).click();
    cy.get('input').eq(0).type('user2@nowitservices.com');
    cy.contains(/send otp/i).click();
    cy.contains(/otp/i).should('be.visible');
  });

  /* =========================================================
     LP012 – Forgot Password with unregistered email
  ========================================================= */
  it('LP012 - Forgot Password with unregistered email', () => {
    cy.contains(/forgot password/i).click();
    cy.get('input').eq(0).type('unknown@test.com');
    cy.contains(/send otp/i).click();
    cy.contains(/not found|error/i).should('be.visible');
  });

  /* =========================================================
     LP013 – Back to Home navigation
  ========================================================= */
  it('LP013 - Back to Home navigation', () => {
    cy.contains(/back|home/i).click();
    cy.url().should('not.include', '/login');
  });

  /* =========================================================
     LP014 – Keyboard navigation & Enter key
  ========================================================= */
  it('LP014 - Keyboard navigation and Enter key', () => {
    cy.get('input').eq(0).type('user2@nowitservices.com');
    cy.get('input').eq(1).type('Nowit@123{enter}');
    cy.url({ timeout: 20000 }).should('not.include', '/login');
  });

  /* =========================================================
     LP015 – UI responsiveness
  ========================================================= */
  it('LP015 - UI responsiveness', () => {
    cy.viewport('iphone-x');
    cy.get('input').eq(0).should('be.visible');

    cy.viewport('ipad-2');
    cy.get('input').eq(0).should('be.visible');

    cy.viewport(1280, 800);
    cy.get('input').eq(0).should('be.visible');
  });

});
