import { useEffect, useState } from "react";

const checkForWallet = async (setAddress) => {
    try {
        const { solana } = window;

        if(solana && solana.isPhantom) {

            const response = await solana.connect();
            setAddress(response.publicKey.toString())

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
            await checkForWallet(setWalletAddress);
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, [])

    return { walletAddress, connectWallet: checkForWallet }
}

export { useWallet };