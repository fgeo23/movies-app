import './App.scss';
import { Routes, Route } from "react-router-dom";
import Main from './components/Main/Main';
import Favorites from './components/Favorites/Favorites';
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function toggleFavorite(movieID) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
      favorites = [];
    }
    if (favorites.indexOf(movieID) === -1) {
      favorites.push(movieID);
    } else {
      favorites.splice(favorites.indexOf(movieID), 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  function checkIfFav(movieID) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites && favorites.indexOf(movieID) > -1) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const url = `https://api.tvmaze.com/search/shows?q=${query}&key=${process.env.REACT_APP_TMDB_KEY}`
    // const url = `https://api.themoviedb.org/3/search/company?api_key=10aece0f7ac21cea368256df65318351&query=${query}&page=1`;

    const fetchData = async () => {
      if (query !== '') {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setResults(json);
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main updateSearch={setQuery} results={results} toggleFavorite={toggleFavorite} checkIfFav={checkIfFav} />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
