import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useState, useEffect } from 'react'
import { useWallet } from "./wallet.hook";
import { GifGrid } from "./components/GifGrid.component";
import { Input } from "./components/Input.component";

// Constants
const TWITTER_HANDLE = "misomighty";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { walletAddress, connectWallet } = useWallet();
  const [inputValue, setInputValue ] = useState('');
  const [gifList, setGifList] = useState([
    'https://media.giphy.com/media/cfuL5gqFDreXxkWQ4o/giphy.gif',
    'https://media.giphy.com/media/l2JJDdD7cv4xdGGis/giphy.gif',
    'https://media.giphy.com/media/2x0VePimPaFJDpGZ7H/giphy.gif',
    'https://media.giphy.com/media/dIVa0pwco4Mj5rQ7gy/giphy.gif'
  ]);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching JIF list...');
      
      // Call Solana program here.
  
      // Set state
      setGifList(gifList);
    }
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 Kitty JIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && (
            <button
              className="cta-button connect-wallet-button"
              onClick={connectWallet}
            >
              Connect to Wallet
            </button>
          )}
          {walletAddress && (
            <div className="connected-container">
              <Input inputValue={inputValue} setValue={setInputValue} />
              <GifGrid gifs={gifList} />
            </div>
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
