import React, {useState, useEffect} from 'react'
import { useQuery, useMutation } from "@apollo/client";
import FollowersList from './FollowersList/FollowersList'
import Post from '../Post/Post.js'
import * as gql from '../../queries/queries'
import './UserProfile.css'

const UserProfile = ({user}) => {
  const { loading, error, data } = useQuery(gql.GET_USER_INFO(user));
  const [profile, setProfile] = useState('')
  const [followersVisible, setFollowersVisible] = useState(false)
  useEffect(() => {
    let mounted = true;
    if (mounted && data) check()
    return () => mounted = false;
  })

  const check = () => {
    console.log(data)
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

  const renderProfile = () => {
    return <div>
      <section className="profile-header">
        <div>
        {!!loading && <h4>Loading...</h4>}
        <h2>{data.user.firstName} {data.user.lastName}</h2>
        <h3>Username: {data.user.userName}</h3>
        </div>
        <div className="followers-info">
          <h4 onClick={toggleList}>{`${data.user.followers.length} Followers (click)`}</h4>
          <button>Follow</button>
          {renderFollowers(data.user.followers)}
        </div>
      </section>
      <div className="user-profile-navigation">
        <button>Posts</button>
        <button>About</button>
      </div>
      {renderPosts(data.user.posts)}
    </div>
  }

  return (
    <section>
      {!!data && renderProfile()}
    </section>
  )

}

export default UserProfile
