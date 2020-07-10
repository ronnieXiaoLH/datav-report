<template>
  <ve-wordcloud :data="chartData"
                :settings="chartSettings"
                height="100%"></ve-wordcloud>
</template>

<script>
import CommonDataMixin from '../../mixins/commonDataMixin'
export default {
  name: 'WordCloud',
  mixins: [CommonDataMixin],
  data () {
    return {
      chartData: {
        columns: ['name', 'value'],
        rows: []
      },
      chartSettings: {
        color: ['rgba(97, 216, 0, 0.7)', 'rgba(204, 178, 26, 0.7)', 'rgba(245, 166, 35, 0.7)', 'rgba(156, 13, 113, 0.7)']
      }
    }
  },
  watch: {
    wordCloud () {
      const rows = []
      this.wordCloud.forEach(item => {
        rows.push({
          name: item.word,
          value: item.count
        })
      })
      this.chartData.rows = rows
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
