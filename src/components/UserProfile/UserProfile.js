import React, {useState, useEffect} from 'react'
import { useQuery, useMutation } from "@apollo/client";
import FollowerDetails from '../FollowerDetails/FollowerDetails'
import * as gql from '../../queries/queries'

const UserProfile = ({user}) => {
  const { loading, error, data } = useQuery(gql.GET_USER_INFO(user));
  const [profile, setProfile] = useState('')
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
      <div>
        {followers.map(follower => <FollowerDetails id={follower.friendId}/>)}
      </div>
    )
  }

  const renderProfile = () => {
    return <div>
      <h2>{data.user.firstName} {data.user.lastName}</h2>
      <h3>{data.user.userName}</h3>
      <h4>Followers</h4>
      {renderFollowers(data.user.followers)}
      {renderPosts(data.user.posts)}
    </div>
  }

  return (
    <section>
      <h1>Profile</h1>
      {!!data && renderProfile()}
    </section>
  )



}

export default UserProfile
