import React, {useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import FollowersList from './FollowersList/FollowersList'
import FluxFollowersList from './FluxFollowersList/FluxFollowersList'
import Post from '../Post/Post.js'
import UserContext from "../UserProfile/UserContext";
import Loading from '../Loading/Loading.js'
import * as gql from '../../queries/queries'

import './UserProfile.css'

const UserProfile = ({user}) => {
  const value = useContext(UserContext)
  const GetFollowingInfo = useQuery(gql.GET_FOLLOWER_INFO(user));

  const GetFluxFollowing = useQuery(gql.GET_USER_FLUX_FOLLOWING(user));
  //ALSO ADD FLUX FOLLOWERS for value
  const GetFluxFollowers = useQuery(gql.GET_USER_FLUX_FOLLOWERS(user))
  const GetVisitedUserInfo = useQuery(gql.GET_USER_INFO(user));
  const [clicked, setClicked] = useState(false)
  const [profile, setProfile] = useState('')
  const [followersVisible, setFollowersVisible] = useState(false)
  const [fluxFollowersVisible, setFluxFollowersVisible] = useState(false)

  const [followUser] = useMutation(gql.CREATE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_FOLLOWING_INFO(value) }, { query: gql.GET_FOLLOWER_INFO(user) }, { query: gql.GET_USER_INFO(user) }],
  });

  const [unFollowUser] = useMutation(gql.DELETE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_FOLLOWING_INFO(value) }, { query: gql.GET_FOLLOWER_INFO(user) }, { query: gql.GET_USER_INFO(user) }, { query: gql.GET_USER_INFO(value) }],
  });


  useEffect(() => {
    setClicked(false)
  }, [GetVisitedUserInfo.data])

  if (GetFollowingInfo.loading) {
    return <Loading loading={GetFollowingInfo.loading} />
  }
  else {
    console.log('Current user following data', GetFollowingInfo.data)
  }

  if (GetVisitedUserInfo.loading) {
    return <Loading loading={GetFollowingInfo.loading} />
  }
  else {
    console.log('Current user following data', GetFollowingInfo.data)
  }

  if (GetFluxFollowing.loading) {
    return <Loading loading={GetFluxFollowing.loading} />
  }
  else {
    console.log('CURRENT USER FLUX -->>>> following data', GetFluxFollowing.data)
  }

  if (GetFluxFollowers.loading) {
    return <Loading loading={GetFluxFollowers.loading} />
  }
  else {
    console.log('CURRENT USER FLUX FOLLOWERS ****', GetFluxFollowers.data)
  }
  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted && GetVisitedUserInfo.data) check()
  //   return () => mounted = false;
  // })

  const check = () => {
    console.log(GetVisitedUserInfo.data)
  }

  const renderPosts = (posts) => {
    return (
      <section className="user-posts-container">
        <div className="posts-grid">
          {posts.map(post => <Post id={post.id} content={post.content} created={post.createdAt} currentUser={user} />)}
        </div>
      </section>
    )
  }

  const renderFollowers = (followers) => {
    return (
      <section>
        <div>
          {!!followersVisible && <div>
            <button onClick={() => setFollowersVisible(false)}>Close</button>
            <FollowersList followers={followers} visible={followersVisible} setVisible={setFollowersVisible} />
          </div>}
        </div>
      </section>
    )
  }

  const renderFluxFollowers = (followers) => {
    return (
      <section>
        <div>
          {!!fluxFollowersVisible && <div>
            <button onClick={() => setFluxFollowersVisible(false)}>Close</button>
            <FollowersList followers={followers} visible={fluxFollowersVisible} setVisible={setFluxFollowersVisible} type="flux" />
          </div>}
        </div>
      </section>
    )
  }

  const revealFollowers = () => {
    setFollowersVisible(true)
  }

  const revealFluxFollowers = () => {
    setFluxFollowersVisible(true)
  }

  const toggleList = () => {
    (!followersVisible) ? setFollowersVisible(true) : setFollowersVisible(false)
  }

  const toggleFluxList = () => {
    (!fluxFollowersVisible) ? setFluxFollowersVisible(true) : setFluxFollowersVisible(false)
  }

  const renderTest = () => {
    return (
      <div>{!!GetVisitedUserInfo.data && !!GetFollowingInfo.data && renderProfile()}</div>
    )
  }

  const checkFollowing = () => {
    console.log('Users following the visited profile', GetFollowingInfo.data.usersFollowers)
    // console.log('Current user id', GetFollowingInfo.data.usersFollowers)
    let found = GetFollowingInfo.data.usersFollowers.find(user => user.id === value.toString())
    console.log('Results', found)
    if (found) {
      return true
    }
    return false
  }

  const renderFollowBtn = () => {
    return <button disabled={clicked} onClick={follow}>Follow</button>
  }

  const renderUnfollowBtn = () => {
    return <button disabled={clicked} onClick={unfollow}>Unfollow</button>
  }

  const follow = () => {
    setClicked(true)
    // console.log('variables', {
    //   'userId': value,
    //   'friendId': GetVisitedUserInfo.data.user.id
    // })
    followUser({
      variables: {
        'userId': GetVisitedUserInfo.data.user.id,
        'friendId': value
      },
    })
  }

  const unfollow = () => {
    setClicked(true)
    unFollowUser({
      variables: {
        'userId': GetVisitedUserInfo.data.user.id,
        'followerId': value
      },
    })
  }

  const renderProfile = () => {
    return <div>
      <section className="profile-header">
        <div>
        <h2>{GetVisitedUserInfo.data.user.firstName} {GetVisitedUserInfo.data.user.lastName}</h2>
        <h3>Username: {GetVisitedUserInfo.data.user.userName}</h3>
        {!checkFollowing() ? renderFollowBtn() : renderUnfollowBtn()}
        </div>
        <div className="followers-info">
          <h4 onClick={toggleList}>{`${GetVisitedUserInfo.data.user.followers.length} Followers (click)`}</h4>
          {renderFollowers(GetVisitedUserInfo.data.user.followers)}
        </div>
        <div className="flux-followers-info">
          <h4 onClick={toggleFluxList}>{`${GetFluxFollowers.data.usersFluxFollowers.length} Flux Followers (click)`}</h4>
          {renderFluxFollowers(GetFluxFollowers.data.usersFluxFollowers)}
        </div>
      </section>
      <div className="user-profile-navigation">
        <button>Posts</button>
        <button>About</button>
      </div>
      {renderPosts(GetVisitedUserInfo.data.user.posts)}
    </div>
  }

  return (
    <section>
      {renderTest()}
    </section>
  )

}

export default UserProfile
