import { useMutation, useSubscription } from "@apollo/client";
import * as gql from '../../../queries/queries';
import React, {useContext} from "react";
import UserContext from "../../UserProfile/UserContext";

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
        <section>
            <form onSubmit={updatingUser}>
                <label htmlFor="userName">Username: </label>
                <input required ref={value => userName = value} id='userName'></input> <br/>

                <label htmlFor="firstName">First name: </label>
                <input required ref={value => firstName = value} id='firstName'></input> <br/>

                <label htmlFor="lastName">Last name: </label>
                <input required ref={value => lastName = value} id='lastName'></input> <br/>

                <label htmlFor="phoneNumber">Phone Number: </label>
                <input required ref={value => phoneNumber = value} type="tel" id='phoneNumber' placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input> <br/>

                <label htmlFor="email">Email address:</label>
                <input required ref={value => email = value} type="email" id='email'></input> <br />

                <label htmlFor="birthday">Birth date: </label>
                <input required ref={value => birthday = value} type="date" id='birthday'></input> <br/>

                <input type="submit" value="Update User" />
                {/* <button type='submit' onClick={updatingUser}> Update User</button> */}
            </form>
        </section>
    )
}
export default UpdateUserData;