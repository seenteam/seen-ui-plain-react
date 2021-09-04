import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client'
import './Header.css'
import * as gql from '../../queries/queries'
import UserContext from '../UserProfile/UserContext';

const Header = ({setNewPost}) => {
 const value = useContext(UserContext)

 const { data, error } = useQuery(gql.GET_USER_NAME(value))
  useEffect(() => {
    setNewPost(false);
  }, [])

  return (
    <header>
      <h1>Seen</h1>
      <h1>{!!data && `Welcome ${data.user.firstName} ${data.user.lastName}`}</h1>
      {!!error && console.log(error)}
    </header>
  )
}

export default Header
