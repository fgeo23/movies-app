import React from 'react';
import { useRecentlyViewed } from '../../RecentlyViewedContext';

import './RecentlyViewed.scss';

function RecentlyViewed(props) {
  const { recentlyViewed, removeRecentlyViewed } = useRecentlyViewed();

  return (
    <div className='Recently-Viewed--Wrapper'>
      <h2>Recently Viewed</h2>
      <div className='Recently-Viewed'>
        {recentlyViewed.map((movie) => (
          <div key={movie.id} className='Recently-Viewed--Item'>
            <div className='Recently-Viewed--Item--Title' onClick={() => props.updateSearch(movie.name)}>{movie.name}</div>
            <div className='Recently-Viewed--Item--Image'>
              <img src={movie.image.medium} alt="" />
              <button className="Recently-Viewed--Item--Button" onClick={() => removeRecentlyViewed(movie.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
