<template>
  <div class="weBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        自定义菜单
      </p>
      <div class="menuBor">
        <ol class="warning">
          <li>1. 使用本模块生产微信端，必须在微信公众平台申请自定义菜单使用的AppId和AppSecret，即在党校平台中获得授权。</li>
          <li>2. 微信端最多创建3个一级菜单，每个一级菜单下最多可以创建5个二级菜单，菜单最多支持两层。（多出部分会生成前3个一级菜单）</li>
          <li>3. 主菜单最多4个汉字，子菜单最多7个汉字，多出来的部分将会以“...”代替。</li>
          <li>4. 同步自定义菜单后，由于微信客户端缓存，最长需24小时微信客户端才会展现，建议尝试取消关注公众账号后再次关注，则可看到效果。</li>
          <li>5. 已通过党校平台绑定相应微信公众号，如果您绑定的是订阅号，自定义菜单不可用。</li>
          <li>6. 添加自定义菜单的二级菜单时一定要选择父级菜单选项，直接添加默认为一级菜单。</li>
        </ol>
        <div class="newsBor">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="父级菜单 :" prop="menuParent">
              <el-select v-model="form.menuParent" clearable placeholder="请选择">
                <el-option v-for="item in parentOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <span class="hint">二级菜单必须要选择父菜单</span>
            </el-form-item>
            <el-form-item label="菜单名称 :" v-if="!form.menuParent" prop="menuName">
              <el-input v-model="form.menuName" name="menuNameA" v-validate="'required|menuName'" :class=" {'input':true, 'is-danger': errors.has('menuNameA')} "></el-input>
              <span class="hint">一级菜单最多4个汉字</span>
              <p class="hints"> {{ errors.first('menuNameA') }} </p>
            </el-form-item>
            <el-form-item label="菜单名称 :" v-else prop="menuName">
              <el-input v-model="form.menuName" name="menuNameA" v-validate="'required|menuName2'" :class=" {'input':true, 'is-danger': errors.has('menuNameA')} "></el-input>
              <span class="hint">二级菜单最多7个汉字</span>
              <p class="hints"> {{ errors.first('menuNameA') }} </p>
            </el-form-item>
            <!-- <el-form-item label="菜单类型 :" prop="menuType">
                        <el-select v-model="form.menuType" placeholder="关键词回复菜单" name="menuTypeA" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('menuTypeA')} ">
                          <el-option label="发送消息" value="1"></el-option>
                          <el-option label="跳转网页" value="2"></el-option>
                          <el-option label="跳转小程序" value="3"></el-option>
                        </el-select>
                        <p class="hints"> {{ errors.first('menuTypeA') }} </p>
                      </el-form-item> -->
            <el-form-item label="菜单功能 :" prop="menuUrl" v-if="this.form.menuParent">
              <el-select v-model="form.menuUrl" clearable filterable placeholder="请选择" name="menuUrlA" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('menuUrlA')} ">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <p class="hints"> {{ errors.first('menuUrlA') }} </p>
            </el-form-item>
            <el-form-item class="save">
              <el-button type="primary" @click="save('form')">保 存</el-button>
              <el-button style="margin-left: 60px;" @click="goBack">返 回</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="menuTable">
          <el-table :data="menuData" style="width: 100%">
            <el-table-column type="index" align="center" width="50">
            </el-table-column>
            <el-table-column prop="firstMenu" label="一级菜单" show-overflow-tooltip align="center" width="120">
            </el-table-column>
            <el-table-column label="二级菜单" align="center">
              <el-table-column prop="oneMenu" label="一" show-overflow-tooltip align="center" width="120">
              </el-table-column>
              <el-table-column prop="twoMenu" label="二" show-overflow-tooltip align="center" width="120">
              </el-table-column>
              <el-table-column prop="threeMenu" label="三" show-overflow-tooltip align="center" width="120">
              </el-table-column>
              <el-table-column prop="fourMenu" label="四" show-overflow-tooltip align="center" width="120">
              </el-table-column>
              <el-table-column prop="fiveMenu" label="五" show-overflow-tooltip align="center" width="120">
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="release">
          <el-button type="primary" @click="onSubmit">发布自定义菜单</el-button>
          <el-button type="primary" @click="reset">重置自定义菜单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonBread from "../../components/bread";
