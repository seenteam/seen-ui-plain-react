import React, {useState, useEffect} from 'react'
import { useMutation } from "@apollo/client";
import * as gql from '../../queries/queries';

const UserPosts = ({data, loading, error, userID}) => {
  const [query, setQuery] = useState(1)
  const [clicked, setClicked] = useState(false)
  const [deletePost] = useMutation(gql.DELETE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(userID) }],
  });

  useEffect(() => {
    setClicked(false)
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  //
  const check = () => {
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
     <form onSubmit={handleSubmit}>
     <input
      value={query}
      placeholder="User ID"
      onChange={handleSubmit}
     />
     </form>
        {!!data && data.user.posts.map(post => <div>
          <p>{post.content}</p>
          <button
            disabled={clicked}
            onClick={() => removePost(post.id)}>Delete Post</button>
        </div>)}
     </div>
   )
 };

export default UserPosts;
