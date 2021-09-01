import React, {useState, useEffect} from 'react'
import { useQuery, useMutation } from "@apollo/client";
import FollowerDetails from '../FollowerDetails/FollowerDetails'
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
      <ul>
        {posts.map(post => <li>{post.content}</li>)}
      </ul>
    )
  }

  const renderFollowers = (followers) => {
    return (
      <div className={!followersVisible ? "followers-list inactive" : "followers-list"}>
        <button onClick={() => setFollowersVisible(false)}>Close</button>
        {followers.map(follower => <FollowerDetails id={follower.friendId}/>)}
      </div>
    )
  }

  const revealFollowers = () => {
    setFollowersVisible(true)
  }

  const renderProfile = () => {
    return <div>
      <section className="profile-header">
        <div>
        <h2>{data.user.firstName} {data.user.lastName}</h2>
        <h3>{data.user.userName}</h3>
        </div>
        <div className="followers-info">
          <h4 onClick={revealFollowers}>{data.user.followers.length} Followers</h4>
          {renderFollowers(data.user.followers)}
        </div>
      </section>
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
