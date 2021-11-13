import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useState } from 'react'
import { useWallet } from "./wallet.hook";
import { GifGrid } from "./components/GifGrid.component";
import { Input } from "./components/Input.component";

// Constants
const TWITTER_HANDLE = "misomighty";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { walletAddress, connectWallet } = useWallet();
  const [inputValue, setInputValue ] = useState('');
  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
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
              <GifGrid />
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
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
