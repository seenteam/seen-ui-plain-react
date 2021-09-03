import React, {useState, useEffect} from 'react'
import { useMutation } from "@apollo/client";
import * as gql from '../../queries/queries';

import './NewPost.css'

const NewPost = ({visible, setVisibility, data, setPosts, userID }) => {

  // const [fetched, setFetched] = useState('')
  const [postData, setPostData] = useState('')
  // const [posts, setPosts] = useState([])
  const [createPost] = useMutation(gql.CREATE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(userID) }],
  });
  // const check = (post) => {
  //   console.log('DATA BEING PASSED', data, 'NEW DATA', post)
  //   console.log('WHAT I WANT', [...fetched, post])
  // }

  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted) {
  //     if (data) setFetched(data)
  //   }
  //   return () => mounted = false;
  // }, [])

  const submitForm = e => {
    e.preventDefault()
    // setPosts([...posts, postData])
    if (!postData) return
    setVisibility(false)
    let newPost = {
      content: postData,
      userId: userID
    }
    createPost({
      variables: {
        content: postData,
        userId: userID
      },
    })
    // setPosts([...data, newPost])
    setPostData('')
    // check(newPost)
  }

  return (
    <section className={!visible ? "make-post hidden" : "make-post"}>
      {
        !!visible && <div>

        <button onClick={() => setVisibility(false)}>Close</button>
        <h2>Make a new Post</h2>
        <form onSubmit={submitForm}>
          <textarea
            type="text"
            placeholder="Up to 420 characters"
            value={postData}
            onChange={e => setPostData(e.target.value)}
            />
        </form>
        <button onClick={submitForm}>Submit</button>
      </div>
      }
    </section>
  )
}

export default NewPost
