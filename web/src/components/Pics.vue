<template>
  <div class="video-info" style="display: flex">
    <span style="line-height: 100%; margin: 10px 10px" class="col">
      <div class="col">
        <div v-for="(pic, i) in pics" :key="i">
          <img
            :src="`${ApiProxyUrl}storage?fileServer=${pic.media.fileServer}&path=${pic.media.path}`"
          />
          <!-- {{ pic.media.path }} -->
        </div>
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

img {
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
      pics: [
        {
          _id: "",
          media: {
            originalName: "",
            path: "",
            fileServer: "",
          },
          id: "",
        },
      ],
      ApiProxyUrl: "",
    };
  },
  mounted: async function () {
    var bookId = this.$route.query.bookId;
    var epsId = this.$route.query.epsId;
    var page = this.$route.query.page;

    this.ApiProxyUrl = CustomConfig.ApiProxyUrl;
    var comicsPics: ComicsPics = await fetch(
      `${CustomConfig.ApiProxyUrl}pics?bookId=${bookId}&epsId=${epsId}&page=${page}`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });

    console.log(comicsPics.data.pages.docs);
    /*     comicsPics.data.pages.docs.forEach((elm, index) => {
      comicsPics.data.pages.docs[index].media.fileServer =
        elm.media.fileServer.replace(
          `picacg.com`,
          `${CustomConfig.ApiProxyUrl}/store`
        );
    }); */

    this.pics = comicsPics.data.pages.docs;
  },
  methods: {},
});
</script>
