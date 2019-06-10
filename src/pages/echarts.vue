<template>
  <section class="chart-container">
    <el-row>
      <el-col style="width:800px">
        <div id="chartPie" style="width:100%; height:25rem;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null
      }
    },
    methods: {
      drawPieChart() {
        this.chartPie = echarts.init(document.getElementById('chartPie'));
        this.chartPie.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [{
            name: '当前访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                value: 335,
                name: '图书资源'
              },
              {
                value: 310,
                name: '视频资源'
              },
              {
                value: 234,
                name: '课件资源'
              },
              {
                value: 135,
                name: '文章资源'
              },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        });
      },
      drawCharts() {
        this.drawPieChart()
      },
      bindResize() {
        this.chartColumn.resize();
      }
    },
    mounted: function() {
      this.drawCharts()
      this.chartColumn = echarts.init(document.getElementById("chartPie"));
      // this.drawColumnChart();
      window.addEventListener("resize", this.bindResize, false);
    },
    updated: function() {
      this.drawCharts()
    }
  }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
  }
  .el-col {
    margin-top: -6.875rem;
    margin-left: -6.25rem;
  }
</style>

