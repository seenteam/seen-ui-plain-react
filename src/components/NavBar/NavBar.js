import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({newPost, setNewPost}) => {

  const togglePost = () => {
    (!newPost) ? setNewPost(true) : setNewPost(false)
  }

  return (
    <footer>
      <ul>
        <Link to="/"><li>Feed</li></Link>
        <Link to="/search-page"><li>Search</li></Link>
        <li className="new-post" onClick={togglePost}>Post</li>
        <li>Flux</li>
        <Link to="/profile"><li onClick={() => setNewPost(false)}>Profile</li></Link>
      </ul>
    </footer>
  )
}

export default NavBar
