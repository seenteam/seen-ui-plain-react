import React, { useEffect } from 'react';
import Feed from '../Feed/Feed.js'
import Header from '../Header/Header.js'
import { useQuery } from '@apollo/client'
import * as gql from '../../queries/queries'

const SplashPage = ({setNewPost, id}) => {

  const { data, error } = useQuery(gql.GET_USER_NAME(id))
  useEffect(() => {
    setNewPost(false);
  }, [])

  return (
    <main>
      <Header />
      <h1>{!!data && `Welcome ${data.user.firstName} ${data.user.lastName}`}</h1>
      {!!error && console.log(error)}
    <Feed />
    </main>
  )
}

export default SplashPage
