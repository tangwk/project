<template>
  <div class="breadBor clear">
    <p class="site left">
      <i class="iconfont icon-location"></i>当前位置 :
    </p>
    <el-breadcrumb separator=">" class="breadcrumb left">
      <el-breadcrumb-item :to="{ path: '/layOut/homepage' }" class="menu">主页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <div v-on="currentDate"></div> -->
  </div>
</template> 

<script>
  export default {
    name: '',
    data(){
      return {

      }
    },
    computed:{
      currentDate () {
        return Date.now();
      }
    },
    mounted() {
      // console.log(this.$route)
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mix';
  .breadBor{
    display: flex;
		justify-content: flex-start;
		align-items: flex-start;
    .site{
      .ft(14px,40px);
      height: 40px;
      color: #666666;
      padding-left: 15px;
    }
    .breadcrumb{
      .ft(14px,40px);
      height: 40px;
      padding-left: 10px;
    }
  }
</style>
