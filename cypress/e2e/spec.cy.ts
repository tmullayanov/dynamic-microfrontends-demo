describe('happy path', () => {
  it('load button microfrontend', () => {
    cy.visit('http://localhost:4001');

    cy.contains('Dynamic MicroFrontends Host');
    cy.contains('Load Widget').click();
    cy.contains('Hello from provider').should('not.exist');
    cy.contains('Provider button').click();
    cy.contains('Hello from provider');
  });

  it('load widget microfrontend', () => {
    cy.visit('http://localhost:4001');

    cy.contains('Dynamic MicroFrontends Host');
    cy.contains('This is embeddable widget that can be loaded via Module Federation')
      .should('not.exist');
    
    cy.get('button').contains('Load url for Widget component').click();
    cy.get('button')
      .contains('Load component and render it')
      .should('not.be.disabled')
      .click();

    cy.contains('This is embeddable widget that can be loaded via Module Federation');
  })
});