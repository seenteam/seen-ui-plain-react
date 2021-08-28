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
  user_id(id: ${id}) {
    name
    posts
    fixed_followers
    flux_followers
  }
}
`;


// 
export const GET_POSTS_FROM_FRIENDS = (id) => gql`
query GetPostsFromFriends {
  user_id(id: ${id}) {
    fixed_followers {
      posts (limit: 10) {
        content
     }
    }
    flux_followers {
      posts (limit: 10) {
        content
     }
    }
  }
}
`;


//Add more queries below!