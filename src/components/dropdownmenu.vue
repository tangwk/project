<template>
  <div :t="value" class="dropdownmenu" :class="[type ? 'dropdownmenu-' + type : '']">
  <input class="dropdownmenu-input" :class="[type ? 'dropdownmenu-input-' + type : '']" @focus="focus" v-clickoutside="handleClickOutSide" type="text" v-model="msg" readonly placeholder="请选择">
  <i class="iconfont icon-plus-select-down" @click.stop="focus"></i>
  <ul v-show="showlist" class="list" :class="[type ? 'list-' + type : '']">
    <li v-for="(item, index) in list" :key="index" @click.prevent="selectname(item.name, item.id)">{{item.name}}</li>
  </ul>
</div>
</template>

<script>
import clickoutside from '../js/clickoutside.js'

export default {
  name: 'dropdownmenu',
  props: {
    value: [Array, String],
    list: Array,
    type: String
  },
  data () {
    return {
      msg: '',
      showlist: false
    }
  },
  directives: {
    'clickoutside': clickoutside
  },
  watch: {
    value (val) {
      if (this.value.length > 0) {
        this.msg = val[0].name
      }
    },
    list () {
      if (this.value.length > 0) {
        this.msg = this.value[0].name
      }
    }
  },
  mounted () {
    if (this.value.length > 0) {
      this.msg = this.value[0].name
    }
  },
  methods: {
    handleClickOutSide () {
      this.showlist = false
    },
    selectname (name, id) {
      this.msg = name
      this.$emit('input', [{
        name: name,
        id: id
      }])
    },
    focus () {
      this.$emit('focus')
      this.showlist = true
    }
  }
}
</script>

<style lang="less">
.dropdownmenu{
  user-select: none;
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
  // vertical-align: top;
  padding-left: 10px;
  line-height: 32px;
  font-size: 14px;
  // margin-right: 10px;
  cursor: pointer;
  .dropdownmenu-input{
    cursor: pointer;
    display: inline-block;
    height: 20px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    line-height: 20px;
    color: #999999;
    font-size: 14px;
    background: transparent;
  }
  i{
    position: absolute;
    right: 5px;
    top: 0;
    height: 28px;
    font-size: 18px;
    color: #d8d8d8;
    cursor: pointer;
  }
  .list{
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 30px;
    // width: 196px;
    width: 100%;
    border: 1px solid #d8d8d8;
    background-color: #fff;
    overflow: hidden;
    overflow-y: auto;
    z-index: 999;
    cursor: pointer;
    color: #999;
    font-size: 14px;
    max-height: 180px;
    &::-webkit-scrollbar {
      width: 0;
    }
    &::-ms-scrollbar {
      width: 0;
    }
    &::-moz-scrollbar {
      width: 0;
    }
    li{
      height: 32px;
      border-bottom: 1px dashed #efefef;
      padding-left: 10px;
      line-height: 32px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:last-child{
        border-bottom: none;
      }
    }
  }
}
.dropdownmenu-small{
  width: 120px;
  .dropdownmenu-input-small{
    width: 80px;
  }
  .list-small{
    width: 117px;
  }
}
</style>
