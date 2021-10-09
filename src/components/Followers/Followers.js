import { useQuery } from "@apollo/client";
import React, { useState, useContext } from 'react'
import FollowersModal from './FollowersModal/FollowersModal.js'
import Countdown from './Countdown/Countdown.js'
import './Followers.css'
import * as gql from '../../queries/queries'
import UserContext from "../UserProfile/UserContext";

const Followers = () => {
  const value = useContext(UserContext)
  const GetFollowingInfo = useQuery(gql.GET_FOLLOWING_INFO(value))
  const GetFluxFollowing = useQuery(gql.GET_USER_FLUX_FOLLOWING(value))
  const GetFluxFollowers = useQuery(gql.GET_USER_FLUX_FOLLOWERS(value))
  const { data } = useQuery(gql.GET_FOLLOWER_INFO(value))
  const [clicked, setClicked] = useState(false);
  const [users, setCurrentUsers] = useState([]);

  const toggleModal = (usersData) => {
    setClicked(clicked => !clicked)
    setCurrentUsers(usersData)
  }

  const handleBgClick = () => {
    if (clicked) setClicked(false)
  }

  const renderBetterFollowers = () => {
    return (
      <section className="new-followers-container" onClick={handleBgClick}>
        <div className="follow-box">
          <h2>Fixed</h2>
          <button onClick={() => toggleModal((!!data && data.usersFollowers))}><h3>{!!data && data.usersFollowers.length} Followers</h3></button>
          <button onClick={() => toggleModal((!!GetFollowingInfo.data && GetFollowingInfo.data.userFollowing))}><h3>{!!GetFollowingInfo.data && GetFollowingInfo.data.userFollowing.length} Following</h3></button>
        </div>
        <div className="spacer"></div>
        <div className="follow-box">
          <h2>Flux</h2>
          <button onClick={() => toggleModal((!!GetFluxFollowers.data && GetFluxFollowers.data.usersFluxFollowers))}><h3>{!!GetFluxFollowers.data && GetFluxFollowers.data.usersFluxFollowers.length} Followers</h3></button>
          <button onClick={() => toggleModal((!!GetFluxFollowing.data && GetFluxFollowing.data.userFluxFollowing))}><h3>{!!GetFluxFollowing.data && GetFluxFollowing.data.userFluxFollowing.length} Following</h3></button>
        </div>
      </section>
    )
  }

  const renderModal = () => {
    return <FollowersModal data={users} clicked={clicked} setClicked={setClicked} setUsers={setCurrentUsers} />
  }

  return (
    <section className="followers-containers">
      {renderBetterFollowers()}
      <Countdown />
      {!!clicked && !!users.length && renderModal()}
    </section>
  )
}

export default Followers
