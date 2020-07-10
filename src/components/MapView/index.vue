<template>
  <div class="map-view">
    <div class="left">
      <b-map-scatter></b-map-scatter>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">用户月同比增长</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <liquid-fill></liquid-fill>
          </div>
        </template>
      </el-card>
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">热门搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <word-cloud></word-cloud>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import BMapScatter from '../BMapScatter'
import LiquidFill from '../LiquidFill'
import WordCloud from '../WordCloud'
export default {
  name: 'map-view',
  components: {
    BMapScatter,
    LiquidFill,
    WordCloud
  },
  data () {
    return {
    }
  }
}
</script>
<style lang='scss' scoped>
.map-view {
  margin-top: 20px;
  width: 100%;
  height: 600px;
  display: flex;
  .left {
    flex: 0 0 80%;
    width: 80%;
    height: 100%;
    background-color: #fff;
  }
  .right {
    margin-left: 20px;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /deep/ .el-card__header {
      padding: 0;
    }
    .title {
      height: 60px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
    }
    .chart-wrapper {
      width: 100%;
      height: 190px;
    }
  }
}
</style>
