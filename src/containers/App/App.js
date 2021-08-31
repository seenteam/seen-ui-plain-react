import React, { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar.js'
import NewPost from '../../components/NewPost/NewPost.js'
import SearchPage from '../../components/SearchPage/SearchPage.js'
import SplashPage from '../../components/SplashPage/SplashPage.js'
import Profile from '../../components/Profile/Profile.js'
import WavesLayer from '../../components/WavesLayer/WavesLayer.js'
import UserPosts from '../../components/UserPosts/UserPosts'
import {Switch, Route} from 'react-router-dom'
import { useQuery} from "@apollo/client";
import { GET_USER_POSTS } from '../../queries/queries';
// import { users, posts } from '../../utilities/mockData'

import './App.css';

const App = () => {

  const [userbase, setUsers] = useState([])
  const [current, setCurrent] = useState('')
  const [newPost, setNewPost] = useState(false)
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')
  const [userID, setUserID] = useState(2)
  const { loading, error, data } = useQuery(GET_USER_POSTS(userID));
  // const [updated, setUpdated] = useState(false)

  useEffect(() => {
    let mounted = true;
    if (mounted) setPosts(data)
    return () => mounted = false;
  }, [])

  const queryResults = (data) => {
    return userbase.filter(user => (user.username.includes(query)) || (user.first_name.includes(query)) || (user.last_name.includes(query)))
  }

  const login = () => {
    setCurrent(userbase[0])
    return () => console.log(current)
  }

  // const updatePosts = () => {
  //   setUpdated(true)
  // }


  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => {
          return <section>
                    <SplashPage
                    login={login}
                    setNewPost={setNewPost}
                    />
                  <UserPosts
                    data={!posts ? data : posts}
                    loading={loading}
                    error={error}
                    userID={userID}
                  />
                  </section>
                }}
              />
            <Route exact path="/profile" render={() => {
                return <Profile
                        user={!current ? null : current}
                        posts={posts}
                        setNewPost={setNewPost}
                      />
              }}
            />
            <Route exact path="/search-page">
              <SearchPage
                query={query}
                setQuery={setQuery}
                queryResults={queryResults}
                setNewPost={setNewPost}
              />
            </Route>
      </Switch>
      <WavesLayer />
      <NewPost
        visible={newPost}
        setVisibility={setNewPost}
        data={!posts ? data : posts}
        setPosts={setPosts}
        userID={userID}
      />
      <NavBar
        newPost={newPost}
        setNewPost={setNewPost}
      />
    </div>
  );
}

export default App;
