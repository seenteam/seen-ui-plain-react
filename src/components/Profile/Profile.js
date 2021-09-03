import React, { useEffect } from 'react';
import './Profile.css'
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import UpdateUserData from '../UpdateUserData/UpdateUserData';

// Query Posts from DB that correspond to current User

const Profile = ({user, posts, setNewPost, userID}) => {

  useEffect(() => {
    let mounted = true;
    if (mounted) setNewPost(false)
    return () => mounted = false;
  }, [])

  const userProfile = () => {
    return (
      <div>
        <h2>{user.username}</h2>
        <h3>{user.first_name} {user.last_name}</h3>
        <h4>Joined {user.created_at}</h4>
        <section>
          <h2>My Posts</h2>
          <div>
            {posts.map((post, index) => <p key={index}>{post}</p>)}
          </div>
        </section>
      </div>
      )
  }

  return (
    <div className="user-profile">
      {!user ? <h2>Please log in</h2> : userProfile()}
      <ProfileDetails userID={userID} />
      <button onClick > Update Profile </button>
      <UpdateUserData userID={userID} />
    </div>
  )
}

export default Profile
