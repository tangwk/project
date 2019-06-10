<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
// 开发公共组件，可设置填充内容defaultMsg，配置信息config(宽度和高度等)，并提供获取内容的方法
  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object,
      }
    },
    watch: {
      defaultMsg(val) {
        setTimeout(() => {
          this.editor && this.editor.setContent(val);
        }, 400)
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', Object.assign(this.config)); // 初始化UE
      this.editor.addListener("ready", function () {
        // _this.defaultMsg && _this.editor.setContent(_this.defaultMsg, true); // 确保UE加载完成后，放入内容。
        // _this.editor.setContent( '<video src="insertUrl"></video>',true) // 第一个是要添加的内容，第二个设置为true(表示是追加)
        _this.editor.setHeight(400); // 设置固定高度
        _this.$emit('onready', _this.editor)
        // console.log(_this.editor.config)
      });

    },
    methods: {
      // getUEContent() { // 获取内容方法
      //   return this.editor.getContent()
      // }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
