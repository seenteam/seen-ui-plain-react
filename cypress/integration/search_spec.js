describe("Search Page", () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GetUserName') {
            req.alias = 'userQuery';
            req.reply({
              body: {
                data: {
                  user: {
                    id: '2',
                    userName: 'searchedUser',
                    firstName: 'Person',
                    lastName: 'Testerson'
                  }
                }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GetAllUsers') {
            req.alias = 'allUsers';
            req.reply({
              body: {
                  "data":
                    {"users":[
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
          if (req.body.operationName === 'GetTopFlux') {
            req.alias = 'topFlux';
            req.reply({
              body: {
                data: {
                    "topFlux": [
                      {
                        "userId":5,
                        "user":{
                          "firstName":"Viral",
                          "lastName":"One",
                          "__typename":"User"
                        },
                        "count":80,
                        "__typename":
                        "FluxFollower"
                      },
                      {"userId":6,
                        "user":{
                          "firstName":"Popular",
                          "lastName":"Two",
                          "__typename":"User"
                        },
                        "count":60,
                        "__typename":"FluxFollower"
                      },
                      {"userId":4,
                        "user":{
                          "firstName":"Known"
                          ,"lastName":"Three",
                          "__typename":"User"
                          },
                          "count":40,
                          "__typename":"FluxFollower"
                          },
                          {"userId":5,
                            "user":{
                              "firstName":"This",
                              "lastName":"Guy",
                              "__typename":"User"
                            },
                          "count":20,
                          "__typename":"FluxFollower"
                          }
                    ]
                }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });

        cy.visit('http://localhost:3000/search-page');
      });

    it('should have a searchbar present on page', () => {
      cy.get('input')
    })

    it('should be able to search user base for users', () => {
      cy.get('input').type('Person').should('have.value', 'Person')
      cy.get('.user-card').should('contain', 'Person Testerson')
    })

    it('should display top flux followers for the day', () => {
      cy.get('.top-flux-card').first().should('contain', 'Viral One')
      cy.get('.top-flux-card').first().should('contain', '80 Flux Followers')
    })
})
