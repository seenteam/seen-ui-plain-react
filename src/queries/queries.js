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
  user(id: ${id}) {
    id
    userName
    firstName
    lastName
    email
    phoneNumber
    birthday
    posts{
      id
      content
    }
    followers{
      friendId
    }
  }
}
`;

export const GET_USER_NAME = (id) => gql`
query GetUserInfo {
  user(id: ${id}) {
    userName
    firstName
    lastName
  }
}
`;

// Get Followers
export const GET_FOLLOWER_INFO = (id) => gql`
query GetFollowerInfo {
  usersFollowers(id: ${id}) {
    id
    userName
    firstName
    lastName
	}
}
`;

// Get Following
export const GET_FOLLOWING_INFO = (id) => gql`
query GetFollowingInfo {
  following(id: ${id}) {
    id
    userName
    firstName
    lastName
	}
}
`;


export const GET_USER_POSTS = (id) => gql`
query GET_USER_POSTS {
  user(id:${id}) {
    posts {
      id
      content
    }
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

export const CREATE_FOLLOWER = gql`
mutation createFollower($userId: ID!, $friendId: ID!){
  createFollower(input: {
    userId: $userId
    friendId: $friendId
  }) {
    follower {
      id
      createdAt
    }
    userInfo {
      id
      userName
    }
  }
}
`

export const CREATE_POST = gql`
mutation createPost($content: String!, $userId: ID!){
  createPost(input: {
    content: $content
    userId: $userId
  }) {
    post {
      content
      id
    }
    user {
      posts {
        content
      }
		}
  }
}
`

export const DELETE_POST = gql`
mutation deletePost($postId: ID!){
  deletePost(input: {postId: $postId}) {
    message
    user {
      id
      userName
      firstName
      lastName
      email
      phoneNumber
      birthday
		}
  }
}
`
