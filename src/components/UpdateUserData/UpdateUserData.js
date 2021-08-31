import { useMutation, useSubscription } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { CREATE_NEW_USER } from "../../queries/queries";


const UpdateUserData = () => {
    let userName, firstName, lastName, phoneNumber, email, birthday;
    const [createUser] =  useMutation(CREATE_NEW_USER);

    return (
        <section>
            <form onSubmit={ e => {
                e.preventDefault();

                createUser( 
                    {variables: {userName: userName.value, firstName:firstName.value, lastName: lastName.value, phoneNumber: phoneNumber.value, email: email.value, birthday: birthday.value 
                    }})
            }}>
                <label for="userName">Username: </label>
                <input ref={value => userName = value} id='userName'></input> <br/>

                <label for="firstName">First name: </label>
                <input ref={value => firstName = value} id='firstName'></input> <br/>

                <label for="lastName">Last name: </label>
                <input ref={value => lastName = value} id='lastName'></input> <br/>

                <label for="phoneNumber">Phone Number: </label>
                <input ref={value => phoneNumber = value} id='phoneNumber'></input> <br/>

                <label for="email">Email address:</label>
                <input ref={value => email = value} id='email'></input> <br />

                <label for="birthday">Birth date: </label>
                <input ref={value => birthday = value} id='birthday'></input> <br/>

                <button type="submit">Create User</button>
            </form>
        </section>
    )
}

export default UpdateUserData;