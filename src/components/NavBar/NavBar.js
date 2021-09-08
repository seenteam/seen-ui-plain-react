import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <Link to="/"><li><FontAwesomeIcon icon="home" /></li></Link>
        <Link to="/search-page"><li><FontAwesomeIcon icon="search" /></li></Link>
        <li className={(!newPost) ? 'new-post' : 'yellow'}><button onClick={togglePost} onKeyPress={handleKeypress}><FontAwesomeIcon icon="plus" /></button></li>
        <Link to="/followers"><li><FontAwesomeIcon icon="atom" /></li></Link>
        <Link to="/profile"><li><FontAwesomeIcon icon={['far', 'user-circle']} /></li></Link>
      </ul>
    </footer>
  )
}

export default NavBar
