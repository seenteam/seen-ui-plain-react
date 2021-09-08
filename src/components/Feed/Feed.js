import { useQuery, useMutation } from "@apollo/client";
import Loading from '../Loading/Loading.js'
import Post from '../Post/Post.js'
import * as gql from '../../queries/queries'
import './Feed.css'


const Feed = ({ user }) => {

  const UserPosts = useQuery(gql.GET_USER_POSTS(user))
  const GetPostsFromFollowing = useQuery(gql.GET_POSTS_FROM_FOLLOWING(user))


  const renderAllPosts = () => {
    if (UserPosts.data && GetPostsFromFollowing.data) {
      let relevantPosts = [...UserPosts.data.user.posts, ...GetPostsFromFollowing.data.getPostFromFixedFollowing, ...GetPostsFromFollowing.data.getPostFromFluxFollowing]
      let uniquePosts = [...new Set(relevantPosts)]
      let limited = uniquePosts.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1).slice(0, 40)
      return limited.map(post => <Post
        id={post.id}
        content={post.content}
        created={post.createdAt}
        user={user}
        />)
    }
  }

  return (
    <section className="feed-container">
    {renderAllPosts()}
    </section>
  )
}

export default Feed
