import React from 'react'

const GifGrid = ({ gifs }) => {
    return (
      <div className="gif-grid">
        {gifs && gifs.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    )
  };

  export { GifGrid };