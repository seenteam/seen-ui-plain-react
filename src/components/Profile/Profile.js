// Query Posts from DB that correspond to current User

const Profile = ({user}) => {

  const userProfile = () => {
    return (
      <div>
        <h2>{user.username}</h2>
        <h3>{user.first_name} {user.last_name}</h3>
        <h4>Joined {user.created_at}</h4>
        <section>
          <h2>My Posts</h2>
        </section>
      </div>
      )
  }

  return (
    <div>
      {!user ? <h2>Please log in</h2> : userProfile()}
    </div>
  )
}

export default Profile
