import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next';
import {GEN_TYPE_CREDITS, GEN_TYPE_EGLD, MAX_REQ_SIZE_FOR_BACKUP} from './../../../lib/grapedb';
import { MongoClient } from "mongodb";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
    try {
        // console.log("Image URL: " + String(req.body.imageUrl));
        // console.log("Image Caption: " + String(req.body.imageCaption));

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

        //DB specific vars
        var dbQuery;

        // console.log("reqSize: " + req.body.walletReqSize);

        //Decide if 15 images stored in db limit has been reached
        if(req.body.walletReqSize >= MAX_REQ_SIZE_FOR_BACKUP) {
            // console.log("Popping first request");
            dbQuery = await db.collection('users').updateOne({wallet: req.body.walletAddress}, {$pop: {requests: -1}});        
        }

        //Insert data into db depending on generation type
        if(req.body.genType == GEN_TYPE_CREDITS) {
            dbQuery = await db.collection('users')
                .updateOne({
                    wallet: req.body.walletAddress}, {
                        $inc: {credits: -1, reqSize: 1},
                        $push: {
                            requests: {
                                caption: req.body.imageCaption,
                                image: imgBase64
                            }
                        }
                    }
                );
        }
        else if(req.body.genType == GEN_TYPE_EGLD) {
            dbQuery = await db.collection('users')
                .updateOne({
                    wallet: req.body.walletAddress}, {
                        $inc: {reqSize: 1},
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