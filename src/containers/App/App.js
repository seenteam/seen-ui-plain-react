import React, { useState, useEffect } from 'react'
import Feed from '../../components/Feed/Feed.js'
import SearchBar from '../../components/SearchBar/SearchBar.js'
import SearchResults from '../../components/SearchResults/SearchResults.js'
import NavBar from '../../components/NavBar/NavBar.js'
import Header from '../../components/Header/Header.js'
import { users, posts } from '../../utilities/mockData'

import './App.css';

const App = () => {

  const [userbase, setUsers] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true;
    if (mounted) setUsers(users.data.attributes.users)
    return () => mounted = false;
  }, [])

  const queryResults = (data) => {
    return userbase.filter(user => (user.username.includes(query)) || (user.first_name.includes(query)) || (user.last_name.includes(query)))
  }

  return (
    <main>
      <Header />
      <SearchBar query={query} set={setQuery} />
      <SearchResults results={!query ? null : queryResults(query)}/>
      <Feed />
      <NavBar />
    </main>
  );
}

export default App;
