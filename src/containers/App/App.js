import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar.js'
import NewPost from '../../components/NewPost/NewPost.js'
import SearchPage from '../../components/SearchPage/SearchPage.js'
import Profile from '../../components/Profile/Profile.js'
import WavesLayer from '../../components/WavesLayer/WavesLayer.js'
import Followers from '../../components/Followers/Followers.js'
import UserPosts from '../../components/UserPosts/UserPosts'
import UserProfile from '../../components/UserProfile/UserProfile'
import {Switch, Route} from 'react-router-dom'
import Header from '../../components/Header/Header.js'
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab, fas, far } from '@fortawesome/free-brands-svg-icons'
import { faAtom, faHome, faSearch, faUserCircle as faUserCircleActive, faPlus, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
// import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import UserContext from '../../components/UserProfile/UserContext.js'
import './App.css';
library.add(faAtom, faHome, faSearch, faUserCircle, faUserCircleActive, faPlus, faChevronRight);

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
    <UserContext.Provider value={userID}>
      <div>
        <Switch>
          <Route exact path="/" render={() => {
            return <section>
                    <Header
                      setNewPost={setNewPost}
                    />
                    <UserPosts/>
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
                  setNewPost={setNewPost}
                />
              </Route>
              <Route exact path="/followers" render={() => {
                  return <Followers />
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
