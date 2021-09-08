/// <reference types="Cypress" />
import { aliasQuery, aliasMutation } from '../../src/utilities/graphql-test-utils';

describe("Edit User Profile Page Spec", () => {

    beforeEach(() => {
        // cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', {
        //     statusCode: 200,
        //     fixture: 'userProfile.json'
        // }).as('request') 

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            aliasQuery(req, req.body.operationName)
            req.reply({ fixture: 'userProfile.json'});
          })
        cy.visit('http://localhost:3000/profile/edit');
        cy.wait('@gqlGetUserInfoQuery');
    })

    it('Should contain the string "Aplus"',  () => {
        cy.contains('Aplus')
    })

})

