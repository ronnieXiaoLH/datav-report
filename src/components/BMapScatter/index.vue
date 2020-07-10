<template>
  <ve-bmap :settings="chartSettings"
           :title="title"
           :tooltip="{}"
           :series="series"
           height="100%"></ve-bmap>
</template>

<script>
import CommonDataMixin from '../../mixins/commonDataMixin'
/* eslint-disable */

const convertData = function (data, geo) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geo[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  return res
}
export default {
  name: 'BMapScatter',
  mixins: [CommonDataMixin],
  data () {
    return {
      title: {
        text: '慕课外卖销售数据大盘',
        subtext: '销售趋势统计',
        sublink: 'https://www.imooc.com',
        left: 'center'
      },
      chartSettings: {
        key: 'G1LFyjrNGIkns5OfpZnrCGAKxpycPLwb',
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: false,
          mapStyle: {
            styleJson: [
              {
                'featureType': 'water',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'land',
                'elementType': 'all',
                'stylers': {
                  'color': '#f3f3f3'
                }
              }, {
                'featureType': 'railway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'highway',
                'elementType': 'all',
                'stylers': {
                  'color': '#fdfdfd'
                }
              }, {
                'featureType': 'highway',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'geometry.fill',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'green',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'subway',
                'elementType': 'all',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'manmade',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'local',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'arterial',
                'elementType': 'labels',
                'stylers': {
                  'visibility': 'off'
                }
              }, {
                'featureType': 'boundary',
                'elementType': 'all',
                'stylers': {
                  'color': '#fefefe'
                }
              }, {
                'featureType': 'building',
                'elementType': 'all',
                'stylers': {
                  'color': '#d1d1d1'
                }
              }, {
                'featureType': 'label',
                'elementType': 'labels.text.fill',
                'stylers': {
                  'color': '#999999'
                }
              }
            ]
          }
        }
      },
      series: [
      ]
    }
  },
  watch: {
    mapData () {
      const { data, geo } = this.mapData
      this.series = [
        {
          name: '销售额',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: convertData(data, geo),
          encode: {
            value: 2
          },
          itemStyle: {
            color: 'purple'
          },
          symbolSize: val => {
            return val[2] / 10
          },
          label: {
            show: false,
            position: 'right',
            formatter: (params) => {
              return `${params.name} - ${params.value[2]}`
            }
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        {
          name: 'Top5',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: convertData(data, geo).sort((a, b) => b.value[2] - a.value[2]).slice(0, 5),
          encode: {
            value: 2
          },
          symbolSize: val => val[2] / 10,
          label: {
            show: false,
            position: 'right',
            formatter: params => `${params.name} - ${params.value[2]}`
          },
          itemStyle: {
            color: 'purple',
            shadowBlur: 10,
            shadowColor: '#333'
          },
          emphasis: {
            label: {
              show: true
            }
          },
          hoverAnimation: true,
          rippleEffect: {
            brushType: 'stroke'
          }
        }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
