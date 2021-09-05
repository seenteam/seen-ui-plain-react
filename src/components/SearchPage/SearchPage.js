import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar'
import SearchResults from './SearchResults/SearchResults';
import { useQuery } from '@apollo/client';
import * as gql from '../../queries/queries'
import Loading from '../Loading/Loading.js'
import './SearchPage.css'

const SearchPage = ({setNewPost}) => {

    const [query, setQuery] = useState('')
    useEffect(() => {
        setNewPost(false);
      }, [])

    const { loading, error, data } = useQuery(gql.GET_ALL_USERS);

    if (loading) return <Loading loading={loading} />;
    if (error) return <p>Error :(</p>;

    const queryResults = () => {
        if(data) {
             return data.users.filter(user => {
                let {firstName, lastName, userName} = user;
                let lower = query.toLowerCase();

                return ((userName.toLowerCase().includes(lower)) ||
                (firstName.toLowerCase().includes(lower)) ||
                (lastName.toLowerCase().includes(lower)) ||
                (`${firstName} ${lastName}`.toLowerCase().includes(lower)));
             })
        }
      }

    return (
        <section className="search-page-container">
            <h1>Search the Seen</h1>
            <SearchBar
                query={query}
                set={setQuery}
            />
            <SearchResults results={!query ? null : queryResults()} />
        </section>
    )
}

export default SearchPage;
