import { picacg, headers } from './config';
import { getToken } from './mod/getToken';
import { getCollections } from './get/collections';
import { getComics, getComicsEps, getComicsPics } from './get/comics'
import { getStorage } from './get/storage';


async function Main(request: Request): Promise<Response> {
    var { pathname } = new URL(request.url);
    pathname = pathname.slice(1);
    var token: Token = await getToken();
    //console.log(`get token: ${token.data.token}`);

    if (pathname.startsWith("collections")) {
        var coll = await getCollections(token.data.token);
        return new Response(JSON.stringify(coll), {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
    } else if (pathname.startsWith("comics")) {
        var bookId = new URL(request.url).searchParams.get("bookId");
        if (bookId) {
            var comics = await getComics(token.data.token, bookId);
            return new Response(JSON.stringify(comics), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
        }

    } else if (pathname.startsWith("eps")) {
        var bookId = new URL(request.url).searchParams.get("bookId");
        var page = new URL(request.url).searchParams.get("page");
        console.log(`bookId:${bookId},page:${page}`);
        if (bookId && page) {
            var eps = await getComicsEps(token.data.token, bookId, page);
            return new Response(JSON.stringify(eps), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
        }
    } else if (pathname.startsWith("pics")) {
        var bookId = new URL(request.url).searchParams.get("bookId");
        var page = new URL(request.url).searchParams.get("page");
        var epsId = new URL(request.url).searchParams.get("epsId");
        console.log(`bookId:${bookId},epsId:${epsId},page:${page}`);
        if (bookId && page && epsId) {
            var pics = await getComicsPics(token.data.token, bookId, epsId, page);
            return new Response(JSON.stringify(pics), {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
        }

    } else if (pathname.startsWith("storage")) {
        var fileServer = new URL(request.url).searchParams.get("fileServer");
        var path = new URL(request.url).searchParams.get("path");
        if (path && fileServer) {
            var response = await getStorage(token.data.token, fileServer, path);
            return response;
        } else return new Response("no fileServer or path");
    }




    return new Response(headers.signature);
}





addEventListener("fetch", (event) => {
    console.log("\n\n\n\n\n\n");
    event.respondWith(
        Main(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
    console.log("end all fetch");
})