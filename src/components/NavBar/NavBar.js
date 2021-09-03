import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({newPost, setNewPost}) => {

  const togglePost = () => {
    (!newPost) ? setNewPost(true) : setNewPost(false)
  }

  const handleKeypress = e => {
    if (e.keyCode === 13) togglePost();
};

  return (
    <footer>
      <ul>
        <Link exact to="/"><li><img src="https://img.icons8.com/wired/64/000000/activity-feed-2.png"/></li></Link>
        <Link exact to="/search-page"><li><img src="https://img.icons8.com/pastel-glyph/64/000000/search--v2.png"/></li></Link>
        <li className={(!newPost) ? 'new-post' : 'yellow'}><button onClick={togglePost} onKeyPress={handleKeypress}><img src="https://img.icons8.com/wired/64/000000/plus.png"/></button></li>
        <Link exact to="/followers"><li><img src="https://img.icons8.com/dotty/80/000000/sine.png"/></li></Link>
        <Link exact to="/profile"><li><img src="https://img.icons8.com/wired/64/000000/circled-user.png"/></li></Link>
      </ul>
    </footer>
  )
}

export default NavBar
