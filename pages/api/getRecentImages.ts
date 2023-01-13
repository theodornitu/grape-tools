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
           .find()
           .limit(6)
           .toArray();

    // console.log(dbQuery)

    res.status(200).json({ result: dbQuery });
} catch (e) {
       console.error(e);
   }
};