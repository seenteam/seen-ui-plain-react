import './SearchResults.css'
import FollowerDetails from '../../Followers/FollowerDetails/FollowerDetails.js'
import {Link} from 'react-router-dom'

const SearchResults = ({results}) => {
  let parsed;
  if (results) {
    parsed = results.map((result, index) => {
    return <FollowerDetails key={index} id={result.id} />
  })
}

  return (
    <section className="results">
      {!results ? null : parsed}
    </section>
  )
}

export default SearchResults
