import { useQuery} from "@apollo/client";
import React, { useEffect } from 'react';
import './ProfileDetails.css'
import { GET_ALL_USERS, GET_ALL_USER_INFO } from '../../queries/queries';

/*
users {
    id
    userName
    firstName
    lastName 
    email
    phoneNumber
    birthday
    posts{
      content
			}
  }

*/

const ProfileDetails = () => {
   const { loading, error, data } = useQuery(GET_ALL_USER_INFO);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;

    const check = () => {
      console.log(data)
    }
    check()

   return data.users.map(({ 
     firstName,
     lastName,
     id,
     userName,
     email,
     phoneNumber,
     birthday,
     posts 
     }) => (
         
     <div key={id}>

       <p>
         Username : {userName}
       </p>

       <p>
         name : {firstName} {lastName}
       </p>

       <p>
        email: {email}
       </p>

       <p>
        Phone Number : {phoneNumber}
       </p>

       <p>
        Birthday: {birthday}
       </p>

     </div>
   ));
 };

export default ProfileDetails;
  