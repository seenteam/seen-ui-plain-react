import React, {useState} from 'react'
import './NewPost.css'

const NewPost = ({visible, setVisibility, posts, setPosts}) => {

  const [postData, setPostData] = useState('')
  // const [posts, setPosts] = useState([])

  const submitForm = e => {
    e.preventDefault()
    setPosts([...posts, postData])
    setVisibility(false)
    setPostData('')
  }

  return (
    <section className={!visible ? "make-post hidden" : "make-post"}>
      <h2>Make a new Post</h2>
      <form onSubmit={submitForm}>
        <input
        type="text"
        placeholder="Make a new post"
        value={postData}
        onChange={e => setPostData(e.target.value)}
        />
      </form>
      <button onClick={submitForm}>Submit</button>
    </section>
  )
}

export default NewPost
