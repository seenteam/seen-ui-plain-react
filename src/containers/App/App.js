import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar.js'
import NewPost from '../../components/NewPost/NewPost.js'
import SearchPage from '../../components/SearchPage/SearchPage.js'
import SplashPage from '../../components/SplashPage/SplashPage.js'
import Profile from '../../components/Profile/Profile.js'
import WavesLayer from '../../components/WavesLayer/WavesLayer.js'
import Followers from '../../components/Followers/Followers.js'
import UserPosts from '../../components/UserPosts/UserPosts'
import UserProfile from '../../components/UserProfile/UserProfile'
import {Switch, Route} from 'react-router-dom'
import Header from '../../components/Header/Header.js'

import './App.css';

const App = () => {

  const getRandomUser = () => {
    let ids = [1, 2, 3, 4, 5]
    return Math.floor(Math.random() * ids.length) + 1
  }

  const [userbase, setUsers] = useState([])
  const [current, setCurrent] = useState('')
  const [newPost, setNewPost] = useState(false)
  const [posts, setPosts] = useState([])
  const [userID, setUserID] = useState(getRandomUser())

  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => {
          return <section>
                  <Header 
                  setNewPost={setNewPost}
                  id={userID}
                  />
                  <UserPosts
                    userID={userID}
                  />
                  </section>
                }}
              />
            <Route exact path="/profile" render={() => {
                return <Profile
                        user={!current ? null : current}
                        userID={userID}
                        posts={posts}
                        setNewPost={setNewPost}
                      />
              }}
            />
            <Route exact path="/search-page">
              <SearchPage
                setNewPost={setNewPost}
              />
            </Route>
            <Route exact path="/followers" render={() => {
                return <Followers id={userID} />
              }}/>
            <Route exact path="/users/:id" render={({match}) => {
                  const { id } = match.params
                  return <UserProfile user={id} />
            }}/>
      </Switch>
      <WavesLayer />
      <NewPost
        visible={newPost}
        setVisibility={setNewPost}
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
