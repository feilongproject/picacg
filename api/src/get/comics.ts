import { headers } from "../config";
import { getSign } from "../mod/getSign";

export async function getComics(token: string, id: string): Promise<ComicsInfo> {

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


export async function getComicsEps(token: string, bookId: string, page: string): Promise<ComicsEps> {

    //console.log(id)

    headers.time = (new Date().getTime() / 1000).toFixed(0);
    headers.signature = getSign(`comics/${bookId}/eps?page=${page}`, headers.time, headers.nonce, "GET");
    headers.authorization = token;

    console.log(headers.time);
    console.log(headers.signature);
    console.log(headers.authorization);
    var eps: ComicsEps = await fetch(`https://picaapi.picacomic.com/comics/${bookId}/eps?page=${page}`, {
        headers
    }).then(res => {

        return res.text();
    }).then(text => {
        console.log(text);
        return JSON.parse(text);
    })
    return eps;
}

export async function getComicsPics(token: string, bookId: string, epsId: string, page: string): Promise<ComicsPics> {

    headers.time = (new Date().getTime() / 1000).toFixed(0);
    headers.signature = getSign(`comics/${bookId}/order/${epsId}/pages?page=${page}`, headers.time, headers.nonce, "GET");
    headers.authorization = token;

    console.log(headers.time);
    console.log(headers.signature);
    console.log(headers.authorization);
    var eps: ComicsPics = await fetch(`https://picaapi.picacomic.com/comics/${bookId}/order/${epsId}/pages?page=${page}`, {
        headers
    }).then(res => {
        return res.text();
    }).then(text => {
        console.log(text);
        return JSON.parse(text);
    })
    return eps;
}