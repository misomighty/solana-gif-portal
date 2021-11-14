import React, { useEffect, useState } from 'react'
import { getGifList } from '../getGifList'
import { GifGrid } from "./GifGrid.component";
import { Input } from "./Input.component";

const ConnectedContainer = () => {
    const [gifList, setGifList] = useState([]);
    const [inputValue, setInputValue ] = useState('');

    useEffect(() => {
        getGifList().then(res => setGifList(res));
    }, [])

    return (
        <div className="connected-container">
              <Input inputValue={inputValue} setValue={setInputValue} />
              <GifGrid gifs={gifList} />
            </div>
    );
}

export { ConnectedContainer };