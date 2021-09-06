import './Post.css'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from "@apollo/client";
import Loading from '../Loading/Loading.js'
import * as gql from '../../queries/queries'
const dayjs = require('dayjs')
const LocalizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(LocalizedFormat)

const Post = ({id, content, created, user, currentUser }) => {
  const [clicked, setClicked] = useState(false)

  const GetPostLikes = useQuery(gql.GET_POST_LIKES(id))

  useEffect(() => {
    setClicked(false)
  }, [GetPostLikes.data])

  const [likePost] = useMutation(gql.CREATE_LIKE, {
    refetchQueries: [{ query: gql.GET_POST_LIKES(id) }],
  });

  const [unlikePost] = useMutation(gql.DELETE_LIKE, {
    refetchQueries: [{ query: gql.GET_POST_LIKES(id) }],
  });

  if (GetPostLikes.loading) {
    return <Loading loading={GetPostLikes.loading} />
  }
  else {
    console.log('LIKES FOR POST', id, GetPostLikes.data)
  }

  const checkLikes = () => {
    // console.log('All post likes', GetPostLikes.data.postLikes, 'current id')
    let found = GetPostLikes.data.postLikes.find(like => like.id === currentUser)
    if (found) {
      return true
    }
    return false
  }

  const like = () => {
    setClicked(true)
    likePost({
      variables: {
        'userId': currentUser,
        'postId': id
      },
    })
  }

  const unlike = () => {
    return
  }

  const renderLikeBtn = () => {
    return <button disabled={clicked} onClick={like}>Like</button>
  }

  const renderUnLikeBtn = () => {
    return <button disabled={clicked} onClick={unlike}>Unlike</button>
  }

  const check = () => {
    console.log('POST ID', id, 'CURRENT USER', currentUser, 'equal', id === currentUser)
  }

  return (
    <div className="post-container">
      <p><strong>{content}</strong></p>
      <p>Posted {dayjs(created).format('LLL')}</p>
      <div className="likes-container">
        <p>{!!GetPostLikes.data && `${GetPostLikes.data.postLikes.length} Likes`}</p>
        <section>
          {!!(user !== currentUser) && <section>
            {check()}
            {!checkLikes() ? renderLikeBtn() : renderUnLikeBtn()}
            </section>}
        </section>
      </div>
    </div>
  )
}

export default Post
