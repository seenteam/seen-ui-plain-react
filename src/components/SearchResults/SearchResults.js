const SearchResults = ({results}) => {
  let parsed;
  if (results) {
    parsed = results.map(result => <article>{result.first_name} {result.last_name}</article>)
  }

  return (
    <section>
      {!results ? null : parsed}
    </section>
  )
}

export default SearchResults
