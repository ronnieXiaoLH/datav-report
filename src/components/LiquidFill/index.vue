<template>
  <ve-liquidfill :data="chartData"
                 :settings="chartSettings"
                 height="100%"></ve-liquidfill>
</template>

<script>
import CommonDataMixin from '../../mixins/commonDataMixin'
export default {
  name: 'LiquidFill',
  mixins: [CommonDataMixin],
  data () {
    return {
      chartData: {
      },
      chartSettings: {}
    }
  },
  watch: {
    userGrowthLastMonth () {
      this.chartData = {
        columns: ['title', 'percent'],
        rows: [
          {
            title: '用户月同比增长',
            percent: parseFloat(this.userGrowthLastMonth) / 100
          }
        ]
      }
      this.chartSettings = {
        seriesMap: {
          用户月同比增长: {
            radius: '80%',
            label: {
              formatter: params => {
                return `${Math.floor(params.value * 100)}%`
              },
              textStyle: {
                fontSize: 36,
                color: '#999',
                fontWeight: 'normal'
              },
              position: ['50%', '50%'],
              insideColor: '#fff'
            },
            outline: {
              itemStyle: {
                borderColor: '#aaa4a4',
                borderWidth: 1,
                color: 'none',
                shadowBlur: 0,
                shadowColor: '#fff'
              },
              borderDistance: 0
            },
            backgroundStyle: {
              color: '#fff'
            },
            itemStyle: {
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            amplitude: 8,
            color: [this.getColor(this.chartData.rows[0].percent)]
          }
        }
      }
    }
  },
  methods: {
    getColor (value) {
      return value > 0 && value <= 0.5 ? 'rgba(97, 216, 0, 0.7)' : value > 0.5 && value < 0.8 ? 'rgba(204, 178, 26, 07)' : 'rgba(241, 47, 28, 0.7)'
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
