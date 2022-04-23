import hmacSHA256 from '../CryptoJS/hmac-sha256';


export function getSign(url: string, timestamp: string, nonce: string, method: "GET" | "POST",): string {

    var key = url + timestamp + nonce + method + "C69BAF41DA5ABD1FFEDC6D2FEA56B";

    return hmacSHA256(key.toLowerCase(), "~d}$Q7$eIni=V)9\\RK/P.RM4;9[7|@/CA}b~OW!3?EV`:<>M7pddUBL5n|0/*Cn").toString();
}