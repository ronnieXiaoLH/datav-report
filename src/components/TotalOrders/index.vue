<template>
  <div class="total-orders">
    <common-cart :title="title"
                 :value="orderToday">
      <template>
        <v-chart :options="getOptions()" ref="chart"></v-chart>
        <!-- <div id="total-orders-chart"
             :style="{width:'100%', height:'100%'}">
        </div> -->
      </template>
      <template v-slot:footer>
        <span>昨日订单量 </span>
        <span class="emphasis">{{ orderLastDay }}</span>
      </template>
    </common-cart>
  </div>
</template>

<script>
import CommonCartMixin from '../../mixins/commonCartMixin'
import CommonDataMixin from '../../mixins/commonDataMixin'
import ResizeChartMixin from '../../mixins/resizeChartMixin'
export default {
  name: 'total-orders',
  mixins: [CommonCartMixin, CommonDataMixin, ResizeChartMixin],
  data () {
    return {
      title: '累计订单量'
    }
  },
  methods: {
    getOptions () {
      return this.orderTrend.length > 0 ? {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false
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
        series: [
          {
            type: 'line',
            data: this.orderTrend,
            areaStyle: {
              color: 'purple'
            },
            lineStyle: {
              width: 0
            },
            itemStyle: {
              opacity: 0
            },
            smooth: true
          }
        ]
      } : null
    }
  }
}
</script>
