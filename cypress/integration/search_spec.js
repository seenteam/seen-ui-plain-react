describe("User Feed", () => {

    beforeEach(() => {
        // cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
        //     req.reply({ fixture: 'postsFromFollowing.json'});
        // }).as('boogie')


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
                data: {
                  "data":
                    {"users":[
                      {"id":"2","userName":"searchedUser","firstName":"Person","lastName":"Testerson","__typename":"User"},
                    ]
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
          if (req.body.operationName === 'GetTopFlux') {
            req.alias = 'topFlux';
            req.reply({
              body: {
                data: {
                  "data":{
                    "topFlux":[
                      {
                        "userId":5,
                        "user":{
                          "firstName":"Mia",
                          "lastName":"Maggio",
                          "__typename":"User"
                        },
                        "count":80,
                        "__typename":
                        "FluxFollower"
                      },
                      {"userId":6,
                        "user":{
                          "firstName":"Keenan",
                          "lastName":"Prosacco",
                          "__typename":"User"
                        },
                        "count":60,
                        "__typename":"FluxFollower"
                      },
                      {"userId":4,
                        "user":{
                          "firstName":"Rozanne"
                          ,"lastName":"Grant",
                          "__typename":"User"
                          },
                          "count":40,
                          "__typename":"FluxFollower"
                          },
                          {"userId":5,
                            "user":{
                              "firstName":"Shirley",
                              "lastName":"O'Conner",
                              "__typename":"User"
                            },
                          "count":20,
                          "__typename":"FluxFollower"
                          }
                        ]
                    }
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



})
