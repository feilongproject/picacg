import { picacg, headers } from './config';
import { getToken } from './mod/getToken';
import { getCollections } from './get/collections';
import { getComics } from './get/comics'


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
        var comics = await getComics(token.data.token, pathname.split("/")[1])
        return new Response(JSON.stringify(comics), {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
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
})