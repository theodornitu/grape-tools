import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import {GEN_TYPE_CREDITS, GEN_TYPE_EGLD} from './../../../lib/grapedb';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    try {
        console.log("Image URL: " + String(req.body.imageUrl));
        console.log("Image Caption: " + String(req.body.imageCaption));

        //Get img from openAI URL and extract it's blob
        const response = await fetch(req.body.imageUrl);
        const imageBlob = await response.blob();

        //Convert blob to arrayBuffer and cast to string base64 format
        const buffer = Buffer.from(await imageBlob.arrayBuffer());
        const imgBase64 = "data:" + imageBlob.type + ";base64," + buffer.toString('base64');

        // console.log("Image Base64: " + imgBase64);

        //Connect to db
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);

        var dbQuery;
        //Insert data into db depending on generation type
        if(req.body.genType == GEN_TYPE_CREDITS) {
            dbQuery = await db.collection('users')
                .updateOne({
                    wallet: req.body.walletAddress}, {
                        $inc: { credits: -1 },
                        $push: {
                            requests: {
                                caption: req.body.imageCaption,
                                iamge: imgBase64
                            }
                        }
                    }
                );
        }
        else if(req.body.genType == GEN_TYPE_EGLD) {
            dbQuery = await db.collection('users')
                .updateOne({
                    wallet: req.body.walletAddress}, {
                        $push: {
                            requests: {
                                caption: req.body.imageCaption,
                                iamge: imgBase64
                            }
                        }
                    }
                );
        }
        res.status(200).json(dbQuery);
    } 
    catch (e) {
        console.error(e);
    }
};