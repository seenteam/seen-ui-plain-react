import React, {useState, useEffect, useContext} from 'react'
import { useQuery, useMutation } from "@apollo/client";
import Followers from '../Followers/Followers.js'
import Post from '../Post/Post.js'
import * as gql from '../../queries/queries';
import './UserPosts.css'
import UserContext from '../UserProfile/UserContext.js';
import Loading from '../Loading/Loading.js'

// const dayjs = require('dayjs')
// const LocalizedFormat = require('dayjs/plugin/localizedFormat')
// dayjs.extend(LocalizedFormat)

const UserPosts = () => {

  const value = useContext(UserContext);

  const [query, setQuery] = useState(1)
  const [clicked, setClicked] = useState(false)
  const { loading, error, data } = useQuery(gql.GET_USER_POSTS(value));

  const [deletePost] = useMutation(gql.DELETE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(value) }],
  });

  useEffect(() => {
    setClicked(false)
  }, [data])

  if (loading) return <Loading loading={loading} />;
  if (error) return <p>Error :(</p>;
  //
  const check = (data) => {
    console.log(data)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setQuery(e.target.value || 1)
    return query
  }

  const removePost = (postId) => {
    setClicked(true)
    deletePost({
      variables: {
        'postId': postId
      },
    })
  }

   return  (
     <section className="posts-container">
       <h2>Feed</h2>
        {!!data && [...data.user.posts].sort((a, b) => parseInt(b.id) - parseInt(a.id)).map((post, index) => <div key={index}>
          <Post id={post.id} content={post.content} created={post.createdAt} currentUser={value} user={value} />

          <button
            disabled={clicked}
            onClick={() => removePost(post.id)}>Delete Post</button>
        </div>)}
     </section>
   )
 };

export default UserPosts;
