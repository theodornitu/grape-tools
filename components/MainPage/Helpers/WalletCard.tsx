//React
import React from 'react';

//Modules and components
import Tooltip from "./Tooltip";
import Elrond from "./media/Elrond";
import {denomination} from "../../../config"
import {denominate} from "../../../utils/economics";

//Giants
import AccountBalance from "@elrond-giants/erd-react-hooks/dist/AccountBalance";

//Icons Font Awesome
import {FaRegQuestionCircle, FaQuestion} from 'react-icons/fa'

const Separator = <div className="w-px bg-violet-300" style={{background:"radial-gradient(circle at center, rgb(168 184 216) 0, rgb(245 243 255) 100%)"}}></div>;

interface cardData {
    walletAddress: string;
    walletCredits: number;
    walletBalance: AccountBalance;
}

export default function Card(props: cardData) {    
    //Various consts
    const showChars = 4;

    // console.log("denomination: " + denomination);
    // console.log(props.walletBalance);
    // console.log("walletBalance: " + props.walletBalance);
    // console.log("walletBalance_denominateFunc: " + denominate(String(props.walletBalance),4));

    //Process Account Balance
    // const sBalance = String(props.walletBalance);
    // console.log("balance as string: " + sBalance);
    // const balance_denominated_full = [sBalance.slice(0,sBalance.length-denomination), ".", sBalance.slice(sBalance.length-denomination)].join(''); //Add separator
    // console.log("balance denomi as string: " + balance_denominated_full);
    // const balanceIntCount = balance_denominated_full.indexOf('.'); //Determine integer digits
    // const balance_denominated = balance_denominated_full.substring(0,balanceIntCount + 2) //Show integer digits + . + one more digit

    const balance_denominated = denominate(String(props.walletBalance),2);

    //Process Account address + explorer
    const explorerLink = process.env.NEXT_PUBLIC_NETWORK_EXPLORER_ADDRESS + "/accounts/" + props.walletAddress;
    const smallAddress = props.walletAddress!.substring(0,showChars) + "\u2026" + props.walletAddress!.substring((props.walletAddress!.length-showChars),props.walletAddress!.length);

    return (
        <>
            <div className="relative flex flex-col min-w-0 mb-6 bg-violet-50 shadow-soft-xl rounded-lg bg-clip-border">
                <div className="flex justify-center px-2 py-2 sm-max:px-2">
                    <div className="flex flex-wrap">
                        {/* Wallet address*/}
                        <div className="flex-none max-w-full px-6 sm-max:px-3">
                            <div>
                                <p className="mb-0 font-normal leading-normal text-sm">address</p>
                                <h6 className="mb-0">
                                    <a className="hover:underline" target="_blank" rel="noreferrer" href={explorerLink}>{smallAddress}</a>
                                </h6>
                            </div>
                        </div>
                        {Separator}
                        {/* Wallet balance in Grape Credits */}
                        <div className="flex-none max-w-full px-6 sm-max:px-3">
                            <div>
                                <p className="mb-0 font-normal leading-normal text-sm inline-block">
                                    credits 
                                </p>
                                    <Tooltip tooltip="Credits are used to pay for image generations">
                                        <FaRegQuestionCircle 
                                            className="-mt-0.5 ml-0.75 fill-violet-300 text-3  hover:cursor-pointer"
                                        />
                                    </Tooltip>
                                
                                <h6 className="mb-0">
                                    {props.walletCredits}
                                </h6>                       
                            </div>
                        </div>
                        {Separator}
                        {/* Wallet balance in EGLD */}
                        <div className="flex-none max-w-full px-6 sm-max:px-3">
                            <div>
                                <p className="mb-0 font-normal leading-normal text-sm">balance</p>
                                <h6 className="mb-0">
                                    {String(balance_denominated)}
                                    <Elrond />
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
  }