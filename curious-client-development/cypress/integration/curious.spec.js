describe('the page loads', () => {
  it('signs up a user', () => {
    cy.visit('http://localhost:3000/login');

    cy.contains('Sign-Up').click();

    cy.get('input[placeholder="Name"]').type('timoteo');
    cy.get('input[placeholder="Email"]').type('timoteo@timoteo.com');
    cy.get('input[placeholder="Password"]').type('timoteo');

    cy.get('.submit').click().should(() => {
      expect(localStorage.getItem('token')).to.include('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
    });

    cy.url().should('include', '/dashboard');

    cy.get('#add-roadmap-button').click();

    cy.get('input[placeholder="Add title here"]').type('Learn Javascript');
    cy.get('select').select('Development');
    cy.get('button').click();


    cy.get('a[href="/discover"').click();

    cy.get('a[href="/preview/2"').click();
    cy.get('button').click();

    cy.url().should('include', '/dashboard');
  });
});
