import React from 'react'

const GifGrid = ({ gifs }) => {
    return (
      <div className="gif-grid">
        {gifs && gifs.map((gif, index) => (
          <div className="gif-item" key={index}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    )
  };

  export { GifGrid };