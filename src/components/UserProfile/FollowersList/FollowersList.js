import FollowerDetails from '../../Followers/FollowerDetails/FollowerDetails'
import './FollowersList.css'

const FollowersList = ({ followers, visible, setVisible}) => {

  const toggleList = () => {
    (!visible) ? setVisible(true) : setVisible(false)
  }

  const renderList = () => {
    return (
      <div>
      {followers.map((follower, index) => <FollowerDetails key={index} id={follower.friendId} followersVisible={setVisible}/>)}
      </div>
    )
  }

  return (
    <section className={!visible ? "follow-list hidden" : "follow-list"}>
      {
        !!visible && <div>
        <button onClick={toggleList}>Close</button>
        {renderList()}
      </div>
      }
    </section>
  )
}

export default FollowersList
