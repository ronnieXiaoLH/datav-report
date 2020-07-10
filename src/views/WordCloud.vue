<template>
  <div id="container"></div>
</template>

<script>
import 'echarts-wordcloud'
export default {
  name: 'LiquidFill',
  data () {
    return {
      chartInstance: null
    }
  },
  mounted () {
    const data = [
      {
        name: 'mukew',
        value: 100
      },
      {
        name: '数据可视化',
        value: 50
      },
      {
        name: 'ronnie',
        value: 25
      }
    ]
    this.chartInstance = this.$echarts.init(document.getElementById('container'))
    this.chartInstance.setOption({
      series: [
        {
          type: 'wordCloud',
          data
        }
      ]
    })
  }
}
</script>
<style lang='scss' scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
