import {
    gql
  } from "@apollo/client";


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
      createdAt
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
      createdAt
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
    id
    userName
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
mutation createUser($userName: String!, $firstName: String!, $lastName: String!, $phoneNumber: String!, $email: String!, $birthday: String!) {
  createUser(input: {
    userName: $userName,
    firstName: $firstName,
    lastName: $lastName,
    phoneNumber: $phoneNumber,
    email: $email,
    birthday: $birthday
  }) {
    user {
      id
    }
  }
}
`

export const UPDATE_USER = gql`
mutation updateUser($userId: ID!, $userName: String!, $firstName: String!, $lastName: String!, $phoneNumber: String!, $email: String!, $birthday: String!) {
  updateUser(input: {
    userId: $userId,
    userName: $userName,
    firstName: $firstName,
    lastName: $lastName,
    phoneNumber: $phoneNumber,
    email: $email,
    birthday: $birthday
  }) {
    user {
      id
      userName
      firstName
      lastName
      phoneNumber
      email
      birthday
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
    errors
    followerId
  }
}
`

export const DELETE_FOLLOWER = gql`
mutation deleteFollower($connectionId: ID!){
  deleteFollower(input: {connectionId: $connectionId}) {
    message
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






export const CREATE_LIKE = gql`
mutation createLike($userId: ID!, $postId: ID!){
  createLikeinput: {
    userId: $userId
    postId: $postId
  }) {
    like {
      id
    }
    user {
      id
    }
    post {
      id
      content
    }
  }
}
`


export const DELETE_LIKE = gql`
mutation deleteLike($likeId: ID!){
  deleteLiket(input: {likeId: $likeId}) {
    message
  }
}
`
