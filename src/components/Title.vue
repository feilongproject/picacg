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
        分区
      </el-menu-item>
      <el-menu-item @click="aboutDialogShow = true"> 关于 </el-menu-item>
      <el-menu-item @click="donateDialogShow = true"> 捐赠 </el-menu-item>
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
    <el-dialog title="捐赠/Donate" :visible.sync="donateDialogShow" width="80%">
      <span>
        提前声明：本项目完全免费 <br />
        <del>服务可能会停止，但绝不会变质</del> <br />
        当前后端服务器完全依赖于Replit提供的免费服务,因为是使用free版本的project,所以在初次打开时会因为应用被休眠而出现加载缓慢情况,只需要每月升级到Pro版本即可获取永不停止状态，所以...
        <br />
        <el-tooltip
          effect="dark"
          content="左阿里，右微信，点击查看大图"
          placement="bottom"
        >
          <span>
            <el-image
              style="width: 200px; height: 200px"
              :src="donateImgList0[0]"
              :preview-src-list="donateImgList0"
            >
            </el-image>
            <el-image
              style="width: 200px; height: 200px"
              :src="donateImgList1[0]"
              :preview-src-list="donateImgList1"
            >
            </el-image>
          </span>
        </el-tooltip>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="donateDialogShow = false">
          关闭窗口
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="关于" :visible.sync="aboutDialogShow" width="80%">
      <span>
        本项目完全用爱发电，功能自己在
        <a href="https://github.com/feilongproject/picacg/issues">
          GitHub的issues
        </a>
        上自己提，依照能力<del>和资金</del>逐步解决
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="aboutDialogShow = false">
          关闭窗口
        </el-button>
      </span>
    </el-dialog>
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
      donateImgList0: ["/donate/WeChatPay.png", "/donate/Alipay.png"],
      donateImgList1: ["/donate/Alipay.png", "/donate/WeChatPay.png"],

      donateDialogShow: false,
      aboutDialogShow: false,
      activeIndex: "1",
      searchInput: "",
      turnIndex: {
        index: {
          link: "/",
          disabled: false,
        },
        block: {
          link: "/blocks/",
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
    localStorage.setItem(pathname, new Date().toString());

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
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          //console.log("then");
          this.donateDialogShow = false;
        })
        .catch((_) => {
          //console.log("catch");
        });
    },
    search() {
      this.$message("搜索功能还没写呢");
    },
  },
});
</script>

