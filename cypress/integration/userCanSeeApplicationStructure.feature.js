describe('Application main view', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('contains titel', () => {
    cy.get("section[name='title']")
      .should('contain', 'GitHub Search engine')
  });

  it('contains search bar', () => {
    cy.get('input#search-field').should('exist')
  })

  it('contains search submit', () => {
    cy.get('button#search-submit').should('exist')
  })
});