import { headers } from "../config";
import { getSign } from "../mod/getSign";

export async function getCollections(token: string): Promise<Collections> {

    headers.time = (new Date().getTime() / 1000).toFixed(0);
    headers.signature = getSign("collections", headers.time, headers.nonce, "GET");
    headers.authorization = token;

    console.log(headers.time);
    console.log(headers.signature);
    console.log(headers.authorization);
    return await fetch(`https://picaapi.picacomic.com/collections`, {
        headers
    }).then(res => {
        return res.text();
    }).then(text => {
        //console.log(text);
        return JSON.parse(text);
    })
}