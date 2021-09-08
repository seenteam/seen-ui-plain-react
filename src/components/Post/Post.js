import './Post.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from "@apollo/client";
import Loading from '../Loading/Loading.js'
import * as gql from '../../queries/queries'
const dayjs = require('dayjs')
const LocalizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(LocalizedFormat)

const Post = ({id, content, created, user, currentUser, clickedDelete, removePost, feedUser, feedFName, feedLName, feedUName }) => {
  const [clicked, setClicked] = useState(false)

  const GetPostLikes = useQuery(gql.GET_POST_LIKES(id))

  useEffect(() => {
    setClicked(false)
  }, [GetPostLikes.data, user])

  const [likePost] = useMutation(gql.CREATE_LIKE, {
    refetchQueries: [{ query: gql.GET_POST_LIKES(id) }],
  });

  const [unlikePost] = useMutation(gql.DELETE_LIKE, {
    refetchQueries: [{ query: gql.GET_POST_LIKES(id) }],
  });

  const [deletePost] = useMutation(gql.DELETE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(currentUser) }],
  });

  if (GetPostLikes.loading) {
    return <Loading loading={GetPostLikes.loading} />
  }

  const checkLikes = () => {
    let found = GetPostLikes.data.postLikes.find(like => like.id === user.toString())
    if (found) {
      return true
    }
    return false
  }

  const like = () => {
    console.log('current user', user, 'current post id', id)
    setClicked(true)
    likePost({
      variables: {
        'userId': user,
        'postId': id
      },
    })
  }

  const unlike = () => {
    setClicked(true)
    unlikePost({
      variables: {
        'userId': user,
        'postId': id
      },
    })
  }

  const renderLikeBtn = () => {
    return <button disabled={clicked} onClick={like}>Like</button>
  }

  const renderUnLikeBtn = () => {
    return <button disabled={clicked} onClick={unlike}>Unlike</button>
  }

  const renderDelete = () => {
    return <button
      disabled={clickedDelete}
      onClick={() => removePost(id)}>Delete Post</button>
  }

  return (
    <div className="post-container">
      <p><strong>{content}</strong></p>
      {console.log("CREATED AT", created)}
      <p>Posted {dayjs(created).format('LLL')}</p>
      {!!feedUser && <div>
        <Link to={`/users/${feedUser}`}>@{feedUName.userName}</Link>
      </div>}
      <div className="likes-container">
        <p>{!!GetPostLikes.data && `${GetPostLikes.data.postLikes.length} Likes`}</p>
        <section>
          {!!(user === currentUser) && renderDelete()}
          {!!(user !== currentUser) && <section>
            {!checkLikes() ? renderLikeBtn() : renderUnLikeBtn()}
            </section>}
        </section>
      </div>
    </div>
  )
}

export default Post
