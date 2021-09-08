/// <reference types="Cypress" />
import { aliasQuery, aliasMutation } from '../../src/utilities/graphql-test-utils';

describe("Edit User Profile Page Spec", () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            aliasQuery(req, req.body.operationName)
            req.reply({ fixture: 'userProfile.json'});
          })
        cy.visit('http://localhost:3000/profile/edit');
        cy.wait('@gqlGetUserInfoQuery');
    })

    it("Should contain the test user Aplus AceAttorney's info ",  () => {
        cy.contains('testy').should('be.visible')
        cy.contains('Aplus').should('be.visible')
        cy.contains('AceAttorney').should('be.visible')
        cy.contains('japaneseLaw').should('be.visible')
        cy.contains('888-888-8888').should('be.visible')
        cy.contains('12-22-1988').should('be.visible')
    })

    it('Should allow the user to type in the form!', () => {

    })

    it('Should not allow the user to submit a form with incomplete fields in the form!', () => {
        
    })
})

