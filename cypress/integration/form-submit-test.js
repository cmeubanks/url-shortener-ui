describe('Form Submission - New Urls', () => {

beforeEach(() => {
  cy.fixture('url-data.json')
  .then((urls) => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: urls
    })
  })

  cy.fixture('new-url-data.json')
    .then((url) => {
      cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
       statusCode: 200,
       body: url
    })
  })

  cy.visit('http://localhost:3000')
})

  it('should render a new shortened URL to App after a user completes form fields and submits', () => {
    cy.get('input[name=title]')
      .type('Stub like a boss')
      .get('input[name=title]').should('have.value', 'Stub like a boss')
    .get('input[name=urlToShorten]')
      .type('https://stubbing-all-over-the-world.com/78910')
      .get('input[name=urlToShorten]').should('have.value', 'https://stubbing-all-over-the-world.com/78910')
    .get('button')
      .click()
    .get('.url').eq(1).get('h3')
      .contains('Stub like a boss')
    .get('.url').eq(1).get('a')
      .contains('http://localhost:3001/useshorturl/2')
    .get('.url').eq(1).get('p')
        .contains('https://stubbing-all-over-the-world.com/78910')
  })
})
