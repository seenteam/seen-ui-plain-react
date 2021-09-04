import { useQuery, useMutation } from "@apollo/client";
import React, {useContext} from 'react'
import FollowerDetails from './FollowerDetails/FollowerDetails'
import './Followers.css'

import * as gql from '../../queries/queries'
import UserContext from "../UserProfile/UserContext";

const Followers = () => {
  const value = useContext(UserContext)

  const { loading, error, data } = useQuery(gql.GET_USER_INFO(value))
  const [createFollower] = useMutation(gql.CREATE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_USER_INFO(value) }],
  });

  const check = () => {
    if (data) console.log(data)
  }

  const renderFollowers = () => {
    if (data) return data.user.followers.map((follower, index) => {
      return <div key={index}>
        <FollowerDetails id={follower.friendId} />
      </div>
    })
  }

  const addFriend = (e) => {
    let idToAdd = 1
    if (idToAdd === value || data.user.followers.find(follower => follower.friendId === idToAdd)) return e.target.innerText = 'Cant add!'
    e.target.setAttribute('disabled', true)
    check()
    createFollower({
      variables: {
        'userId': value,
        'friendId': idToAdd
      },
    })
  }

  return (
    <div>
    <h2>Fixed Followers</h2>
      <p>Current user: ID{value}</p>
      {!!data && renderFollowers()}
      {<button onClick={e => addFriend(e)}>Add friend 1 (first last)</button>}
    </div>
  )
}

export default Followers