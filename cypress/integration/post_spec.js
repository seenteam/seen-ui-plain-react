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

    ///////////////////////////////////////////******\\\\\\\\\\

    it.skip("Should be able create a post",  () => {

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GetUserName') {
            req.alias = 'userQuery';
            req.reply({
              body: {
                data: {
                  user: {
                    id: '1',
                    userName: 'user1',
                    firstName: 'Ace',
                    lastName: 'Attorney'
                  }
                }
              },
              headers: {
                'access-control-allow-origin': '*',
              }
            })
          }
        });

        // Posts from Following
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GetPostsFromFollowing') {
            req.alias = 'allPostsQuery';
            req.reply({
              body: {
                data: {
                  getPostFromFixedFollowing: [],
                  getPostFromFluxFollowing: [
                    {
                      "userId": 2,
                      "createdAt": "2021-09-05T21:54:58Z",
                      "id": 20,
                      "likeCount": 1,
                      "content": "This is a test post",
                      "user": {
                        "firstName": "Ultra",
                        "lastName": "Nerd",
                        "userName": "i_love_Cypress"
                      }
                    },
                    {
                      "userId": 3,
                      "createdAt": "2021-09-05T21:54:58Z",
                      "id": 21,
                      "likeCount": 1,
                      "content": "Don't leave testing for last",
                      "user": {
                        "firstName": "Acai",
                        "lastName": "Blueberry",
                        "userName": "user2"
                      }
                    },
                    {
                      "userId": 4,
                      "createdAt": "2021-09-06T21:54:58Z",
                      "id": 22,
                      "likeCount": 31,
                      "content": "Time for sleep",
                      "user": {
                        "firstName": "Reginald",
                        "lastName": "Mayers",
                        "userName": "vitaminwater"
                      }
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

        // User Info
        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'getUserInfo') {
            req.alias = 'userQuery';
            req.reply({
              body: {
                data: {
                  user: {
                    id: 1,
                    firstName: "Ace",
                    lastName: "Attorney",
                    userName: "user1",
                    __typename: "User",
                    followers: [],
                    posts: [
                      {
                        id: 1,
                        content: "First post!",
                        createdAt: "2021-09-05T21:54:58Z"
                      },
                      {
                        id: 2,
                        content: "Next post!",
                        createdAt: "2021-09-05T21:54:58Z"
                      },
                      {
                        id: 3,
                        content: "Next post!",
                        createdAt: "2021-09-05T21:54:58Z"
                      },
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

        cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
          if (req.body.operationName === 'GET_USER_POSTS') {
            req.alias = 'userPosts';
            req.reply({
              body: {
                data: {
                  user: {
                    posts: [
                      {
                        id: 17,
                        content: 'User post 1',
                        createdAt: "2021-09-03T21:54:58Z"
                      },
                      {
                        id: 18,
                        content: 'User post 2',
                        createdAt: "2021-09-04T21:54:58Z"
                      },
                      {
                        id: 19,
                        content: 'VNM5ZkJsmyEYm5yyeva68oAbwmLY58fDpBA96xgYlDN0hnB3qV6N9dmvB08Rnf7rn3KT5r',
                        createdAt: "2021-09-07T21:54:58Z"
                      },
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
          if (req.body.operationName === 'postLikes') {
            req.alias = 'userQuery';
            req.reply({
              body: {
                data: {
                  postLikes: [
                    {
                      id: 1,
                      userName: 'user1',
                      firstName: 'Aplus',
                      lastName: 'Attorney'
                    },
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
        if (req.body.operationName === 'postLikes') {
          req.alias = 'userQuery';
          req.reply({
            body: {
              data: {
                postLikes: []
              }
            },
            headers: {
              'access-control-allow-origin': '*',
            }
          })
        }
      });
        
        

        cy.visit('http://localhost:3000/');

        cy.get('.new-post > button > .svg-inline--fa > path').click()
        cy.contains("Make a new Post").should('have.text', 'Make a new Post')

        cy.contains("70").should('have.text', 'chars left: 70/70')
        cy.get('textarea').type('VNM5ZkJsmyEYm5yyeva68oAbwmLY58fDpBA96xgYlDN0hnB3qV6N9dmvB08Rnf7rn3KT5r')
        cy.get('.char-counter').should('have.text', 'chars left: 0/70')

        cy.get('.submit-btn').should('be.visible')

        cy.contains('Seen')
      


})
})