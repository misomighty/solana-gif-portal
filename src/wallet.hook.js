import { useEffect, useState } from "react";

const checkForWallet = async () => {
    try {
        const { solana } = window;

        if(solana && solana.isPhantom) {

            const response = await solana.connect();
            return response.publicKey.toString();

        } else {
            alert('Solana object not found! Get a Phantom Wallet 👻')
        }
    } catch (error) {
        console.log(error);
    }
}

const useWallet = () => {
    const [ walletAddress, setWalletAddress ] = useState(null);

    useEffect(() => {
        const onLoad = async () => {
            const address = await checkForWallet();
            setWalletAddress(address)
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, [])

    return { walletAddress, connectWallet: checkForWallet }
}

export { useWallet };