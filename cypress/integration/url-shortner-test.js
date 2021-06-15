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

  describe('Page Load', () => {

    it('should display page elements and existing server data on main page load', () => {
      cy.get('h1')
        .contains('URL Shortener')
    })
  })
})
