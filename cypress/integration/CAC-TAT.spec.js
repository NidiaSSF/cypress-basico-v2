/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach (function () {
     cy.visit ('./src/index.html')
  })
 
  //Seção 2
  it('Verifica o título da aplicação', function() {
     cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  //Seção 3 - Exercício
  it('Preenche os campos obrigatórios e envia o formulário', function() { 
     const longText = 'Realizei um pedido no dia 06/03/2022, o valor da compra foi debitado no meu cartão de crédito. A data prevista para entrega do produto era 06/04/2022, no entanto mais de um ano depois o produto não foi entregue.'
     cy.get('#firstName').type ('Maria')
     cy.get('#lastName').type ('Do Carmo')
     cy.get('#email').type ('mariacarmo@bol.com')
     //Seção 3 - Extra1
     cy.get('#open-text-area').type (longText, {delay: 0})
     //Seção 3 - Extra8
     cy.contains('button','Enviar').click()

     cy.get('.success').should('be.visible')
  })
 
  //Seção 3 - Extra2
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
     cy.get('#firstName').type ('Maria')
     cy.get('#lastName').type ('Do Carmo')
     cy.get('#email').type ('mariacarmo.bol.com')
     cy.get('#open-text-area').type ('Eu realizei uma compra e não recebi o produto')
     //Seção 3 - Extra8
     cy.contains('button', 'Enviar').click()

     cy.get('.error').should('be.visible')
  })
  
  //Seção 3 - Extra3
  it('O campo telefone ficará vázio quando um valor não numérico for informado', function () {
     cy.get('#phone')
       .type ('Brasil')

       .should('have.value', '')
  })
  
  //Seção 3 - Extra4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function (){
     cy.get('#firstName').type ('Maria')
     cy.get('#lastName').type ('Do Carmo')
     cy.get('#email').type ('mariacarmo@bol.com')
     //Seção 6 - Extra1
     cy.get('#phone-checkbox').check()
     cy.get('#open-text-area').type ('Eu realizei uma compra e não recebi o produto')
     //Seção 3 - Extra8
     cy.contains('button','Enviar').click()

     cy.get('.error').should('be.visible')
  })

  //Seção 3 - Extra5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
     cy.get('#firstName')
       .type ('Maria')
       .should('have.value', 'Maria')
       .clear ()
       .should('have.value', '')

     cy.get('#lastName')
       .type ('Do Carmo')
       .should('have.value', 'Do Carmo')
       .clear ()
       .should('have.value', '')

     cy.get('#email')
       .type ('mariacarmo@bol.com')
       .should('have.value', 'mariacarmo@bol.com')
       .clear ()
       .should('have.value', '')

     cy.get('#phone')
       .type ('993945672')
       .should('have.value', '993945672')
       .clear ()
       .should('have.value', '')
  })

  //Seção 3 - Extra6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function (){
    //Seção 3 - Extra8 
    cy.contains('button', 'Enviar').click()

     cy.get('.error').should('be.visible')
  })

  //Seção 3 - Extra7 (estudos sobre comando customizado)
  it('envia o formuário com sucesso usando um comando customizado', function (){
    cy.fillMandatoryFieldsAndSubmit ()
    cy.get('.success').should('be.visible')
  })

  //Seção 4
  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  //Seção 4 - Extra1
  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  //Seção 4 - Extra2
  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  //Seção 5
  it('marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]')
      .check ()
      .should('have.value', 'feedback')
  })

  //Seção 5 - Extra1 
  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio){
      cy.wrap($radio).check ()     
      cy.wrap($radio).should('be.checked')
    })
  })

//Seção 6
  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck ()
      .should('not.be.checked')    
  })

  //Seção 7 (verificar como abrir o console. Ele esta usando o chrome)
  it('seleciona um arquivo da pasta fixtures', function (){
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        //console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  
  //Seção 7 - Extra1
  it('seleciona um arquivo simulando um drag-and-drop', function (){
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  //Seção 7 - Extra2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
       expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  //Seção 8
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function (){
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  //Seção 8 - Extra1
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function (){
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click ()
    cy.contains('CAC TAT - Política de privacidade')
      .should('be.visible')
  })

  //Seção9
  

})
  

