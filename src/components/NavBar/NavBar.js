import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <footer>
      <ul>
        <Link to="/"><li>Feed</li></Link>
        <li>Search</li>
        <li>Post</li>
        <li>Flux</li>
        <Link to="/profile"><li>Profile</li></Link>
      </ul>
    </footer>
  )
}

export default NavBar
