import React from 'react'

const GifGrid = ({ gifs }) => {
    return (
      <div className="gif-grid">
        {gifs && gifs.map((gif, index) => (
          <div className="gif-item" key={index}>
            <img src={gif.gifLink} alt={gif} />
            <p>{gif.userAddress}</p>
          </div>
        ))}
      </div>
    )
  };

  export { GifGrid };