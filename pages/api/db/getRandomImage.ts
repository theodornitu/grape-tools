import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
   try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // const dbQuery = await db
    //        .collection("users")
    //        .find() 
    //        .sort({_id:-1})
    //     //    .project({requests: { $slice: -1}})
    //        .project({caption: 1,requests: {$elemMatch:  {image: { $ne : ""}}}})
    //        .limit(4)
    //        .toArray();

    const dbQuery = await db
           .collection("users")
           .aggregate([ 
                { $match: { reqSize: { $ne: 1 } } }, 
                { $sample: { size: 1 } }, 
                { $project: { _id: 0,  requests: { $slice: [ "$requests", -1] } } } 
            ])
            .toArray();


    // console.log(dbQuery[0].requests[0]);

    res.status(200).json({ result: dbQuery[0].requests[0] });
} catch (e) {
       console.error(e);
   }
};

//db.users.find({}, { requests: {$slice: -1}, caption: 1, requests: { $elemMatch: { image: { $ne: ""}}}})
//db.users.find({},{ requests: { $elemMatch: { image: { $ne: "" } } }, caption: 1}).skip(3)

//db.users.find({requests: { $elemMatch: { image: { $ne: ""}}}}, { requests: {$slice: -1}}).limit(1) -> Best so far
//db.users.aggregate([ {$match: { reqSize: { $ne: 1 } } }, { $sample: { size: 1 } }, { $project: { _id: 0,  requests: { $slice: [ "$requests", -1]}}} ]) -> TO BE USED