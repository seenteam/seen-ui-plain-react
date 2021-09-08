describe("Followers Page", () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GetFollowerInfo') {
            req.alias = 'allUsers';
            req.reply({
              body: {
                  "data":
                    {"usersFollowers":[
                      {"id":"2","userName":"searchedUser","firstName":"Person","lastName":"Testerson","__typename":"User"},
                    ]
                  }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GetFollowingInfo') {
            req.alias = 'allUsers';
            req.reply({
              body: {
                  "data":
                    {"userFollowing":[
                      {"id":"2","userName":"searchedUser","firstName":"Person","lastName":"Testerson","__typename":"User"},
                    ]
                  }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });


        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'userFluxFollowing') {
            req.alias = 'allUsers';
            req.reply({
              body: {
                  "data":
                    {"userFluxFollowing":[
                      {"id":"2","userName":"searchedUser","firstName":"Person","lastName":"Testerson","__typename":"User"},
                    ]
                  }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'usersFluxFollowers') {
            req.alias = 'allUsers';
            req.reply({
              body: {
                  "data":
                    {"usersFluxFollowers":[]
                  }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });
        cy.visit('http://localhost:3000/followers');
      });

      it('should display tiers of followers, fixed and flux', () => {
        cy.contains('Fixed')
        cy.contains('Flux')
        cy.contains('Followers')
        cy.contains('Following')
      })

      it('User should have followers present in test', () => {
        cy.contains('Domo Arigatou')
      })

      it('User should be able to navigate to a user that follows them/they are following', () => {
        cy.get('.user-card').first().click()
        cy.url().should('eq', 'http://localhost:3000/users/2')
      })
})
