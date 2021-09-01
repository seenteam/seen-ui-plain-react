import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import * as gql from '../../queries/queries'

const FollowerDetails = ({id}) => {
  const { loading, error, data } = useQuery(gql.GET_USER_INFO(id))


  const renderDetails = () => {
    if (error) console.log(error, "ERROR!")
    if (loading) return <h2>Loading...</h2>
    return <article>
      <h5>{data.user.firstName} {data.user.lastName}</h5>
    </article>
  }

  return (
    <div>
      {!!data && renderDetails()}
      <Link to={`/users/${id}`}><button>View Profile</button></Link>
    </div>
  )
}

export default FollowerDetails
