/// <reference types="Cypress" />
import { aliasQuery, aliasMutation } from '../../src/utilities/graphql-test-utils';

describe("Edit User Profile Page Spec", () => {

    beforeEach(() => {
        // cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
        //     aliasQuery(req, req.body.operationName)
        //     req.reply({ fixture: 'userProfile.json'});
        //   })
        // cy.visit('http://localhost:3000/profile/edit');
        // cy.wait('@gqlGetUserInfoQuery');
    })

    it("Should contain the test user Aplus AceAttorney's info ",  () => {

        ///
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            aliasQuery(req, req.body.operationName)
            req.reply({ fixture: 'userProfile.json'});
          })
        cy.visit('http://localhost:3000/profile/edit');
        cy.wait('@gqlGetUserInfoQuery');
        ////

        cy.contains('testy').should('be.visible')
        cy.contains('Aplus').should('be.visible')
        cy.contains('AceAttorney').should('be.visible')
        cy.contains('japaneseLaw').should('be.visible')
        cy.contains('888-888-8888').should('be.visible')
        cy.contains('12-22-1988').should('be.visible')
    })
    
    it('Should not allow the user to submit a form with incomplete fields in the form!', () => {

        ////
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            aliasQuery(req, req.body.operationName)
            req.reply({ fixture: 'userProfile.json'});
          })
        cy.visit('http://localhost:3000/profile/edit');
        cy.wait('@gqlGetUserInfoQuery');
        //////

        cy.get('input:invalid').should('have.length', 6)

        cy.get('#userName').type('testy3')
        cy.get('input:invalid').should('have.length', 5)

        cy.get('#firstName').type('Aplus3')
        cy.get('input:invalid').should('have.length', 4)

        cy.get('#lastName').type('AceAttorney3')
        cy.get('input:invalid').should('have.length', 3)

        cy.get('input:valid').should('have.length', 4)

        cy.get('[type="submit"]').click()
        
    })

    it('Should allow the user to type in the form!', () => {
        ////
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            aliasQuery(req, req.body.operationName)
            req.reply({ fixture: 'userProfile.json'});
          })
        cy.visit('http://localhost:3000/profile/edit');
        cy.wait('@gqlGetUserInfoQuery');

        ///

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            aliasMutation(req, req.body.operationName)
            req.reply({ fixture: 'userProfileUpdate.json'});
          })
        
        cy.get('#userName').type('wallE').should('contain.value', 'wallE')
        cy.get('#firstName').type('Domo').should('contain.value', 'Domo')
        cy.get('#lastName').type('Arigatou').should('contain.value', 'Arigatou')
        cy.get('#phoneNumber').type('000-000-0000').should('contain.value', '000-000-0000')
        cy.get('#email').type('co@co.com').should('contain.value', 'co@co.com')
        cy.get('#birthday').type('2001-01-01').should('contain.value', '2001-01-01');

        cy.get('[type="submit"]').click()
        cy.wait('@gqlupdateUserMutation');
    })

    it.only('Should allow the user to return to the user-profile when the return to profile button is clicked!', () => {
        
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GetUserInfo') {
            req.alias = 'userQuery';
            req.reply({
              body: {
                data: {
                  user: {
                    id: 2,
                    firstName: "Aplus",
                    lastName: "Attorney",
                    userName: "user1",
                    __typename: "User",
                    followers: [],
                    posts: [
                      {
                        id: 1,
                        content: "First post!",
                        createdAt: "2021-09-05T21:54:58Z"
                      }
                    ],
                  }
                }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });
    
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            if (req.body.operationName === 'getUserInfo') {
                req.alias = 'followerInfo';
                req.reply({
                  body: {
                    "data":{"usersFollowers":[]}
            },
            headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });
    
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            if (req.body.operationName === 'getUserInfo') {
                req.alias = 'fluxFollowerInfo';
                req.reply({
                  body: {
                    "data":{"usersFluxFollowers":[]}
            } , headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });

        cy.visit('http://localhost:3000/profile/edit');
        cy.get('a > button').click();
    })

})

