import React, { useEffect, useContext } from 'react';
import './Profile.css'
import ProfileDetails from './ProfileDetails/ProfileDetails';
import UpdateUserData from './UpdateUserData/UpdateUserData';

// Query Posts from DB that correspond to current User

const Profile = () => {
  
  useEffect(() => {
    let mounted = true;
    return () => mounted = false;
  }, [])

  return (
    <div className="user-profile">
      <ProfileDetails />
      <UpdateUserData />
    </div>
  )
}

export default Profile
