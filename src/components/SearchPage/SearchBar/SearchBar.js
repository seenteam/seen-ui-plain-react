import './SearchBar.css'

const SearchBar = ({ query, set }) => {

  return (
    <form onSubmit={e => {
      e.preventDefault()
    }}>
      <input
        type="text"
        placeholder="Search for users"
        value={query}
        onChange={(e) => set(e.target.value)}
      />
    </form>
  )
}

export default SearchBar
