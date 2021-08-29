import {
    gql
  } from "@apollo/client";

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
 
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


// 
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

export const GET_ALL_USERS = gql`
query {
  users {
    firstName
    lastName
  }
}
`

//Add more queries below!