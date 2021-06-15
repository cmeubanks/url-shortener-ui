describe('Main Page Tests', () => {


  beforeEach(() => {
    cy.fixture('url-data.json')
      .then(urls => {
        cy.intercept('http://localhost:3001/api/v1/urls', {
          statusCode: 200,
          body: urls
        })
      })
      cy.visit('http://localhost:3000/')
  })
})
