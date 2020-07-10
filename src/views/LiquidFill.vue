<template>
  <div id="container"
       style="height: 400px">
    LiquidFill
  </div>
</template>

<script>
import 'echarts-liquidfill'
export default {
  name: 'LiquidFill',
  data () {
    return {
      chartInstance: null
    }
  },
  mounted () {
    const data = [0.68, 0.4, 0.2]
    this.chartInstance = this.$echarts.init(document.getElementById('container'))
    this.chartInstance.setOption({
      series: [
        {
          type: 'liquidFill',
          data,
          color: ['red', 'blue', 'yellow'],
          itemStyle: {
            opacity: 0.6
          },
          emphasis: {
            itemStyle: {
              opacity: 0.9
            }
          },
          // waveAnimation: false,
          // animationDuration: 0,
          // animationDurationUpdate: 0
          amplitude: 10,
          backgroundStyle: {
            color: 'purple',
            borderWidth: 4,
            borderColor: '#333'
          },
          outline: {
            show: false
          }
        }
      ]
    })
  }
}
</script>
<style lang='scss' scoped>
</style>
