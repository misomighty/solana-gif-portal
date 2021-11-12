import { useEffect } from "react";

const checkForWallet = async () => {
    try {
        const { solana } = window;

        if(solana && solana.isPhantom) {
            console.log('Phantom wallet found');
        } else {
            alert('Solana object not found! Get a Phantom Wallet 👻')
        }
    } catch (error) {
        console.log(error);
    }
}

const useWallet = () => {
    useEffect(() => {
        const onLoad = async () => {
            await checkForWallet();
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, [])
}

export { useWallet };