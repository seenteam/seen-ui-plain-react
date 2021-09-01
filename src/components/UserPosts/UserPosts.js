import React, {useState, useEffect} from 'react'
import { useQuery, useMutation } from "@apollo/client";
import Followers from '../Followers/Followers.js'
import * as gql from '../../queries/queries';

const UserPosts = ({userID}) => {
  const [query, setQuery] = useState(1)
  const [clicked, setClicked] = useState(false)
  const { loading, error, data } = useQuery(gql.GET_USER_POSTS(userID));
  const [deletePost] = useMutation(gql.DELETE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(userID) }],
  });


  useEffect(() => {
    setClicked(false)
  }, [data])

  if (loading) return <p>Loading...</p>;
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
     <div>
       <h2>Feed</h2>
        {!!data && [...data.user.posts].sort((a, b) => parseInt(b.id) - parseInt(a.id)).map((post, index) => <div key={index}>
          <p>{post.content}</p>
          <button
            disabled={clicked}
            onClick={() => removePost(post.id)}>Delete Post</button>
        </div>)}
     </div>
   )
 };

export default UserPosts;
