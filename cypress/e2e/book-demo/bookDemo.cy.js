/// <reference types="cypress" />

describe('Book Demo Module – test.wondigi.com', () => {

  beforeEach(() => {
    cy.visit('/request');
    cy.wait(2000); // allow UI to stabilize
  });

  /* =========================================================
     TC_BD_01 – Page loads successfully
  ========================================================= */
  it(
    'TC_BD_01 - Page loads successfully',
    {
      module: 'Book Demo',
      scenario: 'Open Book Demo page',
      expected: 'Book Demo page should load successfully'
    },
    () => {
      cy.url().should('include', '/request');
    }
  );

  /* =========================================================
     TC_BD_02 – Request Demo button visible
  ========================================================= */
  it(
    'TC_BD_02 - Request Demo button visible',
    {
      module: 'Book Demo',
      scenario: 'Verify Request Demo button',
      expected: 'Request Demo button should be visible'
    },
    () => {
      cy.contains('button', /demo/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_03 – Submit with valid details
  ========================================================= */
  it(
    'TC_BD_03 - Submit form with valid details',
    {
      module: 'Book Demo',
      scenario: 'Submit valid demo request',
      expected: 'Form should be submitted successfully'
    },
    () => {
      cy.get('input').eq(0).type('Manohar');                  // Name
      cy.get('input').eq(1).type('9515310258');               // Contact
      cy.get('input[type="email"]').type('manohar@test.com'); // Email
      cy.get('input').eq(3).type('Navity Services');           // Organization
      cy.get('input[type="time"]').type('10:30');             // Time
      cy.get('textarea').type('We need ERP solution');

      cy.contains('button', /demo/i).click();

      cy.contains(/thank|success/i, { timeout: 20000 })
        .should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_04 – Submit with empty fields
  ========================================================= */
  it(
    'TC_BD_04 - Submit with all fields empty',
    {
      module: 'Book Demo',
      scenario: 'Submit empty form',
      expected: 'Validation errors should be shown'
    },
    () => {
      cy.contains('button', /demo/i).click();
      cy.contains(/required|error/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_05 – Invalid name validation
  ========================================================= */
  it(
    'TC_BD_05 - Invalid name validation',
    {
      module: 'Book Demo',
      scenario: 'Enter invalid name',
      expected: 'Name validation error should appear'
    },
    () => {
      cy.get('input').eq(0).type('1234@@@');
      cy.contains('button', /demo/i).click();
      cy.contains(/name/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_06 – Invalid contact number
  ========================================================= */
  it(
    'TC_BD_06 - Invalid contact number',
    {
      module: 'Book Demo',
      scenario: 'Enter invalid contact number',
      expected: 'Contact validation error should appear'
    },
    () => {
      cy.get('input').eq(1).type('123');
      cy.contains('button', /demo/i).click();
      cy.contains(/contact|phone/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_07 – Invalid email
  ========================================================= */
  it(
    'TC_BD_07 - Invalid email validation',
    {
      module: 'Book Demo',
      scenario: 'Enter invalid email',
      expected: 'Email validation error should appear'
    },
    () => {
      cy.get('input[type="email"]').type('abc@');
      cy.contains('button', /demo/i).click();
      cy.contains(/email/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_08 – Invalid organization name
  ========================================================= */
  it(
    'TC_BD_08 - Invalid organization name',
    {
      module: 'Book Demo',
      scenario: 'Enter invalid organization name',
      expected: 'Organization validation error should appear'
    },
    () => {
      cy.get('input').eq(3).type('@@@###');
      cy.contains('button', /demo/i).click();
      cy.contains(/organization/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_09 – Description length validation
  ========================================================= */
  it(
    'TC_BD_09 - Description more than limit',
    {
      module: 'Book Demo',
      scenario: 'Enter long description',
      expected: 'Description length validation should appear'
    },
    () => {
      cy.get('textarea').type('A'.repeat(300));
      cy.contains('button', /demo/i).click();
      cy.contains(/limit|description/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_10 – Time picker opens
  ========================================================= */
  it(
    'TC_BD_10 - Time picker opens',
    {
      module: 'Book Demo',
      scenario: 'Open time picker',
      expected: 'Time picker should be accessible'
    },
    () => {
      cy.get('input[type="time"]').click().should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_11 – Time selected correctly
  ========================================================= */
  it(
    'TC_BD_11 - Time selected correctly',
    {
      module: 'Book Demo',
      scenario: 'Select time value',
      expected: 'Time value should be accepted'
    },
    () => {
      cy.get('input[type="time"]')
        .type('11:45')
        .should('have.value', '11:45');
    }
  );

  /* =========================================================
     TC_BD_12 – Name empty validation
  ========================================================= */
  it(
    'TC_BD_12 - Name empty validation',
    {
      module: 'Book Demo',
      scenario: 'Submit without name',
      expected: 'Name validation should appear'
    },
    () => {
      cy.get('input[type="email"]').type('test@test.com');
      cy.contains('button', /demo/i).click();
      cy.contains(/name/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_13 – Email empty validation
  ========================================================= */
  it(
    'TC_BD_13 - Email empty validation',
    {
      module: 'Book Demo',
      scenario: 'Submit without email',
      expected: 'Email validation should appear'
    },
    () => {
      cy.get('input').eq(0).type('Manohar');
      cy.contains('button', /demo/i).click();
      cy.contains(/email/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_14 – Multiple invalid fields
  ========================================================= */
  it(
    'TC_BD_14 - Multiple invalid fields',
    {
      module: 'Book Demo',
      scenario: 'Submit multiple invalid fields',
      expected: 'Multiple validation errors should appear'
    },
    () => {
      cy.get('input').eq(0).type('12');
      cy.get('input[type="email"]').type('abc');
      cy.contains('button', /demo/i).click();
      cy.contains(/error|invalid/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_15 – Mobile responsiveness
  ========================================================= */
  it(
    'TC_BD_15 - Mobile responsiveness',
    {
      module: 'Book Demo',
      scenario: 'Mobile viewport',
      expected: 'UI should render correctly on mobile'
    },
    () => {
      cy.viewport('iphone-x');
      cy.contains('button', /demo/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_16 – Tablet responsiveness
  ========================================================= */
  it(
    'TC_BD_16 - Tablet responsiveness',
    {
      module: 'Book Demo',
      scenario: 'Tablet viewport',
      expected: 'UI should render correctly on tablet'
    },
    () => {
      cy.viewport('ipad-2');
      cy.contains('button', /demo/i).should('be.visible');
    }
  );

  /* =========================================================
     TC_BD_17 – Desktop responsiveness
  ========================================================= */
  it(
    'TC_BD_17 - Desktop responsiveness',
    {
      module: 'Book Demo',
      scenario: 'Desktop viewport',
      expected: 'UI should render correctly on desktop'
    },
    () => {
      cy.viewport(1280, 800);
      cy.contains('button', /demo/i).should('be.visible');
    }
  );

});
