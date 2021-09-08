/// <reference types="Cypress" />

describe("Edit User Profile Page Spec", () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', {
            statusCode: 200,
            fixture: 'userProfile.json'
        }).as('request') 
        cy.visit('http://localhost:3000/profile/edit');
        cy.wait('@request');
    })

    it('Should contain the string "Aplus"',  () => {
        cy.contains('Aplus')
    })

})

