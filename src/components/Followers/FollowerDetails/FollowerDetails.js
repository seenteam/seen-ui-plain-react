import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom'
import * as gql from '../../../queries/queries'
import Loading from '../../Loading/Loading.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FollowerDetails.css'

const FollowerDetails = ({id, followersVisible}) => {
  const { loading, error, data } = useQuery(gql.GET_USER_INFO(id))

  if (error) console.log(error, "ERROR!")
  if (loading) return <Loading loading={loading} type="follower" />

  const renderDetails = () => {
    return <article className="follow-details">
      <p>{`${data.user.firstName} ${data.user.lastName}`}</p>
    </article>
  }

  const setVisible = () => {
    if (followersVisible) followersVisible(false)
  }

  return (
    <div className="profile-link">
    <Link to={`/users/${id}`}>
      <div className="user-card">
        {!!data && renderDetails()}
        <FontAwesomeIcon icon="chevron-right" />
        
      </div>
    </Link>
    </div>
  )
}

export default FollowerDetails
