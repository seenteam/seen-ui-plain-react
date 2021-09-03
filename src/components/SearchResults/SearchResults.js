import './SearchResults.css'
import {Link} from 'react-router-dom'

const SearchResults = ({results}) => {
  let parsed;
  if (results) {
    parsed = results.map(result => {
    return <Link to={`/users/${result.id}`}>
              <article className='user-container' key={result.id}> 
                <h4>{result.userName}</h4> 
                <p> {result.firstName} {result.lastName} </p>
              </article>
            </Link>})
  }

  return (
    <section className="results">
      {!results ? null : parsed}
    </section>
  )
}

export default SearchResults
