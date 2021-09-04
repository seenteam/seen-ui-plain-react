import React, {useState, useEffect, useContext} from 'react'
import { useMutation } from "@apollo/client";
import * as gql from '../../queries/queries';

import './NewPost.css'
import UserContext from '../UserProfile/UserContext';

const NewPost = ({visible, setVisibility, data, setPosts }) => {

  // const [fetched, setFetched] = useState('')
  const value = useContext(UserContext);
  const [postData, setPostData] = useState('')
  const [answer, setAnswer] = useState('')
  const [isDisabled, setDisabled] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const maxLength = 420;
  const [charsLeft, setCharsLeft] = useState(maxLength);
  // const [posts, setPosts] = useState([])
  const [createPost] = useMutation(gql.CREATE_POST, {
    refetchQueries: [{ query: gql.GET_USER_POSTS(value) }],
  });

  useEffect(() => {
    setCharsLeft(maxLength - answer.length);
    }, [answer]);
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
      userId: value
    }
    createPost({
      variables: {
        content: postData,
        userId: value
      },
    })
    // setPosts([...data, newPost])
    setPostData('')
    // check(newPost)
    setAnswer('')
    setDisabled(true);
    setIsAnswered(true); 
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
            maxLength= {maxLength}
            onChange={e => {

              setAnswer(e.target.value);
            if (e.target.value.length){
                setDisabled(false);
            } 
            if (e.target.value.length === 0) {
                setDisabled(true);
            }
              setPostData(e.target.value)
            }}
            />
        </form>
        <button 
          className='submit-btn'
          disabled={isDisabled}
          onClick={submitForm}> SUBMIT 
        </button>
        <div className='char-counter'>
                chars left: {charsLeft}/{maxLength}
        </div>
      </div>
      }
    </section>
  )
}

export default NewPost
