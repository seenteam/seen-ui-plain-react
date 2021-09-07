import { useQuery} from "@apollo/client";
import React, {useContext} from 'react';
import './ProfileDetails.css'
import * as gql from '../../../queries/queries';
import UserContext from "../../UserProfile/UserContext";

const ProfileDetails = () => {
   const value = useContext(UserContext);
   const { loading, error, data } = useQuery(gql.GET_USER_INFO(value));

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error :(</p>;

  const birthday = data.user.birthday.split('T')[0].split('-')
  const birthdate = birthday[1] + '-' + birthday[2] + '-' + birthday[0]
  console.log({birthdate})

   return (
    <section className="profile-details">
       <p>
         Username: {data.user.userName}
       </p>
       <p>
        Name:  {data.user.firstName} {data.user.lastName}
       </p>
       <p>
        Email: {data.user.email}
       </p>
       <p>
        Phone Number: {data.user.phoneNumber}
       </p>
       <p>
        Birthday: {birthdate}
       </p>
     </section>
   );
 };

export default ProfileDetails;
  