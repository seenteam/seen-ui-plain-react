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
                        content: 'User post 3',
                        createdAt: "2021-09-02T21:54:58Z"
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

        cy.visit('http://localhost:3000/');


      });

    it('User should see Seen header upon visiting', () => {
      cy.contains('Seen')
    })


    it('User should see posts from other users they are following', () => {
      cy.get('.post-container').contains('Time for sleep')
    })

    it('User should be able to like post - when clicked, button should be disabled', () => {

      cy.intercept('POST', 'https://intense-ocean-61260.herokuapp.com/graphql', req => {
        if (req.body.operationName === 'createLike') {
          req.alias = 'deleteLike';
          req.reply({
            body: {
              data: {
                like: {
                  id: 3
                },
                user: {
                  id: 1
                },
                post: {
                  id: 20,
                  content: "This is a test post"
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
        if (req.body.operationName === 'deleteLike') {
          req.alias = 'deleteLike';
          req.reply({
            body: {
              data: {
                message: "Like deleted!"
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
      cy.get('.post-container').get('.likes-container').get('section').get('section').get('button').first().click()
      cy.get('.post-container').get('.likes-container').get('section').get('section').get('button').first().should('have.attr', 'disabled')
    })


        it('User should have their name displayed when visiting', () => {
          cy.contains("Ace Attorney's Feed")
        })

})
