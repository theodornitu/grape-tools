import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';

async function checkWalletExists(wallet: string) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const dbQuery = await db
        .collection('users')
        .find({"wallet": wallet}); 

    console.log("dbQuery");
    console.log(dbQuery);
    // return dbQuery.requests.image;
}

async function toDataURL_node(url: string) {
    let response = await fetch(url);
    let contentType = response.headers.get("Content-Type");
    let buffer = await response.arrayBuffer(); // buffer()
    // console.log("buffer");
    // console.log(buffer);
    // return "data:" + contentType + ';base64,' + buffer.toString('base64');
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   try {

    // checkWalletExists(req.body.wallet);

    //Get img from openAI URL and extract it's blob
    const response = await fetch(req.body.imageUrl);
    const imageBlob = await response.blob();
    
    //Convert blob to arrayBuffer and cast to string base64 format
    const buffer = Buffer.from(await imageBlob.arrayBuffer());
    const imgBase64 = "data:" + imageBlob.type + ";base64," + buffer.toString('base64');

    //Connect to db
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    //Insert data into db
    const dbQuery = await db
        .collection('users')
        .insertOne({
            wallet: req.body.walletAddress,
            credits: 100,
            requests: [
                { 
                    caption: req.body.imageCaption, 
                    image: imgBase64,
                }
            ]
        });

        console.log("Added to DB");
        res.json(dbQuery);
    } catch (e) {
        console.error(e);
   }
};