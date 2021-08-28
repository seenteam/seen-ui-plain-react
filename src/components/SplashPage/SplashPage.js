import React, { useEffect } from 'react';
import Feed from '../Feed/Feed.js'
import Header from '../Header/Header.js'

const SplashPage = ({login, setNewPost}) => {

  useEffect(() => {
    setNewPost(false);
  }, [])

  return (
    <main>
      <Header />
      <Feed />
    </main>
  )
}

export default SplashPage
