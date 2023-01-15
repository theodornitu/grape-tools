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

        //Check if wallet is part of db, project wallet without generated images to be fast
        const dbQuery = await db.collection('users').find({ wallet: req.body.walletAddress }).project({requests: 0}).toArray();

        if(dbQuery != null)
            res.status(200).json(dbQuery); // dbQuery != null -> Wallet part of db
        else
            res.status(201).json(dbQuery); // dbQuery == null -> Wallet not part of db -> Insert new user
    } 
    catch (e) {
        console.error(e);
   }
};