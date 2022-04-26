# 这里是后端页面
后端功能依赖于 `cloudflare` 的 `worker` 和 `KV namespaces`


## 请求url

|url                  |功能              |param段     |
|---------------------|------------------|------------|
|`/collections`       |获取主页推荐       |无          |
|`comics/categories`  |获取各个分区参数   |无           |
|`comics/block`       |获取分区详情       |`page` : 分页，从1开始<br>`c` : 分区名字<br>`s` : 进行排序<br><hr>排序依据:<br>`ua`=>默认<br>`dd`=>新到旧<br>`da`=>旧到新<br>`ld`=>最多爱心<br>`vd`=>最多指名   |
|`comics/info`        |获取漫画详情       |`bookId` : 漫画主id   |
|`comics/eps`         |获取漫画章节       |`bookId` : 漫画主id <br>`page` : 漫画页数，从1开始  |
|`comics/pics`        |获取漫画某页数的图  | `bookId`: 漫画主id<br>`page` : 漫画分P的id，从1开始<br>`epsId` : 漫画分P的页数，从1开始 |
|`storage`            |获取文件     | `fileServer` : 文件origin<br> `path` : 文件路径|


