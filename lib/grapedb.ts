export const GEN_TYPE_CREDITS = 0;
export const GEN_TYPE_EGLD = 1;
export const MAX_REQ_SIZE_FOR_BACKUP = 15;
export const STARTING_REQ_SIZE = 1;
export const STARTING_WALLET_CREDITS = 15;
export const STARTING_WALLET_CREDITS_BOT = 0;

// Check if wallet was used before with grape-tools
// Flow:
// 1. Request API checkNewWallet
// 2. Check if response status is 200 (valid wallet, existing in db)
//      2.a) status 200 -> Set response as json for further processing
//      2.b) status 201 -> Set data to null
// 3. Check if data is not null
//      3.a) data != null -> Set wallet credits with value from db (data.credits)
//      3.b) data == null -> Set wallet credits to 15 (default new grape user) and insert wallet in db
// 4. Return wallet credits for Wallet card
export async function checkNewWallet(walletAddress: string, walletNonce: number): Promise<Array<number>> {
    const response = await fetch('/api/db/checkNewWallet', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ walletAddress: walletAddress }),
    });

    var data;
    var returnArray: Array<number> = []; // [0] = wallet credits, [1] = wallet requests count

    // console.log("response status: " + String(response.status));

    if(response.status == 200)  //200 = Wallet part of DB
        data = await response.json();
    if(response.status == 201) //201 = Wallet not part of DB
        data = null;    

    // console.log("Data:");
    // console.log(data);

    if(data != null){
        // console.log("Getting credits from db");
        returnArray[0] = data.credits;
        returnArray[1] = data.reqSize;
    }
    if(data == null && response.status != 500) {
        // console.log("Inserting 15 credits in db");
        returnArray[0] = STARTING_WALLET_CREDITS;
        returnArray[1] = STARTING_REQ_SIZE;
        insertNewWallet(walletAddress, walletNonce);
    }

    // console.log("Wallet credits: " + String(walletCredits!));

    return returnArray;
}   

// Insert new client wallet into db
// Flow:
// 1. Request API insertNewWallet and send walletAddress and walletNonce to API
export async function insertNewWallet(walletAddress: string, walletNonce: number) {
    const response = await fetch('/api/db/insertNewWallet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress: walletAddress, walletNonce: walletNonce }),
    });
}

// Push new client generated image into db
// Flow:
// 1. Request API pushNewImage and send imageUrl, walletAddress, imageCaption to API
export async function pushNewImage(imgUrl: string, wallet: string, caption: string, genType: number, walletReqSize: number) {
    console.log("Wallet requests inside pushNewImage: " + walletReqSize);
    
    const response = await fetch('/api/db/pushNewImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: imgUrl, walletAddress: wallet, imageCaption: caption, genType: genType, walletReqSize: walletReqSize}),
      });
    const data = await response.json(); 
}
