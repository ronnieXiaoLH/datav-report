<template>
  <div class="today-users">
    <common-cart :title="title"
                 :value="orderUser">
      <template>
        <v-chart :options="getOptions()" ref="chart"></v-chart>
      </template>
      <template v-slot:footer>
        <span>退货率</span>
        <span class="emphasis">{{ returnRate }}</span>
      </template>
    </common-cart>
  </div>
</template>

<script>
import CommonCartMixin from '../../mixins/commonCartMixin'
import CommonDataMixin from '../../mixins/commonDataMixin'
import ResizeChartMixin from '../../mixins/resizeChartMixin'
export default {
  name: 'today-users',
  mixins: [CommonCartMixin, CommonDataMixin, ResizeChartMixin],
  data () {
    return {
      title: '今日交易用户数'
    }
  },
  methods: {
    getOptions () {
      return {
        color: '#3398db',
        xAxis: {
          type: 'category',
          data: this.orderUserTrendAxis,
          show: false
          // boundaryGap: false
        },
        yAxis: {
          show: false
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        tooltip: {
          show: true,
          formatter: (params) => {
            return params.name + '<br>' + params.marker + `${params.seriesName}：` + params.data
          }
        },
        series: [
          {
            name: '用户实时交易量',
            type: 'bar',
            data: this.orderUserTrend,
            barWidth: '60%'
          }
        ]
      }
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
