describe("User Post Spec", () => {

    beforeEach(() => {
        //1
       
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
        cy.get('.new-post > button > .svg-inline--fa > path').click()
        cy.contains("Make a new Post").should('have.text', 'Make a new Post')

    })

    it("Should be able to close the post modal",  () => { 

        cy.get('.new-post > button > .svg-inline--fa > path').click()
        cy.contains("Make a new Post").should('have.text', 'Make a new Post')
        cy.get('.yellow > button > .svg-inline--fa > path').click()
        cy.contains("Viral Users").should('have.text', 'Viral Users')
    })


    it("Should be able to type up to 70 chars",  () => { 
        cy.get('.new-post > button > .svg-inline--fa > path').click()
        cy.contains("Make a new Post").should('have.text', 'Make a new Post')

        cy.contains("70").should('have.text', 'chars left: 70/70')
        cy.get('textarea').type('VNM5ZkJsmyEYm5yyeva68oAbwmLY58fDpBA96xgYlDN0hnB3qV6N9dmvB08Rnf7rn3KT5r')
        cy.get('.char-counter').should('have.text', 'chars left: 0/70')
    })

    it('Should be able to see the submit button', () => {

        cy.get('.new-post > button > .svg-inline--fa > path').click()
        cy.contains("Make a new Post").should('have.text', 'Make a new Post')

        cy.contains("70").should('have.text', 'chars left: 70/70')
        cy.get('textarea').type('VNM5ZkJsmyEYm5yyeva68oAbwmLY58fDpBA96xgYlDN0hnB3qV6N9dmvB08Rnf7rn3KT5r')
        cy.get('.char-counter').should('have.text', 'chars left: 0/70')

        cy.get('.submit-btn').should('be.visible')
    })

    it("Should be able create a post",  () => { 

    })

})