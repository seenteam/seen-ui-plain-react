import React, {useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import FollowersList from './FollowersList/FollowersList'
import Post from '../Post/Post.js'
import UserContext from "../UserProfile/UserContext";
import Loading from '../Loading/Loading.js'
import * as gql from '../../queries/queries'
import './UserProfile.css'

const UserProfile = ({user}) => {
  const value = useContext(UserContext)
  const GetFollowingInfo = useQuery(gql.GET_FOLLOWING_INFO(value));
  const GetUserInfo = useQuery(gql.GET_USER_INFO(user));
  const [profile, setProfile] = useState('')
  const [followersVisible, setFollowersVisible] = useState(false)

  const [followerUser] = useMutation(gql.CREATE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_FOLLOWING_INFO(value) }, { query: gql.GET_USER_INFO(user) }],
  });

  const [unFollowUser] = useMutation(gql.DELETE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_FOLLOWING_INFO(value) }, { query: gql.GET_USER_INFO(user) }],
  });

  if (GetFollowingInfo.loading) {
    return <Loading loading={GetFollowingInfo.loading} />
  }
  else {
    console.log('Current user following data', GetFollowingInfo.data)
  }

  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted && GetUserInfo.data) check()
  //   return () => mounted = false;
  // })

  const check = () => {
    console.log(GetUserInfo.data)
  }

  const renderPosts = (posts) => {
    return (
      <section className="user-posts-container">
        <div className="posts-grid">
          {posts.map(post => <Post content={post.content} created={post.createdAt} />)}
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

  const revealFollowers = () => {
    setFollowersVisible(true)
  }

  const toggleList = () => {
    (!followersVisible) ? setFollowersVisible(true) : setFollowersVisible(false)
  }

  const renderTest = () => {
    return (
      <div>{!!GetUserInfo.data && !!GetFollowingInfo.data && renderProfile()}</div>
    )
  }

  const checkFollowing = () => {
    let found = GetFollowingInfo.data.following.find(user => user.id === GetUserInfo.data.user.id)
    console.log('Results', found)
    if (found) {
      return true
    }
    return false
  }

  const renderFollowBtn = () => {
    return <button onClick={follow}>Follow</button>
  }

  const renderUnfollowBtn = () => {
    return <button onClick={unfollow}>Unfollow</button>
  }

  const follow = () => {

  }

  const unfollow = () => {
    // unFollowUser({
    //   variables: {
    //     'postId': postId
    //   },
  }

  const renderProfile = () => {
    return <div>
      <section className="profile-header">
        <div>
        <h2>{GetUserInfo.data.user.firstName} {GetUserInfo.data.user.lastName}</h2>
        <h3>Username: {GetUserInfo.data.user.userName}</h3>
        {!checkFollowing() ? renderFollowBtn() : renderUnfollowBtn()}
        </div>
        <div className="followers-info">
          <h4 onClick={toggleList}>{`${GetUserInfo.data.user.followers.length} Followers (click)`}</h4>
          {renderFollowers(GetUserInfo.data.user.followers)}
        </div>
      </section>
      <div className="user-profile-navigation">
        <button>Posts</button>
        <button>About</button>
      </div>
      {renderPosts(GetUserInfo.data.user.posts)}
    </div>
  }

  return (
    <section>
      {renderTest()}
    </section>
  )

}

export default UserProfile
