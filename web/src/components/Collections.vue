<template>
  <div class="video-info" style="display: flex">
    <span style="line-height: 100%; margin: 10px 10px">
      <h1>{{ loadingStr }}</h1>
      <div v-for="(item, index) in colls" :key="index">
        <table border="1">
          <div v-if="item.title != '本子魔推薦'">
            <caption>
              {{
                item.title
              }}
            </caption>
            <tr>
              <th>作者</th>
              <th>标题</th>
              <th>页数</th>
              <th>tag</th>
            </tr>
            <tr v-for="(i, j) in item.comics" :key="j">
              <th>{{ i.author }}</th>
              <th>
                <a :href="`/comics?bookId=${i._id}`">{{ i.title }}</a>
              </th>
              <th>{{ i.pagesCount }}</th>
              <th style="">
                <span v-for="(tag, k) in i.categories" :key="k">
                  {{ tag }}
                </span>
              </th>
            </tr>
          </div>
        </table>
        <br />
        <hr />
      </div>
    </span>
  </div>
</template>





<script lang="ts">
import Vue from "vue";
import { CustomConfig } from "../config";

export default Vue.extend({
  data: () => {
    return {
      colls: Array(),
      loadingStr: "Loading......",
    };
  },
  mounted: async function () {
    var data: Collections = await fetch(
      `${CustomConfig.ApiProxyUrl}collections`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });

    console.log(data);
    this.colls = data.data.collections;

    var timeout = setInterval(() => {
      this.loadingStr = this.loadingStr.slice(0, -1);
      //console.log(this.loadingStr);
      if (this.loadingStr == "") clearInterval(timeout);
    }, 100);
  },
  methods: {},
});
</script>


