import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './SearchPage.css'

const SearchPage = ({query, setQuery, queryResults}) => {



    return (
        <section className="search-page-container">
            <h1>Search the Seen</h1>
            <SearchBar 
                query={query}
                set={setQuery} 
            />
            <SearchResults results={!query ? null : queryResults(query)} />
        </section>
    )
}

export default SearchPage; 