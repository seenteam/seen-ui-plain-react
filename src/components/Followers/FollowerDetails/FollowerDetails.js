import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom'
import * as gql from '../../../queries/queries'
import './FollowerDetails.css'

const FollowerDetails = ({id, followersVisible}) => {
  const { loading, error, data } = useQuery(gql.GET_USER_INFO(id))


  const renderDetails = () => {
    if (error) console.log(error, "ERROR!")
    if (loading) return <h2>Loading...</h2>
    return <article>
      <h5>{data.user.firstName} {data.user.lastName}</h5>
    </article>
  }

  const setVisible = () => {
    if (followersVisible) followersVisible(false)
  }

  return (
    <div className="user-card">
      {!!data && renderDetails()}
      <Link to={`/users/${id}`}><button onClick={setVisible}>View Profile</button></Link>
    </div>
  )
}

export default FollowerDetails
