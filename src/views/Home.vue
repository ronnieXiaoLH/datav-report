<template>
  <div class="home">
    <top-view></top-view>
    <sales-view></sales-view>
    <bottom-view></bottom-view>
    <map-view></map-view>
  </div>
</template>

<script>
import { screenData, mapScatter, wordCloud } from '../api'
import TopView from '../components/TopView'
import SalesView from '../components/SalesView'
import BottomView from '../components/BottomView'
import MapView from '../components/MapView'
export default {
  name: 'Home',
  provide () {
    return {
      getReportData: this.getReportData,
      getMapData: this.getMapData,
      getWordCloud: this.getWordCloud
    }
  },
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView
  },
  data () {
    return {
      reportData: null,
      mapData: null,
      wordCloud: null
    }
  },
  mounted () {
    screenData().then(data => { this.reportData = data })
    mapScatter().then(data => { this.mapData = data })
    wordCloud().then(data => { this.wordCloud = data })
  },
  methods: {
    getReportData () {
      return this.reportData
    },
    getMapData () {
      return this.mapData
    },
    getWordCloud () {
      return this.wordCloud
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  width: 100%;
  background-color: #eee;
  box-sizing: border-box;
}
</style>
