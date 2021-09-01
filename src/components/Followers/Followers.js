import { Link } from 'react-router-dom'
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import FollowerDetails from '../FollowerDetails/FollowerDetails'

import * as gql from '../../queries/queries'

const Followers = ({id}) => {

  const { loading, error, data } = useQuery(gql.GET_USER_INFO(id))
  const [createFollower] = useMutation(gql.CREATE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_USER_INFO(id) }],
  });

  const [user, setUser] = useState('')

  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted && data) setUser({followers: data.usersFollowers, id})
  //   return () => mounted = false;
  // }, [])

  const check = () => {
    if (data) console.log(data)
  }

  const renderFollowers = () => {
    if (data) return data.user.followers.map(follower => {
      return <div>
        <FollowerDetails id={follower.friendId} />
      </div>
    })
  }

  const addFriend = (e) => {
    // let idToAdd = 4
    // if (idToAdd === id) return e.target.innerText = 'Cant add yourself!'
    e.target.setAttribute('disabled', true)
    check()
    createFollower({
      variables: {
        'userId': id,
        'friendId': 1
      },
    })
  }

  return (
    <div>
    <h2>Fixed Followers</h2>
      <p>Current user: ID{id}</p>
      {!!data && renderFollowers()}
      {<button onClick={e => addFriend(e)}>Add friend 4</button>}
    </div>
  )
}

export default Followers