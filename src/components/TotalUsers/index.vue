<template>
  <div class="total-users">
    <common-cart :title="title"
                 :value="userToday">
      <template>
        <v-chart :options="getOptions()" ref="chart"></v-chart>
      </template>
      <template v-slot:footer>
        <div class="total-users-footer">
          <span>日同比</span>
          <span class="emphasis">{{ userGrowthLastDay }}</span>
          <div class="increase"></div>
          <span class="month">月同比</span>
          <span class="emphasis">{{ userGrowthLastMonth }}</span>
          <div class="decrease"></div>
        </div>
      </template>
    </common-cart>
  </div>
</template>

<script>
import CommonCartMixin from '../../mixins/commonCartMixin'
import CommonDataMixin from '../../mixins/commonDataMixin'
import ResizeChartMixin from '../../mixins/resizeChartMixin'
export default {
  name: 'total-users',
  mixins: [CommonCartMixin, CommonDataMixin, ResizeChartMixin],
  data () {
    return {
      title: '累计用户数'
    }
  },
  methods: {
    getOptions () {
      return {
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
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
            name: '上月平台用户数',
            type: 'bar',
            data: [this.userLastMonth],
            stack: '总量',
            barWidth: 10,
            itemStyle: {
              color: '#45c946'
            }
          },
          {
            name: '今日平台用户数',
            type: 'bar',
            data: [this.userLastDay],
            stack: '总量',
            itemStyle: {
              color: '#eee'
            }
          },
          {
            type: 'custom',
            data: [this.userLastMonth],
            stack: '总量',
            renderItem: (params, api) => {
              const value = api.value(0)
              const endPoint = api.coord([value, 0])

              return {
                type: 'group',
                position: endPoint,
                children: [
                  {
                    type: 'path',
                    shape: {
                      d: 'M514.525867 67.529387L3.413333 953.53856l1017.173334 2.92864L514.525867 67.529387z',
                      x: -5,
                      y: 5,
                      width: 10,
                      height: 10
                    },
                    style: {
                      fill: '#45c946'
                    },
                    layout: 'cover'
                  },
                  {
                    type: 'path',
                    shape: {
                      d: 'M514.525867 956.474027L3.413333 70.46144l1017.173334-2.932053-506.0608 888.94464z',
                      x: -5,
                      y: -15,
                      width: 10,
                      height: 10
                    },
                    style: {
                      fill: '#45c946'
                    },
                    layout: 'cover'
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.total-users {
  .total-users-footer {
    display: flex;
    align-items: center;
    .month {
      margin-left: 10px;
    }
  }
}
</style>
