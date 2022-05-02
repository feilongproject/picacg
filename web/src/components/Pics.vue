<template>
  <div class="main" style="padding: 10px">
    <h1>{{ loadingStr }}</h1>
    <h1>{{ title }}</h1>

    <div v-for="(pic, i) in pics" :key="i">
      <img
        :src="`${ApiProxyUrl}storage?fileServer=${pic.media.fileServer}&path=${pic.media.path}`"
      />
      <!-- {{ pic.media.path }} -->
    </div>
    <div class="row index">
      <button :disabled="page == 1" @click="turnPage(bookId, epsId, page - 1)">
        previous page
      </button>
      <div v-for="i in pages" :key="i">
        <button :disabled="page == i" @click="turnPage(bookId, epsId, i)">
          {{ i }}
        </button>
      </div>
      <button
        :disabled="page == pages"
        @click="turnPage(bookId, epsId, page + 1)"
      >
        next page
      </button>
    </div>
  </div>
</template>

<style>
img {
  max-height: 100%;
  max-width: 500px;
  min-width: 150px;
  min-height: 200px;
  background-color: black;
  /* height: 100px; */
  width: 100%;
}

.picList {
  display: flex;
  flex-direction: column;
}
</style>


<script lang="ts">
import Vue from "vue";
import { CustomConfig } from "../config";

export default Vue.extend({
  data: function () {
    return {
      loadingStr: "Loading......",
      pics: Array(),
      title: "",
      ApiProxyUrl: "",
      bookId: "",
      page: 0,
      pages: 0,
      epsId: 0,
    };
  },
  mounted: async function () {
    var bookId = this.$route.query.bookId;
    this.bookId = bookId.toString();
    var epsId = this.$route.query.epsId;
    this.epsId = parseInt(epsId.toString());
    var page = this.$route.query.page;
    this.page = parseInt(page.toString());

    this.ApiProxyUrl = CustomConfig.ApiProxyUrl;

    var comicsPics: ComicsPics = await fetch(
      `${CustomConfig.ApiProxyUrl}comics/pics?bookId=${bookId}&epsId=${epsId}&page=${page}`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });

    var timeout = setInterval(() => {
      this.loadingStr = this.loadingStr.slice(0, -1);
      //console.log(this.loadingStr);
      if (this.loadingStr == "") clearInterval(timeout);
    }, 100);

    console.log(comicsPics.data);

    this.pages = comicsPics.data.pages.pages;
    this.title = comicsPics.data.ep.title;
    this.pics = comicsPics.data.pages.docs;
  },
  methods: {
    turnPage(bookId: string, epsId: number, page: number) {
      location.href = `/pics?bookId=${bookId}&epsId=${epsId}&page=${page}`;
    },
  },
});
</script>
