import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TopFluxUserCard.css'

const TopFluxUserCard = ({data}) => {
  return (
    <article className="top-flux-card">
      <p>{`${data.user.firstName} ${data.user.lastName}`}</p>
      <p>{data.count} Flux Followers</p>
      <Link to={`/users/${data.userId}`}><button>Visit Profile <FontAwesomeIcon icon="chevron-right" /></button></Link>
    </article>
  )
}

export default TopFluxUserCard
