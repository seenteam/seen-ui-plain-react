import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar.js'
import NewPost from '../../components/NewPost/NewPost.js'
import SplashPage from '../../components/SplashPage/SplashPage.js'
import Profile from '../../components/Profile/Profile.js'
import {Switch, Route} from 'react-router-dom'
import { users, posts } from '../../utilities/mockData'

import './App.css';

const App = () => {

  const [userbase, setUsers] = useState([])
  const [current, setCurrent] = useState('')
  const [newPost, setNewPost] = useState(false)
  const [posts, setPosts] = useState([])
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
    setCurrent(userbase[0])
    return () => console.log(current)
  }

  return (
    <div>
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
            <Route exact path="/profile" render={() => {
                return <Profile
                        user={!current ? null : current}
                        posts={posts}
                      />
              }}
            />
      </Switch>
      <NewPost
        visible={newPost}
        setVisibility={setNewPost}
        posts={posts}
        setPosts={setPosts}
      />
      <NavBar
        newPost={newPost}
        setNewPost={setNewPost}
      />
    </div>
  );
}

export default App;
