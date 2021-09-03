import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client'
import './Header.css'
import * as gql from '../../queries/queries'


const Header = ({setNewPost, id}) => {

 const { data, error } = useQuery(gql.GET_USER_NAME(id))
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
