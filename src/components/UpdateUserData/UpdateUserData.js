import { useMutation, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { CREATE_NEW_USER } from "../../queries/queries";



const UpdateUserData = () => {
    let userName, firstName, lastName, phoneNumber, email, birthday;
    //update create NEW USER
    const [updateUser] =  useMutation(gql.CREATE_NEW_USER);
    
    const updatingUser = (e) => {
            console.log("Updating USER")
            e.preventDefault();
    
            updateUser( 
                {variables: {userName: userName.value, firstName:firstName.value, lastName: lastName.value,
                     phoneNumber: phoneNumber.value, email: email.value, birthday: birthday.value 
                }})
    }
    
    return (
        <section>
            <form onSubmit={updatingUser}>
                <label htmlFor="userName">Username: </label>
                <input ref={value => userName = value} id='userName'></input> <br/>

                <label htmlFor="firstName">First name: </label>
                <input ref={value => firstName = value} id='firstName'></input> <br/>

                <label htmlFor="lastName">Last name: </label>
                <input ref={value => lastName = value} id='lastName'></input> <br/>

                <label htmlFor="phoneNumber">Phone Number: </label>
                <input ref={value => phoneNumber = value} id='phoneNumber'></input> <br/>

                <label htmlFor="email">Email address:</label>
                <input ref={value => email = value} id='email'></input> <br />

                <label htmlFor="birthday">Birth date: </label>
                <input ref={value => birthday = value} id='birthday'></input> <br/>

                <button onClick={updatingUser}> Update User</button>
            </form>
        </section>
    )
}
export default UpdateUserData;