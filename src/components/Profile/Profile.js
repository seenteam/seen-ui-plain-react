import { Link } from 'react-router-dom';
import './Profile.css'
import ProfileDetails from './ProfileDetails/ProfileDetails';
import UpdateUserData from './UpdateUserData/UpdateUserData';

const Profile = () => {

  return (
    <section className="user-profile">
      <Link to='/profile'>
        <button> Return to profile! </button>
      </Link>
      <ProfileDetails />
      <UpdateUserData />
    </section>
  )
}

export default Profile
