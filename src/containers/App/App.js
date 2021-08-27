import Feed from '../../components/Feed/Feed.js'
import SearchBar from '../../components/SearchBar/SearchBar.js'
import NavBar from '../../components/NavBar/NavBar.js'

import './App.css';

const App = () => {
  return (
    <main>
      <SearchBar />
      <Feed />
      <NavBar />
    </main>
  );
}

export default App;
