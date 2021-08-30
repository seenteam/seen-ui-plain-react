import { useQuery} from "@apollo/client";
import { GET_USER_POSTS } from '../../queries/queries';

const UserPosts = () => {
  const { loading, error, data } = useQuery(GET_USER_POSTS(2));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const check = () => {
    console.log(data)
  }

   return  (
     <div>
        {data.user.posts.map(post => <p>{post.content}</p>)}
     </div>
   )
 };

export default UserPosts;
