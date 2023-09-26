import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const RecentlyViewedContext = createContext();

// Define a custom hook to use the context
export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

// Create the provider component
export function RecentlyViewedProvider({ children }) {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const storedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentlyViewed(storedRecentlyViewed);
  }, []);

  // Add a movie to the recently viewed list
  const addRecentlyViewed = (movie) => {
    // Check if the movie is already in the list
    const isMovieInList = recentlyViewed.some((item) => item.id === movie.id);

    if (!isMovieInList) {
      // If the movie is not in the list, add it
      const updatedRecentlyViewed = [{
        id: movie.id,
        name: movie.name,
        image: movie.image,
      }, ...recentlyViewed.slice(0, 4)]; // Limit to the last 5 viewed items
      setRecentlyViewed(updatedRecentlyViewed);
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
    } else {
      // If the movie is in the list, move it to the first position
      const updatedRecentlyViewed = [
        {
          id: movie.id,
          name: movie.name,
          image: movie.image,
        },
        ...recentlyViewed.filter((item) => item.id !== movie.id).slice(0, 4), // Remove the existing entry and limit the list
      ];
      setRecentlyViewed(updatedRecentlyViewed);
      localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
    }
  };

  // Remove a movie from the recently viewed list
  const removeRecentlyViewed = (movieID) => {
    const updatedRecentlyViewed = recentlyViewed.filter((movie) => movie.id !== movieID);
    setRecentlyViewed(updatedRecentlyViewed);
    localStorage.setItem('recentlyViewed', JSON.stringify(updatedRecentlyViewed));
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed, removeRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}