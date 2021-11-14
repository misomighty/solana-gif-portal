import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { baseAccount, getProvider } from "./provider";
import idl from "./idl.json";

const programID = new PublicKey(idl.metadata.address);

const getGifList = async (setGifList) => {
  const provider = getProvider();
      const program = new Program(idl, programID, provider);
  try {
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log("Got the account", account);
    setGifList(account.gifList);
  } catch (error) {
    console.log("Error in getGifs: ", error);
  }
};

export { getGifList };
