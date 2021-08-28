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

//Add more queries below!