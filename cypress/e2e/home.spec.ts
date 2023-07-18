// https://on.cypress.io/api

describe('Lauch website', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Explorez le monde en recherchant des pays et apprenez de nouvelles choses')
  })

  it('search a country "FR" and find "France" in list', () => {
    cy.visit('/')
    cy.get('[data-cy="search_country"]').type('fr')
    cy.get('#autocomplete_1').contains('France')
  })

   it('search a country "FR" and select it by click naviguate to "/explore"', () => {
    cy.visit('/')
    cy.get('[data-cy="search_country"]').type('fr')
     cy.get('#autocomplete_1').click()
    cy.url().should('include', '/explore')
   })

   
   it('new page have h2 with Country name"', () => {
    cy.visit('/')
    cy.get('[data-cy="search_country"]').type('fr')
    cy.get('#autocomplete_1').click()
    cy.get('h2').contains('France')
  })
})
