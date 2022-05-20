<template>
  <el-main class="main">
    <el-descriptions
      class="margin-top"
      :labelStyle="{ background: '#0df', color: '#000' }"
      :contentStyle="{ background: '#0df', color: '#000' }"
      :column="2"
      border
    >
      <el-descriptions-item label="title" :span="2">
        {{ title }}
      </el-descriptions-item>
      <el-descriptions-item label="conver" span="2">
        <img :src="thumb" />
      </el-descriptions-item>
      <el-descriptions-item label="description" span="2">
        {{ description }}
      </el-descriptions-item>
      <el-descriptions-item label="author" span="1">
        {{ author }}
      </el-descriptions-item>
      <el-descriptions-item label="chineseTeam" span="1">
        {{ chineseTeam }}
      </el-descriptions-item>
      <el-descriptions-item label="categories">
        <el-tag v-for="(c, j) in categories" :key="j">
          {{ c }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="tags">
        <el-tag v-for="(c, j) in tags" :key="j">
          {{ c }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="eps" span="2">
        <el-tag type="" effect="dark" v-for="(ep, j) in eps" :key="j">
          {{ ep.order }}
          <a :href="`/pics?bookId=${bookId}&epsId=${ep.order}&page=1`">
            {{ ep.title }}
          </a>
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </el-main>
</template>

<style lang="scss" scoped>
img {
  /* height: 100px; */
  width: 30%;
}
</style>



<script lang="ts">
import Vue from "vue";
import { CustomConfig } from "../config";

export default Vue.extend({
  data: function () {
    return {
      author: "Loading......",
      categories: ["Loading......"],
      chineseTeam: "Loading......",
      description: "Loading......",
      tags: ["Loading......"],
      thumb: "Loading......",
      title: "Loading......",
      eps: Array(),
      bookId: "Loading......",
    };
  },
  mounted: async function () {
    var bookId = this.$route.query.bookId;
    console.log(`get bookId=${bookId}`);
    this.bookId = bookId.toString();

    var comicsInfo: ComicsInfo = await fetch(
      `${CustomConfig.ApiProxyUrl}comics/info?bookId=${bookId}`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });

    console.log(comicsInfo.data);
    var comic = comicsInfo.data.comic;

    this.author = comic.author;
    this.categories = comic.categories;
    this.chineseTeam = comic.chineseTeam;
    this.description = comic.description;
    this.tags = comic.tags;

    this.thumb = `${CustomConfig.ApiProxyUrl}storage?fileServer=${comic.thumb.fileServer}&path=${comic.thumb.path}`;

    this.title = comic.title;

    //this.colls = data.data.comic;

    var comicsEps: ComicsEps = await fetch(
      `${CustomConfig.ApiProxyUrl}comics/eps?bookId=${bookId}&page=1`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });
    var eps = comicsEps.data.eps;
    this.eps = eps.docs;

    var { page, pages } = eps;
    var fetchs: Promise<ComicsEps>[] = Array();

    while (page != pages) {
      page++;
      fetchs.push(
        fetch(
          `${CustomConfig.ApiProxyUrl}comics/eps?bookId=${bookId}&page=${page}`
        ).then((res) => {
          return res.json();
        })
      );
    }
    var _eps = await Promise.all(fetchs).then((ress) => {
      //console.log(ress);
      return ress;
    });
    _eps.forEach((item) => {
      item.data.eps.docs.forEach((_ep) => {
        eps.docs.push(_ep);
      });
    });
    console.log(`eps total:${eps.total},page:${eps.page},pages:${eps.pages}`);
    console.log(eps.docs);
    this.eps = eps.docs;
  },
  methods: {},
});
</script>


