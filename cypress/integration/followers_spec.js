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
          if (req.body.operationName === 'userFluxFollowing') {
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
          if (req.body.operationName === 'usersFluxFollowers') {
            req.alias = 'allUsers';
            req.reply({
              body: {
                  "data":
                    {"usersFollowers":[]
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

    
})
