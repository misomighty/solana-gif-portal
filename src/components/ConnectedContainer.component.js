import React, { useEffect, useState } from 'react'
import { GifGrid } from "./GifGrid.component";
import { Input } from "./Input.component";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Provider, web3, Program } from "@project-serum/anchor";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../idl.json";
import kp from '../keypair.json'

const network = clusterApiUrl("devnet");
const opts = { preflightCommitment: "processed" };

const arr = Object.values(kp._keypair.secretKey);
const secret = new Uint8Array(arr)
const baseAccount = web3.Keypair.fromSecretKey(secret)
const programID = new PublicKey(idl.metadata.address);

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(
    connection,
    window.solana,
    opts.preflightCommitment
  );
  return provider;
};

const ConnectedContainer = ({  walletAddress }) => {
    const [gifList, setGifList] = useState(null);
    const [inputValue, setInputValue ] = useState('');
  
    const getGifList = async () => {
      try {
        const provider = getProvider();
        const programID = new PublicKey(idl.metadata.address);
        const program = new Program(idl, programID, provider);
        const account = await program.account.baseAccount.fetch(
          baseAccount.publicKey
        );
  
        console.log("Got the account", account);
        setGifList(account.gifList);
      } catch (error) {
        console.log("Error in getGifs: ", error);
      }
    };
  
    const createGifAccount = async () => {
      const provider = getProvider();
      const programID = new PublicKey(idl.metadata.address);
      const program = new Program(idl, programID, provider);
      try {
        console.log("ping");
        await program.rpc.startStuffOff({
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
          signers: [baseAccount],
        });
        console.log(
          "Created a new BaseAccount w/ address:",
          baseAccount.publicKey.toString()
        );
        return getGifList();
      } catch (error) {
        console.log("Error creating BaseAccount account:", error);
      }
    };
    
    const sendGif = async (inputValue) => {
      if (inputValue.length === 0) {
        console.log("No gif link given!")
        return
      }
      console.log('Gif link:', inputValue);
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
    
        await program.rpc.addGif(inputValue, {
          accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
          },
        });
        console.log("GIF successfully sent to program", inputValue)
    
        await getGifList();
      } catch (error) {
        console.log("Error sending GIF:", error)
      }
    };

    useEffect(() => {
        if (!walletAddress) return undefined
        getGifList().then(res => console.log(res));
        console.log(gifList)
    }, [walletAddress])

    if (gifList === null) {
        return (
          <div className="connected-container">
            <button className="cta-button submit-gif-button" onClick={() => createGifAccount().then(res => setGifList(res))}>
              Do One-Time Initialization For GIF Program Account
            </button>
          </div>
        )
      } else {
          return (
              <div className="connected-container">
                    <Input inputValue={inputValue} setValue={setInputValue} setList={setGifList} sendGif={sendGif} getGifList={getGifList} />
                    <GifGrid gifs={gifList} />
                  </div>
          );
      }
      } 

export { ConnectedContainer };