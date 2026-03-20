
import { getCryptoPrices,getCryptoBal,getWalletAddress,getWalletInfo } from '@/composables/requests/crypto'; // adjust path
import { getMyUserCard } from '@/composables/requests/card'; // adjust path
import { useStore } from '@/stores'; // your Pinia store
import { useNotify } from '@/composables/useNotify'; // optional toast

export const fetchCryptoPrices = async () => {
    const pinia = useStore();
    const notify = useNotify();

    // If already have data, no need to fetch again
    if (pinia.state.cryptoPrices && Object.keys(pinia.state.cryptoPrices).length > 0) return;

    try {
        pinia.state.isFetchingCrypto = true;

        const data = await getCryptoPrices();

        if (data.success) {
            // Save the fetched crypto prices in the store
            pinia.setCryptoPrices({ ...data.data });
        } else {
            // usetoast(data.message || 'Failed to fetch crypto prices', false);
            console.log("data.message || 'Failed to fetch crypto prices'")
        }

        pinia.state.isFetchingCrypto = false;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        // usetoast('Error fetching crypto prices', false);
        pinia.state.isFetchingCrypto = false;
    }
};


export const fetchCryptoBal = async () => {
    const pinia = useStore();
    const notify = useNotify();

    // If already have data, no need to fetch again
    // if (pinia.state.cryptoBalance && Object.keys(pinia.state.cryptoBalance).length > 0) return;

    try {
        pinia.state.isFetchingCryptobal = true;

        const data = await getCryptoBal();
        console.log('work here',data)

        if (data.success) {
            // Save the fetched crypto prices in the store
            pinia.setCryptoBalance({ ...data.data });
        } else {
            // usetoast(data.message || 'Failed to fetch crypto prices', false);
            console.log("data.message || 'Failed to fetch crypto prices'")
        }

        pinia.state.isFetchingCryptobal = false;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        // usetoast('Error fetching crypto prices', false);
        pinia.state.isFetchingCrypto = false;
    }
};

export const fetchWalletAddress = async (coin) => {
    const pinia = useStore();
    const notify = useNotify();

    // If already have data, no need to fetch again
    // if (pinia.state.cryptoBalance && Object.keys(pinia.state.cryptoBalance).length > 0) return;

    try {
        // pinia.state.isFetchingCryptobal = true;

        const data = await getWalletAddress(coin);
        console.log('work here',data)

        if (data.success) {
            // Save the fetched crypto prices in the store
            pinia.setWalletAddress({ ...data.data });
        } else {
            // usetoast(data.message || 'Failed to fetch crypto prices', false);
            console.log("data.message || 'Failed to fetch crypto prices'")
        }

        // pinia.state.isFetchingCryptobal = false;
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
        // usetoast('Error fetching crypto prices', false);
        // pinia.state.isFetchingCrypto = false;
    }
};

export const fetchMyUserCards = async () => {
    const pinia = useStore();
    const notify = useNotify();

    // If already have data, no need to fetch again
    // if (pinia.state.cryptoBalance && Object.keys(pinia.state.cryptoBalance).length > 0) return;

    try {
        // pinia.state.isFetchingCryptobal = true;

        const data = await getMyUserCard();
        console.log('work here',data)

        if (data.success) {
            // Save the fetched crypto prices in the store
            pinia.setcardDetails({ ...data.data.requests });
        } else {
            // usetoast(data.message || 'Failed to fetch crypto prices', false);
            console.log(data.message)
        }

        // pinia.state.isFetchingCryptobal = false;
    } catch (error) {
        console.error('Error ', error);
        // usetoast('Error fetching crypto prices', false);
        // pinia.state.isFetchingCrypto = false;
    }
};


