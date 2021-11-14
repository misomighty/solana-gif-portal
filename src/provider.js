import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Provider, web3 } from "@project-serum/anchor";

const network = clusterApiUrl("devnet");
const opts = { preflightCommitment: "processed" };

const { Keypair } = web3;
let baseAccount = Keypair.generate();

const getProvider = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(
    connection,
    window.solana,
    opts.preflightCommitment
  );
  return provider;
};

export { getProvider, baseAccount };
