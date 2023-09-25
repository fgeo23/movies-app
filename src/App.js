import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import Favorites from './components/Favorites/Favorites'
import Header from './components/Header/Header'
import { useEffect, useState } from 'react'

function App() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    // Favorites functionality to be moved into a Context API
    // Toggles a favorite on a movie or show
    function toggleFavorite(movieID) {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if (!favorites) {
            favorites = []
        }
        if (favorites.indexOf(movieID) === -1) {
            favorites.push(movieID)
        } else {
            favorites.splice(favorites.indexOf(movieID), 1)
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    // Checks if the item is already using the favorite
    function checkIfFav(movieID) {
        let favorites = JSON.parse(localStorage.getItem('favorites'))
        if (favorites && favorites.indexOf(movieID) > -1) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        // Could also use an API key from the .env file, not needed since we use tvmaze which doesn't require a key
        const url = `https://api.tvmaze.com/search/shows?q=${query}`
        // const url = `https://api.themoviedb.org/3/search/company?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}&page=1`;

        // Gets the results and stores them in the state, sends them to the Main component via props
        const fetchData = async () => {
            if (query !== '') {
                try {
                    const response = await fetch(url)
                    const json = await response.json()
                    setResults(json)
                } catch (error) {
                    console.log('error', error)
                }
            }
        }

        fetchData()
    }, [query])

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Main
                            updateSearch={setQuery}
                            results={results}
                            toggleFavorite={toggleFavorite}
                            checkIfFav={checkIfFav}
                        />
                    }
                />
                <Route
                    path="favorites"
                    element={
                        <Favorites
                            toggleFavorite={toggleFavorite}
                            checkIfFav={checkIfFav}
                        />
                    }
                />
            </Routes>
        </div>
    )
}

export default App
