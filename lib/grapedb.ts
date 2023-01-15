export const GEN_TYPE_CREDITS = 0;
export const GEN_TYPE_EGLD = 1;

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
export async function checkNewWallet(walletAddress: string, walletNonce: number): Promise<number> {
    const response = await fetch('/api/db/checkNewWallet', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ walletAddress: walletAddress }),
    });

    var data;
    var walletCredits: number;

    // console.log("response status: " + String(response.status));

    if(response.status == 200) //200 = Wallet part of DB
        data = await response.json();
    if(response.status == 201) //201 = Wallet not part of DB
        data = null;    

    // console.log("Data:");
    // console.log(data);

    if(data != null)
        walletCredits = await Promise.resolve(data.credits);
    if(data = null && response.status != 500) {
        walletCredits = 15;
        insertNewWallet(walletAddress, walletNonce);
    }
    else
        walletCredits = 0;

    // console.log("Wallet credits: " + String(walletCredits));

    return walletCredits;
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
export async function pushNewImage(imgUrl: string, wallet: string, caption: string, genType: number) {
    const response = await fetch('/api/db/pushNewImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: imgUrl, walletAddress: wallet, imageCaption: caption, genType: genType}),
      });
    const data = await response.json(); 
}
