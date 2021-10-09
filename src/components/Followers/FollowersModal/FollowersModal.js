import FollowerDetails from '../FollowerDetails/FollowerDetails.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FollowersModal.css'

const FollowersModal = ({ data, clicked, setClicked, setUsers }) => {

  const renderF = () => {
    return data.map((user, index) => {
      return <div key={index}>
        <FollowerDetails id={user.id} />
      </div>
  })
}

  const close = () => {
    setClicked(false)
    setUsers([])
  }

  return (
    <div className="follow-modal">
    {!!data.length && <div className="modal-content"><button onClick={close}><FontAwesomeIcon icon="times" /></button>
    {renderF()}
    </div>
    }
    </div>
  )

}

export default FollowersModal
