import React, {useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import FollowersList from './FollowersList/FollowersList'
import UserProfileHeader from './UserProfileHeader/UserProfileHeader'

import Post from '../Post/Post.js'
import UserContext from "../UserProfile/UserContext";
import Loading from '../Loading/Loading.js'
import * as gql from '../../queries/queries'

import './UserProfile.css'

const UserProfile = ({user}) => {
  const value = useContext(UserContext)
  const GetFollowingInfo = useQuery(gql.GET_FOLLOWER_INFO(user));
  const UsersLikedPosts = useQuery(gql.GET_LIKED_POSTS(user));
  const GetFluxFollowing = useQuery(gql.GET_USER_FLUX_FOLLOWING(user));
  //ALSO ADD FLUX FOLLOWERS for value
  const GetFluxFollowers = useQuery(gql.GET_USER_FLUX_FOLLOWERS(user))
  const GetVisitedUserInfo = useQuery(gql.GET_USER_INFO(user));
  const [clicked, setClicked] = useState(false)
  const [postsClicked, setPostsClicked] = useState(true)
  const [likedPostsClicked, setlikedPostsClicked] = useState(false)
  const [profile, setProfile] = useState('')
  const [followersVisible, setFollowersVisible] = useState(false)
  const [fluxFollowersVisible, setFluxFollowersVisible] = useState(false)
  const [clickedDelete, setClickedDelete] = useState(false)

  const [followUser] = useMutation(gql.CREATE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_FOLLOWING_INFO(value) }, { query: gql.GET_FOLLOWER_INFO(user) }, { query: gql.GET_USER_INFO(user) }],
  });

  const [unFollowUser] = useMutation(gql.DELETE_FOLLOWER, {
    refetchQueries: [{ query: gql.GET_FOLLOWING_INFO(value) }, { query: gql.GET_FOLLOWER_INFO(user) }, { query: gql.GET_USER_INFO(user) }, { query: gql.GET_USER_INFO(value) }],
  });

  const [deletePost] = useMutation(gql.DELETE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(user) }],
  });


  useEffect(() => {
    setClicked(false)
    setClickedDelete(false)
  }, [GetVisitedUserInfo.data])



  const toggleNav = () => {
     if (!postsClicked) {
       setPostsClicked(true)
       return setlikedPostsClicked(false)
     }
     setlikedPostsClicked(true)
     return setPostsClicked(false)
  }


  if (GetVisitedUserInfo.loading) {
    return <Loading loading={GetFollowingInfo.loading} />
  }
  if (GetFluxFollowing.loading) {
    return <Loading loading={GetFluxFollowing.loading} />
  }
  if (GetFluxFollowers.loading) {
    return <Loading loading={GetFluxFollowers.loading} />
  }

  const check = () => {
    console.log(GetVisitedUserInfo.data)
  }

  const removePost = (postId) => {
    setClicked(true)
    deletePost({
      variables: {
        'postId': postId
      },
    })
  }

  const renderPosts = (posts) => {
    return (
      <section className="user-posts-container">
        <div className="posts-grid">
          {[...posts].sort((a, b) => parseInt(b.id) - parseInt(a.id)).map(post => {
            return <Post
              id={post.id}
              content={post.content}
              created={post.createdAt}
              user={user}
              currentUser={(user === value) ? value : null}
              clickedDelete={clicked}
              removePost={removePost}
              />
          })}
        </div>
      </section>
    )
  }

  const renderLikedPosts = (posts) => {
    return (
      <section className="user-posts-container">
        <div className="posts-grid">
          {posts.map(post => <Post id={post.id} content={post.content} created={post.createdAt} user={value} currentUser={user} />)}
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
    let found = GetFollowingInfo.data.usersFollowers.find(user => user.id === value.toString())
    if (found) {
      return true
    }
    return false
  }

  const renderFollowBtn = () => {
    return (user !== value) ? <button disabled={clicked} onClick={follow}>Follow</button> : null
  }

  const renderUnfollowBtn = () => {
    return (user !== value) ? <button disabled={clicked} onClick={unfollow}>Unfollow</button> : null
  }

  const follow = () => {
    setClicked(true)
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
      <UserProfileHeader
        fname={GetVisitedUserInfo.data.user.firstName}
        lname={GetVisitedUserInfo.data.user.lastName}
        uname={GetVisitedUserInfo.data.user.userName}
        checkFollowing={checkFollowing}
        renderFBtn={renderFollowBtn}
        renderUBtn={renderUnfollowBtn}
        fixedFollowers={GetVisitedUserInfo.data.user.followers}
        fluxFollowers={GetFluxFollowers.data.usersFluxFollowers}
        renderFixed={renderFollowers}
        renderFlux={renderFluxFollowers}
        toggleList={toggleList}
        toggleFluxList={toggleFluxList}
      />
      <div className="user-profile-navigation">
        <button onClick={toggleNav} className={!postsClicked ? 'profile-nav nav-inactive' : 'profile-nav nav-active'}>Posts</button>
        <button onClick={toggleNav} className={!likedPostsClicked ? 'liked-posts-nav nav-inactive' : 'liked-posts-nav nav-active'}>Liked Posts</button>
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
