<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-number">{{ userCount | format }}</div>
                <v-chart :options="searchUserOptions" ref="searchUserChart"></v-chart>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-number">{{ searchCount }}</div>
                <v-chart :options="searchCountOptions" ref="searchCountChart"></v-chart>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData"
                        style="width: 100%">
                <el-table-column prop="rank"
                                 label="排名">
                </el-table-column>
                <el-table-column prop="keyword"
                                 label="关键词"
                                 width="180">
                </el-table-column>
                <el-table-column prop="count"
                                 label="总搜索量">
                </el-table-column>
                <el-table-column prop="users"
                                 label="搜索用户数"
                                 width="180">
                </el-table-column>
                <el-table-column prop="range"
                                 label="点击率">
                </el-table-column>
              </el-table>
              <el-pagination background
                             layout="prev, pager, next"
                             :page-size="pageSize"
                             :total="total"
                             @current-change="onPageChange">
              </el-pagination>
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect"
                              size="small"
                              @change="handleRadioChange">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOptions" ref="categoryChart"></v-chart>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import CommonDataMixin from '../../mixins/commonDataMixin'
export default {
  name: 'bottom-view',
  mixins: [CommonDataMixin],
  data () {
    return {
      totalData: [],
      tableData: [],
      pageSize: 4,
      total: null,
      userCount: 0,
      searchCount: 0,
      searchUserOptions: {
      },
      searchCountOptions: {},
      searchNumberOptions: {},
      radioSelect: '品类',
      categoryOptions: {}
    }
  },
  mounted() {
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  watch: {
    wordCloud () {
      const arr = cloneDeep(this.wordCloud)
      arr.sort((a, b) => b.count - a.count)
      arr.forEach((item, index) => {
        this.totalData.push({
          id: index + 1,
          rank: index + 1,
          keyword: item.word,
          count: item.count,
          users: item.user,
          range: ((item.user / item.count) * 100).toFixed(2) + '%'
        })
      })
      this.userCount = this.totalData.reduce((s, i) => i.users + s, 0)
      this.searchCount = this.format(this.totalData.reduce((s, i) => i.count + s, 0))
      this.total = this.totalData.length
      this.onPageChange(1)
      this.renderLineChart()
    },
    category1 () {
      this.renderPieChart()
    }
  },
  methods: {
    resize() {
      this.$refs.searchUserChart.resize()
      this.$refs.searchCountChart.resize()
      this.$refs.categoryChart.resize()
    },
    onPageChange (page) {
      this.tableData = this.totalData.slice(this.pageSize * (page - 1), this.pageSize * page)
    },
    renderLineChart () {
      const createOptions = (key) => {
        const data = []
        const axis = []
        this.wordCloud.forEach(item => {
          data.push(item[key])
          axis.push(item.word)
        })
        return {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: axis
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
              areaStyle: {
                color: 'rgba(95, 187, 255, 0.5)'
              },
              data,
              lineStyle: {
                color: 'rgb(95, 187, 255)'
              },
              itemStyle: {
                opacity: 0
              },
              smooth: true
            }
          ]
        }
      }
      this.searchUserOptions = createOptions('user')
      this.searchCountOptions = createOptions('count')
    },
    renderPieChart () {
      let data = []
      let axis = []
      let total = 0
      if (this.radioSelect === '品类') {
        data = this.category1.data1
        axis = this.category1.axisX
        total = data.reduce((s, i) => s + i, 0)
      } else if (this.radioSelect === '商品') {
        data = this.category2.data1
        axis = this.category2.axisX
        total = data.reduce((s, i) => s + i, 0)
      }
      const chartData = []
      const colors = ['#8d7fec', '#5085f2', '#f8762b', '#e7e702', '#78f283', '#4bc1fc']
      data.forEach((item, index) => {
        const percent = ((item / total) * 100).toFixed(2) + '%'
        chartData.push({
          legendName: axis[index],
          value: item,
          percent,
          itemStyle: {
            color: colors[index % colors.length]
          },
          name: `${axis[index]} | ${percent}`
        })
      })

      this.categoryOptions = {
        title: [
          {
            text: `${this.radioSelect}分布`,
            textStyle: {
              fontSize: 14,
              color: '#666'
            }
          },
          {
            text: '累计订单量',
            subtext: total,
            x: '34.5%',
            y: '42.5%',
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333'
            },
            textAlign: 'center'
          }
        ],
        series: [
          {
            type: 'pie',
            data: chartData,
            label: {
              normal: {
                show: true,
                position: 'outter',
                formatter: (params) => {
                  return `${params.data.legendName}`
                }
              }
            },
            center: ['35%', '50%'],
            radius: ['45%', '60%'],
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            },
            clockWise: true,
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            }
          }
        ],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            return '标题' + '<br />' + params.marker + params.name + '<br />' + '数量：' + params.value + '<br />' + '百分比：' + params.data.percent
          }
        }
      }
    },
    handleRadioChange (val) {
      this.radioSelect = val
      this.renderPieChart()
    }
  }
}
</script>
<style lang='scss' scoped>
.bottom-view {
  margin-top: 20px;
  display: flex;
  .view {
    flex: 1;
    width: 50%;
    box-sizing: border-box;
    &:first-child {
      padding-right: 10px;
    }
    &:last-child {
      padding-left: 10px;
    }
    /deep/ .el-card__header {
      padding: 0;
    }
    .title-wrapper {
      height: 60px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      .radio-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
    .chart-wrapper {
      height: 452px;
      display: flex;
      flex-direction: column;
      .chart-inner {
        display: flex;
        margin-top: 20px;
        padding: 0 10px;
        .chart {
          flex: 1;
          width: 50%;
          padding: 0 10px;
          .chart-title {
            font-size: 14px;
            color: #999;
          }
          .chart-number {
            font-size: 22px;
            font-weight: 500;
            color: #333;
            letter-spacing: 2px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
      .table-wrapper {
        margin-top: 20px;
        padding: 0 20px 20px;
        /deep/ .el-pagination {
          margin-top: 15px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
