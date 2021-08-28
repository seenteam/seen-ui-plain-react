import Feed from '../Feed/Feed.js'
import SearchBar from '../SearchBar/SearchBar.js'
import SearchResults from '../SearchResults/SearchResults.js'
import Header from '../Header/Header.js'

const SplashPage = ({query, setQuery, queryResults, login}) => {
  return (
    <main>
      <Header />
      <Feed />
      {/* <button onClick={login}>Login</button> */}
    </main>
  )
}

export default SplashPage