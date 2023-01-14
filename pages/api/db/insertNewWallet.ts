import clientPromise, {MongoDbSchema} from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

const STARTING_CREDITS_BOT = 0;
const STARTING_CREDITS_CLIENT = 15;

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
        insertCredits = STARTING_CREDITS_CLIENT;
    else
        insertCredits = STARTING_CREDITS_BOT;
    // console.log("walletCreditsToBeSet: " + String(insertCredits));

    //Populate the schema with content
    const user: MongoDbSchema = {
        wallet: req.body.walletAddress,
        credits: insertCredits, 
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