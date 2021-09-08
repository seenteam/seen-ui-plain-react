import { useQuery } from "@apollo/client";
import React, { useContext } from 'react'
import FollowerDetails from './FollowerDetails/FollowerDetails'
import './Followers.css'
import * as gql from '../../queries/queries'
import UserContext from "../UserProfile/UserContext";

const Followers = () => {
  const value = useContext(UserContext)
  const GetFollowingInfo = useQuery(gql.GET_FOLLOWING_INFO(value))
  const GetFluxFollowing = useQuery(gql.GET_USER_FLUX_FOLLOWING(value))
  const GetFluxFollowers = useQuery(gql.GET_USER_FLUX_FOLLOWERS(value))
  const { data } = useQuery(gql.GET_USER_INFO(value))

  const renderFollowers = () => {
    if (data) return data.user.followers.map((follower, index) => {
      return <div key={index}>
        <FollowerDetails id={follower.friendId} />
      </div>
    })
  }

  const renderFollowing = () => {
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
    return GetFluxFollowing.data.userFluxFollowing.map((follower, index) => {
      return <div key={index}>
        <FollowerDetails id={follower.id} />
      </div>
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
