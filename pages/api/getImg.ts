import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const dbQuery = await db
           .collection("users")
           .findOne({"wallet": "erd1gjynzd6d9dwa76cyg078srj25a5kc3lgt2utac3hz8ezyxl4k22qc0efa4"});

    res.status(200).json({ result: dbQuery });
} catch (e) {
       console.error(e);
   }
};