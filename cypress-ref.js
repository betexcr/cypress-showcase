// cypress/e2e/full_spec.cy.js

describe('Cypress Full Capabilities Showcase', () => {

  beforeEach(() => {
    cy.visit('https://example.cypress.io');
  });

  it('Performs UI interaction and assertions', () => {
    cy.contains('type').click();

    cy.url().should('include', '/commands/actions');

    cy.get('.action-email')
      .type('test@example.com')
      .should('have.value', 'test@example.com');

    cy.get('.action-form').within(() => {
      cy.get('input[name="first_name"]').type('John');
      cy.get('input[name="last_name"]').type('Doe');
      cy.get('input[name="email"]').type('john@example.com');

      cy.get('select').select('Option 2');
      cy.get('input[type="checkbox"]').check();
      cy.get('input[type="radio"]').check('radio1');

      cy.get('textarea').type('This is a test message.');

      cy.get('button[type="submit"]').click();
    });

    cy.contains('Form submitted successfully').should('be.visible');

    cy.screenshot('ui-test-snapshot');
  });

  it('Handles API requests', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
    });

    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('title', 'foo');
    });
  });

  it('Uploads a file', () => {
    cy.visit('https://example.cypress.io/commands/actions');

    cy.get('input[type=file]').selectFile('cypress/fixtures/sample.txt');
    cy.get('input[type=file]').should('have.value', 'C:\\fakepath\\sample.txt');
  });

  it('Uses custom commands', () => {
    cy.login('user@example.com', 'password123');
    cy.url().should('include', '/dashboard');
  });

  it('Performs visual regression check', () => {
    cy.visit('https://example.cypress.io/todo');
    cy.get('.todo-list li').should('have.length', 2);
    cy.compareSnapshot('todo-page');
  });
});

// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/login', { email, password }).then((resp) => {
    window.localStorage.setItem('authToken', resp.body.token);
  });
});

Cypress.Commands.add('compareSnapshot', (name) => {
  cy.screenshot(name);
});