import API from "../../API/wechat.js";
export default {
  name: "WeMenu",
  data() {
    return {
      form: {
        menuParent: "",
        menuName: "",
        // menuType: "",
        menuUrl: ""
      },
      flag: false,
      menuData: [
        // {
        //   firstMenu: "历史文章",
        //   firstVal: {
        //     oneMenu: "吃",
        //     twoMenu: "喝",
        //     threeMenu: "玩",
        //     fourMenu: "乐",
        //     fiveMenu: "游"
        //   }
        // },
      ],
      parentOptions: [
        // {
        //   label: "一",
        //   value: "1"
        // }
      ],
      options: []
    };
  },
  methods: {
    search() {
      this.menuData = [];
      API.getMenuList({
        partyschoolId: this.reportID
      }).then(res => {
        // console.log(res)
        var _data = res.result;
        if (res.code !== 900) {
          _data.forEach(item => {
            item.firstMenu = item.parentName;
            if (item.children[0]) {
              item.oneMenu = item.children[0].menuName;
            } else {
              item.oneMenu = "";
            }
            if (item.children[1]) {
              item.twoMenu = item.children[1].menuName;
            } else {
              item.twoMenu = "";
            }
            if (item.children[2]) {
              item.threeMenu = item.children[2].menuName;
            } else {
              item.threeMenu = "";
            }
            if (item.children[3]) {
              item.fourMenu = item.children[3].menuName;
            } else {
              item.fourMenu = "";
            }
            if (item.children[4]) {
              item.fiveMenu = item.children[4].menuName;
            } else {
              item.fiveMenu = "";
            }
          });
          this.menuData = _data;
        }
      });
    },
    save(form) {
      // console.log(this.$refs.form)
      this.$validator.validateAll().then(res => {
        if (res) {
          API.saveNewMenu({
            partyschoolId: this.reportID,
            parentId: this.form.menuParent,
            // menuType: this.form.menuType,
            menuType: "2",
            menuName: this.form.menuName,
            urlId: this.form.menuUrl
          }).then(res => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            // 清空表单数据并重置为初始值并移除校验结果
            this.form.menuParent = "";
            // this.form.menuType = ""
            this.form.menuName = "";
            this.form.menuUrl = "";
            this.$validator.reset();
            this.getParentMenu();
            this.search();
          });
        }
      });
    },
    onSubmit() {
      this.flag = false;
      this.menuData.forEach(item => {

        if (item.children.length <= 0) {
          this.$message({
            message: "请选择二级菜单",
            type: "warning"
          });
          this.flag = true;
        }
      });
      if (this.flag) return;
      // this.menuData.forEach(item => {
      //   console.log()
      //   if (item.children.length) {
      API.pushMenu({
        partyschoolId: this.reportID
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "发布成功",
            type: "success"
          });
        }
      });
      // } else {
      //   this.$message({
      //     message: "请选择二级菜单",
      //     type: "warning"
      //   });
      // }
      // })
    },
    reset() {
      API.resetMenu({
        partyschoolId: this.reportID
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "重置成功！",
            type: "success"
          });
          this.search();
          this.getParentMenu();
      
        }
      });
    },
    getParentMenu() {
      API.getParentMenu({
        partyschoolId: this.reportID
      }).then(res => {
        var _data = res.result;
        this.parentOptions = [];
        if (_data) {
          _data.forEach(item => {
            item.label = item.menuName;
            item.value = item.id;
          });
          this.parentOptions = _data;
        }
      });
    },
    getMenuUrl() {
      API.getMenuUrl({
        type: "5",
        partyschoolId: this.partyschoolId
      }).then(res => {
        var _data = res.result;
        this.options = [];
        if (_data) {
          _data.forEach(item => {
            item.label = item.name;
            item.value = item.id;
          });
          this.options = _data;
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 表格合并计算
      if (columnIndex === 0) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    goBack() {
      // this.$router.go(-1);
      this.$router.push(
        "/layOut/wechat?currentPage=" + this.$route.query.currentPage
      );
    }
  },
  created() {
    this.reportID = this.$route.query.reportID;
    this.partyschoolId = this.$route.query.partyschoolId;
    this.search();
    this.getParentMenu();
    this.getMenuUrl();
  },
  components: {
    commonBread
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mix";
@import "../../style/magTable";
.menuBor {
  .warning {
    margin: 20px;
    background-color: #fcf8e4;
    li {
      color: #bd7b61;
      padding: 0 15px;
      height: 24px;
      line-height: 24px;
    }
  }
  .newsBor {
    width: 550px;
    margin-left: calc(50% - 275px);
    padding: 0 20px;
    .hint {
      color: @dc;
      padding-left: 5px;
    }
    .save {
      text-align: center;
    }
  }
  .menuTable {
    .wh(100%, 203px);
    padding: 0 50px;
    box-sizing: border-box;
    margin-bottom: 30px;
  }
  .release {
    .wh(100%, 32px);
    text-align: center;
    margin-bottom: 30px;
    .el-button {
      &:last-child {
        margin-left: 60px;
      }
    }
  }
  .el-form-item {
    height: 40px;
  }
  .hints {
    font-size: 12px;
    line-height: 18px;
    color: #ff0000;
    margin-top: -5px;
  }
}
</style>

