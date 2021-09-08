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



    it('should have a searchbar present on page', () => {
      cy.get('input')
    })



})
