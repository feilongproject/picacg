<template>
  <el-main class="main">
    <div class="images">
      <div
        v-for="(item, index) in blocks"
        :key="index"
        @click="turnBlock(item.title)"
      >
        <el-image
          v-if="!item.active"
          :src="`${ApiProxyUrl}storage?fileServer=${item.thumb.fileServer}&path=${item.thumb.path}`"
          fit="contain"
        >
        </el-image>
        <el-tag v-if="!item.active" effect="dark"> {{ item.title }}</el-tag>
      </div>
    </div>
  </el-main>
</template>

<style lang='scss'>
.images {
  display: flex;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .el-image {
      width: 150px;
      height: 150px;
    }
    .el-tag {
      align-self: center;
    }
  }
}
</style>

<script lang='ts'>
import Vue from "vue";
import { CustomConfig } from "../config";
export default Vue.extend({
  data: () => {
    return {
      blocks: Array(),
      ApiProxyUrl: CustomConfig.ApiProxyUrl,
    };
  },
  mounted: async function () {
    var blocks: ComicsCategories = await fetch(
      `${CustomConfig.ApiProxyUrl}comics/categories`
    )
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text);
        return JSON.parse(text);
      });
    console.log(blocks);
    this.blocks = blocks.data.categories;

    console.log("finish");
  },
  methods: {
    turnBlock(blockName: string) {
      console.log(blockName);
      location.href = `/blocks/block?name=${blockName}`;
    },
  },
});
</script>

