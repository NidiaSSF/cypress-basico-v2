Cypress.Commands.add ('fillMandatoryFieldsAndSubmit', function () {
  //const longText = 'Realizei um pedido no dia 06/03/2022, o valor da compra foi debitado no meu cartão de crédito. A data prevista para entrega do produto era 06/04/2022, no entanto mais de um ano depois o produto não foi entregue.'
  cy.get('#firstName').type ('Maria')
  cy.get('#lastName').type ('Do Carmo')
  cy.get('#email').type ('mariacarmo@bol.com')
  //cy.get('#open-text-area').type (longText, {delay: 0})
  cy.get('#open-text-area').type ('Eu realizei uma compra e não recebi o produto')
  //Seção 3 - Extra8
  cy.contains('button', 'Enviar').click()
})




// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
