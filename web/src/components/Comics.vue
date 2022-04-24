<template>
  <div class="video-info" style="display: flex">
    <span style="line-height: 100%; margin: 10px 10px" class="col">
      <div class="row">
        <img :src="thumb" />

        <div class="col info">
          <table border="1">
            <tr>
              <th>title</th>
              <th>{{ title }}</th>
            </tr>
            <tr>
              <th>description</th>
              <th>{{ description }}</th>
            </tr>
            <tr>
              <th>author</th>
              <th>{{ author }}</th>
            </tr>
            <tr>
              <th>chineseTeam</th>
              <th>{{ chineseTeam }}</th>
            </tr>
            <tr>
              <th>tags</th>
              <th class="col">
                <div v-for="(c, j) in tags" :key="j">
                  {{ c }}
                </div>
              </th>
            </tr>
            <tr>
              <th>categories</th>
              <th class="col">
                <div v-for="(c, j) in categories" :key="j">
                  {{ c }}
                </div>
              </th>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <table border="1">
          <tr>
            <th>eps</th>
            <th>title</th>
            <th>id</th>
          </tr>
          <tr v-for="(ep, i) in eps" :key="i">
            <th>{{ ep.order }}</th>
            <th>
              <a :href="`/pics?bookId=${bookId}&epsId=${ep.order}&page=1`">{{
                ep.title
              }}</a>
            </th>
            <th>{{ ep.id }}</th>
          </tr>
        </table>
      </div>
    </span>
  </div>
</template>

<style>
.col {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  flex-direction: row;
}

/* .info {
  /* line-height: 1.5; 
  /* height: 10px; 
} */

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
      author: "",
      categories: [""],
      chineseTeam: "",
      description: "",
      tags: [""],
      thumb: "",
      title: "",
      eps: [{}],
      bookId: "",
    };
  },
  mounted: async function () {
    var bookId = this.$route.query.bookId;
    console.log(`get bookId=${bookId}`);
    this.bookId = bookId.toString();

    var comicsInfo: ComicsInfo = await fetch(
      `${CustomConfig.ApiProxyUrl}comics?bookId=${bookId}`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });

    console.log(comicsInfo.data.comic);
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
      `${CustomConfig.ApiProxyUrl}eps?bookId=${bookId}&page=1`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });
    var eps = comicsEps.data.eps;
    console.log(`eps total:${eps.total},page:${eps.page},pages:${eps.pages}`);
    console.log(eps.docs);
    this.eps = eps.docs;
  },
  methods: {},
});
</script>


