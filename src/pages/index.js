import { useContext, useEffect, useState } from 'react';
import Home from '@/components/Home/Home';
import { PinataSDK } from 'pinata-web3';
import Mint from '@/components/Mint/Mint';
import { Navbar } from '@/components/Navbar/Navbar';
import { NearContext} from '@/wallets/near';
import { NftNearContract } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from '@/components/Explore/Explore';

const CONTARCT = NftNearContract;

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_KEY,
    pinataGateway: "beige-sophisticated-baboon-74.mypinata.cloud",
});

const IndexPage = () => {
    const { signedAccountId, wallet} = useContext(NearContext);
    const [route, setRoute] = useState("home");
    const [connected, setConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldFetchNfts, setShouldFetchNfts] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [canPlay, setCanPlay] = useState(false);
    const [url, setUrl] = useState(null);


    useEffect(() => {
        if(signedAccountId) {
            setConnected(true)
        } else {
            setConnected(false)
        }
    }, [signedAccountId])

    useEffect(() => {
        async function getAllNFTs() {
          if (connected && signedAccountId) { 
            try {
              setIsLoading(true);
              const count = await wallet.viewMethod({contractId: CONTARCT, method: "get_total_count"});    
              const nftData = [];
    
              for(let i =0; i<count; i++ ){
                const i_string = String(i);
                const tx = await wallet.viewMethod({contractId: CONTARCT, method: "get_nft", args: {index: i_string}});
                const data = await pinata.gateways.get(`https://beige-sophisticated-baboon-74.mypinata.cloud/ipfs/${tx.uri}`);
                const mergedNFTData = {
                  ...(typeof tx === 'object' ? tx : {}),
                  ...(typeof data.data === 'object' ? data.data : {}),
              };
          
                nftData.push(mergedNFTData);
              }
              console.log('NFTs fetched:', nftData);
              setNfts(nftData);
              setShouldFetchNfts(false);
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching NFTs:', error);
              toast.error("Error fetching NFTs", {
                position: "top-center"
              })
            }
          }
        }
        getAllNFTs();
      }, [shouldFetchNfts, connected, signedAccountId]);


  const onRouteChange = (route) => {
    setRoute(route);
  };

  const mintNFTs = async (uri, price) => {
    if(!signedAccountId) return;
    try {
        const depositAmount = price * 1e24;
        console.log(depositAmount);
        const tx = await wallet.callMethod({
            contractId: CONTARCT,
            method: 'mint',
            args: {
                uri,
                price: depositAmount.toString()
            },
        });
        toast.success("NFT minted successfully", {
            position: "top-center"
          });
        setShouldFetchNfts(true);
        onRouteChange("explore");
    } catch (e) {
        console.log(e)
        toast.error('Error minting NFT:', {
            position: "top-center"
          });
    }
  }

  const uploadToPinata = async (file, name, description, price) => {
    if (!file) {
      throw new Error("File is required");
    }

    try {
      toast.info("Uploading video to IPFS", {
        position:"top-center"
      })
      const uploadImage = await pinata.upload.file(file);
      const metadata = await pinata.upload.json({
        name: name,
        description: description,
        video: `https://beige-sophisticated-baboon-74.mypinata.cloud/ipfs/${uploadImage.IpfsHash}`,
        price: price
      });

      return metadata.IpfsHash;
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      toast.error("Minting NFT failed.", {
        position: "top-center"
      });
      throw new Error("Upload to Pinata failed.");
    }
  };

  const handlePay = async (id, uri, price) => {
    if(!signedAccountId) return;
    try {
      const depositAmount = BigInt(price * 1000000000000000000000000);
      await wallet.callMethod({
        contractId: CONTARCT,
        method: 'watch',
        args: {
            index: id.toString()
          },
        deposit: depositAmount.toString()
      });

      toast.success("Please enjoy", {
        position: "top-center"
      });
      setCanPlay(true);
      setUrl(uri);
      setShouldFetchNfts(true);
    } catch (e) {
      console.log(e)
      toast.error('Error playing NFT:', {
        position: "top-center"
      });
    }
  }

  
  const handleCloseVideo = () => {
    setCanPlay(false);
    setUrl(null);
  }
  
  return (
    <>
        <ToastContainer />
        <Navbar onRouteChange={onRouteChange}/>
        {route === "home" ? (
                <Home onRouteChange={onRouteChange}/>
            ) : route === "explore" ? (
                <Explore nfts={nfts} isConnected={connected} isLoading={isLoading} canPlay={canPlay} handlePay={handlePay} url={url} handleCloseVideo={handleCloseVideo}/>
            ) : route === "mint" ? (
                <Mint uploadToPinata={uploadToPinata} mintNFT={mintNFTs} />
            ) : (
                <>Cannot find page</>
            )
        }
    </>
  );
};

export default IndexPage;
