// https://docs.cypress.io/api/introduction/api.html
Cypress.Commands.add('uploadFile', (fileName, selector) =>
  cy.get(selector).then(subject =>
    cy
      .fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then((blob) => {
        const el = subject[0];
        const testFile = new File([blob], fileName, {
          type: 'application/x-yaml;charset=utf-8',
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        return subject;
      })));

describe('Test Edimus', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
  });
  it('Filters blocks in side panel', () => {
    cy.get('.sideboard-block').should('have.length', 22);
    cy.get('#sideboard-block-search-input')
      .type('hbase')
      .should('have.value', 'hbase');
    cy.get('.sideboard-block').should('have.length', 6);
  });
  it('YAML Viewer is disabled', () => {
    cy.contains('view yaml').should('be.disabled');
  });
  it('Import mega workflow YAML', () => {
    cy.contains('import yaml file')
      .should('be.visible')
      .click();
    cy.uploadFile('workflows/mega-workflow.yml', '#yaml-file-input');
    cy.get('.mainboard-block').should('have.length', 135);
    cy.get('#container')
      .children()
      .should('have.length', 651);
  });
  it('YAML Viewer is available', () => {
    cy.contains('view yaml')
      .should('be.visible')
      .click();
    cy.get('#yaml-text').should('be.visible');
    cy.contains('hide yaml')
      .should('be.visible')
      .click();
    cy.get('#yaml-text').should('not.be.visible');
  });
  it('Clear workflow', () => {
    cy.contains('clear workflow')
      .should('be.visible')
      .click();
    cy.get('.mainboard-block').should('have.length', 0);
    cy.get('#container')
      .children()
      .should('have.length', 0);
  });
});
