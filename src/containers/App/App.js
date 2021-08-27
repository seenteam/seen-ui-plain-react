import React, { useState, useEffect } from 'react'
// import Feed from '../../components/Feed/Feed.js'
// import SearchBar from '../../components/SearchBar/SearchBar.js'
// import SearchResults from '../../components/SearchResults/SearchResults.js'
// import NavBar from '../../components/NavBar/NavBar.js'
// import Header from '../../components/Header/Header.js'
import SplashPage from '../../components/SplashPage/SplashPage.js'
import {Switch, Route} from 'react-router-dom'
import { users, posts } from '../../utilities/mockData'



import './App.css';

const App = () => {

  const [userbase, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true;
    if (mounted) setUsers(users.data.attributes.users)
    return () => mounted = false;
  }, [])

  const queryResults = (data) => {
    return userbase.filter(user => (user.username.includes(query)) || (user.first_name.includes(query)) || (user.last_name.includes(query)))
  }

  const login = () => {
    setCurrentUser(userbase[0])
  }

  return (
    <Switch>
      <Route exact path="/" render={() => {
          return <SplashPage
                  query={query}
                  setQuery={setQuery}
                  queryResults={queryResults}
                  login={login}
                  />
              }}
      />
    </Switch>
  );
}

export default App;
