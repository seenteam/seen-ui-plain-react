import { useMutation, useSubscription } from "@apollo/client";
import * as gql from '../../../queries/queries';
import React, {useContext} from "react";
import UserContext from "../../UserProfile/UserContext";
import './UpdateUserData.css'

const UpdateUserData = () => {
    let userName, firstName, lastName, phoneNumber, email, birthday;
    const value = useContext(UserContext);
    const [updateUser] =  useMutation(gql.UPDATE_USER);

    const updatingUser = (e) => {
      e.preventDefault();
      updateUser(
          {variables: {userId: value, userName: userName.value, firstName:firstName.value, lastName: lastName.value,
               phoneNumber: phoneNumber.value, email: email.value, birthday: birthday.value
      }})
    }

    return (
        <section className='edit-user-form-area'>
            <form onSubmit={updatingUser} >

                    <label htmlFor="userName">Username: <input required ref={value => userName = value} id='userName'/></label>

                    <label htmlFor="firstName">First name: <input required ref={value => firstName = value} id='firstName'/></label>

                    <label htmlFor="lastName">Last name: <input required ref={value => lastName = value} id='lastName'/></label>

                    <label htmlFor="phoneNumber">Phone Number: <input required ref={value => phoneNumber = value} type="tel" id='phoneNumber' placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/></label>

                    <label htmlFor="email">Email address: <input required ref={value => email = value} type="email" id='email'/></label>

                    <label htmlFor="birthday">Birthdate: <input required ref={value => birthday = value} type="date" id='birthday'/></label>

                <input type="submit" value="Update User"/>
            </form>
        </section>
    )
}
export default UpdateUserData;