export const fetchWalletInfo = async () => {
    const pinia = useStore()
    const notify = useNotify()

    const wallets =[
        {
          name: "1inch wallet",
          frontImage: "/wallet/1inch.jpg",
          backImage: "/wallet/1inch.jpg",
          hover: false,
        },
        {
          name: "Adex network",
          frontImage: "/wallet/adex.jpg",
          backImage: "/wallet/adex.jpg",
          hover: false,
        },
        {
          name: "Alice",
          frontImage: "/wallet/alice.jpg",
          backImage:  "/wallet/alice.jpg",
          hover: false,
        },
        {
          name: "Alpha",
          frontImage: "/wallet/alpha.jpg",
          backImage:  "/wallet/alpha.jpg",
          hover: false,
        },
        {
          name: "Argent",
          frontImage: "/wallet/arge.jpg",
          backImage:  "/wallet/arge.jpg",
          hover: false,
        },
        {
          name: "Atomic",
          frontImage: "/wallet/atomic.jpg",
          backImage: "/wallet/atomic.jpg",
          hover: false,
        },
        {
          name: "Authereum",
          frontImage: "/wallet/authereum.jpg",
          backImage: "/wallet/authereum.jpg",
          hover: false,
        },
        {
          name: "Bitpay",
          frontImage: "/wallet/bitpay.jpg",
          backImage:  "/wallet/bitpay.jpg",
          hover: false,
        },
        {
          name: "Binance Dex",
          frontImage: "/wallet/BNS.jpg",
          backImage: "/wallet/BNS.jpg",
          hover: false,
        },
        {
          name: "coin 98",
          frontImage: "/wallet/coin98.jpg",
          backImage: "/wallet/coin98.jpg",
          hover: false,
        },
        {
          name: "coinbase ",
          frontImage: "/wallet/coinbase.png",
          backImage: "/wallet/coinbase.png",
          hover: false,
        },
        {
          name: "coinomi ",
          frontImage: "/wallet/coinomi.jpg",
          backImage: "/wallet/coinomi.jpg",
          hover: false,
        },
        {
          name: "compound ",
          frontImage: "/wallet/compound.jpg",
          backImage: "/wallet/compound.jpg",
          hover: false,
        },
        {
          name: "crypto.com |Defi wallet ",
          frontImage: "/wallet/crypto.jpg",
          backImage: "/wallet/crypto.jpg",
          hover: false,
        },
        {
          name: "curve ",
          frontImage: "/wallet/curve.jpg",
          backImage: "/wallet/curve.jpg",
          hover: false,
        },
        {
          name: "cybavo wallet ",
          frontImage: "/wallet/cybavo.jpg",
          backImage: "/wallet/cybavo.jpg",
          hover: false,
        },
        {
          name: "d'cent ",
          frontImage: "/wallet/d'cent.jpg",
          backImage: "/wallet/d'cent.jpg",
          hover: false,
        },
        {
          name: "debank ",
          frontImage: "/wallet/debank.jpg",
          backImage: "/wallet/debank.jpg",
          hover: false,
        },
        {
          name: "dharma ",
          frontImage: "/wallet/dharma.jpg",
          backImage: "/wallet/dharma.jpg",
          hover: false,
        },
        {
          name: "dydx ",
          frontImage: "/wallet/dydx.jpg",
          backImage: "/wallet/dydx.jpg",
          hover: false,
        },
        {
          name: "Eidoo ",
          frontImage: "/wallet/Eidoo.jpg",
          backImage: "/wallet/Eidoo.jpg",
          hover: false,
        },
        {
          name: "ellipal ",
          frontImage: "/wallet/ellipal.png",
          backImage: "/wallet/ellipal.png",
          hover: false,
        },
        {
          name: "etherscan ",
          frontImage: "/wallet/etherscan.jpg",
          backImage: "/wallet/etherscan.jpg",
          hover: false,
        },
        {
          name: "gnosis ",
          frontImage: "/wallet/gnosis.jpg",
          backImage: "/wallet/gnosis.jpg",
          hover: false,
        },
        {
          name: "gridplud ",
          frontImage: "/wallet/gridplud.jpg",
          backImage: "/wallet/gridplud.jpg",
          hover: false,
        },
        {
          name: "huobi",
          frontImage: "/wallet/huobi.jpg",
          backImage: "/wallet/huobi.jpg",
          hover: false,
        },
        {
          name: "imToken",
          frontImage: "/wallet/imtoken.jpg",
          backImage: "/wallet/imtoken.jpg",
          hover: false,
        },
        {
          name: "ledger live",
          frontImage: "/wallet/ledger.png",
          backImage: "/wallet/ledger.png",
          hover: false,
        },
        {
          name: "local cryptos ",
          frontImage: "/wallet/localcryptos.jpg",
          backImage: "/wallet/localcryptos.jpg",
          hover: false,
        },
        {
          name: "loopring ",
          frontImage: "/wallet/loopring.jpg",
          backImage: "/wallet/loopring.jpg",
          hover: false,
        },
        {
          name: "maiar ",
          frontImage: "/wallet/maiar-dex.jpg",
          backImage: "/wallet/maiar-dex.jpg",
          hover: false,
        },
        {
          name: "math ",
          frontImage: "/wallet/math.jpg",
          backImage: "/wallet/math.jpg",
          hover: false,
        },
        {
          name: "my crypto ",
          frontImage: "/wallet/mycrypto.jpg",
          backImage: "/wallet/mycrypto.jpg",
          hover: false,
        },
        {
          name: "my key ",
          frontImage: "/wallet/mykey.jpg",
          backImage: "/wallet/mykey.jpg",
          hover: false,
        },
        {
          name: "nash ",
          frontImage: "/wallet/nash.jpg",
          backImage: "/wallet/nash.jpg",
          hover: false,
        },
        {
          name: "nomic ",
          frontImage: "/wallet/nomic.png",
          backImage: "/wallet/nomic.png",
          hover: false,
        },
        {
          name: "opensea ",
          frontImage: "/wallet/opensea.jpg",
          backImage: "/wallet/opensea.jpg",
          hover: false,
        },
      ];
  
    const normalize = (str) => str?.toLowerCase().trim()
  
    // 🔥 Create map from your local wallet list
    const walletImageMap = wallets.reduce((acc, w) => {
      acc[normalize(w.name)] = w.frontImage
      return acc
    }, {})

    // console.log(walletImageMap)
  
    try {
        const data = await getWalletInfo()
        console.log('jki')
  
      if (data.success) {
  
        // 👇 If API returns multiple wallets
        const enrichedWallets = data.data.wallets.map((wallet) => {
  
          const nameKey = normalize(wallet.name)
  
          return {
            ...wallet,
            image:
              walletImageMap[nameKey] || "/wallet/default.png"
          }
        })
  
        // Save to store
        pinia.setwalletInfo(enrichedWallets)
  
      } else {
        console.log("Failed to fetch wallet info")
      }
  
    } catch (error) {
      console.error("Error fetching wallet info:", error)
    }
  }