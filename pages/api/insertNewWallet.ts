import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

async function checkWalletExists(wallet: string) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const dbQuery = await db
        .collection("users")
        .find({"wallet": wallet})
        .toArray();

    console.log(dbQuery);
    // return dbQuery.requests.image;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   try {

    //Get img from openAI URL
    const response = await fetch(req.body.imgUrl);
    //Extract img blob
    const imageBlob = await response.blob();
    //Convert blob to buffer
    const buffer = Buffer.from(await imageBlob.text());
    //Convert buffer to img in base64
    const imgBase64 = "data:" + imageBlob.type + ";base64," + buffer.toString('base64');

    checkWalletExists(req.body.wallet);

    //Connect to db
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    //Insert data into db
    const dbQuery = await db
        .collection('users')
        .insertOne({
            wallet: 'erd1gjynzd6d9dwa76cyg078srj25a5kc3lgt2utac3hz8ezyxl4k22qc0efa4',
            credits: 100,
            requests: { 
                caption: "A dog with fluffy ears and red nose", 
                image: imgBase64,
            }
        });

       res.json(dbQuery);
   } catch (e) {
       console.error(e);
   }
};