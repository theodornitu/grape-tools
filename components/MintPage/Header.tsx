//From Giants libs
import { useAuth } from "@elrond-giants/erd-react-hooks/dist"
import { ITransactionProps } from "@elrond-giants/erd-react-hooks/dist/types";
import { useTransaction } from "../../hooks/useTransaction";
import { authPath } from "../../utils/routes";

//NextJs
import Link from "next/link";
import Image from 'next/image'

//React
import { useEffect, useState } from "react";
import React from 'react';

//Components
import Card from './Card';
import Alert from './Alert';
import Grape from './Grape';
import Tooltip from "./Tooltip";

export default function Header() {
  //OpenAI 
  const [value, setValue] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [generated, setGenerated] = useState(false);
  const [isImgProcessing, setImgProcessing] = useState(false);

  const [getImgBase64 , setImgBase64] = useState('');

  //Elrond Blockchain
  const receiver_address = "erd1gjynzd6d9dwa76cyg078srj25a5kc3lgt2utac3hz8ezyxl4k22qc0efa4";

  const { authenticated } = useAuth();
  const { whenCompleted, makeTransaction } = useTransaction();

  const [egldPrice, setEgldPrice] = useState(0);
  const [txValue, setTxValue] = useState(0);

  const [isTxProcessing, setTxProcessing] = useState(false);
  const [isTxSuccessful, setTxSuccessful] = useState(Boolean);

  const {address, balance} = useAuth();
  
  //Generate Image
  const generateImageTx = async () => {
    var txObject; 
    //Prepare tx data
    const txData: ITransactionProps = {
      receiver: receiver_address,
      data: "generate",
      gasLimit: 13_000_000,
      value: txValue,
    };

    if(value != "") //Make sure no empty caption
      if(txValue > 0) //Make sure no compute issues appear
      {
        setTxProcessing(true);
        setImgProcessing(true);
        txObject = await makeTransaction(txData);
      }
      else
        alert("An error has occured, no transaction broadcasted!")
    else
      alert("Image description cannot be empty!");

      const txHash = String(txObject?.hash);
      const txResult = await whenCompleted(txHash, {interval: 2000});
      if (txResult.status.isExecuted()) {
        setTxProcessing(false);
        generateImage(); //Only generate image after tx is successful
      }
  };

  const generateImage = async () => {
    setPrompt(value);
    
    const response = await fetch('/api/imageGeneration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: value }),
    });
  const data = await response.json();
  setValue('')
  setGenerated(true);
  setImgProcessing(false);
  setImgUrl(data.result.data[0].url); 

  };
  // End of Generate image

  //Handle input change in text form
  const handleInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    }, []
  );

  //Get EGLD Price for Generate
  useEffect(() => {
    fetch('https://api.elrond.com/economics')
      .then((response) => response.json())
      .then((data) => {
        setEgldPrice(data.price);
      })
      .catch((err) => {
        console.log(err.message);
      });
    });
    
  //Compute EGLD value for 0.2$ generation cost
  useEffect(() => {
    if(egldPrice != null)
      setTxValue(0.2/egldPrice);
   });

   useEffect(() => {
    if(isImgProcessing == true)
      setImgUrl("loading.gif");
   });

  // const handleKeyDown = React.useCallback(
  //   async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === 'Enter') {
  //       setPrompt(value);
  //       setCompletion('Loading...');
  //       const response = await fetch('/api/completion', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ text: value }),
  //       });
  //       const data = await response.json();
  //       setValue('');
  //       console.log("Response");
  //       console.log(response);
  //       setCompletion(data.result.choices[0].text); //
  //     }
  //   }, [value]);

  //Insert img in db
  const insertImg = async (imgUrl: string, wallet: string, caption: string) => {
    const response = await fetch('/api/insertNewImg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: imgUrl, walletAddress: wallet, imageCaption: caption}),
    });
  const data = await response.json();  
  };

  const getImg = async () => {
    const response = await fetch('/api/getImg', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const imgData = await response.json();
  // setImgBase64(imgData.result.requests.image);
  };

  useEffect(() => {
    getImg();
    selectAll();
   },[]);

  const insertImgAsync = async () => {
    const urlCustom = "https://media.istockphoto.com/id/1158975684/photo/grapes-red-grape-grape-branch-isolated-on-white.jpg?s=612x612&w=0&k=20&c=9A8zhyTwckgPjTbIZUm_9DDJEWKJqBp1p2f0YqZ2FQA=";
    insertImg(urlCustom, "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqplllst6969", "Test6");
  }

  const selectAll = async () => {
    const response = await fetch('/api/selectAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  const resp = await response.json();
  // console.log(resp);
  };

  return (
    <>
      <section>
        <div className="relative flex items-center p-0 overflow-hidden bg-transparent bg-center bg-cover min-h-75-screen">
          <div className="container z-10">
            <Alert />
            
            
            <button 
              className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-3.5xl cursor-pointer bg-gradient-to-tl from-violet-600 to-violet-300 text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
              onClick={insertImgAsync}
            >
              Debug insert
            </button>
            {/* <img src={getImgBase64}></img> */}


            <div className="flex flex-wrap mt-20 mb-24 sm-max:mt-0">
              <div className="flex flex-col w-full mt-12 max-w-full px-3 ml-10 sm-max:mt-5 sm-max:ml-0 md:flex-0 shrink-0 md:w-10/12 xl:w-4/12">
                <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                  <div className="pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                    <h1 className="text-slate-800">Curious?</h1>
                    <h1 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-violet-600 to-violet-300 bg-clip-text">
                      Tell me what you want 
                    </h1>
                    <input value={value} onChange={handleInput} type="text" placeholder="Describe the image you want to generate" className="focus:shadow-soft-primary-outline focus:shadow-violet-300 pl-2 pr-2 py-2 w-full text-sm leading-5.6 ease-soft appearance-none rounded-lg border border-solid border-violet-300 bg-white bg-clip-padding font-normal text-slate-800 outline-none transition-all placeholder:italic placeholder:text-gray-500 focus:border-violet-300 focus:outline-none"></input>   
                  </div>
                  <div className="">
                    <div className="flex flex-wrap mt-0">
                      <div className="max-w-full text-center mt-5 mb-5">
                        {authenticated ? (
                          <button
                            className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-3.5xl cursor-pointer bg-gradient-to-tl from-violet-600 to-violet-300 text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
                            onClick={generateImageTx}
                          >
                            {isTxProcessing ? (
                              <>
                                Processing
                              </>
                            ) : (
                              <>
                                Generate
                              </>
                            )}
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
                          <Card />
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
