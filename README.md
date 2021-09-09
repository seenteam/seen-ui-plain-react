# Seen
<h1> <img src="https://user-images.githubusercontent.com/70605985/132547211-88e98808-a89a-4c66-ac04-5c4d25598e00.png" alt="seen logo"
width="100" height="auto"/>
</h1>

## [View our app in action](https://seen-ui-plain-react.vercel.app/) 
## [View the backend repo](https://github.com/seenteam/seen-be)

### Table of Contents
- [Overview](#overview)
- [Features](#features)
- [In use](#in-use)
- [Set up](#set-up)
- [Tools & Technologies](#tools--technologies)
- [Future Additions](#future-additions)
- [Contributors](#contributors)

## Overview

Seen is a social media platform that serves as an answer to "What if you started a social media platform with 10 followers, then woke up the next day with 1 million?" Users have two tiers of followers that are distinct from one another - Fixed followers & following, which are users you choose to follow, and Flux followers & following which are a set of users that you wake and interact with for the day. Each day, Flux followers are redistributed among the userbase randomly; one user might get 80% of the userbase as part of their Flux followers, another 60%, and so on. Everybody has a chance to go viral. 

If a User is deemed viral and holds a large portion of the userbase as their flux following for the day, their following has the opportunity to see this viral User's content then decide if they wish to keep up with them, in which case they can choose to follow them and become a part of their fixed followers, which will never be redistributed or altered unless the user decides to unfollow. 

## Features

- UI that accesses data from [our backend repo](https://github.com/seenteam/seen-be) to generate a social media experience that allows users to make posts, like and dislike posts, follow and unfollow users
- Every 24 hours, flux followers are distributed across the userbase randomly so that each day there are new viral users that can experience a large audience
- Users are greeted by their Feed, which consists of posts from them, their Fixed/Flux following (who the user follows), and are ordered by most recent post
- Users can search for other users in the userbase and visit their profile
- Users can see who the viral users are for the day
- Users can view their Fixed/Flux followers and following and visit each users profile
- User can make a new post that gets added to their feed, other users' feeds (provided they are following them) and their user profile
- User profile shows a User's Fixed/Flux followers and posts, along with their name and username
- A logged in user is able to edit their profile details and delete their own posts

### Check out the deployed app below 
[![Deploy Seen](https://vercel.com/button)](https://seen-ui-plain-react.vercel.app/)

## In use


#### Users can scroll through a feed of posts from users they're following
![User Feed Demo](https://media.giphy.com/media/oxAtlR0bNHwKhScFcO/giphy.gif?cid=790b7611d3f2f752a3a52ed14a3dfc8bce031a8bbada0ee2&rid=giphy.gif&ct=g)
<br/>

#### Users can like or dislike posts
![Like/Dislike Demo](https://media.giphy.com/media/kzioEhNutNQx8X21GL/giphy.gif?cid=790b7611c303bafb3b4a53d3f2a66e1d993361adafd93119&rid=giphy.gif&ct=g)
<br/>

#### Users can search for others and visit their profiles
![User Search Demo](https://media.giphy.com/media/TbYX0oHL375nbgz1tu/giphy.gif?cid=790b7611210823e9e66f1389958113ad92e62c0e71bb31a9&rid=giphy.gif&ct=g)
<br/>

#### Users can checkout our their Fixed/Flux followers and navigate to their profiles
![User Profile Demo](https://media.giphy.com/media/mEd7ARoWx4FdqoQjxt/giphy.gif?cid=790b761111818e598c377385688e462e7ddc65cb1be7269d&rid=giphy.gif&ct=g)
<br/>

#### Users can create a post of up to 70 characters
![Create Post Demo](https://media.giphy.com/media/xOhP4jlppd78Cl9gLa/giphy.gif?cid=790b76113373b9f400afe61e4bf53ce49f12c883c98fdef8&rid=giphy.gif&ct=g)
<br/>

#### Users can delete their own post
![Delete Post Demo](https://media.giphy.com/media/M1rJuMRTheGiOMobEm/giphy.gif?cid=790b761147fe148b237c237f089ea8a465df3674ddd161de&rid=giphy.gif&ct=g)
<br/>

#### Users can see all of their different followers and types at a glance
![Follow Demo](https://media.giphy.com/media/gxrbrSdkFx4JsIG3jb/giphy.gif?cid=790b7611e9829cbe0e3d09ee8ce0d09d2d0ec4f30b19fd67&rid=giphy.gif&ct=g)
<br/>

## Set Up

Clone this repo down, and `cd` into it.

Run `npm install`

Run `npm start`

## Tools & Technologies
<p align="left">
  <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="javascript" />
  <img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" alt="html5"/>
  <img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Github" />
  <img src="https://img.shields.io/badge/Context%20API-%20-blue" alt="context-api" />
  <img src="https://img.shields.io/badge/CIRCLECI-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white" alt="Circle CI" />
</p>
<p align="left">
  <img src="https://img.shields.io/badge/-React-cyan" alt="React" />
  <img src="https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router" alt="React Router" />
  <img src="https://img.shields.io/badge/-Cypress-gray" alt="Cypress" />
  <img src="https://img.shields.io/badge/-dayJS-yellowgreen" alt="dayJS" />
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="vercel" />
  <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql" alt="apollo graphQL" />
</p>

## Future Additions
  - Add countdown for flux follower redistribution
  - Updated styling
  - React Native App with publish to the App store
  - Update flux-follwers distribution algorithm
  - Incorporate active-storage for image uploading
  - Utilize AWS for Hosting
  - Create Log-in functionality
  - Utilize Google Oauth/ Apple authentication schemes for users
  - Add post comment functionality
  - Complete liked posts functionality
  - Add block functionality
  - Make waves more turbulent based on how viral you are for the day
  - Add profile settings functionality to edit profile page
  - Add profile photos for users
  - Update styling for viral users / top flux users
  - Some aspect direct messaging
  - One mass broadcast to all flux followers DMs!

## Contributors
<table>
     <tr>
          <td>Shayan Golafshani<a href="https://github.com/shayan-golafshani">GH</td>
    </tr>
    
 <td><img src="https://avatars.githubusercontent.com/u/70605985?v=4" alt="Shayan GH img"
width="150" height="auto" /></td>
  </tr>
     <tr>
          <td>Regina Casias<a href="https://github.com/rcasias">GH</td>
    </tr>
    
 <td><img src="https://avatars.githubusercontent.com/u/54419240?v=4" alt="Regina GH img"
width="150" height="auto" /></td>
  </tr>
    <tr>
          <td>Zach Trokey<a href="https://github.com/ztrokey">GH</td>
    </tr>
    
 <td><img src="https://avatars.githubusercontent.com/u/20480167?v=4" alt="Zach GH img"
width="150" height="auto" /></td>
  </tr>
     <tr>
        <td> Bobby Vasquez <a href="https://github.com/hoomberto">GH</td>
    </tr>
    </tr>
    <td><img src="https://avatars.githubusercontent.com/u/78388491?v=4" alt="Bobby GH img"
 width="150" height="auto" /></td>
</table>



