import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar.js'
import NewPost from '../../components/NewPost/NewPost.js'
import SearchPage from '../../components/SearchPage/SearchPage.js'
import Profile from '../../components/Profile/Profile.js'
import WavesLayer from '../../components/WavesLayer/WavesLayer.js'
import Followers from '../../components/Followers/Followers.js'
import Feed from '../../components/Feed/Feed.js'
import UserProfile from '../../components/UserProfile/UserProfile'
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from '../../components/Header/Header.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAtom, faHome, faSearch, faUserCircle as faUserCircleActive, faPlus, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import UserContext from '../../components/UserProfile/UserContext.js'
import './App.css';
library.add(faAtom, faHome, faSearch, faUserCircle, faUserCircleActive, faPlus, faChevronRight);

const App = () => {

  const getRandomUser = () => {
    return Math.floor(Math.random() * (50 - 1) + 1);
  }
  const [newPost, setNewPost] = useState(false)
  const [userID, setUserID] = useState(getRandomUser())

  return (
    <UserContext.Provider value={userID}>
      <div>
        <Switch>
          <Route exact path="/" >
            <section>
              <Header setNewPost={setNewPost}/>
              <Feed user={userID} />
            </section>
          </Route>
          <Route exact path="/profile" >
            <UserProfile user={userID} />
          </Route>
          <Route exact path="/profile/edit" >
            <Profile />
          </Route>
          <Route exact path="/search-page">
            <SearchPage setNewPost={setNewPost}/>
          </Route>
          <Route exact path="/followers" >
            <Followers />
          </Route>
          <Route exact path="/users/:id" render={({match}) => {
              const { id } = match.params
              return <UserProfile user={id} />
          }}/>
        <Route render={() => {
            return <Redirect to="/" />
          }} />
        </Switch>
        <WavesLayer />
        <NewPost
          visible={newPost}
          setVisibility={setNewPost}
        />
        <NavBar
          newPost={newPost}
          setNewPost={setNewPost}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
