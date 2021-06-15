describe('Main Page Tests', () => {


  beforeEach(() => {
    cy.fixture('url-data.json')
      .then(urls => {
        cy.intercept('http://localhost:3001/api/v1/urls', {
          statusCode: 200,
          body: urls
        })
      })
      cy.visit('http://localhost:3001/')
  })

  describe('Page Load', () => {

    it('should display page elements and existing server data on main page load', () => {
      cy.get('h1')
        .contains('URL Shortener')
        .get('.url').should('have.length', 1)
        .get('.url').eq(0).get('h3')
          .contains('Awesome stub')
        .get('.url').eq(0).get('a')
          .contains('http://localhost:3001/useshorturl/1')
        .get('.url').eq(0).get('p')
          .contains('https://this-is-a-stub.com/1324928349872')
    })

    it('should display a form on page load with default inputs', () => {
      cy.get('form').should('exist')
        .get('input')
          .should('have.length', 2)
        .get('input[name=title]')
          .should('have.value', '')
        .get('input[name=urlToShorten]')
          .should('have.value', '')
        .get('button')
          .contains('Shorten Please!')
    })
  })

  describe('Form Inputs', () => {

    it('should reflect user inputs in form fields when user interacts with form', () => {
      cy.get('form')
        .get('input[name=title]').type('Keep Going')
        .get('input[name=title]')
          .should('have.value', 'Keep Going')
        .get('input[name=urlToShorten]').type('https://another-stub.com/1234')
        .get('input[name=urlToShorten]')
            .should('have.value', 'https://another-stub.com/1234')
    })
  })
})
