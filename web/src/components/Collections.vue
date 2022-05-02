<template>
  <el-main class="main">
    <h1>{{ loadingStr }}</h1>
    <div v-for="(item, index) in colls" :key="index">
      <el-table
        v-if="item.title != '本子魔推薦'"
        :data="item.comics"
        style="width: 100%"
        :cell-style="theme"
        :header-cell-style="theme"
        border
      >
        <el-table-column :label="item.title">
          <el-table-column prop="author" label="作者" width="100">
          </el-table-column>
          <el-table-column prop="title" label="标题">
            <template slot-scope="scope">
              <a :href="`/comics?bookId=${scope.row._id}`">
                {{ scope.row.title }}
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="pagesCount" label="页数" width="50">
          </el-table-column>
          <el-table-column prop="tags" label="tags" width="150">
            <template slot-scope="scope">
              <el-tag
                effect="dark"
                v-for="(tag, k) in scope.row.categories"
                :key="k"
              >
                {{ tag }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <br />
      <hr />
      <br />
    </div>
  </el-main>
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

    if (data.code != 200) throw new Error(JSON.stringify(data));
    console.log(data.data.collections[0]);

    this.colls = data.data.collections;

    var timeout = setInterval(() => {
      this.loadingStr = this.loadingStr.slice(0, -1);
      //console.log(this.loadingStr);
      if (this.loadingStr == "") clearInterval(timeout);
    }, 100);
  },
  methods: {
    theme() {
      return "background:#0df;color:#000";
    },
  },
});
</script>


