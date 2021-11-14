import { Program } from "@project-serum/anchor";
import { getProvider, baseAccount } from "./provider";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getGifList } from "./getGifList";
import idl from "./idl.json";

const programID = new PublicKey(idl.metadata.address);

const createGifAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      console.log("ping")
      await program.rpc.startStuffOff({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount]
      });
      console.log("Created a new BaseAccount w/ address:", baseAccount.publicKey.toString())
      return getGifList();
  
    } catch(error) {
      console.log("Error creating BaseAccount account:", error)
    }
  }

  export { createGifAccount };