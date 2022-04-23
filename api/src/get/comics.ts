import { headers } from "../config";
import { getSign } from "../mod/getSign";

export async function getComics(token: string, id: string): Promise<Comics> {

    console.log(id)

    headers.time = (new Date().getTime() / 1000).toFixed(0);
    headers.signature = getSign(`comics/${id}`, headers.time, headers.nonce, "GET");
    headers.authorization = token;

    console.log(headers.time);
    console.log(headers.signature);
    console.log(headers.authorization);
    return await fetch(`https://picaapi.picacomic.com/comics/${id}`, {
        headers
    }).then(res => {
        //console.log()

        return res.text();
    }).then(text => {
        console.log(text);
        return JSON.parse(text);
    })
}