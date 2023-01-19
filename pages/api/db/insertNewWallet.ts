import clientPromise, {MongoDbSchema} from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import {GEN_TYPE_CREDITS, GEN_TYPE_EGLD, STARTING_REQ_SIZE, STARTING_WALLET_CREDITS, STARTING_WALLET_CREDITS_BOT} from './../../../lib/grapedb';

var insertCredits = 0;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   try {
    // console.log("walletAddress: " + req.body.walletAddress);
    // console.log("walletNonce: " + req.body.walletNonce);

    //Connect to db
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    //Select how many credits to add to new wallet
    if(req.body.walletNonce > 25)
        insertCredits = STARTING_WALLET_CREDITS;
    else
        insertCredits = STARTING_WALLET_CREDITS_BOT;

    // console.log("walletCreditsToBeSet: " + String(insertCredits));

    //Populate the schema with content
    const user: MongoDbSchema = {
        wallet: req.body.walletAddress,
        credits: insertCredits, 
        reqSize: STARTING_REQ_SIZE,
        requests: [
            {
                caption: '',
                image: '',
            }
        ]
    }

    // console.log("insertNewWalletData: ");
    // console.log(user);

    //Insert data into db
    const dbQuery = await db.collection('users').insertOne(user);

    res.status(200).json(dbQuery);
   } catch (e) {
       console.error(e);
   }
};