<template>
  <div class="sales-view">
    <el-card shadow="hover"
             :body-style="{padding: '0 0 20px 0'}">
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu class="sales-view-menu"
                   :default-active="activeIndex"
                   mode="horizontal"
                   @select="onMenuSelect">
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect"
                            size="small">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="今年"></el-radio-button>
            </el-radio-group>
            <el-date-picker class="sales-view-date-picker"
                            v-model="date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            size="small"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
            </el-date-picker>
          </div>
        </div>
      </template>
      <template>
        <div class="sales-view-chart-wrapper">
          <v-chart class="sales-view-chart"
          ref="chart"
                   :options="chartOptions"></v-chart>
          <div class="sales-view-list">
            <div class="sales-view-list-title">排行榜</div>
            <div class="list-item-wrapper">
              <div class="list-item"
                   v-for="item in rankData"
                   :key="item.no">
                <div :class="['list-item-no', +item.no <= 3 ? 'top-no' : '']">{{ item.no }}</div>
                <div class="list-item-name">{{ item.name }}</div>
                <div class="list-item-money">{{ item.money }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
import CommonDataMixin from '../../mixins/commonDataMixin'
import ResizeChartMixin from '../../mixins/resizeChartMixin'
export default {
  name: 'sales-view',
  mixins: [CommonDataMixin, ResizeChartMixin],
  data () {
    return {
      activeIndex: '1',
      radioSelect: '今日',
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      chartOptions: {}
    }
  },
  computed: {
    rankData () {
      return this.activeIndex === '1' ? this.orderRank : this.userRank
    }
  },
  watch: {
    orderFullYear () {
      this.render('年度销售额', this.orderFullYearAxis, this.orderFullYear)
    }
  },
  methods: {
    onMenuSelect (index) {
      this.activeIndex = index
      if (this.activeIndex === '1') {
        this.render('年度销售额', this.orderFullYearAxis, this.orderFullYear)
      } else {
        this.render('年度用户访问量', this.userFullYearAxis, this.userFullYear)
      }
    },
    render (title, axis, data) {
      this.chartOptions = {
        title: {
          text: title,
          textStyle: {
            fontSize: '12',
            color: '#666'
          },
          top: 20,
          left: 25
        },
        xAxis: {
          type: 'category',
          data: axis,
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#666'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee'
            }
          }
        },
        grid: {
          top: 70,
          left: 60,
          right: 60,
          bottom: 50
        },
        color: ['#3398db'],
        series: [
          {
            type: 'bar',
            barWidth: '35%',
            data
          }
        ]
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.sales-view {
  margin-top: 20px;
  .menu-wrapper {
    position: relative;
    display: flex;
    .sales-view-menu {
      width: 100%;
      padding-left: 20px;
    }
    .menu-right {
      position: absolute;
      right: 20px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .sales-view-date-picker {
        margin-left: 20px;
      }
    }
  }

  .sales-view-chart-wrapper {
    display: flex;
    width: 100%;
    height: 270px;
    .sales-view-chart {
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }
    .sales-view-list {
      flex: 1;
      height: 100%;
      .sales-view-list-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }
      .list-item-wrapper {
        margin-top: 15px;
        .list-item {
          display: flex;
          align-items: center;
          height: 20px;
          padding: 6px 20px 6px 0;
          font-size: 12px;
          .list-item-no {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;
            &.top-no {
              background-color: #000;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }
          .list-item-name {
            margin-left: 10px;
          }
          .list-item-money {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }

  /deep/ .el-card__header {
    padding: 0;
    border-bottom: none;
  }
  /deep/ .el-menu-item {
    height: 50px;
    line-height: 50px;
    margin: 0 20px;
  }
}
</style>
