import { useQuery} from "@apollo/client";
import React from 'react';
import './ProfileDetails.css'
import * as gql from '../../../queries/queries';

const ProfileDetails = ({userID}) => {
   const { loading, error, data } = useQuery(gql.GET_USER_INFO(userID));

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;


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
  