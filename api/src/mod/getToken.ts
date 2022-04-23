import { headers, picacg } from "../config";
import { getSign } from "./getSign";


export async function getToken(): Promise<Token> {
    var tokenT = await PICACG.get("Token")
    if (tokenT) {
        return JSON.parse(tokenT)
    }

    const request_url = picacg.Url + "auth/sign-in";
    console.log(request_url);


    headers.time = (new Date().getTime() / 1000).toFixed(0);
    console.log(headers.time);



    headers.signature = getSign("auth/sign-in", headers.time, headers.nonce, "POST") // hmacSHA256(key, picacg.secretKey).toString();
    console.log(headers.signature);



    const body = {
        "email": "feilongproject",
        "password": "1478914789"
    }
    //console.log(JSON.stringify(body))


    var token: Token = await fetch(request_url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
    }).then(async res => {
        var text = await res.text();
        await PICACG.put("Token", text)
        return text
    }).then(text => {
        return JSON.parse(text)
    })


    return token

}