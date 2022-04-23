export { }


declare global {
    const PICACG: KVNamespace;
    interface Token {
        code: number,
        message: string,
        data: {
            token: string,
        },
    }

    interface Collections {
        code: number,
        data: {
            collections: {
                comics: {
                    _id: string,
                    author: string,
                    categories: string[],//标签 
                    epsCount: number,
                    finished: boolean,//是否完结
                    pagesCount: number,//总页数
                    thumb: {
                        fileServer: string,
                        originalName: string,
                        path: string,
                    },
                    title: string,
                    totalLikes: number,
                    totalViews: number,
                }[],

                title: string,
            }[],

        },
        message: string
    }

    interface Comics {
        code: number,
        message: string,
        data: {
            comic: {
                _id: string,
                _creator: {
                    _id: string,
                    gender: string,
                    name: string,
                    verified: boolean,
                    exp: number,
                    level: number,
                    characters: string[],
                    role: string,
                    avatar: {
                        originalName: string,
                        path: string,
                        fileServer: string,
                    }, title: string,
                    slogan: string,
                    character: string,
                },
                title: string,
                description: string,
                thumb: {
                    originalName: string,
                    path: string,
                    fileServer: string,
                }, author: string,
                chineseTeam: string,
                categories: string[],
                tags: string[],
                pagesCount: number,
                epsCount: number,
                finished: boolean,
                updated_at: string,
                created_at: string,
                allowDownload: boolean,
                allowComment: boolean,
                totalLikes: number,
                totalViews: number,
                viewsCount: number,
                likesCount: number,
                isFavourite: boolean,
                isLiked: boolean,
                commentsCount: number,
            }

        }
    }
}


