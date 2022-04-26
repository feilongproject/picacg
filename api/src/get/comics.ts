import { headers } from "../config";
import { getSign } from "../mod/getSign";

/**
 * 获取各个分区参数
 * @param token token
 * @returns 返回所有分区
 */
export async function getComicCategories(token: string): Promise<ComicsCategories> {

    headers.time = (new Date().getTime() / 1000).toFixed(0);
    headers.signature = getSign(`categories`, headers.time, headers.nonce, "GET");
    headers.authorization = token;

    console.log(headers.time);
    console.log(headers.signature);
    console.log(headers.authorization);
    return await fetch(`https://picaapi.picacomic.com/categories`, {
        headers
    }).then(res => {
        //console.log()

        return res.text();
    }).then(text => {
        console.log(text);
        return JSON.parse(text);
    })
}

/**
 * 获取分区详情
 * @param token token
 * @param page  分页，从1开始
 * @param c 分区名字，categories里面的title，如"嗶咔漢化"
 * @param sort 排序依据: ua=>默认,dd=>新到旧,da=>旧到新,ld=>最多爱心,vd=>最多指名
 * @returns 返回分区详情
 */
export async function getComicsBlock(token: string, page: number, c: string, sort: "ua" | "dd" | "da" | "ld" | "vd"): Promise<ComicsBlock> {
    //console.log(id)
    console.log(`page:${page}/c:${c}/s:${sort}`);

    headers.time = (new Date().getTime() / 1000).toFixed(0);
    headers.signature = getSign(`comics?page=${page}&c=${c}&s=${sort}`, headers.time, headers.nonce, "GET");
    headers.authorization = token;

    console.log(headers.time);
    console.log(headers.signature);
    console.log(headers.authorization);
    return await fetch(`https://picaapi.picacomic.com/comics?page=${page}&c=${c}&s=${sort}`, {
        headers
    }).then(res => {
        //console.log()

        return res.text();
    }).then(text => {
        console.log(text);
        return JSON.parse(text);
    })
}

/**
 * 获取漫画详情
 * @param token token
 * @param id 漫画主id
 * @returns 返回漫画详情
 */
export async function getComicsInfo(token: string, id: string): Promise<ComicsInfo> {

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

/**
 * 获取漫画章节
 * @param token token
 * @param bookId 漫画主id
 * @param page 漫画页数，从1开始
 * @returns 返回漫画分P
 */
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

/**
 * 获取当前漫画指定页数的所有图片
 * @param token token
 * @param bookId 漫画主id
 * @param epsId 漫画分P的id，从1开始
 * @param page 漫画分P的页数，一般以40张图片1页分割所有图片，从1开始
 * @returns 当前页的所有图片
 */
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
