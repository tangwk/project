<template>
  <div class="boxBor">
    <div class="crumbs">
      <common-bread></common-bread>
    </div>
    <div class="user">
      <p class="titleBar">
        视频修改
      </p>
      <ul class="newsBor">
        <li>
          <label for="title"><i class="iconfont icon-xinghao"></i>视频名称 :</label>
          <el-input v-model="videoName" id="title" name="vidName" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('vidName')} "></el-input>
          <p class="hint"> {{ errors.first('vidName') }} </p>
        </li>
        <li class="clear">
          <div class="right">
            <label for="time">上传时间 :</label>
            <span>{{Date.now()|dateFormat}}</span>
            <!-- <el-date-picker
                v-model="videoTime"
                id="time"
                name="vidTime"
                type="date"
                align="right"
                placeholder="选择日期"
                :readonly="true">
              </el-date-picker>
              <p class="hint"> {{ errors.first('vidTime') }} </p> -->
          </div>
          <div class="left" style="margin-left:20px">
            <label class="label" for="author">分<span style="display: inline-block;width: 28px;"></span>类 :</label>
            <el-select v-model="typeVal" clearable placeholder="请选择" style="margin-left:-20px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <label for="address"><i class="iconfont icon-xinghao"></i>映射地址 :</label>
          <el-input v-model="address" placeholder="请输入映射地址" width="100%" id="address" name="videoUrl" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('videoUrl')} "></el-input>
          <p class="hint"> {{ errors.first('videoUrl') }} </p>
        </li>
        <li>
          <label for="content"><i class="iconfont icon-xinghao"></i>视频描述 :</label>
          <div class="editor">
            <input type="hidden" v-model="videoContent" name="vidContent" v-validate="'required'" :class=" {'input':true, 'is-danger': errors.has('vidContent')} ">
            <UE :config="config" ref="ue" @onready="insertContent" :defaultMsg="defaultMsg"></UE>
          </div>
          <p class="hint"> {{ errors.first('vidContent') }} </p>
        </li>
        <li class="submit">
          <button @click="save">保 存</button>
          <button @click="goBack">取 消</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import commonBread from "../../components/bread";
  import UE from "../../components/Ueditor";
  import API from "../../API/resource.js";
  Vue.filter('dateFormat', function(originVal) {
    const dt = new Date(parseInt(originVal))
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1).toString().padStart(2, '0')
    const d = dt
      .getDate()
      .toString()
      .padStart(2, '0')
    return `${y}-${m}-${d}`
  })
  export default {
    name: "VideoModify",
    data() {
      return {
        videoName: "",
        videoTime: "",
        typeVal: "",
        address: "",
        videoContent: "",
        options: [{
            label: "类型1",
            value: "1"
          },
          {
            label: "类型2",
            value: "2"
          },
          {
            label: "类型3",
            value: "3"
          },
          {
            label: "类型4",
            value: "4"
          },
          {
            label: "类型5",
            value: "5"
          }
        ],
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        eDitor: "",
        edithtml: "",
        videoType: 'videoType'
      };
    },
    methods: {
      toLook() {
        API.getVideos({ // getVideoList
            id: this.reportID,
          }).then(res => {
            var _data = res.result; // var _data = res.result[0];
            this.videoName = _data.videoName;
            this.videoTime = this.formatDate(_data.uploadDate);
            this.typeVal = _data.videoType;
            this.address = _data.mappingUrl;
            this.videoContent = _data.videoContent;
            this.defaultMsg = _data.videoContent // ueditor内容
          })
          .catch(err => {});
      },
      insertContent(UE) {
        //监听UE的变化(即 Ueditor.vue中的UE加载完成)
        this.eDitor = UE;
      },
      save() {
        // 表单校验:
        var htmlString = this.eDitor.getContent();
        this.videoContent = htmlString;
        this.$validator.validateAll().then(res => {
          if (res) {
            API.updateVideo({
              id: this.reportID,
              videoName: this.videoName,
              videoContent: this.videoContent,
              uploadDate: this.videoTime,
              videoType: this.typeVal,
              mappingId: this.address, // ??
              releaseId: localStorage.getItem("userId"),
              releaseName: localStorage.getItem("userName"),
              type:1,
              mark: '0'
            }).then(res => {
              // console.log(res)
              // this.$router.push('/layOut/video')
              this.$router.push('/layOut/video?currentPage=' + this.$route.query.currentPage)
            });
          }
        });
      },
      getTypeList() {
        API.typeList({
          codeName: '',
          codeType: this.videoType,
          id: '',
          code: ''
        }).then(res => {
          var _data = res.result
          this.options = []
          if (_data) {
            _data.forEach((item) => {
              item.label = item.codeName
              item.value = item.code
            })
            this.options = _data
          }
        });
      },
      goBack() {
        // this.$router.go(-1);
        this.$router.push('/layOut/video?currentPage=' + this.$route.query.currentPage)
      },
      formatDate: function(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + MM + "-" + d + " ";
      }
    },
    created() {
      this.reportID = this.$route.query.reportID;
      this.toLook();
      this.getTypeList();
    },
    components: {
      commonBread,
      UE
    }
  };
</script>

<style lang="less" scoped>
  @import "../../style/mix";
  @import "../../style/magTable";
  .newsBor {
    padding: 0 20px;
    li {
      height: 32px;
      margin-top: 40px;
      label {
        display: inline-block;
        .wh(90px, 32px);
        .ft(13px, 32px);
        color: #333;
        i {
          font-size: 24px;
          color: #ff0000;
        }
      }
      &:first-child {
        margin-top: 30px;
        .el-input {
          width: calc(100% - 100px);
        }
      }
      &:nth-child(2) {
        .left,
        .right {
          width: 46%;
        }
        margin-top: 35px;
        div {
          .el-input,
          .el-select {
            width: calc(100% - 100px);
          }
        }
      }
      &:nth-child(3) {
        .el-input {
          width: calc(100% - 100px);
        }
      }
      &:nth-child(4) {
        .wh(100%, 370px);
        .editor {
          .wh(calc(100% - 100px), 343px);
          margin-left: 94px;
          margin-top: -30px;
          box-sizing: border-box;
          border: 1px solid #dcdfe6;
        }
      }
      &:last-child {
        margin-bottom: 30px;
      }
    }
  }
  .hint {
    margin-left: 100px;
    font-size: 14px;
    line-height: 18px;
    color: #ff0000;
  }
</style>
