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

        // console.log(dbQuery.length);
        // console.log(dbQuery[0]);
        // console.log(dbQuery[0].credits);

        if(dbQuery.length != 0) 
            res.status(200).json(dbQuery[0]); // dbQuery != null -> Wallet part of db
        else
            res.status(201).json(dbQuery[0]); // dbQuery == null -> Wallet not part of db -> Insert new user
    } 
    catch (e) {
        console.error(e);
   }
};