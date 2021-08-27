import './SearchBar.css'

const SearchBar = () => {
  return (
    <form onSubmit={e => {
      e.preventDefault()
    }}>
      <input
        type="text"
        placeholder="Search for users"
        value=""
      />
    </form>
  )
}

export default SearchBar
