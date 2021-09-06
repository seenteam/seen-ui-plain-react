import FollowerDetails from '../../Followers/FollowerDetails/FollowerDetails'
import './FollowersList.css'

const FollowersList = ({ followers, visible, setVisible, type}) => {

  const toggleList = () => {
    (!visible) ? setVisible(true) : setVisible(false)
  }

  const renderList = () => {
    return (
      <div className="list-container">
      {followers.map((follower, index) => <FollowerDetails key={index} id={follower.friendId} followersVisible={setVisible}/>)}
      </div>
    )
  }

  const renderFluxList = () => {
    return (
      <div className="list-container">
      {followers.map((follower, index) => <FollowerDetails key={index} id={follower.id} followersVisible={setVisible}/>)}
      </div>
    )
  }

  return (
    <section className={!visible ? "follow-list hidden" : "follow-list"}>
      {
        !!visible && <div style={{'height': '90%'}}>
        <button onClick={toggleList}>Close</button>
        {!type ? renderList() : renderFluxList()}
      </div>
      }
    </section>
  )
}

export default FollowersList
