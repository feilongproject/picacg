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
      style="display: flex"
    >
      <el-menu-item index="/" :disabled="turnIndex.index.disabled">
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
      <el-button
        style="margin-left: auto"
        icon="el-icon-search"
        @click="searchDialog = true"
      >
      </el-button>
      <el-dialog
        title="提示"
        :visible.sync="searchDialog"
        width="30%"
        :before-close="handleClose"
      >
        <span>搜索功能这一部分在写了</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="searchDialog = false">取消</el-button>
          <el-button type="primary" @click="searchDialog = false">
            确定
          </el-button>
        </span>
      </el-dialog>
    </el-menu>
  </el-header>
</template>

<style>
.menu {
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.tittle {
  background-color: #0df;
  box-shadow: 1px 1px 50px rgb(0 0 0 / 30%);
  border-radius: 5px;
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      searchDialog: false,
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
          link: null,
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
      if (this.turnIndex[pathname]) {
        this.turnIndex[pathname].disabled = true;
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (this.turnIndex[key]) {
        console.log(key, keyPath);
        location.href = this.turnIndex[key].link;
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

