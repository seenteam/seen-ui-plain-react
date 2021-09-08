import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom'
import * as gql from '../../../queries/queries'
import Loading from '../../Loading/Loading.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FollowerDetails.css'

const FollowerDetails = ({id, followersVisible, type}) => {
  const { loading, data } = useQuery(gql.GET_USER_INFO(id))

  if (loading) return <Loading loading={loading} type="follower" />

  const renderDetails = () => {
    return <article className="follow-details">
      <p>{`${data.user.firstName} ${data.user.lastName}`}</p>
    </article>
  }

  return (
    <div className={!type ? 'profile-link' : 'main-link'}>
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
