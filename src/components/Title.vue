<template>
  <el-header class="header" height="auto">
    <div class="tittle">
      <h1 style="padding: 20px">PICACG web.ver</h1>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#00ddff"
      text-color="#000000"
      active-text-color="#0000ff"
    >
      <el-menu-item index="index" :disabled="turnIndex.index.disabled">
        主页
      </el-menu-item>
      <el-menu-item index="block" :disabled="turnIndex.block.disabled">
        分类
      </el-menu-item>
      <el-menu-item index="about" :disabled="turnIndex.about.disabled">
        关于
      </el-menu-item>
      <el-menu-item index="github">
        <a href="https://github.com/feilongproject/picacg/" target="_blank">
          GitHub Link
        </a>
      </el-menu-item>
      <el-menu-item class="searchInput">
        <el-input
          placeholder="输入即可搜索"
          v-model="searchInput"
          size="mini"
          clearable
        >
        </el-input>
        <el-button size="mini" icon="el-icon-search" @click="search">
        </el-button>
      </el-menu-item>
    </el-menu>
    <hr noshade="noshade" style="height: 10px" />
  </el-header>
</template>

<style lang='scss'>
.searchInput {
  display: flex;
  height: 100% !important;
  margin-top: 5px !important;
  div {
    display: flex;
    input {
      height: 100% !important;
    }
  }
}

.menu {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      activeIndex: "1",
      searchInput: "",
      turnIndex: {
        index: {
          link: "/",
          disabled: false,
        },
        block: {
          link: "/block",
          disabled: false,
        },
        about: {
          link: "",
          disabled: false,
        },
      },
    };
  },
  mounted() {
    const { pathname } = location;
    console.log(pathname);

    if (pathname == "/") {
      this.turnIndex.index.disabled = true;
    } else if (pathname == "/comics") {
    } else {
      var t = this.turnIndex;
      var key: keyof typeof t;

      for (key in this.turnIndex) {
        if (this.turnIndex[key].link == pathname) {
          this.turnIndex[key].disabled = true;
        }
      }
    }
  },
  methods: {
    handleSelect(menuKey: string, pathKey: string[]) {
      var t = this.turnIndex;
      var key: keyof typeof t;

      for (key in this.turnIndex) {
        if (key == menuKey) {
          console.log(key, pathKey);
          location.href = this.turnIndex[key].link;
        }
      }
    },
    /*     handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          //console.log("then");
          this.searchDialog = false;
        })
        .catch((_) => {
          //console.log("catch");
        });
    }, */
    search() {
      this.$message("搜索功能还没写呢");
    },
  },
});
</script>

