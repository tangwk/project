<template>
  <div>
    <el-table
      :data="inforData"
      highlight-current-row
      >
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :property="column.property"
        :label="column.label"
        show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <i class="iconfont icon-xiangqing" title="详情" v-on:click="$emit('details', scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myTable',
  data () {
    return {
      // total: '',
      currPage: null, // 当前页码
      pageCount: 10, //null
      show: true
    }
  },
  props: {
    inforData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  watch: {
    total(val){
      this.pageCount = val
    }
  },
  mounted() {
    this.pageCount = this.total
    this.currPage = this.currentPage
  },
  methods: {
    handleCurrentChange (val) { // 分页
      // console.log(`当前页: ${val}`)
      // this.currentPage = val
      this.$emit('on-change', val)
      // this.search()
    },
  }
}
</script>

<style lang="less" scoped>
// 分页
.block{
  float: right;
  margin: 20px 60px 0 0;
  overflow: hidden;
}
</style>


