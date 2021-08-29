import React, { useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import './SearchPage.css'
import ExchangeRates from '../ExchangeRates/ExchangeRates';

const SearchPage = ({query, setQuery, queryResults, setNewPost}) => {

    useEffect(() => {
        setNewPost(false);
      }, [])

    return (
        <section className="search-page-container">
            <h1>Search the Seen</h1>
            <SearchBar 
                query={query}
                set={setQuery} 
            />
            <SearchResults results={!query ? null : queryResults(query)} />
            {/* <ExchangeRates /> */}
        </section>
    )
}

export default SearchPage; 