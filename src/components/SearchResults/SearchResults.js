import './SearchResults.css'
const SearchResults = ({results}) => {
  let parsed;
  if (results) {
    parsed = results.map(result => <article>{result.first_name} {result.last_name}</article>)
  }

  return (
    <section className="results">
      {!results ? null : parsed}
    </section>
  )
}

export default SearchResults
