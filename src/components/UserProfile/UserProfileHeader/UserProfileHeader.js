import './UserProfileHeader.css'

const UserProfileHeader = ({ fname, lname, uname, checkFollowing, renderFBtn, renderUBtn, fixedFollowers, fluxFollowers, renderFixed, renderFlux, renderEditBtn, toggleList, toggleFluxList}) => {
  return (
    <section className="profile-header">
      <div className="user-title">
      <h2>{fname} {lname}</h2>
      <h3>@{uname}</h3>
      {renderEditBtn()}
      {!checkFollowing() ? renderFBtn() : renderUBtn()}
      </div>
      <div className="followers-info" onClick={toggleList}>
        <h4>{fixedFollowers.length}</h4>
        <p>Fixed {fixedFollowers.length === 0 || fixedFollowers.length > 1 ? 'Followers' : 'Follower'}</p>
        {renderFixed(fixedFollowers)}
      </div>
      <div className="flux-followers-info" onClick={toggleFluxList}>
          <h4>{fluxFollowers.length}</h4>
          <p>Flux {fluxFollowers.length === 0 || fluxFollowers.length > 1 ? 'Followers' : 'Follower'}</p>
        {renderFlux(fluxFollowers)}
      </div>
    </section>
  )
}

export default UserProfileHeader
