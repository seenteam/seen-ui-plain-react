import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client'
import './Header.css'
import * as gql from '../../queries/queries'
import { seenLogo } from '../../utilities/images'
import UserContext from '../UserProfile/UserContext';
import './Header.css'

const Header = ({setNewPost}) => {
 const value = useContext(UserContext)

 const { data, error } = useQuery(gql.GET_USER_NAME(value))
  useEffect(() => {
    setNewPost(false);
  }, [])

  return (
    <header>
      <h1><img src={seenLogo} />Seen</h1>
      <h2>{!!data && `${data.user.firstName} ${data.user.lastName}'s Feed`}</h2>
      {!!error && console.log(error)}
    </header>
  )
}

export default Header
