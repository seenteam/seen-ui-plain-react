import React, {useState, useEffect} from 'react'
import { useMutation } from "@apollo/client";
import * as gql from '../../queries/queries';

const UserPosts = ({data, loading, error, userID}) => {
  const [query, setQuery] = useState(1)
  // const { loading, error, data } = useQuery(GET_USER_POSTS(query));
  const [deletePost] = useMutation(gql.DELETE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(userID) }],
  });
  // useEffect(() => {
  //   setQuery(1)
  // }, [updated])


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

  const removePost = (e, postId) => {
    e.target.setAttribute('disabled', true)
    e.target.innerText = 'Deleting...'
    console.log(postId, 'ID TYPE:', typeof(postId))
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
          <button onClick={e => removePost(e, post.id)}>Delete Post {post.id}</button>
        </div>)}
     </div>
   )
 };

export default UserPosts;
