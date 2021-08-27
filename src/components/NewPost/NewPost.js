import './NewPost.css'
const NewPost = ({visible, setVisibility}) => {
  return (
    <section className={!visible ? "make-post hidden" : "make-post"}>

    </section>
  )
}

export default NewPost
