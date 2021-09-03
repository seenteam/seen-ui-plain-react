import './Post.css'
const dayjs = require('dayjs')
const LocalizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(LocalizedFormat)

const Post = ({content, created}) => {
  return (
    <div className="post-container">
      <p><strong>{content}</strong></p>
      <p>Posted {dayjs(created).format('LLL')}</p>
      <div className="likes-container">
        <p># Likes</p>
        <button>Like</button>
      </div>
    </div>
  )
}

export default Post
