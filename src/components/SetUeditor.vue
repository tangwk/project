<template>
  <div class="set">
    <div class="btn-groups">
      <!-- <button @click="save">保存编辑</button> -->
    </div>
    <div id="ueditor" type="text/plain"></div>
  </div>
</template>

<script>
import '../../static/Ueditor/ueditor.config';
import '../../static/Ueditor/ueditor.all';
import '../../static/Ueditor/lang/zh-cn/zh-cn';
import Event from '../assets/js/bus.js'; // 这个是兄弟组件中传输数据的。

export default {
  name: 'set',
  data () {
    return{
      ue: ''
    }
  },
  mounted () {
    this.ue = UE.getEditor('ueditor',{
      BaseUrl: '',
      UEDITOR_HOME_URL: 'static/Ueditor/',
      toolbars: [
        ['fullscreen', 'source', 'undo', 'redo'],
        ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
      ]
    })
  },
  methods: {
    save(){
      let ueditordata = UE.getEditor('ueditor').getContent();
      Event.$emit('seted', ueditordata);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/mix';
.set{
  height: 100% !important;
}
.edui-default{
  height: 340px !important;
}
.edui-default .edui-editor{
  width: 100% !important;
  // height: 340px !important;
}
.edui-default .edui-editor-iframeholder{
  // width: 100% !important;
  // height: 260px !important;
}
// .view{
//   height: 260px !important;
// }
</style>


