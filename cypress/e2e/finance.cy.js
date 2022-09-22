context('Dev Finances', () => {

  beforeEach(() => {

    cy.visit('https://maratona-discover-devfinance.netlify.app/#')
    cy.get('#data-table tbody tr').should('have.length', 0)

  });

  it('Cadastrar entradas', () => {

    cy.get('#transactions .button').click()
    cy.get('#description').type('Salário')
    cy.get('#amount').type(500)
    cy.get('#date').type('2022-02-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 1)

  });

  it('Cadastrar saídas', () => {

    cy.get('#transactions .button').click()
    cy.get('#description').type('Mesada')
    cy.get('#amount').type(-500)
    cy.get('#date').type('2022-02-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 1)

  });

  it('Cadastrar entradas e saídas', () => {

    const descEntrada = 'Salário'
    const descSaida = 'Mesada'

    cy.get('#transactions .button').click()
    cy.get('#description').type(descEntrada)
    cy.get('#amount').type(500)
    cy.get('#date').type('2022-02-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#transactions .button').click()
    cy.get('#description').type(descSaida)
    cy.get('#amount').type(-500)
    cy.get('#date').type('2022-02-05')
    cy.get('button').contains('Salvar').click()

    cy.get('#data-table tbody tr').should('have.length', 2)

    cy.get('td.data-table__description')
      .contains(descEntrada)
      .parent()
      .find('img[onclick*=remove]')
      .click()

      cy.get('td.data-table__description')
      .contains(descSaida)
      .parent()
      .find('img[onclick*=remove]')
      .click()

    cy.get('#data-table tbody tr').should('have.length', 0)

  });

});
