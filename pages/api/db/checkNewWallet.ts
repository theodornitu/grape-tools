import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        //Connect to db
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        //Check if wallet is part of db
        const dbQuery = await db.collection('users').findOne({ wallet: req.body.walletAddress });
       
        // console.log(dbQuery);

        if(dbQuery != null)
            res.status(200).json(dbQuery); // dbQuery != null -> Wallet part of db
        else
            res.status(201).json(dbQuery); // dbQuery == null -> Wallet not part of db -> Insert new user
    } 
    catch (e) {
        console.error(e);
   }
};