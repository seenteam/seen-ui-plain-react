import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.css'

const SearchBar = ({ query, set }) => {

  return (
    <form onSubmit={e => {
      e.preventDefault()
    }}>
      <div className="searchbar-container">
      <FontAwesomeIcon icon="search" />
      <input
        type="text"
        placeholder="Search for users"
        value={query}
        onChange={(e) => set(e.target.value)}
      />
      </div>
    </form>
  )
}

export default SearchBar
