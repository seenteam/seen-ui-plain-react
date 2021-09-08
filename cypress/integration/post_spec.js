describe("User Post Spec", () => {

    beforeEach(() => {
        //1
        /*
            req.reply({
                  body: {
                    "data":{"usersFluxFollowers":[]}
            } , headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        */

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            req.reply({ body: {"data": {
                "users": [
                  {
                    "id": "1",
                    "userName": "Bill Ding",
                    "firstName": "Janella",
                    "lastName": "King",
                    "__typename": "User"
                  }]}}});
          }).as('userInfo')
          
          //2
          cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', (req) => {
            req.reply({ body: {
                "data": {
                  "topFlux": [
                    {
                      "userId": 15,
                      "user": {
                        "firstName": "Mia",
                        "lastName": "Maggio",
                        "__typename": "User"
                      },
                      "count": 80,
                      "__typename": "FluxFollower"
                    },
                    {
                      "userId": 31,
                      "user": {
                        "firstName": "Keenan",
                        "lastName": "Prosacco",
                        "__typename": "User"
                      },
                      "count": 60,
                      "__typename": "FluxFollower"
                    },
                    {
                      "userId": 85,
                      "user": {
                        "firstName": "Rozanne",
                        "lastName": "Grant",
                        "__typename": "User"
                      },
                      "count": 40,
                      "__typename": "FluxFollower"
                    },
                    {
                      "userId": 42,
                      "user": {
                        "firstName": "Shirley",
                        "lastName": "O'Conner",
                        "__typename": "User"
                      },
                      "count": 20,
                      "__typename": "FluxFollower"
                    }
                  ]
                }
              }});
          }).as('topFlux')

            cy.visit('http://localhost:3000/search-page');
    })

    
    it("Should be able to open the post modal",  () => { 

    })

    it("Should be able to close the post modal",  () => { 

    })


    it("Should be able to type up to 70 chars",  () => { 

    })

    it('Should be able to see the submit button', () => {

    })

    it("Should be able create a post",  () => { 

    })

})