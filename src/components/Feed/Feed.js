import { useQuery } from "@apollo/client";
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
      let limited = uniquePosts.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1).slice(0, 35)
      return limited.map(post => <Post
        key={post.id}
        id={post.id}
        content={post.content}
        created={post.createdAt}
        user={user}
        currentUser={post.userId}
        feedUser={post.userId}
        feedUName={post.user}
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
