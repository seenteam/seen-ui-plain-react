import React, {useState} from 'react'
import { useQuery} from "@apollo/client";
import { GET_USER_POSTS } from '../../queries/queries';

const UserPosts = () => {
  const [query, setQuery] = useState(1)
  const { loading, error, data } = useQuery(GET_USER_POSTS(query));


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const check = () => {
    console.log(data)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setQuery(e.target.value || 1)
    return query
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
        {data.user.posts.map(post => <p>{post.content}</p>)}
     </div>
   )
 };

export default UserPosts;
