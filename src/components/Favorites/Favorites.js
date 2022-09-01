// import MovieItem from '../Movie-Item/MovieItem';
import './Favorites.scss';
import { useEffect, useState } from 'react';
import MovieItem from '../Movie-Item/MovieItem';

function Favorites(props) {
    const [results, setResults] = useState([]);
    const favorites = JSON.parse(localStorage.getItem('favorites'));

    useEffect(() => {
        const url = `https://api.tvmaze.com/shows/`
        // const url = `https://api.themoviedb.org/3/search/company?api_key=10aece0f7ac21cea368256df65318351&query=${query}&page=1`;

        const fetchData = async () => {
            const data = [];
            for (let fav of favorites) {
                try {
                    const response = await fetch(url + fav);
                    const json = await response.json();
                    data.push(json);
                } catch (error) {
                    console.log("error", error);
                }
            }
            setResults(data);
        };

        fetchData();
    }, [favorites]);
    return (
        <div className="Favorites">
            { results.length > 0 ?
                results.map((result, index) => {
                    return <MovieItem key={index} movie={result} checkIfFav={props.checkIfFav} toggleFavorite={props.toggleFavorite} />;
                })
                :
                "Please search for movies or TV shows and select your favorites to be displayed here"
            }
        </div>
    );
}

export default Favorites;
