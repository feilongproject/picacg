<template>
  <el-main class="main">
    <div class="main">
      <el-col v-for="(item, index) in blocks" :key="index">
        <div class="el-card is-always-shadow">
          <div class="el-card__body">
            <img
              :src="`${ApiProxyUrl}storage?fileServer=${item.thumb.fileServer}&path=${item.thumb.path}`"
              class="image"
            />
            <div style="padding: 14px">
              <span>
                <a :href="`/comics?bookId=${item.id}`">{{ item.title }}</a>
              </span>

              <div class="bottom clearfix">
                <el-button type="text" class="button">
                  {{ item.author }}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </div>

    <hr noshade="noshade" style="height: 10px; width: 100%" />
    <el-pagination
      background
      layout="prev, pager, next"
      :current-page.sync="page"
      :page-count="pages"
      @current-change="turnPage"
    >
    </el-pagination>
  </el-main>
</template>

<style  lang='scss' scoped>
.main {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  div.el-col {
    @media (min-width: 600px) {
      width: 250px;
    }
    display: flex;
    flex-direction: column;
    div.el-card {
      min-height: 100%;
      div.el-card__body {
        padding: 0px;
        display: flex;
        align-items: center;
        @media (min-width: 600px) {
          flex-direction: column;
          img {
            max-height: 300px;
          }
        }
        @media (max-width: 600px) {
          img {
            width: 150px;
          }
        }
      }
    }
  }
}
</style>

<script lang='ts'>
import Vue from "vue";
import { CustomConfig } from "../config";

export default Vue.extend({
  data() {
    return {
      blocks: Array(),
      ApiProxyUrl: CustomConfig.ApiProxyUrl,
      pages: 0,
      page: 0,
      blockName: String(),
    };
  },
  mounted: async function () {
    var blockName = this.$route.query.name;
    if (!blockName) throw new Error("unkown block name");
    this.blockName = blockName.toString();

    var page = this.$route.query.page;
    page = page ? page.toString() : "1";

    var blocks = await this.get(parseInt(page));
    this.blocks = blocks.data.comics.docs;
    this.pages = blocks.data.comics.pages;
    this.page = blocks.data.comics.page;

    console.log("finish");
  },
  methods: {
    async get(page: number): Promise<ComicsBlock> {
      var blocks: ComicsBlock = await fetch(
        `${CustomConfig.ApiProxyUrl}comics/block?page=${page}&c=${this.blockName}&s=ua`
      )
        .then((res) => {
          return res.text();
        })
        .then((text) => {
          //console.log(text);
          return JSON.parse(text);
        });
      console.log(blocks);
      return blocks;
    },
    async turnPage(page: number) {
      console.log(page);
      var blocks = await this.get(page);
      this.blocks = blocks.data.comics.docs;

      var url = new URL(location.href);
      url.searchParams.set("page", page.toString());
      this.$router.replace(url.pathname + url.search);

      //location.href = url.toString();
    },
  },
});
</script>

