import { useQuery, useMutation } from "@apollo/client";
import React, {useContext, useState, useEffect} from 'react'
import FollowerDetails from './FollowerDetails/FollowerDetails'
import './Followers.css'

import * as gql from '../../queries/queries'
import UserContext from "../UserProfile/UserContext";

const Followers = () => {


  const value = useContext(UserContext)
  const GetFollowingInfo = useQuery(gql.GET_FOLLOWING_INFO(value))
  const GetFluxFollowing = useQuery(gql.GET_USER_FLUX_FOLLOWING(value))
  const GetFluxFollowers = useQuery(gql.GET_USER_FLUX_FOLLOWERS(value))
  const { loading, error, data } = useQuery(gql.GET_USER_INFO(value))
  const [createFollower] = useMutation(gql.CREATE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_USER_INFO(value) }, { query: gql.GET_FOLLOWING_INFO(value) }],
  });

  const [userData, setUserData] = useState({})

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (GetFollowingInfo.data && data) {
        setUserData({
          userData: data,
          following: GetFollowingInfo.data
        })
      }
    }
    return () => mounted = false;
  }, [])

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

  const renderFollowing = () => {
    // console.log(GetFollowingInfo.data.usersFollowers)
    return GetFollowingInfo.data.userFollowing.map((follower, index) => {
      return <div key={index}>
        <FollowerDetails id={follower.id} />
      </div>
    })
  }

  const renderFluxFollowers = () => {
    if (GetFluxFollowers.data) return GetFluxFollowers.data.usersFluxFollowers.map((follower, index) => {
      return <div key={index}>
        <FollowerDetails id={follower.friendId} />
      </div>
    })
  }

  const renderFluxFollowing = () => {
    // console.log(GetFollowingInfo.data.usersFollowers)
    return GetFluxFollowing.data.userFluxFollowing.map((follower, index) => {
      return <div key={index}>
        <FollowerDetails id={follower.id} />
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
    <section className="followers-containers">
      <div>
        <h2>Fixed</h2>
        <h3>Followers</h3>
        {!!data && renderFollowers()}
        <h3>Following</h3>
        {!!GetFollowingInfo.data && renderFollowing()}
      </div>
      <div>
        <h2>Flux</h2>
        <h3>Followers</h3>
        {!!GetFluxFollowers.data && renderFluxFollowers()}
        <h3>Following</h3>
        {!!GetFluxFollowing.data && renderFluxFollowing()}
      </div>
    </section>
  )
}

export default Followers
