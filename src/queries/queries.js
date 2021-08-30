import {
    gql
  } from "@apollo/client";

// export const EXCHANGE_RATES = gql`
//   query GetExchangeRates {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `;
 

//Probably not going to work, first attempt at queries
export const GET_USER_INFO = (id) => gql`
query GetUserInfo {
  userId(id: ${id}) {
    name
    posts
    fixedFollowers
    fluxFollowers
  }
}
`;


//Probably not going to work, first attempt at queries
export const GET_POSTS_FROM_FRIENDS = (id) => gql`
query GetPostsFromFriends {
  userId(id: ${id}) {
    fixedFollowers {
      posts (limit: 10) {
        content
     }
    }
    fluxFollowers {
      posts (limit: 10) {
        content
     }
    }
  }
}
`;


//TESTed this query it works!
export const GET_ALL_USERS = gql`
query {
  users {
    firstName
    lastName
  }
}
`
//Tested this query it also works!
export const GET_ALL_USER_INFO = gql`
query {
	users {
    id
    userName
    firstName
    lastName 
    email
    phoneNumber
    birthday
    posts{
      content
			}
  }
}
`

// Start mutation queries here

export const CREATE_NEW_USER = gql`
mutation {
  createUser(input: {
    userName: "reginacasias",
    firstName: "Regina",
    lastName: "Casias",
    phoneNumber: "123-123-1234",
    email: "reg@e.com",
    birthday: "2013-07-16"
  }) {
    user {
      id
    }
  }
}
`