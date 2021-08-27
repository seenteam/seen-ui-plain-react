import Feed from '../../components/Feed/Feed.js'
import SearchBar from '../../components/SearchBar/SearchBar.js'
import SearchResults from '../../components/SearchResults/SearchResults.js'
import NavBar from '../../components/NavBar/NavBar.js'
import Header from '../../components/Header/Header.js'

import './App.css';

const App = () => {
  return (
    <main>
      <Header />
      <SearchBar />
      <SearchResults />
      <Feed />
      <NavBar />
    </main>
  );
}

export default App;
