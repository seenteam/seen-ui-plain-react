import { useQuery} from "@apollo/client";
import React, { useEffect } from 'react';
import './ProfileDetails.css'
import * as gql from '../../queries/queries';

//import { GET_ALL_USERS, GET_ALL_USER_INFO } from '../../queries/queries';

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

const ProfileDetails = ({userID}) => {
   const { loading, error, data } = useQuery(gql.GET_USER_INFO(userID));

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;

    const check = () => {
      console.log({data})
    }
    check()

    // firstName,
    //  lastName,
    //  id,
    //  userName,
    //  email,
    //  phoneNumber,
    //  birthday,
    //  posts 

   return (
    <section>

       <p>
         Username : {data.user.userName}
       </p>

       <p>
         name :  {data.user.firstName} {data.user.lastName}
       </p>
       
       <p>
        email: {data.user.email}
       </p>

       <p>
        Phone Number : {data.user.phoneNumber}
       </p>

       <p>
        Birthday: {data.user.birthday}
       </p>

     </section>
   );
 };

export default ProfileDetails;
  