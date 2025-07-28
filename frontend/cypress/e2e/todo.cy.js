describe('Todo App UI Tests', () => {
  const email = 'user@example.com';
  const password = 'P@ssword1234';

  beforeEach(() => {
    cy.visit('/');
  });

it('Does not navigate away on invalid login', () => {
  cy.get('#email').type('wrong@example.com');
  cy.get('#password').type('wrongpassword');
  cy.contains('Login').click();

  // Assert URL remains on login page
  cy.url().should('eq', 'http://localhost:3000/');
});


  it('Logs in and views empty todo list', () => {
    cy.login(email, password);
    cy.url().should('include', '/todos');
    cy.contains('Todo List');
  });

  it('Adds a new todo item', () => {
    cy.login(email, password);
    cy.get('#new-todo').type('Buy milk');
    cy.get('#add-todo').click();
    cy.contains('Buy milk').should('exist');
  });

  it('Edits a todo item', () => {
    cy.login(email, password);
    cy.contains('Buy milk').parent().find('.edit-btn').click();
    cy.get('#edit-todo').clear().type('Buy bread');
    cy.get('#save-todo').click();
    cy.contains('Buy bread').should('exist');
  });

  it('Deletes a todo item', () => {
    cy.login(email, password);
    cy.contains('Buy bread').parent().find('.delete-btn').click();
    cy.contains('Buy bread').should('not.exist');
  });
});
