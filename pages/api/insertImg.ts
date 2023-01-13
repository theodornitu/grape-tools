import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const dbQuery = await db
           .collection("users")
           .find({})
           .toArray();

    console.log(dbQuery);

       res.json(dbQuery);
   } catch (e) {
       console.error(e);
   }
};