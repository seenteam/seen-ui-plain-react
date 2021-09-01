import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({newPost, setNewPost}) => {

  const togglePost = () => {
    (!newPost) ? setNewPost(true) : setNewPost(false)
  }

  return (
    <footer>
      <ul>
        <Link to="/"><li><img src="https://img.icons8.com/wired/64/000000/activity-feed-2.png"/></li></Link>
        <Link to="/search-page"><li><img src="https://img.icons8.com/pastel-glyph/64/000000/search--v2.png"/></li></Link>
        <li className={(!newPost) ? 'new-post' : 'yellow'} onClick={togglePost}><img src="https://img.icons8.com/wired/64/000000/plus.png"/></li>
        <Link to="followers"><li><img src="https://img.icons8.com/dotty/80/000000/sine.png"/></li></Link>
        <Link to="/profile"><li><img src="https://img.icons8.com/wired/64/000000/circled-user.png"/></li></Link>
      </ul>
    </footer>
  )
}

export default NavBar
