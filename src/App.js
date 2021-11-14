import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { useWallet } from "./wallet.hook";
import { ConnectedContainer } from './components/ConnectedContainer.component'

// Constants
const TWITTER_HANDLE = "misomighty";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { walletAddress, connectWallet } = useWallet();

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
            <ConnectedContainer />
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
