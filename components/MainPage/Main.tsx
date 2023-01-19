//From Giants libs
import { useAuth } from "@elrond-giants/erd-react-hooks/dist/useAuth/useAccount";
import { ITransactionProps } from "@elrond-giants/erd-react-hooks/dist/types";
import { useTransaction } from "../../hooks/useTransaction";
import { authPath } from "../../utils/routes";

//From grapedb libs
import {checkNewWallet, pushNewImage} from './../../lib/grapedb';
import {GEN_TYPE_CREDITS, GEN_TYPE_EGLD, STARTING_REQ_SIZE, STARTING_WALLET_CREDITS} from './../../lib/grapedb';

import {generateImage} from './../../lib/grapeimg';

//NextJs
import Link from "next/link";

//React
import { useEffect, useState } from "react";
import React from 'react';

//Components
import WalletCard from './Helpers/WalletCard';
import AlertBanner from './Helpers/AlertBanner';
import Grape from './Helpers/media/Grape';
import Tooltip from "./Helpers/Tooltip";

// ------------------------------------------------------------------------------------------------------

export default function Header() {
  // ------------- OpenAI  ------------- //
  const [imgUrl, setImgUrl] = useState('');
  const [generated, setGenerated] = useState(false);
  const [captionText, setCaptionText] = useState('');
  const [isImgProcessing, setImgProcessing] = useState(false);

  // ------------- Blockchain ------------- //
  const [egldPrice, setEgldPrice] = useState(0);
  const { authenticated } = useAuth();
  const { whenCompleted, makeTransaction } = useTransaction();

  // ------------- Client wallet ------------- //
  const {address, balance, nonce} = useAuth();
  const [walletCredits, setWalletCredits] = useState(0);
  const [walletReqSize , setWalletReqSize] = useState(0);

  // ------------- Generate Img Transaction consts ------------- //
  const [generateTrigger, setGenerateTrigger] = useState(0);
  const [txValue, setTxValue] = useState(0);
  const receiver_address = "erd1gjynzd6d9dwa76cyg078srj25a5kc3lgt2utac3hz8ezyxl4k22qc0efa4";
  const txData: ITransactionProps = {
    receiver: receiver_address,
    data: "generate",
    gasLimit: 13_000_000,
    value: txValue,
  };

  // ------------------------------------------------------------------------------------------------------

  // ------------- Grape functions ------------- //
  const generateImageTx = async () => {
    var txObject; 
    if(captionText != "") //Make sure no empty caption
      if(txValue > 0) //Make sure no compute issues appear
        txObject = await makeTransaction(txData);
      else
        alert("An error has occured, no transaction broadcasted!")
    else
      alert("Image description cannot be empty!");

    const txHash = String(txObject?.hash);
    const txResult = await whenCompleted(txHash, {interval: 2000});
    if (txResult.status.isExecuted())
      callImgGenAPI(GEN_TYPE_EGLD);
  };

  // ------------------------------------------------------------------------------------------------------

  // ------------- API Call wrappers ------------- //
  // Handle Image generation API call for OpenAI
  // genType = 0 -> Credits
  // genType = 1 -> Egld
  const callImgGenAPI = async (genType: number) => {
    setImgProcessing(true);
    const generatedImage = await generateImage(captionText);
    setGenerated(true);
    setImgProcessing(false);
    setImgUrl(generatedImage);
    // console.log("Pushing new image from url: " + generatedImage);
    // console.log("wallet address: " + String(address));
    // console.log("Using gen type: " + String(genType));
    pushNewImage(generatedImage, address!, captionText, genType, walletReqSize);
    setWalletReqSize(walletReqSize + 1);
  }
  // Handle checkNewWallet API call for MongoDB
  const callCheckNewWalletAPI = async () => {
    const dbResponse = await checkNewWallet(address!, nonce);
    // console.log("Wallet credits: " + dbResponse[0]);
    // console.log("Wallet requests: " + dbResponse[1]);
    setWalletCredits(dbResponse[0]);
    setWalletReqSize(dbResponse[1]);
  }

  // ------------- Input fields handlers ------------- //
  //Handle input change in text form
  const handleInputFormChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCaptionText(e.target.value);
    }, []
  );

  //Handle Generate button click
  const handleGenerateImg = async () => {
    setGenerateTrigger(generateTrigger + 1);
    if(walletCredits > 0) {
      // console.log("Generating with EGLD");
      setWalletCredits(walletCredits-1);
      callImgGenAPI(GEN_TYPE_CREDITS)
    }
    else {
      // console.log("Generating with EGLD");
      generateImageTx();
    }
  }

  // ------------- Runtime updating stuff ------------- //
  // Get EGLD Price for Generate
  useEffect(() => {
    fetch('https://api.elrond.com/economics')
      .then((response) => response.json())
      .then((data) => {
        setEgldPrice(data.price);
        setTxValue(0.2/data.price);
        // console.log("EGLD Price: " + String(data.price));
        // console.log("TX Value: " + String(0.2/data.price));

      })
      .catch((err) => {
        console.log(err.message);
      });
    }, [generateTrigger, authenticated]);

  // Set loading gif
  useEffect(() => {
    if(isImgProcessing == true)
      setImgUrl("loading.gif");
   }, [isImgProcessing]);

  // On Auth -> Check if wallet is part of DB. If not -> Add it. If nonce > 25 offer 15 credits.
  useEffect(() => {
    // console.log("authenticated: " + String(authenticated));
    if(authenticated) {
      if(nonce > 25) {
          // console.log("Nonce: " + String(nonce));
          callCheckNewWalletAPI();
      }
      else
        alert("Your wallet is not valid for the 15 free credits. \nIt is either new (no valid TXs) or blacklisted. \nGenerated images will not be backed up by Grape.")
    }
  },[authenticated])

  return (
    <>
      <section>
        <div className="relative flex items-center p-0 overflow-hidden bg-transparent bg-center bg-cover min-h-75-screen">
          <div className="container z-10">
            <AlertBanner />
            <div className="flex flex-wrap mt-20 mb-24 sm-max:mt-0">
              <div className="flex flex-col w-full mt-12 max-w-full px-3 ml-10 sm-max:mt-5 sm-max:ml-0 md:flex-0 shrink-0 md:w-10/12 xl:w-4/12">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                  <div className="pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                    <h1 className="text-slate-800">Curious?</h1>
                    <h1 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-violet-600 to-violet-300 bg-clip-text">
                      Tell me what you want 
                    </h1>
                    <input value={captionText} onChange={handleInputFormChange} type="text" placeholder="Describe the image you want to generate" className="focus:shadow-soft-primary-outline focus:shadow-violet-300 pl-2 pr-2 py-2 w-full text-sm leading-5.6 ease-soft appearance-none rounded-lg border border-solid border-violet-300 bg-white bg-clip-padding font-normal text-slate-800 outline-none transition-all placeholder:italic placeholder:text-gray-500 focus:border-violet-300 focus:outline-none"></input>   
                  </div>
                  <div className="">
                    <div className="flex flex-wrap mt-0">
                      <div className="max-w-full text-center mt-5 mb-5">
                        {authenticated ? (
                          <button
                            className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-3.5xl cursor-pointer bg-gradient-to-tl from-violet-600 to-violet-300 text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
                            onClick={handleGenerateImg}
                          >
                                Generate
                          </button>
                        ) : (
                          <button className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-3.5xl cursor-pointer bg-gradient-to-tl from-violet-600 to-violet-300 text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">
                            <Link href={authPath}>Generate</Link>
                          </button>
                        )}
                        {authenticated ? (
                          <Tooltip tooltip="Coming soon!">
                            <button
                              className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-3.5xl cursor-pointer bg-gradient-to-tl from-violet-600 to-violet-300 text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
                              // onClick={}
                            >
                              Mint NFT
                            </button>
                          </Tooltip>
                        ) : (
                          <button className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-3.5xl cursor-pointer bg-gradient-to-tl from-violet-600 to-violet-300 text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs">
                            <Link href={authPath}>Mint NFT</Link>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-full text-center">
                        {authenticated ? (
                        <>
                          <WalletCard walletAddress={address!} walletBalance={balance} walletCredits={walletCredits} />
                        </>
                        ) : (
                          <>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-full m-auto px-3 lg:flex-0 shrink-0 md:w-12/12 xl:w-7/12">
                <div className="flex justify-center ">
                  {isImgProcessing || generated ? (
                    <img 
                      src={imgUrl} 
                      className="rounded-4 shadow-soft-xl backdrop-blur-2xl backdrop-saturate-200 w-120 h-120 sm-max:w-80 sm-max:h-80"
                    ></img>
                  ) : (
                    <Grape />
                  )} 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
